<template>
    <div id="design-container">
        <!--导航部分-->
        <design-nav></design-nav>
        <!--主体部分-->
        <el-row :gutter="24" class="main">
            <el-col :span="5"
                    :xs ="12"
                    class="left_container">
                <design-left></design-left>

            </el-col>
            <el-col :span="15"
                    :xs ="24"
                    style="background:blue">我是中间</el-col>
            <el-col :span="4" :xs ="24">
                <design-right></design-right>
            </el-col>
        </el-row>
        <ul>
            <li>传感类</li>
            <li>控制类</li>
            <li>应用类</li>
            <li>其他</li>
            <li>我的库</li>
        </ul>
    </div>
</template>

<script>
    import designNav from './module/nav'
    import designLeft from  './module/left'
    import designRight from  './module/right'

    export default {
        name: "Design_center",
        components:{
            designNav,
            designLeft,
            designRight
        },
    };
</script>

<style scoped>
    .main{
        height: calc(100vh - 0.48rem);
        margin: 0 !important;
    }
    .main>div{
        box-shadow: 5px -1px 5px #888888;
        padding: 0.03rem 0 0 !important;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    #design-container > ul{
        position: absolute;
        left: 20.9%;
        top: 1.9rem;
    }
    #design-container > ul > li{
        background: #ffffff;
        width: 0.28rem;
        border-radius: 5px;
        border: 1px solid #409EFF;
        cursor: pointer;
    }

</style>