<template>
    <div class="centerContent" >
        <!--                顶部选择按钮-->
        <div>

            <div class="changeDot" show="all">全部</div>

            <div class="changeDot" show="project" style="width: 1.4rem">
                <img src="@/assets/img/exhibition/finish_project.png" alt="">
                <span>已完成的项目</span>
                <span style="width: 1.4rem"></span>
            </div>

            <div class="changeDot" show="room" style="width: 1.4rem">
                <img src="@/assets/img/exhibition/build_project.png" alt="">
                <span>建设中的项目</span>
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
        background: rgba(0,0,0,0.5);
    }
    .centerContent>div:first-child>div>img{
        width: 0.3rem;
    }

    .centerContent>.map{
        width: 9.72rem;
        height: 6.61rem;
        /*border: 1px solid red;*/
        margin: 0 auto;
    }






</style>