<template>
 <div class="history">
     <div class="history_date">
         <!-- 选择设备名、时间、警报状态进行查询 -->
         <div class="choose_time">
             <div class="line choose">
                 <span class="line_name">设备名：</span>
                 <div class="selece">
                     <el-select
                        v-model="line_value1"
                        multiple
                        collapse-tags
                        placeholder="请选择">
                        <el-option
                        v-for="item in line_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                 </div>
             </div>
             <div class="start_time choose">
                  <span class="line_name">start_time：</span>
                     <div class="selece">
                        <el-date-picker
                        v-model="start_value1"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
             </div>
             <div class="end_time choose">
                  <span class="line_name">end_time：</span>
                     <div class="selece">
                        <el-date-picker
                        v-model="end_value1"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
             </div>
             <div class="btn">
                <el-button>刷新</el-button>
                <el-button>查询</el-button>
             </div>
            
         </div>
         <!-- 视频封面 -->
         <div class="post_video">
             <el-row  :gutter="24" class="row_one">
                <el-col  :span="6">
                    <el-card  @click.native="$router.replace({name:'history_video'})" class="card_one" shadow="hover">
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="card_two" shadow="hover">
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="card_three" shadow="hover">
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="card_four" shadow="hover">
                    </el-card>
                </el-col>
            </el-row>
            <el-row  :gutter="24" class="row_two">
                <el-col :span="6">
                    <el-card class="card_five" shadow="hover">
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="card_six" shadow="hover">
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="card_seven" shadow="hover">
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="card_eight" shadow="hover">
                    </el-card>
                </el-col>
            </el-row>
         </div>
         <!-- 页脚 -->
         <el-pagination
            small
            layout="pager"
            :total="8">
            </el-pagination>
         <!-- 表格数据显示 -->
         <!-- <div class="show_date">
               <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                :cell-style="tableRowStyle"
                :header-cell-style="tableHeaderColor"
                >
                <el-table-column
                label="设备"
                prop="line">
                </el-table-column>
                <el-table-column
                label="阈值"
                prop="max">
                </el-table-column>
                <el-table-column
                label="最高峰值"
                prop="max_num">
                </el-table-column>
                <el-table-column
                label="管理人员"
                prop="admin">
                </el-table-column>
                <el-table-column
                label="日期"
                prop="time">
                </el-table-column>
                <el-table-column
                label="爆发时间段"
                prop="during_time">
                </el-table-column>
                <el-table-column
                align="center">
                eslint-disable-next-line
                <template slot="header" slot-scope="scope">
                    <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">查询</el-button>
                </template>
                </el-table-column>
            </el-table>
         </div> -->
         <!-- 显示视频和折线图 -->
         <!-- <div class="show_video">
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
         </div> -->
         <!-- 显示列表jin日不同流水线不合格数据 -->
         <!-- <div class="show_fail_date">
             <Echartfail></Echartfail>
         </div> -->
     </div>
 </div>
</template>

<script>
import EchartHistory from '../charts/Echart_history'
import Echartfail from '../charts/Echartfail'
// 导入组件
import {videoPlayer} from 'vue-video-player'

import 'videojs-flash'
 export default {
   data () {
     return {
        fileAreaHeight: 500,
        fileType: 'mp4', // 资源的类型
        posterUrl:require('./output/1.jpg'),
        videoUrl:require('./video/1.mp4'), // 资源的路径地址,
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
             tableData: [{
            line: 'A流水线',
            max: '10',
            max_num: '15',
            admin: '王小虎',
            time: '2021-4-28',
            during_time: '21:14:40-21:15:50',
            }, {
            line: 'B流水线',
            max: '10',
            max_num: '15',
            admin: '王小虎',
            time: '2021-4-28',
            during_time: '21:14:40-21:15:50',
            },{
            line: 'C流水线',
            max: '10',
            max_num: '15',
            admin: '王小虎',
            time: '2021-4-28',
            during_time: '21:14:40-21:15:50',
            },{
            line: 'D流水线',
            max: '10',
            max_num: '15',
            admin: '王小虎',
            time: '2021-4-28',
            during_time: '21:14:40-21:15:50',
            },{
            line: 'E流水线',
            max: '10',
            max_num: '15',
            admin: '王小虎',
            time: '2021-4-28',
            during_time: '21:14:40-21:15:50',
            },],
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
 }
</script>

<style lang="less">
.history{
    height:100%;
    width: 100%;
    background-image: url("../../../../assets/imgs/login/login.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .head{
        height: 50px;
        width: 100%;
        background: #D4E8F5;
        //opacity: 0.95;
        .text{
            height: 100%;
            width:100px;
            line-height: 50px;
           margin-left: 55px;
        }
    }
    .history_date{
        height: 100%;
        width:100% ;
        box-sizing: border-box;
        position: relative;
        .choose_time{
            height:60px;
            width: 100%;
            padding: 5px 10px;
            box-sizing: border-box;
            background: #D4E8F5;
            //opacity: 0.95;
            box-sizing: border-box;
            .choose{
                //width:280px;
                float: left;
                margin-left: 60px;
                //margin-right: 20px;
                .line_name{
                    font-size: 16px;
                    font-family: Alibaba PuHuiTi;
                    font-weight: 400;
                    color: #767676;
                    line-height: 50px;
                }
                .selece{
                   float: right;
                   padding-top: 5px;
                   box-sizing: border-box;
                }
            }
            .btn{
                width: 200px;
                height:50px;
                float: left;
                padding: 5px;
                box-sizing: border-box;
            }
        }
        .post_video{
            width:calc(100% - 40px);
            margin:20px;
            .row_one,.row_two{
                margin-top: 40px;
                .el-col {
                    border-radius: 4px;
                    .card_one{
                    background-image: url("./video/choss/1.jpg");
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    }
                    .card_two{
                        background-image: url("./video/choss/2.jpg");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                    .card_three{
                        background-image: url("./video/choss/3.jpg");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                    .card_four{
                        background-image: url("./video/choss/09111B2_3675673d8f7baa702201909110537260_16.jpg");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                    .card_five{
                    background-image: url("./video/choss/0912A1_4c50b613d38e4e921201909120346077_9.jpg");
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    }
                    .card_six{
                        background-image: url("./video/choss/0912A4_94d07edd321bccd61201909121847031_10.jpg");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                    .card_seven{
                        background-image: url("./video/choss/0914B3_6730cd9096ca84682201909141041121_9.jpg");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                    .card_eight{
                        background-image: url("./video/choss/0917B1_c0a2c990fe625f122201909170225033_4.jpg");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                    .el-card{
                        height: 300px;
                    }
                    }               
                    }
                    .grid-content {
                        border-radius: 4px;
                        min-height: 36px;
                        background: #99a9bf;
                        height: 300px;
                        
                    }
           
        }
        .el-pagination--small .btn-next, .el-pagination--small .btn-prev, .el-pagination--small .el-pager li, .el-pagination--small .el-pager li.btn-quicknext, .el-pagination--small .el-pager li.btn-quickprev, .el-pagination--small .el-pager li:last-child{
            position: absolute;
            bottom: 20px;
            background-color: transparent;
            color: black;
        }
        // .show_date{
        //     width:100%;
        //     height:auto;
        //     margin-bottom: 20px;
        // }
        // .show_video{
        //     width: 100%;
        //     height: auto;
        //     margin-bottom: 20px;
        //     overflow: hidden;
        //     .video_view{
        //         float: left;
        //         width: 50%;
        //         height: 500px;
        //         .one_video{
        //         height:100%;
        //         width:100%  !important;
        //         object-fit: fill;
        //     }
        //     }
        //     .video_echart{
        //         width: calc(50% - 20px);
        //         margin-left: 20px;
        //         float: left;
        //         height: 500px;
        //         background-color: white;
        //     }
        // }
        // .show_fail_date{
        //     width: 100%;
        //     height: 500px;
        //     background-color: white;
        // }
    }
}
 
</style>
