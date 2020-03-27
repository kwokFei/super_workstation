<template>
    <div class="form2-radio">
        <span>理由说明：</span>
        <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
    </div>
</template>

<script>
    export default {
        name: "contentProject",
        data(){
            return{
                textarea: ''
            }
        }
    }
</script>

<style scoped>
    .form2-radio{
        display: flex;
        align-items: center;
    }
    .el-textarea{
        width: 50%;
    }
</style>