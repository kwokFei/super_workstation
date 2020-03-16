<template>
    <el-dialog
            title="新建应用"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            width="30%">

        <el-form ref="form" :model="form" label-width="120px"
                 :rules="rules">
            <el-form-item label="项目名称：" prop="projectName">
                <el-input v-model="form.projectName"></el-input>
            </el-form-item>
            <el-form-item label="行业大类：" prop="business">
                <business-cascader @handleChangeBusiness = handleChangeBusiness></business-cascader>
            </el-form-item>


            <el-form-item label="公司名称：" prop="companyName">
                <el-input v-model="form.companyName"></el-input>
            </el-form-item>

            <el-form-item label="项目图片：">
                <span>
                    <el-button size="small" type="primary"  class="uplode_btn" @click="dialogVisible = true">
                        <input type="text" v-model="form.projectImg">
                        <input type="file" id="project-img" name="upload" @change="getfileName">
                        图片上传
                    </el-button>
                </span>
            </el-form-item>

            <el-form-item label="主色调：">
                <div class="block main-color">
                    <el-input v-model="form.color"></el-input>
                    <el-color-picker v-model="form.color"></el-color-picker>
                </div>
            </el-form-item>


            <el-form-item label="项目描述" prop="name">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>


            <el-form-item label="APP应用" prop="name">
                <el-radio v-model="form.isApp" label="1">是</el-radio>
                <el-radio v-model="form.isApp" label="2">否</el-radio>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleHidden('')">取 消</el-button>
            <el-button @click="dialogVisibleHidden('form')" type="primary">确 定</el-button>
          </span>
    </el-dialog>
</template>

<script>
    import businessCascader from '@/components/cascader/Cascader'
    export default {
        name: "mark_pop",
        props:['dialogVisible'],
        components:{
            businessCascader,
        },
        data() {
            return {
                form: {
                    projectName: '',
                    business: '',
                    companyName: '',
                    projectImg: '',
                    color: "",
                    desc: '',
                    isApp : "1"
                },
                rules: {
                    projectName: [
                        { required: true, message: '请输入内容', trigger: 'blur' },
                        { min: 3, message: '长度不少于3', trigger: 'blur' }
                    ],
                    companyName: [
                        { required: true, message: '请输入内容', trigger: 'blur' },
                        { min: 3, message: '长度不少于3', trigger: 'blur' }
                    ],
                    business: [
                        { required: true, message: '请选择行业', trigger: 'change' }
                    ],

                },

            }
        },
        methods: {
           dialogVisibleHidden(form){
               //确定
               if(form){
                   this.$refs[form].validate((valid) => {
                       if (valid) {
                           this.$emit('handleDialogVisible',this.form)
                       } else {
                           return false
                       }
                   });
               }
               //取消
               else {
                   this.$emit('handleDialogVisible',"")
               }

               // this.$emit('handleDialogVisible',this.form)
           },
            //获取文件名称
            getfileName(){
                let f = document.getElementById('project-img').files[0];
                let src = window.URL.createObjectURL(f);
                this.form.projectImg = src
            },
            handleClose(){
               this.dialogVisibleHidden('')
            },
            //选择行业
            handleChangeBusiness(value){
               this.form.business = value
            }

        }
    }
</script>

<style scoped>
    #project-img{
        filter: alpha(opacity = 0);
        position: absolute;
        top:0;left: 0;
        width: 100%;
        height: 100%;
        opacity: 0
    }
    .main-color{
        display: flex;
    }
    .business{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .uplode_btn{
        width: 100%;
    }
</style>