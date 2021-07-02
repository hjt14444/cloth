<template>
<div class="Echarthistory">
    <div id="myCharthistory"></div>
</div>
</template>
 
<script>
let echarts = require('echarts/lib/echarts')
// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')


    export default {
        mounted () {
            // 调用绘制图表的方法
            this.draw();
        },
        methods: {
            draw () {
                // 实例化echarts对象
                let myChartDrawer = echarts.init(document.getElementById('myCharthistory'))
                // 绘制条形图
                var option = {
                    title: {
                            text: '每帧的布匹瑕疵数',
                            left: 'center',
                        },
                    xAxis: {
                        type: 'category',
                        data: ['00:01', '00:02', '00:03', '00:04', '00:05', '00:6']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [18, 8, 9, 4, 7, 5, 3],
                        type: 'line',
                        symbol: 'triangle',
                        symbolSize: 20,
                        lineStyle: {
                            color: '#5470C6',
                            width: 4,
                            type: 'dashed'
                        },
                        itemStyle: {
                            borderWidth: 3,
                            borderColor: '#EE6666',
                            color: 'yellow'
                        }
                    }]
                };
                
                myChartDrawer.setOption(option);
            }
        }
    }
</script>
 
<style lang="less">
.Echarthistory{
    height: 100%;
    width: 100%;
    padding-top: 20px;
    box-sizing: border-box;
#myCharthistory {
        width: 100%;
        height:100%;
        clear: both;
        box-sizing: border-box;
        margin: 20px auto;
    }
}
    
</style>