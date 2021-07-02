<template>
       <div id="myChart"></div>
</template>
<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/bar');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    export default {
        name: "DataCount",
        data: () => ({
            msg: 'Welcome to Your Vue.js App'
        }),
        mounted(){
            this.drawLine();
        },
        methods:{
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'));
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '每帧的布匹瑕疵数',
                        subtext: '',
                        left:'center'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        //data:['最高','最低']
                        data:['最高'],
                        top:40,
                    },
                    toolbox: {
                        show: true,
                        
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        name:'5-2',
                        data: ['8:30:12','8:30:15','8:30:18','8:30:21','8:30:24']
                    },
                    yAxis: {
                        type: 'value',
                        name:'(个)',
                        axisLabel: {
                            formatter: '{value}'
                        },
                        
                    },
                    series: [
                        {
                            name:'最高',
                            type:'line',
                            data:[3, 4, 7, 6, 4],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        // {
                        //     name:'最低',
                        //     type:'line',
                        //     data:[1, -2, 2, 5, 3, 2, 0],
                        //     markPoint: {
                        //         data: [
                        //             {name: '周最低', value: 2, xAxis: 1, yAxis: 1.5}
                        //         ]
                        //     },
                        //     markLine: {
                        //         data: [
                        //             {type: 'average', name: '平均值'},
                        //             [{
                        //                 symbol: 'none',
                        //                 x: '90%',
                        //                 yAxis: 'max'
                        //             }, {
                        //                 symbol: 'circle',
                        //                 label: {
                        //                     normal: {
                        //                         position: 'start',
                        //                         formatter: '最大值'
                        //                     }
                        //                 },
                        //                 type: 'max',
                        //                 name: '最高点'
                        //             }]
                        //         ]
                        //     }
                        // }
                    ]
                });
            }
        }
    }
</script>
<style lang="less">
#myChart{
  width: 100%;
  height:100%;
  padding-top: 20px;
  box-sizing: border-box;

}
</style>