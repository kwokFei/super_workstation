<template>
    <el-table
        :data="table1Data"
        border
        :header-row-class-name ="handlSetColor"
        style="width: 100%"
        class="talbe1">
        <el-table-column
            prop="node"
            label="节点名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="负责人"
            width="180">
        </el-table-column>
        <el-table-column
            prop="status"
            label="当前状态">
        </el-table-column>
        <el-table-column
            prop="progress"
            label="当前进度">
        </el-table-column>
        <el-table-column
            prop="address"
            label="文件柜">
            <template slot-scope="{row}">
                <el-button type="primary"
                           size = "mini"
                           :disabled="row.file">下载</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "table1",
        props:["table1Data"],
        methods:{
            handlSetColor({row, rowIndex}){
                if (!this.table1Data[0].isDo) {
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




    .el-table--border{
        margin-top: 0.4rem;
    }

</style>