<template>
    <div class="centerContent" >
        <!--                顶部选择按钮-->
        <div>

            <div class="changeDot" show="all">
                <img src="@/assets/img/exhibition/green.png" alt="">
                <span>正常</span>
                <span style="width: 1.4rem"></span>
            </div>

            <div class="changeDot" show="project" style="width: 1.4rem">
                <img src="@/assets/img/exhibition/yellow.png" alt="">
                <span>离线</span>
                <span style="width: 1.4rem"></span>
            </div>

            <div class="changeDot" show="room" style="width: 1.4rem">
                <img src="@/assets/img/exhibition/blue.png" alt="">
                <span>待发布</span>
                <span style="width: 1.4rem"></span>
            </div>
        </div>
        <!--返回项目管理首页-->
        <!--                地图-->
        <chart-map/>

    </div>
</template>

<script>
    import chartMap from './centerChart/chartMap'
    export default {
        name: "center",
        components :{
            chartMap
        },
    }
</script>

<style scoped>



    /*顶部*/
    .centerContent>div:first-child{
        width: 100%;
        height: 1.35rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .centerContent>div:first-child>div,
    .centerContent>div:first-child>div>span{
        font-size: 0.18rem;
        color: #ffffff;
        cursor: pointer;
    }
    .centerContent>div:first-child>div{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.14rem;
        width: 0.77rem;
        height: 0.3rem;
        position: relative;
    }
    .centerContent>div:first-child>div>span:last-child{
        width: 0.77rem;
        height: 0.3rem;
        position: absolute;
        left: 0;
        right: 0;
    }
    .centerContent>div:first-child>div>img{
        width: 0.3rem;
    }

    .centerContent>.map{
        width: 100%;
        height: 6.61rem;
        /*border: 1px solid red;*/
        margin: 0 auto;
    }






</style>