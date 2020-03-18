<template>
    <div class="maxBox">
        <div class="navBox">
            <img class="logoImg" src="../../assets/img/user/logo.png" alt="">
            <div class="navMinBox">
                <span v-for="(item,index) in navList" :key="index" @click="addStyle(index)"   :class="{addClass:num === index}">
                    <router-link class="wwRouter" :to="item.path">{{item.name}}</router-link>
                </span>
            </div>
            <div class="yyBox">
                <router-link to="">退出登录</router-link>
                <button class="myBtn">我的设计</button>
            </div>
        </div>
        <div class="contentBox">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                num:0,
                navList:[
                    {
                        name:"应用系统设计",
                        path:'/app_system_setting'
                    },
                    {
                        name:"UI设计",
                        path:'/ui_setting'
                    },
                    {
                        name:"应用模块设计",
                        path:'/app_template_setting'
                    },
                    {
                        name:"3D场景设计",
                        path:'/ThreeD_setting'
                    },
                    {
                        name:"DIY编码设计",
                        path:'/diy_setting'
                    },
                    {
                        name:"驾驶舱设计",
                        path:'/jsc_setting'
                    }
                ]
            }
        },
        methods:{
            addStyle(index){
                this.num = index;
            }
        }
    }
</script>

<style scoped>
    .maxBox{
        width: 100%;
        height: 100%;
    }
    .navBox{
        height: 0.74rem;
        width: 100%;
        background: white;
        padding:0 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .logoImg{

    }
    .navMinBox{
        height: 100%;
        line-height: 0.74rem;
        display: flex;
        justify-content: center;
    }
    .navMinBox span{
        display: inline-block;
        margin: 0 0.2rem;
        font-family: PingFang-SC-Medium;
        font-size: 0.2rem !important;
        line-height: 0.74rem;
        color: #333333;
    }
    .navMinBox span:hover .wwRouter{
        color: #0C76FB !important;
    }
    a{
        font-size: 0.18rem;
    }
    .addClass > a{
        color: #0C76FB !important;
    }
    .yyBox{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .contentBox{
        width: 100%;
        height: calc(100% - 0.74rem);
    }
    .myBtn{
        width: 1.2rem;
        height: 0.3rem;
        background: #0f6bc7;
        font-family: PingFang-SC-Medium;
        font-size: 0.16rem;
        color: #ffffff;
        border-radius: 0.04rem;
        border: none;
        outline: none;
        margin-left: 0.1rem;
    }
</style>
