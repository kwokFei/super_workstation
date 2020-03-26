<template>
    <div class="table-all">
        <el-table
            :data="tableData"
            :default-sort = "{prop: 'enddata'}"
            border
            highlight-current-row
            stripe
            style="width: 100%">
            <el-table-column
                type="index"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="projectName"
                label="项目名称">
            </el-table-column>
            <el-table-column
                prop="projectLoder"
                label="项目负责人"
                width="100">
            </el-table-column>
            <el-table-column
                prop="startdate"
                label="开始时间"
                width="100">
            </el-table-column>
            <el-table-column
                prop="enddata"
                label="计划完成时间"
                sortable
                width="180">
            </el-table-column>
            <el-table-column
                label="文件柜"
                width="90">
                <template slot-scope="{row}">
                    <el-button type="primary"
                               size = "mini"
                               :disabled="row.file">下载</el-button>
                </template>

            </el-table-column>
            <el-table-column
                label="详情"
                width="90">
                <template slot-scope="{row}">
                    <el-button type="success"
                               size = "mini"
                               :disabled="row.detail"
                               @click="handlGotoDtail">查看</el-button>
                </template>

            </el-table-column>

            <el-table-column
                label="延期记录"
                width="90">
                <template slot-scope="{row}">
                    <el-button type="danger"
                               size = "mini"
                               :disabled="row.overTimeRecoder">明细</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "FormTabble",
        props:["tableData","statu"],
        methods:{
            handlGotoDtail(){
                if(this.statu === "进行中"){
                    this.$router.push({path:'/project_center/all_in_progress_project/details'})
                }else if(this.statu === "已完成"){
                    // console.log('跳转已完成');
                    this.$router.push({path:'/project_center/all_finsh_project/details'})
                }else if(this.statu === "超时"){
                    this.$router.push({path:'/project_center/all_overtime_project/details'})
                }


            },
        }
    }
</script>

<style>
    .table-all .el-table--border th,
    .el-table td{
        text-align: center;
    }
</style>

<style scoped>
    .table-all{
        height: calc(100% - 0.8rem - 0.98rem);
        overflow-y: auto;
        padding: 0 0.2rem;
    }
</style>