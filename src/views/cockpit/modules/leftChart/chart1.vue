<template>
    <div class="leftOneBox">
        <div class="titleBox">
            <img src="@/assets/img/exhibition/icon.png" alt="">
            <span class="titleFonts">项目总览/<span>PROJECT OVERVIEW</span></span>
        </div>
        <div id="bar3" style="width: 100%;height: 3rem;"></div>
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
            this.leftOneEchart()
        },
        methods:{
            leftOneEchart(){
                var myChart3 = echarts.init(document.getElementById('bar3'));
                this.chart = myChart3;
                setInterval(function(){
                    var chartoption3 = myChart3.getOption();
                    myChart3.clear();
                    console.log(chartoption3);
                    myChart3.setOption(chartoption3);
                },5000);
                var option3 = {
                    //animation: false,
                    grid:{
                        // show:false,
                        top:0,
                        left:50
                    },
                    xAxis: {
                        show:false,
                        min:0,                    //坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。不设置时会自动计算最小值保证坐标轴刻度的均匀分布。在类目轴中，也可以设置为类目的序数
                        max:20
                    },
                    yAxis: {
                        show:false,
                        min:0,                    //坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。不设置时会自动计算最小值保证坐标轴刻度的均匀分布。在类目轴中，也可以设置为类目的序数
                        max:10
                    },
                    label: { //饼图图形上的文本标签
                        show: true,
                        textStyle : {
                            fontWeight : 'bold',
                            fontSize : 22,
                        },
                        color: '#fff',
                        distance : 20,
                        align : "center"
                    },
                    series: [
                        {
                            name: '总项目',
                            type: 'scatter',
                            symbolSize: function (data) {
                                return data[2];
                            },
                            hoverAnimation:false,
                            colorAlpha:false,
                            opacity:100,
                            itemStyle:{                 //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                                normal:{
                                    opacity:1,
                                    color:function(data){
                                        var colornum = (data.data)[2];
                                        if(colornum>=90){
                                            return '#0082FC';
                                        }else if(colornum<90&&colornum>=70){
                                            return '#00FDF3';
                                        }else if(colornum<70&&colornum>50){
                                            return '#FE663F';
                                        }else if(colornum<=50&&colornum>=0){
                                            return '#58ADFF';
                                        }else{
                                            return '#fff';
                                        }
                                    },
                                    label: { //饼图图形上的文本标签
                                        formatter: function(res){
                                            return "总项目\n" +  (res.data)[2] + "个";
                                        },
                                        textStyle : {
                                            fontWeight : 'bold',
                                            fontSize : 18,
                                        },
                                        position:'inside'
                                    }
                                }
                            },
                            data: [
                                [8,2,160,'28%'],
                            ]
                        },
                        {
                            name: '正常',
                            type: 'scatter',
                            symbolSize: function (data) {
                                return data[2];
                            },
                            hoverAnimation:false,
                            colorAlpha:false,
                            opacity:100,
                            itemStyle:{                 //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                                normal:{
                                    opacity:1,
                                    color:function(data){
                                        var colornum = (data.data)[2];
                                        if(colornum>=90){
                                            return '#0082FC';
                                        }else if(colornum<90&&colornum>=65){
                                            return '#00FDF3';
                                        }else if(colornum<65&&colornum>50){
                                            return '#FE663F';
                                        }else if(colornum<=50&&colornum>=0){
                                            return '#58ADFF';
                                        }else{
                                            return '#fff';
                                        }
                                    },
                                    label: { //饼图图形上的文本标签
                                        textStyle : {
                                            fontWeight : 'bold',
                                            fontSize : 14,
                                        },
                                        formatter: function(res){
                                            return "正常\n" +  (res.data)[2] + "个";
                                        },
                                        position:'left'
                                    }
                                }
                            },
                            data: [
                                [5,5,65,'30%'],
                            ]
                        },
                        {
                            name: '离线',
                            type: 'scatter',
                            symbolSize: function (data) {
                                return data[2];
                            },
                            hoverAnimation:false,
                            colorAlpha:false,
                            opacity:100,
                            itemStyle:{                 //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                                normal:{
                                    opacity:1,
                                    color:function(data){
                                        var colornum = (data.data)[2];
                                        if(colornum>=90){
                                            return '#0082FC';
                                        }else if(colornum<90&&colornum>=65){
                                            return '#00FDF3';
                                        }else if(colornum<65&&colornum>50){
                                            return '#FE663F';
                                        }else if(colornum<=50&&colornum>=0){
                                            return '#58ADFF';
                                        }else{
                                            return '#fff';
                                        }
                                    },
                                    label: { //饼图图形上的文本标签
                                        textStyle : {
                                            fontWeight : 'bold',
                                            fontSize : 14,
                                        },
                                        formatter: function(res){
                                            return "离线\n" +  (res.data)[2] + "个";
                                        },
                                        position:'left'
                                    }
                                }
                            },
                            data: [
                                [3,0,55,'8%']
                            ]
                        },
                        {
                            name: '待发布',
                            type: 'scatter',
                            symbolSize: function (data) {
                                return data[2];
                            },
                            hoverAnimation:false,
                            colorAlpha:false,
                            opacity:100,
                            itemStyle:{                 //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                                normal:{
                                    opacity:1,
                                    color:function(data){
                                        var colornum = (data.data)[2];
                                        if(colornum>=90){
                                            return '#0082FC';
                                        }else if(colornum<90&&colornum>=70){
                                            return '#00FDF3';
                                        }else if(colornum<70&&colornum>50){
                                            return '#FE663F';
                                        }else if(colornum<=50&&colornum>=0){
                                            return '#58ADFF';
                                        }else{
                                            return '#fff';
                                        }
                                    },
                                    label: { //饼图图形上的文本标签
                                        textStyle : {
                                            fontWeight : 'bold',
                                            fontSize : 14,
                                        },
                                        formatter: function(res){
                                            return "待发布\n" +  (res.data)[2] + "个";
                                        },
                                        position:'right'
                                    }
                                }
                            },
                            data: [
                                [11.5,0,40,'5%'],
                            ]
                        }
                    ]
                };
                myChart3.setOption(option3);
                // console.log(option3);
                document.getElementById('bar3').style.width = "100%";
                document.getElementById('bar3').style.height = "3.3rem";
                setTimeout(function () {
                    myChart3.resize();
                },100)
            },
        }
    }
</script>

<style scoped>
    .titleFonts{
        font-size: 0.2rem;
    }
    .titleFonts>span{
        font-size: 0.08rem;
    }
    .titleBox{
        display: flex;
        align-items: center;
    }
    .titleBox>img{
        margin-right: 0.12rem;
    }


</style>