<template>
    <div class="container-form1">
        <div class="title">
            <img src="@/assets/img/project_center/all/log.png" alt="">
            <span class="form-text">延期申请日志</span>
        </div>
        <div class="content">
            <p>因不可抗因素，特申请将计划完成时间从2019.11.11延期到2019.11.20</p>
            <p><span>申请人：</span>邹达海</p>
            <p><span>时  间：</span>2019-11-09   20:22:18</p>
        </div>
        <el-divider></el-divider>

    </div>
</template>

<script>
    export default {
        name: "form1",

    }
</script>

<style scoped>
    .container-form1{
        text-align: left;
    }
    .title{
        display: flex;
        align-items: center;
    }
    .title>img{
        width: 0.22rem;
        height: 0.24rem;
        margin-right: 0.08rem;
    }
    .form-text{
        font-size: 0.18rem;
        color: #1272fd;
    }
    .content{
        margin: 0.23rem 0 0 0.31rem;
    }
    .content>p:first-child::before{
        content: "";
        display: inline-block;
        width: 0.1rem;
        height: 0.1rem;
        background-color: #666666;
        margin-right: 0.11rem;
        border-radius: 50%;
        color: #666666;
    }
    .content>p:nth-child(2),
    .content>p:nth-child(3){
        margin-left: 0.21rem;
        margin-top: 0.2rem;
        color: #666666;
    }

    .content>p>span{
        font-size: 0.16rem;
        color: #333333;
    }

</style>