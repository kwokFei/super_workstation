<template>
    <div class="breadcrumb">
        <p></p>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
                :to="{ path: item.link }"
                v-for="item in breadcrumb">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>

    </div>

</template>

<script>
    export default {
        name: "Breadcrumb",
        props:["breadcrumb"]
    }
</script>

<style scoped>
    .breadcrumb{
        display: flex;
        align-items: center;
    }

    p{
        height: 0.28rem;
        line-height: 0.28rem;
        border-left: 0.04rem solid #0068ff;
        padding-left: 0.15rem;
    }

</style>