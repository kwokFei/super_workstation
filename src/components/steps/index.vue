<template>
    <div class="container-steps">
        <el-steps :active="2" align-center>
            <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
            <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
            <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
            <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    .container-steps{
        width: 12rem;
        height: 6.2rem;
        background-color: #ffffff;
        border-radius: 0.08rem;
        border: solid 0.01rem #ebebeb;
        display: flex;
        align-items: center;
        justify-items: center;
    }

</style>