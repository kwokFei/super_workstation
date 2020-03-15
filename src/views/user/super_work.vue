<template>
    <div class="userBox">
        <div class="userNav">
            <img style="width: 1.7rem;height: 0.55rem" src="../../assets/img/user/logo.png" alt="">
            <p class="navBox">
                <span v-for="(item,index) in navList" :key="index">
                    <router-link :to="item.path">{{item.name}}</router-link>
                </span>
            </p>
            <div class="userTip">
                <img src="../../assets/img/user/shopping.png" alt="">
                <span style="width: 1px;height: 0.2rem;background-color: #E6E6E6"></span>
                <span class="tipBox">
                    <img src="../../assets/img/user/info.png" alt="">
                </span>
                <span style="width: 1px;height: 0.2rem;background-color: #E6E6E6"></span>
                <img style="width: 0.4rem;height: 0.4rem" src="../../assets/img/user/userIcon.png" alt="">
                <span style="font-size:0.12rem;font-weight:normal;color:rgba(105,113,149,1);">Beone  APCOS</span>
            </div>
            <!--  弹框  -->
            <div class="templateBox">
                <p style="line-height: 0.4rem;border-bottom: 1px solid rgba(0,0,0,0.1);white-space:nowrap">Beone  APCOS</p>
                <p style="color: #2F80ED"><router-link to="/all">个人中心</router-link></p>
                <p><router-link to="/login">退出登录</router-link></p>
            </div>
        </div>
        <!-- 主题 -->
        <div class="contentBox">
            <router-view/>
        </div>

    </div>
</template>

<script>
    export default {
        name: "super_work",
        data(){
            return{
                num:0,
                navList:[
                    {
                        name:"首页",
                        path:''
                    },
                    {
                        name:"硬件中心",
                        path:''
                    },
                    {
                        name:"驾驶舱",
                        path:''
                    },
                    {
                        name:"发布中心",
                        path:''
                    },
                    {
                        name:"运维中心",
                        path:''
                    },
                    {
                        name:"设计中心",
                        path:''
                    },
                    {
                        name:"佣兵库",
                        path:''
                    },
                    {
                        name:"生态链",
                        path:''
                    },
                    {
                        name:"项目中心",
                        path:''
                    },
                    {
                        name:"服务培训",
                        path:''
                    }
                ]
            }
        },
        methods:{

        },
        mounted() {

        }
    }
</script>

<style scoped>
    a{
        list-style:none;
        color: black;
    }
    span{
        white-space: nowrap;
    }
    .userBox{
        width: 100%;
        height: 100%;
        background-color: #F0F2F5;
    }
    .userNav{
        position: relative;
        padding: 0 0.8rem;
        height: 0.7rem;
        line-height: 0.7rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 0.06rem 0px rgba(203,200,215,0.82);
    }
    .navBox{
        display: flex;
        justify-content: space-between;
    }
    .navBox > span{
        font-size:0.18rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.43rem;
        margin: 0 0.2rem;
    }
    .userTip{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .userTip img{
        cursor: pointer;
        margin: 0 0.2rem;
    }
    .tipBox{
        position: relative;
        margin-top: 0.15rem;
    }
    .tipBox:before{
        position: absolute;
        top: 0.1rem;
        right: 0.15rem;
        line-height: 0.18rem;
        display: inline-block;
        width: 0.18rem;
        height: 0.18rem;
        font-size: 0.12rem;
        border-radius: 50%;
        background-color: red;
        color: white;
        content:'9';
    }

    .templateBox{
        position: absolute;
        top: 0.78rem;
        right: 1.5rem;
        width: 1.4rem;
        height: 1.14rem;
        border-radius: 0.04rem;
        background-color: white;
        box-shadow:  0 0.02rem 0.02rem rgba(0,0,0,0.1);
    }
    .templateBox:after{
        content: '';
        width: 0.1rem;
        position: absolute;
        top: -0.05rem;
        right: 0.4rem;
        height: 0.1rem;
        background: white;
        transform: rotate(45deg);
    }
    .templateBox p{
        cursor: pointer;
        padding-left: 0.19rem;
        text-align: left;
        font-size:0.12rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height: 0.34rem;
    }

</style>