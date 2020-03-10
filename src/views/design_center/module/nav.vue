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
                        <span>
                            <img src="@/assets/img/design_center_nav/publish.png" alt="">
                            <span>发布</span>
                        </span>
                        <span @click="toSeeShare">
                            <img src="@/assets/img/design_center_nav/view.png" alt="">
                            <span>预览</span>
                        </span>
                        <span>
                            <img src="@/assets/img/design_center_nav/save.png" alt="">
                            <span>保存</span>
                        </span>
                        <span @click="toNext">
                            <img src="@/assets/img/design_center_nav/next.png" alt="">
                            <span>下一步</span>
                        </span>
                    </div>
                </el-col>
            </el-row>
        </el-header>
    </div>
</template>

<script>
    import {seeShare} from '@/utils/public_fun'
    export default {
        name: "design-nav",
        methods:{
            toSeeShare(){
                seeShare(this)
            },
            toNext(){
                this.$confirm('是否进行驾驶舱设计？, 是否继续?', '下一步', {
                    confirmButtonText: '开始设计',
                    cancelButtonText: '直接发布',
                    type: 'warning'
                })
            },
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
    .nav_span > span {
        flex: 1;
        border-left: 1px solid black;
        height: 0.31rem;
        line-height: 0.31rem;
        cursor: pointer;
        font-size: 0.16rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h2{
        font-size: 0.2rem;
        font-weight: 400;
    }
    img{
        width: 0.19rem;
        vertical-align: text-bottom;
        margin-right: 0.02rem;
    }

</style>