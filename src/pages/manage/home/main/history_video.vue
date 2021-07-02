<template>
 <div class="history_video">
        <!-- 显示视频和折线图 -->
         <div class="show_video">
             <div class="video_view">
                <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="videoPlayerOptions"
                    ></video-player>
             </div>
             <div class="video_echart">
                 <EchartHistory></EchartHistory>
             </div>
         </div>
         <!-- 显示列表jin日不同流水线不合格数据 -->
         <div class="show_fail_date">
             <!-- <Echartfail></Echartfail> -->
             <!-- 显示不同视频瑕疵类型 -->
             <el-table
                        :data="tableData
                        .filter(data => !search || 
                        data.Id.toLowerCase().includes(search.toLowerCase()) ||
                        data.defectName.toLowerCase().includes(search.toLowerCase()) ||
                        data.location.toLowerCase().includes(search.toLowerCase()) ||
                        data.defectId.toLowerCase().includes(search.toLowerCase()) ||
                        data.confidence.toLowerCase().includes(search.toLowerCase())
                        ) "
                        style="width: 100%;height: calc(100vh - 600px);background-color: #D4E8F5;overflow-y:auto"
                        :cell-style="tableRowStyle"
                        :header-cell-style="tableHeaderColor"
                        >
                        <el-table-column
                        label="ID"
                        align="center"
                        width="300px"
                        prop="Id">
                        </el-table-column>
                        <el-table-column
                        label="defectId"
                        align="center"
                        width="300px"
                        prop="defectId">
                        </el-table-column>
                        <el-table-column
                        label="瑕疵类型"
                        align="center"
                        prop="defectName">
                        </el-table-column>
                        <el-table-column
                        label="置信度"
                        align="center"
                        prop="confidence">
                        </el-table-column>
                        <el-table-column
                        label="污渍坐标(左上角,右上角,左下角,右下角)"
                        align="center"
                        prop="location">
                        </el-table-column>
             </el-table>
         </div>
 </div>
</template>

<script>
import axios from 'axios'
import EchartHistory from '../charts/Echart_history'
import Echartfail from '../charts/Echartfail'
// 导入组件
import {videoPlayer} from 'vue-video-player'
//引入json数据
import result from './video/result'

import 'videojs-flash'
 export default {
   data () {
     return {
        fileAreaHeight: 500,
        fileType: 'mp4', // 资源的类型
        // posterUrl:require('./output/1.jpg'),
        videoUrl:require('./video/t2.mp4'), // 资源的路径地址,
          line_options: [{ //选择设备
          value: '选项1',
          label: 'A设备'
            }, {
            value: '选项2',
            label: 'B设备'
            }, {
            value: '选项3',
            label: 'C设备'
            }, {
            value: '选项4',
            label: 'D设备'
            }, {
            value: '选项5',
            label: 'E设备'
            }],
            line_value1: [],        
            start_value1: '',//起始时间
            end_value1: '',//结束时间
            //警报状态
            alarm_options: [{
            value: '选项1',
            label: '报警中'
            }, {
            value: '选项2',
            label: '正常状况'
            }],
            alarm_value: '',
            //表格数据显示
             tableData: [],//深度学习返回的数据
            search: '',
     }
   },
   components: {
       EchartHistory,
       Echartfail,
       videoPlayer
   },
   methods: {
       // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'background-color: #D4E8F5;'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #D4E8F5;'
      }
    },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    computed: {
      videoPlayerOptions () {
        const videoPlayerOptions = {
          playbackRates: [0.75, 1.0, 1.25, 1.5,2.0], //播放速度
          autoplay: false, // 是否自动播放。
          muted: true, // 是否静音播放，默认情况下将会消除任何音频。
          loop: false, // 是否循环播放。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          //aspectRatio: '16:10', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: false, // 是否流体从而按比例缩放以适应其容器。
          flash:{hls:{withCreadentials:false}},//可以播放rtmp视频
          html5:{hls:{withCreadentials:false}},//可以播放m3u8视频
          sources: [{
            type: 'video/' + this.fileType,
            src: this.videoUrl // 视频url地址
          }],
          objectFit:"cover",
          height: '500px', // 设置高度，fluid需要设置成flase
          //width:'700px',
          poster:require('./output/1.jpg'), // 封面地址
          notSupportedMessage: '此视频暂无法播放...', // 当无法播放时允许覆盖Video.js，显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true
          }
        }
        return videoPlayerOptions
      }
    },
    mounted () {
      var _this=this
      console.log("result",result.result);
      let defectName
      for(let i = 0; i < result.result.length; i++){
        if (result.result[i].category==8) {          
          defectName='褶子'
        }else{
          defectName='沾污'
        }
                _this.tableData.push({
                        'Id':i+1, //Id
                        'defectId':result.result[i].category, //defectId
                        'defectName':defectName,//瑕疵类型
                        'confidence':parseFloat(result.result[i].score).toFixed(4)*100+'%',//置信度
                        'location':"("+parseInt(result.result[i].bbox[0])+","+
                                    +parseInt(result.result[i].bbox[1])+","
                                    +parseInt(result.result[i].bbox[2])+","
                                    +parseInt(result.result[i].bbox[3])+")"
                    })
                }
            //发送请求获取坐标
          
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
                        'defectId':response.data.data.labelsList[i].defectId, //defectId
                        'defectName':response.data.data.labelsList[i].defectName,//瑕疵类型
                        'confidence':parseFloat(response.data.data.labelsList[i].confidence).toFixed(4)*100+'%',//置信度
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
                
 }
</script>


<style lang="less">
.history_video{
padding: 20px;
height: 100%;
box-sizing: border-box;
background-image: url("../../../../assets/imgs/login/login.png");
background-size: 100% 100%;
background-repeat: no-repeat;
    .show_video{
            width:100%;
            height: auto;
            margin-bottom: 20px;
            overflow: hidden;
            .video_view{
                float: left;
                width: 50%;
                height: 500px;
                .one_video{
                height:100%;
                width:100%  !important;
                object-fit: fill;
            }
            }
            .video_echart{
                width: calc(50% - 20px);
                margin-left: 20px;
                float: left;
                height: 500px;
                background-color: white;
                object-fit:fill;
            }
            /deep/ .video-js .vjs-tech {
              object-fit: fill;
            }
            /deep/ .vjs-poster {
              background-size: cover;
            }
        }
        .show_fail_date{
            width:100%;
            height: calc(100vh - 600px);
            background-color: #D4E8F5;
        }
}
 
</style>
