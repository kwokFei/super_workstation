<template>
    <div class="form2-radio">
        <span>理由说明：</span>
        <el-cascader :options="options" :show-all-levels="false"></el-cascader>
    </div>
</template>

<script>
    export default {
        name: "contentBody",
        data(){
            return{
                time : "",
                options:[
                    {
                        value: 'zhinan',
                        label: '项目部',
                        children: [
                            {
                                value: 'shejiyuanze',
                                label: '罗乐',
                            },
                           {
                                value: 'yizhi',
                                label: '张千思'
                            }]
                        },
                    {
                        value: 'data',
                        label: '财务部',
                    },
                    {
                        value: 'ziyuan',
                        label: '资源',
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .form2-radio{
        display: flex;
        align-items: center;
    }
    .el-cascader{
        width: 20%;
    }

</style>