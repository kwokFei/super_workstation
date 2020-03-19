<template>
    <div class="leftBox">
        <chart1/>
        <div class="leftTwoBox">
                <div class="titleBox">
                    <img src="@/assets/img/exhibition/icon.png" alt="">
                    <span class="titleFonts">项目列表/<span>SOLUTION LIST</span></span>
                </div>
                <div class="enterpriseFB">
                    <div class="littleBox" id="littleBox_one">
                        <p>
                            <span>序号</span>
                            <span>项目名称</span>
                            <span>进度</span>
                            <span>操作</span>
                        </p>
                    </div>

                    <div class="littleBox">
                        <div class="enterpriseFB" id="enterpriseFB_two">
                            <p v-for="item in 11"
                                :key = "item">
                                <span>{{item}}</span>
                                <span>项目{{item}}</span>
                                <span>100%</span>
                                <span class="info">详情</span>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
    </div>
</template>

<script>
    import chart1 from './leftChart/chart1'

    export default {
        name: "left",
        components:{
            chart1
        },

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
    #left {
        width: 4.21rem;
        display: flex;
        flex-direction: column;
    }

    #left .left-one {
        display: flex;
        flex-direction: column;
        padding-top: 0.3rem;
        width: 4.21rem;
        height: 1.52rem;
        background: url(~@/assets/img/exhibition/box_bac1.png) no-repeat;
        background-size: 4.21rem 1.52rem;
        position: relative;
        margin-bottom: 0.2rem;
    }

    .left-one>p {
        margin-left: 0.38rem;
    }

    .left-one>p:first-child {
        font-size: 0.26rem;
        font-weight: bold;
        margin-top: 0.15rem;
        margin-bottom: 0.1rem;
    }

    #left .left-two {
        display: flex;
        flex-direction: column;
        padding-top: 0.3rem;
        width: 4.21rem;
        height: 2.62rem;
        background: url(~@/assets/img/exhibition/box_bac2.png) no-repeat;
        background-size: 4.21rem 2.62rem;
        position: relative;
        margin-bottom: 0.25rem;
    }
    /*企业信息*/
    .company-info {
        width: 100%;
        height: 1.9rem;
        overflow: hidden;
        margin-top: 0.15rem;
        padding-left: 0.18rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }


    .company-info .info-title{
        display: inline-block;
        font-size: 0.14rem;
        color: #cccccc;
        width: 0.75rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .company-info > div{
        display: flex;
        align-items: center;
    }

    .company-info >div >span{
        display: inline-block;
        font-size: 0.16rem;
        color: #ffffff;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .company-info > div >span:nth-child(2){
        width: 1.03rem;
        padding-left: 0.1rem;
    }


    .company-info>div>span>img{
        width: 1.16rem;
        margin-left: 0.28rem;
    }

    #left .left-three {
        display: flex;
        flex-direction: column;
        padding-top: 0.3rem;
        width: 4.21rem;
        height: 1.52rem;
        background: url(~@/assets/img/exhibition/box_bac3.png) no-repeat;
        background-size: 4.21rem 1.52rem;
        position: relative;
        margin-bottom: 0.23rem;
    }

    .left-three .air-box {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .air-box .echart-box {
        display: flex;
        align-items: center;
        width: 0.8rem;
        height: 100%;
        margin: 0 0.3rem;
    }

    .air-box .echart-box>div {
        width: 0.8rem;
        height: 0.8rem;
    }

    .air-box .right-box {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    .air-box .right-box .air-item {
        display: flex;
        flex-direction: column;
        width: 40%;
        margin-right: 0.2rem;
        margin-bottom: 0.15rem;
    }

    .air-item .item-text {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-bottom: 0.05rem;
    }

    .air-item>span {
        width: 100%;
        height: 0.05rem;
        border-radius: 0.5rem;
    }

    #left .left-four {
        display: flex;
        flex-direction: column;
        padding-top: 0.3rem;
        width: 4.21rem;
        height: 3.22rem;
        background: url(~@/assets/img/exhibition/box_bac4.png) no-repeat;
        background-size: 4.21rem 3.22rem;
        position: relative;
    }

    .left-four .Switch {
        right: 0.2rem;
        top: 0.2rem;
    }

    .left-four .box-head {
        display: flex;
        flex-direction: column;
        padding: 0 0.25rem;
        position: relative;
    }

    .left-four .box-head .box-item-coloum {
        margin-top: 0.2rem;
    }

    .left-four .box-head .text-content>span {
        font-size: 0.24rem;
        color: #00A2FF;
        font-weight: bold;
    }

    .left-four .box-head .box-item-coloum>span {
        font-size: 0.12rem;
    }

    .left-four .box-body {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .left-four .box-body>div {
        width: 3.8rem;
        height: 1.8rem;
    }

    .left-four .right-box {
        display: flex;
        align-items: center;
        margin-left: 0.1rem;
    }

    #enterpriseFB_two{
        margin-top: 0;
        height: 4rem;
        overflow: auto;
    }
    /*
       左边第二个大盒子
   */
    .contentBox .leftBox .leftTwoBox{
        margin-top: 0.3rem;
        position: relative;
        width: 3.8rem;
        height: 5.33rem;
        border-top: 2px solid rgb(62,62,79);
        border-bottom: 2px solid rgb(62,62,79);
        padding-top: 0.12rem;
    }
    .contentBox .leftBox .leftTwoBox::after{
        content: "";
        width: 0.4rem;
        height: 2px;
        position: absolute;
        background-color: rgb(0,255,255);
        top: -2px;
        right: 0;
    }
    /*
        list盒子
    */
    .contentBox .leftBox .leftTwoBox .enterpriseFB{
        margin-top: 0.2rem;
        /*width: 3.8rem;*/
        /*height: 4rem;*/
        padding:0 0.05rem;
        /*overflow: auto;*/
    }
    .contentBox .leftBox .leftTwoBox .enterpriseFB::-webkit-scrollbar {
        display: none;
        width: 0 !important
    }
    .contentBox .leftBox .leftTwoBox .enterpriseFB p{
        height: 0.4rem;
        line-height: 0.4rem;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
    }
    .contentBox .leftBox .leftTwoBox .enterpriseFB p span{
        font-size: 0.16rem;
        min-width: 40px;
    }

    .contentBox .leftBox .leftTwoBox .enterpriseFB p span:nth-child(1){
        margin-left: 5px;
        min-width: 24px;
    }
    .contentBox .leftBox .leftTwoBox .enterpriseFB p span:nth-child(2){
        width: 1.5rem;
        text-align: center;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .contentBox .leftBox .leftTwoBox .enterpriseFB p span:nth-child(3){
        margin-right: 5px;
        min-width: 32px;
        text-align: center;
    }
    #littleBox_one{
        padding: 0 0.05rem;
    }
    #littleBox_one>p>span{
        font-size: 0.14rem !important;
        color: #c8c8c8;
    }
    .leftTwoBox #enterpriseFB_two p:nth-child(2n) {
        background-color: #214271;
    }
    .info{
        color: #00ffff;
    }



</style>