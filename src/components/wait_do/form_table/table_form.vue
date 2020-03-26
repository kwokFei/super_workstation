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
                label="申请人"
                width="100">
            </el-table-column>
            <el-table-column
                prop="applyType"
                label="申请类型"
                width="100">
            </el-table-column>
            <el-table-column
                prop="applyTime"
                label="申请时间"
                width="180">
            </el-table-column>

            <el-table-column
                label="操作"
                width="90">
                <template slot-scope="{row}">
                    <el-button type="primary"
                               size = "mini"
                               @click="handelgoToDetail(row)"
                               >处理</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    export default {
        name: "table_form",
        name: "FromTabble",
        props:["tableData"],
        methods:{
            handelgoToDetail(row){
                // console.log(row);
                if(row.applyType === "延期申请"){
                    this.$router.push({path:"/project_center/all_need_project/delay_delay"})
                }else if(row.applyType === "变更申请"){
                    this.$router.push({path:"/project_center/all_need_project/delay_change"})
                }else if(row.applyType === "立项申请"){
                    this.$router.push({path:"/project_center/all_need_project/delay_project"})
                }

            }
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