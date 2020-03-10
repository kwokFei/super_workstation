<template>
    <div class="container">
        <!--系统名称-->
        <div class="container-title">
            <p>{{checkedname}}</p>
        </div>
        <div class="container-content">
            <el-row :gutter="20" class="conten-title">
                <el-col :xs="12">
                    <div>
                        <el-button type="primary"
                                   @click="handleIsDialogVisible">新建应用</el-button>
                    </div>
                </el-col>
                <el-col :xs="12">
                    <div>
                        <span>
                            <span>排列方式:</span>
                            <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">字母
                            </el-option>
                          </el-select>
                        </span>
                        <span></span>
                        <span><el-button type="info"
                                         plain
                                        @click="handleIsAllChecked">全选</el-button></span>
                        <span><el-button type="info"
                                         plain
                                         @click="handleBatchRemove">删除</el-button></span>
                        <span>
                        <el-input
                                placeholder="请输入内容"
                                prefix-icon="el-icon-search"
                        >
                        </el-input>
                    </span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :xs="8"
                        :span="6"
                        v-for="(item,index) in data"
                        >
                    <div class="grid-content bg-purple"
                         @mouseenter="handleMarkShow(index)"
                         @mouseleave="handleMarkShow('')">
                        <main-item :item = "item"
                                    @changeChecked = handleChangeChecked
                                    @changeName = handleChangeName>
                            <div class="mark" v-show="markShow===index">
                                <div class="btns">
                                    <el-button type="primary" size="mini"
                                               @click="handleToDesignCenter(index)">编辑</el-button>
                                    <el-button type="primary" plain size="mini"
                                                @click="toSeeShare(item)">预览</el-button>
                                </div>
                                <div>
                                    <el-button size="mini" @click="handleDotUl(index)" class="container-imgbts">
                                        <img src="static/img/sdIcon.png" alt="" class="img-btns">
                                    </el-button>

                                    <ul v-show="dotUl === index">
                                        <li>分享</li>
                                        <li @click="handleCopyItem(item)">复制</li>
                                        <li @click="handleRemoveItem(item.appId)">删除</li>
                                    </ul>
                                </div>
                            </div>
                        </main-item>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--弹框-->
        <mark-pop :dialogVisible="isDialogVisible"
                  @handleDialogVisible = "handleDialogVisible"></mark-pop>
    </div>
</template>

<script>
    import mainItem from './main-item'
    import markPop from './mark_pop'
    import {exampleAppData,baseModuleList} from  "@/utils/public_const"
    import {seeShare,onlyOneArr} from '@/utils/public_fun'
    export default {
        name: "container_main",
        components:{
            mainItem,
            markPop
        },
        props:["checkedname"],
        data(){
            return{
                isDialogVisible : false,  //弹框是否可见
                isAllChecked : false,
                dotUl : "",//分享负责列表展示
                markShow : "", //蒙版是否显示
                options: [{
                    value: '选项1',
                    label: '字母'
                }],  //字母
                value: '选项1',//字母
                data:exampleAppData

            }
        },
        methods:{
            //预览
            toSeeShare(item){
                // console.log(item);
                //去和基础模板对比
                let AllCheckedModuleList = onlyOneArr(item.data,baseModuleList)
                this.$store.commit("changeAllCheckedModuleList",AllCheckedModuleList)
                this.$store.commit("changeIndexSrc",AllCheckedModuleList[0].iframeUrl)
                seeShare(this)
            },
            //修改应用名称
            handleChangeName(id,newName){
                for(let i = 0;i < this.data.length; i ++){
                    if(this.data[i].appId === id){
                        this.data[i].projectName= newName;
                        return
                    }
                }
            },
            //跳转到设计方案界面 将相应的选择列表存入vuex中
            handleToDesignCenter(index){
                let AllCheckedModuleList = onlyOneArr(this.data[index].data,baseModuleList)
                this.$store.commit("changeAllCheckedModuleList",AllCheckedModuleList)
                this.$store.commit("changeIndexSrc",AllCheckedModuleList[0].iframeUrl)
                this.$router.push({path:"/design_center"})
            },
            //关闭弹框以及接受新应用的参数
            handleDialogVisible(data){
                // console.log(data);
                if(data){
                    data.appId = new Date().getTime();
                    data.data = [
                        {
                            code:"1",
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
                        },
                        {
                            code:"3",
                            icon:"img/allIcon/shijianguanli_1.png",
                            name:"事件管理",
                            isCheck:true,
                            isReadonly:true,
                            iframeUrl:"static/htmls/shebeishijian/header.html",
                            childModule:[],
                        },
                        {
                            code:"4",
                            icon:"img/allIcon/pingtaiguanli_1.png",
                            name:"平台管理",
                            isCheck:true,
                            isReadonly:true,
                            iframeUrl:"static/htmls/pingtaiguanli/header.html",
                            childModule:[],
                        },
                        {
                            code:"5",
                            icon:"img/allIcon/3dguanli_1.png",
                            name:" 管理3D",
                            isCheck:true,
                            isReadonly:true,
                            iframeUrl:"static/htmls/guanli3D/header.html",
                            childModule:[],
                        },
                        {
                            code:"103",
                            icon:"img/allIcon/shebeiguanli_1.png",
                            name:" 设备管理",
                            isCheck:true,
                            isReadonly:true,
                            iframeUrl:"htmls/shebeiguanli/header.html"
                        },
                    ];
                    this.data.push(data);
                }

                this.isDialogVisible = false;
            },
            //是否弹出弹框
            handleIsDialogVisible(){
              this.isDialogVisible = true
            },
            //个别选中
            handleChangeChecked(id,stats){
                for(let i = 0 ; i < this.data.length; i++){
                    if(this.data[i].appId === id){
                        this.data[i].ischecked = stats;
                        return
                    }
                }
            },
            //批量删除
            handleBatchRemove(){
                this.data = this.data.filter(item => item.ischecked == false);
            },
            //全选
            handleIsAllChecked(){
                this.isAllChecked = !this.isAllChecked;
                if(this.isAllChecked){
                    for(let i = 0 ; i < this.data.length; i++){
                        this.data[i].ischecked = true
                    }
                }else {
                    for(let i = 0 ; i < this.data.length; i++){
                        this.data[i].ischecked = false
                    }
                }
            },
            //删除
            handleRemoveItem(id){
                for(let i = 0 ; i < this.data.length; i++){
                    if(this.data[i].appId === id ){
                        this.data.splice(i, 1);
                        return
                    }
                }
            },
            //复制
            handleCopyItem(item){
                let newItem =JSON.parse(JSON.stringify(item));
                newItem.appId = new Date().getTime()
                // console.log(newItem);
                this.data.push(newItem)
            },
            //显示蒙版
            handleMarkShow(index){
                if(index === ""){
                    this.dotUl = null
                }
                this.markShow= index;
            },
            //显示分享菜单
            handleDotUl(index){
                if(index === this.dotUl){
                    this.dotUl = null
                }else {
                    this.dotUl = index
                }

            },
        }
    }
</script>

<style scoped>
    .container{
        height: calc(100vh - 0.8rem);
        background: #F0F0F8;
        padding: 0 3.1rem;
    }
    .container-title{
        height: 0.88rem;
        display: flex;
        align-items: center;
    }
    .container-title>p{
        height: 0.28rem;
        border-left: 0.04rem solid #0068ff;
        margin-left: 0.1rem;
        padding-left: 0.15rem;
    }
    .container-content{
        width: 13rem;
        height: 80%;
        background-color: #ffffff;
        border-radius: 0.08rem;
        margin: 0 auto;
        overflow: hidden;
        padding: 0.19rem 0.46rem;
    }
    .conten-title{
        display: flex;
        justify-content: space-between;
    }
    .conten-title>.el-col:first-child{
        text-align: left;
    }
    .conten-title>.el-col:nth-child(2)>div>span:first-child{
        display: flex;
        align-items: center;
    }
    .conten-title>.el-col:nth-child(2)>div>span:first-child>span:first-child{
        display: inline-block;
        min-width: 59px;
    }
    .conten-title>div:nth-child(2)>div{
        display: flex;
        align-items: center;
    }

    .conten-title>div:nth-child(2)>span{
        margin: 0 0.02rem;
    }
    .grid-content {
        margin-top: 0.3rem;
        width: 2.8rem;
        /*height: 2rem;*/
        background-color: #ffffff;
        box-shadow: 0.024rem 0.168rem 0.261rem 0.029rem
        rgba(182, 180, 195, 0.55);
        border-radius: 0.12rem;
    }
    .container-content>.el-row:nth-child(2){
        height: 88%;
        overflow-y: auto;
        padding-bottom: 10px;
    }
    .container-imgbts{
        background: transparent;
        border: none;
    }
    .img-btns{
        width: 0.3rem;
        height: 0.1rem;
    }

</style>