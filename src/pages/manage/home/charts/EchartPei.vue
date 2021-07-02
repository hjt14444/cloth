
<template>
  <div>
    <div class="pie">
            <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
            <div id="main1" style="float:left;width:100%;height: 300px"></div>
    </div>
  </div>
</template>

<script>// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')


export default {
  created(){
  },
  mounted(){
    this.initData();
  },
  methods:{
    //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main1'));
      // 绘制图表
      myChart.setOption({
          title : {
              text: '不同流水线的瑕疵类型占比',//主标题
              //subtext: '纯属虚构',//副标题
              x:'center',//x轴方向对齐方式
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient:"vertical",
              
              x: '80%',
              y:'center',
              data: ['沾污','错花','水印','花毛','缝头','缝头印','虫粘','破洞',
              '褶子','织疵','漏印','蜡斑','色差','网折','其他'
              ]
          },
          series : [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius : '55%',
                  center: ['40%', '60%'],
                  data:[
                      {value:135, name:'沾污'},
                      {value:70, name:'错花'},
                      {value:34, name:'水印'},
                      {value:45, name:'花毛'},
                      {value:60, name:'缝头'},
                      {value:48, name:'缝头印'},
                      {value:58, name:'虫粘'},
                      {value:58, name:'破洞'},
                      {value:135, name:'褶子'},
                      {value:210, name:'织疵'},
                      {value:34, name:'漏印'},
                      {value:35, name:'蜡斑'},
                      {value:58, name:'色差'},
                      {value:48, name:'网折'},
                      {value:58, name:'其他'},
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      },
                      normal:{
                      label:{
                      show: true,
                      formatter: '{b}:{c} ({d}%)'
                      },
                      labelLine :{show:true}
                      }
                  }
              }
          ]
      });
    },
  }
}
</script>
<style lang="less">
.pie{
  height: 100%;
  width: 100%;
  padding-top:20px;
}
</style>