<template>
 <div class="video">
     <div class="video_left">
    <el-row :gutter="24">
        <!-- 放自动播放视频 -->
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content one">
        <div class="video_content">
            <video ref="video" class="one_video" muted autoplay></video> 
        <div class="control">
             <el-select v-model="modelSel" size="mini"  :change="setCurrentDevice(modelSel)">
                <el-option v-for="(item,index) in videoArr" :value="item.id" :key="index" :label="item.label"></el-option>
            </el-select>
            <!-- <el-button  type="primary" @click="photograph">拍照</el-button> -->
        </div>
        </div>
        </div>
        </el-col>
        <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
            <div class="grid-content two">
                <el-table
                        :data="tableData
                        .filter(data => !search || 
                        data.Id.toLowerCase().includes(search.toLowerCase()) ||
                        data.defectName.toLowerCase().includes(search.toLowerCase()) ||
                        data.location.toLowerCase().includes(search.toLowerCase()) 
                        ) "
                        style="width: 100%"
                        :cell-style="tableRowStyle"
                        :header-cell-style="tableHeaderColor"
                        >
                        <el-table-column
                        label="ID"
                        align="center"
                        width="200px"
                        prop="Id">
                        </el-table-column>
                        <el-table-column
                        label="瑕疵类型"
                        align="center"
                        prop="defectName">
                        </el-table-column>
                        <el-table-column
                        label="污渍坐标(左上角,右上角,左下角,右下角)"
                        align="center"
                        prop="location">
                        </el-table-column>
                        <!-- <el-table-column
                        align="right"
                        >
                        eslint-disable-next-line
                        <template slot="header"  slot-scope="scope">
                            <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">忙碌</el-button>
                        </template>
                        </el-table-column> -->
                    </el-table>
                  <!-- <el-table
                        :data="person_date
                        .filter(data => !search || 
                        data.line.toLowerCase().includes(search.toLowerCase()) ||
                        data.name.toLowerCase().includes(search.toLowerCase()) ||
                        data.phone.toLowerCase().includes(search.toLowerCase()) 
                        ) "
                        style="width: 100%"
                        :cell-style="tableRowStyle"
                        :header-cell-style="tableHeaderColor"
                        >
                        <el-table-column
                        label="流水线"
                        prop="line">
                        </el-table-column>
                        <el-table-column
                        label="值班人员"
                        prop="name">
                        </el-table-column>
                        <el-table-column
                        label="联系方式"
                        prop="phone">
                        </el-table-column>
                        <el-table-column
                        align="right"
                        >
                        eslint-disable-next-line
                        <template slot="header"  slot-scope="scope">
                            <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">忙碌</el-button>
                        </template>
                        </el-table-column>
                    </el-table> -->
            </div>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
             <div class="grid-content three">
                 <div class="video_line three_video">
                     <div class="table">流水线：</div>
                     <div class="num">{{this.cloth_date[0].line}}</div>
                 </div>
                 <div class="video_fail three_video">
                     <div class="table">不合格布匹：</div>
                     <div class="num red_num">{{this.cloth_date[0].num}}</div>
                 </div>
                 <div class="video_average three_video">
                     <div class="table">平均瑕疵数：</div>
                     <div class="num">{{this.cloth_date[0].max_num}}</div>
                 </div>
                 <div class="video_change three_video">
                     <div class="table">阈值(可更改)：</div>
                     <div class="num">{{this.cloth_date[0].change_maxnum}}</div>
                 </div>
                <!-- <el-table
                :data="cloth_date"
                style="width: 100%;height:90px">
                <el-table-column
                    prop="line"
                    label="流水线"
                    >
                </el-table-column>
                <el-table-column
                    prop="num"
                    label="不合格布匹"
                   >
                </el-table-column>
                <el-table-column
                    prop="max_num"
                    label="平均瑕疵数">
                </el-table-column>
                <el-table-column
                    prop="change_maxnum"
                    label="阈值/可更改"
                    width="100"
                    >
                </el-table-column>
                </el-table> -->
                </div>
        </el-col>
    </el-row>
     </div>
     <div class="video_right">
        <el-row :gutter="24">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <!-- <div class="grid-content three">
                <el-table
                :data="cloth_date"
                style="width: 100%;height:90px">
                <el-table-column
                    prop="line"
                    label="流水线"
                    >
                </el-table-column>
                <el-table-column
                    prop="num"
                    label="不合格布匹"
                   >
                </el-table-column>
                <el-table-column
                    prop="max_num"
                    label="平均瑕疵数">
                </el-table-column>
                <el-table-column
                    prop="change_maxnum"
                    label="阈值/可更改"
                    width="100"
                    >
                </el-table-column>
                </el-table>
                </div> -->
                </el-col>
        <!-- 画布显示图片 -->
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content four">
                <canvas ref="canvas" class="one_canvas"></canvas>
            </div>
        </el-col>
        <!-- 折线图 -->
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content five">
                <EchartTime></EchartTime>
                </div>
                </el-col>
    </el-row>
     </div>
    
 </div>
</template>

<script>
import axios from 'axios'
import EchartTime from '../charts/EchartTime'
    export default {
        data () {
            return {
                tableData:[],//深度学习返回的数据
                line_label:'',
                timer:'',//定时器
                videoArr:[],//所有的摄像头,也可以加入音频设备
                modelSel:'',//当前使用的摄像头
                myInterval: null,
                //右边第一个框的表格
                cloth_date: [{
                    line: 'A',
                    num: '7',
                    max_num: '5',
                    change_maxnum: '10'
                }],
                 person_date: [{
                    line: 'A',
                    name: '王小虎',
                    phone: '661234'
                    }, {
                    line: 'B',
                    name: '王大虎',
                    phone: '258966'
                    },{
                    line: 'C',
                    name: '王胖虎',
                    phone: '258966'
                    },{
                    line: 'D',
                    name: '王肥虎',
                    phone: '258966'
                    },
                    ],
                    search: '',

            }
        },
        created(){
            this.changeDevice();
        },
        methods: {
            // 修改table tr行的背景色
            tableRowStyle({ row, rowIndex }) {
            return 'background-color: #D4E8F5;opacity: 0.9;'
            },
            // 修改table header的背景色
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return 'background-color: #D4E8F5;opacity: 0.9;'
            }
            },
            //开启定时器
            setTimer: function () {
　　　　         this.timer = setInterval( () => {
                this.photograph()
　　　　　　 }, 1);
　　        },
            //成员信息表格
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            callCamera () {
                navigator.mediaDevices.getUserMedia({
                    video: true
                }).then(success => {
                    this.$refs['video'].srcObject = success;
                    this.$refs['video'].play()
                }).catch(error => {
                    console.error('摄像头开启失败，请检查摄像头是否可用！')
                })
            },
            // 拍照
            photograph () {
                let ctx = this.$refs['canvas'].getContext('2d')
                // 把当前视频帧内容渲染到canvas上
                //console.log(ctx);
                //获取canvas的宽度和高度
                let canvas= document.querySelector('.one_canvas')
                let canvas_width=canvas.width
                let canvas_height=canvas.height
                //console.log(canvas.style,canvas_width,canvas_height,"canvas_height");
                //宽在前，高在后
                //console.log(this.$refs['video'].offsetHeight);
                ctx.drawImage(this.$refs['video'], 0,0,canvas_width,canvas_height)
                // 转base64格式、图片格式转换、图片质量压缩---支持两种格式image/jpeg+image/png
                let imgBase64 = this.$refs['canvas'].toDataURL('image/png', 0.7)
                // let files=imgBase64
                // console.log(files);
                /**------------到这里为止，就拿到了base64位置的地址，后面是下载功能----------*/ 
                //到这里，已经转换为base64编码了，此时直接调用后台接口，把参数传过去，后台进行保存即可
                // 由字节转换为KB 判断大小
                let str = imgBase64.replace('data:image/png;base64,', '')
                let strLength = str.length
                let fileLength = parseInt(strLength - (strLength / 8) * 2)　　　 // 图片尺寸  用于判断
                let size = (fileLength / 1024).toFixed(2)
                //console.log(size) 　　  // 上传拍照信息  调用接口上传图片 .........
                //console.log(str);
                // 保存到本地,开启后点击拍照就会自动下载
                // let ADOM = document.createElement('a')
                // ADOM.href = imgBase64
                // ADOM.download = new Date().getTime() + '.png'
                // ADOM.click()
                // let params = new FormData()
                // params.append('file',str)
                // axios
                // .post('http://124.70.40.181:8257/video/upload',params)
                // .then(response => {
                //   console.log("登录",response)
                // })
                // .catch(response => {
                //   console.log(response)
                // })
            },
            closeCamera () {
                if (!this.$refs['video'].srcObject) return;
                let stream = this.$refs['video'].srcObject;
                let tracks = stream.getTracks();
                tracks.forEach(track => {
                    track.stop();
                });
                this.$refs['video'].srcObject = null;
            },
            changeDevice(){
                navigator.mediaDevices.enumerateDevices().then((devices)=> {
                    this.videoArr = [];
                    devices.forEach((device)=> {
                        //音频是audioautput  摄像头videoinput
                        if(device.kind == 'videoinput'){
                            
                            if (device.label=='Integrated Camera (5986:2115)') {
                                this.line_label='A流水线'
                            }else if (device.label=='PC Camera (058f:0362)') {
                                 this.line_label='B流水线'
                            }
                            console.log("设备",device.label,device.label=='Integrated Camera (5986:2115)');
                            this.videoArr.push({
                                'label': this.line_label,
                                'id': device.deviceId
                            })
                            console.log(this.videoArr);
                            this.modelSel=this.videoArr[0].label
                            console.log("数组",this.videoArr[0].label);
                        }
                        
                    });
                }).catch(function(err) {
                    console.log(err);
                });
                
            },
            setCurrentDevice(val){
                if ( val=='A流水线') {
                    val='Integrated Camera (5986:2115)' 
                }else if ( val=='B流水线') {
                    val='PC Camera (058f:0362)'
                    }
                console.log("ddafdksofk",val);
                const videoConstraints = {};
                if (val === '') {
                    videoConstraints.facingMode = 'environment';
                } else {
                    videoConstraints.deviceId = { exact: val };
                }
                var constraints = {
                    video: videoConstraints,
                };
                this.getUserMedia(constraints);
            },
            getUserMedia(constraints, success, error) {
                if (navigator.mediaDevices.getUserMedia) {
                    //最新的标准API
                    navigator.mediaDevices.getUserMedia(constraints).then(success=>{
                        // 摄像头开启成功
                        this.$refs['video'].srcObject = success
                        // 实时拍照效果
                        this.$refs['video'].play()
                    }).catch(error);
 
                } else if (navigator.webkitGetUserMedia) {
                    //webkit核心浏览器
                    navigator.webkitGetUserMedia(constraints,success, error)
                } else if (navigator.mozGetUserMedia) {
                    //firfox浏览器
                    navigator.mozGetUserMedia(constraints, success, error);
                } else if (navigator.getUserMedia) {
                    //旧版API
                    navigator.getUserMedia(constraints, success, error);
                }
                
            }
        },
        mounted () {
            clearInterval(this.timer)
            this.setTimer()
            //发送请求获取坐标
            var _this=this
            axios.get('http://124.70.40.181:8257/video/select_one.do', {
            params: {
            videoId:'e2b90617-37e5-405e-9eeb-0d7868ce84e8'
                    }
            })
            .then(function (response) {
                console.log("返回",response.data.data.labelsList);
                for(let i = 0; i < response.data.data.labelsList.length; i++){
                _this.tableData.push({
                        'Id':response.data.data.labelsList[i].id, //Id
                        'defectName':response.data.data.labelsList[i].defectName,//瑕疵类型
                        'location':"("+parseInt(response.data.data.labelsList[i].xmax)+","+
                                    +parseInt(response.data.data.labelsList[i].ymax)+","
                                    +parseInt(response.data.data.labelsList[i].xmin)+","
                                    +parseInt(response.data.data.labelsList[i].ymin)+")"
                    })
                }
                console.log(_this.tableData,"更新");

            })
            .catch(function (error) {
                console.log(error);})
                },
        components: {
            EchartTime
        }
    }
</script>

<style lang="less">
.video{
width: 100%;
height: 100%;
padding: 20px;
box-sizing: border-box;
background-image: url("../../../../assets/imgs/login/login.png");
background-size: 100% 100%;
background-repeat: no-repeat;
   .el-col {
    border-radius: 4px;
   }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    background: #D4E8F5;
    opacity: 0.95;
   }
    .video_left{
        width:calc( 70% - 20px);
        float: left;
        margin-right: 20px;
        .one{
            height:65vh;
            width: 100%;
            margin-bottom: 20px;
            .video_content{
                height:100%;
                position: relative;
                .control{
                    position: absolute;
                    padding: 5px;
                    float: right;
                    bottom: 0px;
                    right: 0;
                    .el-input--mini .el-input__inner{
                    height: 40px;
                    z-index: 999;
                    }
            }
                .one_video{
                height:100%;
                width:100%  !important;
                 object-fit: fill;
                 
               
            }
            }
        }
        .two{
            height: auto;
            max-height: calc(35vh - 110px);
            overflow-y: scroll;
        }
        .three{
            height:calc(35vh - 110px);
            width: 100%;
            background-color: pink;
            .three_video{
                height: 25%;
                width: 100%;
                background: #D4E8F5;
                opacity: 0.95;
                .table{
                    width: 60%;
                    height: 100%;
                    float: left;
                    padding: 10px;
                    box-sizing: border-box;
                    font-size: 16px;
                    font-family: Alibaba PuHuiTi;
                    font-weight: 400;
                    color: #1D5D8D;

                }
                .num{
                    width: 40%;
                    height: 100%;
                    float: right;
                    padding: 10px;
                    box-sizing: border-box;
                    font-size: 20px;
                    font-family: Alibaba PuHuiTi;
                    font-weight: 400;
                    color: #333333;
                }
                .red_num{
                    color: red;
                }
            }
        }
    }
    .video_right{
        float: left;
        width: 30%;
        .four{
            height: 45vh;
            margin-bottom: 20px;
            width:100%;
            overflow: hidden;
            .one_canvas{
                height:45vh;
                width:100%;
                overflow: hidden;
            }
        }
        .five{
            height: calc(55vh - 110px);
            margin-bottom: 20px;
        }
    } 
    }
</style>
