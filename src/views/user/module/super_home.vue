<template>
    <div class="maxBox">
        <div class="leftMaxBox">
            <div class="leftOneBox">
                <p class="titleName">个人中心</p>
                <img class="myImg" src="../../../assets/img/user/myIcon.png" alt="">
                <p class="userName">BEONE  APCOS</p>
                <span class="userEmail">BEONE  APCOS@mail.com</span>
                <div style="width:100%;display: flex;justify-content: center;margin-top: 0.1rem">
                    <span style="margin:0 0.1rem">
                        <img src="../../../assets/img/user/mySet.png" alt="">
                    </span>
                    <span style="margin:0 0.1rem">
                        <img src="../../../assets/img/user/myMsg.png" alt="">
                    </span>
                    <span style="margin:0 0.1rem">
                        <img src="../../../assets/img/user/myTip.png" alt="">
                    </span>
                </div>
                <div>
                    <span style="display: flex;justify-content: space-between;padding: 0 10%;margin-top: 0.1rem">
                        <span style="font-size: 0.12rem;color: #888888;">容量</span>
                        <span style="font-size: 0.12rem;color: #888888;">89/200</span>
                    </span>
                    <span style="display:inline-block;border-radius:0.04rem;background:#d0e3ff;padding: 0 10%;width: 2.56rem;height: 0.08rem;position: relative;">
                        <span style="display:inline-block;position: absolute;top: 0;left: 0;width: 30%;background: #1272fd;height: 100%;border-radius: 0.04rem"></span>
                    </span>
                </div>
                <div class="nnBox">
                    <span>
                        <p style="font-size: 0.32rem;font-weight: bold;color: #555555;line-height: 0.4rem">12</p>
                        <span style="font-size: 0.14rem;color: #555555;">我的项目</span>
                    </span>
                    <span>
                        <p style="font-size: 0.32rem;font-weight: bold;color: #555555;line-height: 0.4rem">22</p>
                        <span>我的作品</span>
                    </span>
                    <span>
                        <p style="font-size: 0.32rem;font-weight: bold;color: #1272fd;line-height: 0.4rem">60</p>
                        <span>以发布</span>
                    </span>
                </div>
            </div>
            <div class="leftTwoBox">
                <p class="titleName">最近项目</p>
                <ul class="zjBox">
                    <li>
                        <router-link class="zjARouter" to="/hardware_center">
                            <img src="../../../assets/img/user/yjzx.png" alt="">
                            <span>硬件中心</span>
                        </router-link>
                    </li>
<!--                    <li>-->
<!--                        <router-link class="zjARouter" to="">-->
<!--                            <img src="../../../assets/img/user/stl.png" alt="">-->
<!--                            <span>生态链</span>-->
<!--                        </router-link>-->
<!--                    </li>-->
                    <li>
                        <router-link class="zjARouter"  to="/app_system_setting">
                            <img src="../../../assets/img/user/sjzx.png" alt="">
                            <span>设计中心</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link class="zjARouter" to="/project_center">
                            <img src="../../../assets/img/user/xmzx.png" alt="">
                            <span>项目中心</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="leftThreeBox">
                <p class="titleName">我的团队</p>
                <div class="myTeamBox">
                    <div class="teamItem">
                        <img src="../../../assets/img/user/set1.png" alt="">
                        <br>
                        <span>邹大海</span>
                    </div>
                    <div class="teamItem">
                        <img src="../../../assets/img/user/set2.png" alt="">
                        <br>
                        <span>王浩</span>
                    </div>
                    <div class="teamItem">
                        <img src="../../../assets/img/user/set3.png" alt="">
                        <br>
                        <span>刘松</span>
                    </div>
                    <div class="teamItem">
                        <img src="../../../assets/img/user/set4.png" alt="">
                        <br>
                        <span>张千思</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="rightBox">
            <div class="rightOneBox">
                <p class="titleName">常用应用</p>
                <div class="publicBox">
                    <div class="publicItem">
                        <router-link to="/hardware_center">
                            <img src="../../../assets/img/user/yjzx.png" alt="">
                            <p>硬件中心</p>
                        </router-link>
                    </div>
                    <div class="publicItem">
                        <router-link to="/app_system_setting">
                            <img src="../../../assets/img/user/sjzx.png" alt="">
                            <p>设计中心</p>
                        </router-link>
                    </div>
                    <div class="publicItem" @click="Go({name:'超级市场'})">
                        <router-link to="">
                            <img src="../../../assets/img/user/cjsc.png" alt="">
                            <p>超级市场</p>
                        </router-link>
                    </div>
                    <div class="publicItem">
                        <router-link to="/project_center">
                            <img src="../../../assets/img/user/xmzx.png" alt="">
                            <p>项目中心</p>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="rightTwoBox">
                <p class="titleName">全部应用</p>
                <div class="allBox">
                    <div class="allItemBox" v-for="(item,index) in allListData" :key="index" @click="Go(item)">
                        <router-link class="allABox" :to="item.path">
                            <img :src="item.imgUrl" alt="">
                            <span>{{item.name}}</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "super_home",
        data(){
            return{
                allListData:[
                    {
                        path:'/hardware_center',
                        imgUrl:require("../../../assets/img/user/yjzx.png"),
                        name:'硬件中心'
                    },
                    // {
                    //     path:'',
                    //     imgUrl:require("../../../assets/img/user/stl.png"),
                    //     name:'生态链'
                    // },
                    {
                        path:'',
                        imgUrl:require("../../../assets/img/user/cjsc.png"),
                        name:'超级市场'
                    },
                    {
                        path:'/project_center',
                        imgUrl:require("../../../assets/img/user/xmzx.png"),
                        name:'项目中心'
                    },
                    {
                        path:'/service_training',
                        imgUrl:require("../../../assets/img/user/fwpx.png"),
                        name:'服务培训'
                    },
                    // {
                    //     path:'',
                    //     imgUrl:require("../../../assets/img/user/xxlz.png"),
                    //     name:'信息流转'
                    // },
                    {
                        path:'/opGk',
                        imgUrl:require("../../../assets/img/user/ywzx.png"),
                        name:'运维中心'
                    },
                    {
                        path:'/cockpit',
                        imgUrl:require("../../../assets/img/user/jsc.png"),
                        name:'驾驶舱'
                    },
                    {
                        path:'/ml_home',
                        imgUrl:require("../../../assets/img/user/ybk.png"),
                        name:'佣兵库'
                    },
                    {
                        path:'/app_system_setting',
                        imgUrl:require("../../../assets/img/user/sjzx.png"),
                        name:'设计中心'
                    }
                ]
            }
        },
        methods:{
            Go(item){
                if(item.name == "超级市场"){
                    window.open("http://www.beoneeco.com/home/index.html#/",'_blank')
                }
            }
        }
    }
</script>

<style scoped>
    img{
        cursor: pointer;
    }
    .maxBox{
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: auto;
        padding: 0.18rem 3.6rem 0 3.6rem;
    }
    .leftMaxBox{
        width: 3rem;
        height: auto;
    }
    .leftOneBox{
        width: 100%;
        height: 4.2rem;
        background: white;
        border-radius: 0.08rem 0.08rem 0rem 0rem;
        box-shadow: 0 0 0.1rem 0.1rem rgba(0,0,0,0.05);
    }
    .titleName{
        font-family: MicrosoftYaHei-Bold;
        text-align: left;
        font-size: 0.2rem;
        line-height: 0.36rem;
        font-weight: bold;
        color: #555555;
        padding: 0.1rem 0 0 0.1rem;
    }

    .myImg{
        width: 1.06rem;
        height: 1.06rem;
        margin-top: 0.2rem;
    }
    .userName{
        font-family: MicrosoftYaHei-Bold;
        font-size: 0.18rem;
        font-weight: bold;
        color: #666666;
        margin-top: 0.15rem;
    }
    .userEmail{
        font-family: MicrosoftYaHei;
        font-size: 0.12rem;
        font-weight: 400;
        color: #999999;
        margin-top: 0.15rem;
    }
    .nnBox{
        margin-top: 0.1rem;
        padding: 0 10%;
        display: flex;
        justify-content: space-between;
    }
    .leftTwoBox{
        margin: 0.08rem 0;
        width: 100%;
        height: 2.6rem;
        background: white;
        box-shadow: 0 0 0.1rem 0.1rem rgba(0,0,0,0.05);
    }
    .zjBox{
        width: 100%;
        padding-left: 0.39rem;
    }
    .zjBox li{
        width: 100%;
        display: flex;
        justify-content: left;
        align-items: center;
        line-height: 0.5rem;
    }
    .zjARouter{
        display: flex;
        justify-content: left;
        align-items: center;
    }
    .zjBox li img{
        width: 0.32rem;
        height: 0.32rem;
        border-radius: 0.16rem;
    }
    .zjBox li span{
        margin-left:0.1rem;
        font-family: MicrosoftYaHei;
        font-size: 0.16rem;
        color: #666666;
    }
    .leftThreeBox{
        width: 100%;
        height: 1.4rem;
        background-color: #ffffff;
        padding: 0 0.2rem;
        border-radius: 0rem 0rem 0.08rem 0.08rem;
    }
    .myTeamBox{
        width: 100%;
        height: 0.7rem;
    }
    .teamItem{
        float: left;
        display: inline-block;
        width: 25%;
    }
    .teamItem img{
        width: 0.47rem;
        height: 0.47rem;
    }
    .teamItem span{
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        color: #697195;
    }

    .rightBox{
        width: 8.8rem;
        height: auto;
    }
    .rightOneBox{
        width: 100%;
        height: 2.6rem;
        background: white;
        border-radius: 0.08rem;
        box-shadow: 0 0 0.1rem 0.1rem rgba(0,0,0,0.05);
    }
    .publicBox{
        margin-top: 0.2rem;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .publicItem{
        width: 1.8rem;
        height: 1.7rem;
        box-shadow: 0rem 0.1rem 0.198rem 0.022rem
        rgba(182, 180, 195, 0.33);
        border-radius: 0.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.1rem;
    }
    .rightTwoBox{
        margin-top: 0.09rem;
        width: 100%;
        height: 5.7rem;
        background: white;
        border-radius: 0.08rem;
        box-shadow: 0 0 0.1rem 0.1rem rgba(0,0,0,0.05);
    }
    .allBox{
        width: 100%;
        max-height: 5rem;
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        padding: 0 0.15rem;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .allBox::-webkit-scrollbar {
        display: none;
    }
    .allBox .allItemBox{
        width: 2.6rem;
        height: 1.2rem;
        display: flex;
        align-items: center;
        margin: 0.02rem;
        border: 1px solid white;
    }
    .allBox .allItemBox img{
        width: 0.5rem;
        height: 0.5rem;
        margin-left: 0.5rem;
    }
    .allBox .allItemBox span{
        margin-left: 0.2rem;
        font-family: MicrosoftYaHei;
        font-size: 0.18rem;
        color: #666666;
    }
    .allBox .allItemBox:hover{
        background-color: #f4f8ff;
        border: solid 0.01rem #bed8ff;
    }
    .allABox{
        display: flex;
        align-items: center;
    }
</style>
