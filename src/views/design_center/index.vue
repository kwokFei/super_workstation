<template>
    <div id="design-container">
        <!--导航部分-->
        <design-nav></design-nav>
        <!--主体部分-->
        <el-row class="main">
            <el-col :span="3"
                    :xs ="12">
                <design-left :modulelist = "allList"
                             :deleteCode = "deleteCode"
                             @clearType = handleClearType
                             @showModuleDetails = showModuleDetailsPop
                             @addOrcelModuleList = addOrcelModuleList
                             @addModulesInRight = addModulesInRight></design-left>

            </el-col>
            <el-col :span="17" :xs ="24" id="centerContainer">
                <designCenter></designCenter>
            </el-col>
            <el-col :span="4" :xs ="24" class="right-container">
                <design-right
                    :modulesListRight = "allCheckedModuleList"
                    @rightResetModuleList = rightResetModuleList></design-right>
            </el-col>
        </el-row>
        <!--分类列表-->
        <module-classify
                @chooseType = handleChooseType
                :isChecked = "classifyChecked"></module-classify>
        <!--弹框-->
        <el-dialog :visible.sync="isShowModuleDetailsPop"
                   width="60%"
                   title="查看详情">

            <pop-details :modules="moduleDtails"
                         :imgList = "imgList"
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
    import moduleClassify from  './module/moduleClassify'
    import {baseModuleList,allList} from "@/utils/public_const"
    export default {
        name: "Design_center",
        components:{
            designNav,
            designLeft,
            designRight,
            designCenter,
            popDetails,
            moduleClassify
        },
        data(){
            return{
                classifyChecked : "", //ul中被选中的那个
                deleteCode : "",
                indexSrc : "",   //首次添加时中间的src
                isShowModuleDetailsPop : null,//弹窗是否打开
                //全部模块列表 用于左侧展示
                allList : allList,
                // 基础模块(必选)
                baseModuleList : baseModuleList,
                //选中的模块(由左侧添加后加入 传给右侧，除去基础模块)
                moduleList : [],
                // 所有选中的模块列表
                allCheckedModuleList : this.$store.state.allCheckedModuleList,
                //login的URl
                logoUrl:"",
                moduleDtails : "", //左侧当前查看详情的模块信息
                imgList : "" ,  //详情中的轮播图
            }
        },
        methods:{
            //清空选择的类型
            handleClearType(){
                this.allList = allList;
                this.classifyChecked = null
            },
            //选择类型
            handleChooseType(type){
                let arr = [];
                for(let i = 0; i < allList.length; i++){
                    if(allList[i].type === type){
                        arr.push(allList[i])
                    }
                }
                this.allList = arr;
                this.classifyChecked = type;
                // console.log(this.allList);
            },
            //查看详情弹框
            showModuleDetailsPop(item){
                // console.log(item);
                this.moduleDtails = item;
                this.imgList = []
                if(this.moduleDtails.childModule.length === 0){
                    this.imgList.push(this.moduleDtails.left_img)
                }else {
                    for(let i = 0 ; i < this.moduleDtails.childModule.length; i ++){
                        this.imgList.push(this.moduleDtails.childModule[i].left_img)
                    }
                }
                this.isShowModuleDetailsPop = true;
            },
            //弹框传送回来选择的模块及子模块
            handlePopDtails(type,data){
                // console.log(this.moduleList);
                if(type === "add"){
                    for(let i = 0 ; i < this.moduleList.length ; i++){
                        if(this.moduleList[i].name === data.name){
                            this.moduleList[i] = data;
                            // console.log(this.moduleList);
                            this.isShowModuleDetailsPop = false;
                            return
                        }
                    }
                    this.moduleList.push(data);
                    // console.log(this.moduleList);

                }
                this.isShowModuleDetailsPop = false;
            },
            //左侧选中的模块值
            addOrcelModuleList(data){
                this.moduleList = data;
            },
            //添加模块按钮将模块列表添加到右侧
            addModulesInRight(){
                // console.log(this.moduleList);
                this.allCheckedModuleList = this.baseModuleList.concat(this.moduleList)
                // console.log(this.allCheckedModuleList);
                this.indexSrc = this.allCheckedModuleList[0].iframeUrl
                this.$store.commit('changeAllCheckedModuleList',this.allCheckedModuleList)
                this.$store.commit('changeIndexSrc',this.indexSrc)
            },
            //右侧修选中的模块列表
            rightResetModuleList(data,code){
                // console.log(code);
                this.deleteCode = code;
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
        padding-top: 0.04rem;
        background: #EFEFEF;
    }
    .main>div{
        box-shadow: 5px -1px 5px #888888 inset;
        padding: 0.03rem 0 0 !important;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .main>div:nth-child(3){
        overflow-y: hidden;
        overflow-x: auto;
        position: relative;
    }

    #centerContainer{
        background: #EFEFEF;
        padding-top: 1rem !important;
        /*margin:0 2%;*/
    }
    .right-container>div{
        height: 90%;
        /*overflow-y: auto;*/
    }

</style>