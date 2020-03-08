<template>
    <div id="design-container">
        <!--导航部分-->
        <design-nav></design-nav>
        <!--主体部分-->
        <el-row class="main">
            <el-col :span="3"
                    :xs ="12">
                <design-left :modulelist = "allList"
                             @showModuleDetails = showModuleDetailsPop
                             @addOrcelModuleList = addOrcelModuleList
                             @addModulesInRight = addModulesInRight></design-left>

            </el-col>
            <el-col :span="17" :xs ="24" id="centerContainer">
                <designCenter></designCenter>
            </el-col>
            <el-col :span="4" :xs ="24">
                <design-right
                    :modulesListRight = "allCheckedModuleList"
                    @rightResetModuleList = rightResetModuleList></design-right>
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
        <!--弹框-->
        <el-dialog :visible.sync="isShowModuleDetailsPop"
                   width="60%"
                   title="查看详情">

            <pop-details :modules="moduleDtails"
                         @handlepop =handlePopDtails></pop-details>
        </el-dialog>

    </div>
</template>

<script>
    import designNav from './module/nav'
    import designLeft from  './module/left'
    import designRight from  './module/right'
    import designCenter from  './module/centerHtml'
    import popDetails from  './module/popDetails'
    export default {
        name: "Design_center",
        components:{
            designNav,
            designLeft,
            designRight,
            designCenter,
            popDetails
        },
        data(){
            return{
                indexSrc : "",   //首次添加时中间的src
                isShowModuleDetailsPop : null,//弹窗是否打开
                //全部模块列表
                allList:[
                    {
                        code:"3",
                        icon:"img/allIcon/huiyiguanli.png",
                        name:"会议室管理",
                        isCheck:false,
                        iframeUrl:"static/office-ui/html/officeRoom.html",
                        childModule:[
                            {
                                code:"3_1",
                                icon:"img/allIcon/xitongguanli_1.png",
                                name:"系统日志管理",
                                isCheck:true,
                                isReadonly:true,
                            }
                        ],
                    },
                    {
                        code:"4",
                        icon:"img/allIcon/kaoqinmokuai.png",
                        name:"考勤管理",
                        isCheck:false,
                        iframeUrl:"static/office-ui/html/attInfo.html",
                        childModule:[
                            {
                                code:"4_1",
                                icon:"img/allIcon/xitongguanli_1.png",
                                name:"系统日志管理",
                                isCheck:true,
                                isReadonly:true,
                            },
                            {
                                code:"4_2",
                                icon:"img/allIcon/xitongguanli_1.png",
                                name:"用户管理",
                                isCheck:true,
                                isReadonly:true,
                            }
                        ]
                    }

                ],
                // 基础模块(必选)
                baseModuleList : [
                    {
                    code:"1",
                    parentsName:"智慧办公",
                    icon:"img/allIcon/shouye_1.png",
                    name:"首页",
                    isCheck:true,
                    isReadonly:true,
                    iframeUrl:"static/htmls/ggHome.html",
                    childModule:[],
                },
                    {
                        code:"2",
                        icon:"img/allIcon/xitongguanli_1.png",
                        name:"系统管理",
                        isCheck:true,
                        isReadonly:true,
                        iframeUrl:"static/htmls/xitongguanli/header.html",
                        childModule:[
                            {
                                code:"2_1",
                                icon:"img/allIcon/xitongguanli_1.png",
                                name:"系统日志管理",
                                isCheck:true,
                                isReadonly:true,
                                iframeUrl:"static/office-ui/html/systemLog.html",
                            },
                            {
                                code:"2_2",
                                icon:"img/allIcon/xitongguanli_1.png",
                                name:"用户管理",
                                isCheck:true,
                                isReadonly:true,
                                iframeUrl:"static/office-ui/html/user.html",
                            },
                            {
                                code:"2_3",
                                icon:"img/allIcon/xitongguanli_1.png",
                                name:"展厅企业管理",
                                isCheck:true,
                                isReadonly:true,
                                iframeUrl:"static/office-ui/html/role.html",
                            },
                            {
                                code:"2_4",
                                icon:"img/allIcon/xitongguanli_1.png",
                                name:"菜单权限管理",
                                isCheck:true,
                                iframeUrl:"static/office-ui/html/menu.html",
                            },
                            {
                                code:"2_5",
                                icon:"img/allIcon/xitongguanli_1.png",
                                name:"登录日志管理",
                                isCheck:true,
                                isReadonly:true,
                                iframeUrl:"static/office-ui/html/loginLog.html",
                            },
                            {
                                code:"2_6",
                                icon:"img/allIcon/xitongguanli_1.png",
                                name:"操作日志管理",
                                isCheck:true,
                                isReadonly:true,
                                iframeUrl:"static/office-ui/html/controlLog.html",
                            },
                        ],
                    },],
                //选中的模块(由左侧添加后加入 传给右侧，除去基础模块)
                moduleList : [],
                // 所有选中的模块列表
                allCheckedModuleList : [],
                //login的URl
                logoUrl:"",
                moduleDtails : "" //左侧当前查看详情的模块信息
            }
        },
        methods:{
            //查看详情弹框
            showModuleDetailsPop(item){
                // console.log(item);
                this.moduleDtails = item
                this.isShowModuleDetailsPop = true;
            },
            //弹框传送回来选择的模块及子模块
            handlePopDtails(type,data){
                // console.log(this.moduleList);
                if(type === "add"){
                    for(let i = 0 ; i < this.moduleList.length ; i++){
                        if(this.moduleList[i].name === data.name){
                            this.moduleList[i] = data;
                            console.log(this.moduleList);
                            this.isShowModuleDetailsPop = false;
                            return
                        }
                    }
                    this.moduleList.push(data);
                    console.log(this.moduleList);

                }
                this.isShowModuleDetailsPop = false;
            },
            //左侧选中的模块值
            addOrcelModuleList(data){
                this.moduleList = data;
            },
            //添加模块按钮将模块列表添加到右侧
            addModulesInRight(){
                this.allCheckedModuleList = this.baseModuleList.concat(this.moduleList)
                // // // console.log(this.allCheckedModuleList);
                this.indexSrc = this.allCheckedModuleList[0].iframeUrl
                this.$store.commit('changeAllCheckedModuleList',this.allCheckedModuleList)
                this.$store.commit('changeIndexSrc',this.indexSrc)
            },
            //右侧修选中的模块列表
            rightResetModuleList(data){
                this.allCheckedModuleList = data;
                this.indexSrc = this.allCheckedModuleList[0].iframeUrl
                this.$store.commit('changeAllCheckedModuleList',this.allCheckedModuleList)
                this.$store.commit('changeIndexSrc',this.indexSrc)
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
        position: relative;
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

</style>