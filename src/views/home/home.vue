<template>
    <div class="homeBox">
        <div class="bannerBox">
            <div class="navBox">
                <img class="logoBox" src="../../assets/img/home/logo.png" alt="">
                <p>
                    <span><a  style="color:rgba(204,204,204,1);font-size: 0.18rem" href="">超级市场</a></span>
                    <span><router-link style="color:rgba(204,204,204,1);font-size: 0.18rem" to="/super_home">超级工作站</router-link></span>
                    <span><a style="color:rgba(204,204,204,1);font-size: 0.18rem" href="http://developer.apcos.com/home/index">开发者社区</a></span>
                </p>
                <button>登陆/注册</button>
            </div>
            <div class="infoBox">
                <p style="font-size: 0.48rem;letter-spacing: 0.06rem">以科技设计未来</p>
                <p style="font-size: 0.36rem;letter-spacing: 0.04rem">我们是大数据可视化先行者</p>
                <p style="display: flex;align-items: center">
                    <i style="display: inline-block;width: 0.2rem;background: white;height: 0.02rem;margin-right: 0.12rem"></i>
                    <span style="font-size: 0.26rem;color: #999999">Design The Future With Technology</span>
                </p>
                <p style="display: flex;align-items: center">
                    <i style="display: inline-block;width: 0.4rem;background: white;height: 0.02rem;margin-right: 0.12rem"></i>
                    <span style="font-size: 0.32rem;">APCOS超级工作站</span>
                </p>
                <span class="btnGo">立即使用</span>
            </div>
        </div>

        <div class="listBox">
            <div class="listItem" v-for="(item,index) in listData" :key="index" @mouseover="listOver(item)" @mouseout="listOut(item)">
                <router-link :to="item.path">
                    <img class="bjImg" :src="item.imgUrl" alt="">
                    <div class="minBox" :style="isStyle">
                        <p style="margin-top: 1.86rem">{{item.engName}}</p>
                        <p>{{item.name}}</p>
                        <img src="../../assets/img/home/listGo.png" alt="" v-show="item.isShow">
                    </div>
                </router-link>
            </div>
        </div>

        <div class="companyInfo">
            <div class="aBox">
                <div class="aItem">
                    <span>— 主页</span>
                    <p>HOME</p>
                </div>
                <div class="aItem">
                    <span>— 产品中心</span>
                    <p>PRODUCTS</p>
                </div>
                <div class="aItem">
                    <span>— 解决方案</span>
                    <p>SOLUTIONS</p>
                </div>
                <div class="aItem">
                    <span>— 新闻中心</span>
                    <p>NEWS</p>
                </div>
                <div class="aItem">
                    <span>— 关于我们</span>
                    <p>ABOUT US</p>
                </div>
            </div>
            <div class="companyInfoBox">
                <p class="companyName">公司简介</p>
                <span class="englishName">COMPANY PROFILE</span>
                <div class="info">
                    金鑫科技是全球领先的万物互联底层系统及智能+解决方案提供商，专注于爱普适万物互联智慧操作系统(中文简称：爱普适；英文：AI based Pervasive Computing Operating System ， 英文简称:APCOS)，并为其在智慧社区、智慧家居、智慧校园、智慧酒店、智慧养老、智慧楼宇等智慧城市应用场景提供软硬件解决方案。
                    <p></p>
                    <br>
                    金鑫科技拥有一支专业、高效的研发团队，在深圳、成都、重庆设有三家研究院，整个研发体系及成果的形成，前后共有数百人参与贡献，参与研发的团队由博士后、博士、硕士研究生、本科组成，还有高级项目经理、高级工程师及电子、算法、通讯、云计算、系统工程等若干专家级人员。拥有1000余项独创技术，并建立了专利体系，形成13大类，229款产业链产品。
                    <p></p>
                    <br>

                    历经20余年研发，金鑫科技推出全球第一款自主知识产权爱普适万物互联智慧操作系统（APCOS），取得人工智能及智慧产业领域关键技术成果。APCOS综合集成运用云计算、物联网、普适计算、区块链、多协议融合、人工智能、大数据等理论与技术，采用自主知识产权的普适计算内核系统，支持海量设备和动态资源调度与进程管理，提供第三方接口接入服务等服务功能，满足万物互联的物联网全产业链市场应用需求，构建了万物互联智慧操作生态环境。
                </div>
            </div>
        </div>

        <div class="footerBox">
            <div class='footerLeftBox'>
                <div class="aaBox">
                    <span>硬件中心</span>
                    <span>解决方案</span>
                    <span>解决方案</span>
                    <span>加入我们</span>
                    <span>隐私政策</span>
                </div>
                <br>
                <p class="companyA">Copyright  2008-2019 重庆金鑫智慧科技有限公司 All Rights Reserved. | 渝ICP备14001530号-1</p>
            </div>
            <div class="footerRightBox">
                <p><span>官网:</span>{{companyInfo.baseUrl}}</p>
                <p><span>地址:</span>{{companyInfo.address}}</p>
                <p><span>电话:</span>{{companyInfo.tel}}</p>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
            return{
                isStyle:'',
                listData:[
                    {
                        imgUrl:require('../../assets/img/home/listOne.png'),
                        engName:'Hardware Center',
                        name:'硬件中心',
                        path:'/hardware_center',
                        isShow:false
                    },
                    {
                        imgUrl:require('../../assets/img/home/listTwo.png'),
                        engName:'Cockpit',
                        name:'驾驶舱',
                        path:'/cockpit',
                        isShow:false
                    },
                    {
                        imgUrl:require('../../assets/img/home/lsitThree.png'),
                        engName:'Design Center',
                        name:'设计中心',
                        path:'/app_system_setting',
                        isShow:false
                    },
                    {
                        imgUrl:require('../../assets/img/home/listFour.png'),
                        engName:'Operations Center',
                        name:'运维中心',
                        path:'/opGk',
                        isShow:false
                    },
                    {
                        imgUrl:require('../../assets/img/home/listFive.png'),
                        engName:'Release Center',
                        name:'发布中心',
                        path:'/gk',
                        isShow:false
                    },
                    {
                        imgUrl:require('../../assets/img/home/listSix.png'),
                        engName:'Project Center',
                        name:'项目中心',
                        path:'/project_center',
                        isShow:false
                    },
                    {
                        imgUrl:require('../../assets/img/home/listSeven.png'),
                        engName:'Ecological Chain',
                        name:'生态链',
                        path:'',
                        isShow:false
                    },
                    {
                        imgUrl:require('../../assets/img/home/listRight.png'),
                        engName:'Mercenary Bank',
                        name:'拥兵库',
                        path:'',
                        isShow:false
                    },
                ],
                //公司信息
                companyInfo:{
                    baseUrl:'www.apcos.com',
                    address:'中国·重庆·沙坪坝区西永微电园创新生产力促进中心4F',
                    tel:'400-000-3877'
                }
            }
        },
        methods:{
            listOver(item){
               item.isShow = true;
               this.isStyle = 'padding-top:-10px'
            },
            listOut(item){
                item.isShow = false;
                this.isStyle = 'padding-top:0px'
            }
        }
    }
</script>

<style scoped>
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    .homeBox{
        width: 100%;
        height: 100%;
    }
    .bannerBox{
        overflow: hidden;
        padding-top: 0.54rem;
        width: 100%;
        height: 10.8rem;
        background: url("../../assets/img/home/banner.png") no-repeat;
        background-size: 100% 100%;
    }
    .navBox{
        display: flex;
        align-items: center;
        /*justify-content: center;*/
    }
    .logoBox{
        width:1.6rem;
        height:0.52rem;
        margin-left: 0.8rem;
    }
    .navBox p{
        display: flex;
        justify-content: left;
        align-items: center;
        margin-left: 9.9rem;
    }
    .navBox p > span{
        font-size:0.18rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(204,204,204,1);
        margin-right: 0.8rem;
        cursor: pointer;
    }
    .navBox button{
        width:1.1rem;
        height:0.32rem;
        border: 1px solid #0068FA;
        background: none;
        outline: none;
        text-align: center;
        font-size:0.14rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,104,250,1);
        cursor: pointer;
    }
    .infoBox{
        /*display: inline-block;*/
        padding-left: 2.4rem;
        color: white;
        margin-top: 2.48rem;
        text-align: left;
    }
    .infoBox p{
        margin: 0.15rem 0;
    }
    .infoBox .btnGo{
        margin-top: 0.43rem;
        display: inline-block;
        width:1.86rem;
        height:0.6rem;
        background: url("../../assets/img/home/btnBj.png") no-repeat;
        background-size: 100% 100%;
        font-size:0.23rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        text-align: left;
        padding-left: 0.4rem;
        padding-top: 0.1rem;
        color:rgba(255,255,255,1);
        cursor: pointer;
    }

    .listBox{
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
    }
    .listBox .listItem{
        border: 1px solid white;
        position: relative;
        width: 4.8rem;
        height: 5.4rem;
    }
    .listBox .listItem .bjImg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    .listBox .listItem .minBox{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.4);
    }
    .listBox .listItem .minBox p{
        text-align: center;
        color: white;
        margin: 0.2rem 0;
    }
    .listBox .listItem .minBox p:nth-child(1){
        font-size: 0.4rem;
    }
    .listBox .listItem .minBox p:nth-child(2){
        font-size: 0.36rem;
    }
    .listBox .listItem .minBox:hover{
        cursor: pointer;
        background:rgba(15,81,177,0.6);
    }

    .companyInfo{
        width: 100%;
        height: 8.1rem;
        background: url("../../assets/img/home/infoBj.png") no-repeat;
        background-size: 100% 100%;
        padding: 0 1.55rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .aBox{
        width: 10rem;
        display: flex;
        flex-wrap: wrap;
        /*border: 1px solid red;*/
    }
    .aBox .aItem{
        text-align: left;
        width: 5rem;
        color: #0C0C0C;
        margin: 0.2rem 0;
        /*border: 1px solid red;*/
    }
    .aBox .aItem>span{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        line-height:0.6rem;
    }
    .aBox .aItem>p{
        font-size:0.7rem;
        font-family:Arial;
        font-weight:400;
        line-height:0.6rem;
    }
    .aBox .aItem:hover{
        color: #0068FA;
        cursor: pointer;
    }
    .companyInfoBox{
        width: 4rem;
        text-align: left;
    }
    .companyInfoBox .companyName{
        font-size:0.2rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:0.4rem;
    }
    .companyInfoBox .englishName{
        font-size:0.14rem;
        font-family:Arial;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:0.6rem;
    }
    .companyInfoBox .info{
        font-size:0.14rem;
        font-family:Microsoft YaHei;
        font-weight:300;
        color:rgba(102,102,102,1);
        line-height:0.24rem;
    }

    .footerBox{
        padding: 0 0.8rem;
        height: 2.7rem;
        background: #0C0C0C;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
    }
    .footerBox .footerLeftBox .aaBox{
        border-bottom: 1px solid white;
        width: 6.8rem;
        display: flex;
        justify-content: space-between;
        line-height: 0.8rem
    }
    .footerBox .footerLeftBox .companyA{
        text-align: left;
        font-size:0.12rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.36rem;
    }
    .footerBox .footerLeftBox .aaBox > span{
        cursor: pointer;
        font-size:0.14rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:0.6rem;
    }
    .footerBox .footerRightBox{
        text-align: left;
    }
    .footerBox .footerRightBox p{
        font-size:0.14rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:0.6rem;
    }

</style>
