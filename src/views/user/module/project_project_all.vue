<template>
    <div class="maxBox">
        <div class="navBox">
            <router-link class="navItem"
                         v-for="(item,index) in navData"
                         :key="index"
                         :to="item.link">
                <img :src="item.imgUrl" alt="">
                <div>
                    <p :style="{color:item.color}">{{item.number}}</p>
                    <span>{{item.title}}</span>
                </div>
            </router-link>
        </div>
        <div class="twoBox">
            <div id="main" style="width: 100%;height: 100%;"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "project_project_all",
        data(){
            return{
                navData:[
                    {
                        imgUrl:require('../../../assets/img/project_center/allImg.png'),
                        number:120,
                        title:'总项目',
                        color:'#0068ff',
                        link:"/project_center/all_project_all_list"
                    },
                    {
                        imgUrl:require('../../../assets/img/project_center/goImg.png'),
                        number:64,
                        title:'进行中的项目',
                        color:'#edd14d',
                        link:"/project_center/all_in_progress_project"
                    },
                    {
                        imgUrl:require('../../../assets/img/project_center/sucImg.png'),
                        number:48,
                        title:'已完成的项目',
                        color:'#56d7ab',
                        link:"/project_center/all_finsh_project"
                    },
                    {
                        imgUrl:require('../../../assets/img/project_center/errImg.png'),
                        number:8,
                        title:'超时项目',
                        color:'#e35d5d',
                        link:"/project_center/all_overtime_project"
                    },
                    {
                        imgUrl:require('../../../assets/img/project_center/dbImg.png'),
                        number:3,
                        title:'待办任务',
                        color:'#3d7aae',
                        link:"/project_center/all_need_project"
                    },
                ]
            }
        },
        mounted(){
            this.drawLine();
        },
        methods:{
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('main'));
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '项目概览分月统计图'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['创建项目数', '完成项目数', '完成项目数']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['一月', '二月', '三月', '四月', '五月', '六月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '创建项目数',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230]
                        },
                        {
                            name: '完成项目数',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330]
                        },
                        {
                            name: '累计项目数',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 330]
                        }
                    ]
                });
                window.onresize = myChart.resize;
                // myChart.resize();
            }
        }
    }
</script>

<style scoped>
    .maxBox{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .navBox{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .navBox .navItem{
        width: 19%;
        height: 1rem;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: left;
        border-radius: 0.04rem;
        cursor: pointer;
        border: solid 0.01rem #ebebeb;
    }
    .navBox .navItem img{
        width: 30%;
        margin-right: 0.1rem;
    }
    .navItem p{
        font-family: MicrosoftYaHei-Bold;
        font-size: 0.3rem;
    }
    .navItem span{
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        color: #666666;
    }
    .twoBox{
        padding: 0.1rem;
        margin-top: 0.3rem;
        width: 100%;
        height: 5.56rem;
        background: white;
        border-radius: 0.04rem;

    }
</style>
