<template>
    <div class="form-all">
        <span>项目负责人：</span>
        <el-select v-model="projectLeader" clearable placeholder="请选择">
            <el-option
                v-for="item in projectLeaderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <span class="status">当前状态：</span>
        <el-select v-model="projectStatu" clearable placeholder="请选择">
            <el-option
                v-for="item in projectStatuOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-input
            placeholder="输入项目名称"
            suffix-icon="el-icon-search"
            v-model="projectName">
        </el-input>
        <el-button type="primary">查询</el-button>
        <el-button type="primary" plain>重置</el-button>

    </div>
</template>

<script>
    export default {
        name: "form_all",
        props:["projectLeaderOptions","projectStatuOptions"],
        data() {
            return {
                projectLeader: '0',
                projectStatu :  "0",
                projectName : null,
            }
        }
    }
</script>

<style scoped>
    .el-input{
        width: auto;
    }
    .form-all{
        text-align: left;
        padding-top: 0.2rem;
        margin: 0.2rem 0;
        height: 0.6rem;
        display: flex;
        align-items: center;
    }
    span{
        font-size: 0.16rem;
        color: #666666;
        padding-left: 0.2rem;
        min-width: 98px;
        display: inline-block
    }


</style>