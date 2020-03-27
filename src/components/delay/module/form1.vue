<template>
    <div class="container-form1">
        <div class="title">
            <img src="@/assets/img/project_center/all/log.png" alt="">
            <span class="form-text">{{form1Titlle}}</span>
        </div>
        <div class="content" v-for="item in form1Option">
            <p>{{item.title}}</p>
            <p v-if="item.projectLoder"><span>{{item.projectLoder | spanName('项目经理')}}:</span>{{item.projectLoder}}</p>
            <p v-if="item.taskNode"><span>{{item.taskNode | spanName('任务节点')}}:</span>{{item.taskNode}}</p>
            <p v-if="item.applyLoder"><span>{{item.applyLoder | spanName('申请人')}}:</span>{{item.applyLoder}}</p>
            <p v-if="item.applyTime"><span>{{item.applyTime | spanName('时间')}}:</span>{{item.applyTime}}</p>
        </div>

        <el-divider></el-divider>

    </div>
</template>

<script>
    export default {
        name: "form1",
        filters:{
          spanName(value,data){
              return data;
          }
        },
        props:["form1Titlle","form1Option"],

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
    .content>p:not(:first-child){
        margin-left: 0.21rem;
        margin-top: 0.2rem;
        color: #666666;
    }

    .content>p>span{
        font-size: 0.16rem;
        color: #333333;
        min-width: 52px;
        display: inline-block;
        text-align: left;
        margin-right: 0.2rem;
    }

</style>