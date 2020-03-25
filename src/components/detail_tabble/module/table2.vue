<template>
    <el-table
        :data="table2Data"
        border
        :header-row-class-name ="handlSetColor"
        style="width: 100%">
        <el-table-column
            prop="data"
            label="日期"
            width="100">
        </el-table-column>
        <el-table-column
            prop="logContent"
            label="每日项目日志"
            width="310">
        </el-table-column>
        <el-table-column
            prop="progressDay"
            label="每日进度"
            width="100">
        </el-table-column>
        <el-table-column
            prop="remarks"
            label="备注">
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "table2",
        props:["table2Data","isDo"],
        methods:{
            handlSetColor({row, rowIndex}){
                // console.log(this.isDo);
                if (!this.isDo) {
                    return 'notdo-row';
                } else{
                    return 'isdo-row';
                }
            }
        }
    }
</script>

<style>
    .container-detail-table .el-table--border th,
    .container-detail-table .el-table td{
        text-align: center;
        color: #666666;
    }

    .container-detail-table .el-table .isdo-row {
        background: #D9E9FF;
    }

    .container-detail-table .el-table .notdo-row {
        background: #EFEFEF;
    }
</style>

<style scoped>

</style>