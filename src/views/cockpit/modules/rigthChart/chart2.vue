<template>
    <div class="box">
        <!-- 标题-->
        <div class="title">
            <img src="@/assets/img/exhibition/icon.png" alt="">
            <span class="titleFonts">交付统计/<span>PROJECT STATISTICS</span></span>
        </div>
        <div id="bar2" style="width: 300px;height: 200px;"></div>
    </div>
    
</template>

<script>
    import echarts from 'echarts'
    import resize from '../mixins/resize'
    export default {
        name: "chart2",
        mixins: [resize],
        data(){
            return{
                chart:null,
            }
        },
        mounted() {
            this.bar2Echart()
        },
        methods:{
            bar2Echart(){
                var myChart1 = echarts.init(document.getElementById('bar2'));
                this.chart = myChart1;
                var dataArr1 = [];
                for(var i=0;i<7;i++){
                    dataArr1.push(Math.random()*2000);
                }
                var arr1 = [{"id":"titleoption1-1",r:10,a:12000,p:0,t:1},{"id":"titleoption1-2",r:10,a:800,p:0,t:1}];
                this.getData(myChart1,7,dataArr1,2000,0,arr1,5000);
                var option1 = {
                    grid: {
                        left: 40,
                        right: 10,
                        top: 50,
                        bottom: 30
                    },
                    title:{
                        show : true,
                        text:['{mothTitle|本月交付}','{value| 5}'].join(''),
                        textStyle :{
                            rich: {
                                mothTitle: {
                                    fontSize: 14,
                                    color: '#ffffff',
                                },
                                value: {
                                    fontSize: 28,
                                    color: '#00ffff',
                                }
                            }
                        },
                    },
                    xAxis: [{
                        type: 'category',
                        color: '#59588D',
                        data: ['02','03','04','05','06','07','08'],
                        axisPointer: {
                            type: 'line'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#272456'
                            }
                        },
                        axisLabel: {
                            margin: 20,
                            color: '#59588D',
                            textStyle: {
                                fontSize: 12
                            },
                        },
                    }],
                    yAxis: [{
                        type: 'value',
                        min: 0,
                        max: 15,
                        axisLabel: {
                            formatter: '{value}',
                            color: '#59588D',
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#272456'
                            }
                        }
                    }],
                    series: [{
                        type: 'bar',
                        data: [10, 9, 1, 9, 9, 2, 5, 8],
                        barWidth: '20px',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#41E1D4' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#10A7DB' // 100% 处的颜色
                                }], false),
                                barBorderRadius: [30, 30, 0, 0],
                                shadowColor: 'rgba(0,255,225,1)',
                                shadowBlur: 4,
                            }
                        },
                    }]
                };
                myChart1.setOption(option1);
                document.getElementById('bar2').style.width = "100%";
                document.getElementById('bar2').style.height = "2.5rem";
                setTimeout(function () {
                    myChart1.resize();
                },100)

            },
            getData(theChart,sum,dataoption,x,y,result,time){
                var timer = setInterval(function (){ //定时刷新图表
                    dataoption = [];
                    var chartOption = theChart.getOption();
                    for(var i=0;i<sum;i++){
                        dataoption.push((Math.random()*x+y)/100);
                        /*sum2 +=  Math.random()*1000;*/
                    };
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