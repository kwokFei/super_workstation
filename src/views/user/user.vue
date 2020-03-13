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
                <p style="line-height: 0.4rem;border-bottom: 1px solid rgba(0,0,0,0.1)">Beone  APCOS</p>
                <p style="color: #2F80ED">个人中心</p>
                <p>退出登录</p>
            </div>
        </div>
        <!-- 主题 -->
        <div class="contentBox">
            <div class="contLeft">
                <ul>
                    <li v-for="(item,index) in menuData" :key="index" :class="{'Active':num==index}" @click="checkMe(index)">
                        <router-link :to="item.path" style="display: flex;align-items: center">
                        <img :src="item.icon" alt="">
                        <span>{{item.name}}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="contRight">
                <router-view />
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "user",
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
                ],
                menuData:[
                    {
                        name:'总览',
                        isActive:true,
                        path:'/all',
                        icon:require('../../assets/img/user/icon01.png'),
                    },
                    {
                        name:'我的UI设计',
                        isActive:false,
                        path:'/my_ui',
                        icon:require('../../assets/img/user/icon02.png'),
                    },
                    {
                        name:'我的应用模块',
                        isActive:false,
                        path:'/my_ui',
                        icon:require('../../assets/img/user/icon03.png'),
                    },
                    {
                        name:'我的应用系统',
                        isActive:false,
                        path:'/my_ui',
                        icon:require('../../assets/img/user/icon04.png'),
                    },
                    {
                        name:'我的3D场景',
                        isActive:false,
                        path:'/my_ui',
                        icon:require('../../assets/img/user/icon05.png'),
                    },
                    {
                        name:'我的diy编码',
                        isActive:false,
                        path:'/my_ui',
                        icon:require('../../assets/img/user/icon06.png'),
                    },
                    {
                        name:'运维',
                        isActive:false,
                        path:'/all',
                        icon:require('../../assets/img/user/icon07.png'),
                    },
                    {
                        name:'财务',
                        isActive:false,
                        path:'/all',
                        icon:require('../../assets/img/user/icon08.png'),
                    },
                    {
                        name:'评价',
                        isActive:false,
                        path:'/all',
                        icon:require('../../assets/img/user/icon09.png'),
                    },
                    {
                        name:'名片设置',
                        isActive:false,
                        path:'/all',
                        icon:require('../../assets/img/user/icon09.png'),
                    },
                ]
            }
        },
        methods:{
            checkMe(index){
                this.num=index;
            }
        },
        mounted() {
            this.menuData[0].isActive = true
        }
    }
</script>

<style scoped>
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

    .contentBox{
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0.3rem 3.6rem 0 3.6rem;
    }
    .contLeft{
        width:2.4rem;
        height:7rem;
        background:rgba(255,255,255,1);
        border-radius:0.08rem;
        overflow: hidden;
    }
    .contLeft ul{
        width: 100%;
        list-style: none;
    }
    .contLeft ul li{
        cursor: pointer;
        display: flex;
        justify-content: left;
        align-items: center;
        line-height: 0.5rem;
        font-size:0.16rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
    }
    .contLeft ul li:hover{
        color: white !important;
        background:linear-gradient(90deg,rgba(15,105,199,1) 0%,rgba(67,159,255,1) 100%);
    }
    .Active{
        color: white !important;
        background:linear-gradient(90deg,rgba(15,105,199,1) 0%,rgba(67,159,255,1) 100%);
    }
    .contLeft ul li img{
        margin-left: 0.5rem;
        width: 0.22rem;
        height: 0.22rem;
        margin-right: 0.15rem;
    }

    .contRight{
        width: 9.4rem;
        height: 7rem;
        background:rgba(255,255,255,1);
        border-radius:0.08rem;
        padding: 0.18rem 0.3rem 0 0.3rem;
    }
</style>