<template>
    <div id="design_left_container">
        <h3>模块列表</h3>
        <el-input
                placeholder="搜索行业/模块"
                prefix-icon="el-icon-search">
        </el-input>
        <div class="module_select">
            <business-cascader @handleChangeBusiness = handleChangeBusiness></business-cascader>
        </div>
        <el-checkbox :indeterminate="isIndeterminate"
                     v-model="checkAll"
                     @change="handleCheckAllChange">全选</el-checkbox>
        <!--模块列表-->
        <div class="module_container">
            <el-checkbox-group v-model="arrCheckedCities"
                               @change="handleCheckedCitiesChange">
                <el-checkbox v-for="(item,index) in cities"
                             :label="item.code"
                             :key="index">

                    <div class="module_img"
                         @mouseenter="showModuleDetails('enter',index)"
                         @mouseleave="showModuleDetails('leave',index)">
                        <div class="module_img_mark"
                             v-show="module_details === index"
                             >
                            <el-button type="primary" @click="showModuleDetailsPopout(item)">查看详情</el-button>
                        </div>
                        <img :src="item.left_img" alt="">
                        <span class="itemModuleName">{{item.name}}</span>

                    </div>
                </el-checkbox>
            </el-checkbox-group>
        </div>

        <div class="module_bttom_btn">
            <el-button type="primary"
                       icon="el-icon-s-claim"
                        @click="addModulesInRight">添加模块</el-button>
        </div>
    </div>
</template>

<script>
    import businessCascader from '@/components/cascader/Cascader'
    export default {
        name: "left",
        components:{
            businessCascader
        },
        data() {
            return {
                module_details :"", //列表蒙版是否显示
                checkAll: false,
                checkedCities: [], //真正选择的数据
                arrCheckedCities:[], //选择数据的code映射
                cities: this.modulelist, //全部的数据
                arrcities:[], //全部数据的code映射
                isIndeterminate: true,
                theBusiness : "" ,//当前选择的行业
            }
        },
        props:["modulelist","deleteCode"],
        methods: {
            init() {
                this.checkedCities = [];
                this.arrCheckedCities = [];
                this.arrcities = [];
                for (let i = 0; i < this.$store.state.allCheckedModuleList.length; i++) {
                    if(!this.$store.state.allCheckedModuleList[i].isReadonly){
                        this.checkedCities.push(this.$store.state.allCheckedModuleList[i]);
                        //拿到当前选中的数组
                        this.arrCheckedCities.push(this.$store.state.allCheckedModuleList[i].code)
                    }
                }
                for (let i = 0; i < this.modulelist.length; i++) {
                    //拿到全部的数组
                    this.arrcities.push(this.modulelist[i].code);

                }
            },
            // 单选多选
            handleCheckAllChange(val) {
                this.checkedCities = val ? this.cities : [];
                this.arrCheckedCities = val ? this.arrcities : [];
                // console.log(this.checkedCities);
                this.isIndeterminate = false;
                // console.log(this.checkedCities);
                let cloneData = JSON.parse(JSON.stringify(this.checkedCities))
                this.$emit("addOrcelModuleList",cloneData)
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.arrcities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.arrcities.length;
                // console.log(this.cities);
                let cloneData  = [];
                for(let i = 0 ; i < value.length ; i++){
                    for(let j = 0; j < this.cities.length; j++){
                        if(this.cities[j].code === value[i]){
                            cloneData.push(this.cities[j]);
                        }
                    }
                }
                this.checkedCities = cloneData;
                this.$emit("addOrcelModuleList",cloneData)
            },
            // 显示详情
            showModuleDetails(type,index){
                if(type === "enter") this.module_details = index;
                else  this.module_details = null;
            },
            showModuleDetailsPopout(item){
                //加入多选中
                // console.log(this.checkedCities);
                for(let i =0 ; i < this.checkedCities.length; i++){
                    if(this.checkedCities[i].code === item.code){
                        //弹出弹框
                        // this.arrCheckedCities.push(item.code)
                        // console.log(this.checkedCities);
                        // console.log(this.arrCheckedCities);
                        this.checkedCities[i] =item
                        this.$emit('showModuleDetails',this.checkedCities[i]);
                        return
                    }
                }

                // //找到要查看详情的那个item
                this.arrCheckedCities.push(item.code)
                this.checkedCities.push(item);
                // console.log(this.checkedCities);
                // console.log(this.arrCheckedCities);
                this.handleCheckedCitiesChange(this.arrCheckedCities);
                //弹出弹框
                this.$emit('showModuleDetails',item);
            },
            //添加模块按钮将模块列表添加到右侧
            addModulesInRight(){
                this.$emit("addModulesInRight")
            },
            //选择行业
            handleChangeBusiness(value){
                this.theBusiness = value
                // console.log(this.theBusiness);
                if(value.length === 0){
                    this.$emit("clearType");
                }
            }
        },
        watch:{
            //列表变化
            modulelist(){
                this.cities = this.modulelist
                this.init();
            },
            //右侧删除某一个模块
            deleteCode(){
                let copyArrCheckedCities = JSON.parse(JSON.stringify(this.arrCheckedCities))
                let copycheckedCities = JSON.parse(JSON.stringify(this.checkedCities))
                //删除选中的映射表 还要删除 实际选择的数组
                for(let i =0 ; i < copyArrCheckedCities.length; i ++){
                    if(copyArrCheckedCities[i] === this.deleteCode){
                        copyArrCheckedCities.splice(i,1)
                    }
                }
                for(let i =0 ; i < copycheckedCities.length; i ++){
                    if(copycheckedCities[i].code === this.deleteCode){
                        copycheckedCities.splice(i,1)
                    }
                }
                this.arrCheckedCities = copyArrCheckedCities;
                this.checkedCities = copycheckedCities;
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>
    #design_left_container{
        height: 100%;
        background: #ffffff;
        position: relative;
        padding-left: 0.03rem;
    }
    /*左侧部分*/
    h3{
        width: 100%;
        height: 0.41rem;
        line-height: 0.41rem;
        background: #ffffff;
    }
    .module_select{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .module_container{
        height:calc(100% - 2.5rem);
        overflow-y: auto;
        margin-top: 0.01rem;
    }
    .el-checkbox-group{
        display: flex;
        flex-direction: column;
        height: 100%;

    }
    .module_img{
        width: 1.54rem;
        height: 1.51rem;
        opacity: 0.6;
        position: relative;
    }
    img{
        width: 100%;
        height: 1.11rem;
        border: 0.01rem solid #64A1FD;
        border-radius: 0.12rem;
    }
    .module_bttom_btn{
        background:#ffffff;
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .el-checkbox{
        width: 100%;
        padding: 10px 0;
        background: #EFEFEF;
    }
    .el-checkbox:last-of-type{
        margin-right: 30px;
    }
    .main>div:first-child{
        position: relative;
    }

    .module_img_mark{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1.11rem;
        background: #C3C3C3;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 0.12rem;
        border: 0.01rem solid #64A1FD;
    }

    .el-checkbox {
        display: flex;
        align-items: center;
    }
    .itemModuleName{
        position: absolute;
        left: 0;
        bottom: 0;
    }


</style>