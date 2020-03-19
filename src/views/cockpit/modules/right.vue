<template>
    <div class="rightContent">
        <!--项目统计-->
        <div class="box">
            <!-- 标题-->
            <div class="title">
                <img src="@/assets/img/exhibition/icon.png" alt="">
                <span class="titleFonts">项目统计/<span>PROJECT OVERVIEW</span></span>
            </div>
            <div class="enterpriseFB">
                <div class="littleBox" id="littleBox_one">
                    <p>
                        <span>序号</span>
                        <span>内容</span>
                        <span>时间</span>
                        <span>操作</span>
                    </p>
                </div>

                <div class="littleBox">
                    <div class="enterpriseFB" id="enterpriseFB_two">
                        <p v-for="item in 11"
                           :key="item">
                            <span>{{item}}</span>
                            <span>项目{{item}}有新文件...</span>
                            <span>2020/02/27 07:38:50</span>
                            <span class="info">详情</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
        <!--项目进度-->
       <chart1/>
        <!--交付统计-->
        <chart2/>
    </div>
</template>

<script>
    import chart1 from "./rigthChart/chart1"
    import chart2 from "./rigthChart/chart2"
    export default {
        components:{
            chart1,
            chart2
        },

        name: "right",


    }
</script>

<style scoped>
    #enterpriseFB_two {
        margin-top: 0;
        height: 2rem;
        overflow: auto;
    }

    .enterpriseFB {
        margin-top: 0.2rem;
        padding: 0 0.05rem;
    }

    .enterpriseFB::-webkit-scrollbar {
        display: none;
        width: 0 !important
    }

    .enterpriseFB p {
        height: 0.4rem;
        line-height: 0.4rem;
        display: flex;
        cursor: pointer;
    }

    .enterpriseFB p span {
        font-size: 0.16rem;
        min-width: 40px;
    }

    .enterpriseFB p span:nth-child(1) {
        margin-left: 5px;
        min-width: 37px;
    }
    #enterpriseFB_two p span:nth-child(1){
        font-size: 0.12rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .enterpriseFB p span:nth-child(2) {
        width: 1.5rem;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    #enterpriseFB_two p span:nth-child(2){
        font-size: 0.12rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .enterpriseFB p span:nth-child(3) {
        margin-right: 5px;
        min-width: 108px;
        text-align: center;
    }
    #enterpriseFB_two p span:nth-child(3){
        font-size: 0.12rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    #littleBox_one {
        padding: 0 0.05rem;
    }
    #littleBox_one>p>span{
        font-size: 0.14rem !important;
        color: #c8c8c8;
    }

    #enterpriseFB_two p:nth-child(2n) {
        background-color: #214271;
    }

    .info {
        color: #00ffff;
        font-size: 0.12rem !important;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .titleFonts {
        font-size: 0.2rem;
    }

    .titleFonts > span {
        font-size: 0.08rem;
    }

    /*展厅统计*/
    .rightContent > .box:first-child > .title {
        margin-bottom: 0.14rem;
    }

    .rightContent > .box:first-child > .littleBox > div:first-child {
        font-size: 0.12rem;
        color: #ffffff;
        margin-bottom: 0.14rem;
    }

    .roomNumber {
        display: flex;
        align-items: center;
    }

    .roomNumber > div {
        width: 2.58rem;
        height: 0.53rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .roomNumber > div > div {
        width: 0.36rem;
        height: 0.53rem;
        line-height: 0.53rem;
        text-align: center;
        /*background: url("../img/index_left/number.png") no-repeat;*/
        background-size: contain;
        font-size: 0.25rem;
        color: #ffffff;
        margin-right: 0.07rem;
    }


    /*统计总数*/
    .rightContent .census {
        margin-top: 0.22rem;
    }

    .rightContent > div {
        border-bottom: 2px solid rgba(255, 255, 255, 0.2);
        height: 3rem;
        width: 3.62rem;
        /*overflow: hidden;*/
    }

    .rightContent > div:nth-child(2),
    .rightContent > div:nth-child(3) {
        margin-top: 0.22rem;
    }

    .rightContent .echartsBox {
        height: 2.18rem;
    }



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

    .xmjdBox {
        position: relative;
        margin: auto;
        margin-top: 0.2rem;
        width: 3.12rem;
        height: 4.39rem;
        /*border: 1px solid red;*/
    }

    .xmjdBox input {
        padding-left: 0.1rem;
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        background-color: rgb(0, 26, 48);
        border-radius: 0.4rem;
        font-size: 0.16rem;
        color: white;
        font-weight: bold;
        letter-spacing: 2px;
        outline: none;
        border: none;
        cursor: pointer;
    }

    ::-webkit-input-placeholder {
        color: white;
    }

    .xmjdBox .iconImg {
        position: absolute;
        top: 1.3%;
        right: 3%;
        width: 0.2rem;
        height: 0.24rem;
    }

    .dataBox {
        display: none;
        position: absolute;
        top: 0.4rem;
        left: 0;
        z-index: 999;
        width: 94%;
        margin-left: 3%;
        background-color: rgb(0, 26, 48);
    }

    .dataBox ul {
        list-style: none;
        width: 100%;
    }

    .dataBox ul li {
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        letter-spacing: 2px;
        padding-left: 0.1rem;
        color: white;
        cursor: pointer;
    }

</style>