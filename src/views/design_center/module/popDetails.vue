<template>
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
                    <el-checkbox v-for="item in modules.childModule"
                                 :label="item"
                                 :key="item.name">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div>
                <h3>风格选择</h3>
                <el-radio v-model="radio" label="1">风格一</el-radio>
                <el-radio v-model="radio" label="2">风格二</el-radio>
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
        props:["modules"],
        watch:{
            modules(){
                this.cities = this.modules.childModule;
                this.checkedCities= this.modules.childModule || [];
            }

        },
        data(){
            return{
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
    .details-pop-container>div:nth-child(2){
        width: 40%;
        height: 3.82rem;
        opacity: 0.6;
    }

</style>