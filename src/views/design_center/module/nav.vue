<template>
    <div>
        <el-header>
            <el-row :gutter="24">
                <el-col :span="4" :xs="24">
                    <div><img src="" alt=""></div>
                </el-col>
                <el-col :span="14" :xs="12"><div>
                    <h2>应用系统设计</h2>
                </div></el-col>
                <el-col :span="6" :xs="12">
                    <div class="nav_span">
                        <span>发布</span>
                        <span @click="seeShare">预览</span>
                        <span>保存</span>
                        <span>下一步</span>
                    </div>
                </el-col>
            </el-row>
        </el-header>
    </div>
</template>

<script>
    export default {
        name: "design-nav",
        methods:{
            seeShare(){
                window.localStorage.setItem('allCheckedModuleList',JSON.stringify(this.$store.state.allCheckedModuleList));
                window.localStorage.setItem('indexSrc',JSON.stringify(this.$store.state.indexSrc));
                let routeUrl = this.$router.resolve({
                    path: "/view_center",
                });
                window.open(routeUrl.href, '_blank');
            }
        }
    }
</script>

<style scoped>
    .el-header{
        height: 0.48rem !important;
        line-height: 0.48rem;
        font-size: 0.2rem;
        color: #666666;
    }
    .nav_span{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 0.48rem;
    }
    .nav_span > span{
        flex: 1;
        border-left: 1px solid black;
        height: 0.31rem;
        display: inline-block;
        line-height: 0.31rem;
        cursor: pointer;
        font-size: 0.16rem;
    }
    h2{
        font-size: 0.2rem;
        font-weight: 400;
    }

</style>