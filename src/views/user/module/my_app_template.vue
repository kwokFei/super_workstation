<template>
    <div class="container">
        <div class="topBox">
            <span>
                <span>筛选:</span>
                 <el-select v-model="value" clearable placeholder="全部">
                     <el-option
                             v-for="item in selectData"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                     </el-option>
                 </el-select>
            </span>
            <span class="czBox">
                <el-button type="info" plain @click="handleIsAllChecked">全选</el-button>
                <el-button type="info" plain @click="handleBatchRemove">删除</el-button>
                <el-input
                        style="margin-left: 0.1rem"
                        placeholder="搜索模板"
                        prefix-icon="el-icon-search"
                >
                </el-input>
            </span>
        </div>
        <div class="listBox">
            <div class="listItemBox" v-for="(item,index) in listData" :key="index"
                 @mouseenter="handleMarkShow(index)"
                 @mouseleave="handleMarkShow('')"
            >
                <div class="itemImgBox">
                    <img :src="item.bjUrl" alt="">
                    <div class="mbBox" v-show="isMaxShow === index">
                        <el-button style="margin: 0.22rem 0" type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                        <br>
                        <el-button type="primary" plain size="mini" icon="el-icon-money">预览</el-button>
                        <img @click="handleMinShow(index)" src="../../../assets/img/user/more.png" alt="" class="imgBtns">
                        <ul class="czMore" v-show="isMinShow === index">
                            <li>分享</li>
                            <li>复制</li>
                            <li @click="handleRemoveItem(index)">删除</li>
                        </ul>
                    </div>
                </div>
                <div class="titleBox">
                    <div style="width: 60%;margin-left: 0.1rem">
                        <p style="margin: 0.02rem 0;font-size:0.16rem;color:rgba(51,51,51,1);">{{item.title}}</p>
                        <span style="font-size:12px;color:rgba(153,153,153,1);text-align: left">{{item.time}}</span>
                    </div>
                    <div  style="width: 40%;text-align: center">
                        <el-checkbox v-model="item.isCheck" @change="handleCheck(index)"></el-checkbox>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my_app_template",
        data(){
            return{
                value:'',
                isAllChecked:false,
                isMaxShow:'',  // 第一层显示
                isMinShow:'',  // 第二层显示
                selectData:[
                    {
                        value: '1',
                        label: '我的发布'
                    }, {
                        value: '2',
                        label: '全部'
                    }
                ],
                listData:[
                    {
                        bjUrl:require('../../../assets/img/user/listBj002.png'),
                        title:'应用模块-模块1',
                        time:'2020-1-11 11:11',
                        isCheck:true,
                        isMyFB:true,
                    },
                    {
                        bjUrl:require('../../../assets/img/user/listBj002.png'),
                        title:'应用模块-模块2',
                        time:'2020-1-11 11:11',
                        isCheck:false,
                        isMyFB:false,
                    },
                    {
                        bjUrl:require('../../../assets/img/user/listBj002.png'),
                        title:'应用模块-模块3',
                        time:'2020-1-11 11:11',
                        isCheck:false,
                        isMyFB:false,
                    }
                ]
            }
        },
        methods:{
            //显示蒙版
            handleMarkShow(index){
                if(index === ""){
                    this.isMinShow = null
                }
                this.isMaxShow= index;
            },
            //显示分享菜单
            handleMinShow(index){
                if(index === this.isMinShow){
                    this.isMinShow = null
                }else {
                    this.isMinShow = index
                }

            },
            //个别选中
            handleCheck(id){
                this.listData[id].isCheck = !this.listData[id].isCheck;
            },
            //批量删除
            handleBatchRemove(){
                this.listData = this.listData.filter(item => item.isCheck == false);
            },
            // //全选
            handleIsAllChecked(){
                this.isAllChecked = !this.isAllChecked;
                if(this.isAllChecked){
                    for(let i = 0 ; i < this.listData.length; i++){
                        this.listData[i].isCheck = true
                    }
                }else {
                    for(let i = 0 ; i < this.listData.length; i++){
                        this.listData[i].isCheck = false
                    }
                }
            },
            //删除
            handleRemoveItem(index){
                this.listData.splice(index, 1);
            },
        }
    }
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
    }
    .topBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.4rem;
        line-height: 0.4rem;
    }
    .czBox{
        width: 4rem;
        height: 100%;
        display: flex;
        justify-content: left;
        align-items: center;
    }
    .listBox{
        margin-top: 0.1rem;
        width: 100%;
        max-height: 90%;
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
    }
    .listItemBox{
        width: 30%;
        height: 2.16rem;
        border-radius: 0.04rem;
        overflow: hidden;
        margin: 0.1rem 0.1rem;
        box-shadow: 0 0 10px 10px rgba(0,0,0,0.05)
    }
    .listItemBox .itemImgBox{
        width: 100%;
        height: 1.56rem;
        position: relative;
    }
    .itemImgBox>img{
        width: 100%;
        height: 100%;
    }
    .titleBox{
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 0.6rem;
    }
    .mbBox{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
    }
    .imgBtns{
        cursor: pointer;
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        width: 0.3rem;
        height: 0.08rem;
    }
    .czMore{
        position: absolute;
        top:0.25rem;
        right: 0.05rem;
        width:0.5rem;
        height:0.84rem;
        background:rgba(32,33,43,1);
        border-radius:0.04rem;
    }
    .czMore li{
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color: white;
        line-height:24px;
        cursor: pointer;
    }
    .czMore li:hover{
        color:rgba(47,128,237,1);
    }
</style>