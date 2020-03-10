<template>
    <div class="details-pop-container">
        <div>
            <el-carousel trigger="click"
                         :autoplay = false
                         height="3.82rem"
                         @change="handleChildrenName">
                <el-carousel-item v-for="(item,index) in imgList" :key="index"
                                  >
                    <!--<h3 class="small">{{ item }}</h3>-->
                    <img :src="item" alt="">
                </el-carousel-item>

            </el-carousel>
            <div class="childName">{{childrenName}}</div>
        </div>
        <div>
            <div>
                <h3>模块信息描述</h3>
                <div class="childrenInfo">
                    <span>名称 : {{modules.name}}</span>
                    <span>页面：{{imgList.length}}页</span>
                    <span>模块：{{imgList.length}}个 </span>
                    <span>组件：{{imgList.length}}个</span>

                </div>

            </div>
            <div>
                <h3>模块选择</h3>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="item in modules.childModule"
                                 :label="item"
                                 :key="item.name">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div>
                <h3>风格选择</h3>
                <el-radio v-model="radio" label="1">极简白</el-radio>
                <el-radio v-model="radio" label="2">科技蓝</el-radio>
            </div>
            <div>
                <el-button type="primary" @click="handlepop('add')">添加</el-button>
                <el-button type="info" @click="handlepop('close')">关闭</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "popDetails",
        props:["modules","imgList"],
        watch:{
            modules(){
                // console.log(this.modules);
                this.cities = this.modules.childModule;
                this.checkedCities= this.modules.childModule || [];
                this.getchildrenName(0);
            }

        },
        created(){
            this.getchildrenName(0)
        },
        data(){
            return{
                childrenName : "", //当前模块的名字
                cities: this.modules.childModule, //当前模块的子模块信息
                checkAll: false,
                checkedCities: this.modules.childModule || [],
                isIndeterminate: true,
                // 风格选择
                radio : "1",
                check: true,
            }
        },
        methods:{
            getchildrenName(index){
                if(this.modules.childModule.length === 0){
                    this.childrenName = this.modules.name
                }else {
                    this.childrenName = this.modules.childModule[index].name
                }
            },
            //走马灯当前模块的名字
            handleChildrenName(index){
                // this.childrenName = this.modules.childModule[index].name
                this.getchildrenName(index)
            },
            //多选按钮
            handleCheckAllChange(val) {

                this.checkedCities = val ? this.cities : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            //添加模块或者关闭弹框
            handlepop(type){
                // console.log(typeof(this.modules.childModule) === "undefined");
                if(this.checkedCities.length === 0 && this.modules.childModule.length !== 0){
                    this.$message.error('错了哦，至少要选择一个模块');
                    return
                }
                let cloneData = JSON.parse(JSON.stringify(this.modules))
                //当前选择模块
                cloneData.childModule = this.checkedCities;
                // console.log(cloneData);
                this.$emit("handlepop",type,cloneData);

            },
        }
    }
</script>

<style scoped>
    .details-pop-container h3{
        text-align: left;
        margin-bottom: 0.15rem;
        font-size: 0.16rem;
        color: #666666;
        padding-left: 0.37rem;
    }
    img{
        width: 100%;
        height: 100%;
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
        /*opacity: 0.6;*/
    }
    .details-pop-container>div:nth-child(2){
        width: 40%;
        height: 3.82rem;
        /* opacity: 0.6; */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .details-pop-container>div:nth-child(2)>div{
        width: 100%;
        margin-bottom: 0.15rem;
    }

    .el-checkbox-group {
        font-size: 0;
        display: flex;
        flex-wrap: wrap;
        padding-left: 0.37rem;
        max-height: 1.2rem;
        overflow: auto;
    }
    .el-checkbox {
        flex: 1;
        text-align: left;
    }
    .childName{
        color: #66B1FF;
        position: absolute;
        bottom: 0.05rem;
        font-size: 0.2rem;
    }
    .childrenInfo>span{
        margin-right: 0.1rem;
    }
</style>