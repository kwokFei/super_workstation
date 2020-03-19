<template>
    <div class="box">
        <!-- 标题-->
        <div class="title">
            <img src="@/assets/img/exhibition/icon.png" alt="">
            <span class="titleFonts">项目统计/<span>PROJECT OVERVIEW</span></span>
        </div>
        <div id="bar1" style="width: 300px;height: 200px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import resize from '../mixins/resize'

    export default {
        name: "chart1",
        mixins: [resize],
        data(){
            return{
                chart:null,
            }
        },
        mounted() {
            this.bar1Echart()
        },
        methods:{
            bar1Echart(){

                var myChart1 = echarts.init(document.getElementById('bar1'));
                this.chart = myChart1;
                var dataArr1 = [];
                for(var i=0;i<7;i++){
                    dataArr1.push(Math.random()*2000);
                }
                var arr1 = [{"id":"titleoption1-1",r:10,a:12000,p:0,t:1},{"id":"titleoption1-2",r:10,a:800,p:0,t:1}];
                this.getData(myChart1,7,dataArr1,2000,0,arr1,5000);
                var option1 = {
                    //animation: false,
                    grid: {
                        left: 30,
                        right: 10,
                        top: 50,
                        bottom: 20
                    },
                    axisLabel :{
                        textStyle: {
                            color: '#eee',
                            fontSize: '10',
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        },
                        data: ['0:00','4:00','8:00','12:00','16:00','20:00','24:00'],
                        axisLine: {
                            lineStyle: {
                                color: '#2a64a2'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#2a64a2',
                                type: 'dotted'
                            }
                        },
                        axisLabel: {
                            fontSize:8
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#2a64a2'
                            }
                        },
                        axisLabel: {
                            color: '#2a64a2',
                            fontSize:8
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(50,50,50,0.8)',
                                type: 'dotted'
                            },
                            interval: 1
                        },
                        min:0,
                        max:2000
                    },
                    series: [{
                        data: dataArr1,
                        type: 'line',
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: '#0280FA' // 0% 处的颜色
                                }, {
                                    offset: 0.4,
                                    color: '#2281DD' // 100% 处的颜色
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(255,255,255,0.3)' // 100% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,0,0,0)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#0280FA",
                                lineStyle: {
                                    color: "#0280FA"
                                }
                            }
                        }
                    }]
                };
                myChart1.setOption(option1);
                document.getElementById('bar1').style.width = "100%";
                document.getElementById('bar1').style.height = "2.6rem";
                setTimeout(function () {
                    myChart1.resize();
                },100)

            },
            getData(theChart,sum,dataoption,x,y,result,time){
                var timer = setInterval(function (){ //定时刷新图表
                    dataoption = [];
                    var chartOption = theChart.getOption();
                    for(var i=0;i<sum;i++){
                        dataoption.push(Math.random()*x+y);
                        /*sum2 +=  Math.random()*1000;*/
                    }
                    chartOption.series[0].data = dataoption;
                    theChart.clear();
                    theChart.setOption(chartOption);
                    theChart.hideLoading();
                }, time);
            },
        }
    }
</script>

<style scoped>
    /*每个小盒子标题*/
    .title {
        display: flex;
        align-items: center;
    }

    .title > img {
        margin-right: 0.12rem;
    }

    .title > span {
        font-size: 0.2rem;
    }
    .box {
        border-top: 0.02rem solid #3E3E4F;
        position: relative;
        padding-top: 0.12rem;
        margin-top: 0.12rem;
        width: 100%;
    }

    .box:after {
        content: "";
        display: block;
        width: 0.4rem;
        height: 0.02rem;
        background-color: #00ffff;
        position: absolute;
        right: 0;
        top: -0.02rem;
    }

</style>