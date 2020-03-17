<template>
    <div class="userAll">
        <div class="oneBox">
            <p>概览</p>
            <div class="oneMinBox">
                <div style="display: flex;align-items: center">
                    <img style="width: 0.7rem;height: 0.7rem;border-radius: 50%;overflow: hidden" src="../../../assets/img/user/userIcon.png" alt="">
                    <span style="margin-left: 0.1rem">
                        <span style="line-height: 0.3rem;font-size:16px;color:rgba(102,102,102,1);white-space: nowrap;">Beone  APCOS</span><br>
                        <span style="display: flex;align-items: center;">
                            <img src="../../../assets/img/user/minIcon001.png" alt="1">
                            <span style="width: 1px;height:8px;border:1px solid rgba(204,204,204,1);margin:0 0.08rem"></span>
                            <img src="../../../assets/img/user/minIcon002.png" alt="2">
                            <span style="width: 1px;height:8px;border:1px solid rgba(204,204,204,1);margin:0 0.08rem"></span>
                            <img src="../../../assets/img/user/minIcon003.png" alt="3">
                        </span>
                    </span>
                </div>
                <div class="mmBox">
                    <div>
                        <p>54</p>
                        <span>全部评价</span>
                    </div>
                    <span class="mmIconBox"></span>
                    <div>
                        <p>98%</p>
                        <span>好评率</span>
                    </div>
                    <span class="mmIconBox"></span>
                    <div>
                        <p>24,468元</p>
                        <span>累计收入</span>
                    </div>
                    <span class="mmIconBox"></span>
                    <div>
                        <p>428元</p>
                        <span>消费金额</span>
                    </div>
                    <span class="mmIconBox"></span>
                    <div>
                        <p>54</p>
                        <span>参与项目</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="twoBox">
            <div class="echartBox">
                <div class="titleBox">
                    <span>财务</span>
                    <span>更多</span>
                </div>
                <div class="ecBox">
                    <div class="textBox">
                        <span class="textItemBox">
                            <span>
                                <p style="font-size:0.16rem;color:rgba(153,153,153,1);">当前余额</p>
                                <p style="font-size:0.14rem;color:rgba(114,167,237,1);font-weight: 600">￥20,001</p>
                            </span>
                        </span>
                        <span class="textItemBox">
                            <span>
                                <p style="font-size:0.16rem;color:rgba(153,153,153,1);">待收货款</p>
                                <p style="font-size:0.14rem;color:rgba(114,167,237,1);font-weight: 600">￥5,222</p>
                            </span>
                        </span>
                    </div>
                    <div id="main" :style="{width: Width,height: Height,marginTop:'0.55rem'}"></div>
                </div>
            </div>
            <div class="listBox">
                <div class="titleBox">
                    <span>评价</span>
                    <span>更多</span>
                </div>
                <ul class="msgBox">
                    <li v-for="(item,index) in msgData" :key="index" v-if="index < 5">
                        <img class="txIcon" :src="item.userIcon" alt="">
                        <div>
                            <span>
                                <span style="margin-right: 0.1rem;font-size:0.16rem;color:rgba(102,102,102,1);">{{item.userName}}</span>
                                <img src="../../../assets/img/user/wjxIcon.png" alt="">
                                <img src="../../../assets/img/user/wjxIcon.png" alt="">
                                <img src="../../../assets/img/user/wjxIcon.png" alt="">
                                <img src="../../../assets/img/user/wjxIcon.png" alt="">
                                <img src="../../../assets/img/user/wjxIcon.png" alt="">
                            </span>
                            <p style="font-size:0.12rem;color:rgba(153,153,153,1);margin: 0.05rem 0">{{item.msgTime}}</p>
                            <p style="font-size:0.14rem;color:rgba(102,102,102,1);">{{item.msgText}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "all",
        data(){
            return{
                Width:'100%',
                Height:'3.5rem',
                msgData:[
                    {
                        userIcon:require('../../../assets/img/user/minIcon.png'),
                        userName:'1**3',
                        msgTime:'99天前',
                        msgText:'样式做的非常好看，期待下次继续合作。'
                    },
                    {
                        userIcon:require('../../../assets/img/user/minIcon.png'),
                        userName:'1**1',
                        msgTime:'56天前',
                        msgText:'样式做的非常好看，期待下次继续合作。'
                    },
                    {
                        userIcon:require('../../../assets/img/user/minIcon.png'),
                        userName:'1**2',
                        msgTime:'22天前',
                        msgText:'样式做的非常好看，期待下次继续合作。'
                    },
                    {
                        userIcon:require('../../../assets/img/user/minIcon.png'),
                        userName:'1**4',
                        msgTime:'14天前',
                        msgText:'样式做的非常好看，期待下次继续合作。'
                    },
                    {
                        userIcon:require('../../../assets/img/user/minIcon.png'),
                        userName:'1**8',
                        msgTime:'11天前',
                        msgText:'样式做的非常好看，期待下次继续合作。'
                    },
                    {
                        userIcon:require('../../../assets/img/user/minIcon.png'),
                        userName:'1**6',
                        msgTime:'12天前',
                        msgText:'样式做的非常好看，期待下次继续合作。'
                    }
                ]
            }
        },
        mounted() {
            this.drawLine();
        },
        methods:{
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('main'));
                // 绘制图表
                myChart.setOption({
                    tooltip: {},
                    xAxis: {
                        data: ["1","2","3","4","5"]
                    },
                    yAxis: {},
                    series: [{
                        name: '资金',
                        type: 'bar',
                        data: [500, 2040, 3600, 1200, 1500,]
                    }]
                });
            }
        }
    }
</script>

<style scoped>
    .userAll{
        width: 100%;
    }
    .oneBox{
        width: 8.8rem;
        height: 1.6rem;
        box-shadow: 0 0 0.1rem 0.1rem rgba(0,0,0,0.05);
    }
    .oneBox > p{
        font-size:0.16rem;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(102,102,102,1);
        line-height:0.4rem;
        text-align: left;
        padding-left: 0.23rem;
        border-bottom: 1px solid rgba(240,240,240,1);
    }
    .oneMinBox{
        padding: 0 0.3rem;
        display: flex;
        align-items: center;
        height: 1.1rem;
        margin-top: 0.01rem;
        justify-content: space-between;
    }
    .mmBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .mmBox>div{
        margin: 0 0.2rem;
    }
    .mmBox  p{
        font-size:0.2rem;
        font-family:Microsoft YaHei;
        font-weight:400;line-height: 0.4rem;
        color:rgba(102,102,102,1);
    }
    .mmBox span{
        font-size:0.14rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .mmIconBox{
        width:1px;
        height:0.2rem;
        background:rgba(240,242,245,1);
    }

    .twoBox{
        margin-top: 0.3rem;
        width: 100%;
        display: flex;
        justify-content: space-between;

    }
    .echartBox{
        width:5.22rem;
        height:4.6rem;
        background:rgba(255,255,255,1);
        border-radius:0.08rem;
        box-shadow: 0 0 0.1rem 0.1rem rgba(0,0,0,0.05);
    }
    .listBox{
        width:3.3rem;
        height:4.6rem;
        background:rgba(255,255,255,1);
        border-radius:0.04rem;
        box-shadow: 0 0 0.1rem 0.1rem rgba(0,0,0,0.05);
    }
    .titleBox{
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        padding: 0 0.23rem;
        text-align: left;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(240,240,240,1);
    }
    .titleBox span:nth-child(1){
        font-size:0.16rem;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(102,102,102,1);
    }
    .titleBox span:nth-child(2){
        font-size:0.12rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(47,128,237,1);
    }
    .msgBox{
        margin-top: 0.1rem;
        width: 100%;
        height: 4.1rem;
        list-style: none;
        padding: 0 0.28rem;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .msgBox::-webkit-scrollbar {
        display: none;
    }
    .msgBox li{
        text-align: left;
        width: 100%;
        display: flex;
        justify-content: left;
        margin: 0.08rem 0;
    }
    .msgBox li .txIcon{
        width: 0.36rem;
        height: 0.36rem;
        margin-right: 0.14rem;
    }

    .ecBox{
        width: 100%;
        margin-top: 0.1rem;
        position: relative;
    }
    .textBox{
        position: absolute;
        top: -0.3rem;
        left: 0.1rem;
        width: 2.4rem;
        height: auto;
        display: flex;justify-content: space-between;
        align-items: center;
    }

    .textItemBox{
        width: 50%;
    }
    .textItemBox p{
        line-height: 0.3rem;
    }
</style>
