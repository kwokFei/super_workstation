<template>
    <div class="form2-radio">
        <span>计划完成时间设置：</span>
        <el-date-picker
            v-model="time"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        name: "contentTime",
        data(){
            return{
                time : "",
            }
        }
    }
</script>

<style scoped>

</style>