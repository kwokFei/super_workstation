<template>
    <div class="maxBox">
        <cockpit-hearder/>
        <div class="contentBox">
            <cockpit-left/>
            <cockpit-center/>
            <cockpit-right/>
        </div>
    </div>
</template>

<script>
    import cockpitHearder from './modules/header'
    import cockpitLeft from './modules/left'
    import cockpitCenter from  './modules/center'
    import cockpitRight from './modules/right'
    export default {
        name: "super_yjzx",
        components:{
            cockpitHearder,
            cockpitLeft,
            cockpitCenter,
            cockpitRight
        }
    }
</script>
<style>

    .contentBox{
        display: flex;
        width: 100%;
        background-color: rgba(0,0,25,1);
        color: #fff;
    }
    /*中间盒子*/
    .contentBox .centerContent{
        width: 11.02rem;
        height: 100%;
        /*border: 1px solid red;*/
    }

    /*右边盒子*/
    .contentBox .rightContent{
        width: 4.09rem;
        height: 100%;
        /*border: 1px solid red;*/
        padding-right: 0.3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 9;
    }

    /*左边大盒子*/
    .contentBox .leftBox{
        padding-top: 0.12rem;
        width: 4.09rem;
        height: 100%;
        color: white;
        padding-left: 0.26rem;
        position: relative;
        z-index: 9;
    }
    .contentBox .leftBox .leftOneBox{
        padding-top: 0.12rem;
        position: relative;
        width: 3.79rem;
        height: 3.81rem;
        border-top: 2px solid rgb(62,62,79);
        border-bottom: 2px solid rgb(62,62,79);
    }
    .contentBox .leftBox .leftOneBox::after{
        content: "";
        width: 0.4rem;
        height: 2px;
        position: absolute;
        background-color: rgb(0,255,255);
        top: -2px;
        right: 0;
    }


</style>

<style scoped>

    .maxBox{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,25,1);
        color: #fff;
    }
    .maxBox img{
        width: 19.2rem;
        height: 10.8rem;
    }



</style>
