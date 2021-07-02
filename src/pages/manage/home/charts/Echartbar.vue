<template>
                <div id="myChart"></div>
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
                let myChartDrawer = echarts.init(document.getElementById('myChart'))
                // 绘制条形图
                var option = {
                    title: {
                        text: '2021年5月5日 8:00-14:00不合格布匹',
                        top: -5,
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['A', 'B', 'C', 'D', 'E']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [30,20, 50,46,10],
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    // build a color map as your need.
                                    var colorList = [
                                    '#0e345c','#2e5277','#3f81ae','#4ea1cf ','#6bbcdd',
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        },
                        type: 'bar'
                    }]
                };
                myChartDrawer.setOption(option);
            }
        }
    }
</script>
 
<style lang="less">
    #myChart {
        width: 100%;
        height: calc(55vh - 150px);
        clear: both;
        box-sizing: border-box;
        margin: 20px auto;
    }
</style>