<template>
    <div id="design_left_container">
        <h3>模块列表</h3>
        <el-input
                v-model="value"
                placeholder="请输入内容"
                prefix-icon="el-icon-search">
        </el-input>
        <div class="module_select">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <el-checkbox :indeterminate="isIndeterminate"
                     v-model="checkAll"
                     @change="handleCheckAllChange">全选</el-checkbox>
        <!--模块列表-->
        <div class="module_container">
            <el-checkbox-group v-model="checkedCities"
                               @change="handleCheckedCitiesChange">
                <el-checkbox v-for="(item,index) in cities"
                             :label="item"
                             :key="index">
                    <div class="module_img"
                         @mouseenter="showModuleDetails('enter',index)"
                         @mouseleave="showModuleDetails('leave',index)"
                    >
                        <div class="module_img_mark"
                             v-show="module_details === index"
                             >
                            <el-button type="primary" @click="showModuleDetailsPopout(item)">查看详情</el-button>
                        </div>
                        {{item.name}}
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
    // const cityOptions = ['上海', '北京', '广州', '深圳','重庆','成都'];
    export default {
        name: "left",
        data() {
            return {
                module_details :"", //列表蒙版是否显示
                options:
                    [{
                        value: '选项1',
                        label: '黄金糕'
                    },{
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }],
                value: '',
                checkAll: false,
                checkedCities: [],
                cities: this.modulelist,
                isIndeterminate: true,
            }
        },
        props:["modulelist"],
        methods: {
            //单选多选
            handleCheckAllChange(val) {
                this.checkedCities = val ? this.cities : [];
                // console.log(this.checkedCities);
                this.isIndeterminate = false;
                let cloneData = JSON.parse(JSON.stringify(this.checkedCities))
                this.$emit("addOrcelModuleList",cloneData)
            },
            handleCheckedCitiesChange(value) {
                // console.log(value);
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
                let cloneData = JSON.parse(JSON.stringify(this.checkedCities))
                this.$emit("addOrcelModuleList",cloneData)
            },
            // 显示详情
            showModuleDetails(type,index){
                if(type === "enter") this.module_details = index;
                else  this.module_details = null;
            },
            showModuleDetailsPopout(item){
                //加入多选中
                for(let i =0 ; i < this.checkedCities.length; i++){
                    if(this.checkedCities[i].name === item.name ){
                        //弹出弹框
                        this.$emit('showModuleDetails',item);
                        return
                    }
                }
                this.checkedCities.push(item);
                this.handleCheckedCitiesChange(this.checkedCities);
                //弹出弹框
                this.$emit('showModuleDetails',item);
            },
            //添加模块按钮将模块列表添加到右侧
            addModulesInRight(){
                this.$emit("addModulesInRight")
            }
        }
    }
</script>

<style scoped>
    #design_left_container{
        height: 100%;
        background: #EFEFEF;
        position: relative;
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
    .el-input,
    .el-input--suffix,
    input .el-input__inner{
        height: 0.3rem !important;
    }

    .module_container{
        height:calc(100% - 2.5rem);
        overflow-y: auto;
    }
    .el-checkbox-group{
        display: flex;
        flex-direction: column;
        height: 100%;

    }
    .module_img{
        width:100px;
        height: 100px;
        border: 1px solid red;
        position: relative;
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
        height: 100%;
        background: #C3C3C3;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }


</style>