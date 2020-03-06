<template>
    <div>
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
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <!--模块列表-->
        <div class="module_container">
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">
                    <div class="module_img">
                        我是第几个module
                    </div>
                </el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="module_bttom_btn">
            <el-button type="primary" icon="el-icon-s-claim">添加模块</el-button>
        </div>
    </div>
</template>

<script>
    const cityOptions = ['上海', '北京', '广州', '深圳','重庆','成都'];
    export default {
        name: "left",
        data() {
            return {
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
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                isIndeterminate: true,
            }
        },
        methods: {
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
    }
</script>

<style scoped>
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
        height: 6.2rem;
        overflow-y: auto;
        background: #f4f4f4;
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
    }
    .module_bttom_btn{
        background:#ffffff;
    }
    .el-checkbox{
        width: 100%;
        padding: 10px 0;
        background: #f4f4f4;
    }
    .el-checkbox:last-of-type{
        margin-right: 30px;
    }
    .main>div:first-child{
        position: relative;
    }


</style>