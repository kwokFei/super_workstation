<template>
    <div id="design-container">
        <!--导航部分-->
        <design-nav></design-nav>
        <!--主体部分-->
        <el-row class="main">
            <el-col :span="4"
                    :xs ="12">
                <design-left :modulelist = "allList"
                             @showModuleDetails = showModuleDetailsPop></design-left>

            </el-col>
            <el-col :span="16" :xs ="24" id="centerContainer">
                <designCenter></designCenter>
            </el-col>
            <el-col :span="4" :xs ="24">
                <design-right></design-right>
            </el-col>
        </el-row>
        <!--分类列表-->
        <ul>
            <li>传感类</li>
            <li>控制类</li>
            <li>应用类</li>
            <li>其他</li>
            <li>我的库</li>
        </ul>
        <el-dialog :visible.sync="isShowModuleDetailsPop"
                   width="60%"
                   title="查看详情">
            <div class="details-pop-container">
                <div >
                    <el-carousel trigger="click"
                                 :autoplay = false
                                 height="3.82rem">
                        <el-carousel-item v-for="item in 4" :key="item">
                            <h3 class="small">{{ item }}</h3>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div>
                    <div>
                        <h2>模块信息描述</h2>
                        <div>
                            <span>名称 : 模块一</span>
                            <span>页面：10页</span>
                            <span>模块：30个 </span>
                            <span>组件：30个</span>

                        </div>

                    </div>
                    <div>
                        <h3>模块选择</h3>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import designNav from './module/nav'
    import designLeft from  './module/left'
    import designRight from  './module/right'
    import designCenter from  './module/centerHtml'
    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        name: "Design_center",
        components:{
            designNav,
            designLeft,
            designRight,
            designCenter
        },
        data(){
            return{
                checkAll: false,
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                isIndeterminate: true,

                //全部模块列表
                allList:[
                    {
                        code:"102",
                        icon:"img/allIcon/huiyiguanli.png",
                        name:"会议室管理",
                        isCheck:false,
                        iframeUrl:"static/office-ui/html/officeRoom.html"
                    },
                    {
                        code:"104",
                        icon:"img/allIcon/kaoqinmokuai.png",
                        name:"考勤管理",
                        isCheck:false,
                        iframeUrl:"static/office-ui/html/attInfo.html"
                    },
                    {
                        code:"109",
                        icon:"img/allIcon/baojingxitong.png",
                        name:"报警系统",
                        isCheck:false,
                        iframeUrl:"static/htmls/warningstystem/header.html"
                    },
                    {
                        code:"110",
                        icon:"img/allIcon/xinfengkongzhi.png",
                        name:"新风系统",
                        isCheck:false,
                        iframeUrl:"static/htmls/lfHome.html"
                    },

                ],
                isShowModuleDetailsPop : false, //模块详情谈款
            }
        },
        methods:{
            //查看详情弹框
            showModuleDetailsPop(item){
                this.isShowModuleDetailsPop = true;
                console.log(item);
            },
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;

            }
        }
    };
</script>

<style scoped>
    .main{
        height: calc(100vh - 0.48rem);
        margin: 0 !important;
    }
    .main>div{
        box-shadow: 5px -1px 5px #888888 inset;
        padding: 0.03rem 0 0 !important;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .main>div:nth-child(3){
        overflow-x: auto;
        padding-left: 10px !important;
    }
    #design-container > ul{
        position: absolute;
        left: 16.5%;
        top: 1.9rem;
    }
    #design-container > ul > li{
        background: #ffffff;
        width: 0.28rem;
        border-radius: 5px;
        border: 1px solid #409EFF;
        cursor: pointer;
    }
    #centerContainer{
        background: #EFEFEF;
        padding-top: 1rem !important;
        /*margin:0 2%;*/
    }

    /*查看详情弹框*/
    .el-dialog__header{
        background-color: #0066FF;
        display: flex;
        /* width: 12rem; */
        height: 0.6rem;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }
    /*走马灯*/
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .details-pop-container{
        display: flex;
        justify-content: space-around;
    }
    .details-pop-container>div:first-child{
        width: 60%;
        height: 3.82rem;
        opacity: 0.6;
    }
    .details-pop-container>div:nth-child(){
        width: 40%;
        height: 3.82rem;
        opacity: 0.6;
    }

    
</style>