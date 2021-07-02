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
import axios from 'axios'
export default {
    name: 'DynamicLineChart',
    data () {
        return {
        	// 实时数据数组
            date: [],
            yieldRate: [],
            yieldIndex: [],
            // 折线图echarts初始化选项
            echartsOption: {
                legend: {
                    data: ['实际收益率', '大盘收益率'],
                },
                xAxis: {
                    name: '时间',
                    nameTextStyle: {
                        fontWeight: 600,
                        fontSize: 18
                    },
                    type: 'category',
                    boundaryGap: false,
                    data: this.date,	// 绑定实时数据数组
                },
                yAxis: {
                    name: '实际收益率',
                    nameTextStyle: {
                        fontWeight: 600,
                        fontSize: 18
                    },
                    type: 'value',
                    scale: true,
                    boundaryGap: ['15%', '15%'],
                    axisLabel: {
                        interval: 'auto',
                        formatter: '{value} %'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                },
                series: [
                    {
                        name:'实际收益率',
                        type:'line',
                        smooth: true,
                        data: this.yieldRate,	// 绑定实时数据数组
                    },
                    {
                        name:'大盘收益率',
                        type:'line',
                        smooth: true,
                        data: this.yieldIndex,	// 绑定实时数据数组
                    }
                ]
            }
        }
    },
    mounted () {
        this.myChart = echarts.init(document.getElementById('myChart'), 'light');	// 初始化echarts, theme为light
        this.myChart.setOption(this.echartsOption);	// echarts设置初始化选项
        //setInterval(this.addData, 3000);	// 每三秒更新实时数据到折线图
    },
    methods: {
    	// 获取当前时间
        getTime() {	
            var ts = arguments[0] || 0;
            var t, h, i, s;
            t = ts ? new Date(ts * 1000) : new Date();
            h = t.getHours();
            i = t.getMinutes();
            s = t.getSeconds();
            // 定义时间格式
            return (h < 10 ? '0' + h : h) + ':' + (i < 10 ? '0' + i : i) + ':' + (s < 10 ? '0' + s : s);
        },
        // 添加实时数据
        addData() {
        	// 从接口获取数据并添加到数组
            axios.get('url').then((res) => {
                this.yieldRate.push((res.data.actualProfitRate * 100).toFixed(3));
                this.yieldIndex.push((res.data.benchmarkProfitRate * 100).toFixed(3));
                this.date.push(this.getTime(Math.round(new Date().getTime() / 1000)));
                // 重新将数组赋值给echarts选项
                this.echartsOption.xAxis.data = this.date;
                this.echartsOption.series[0].data = this.yieldRate;
                this.echartsOption.series[1].data = this.yieldIndex;
                this.myChart.setOption(this.echartsOption);
            });
        }
    }
}
</script>

<style lang="less">
#myChart{
  width: 100%;
  height:100%;
  margin: 0 auto;
}
</style>
