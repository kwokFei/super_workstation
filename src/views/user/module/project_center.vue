<template>

    <div class="userBox">
        <!-- 主题 -->
        <div class="contentBox">
            <div class="contLeft">
                <ul>
                    <li v-for="(item,index) in menuData" :key="index" :class="{'Active':num==index}" @click="checkMe(index)">
                        <router-link :to="item.path" style="display: flex;align-items: center;width: 100%;height: 100%">
                            <img :src="item.icon" alt="">
                            <span :class="{'Active1':num==index}">{{item.name}}</span>
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
        name: "project_center",
        data(){
            return{
                num:0,
                menuData:[
                    {
                        name:'项目总览',
                        isActive:true,
                        path:'/project_center/project_project_all',
                        icon:require('../../../assets/img/user/icon01.png'),
                    },
                    {
                        name:'我的项目',
                        isActive:false,
                        path:'/project_center/project_my_project',
                        icon:require('../../../assets/img/user/icon02.png'),
                    },
                    {
                        name:'我的节点',
                        isActive:false,
                        path:'/project_center/project_my_node',
                        icon:require('../../../assets/img/user/icon03.png'),
                    },
                    {
                        name:'项目列表',
                        isActive:false,
                        path:'/project_center/project_create_project',
                        icon:require('../../../assets/img/user/icon04.png'),
                    },
                    {
                        name:'项目日志',
                        isActive:false,
                        path:'/project_center/project_project_log',
                        icon:require('../../../assets/img/user/icon05.png'),
                    }
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
    a{
        list-style:none;
        color: black;
    }
    span{
        white-space: nowrap;
    }

    .contentBox{
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 0.3rem 0 0 0;
    }
    .contLeft{
        width:2.4rem;
        height:7rem;
        background:rgba(255,255,255,1);
        border-radius:0.08rem;
        overflow: hidden;
        min-width: 150px;
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
        /*color:rgba(102,102,102,1);*/
    }
    .contLeft ul li:hover{
        color: white !important;
        background:linear-gradient(90deg,rgba(15,105,199,1) 0%,rgba(67,159,255,1) 100%);
    }
    .Active{
        color: #FFFFFF !important;
        background:linear-gradient(90deg,rgba(15,105,199,1) 0%,rgba(67,159,255,1) 100%);
    }
    .Active1{
        color: #FFFFFF !important;
    }
    .contLeft ul li img{
        margin-left: 0.5rem;
        width: 0.22rem;
        height: 0.22rem;
        margin-right: 0.15rem;
    }

    .contRight{
        min-width: 9.4rem;
        width: 12rem;
        /*height: 7rem;*/
        background:#f0f2f5;
        border-radius:0.08rem;
        padding: 0 0 0 0.3rem;
    }
</style>
