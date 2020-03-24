<template>
    <div class="container-page">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "PageFooter",
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        data() {
            return {
                currentPage: 4
            };
        }
    }
</script>

<style>
    .container-page .el-pagination{
        position: absolute;
        bottom: 0.2rem;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>


<style scoped>

    .container-page{
        height: 0.98rem;
        position: relative;
    }
    .el-pagination{
        line-height: 0;
    }

</style>