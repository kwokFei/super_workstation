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
        <component :is="showComponent"></component>
        <div class="form2-radio">
            <el-button type="primary">保存</el-button>
        </div>
    </div>
</template>

<script>
    import contentTime from './contentTime'
    import contentBody from './contentBody'
    import contentProject from './contentProject'
    export default {
        name: "form2",
        props:["form2Titlle"],
        data () {
            return {
                radio: '1',
                showComponent: null,
            };
        },
        watch:{
            form2Titlle(){
                this.showWhat()
            }
        },
        created(){
            this.showWhat()
        },
        methods:{
            showWhat(){
                if(this.form2Titlle === "延期操作"){
                    this.showComponent = "contentTime"
                }else if(this.form2Titlle === "变更操作"){
                    this.showComponent = "contentBody"
                }else if(this.form2Titlle === "操作"){
                    this.showComponent = "contentProject"
                }
            },
        },
        components:{
            contentTime,
            contentBody,
            contentProject
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