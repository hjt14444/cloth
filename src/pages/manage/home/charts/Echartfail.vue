<template>
<div class="Echartfail">
    <div id="myChartfail"></div>
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
                let myChartDrawer = echarts.init(document.getElementById('myChartfail'))
                // 绘制条形图
                var option = {
                        title: {
                            text: '近日不同流水线不合格数据',
                            left: 'center',
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['蒸发量', '降水量'],
                            orient: 'vertical',
                            right:'10px',
                            bottom:'10%',
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore: {show: true},
                                saveAsImage: {show: true},
                            }
                        },
                        calculable: true,
                        xAxis: [
                            {
                                type: 'category',
                                data: ['A', 'B', 'C', 'D', 'E', 'F']
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: '2021-4-27',
                                type: 'bar',
                                data: [20, 30, 10,16,14, 10],
                                 itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,		//开启显示
                                            position: 'top',	//在上方显示
                                            textStyle: {	    //数值样式
                                                color: 'black',
                                                fontSize: 16
                                            }
                                        }
                                    }
                                },
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'},
                                        {type: 'min', name: '最小值'}
                                    ]
                                },
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'}
                                    ]
                                }
                            },
                            {
                                name: '2021-4-28',
                                type: 'bar',
                                data: [10,15, 11,12,13, 16],
                                 itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,		//开启显示
                                            position: 'top',	//在上方显示
                                            textStyle: {	    //数值样式
                                                color: 'black',
                                                fontSize: 16
                                            }
                                        }
                                    }
                                },
                                markPoint: {
                                    data: [
                                        {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                                        {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                                    ]
                                },
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'}
                                    ]
                                }
                            },
                            {
                                name: '2021-4-29',
                                type: 'bar',
                                data: [10,15, 11,12,13, 16],
                                 itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,		//开启显示
                                            position: 'top',	//在上方显示
                                            textStyle: {	    //数值样式
                                                color: 'black',
                                                fontSize: 16
                                            }
                                        }
                                    }
                                },
                                markPoint: {
                                    data: [
                                        {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                                        {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                                    ]
                                },
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'}
                                    ]
                                }
                            },
                        ]
                        };
 
                myChartDrawer.setOption(option);
            }
        }
    }
</script>
 
<style lang="less">
.Echartfail{
    height: 100%;
    width: 100%;
    padding-top: 20px;
    box-sizing: border-box;
#myChartfail {
        width: 100%;
        height:100%;
        clear: both;
        box-sizing: border-box;
        margin: 20px auto;
    }
}
    
</style>