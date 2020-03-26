<template>
    <div class="container-form2">
        <div class="title">
            <img src="@/assets/img/project_center/all/operation.png" alt="">
            <span class="form-text">{{form2Titlle}}</span>
        </div>
        <div class="form2-radio">
            <el-radio v-model="radio" label="1">同意</el-radio>
            <el-radio v-model="radio" label="2">拒绝</el-radio>
        </div>
        <div class="form2-radio">
            <span>计划完成时间设置：</span>
            <el-date-picker
                v-model="time"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </div>
        <div class="form2-radio">
            <el-button type="primary">保存</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "form2",
        props:["form2Titlle"],
        data () {
            return {
                radio: '1',
                time : "",
            };
        }
    }
</script>

<style scoped>
    .container-form2{
        text-align: left;
    }
    .title{
        display: flex;
        align-items: center;
    }
    .title>img{
        width: 0.22rem;
        height: 0.24rem;
        margin-right: 0.08rem;
    }
    .form-text{
        font-size: 0.18rem;
        color: #1272fd;
    }

    .form2-radio{
        margin-left: 0.31rem;
        margin-top: 0.24rem;
    }

</style>