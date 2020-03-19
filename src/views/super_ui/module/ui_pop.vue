<template>
    <el-dialog
            title="新建UI"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            width="30%"
            id="my_app_system_dialog">

        <el-form ref="form" :model="form" label-width="120px"
                 :rules="rules">
            <el-form-item label="项目名称：" prop="projectName">
                <el-input v-model="form.projectName"></el-input>
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


            <el-form-item label="APP应用">
                <el-checkbox-group v-model="form.isApp">
                    <el-checkbox label="IOS"></el-checkbox>
                    <el-checkbox label="Android"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>


            <el-form-item label="APP应用图标" >
                <el-upload
                        class="avatar-uploader"
                        action=""
                        :show-file-list="false"
                        :on-change = "handleChange"
                        :http-request = "handleChoose"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <el-button  v-else type="primary">上传图标</el-button>
                    <!--                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    <div slot="tip" class="el-upload__tip">尺寸:1024*1024px 格式:PNG格,不超过10M</div>
                </el-upload>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleHidden('')">取 消</el-button>
            <el-button @click="dialogVisibleHidden('form')" type="primary">确 定</el-button>
          </span>


    </el-dialog>
</template>

<script>
    export default {
        name: "ui_pop",
        props:['dialogVisible'],
        data() {
            return {
                form: {
                    projectName: '',
                    business: '',
                    companyName: '',
                    projectImg: '',
                    color: "",
                    desc: '',
                    isApp : ["IOS","Android"],
                    appIcon : "",
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
                dialogImageUrl: '',
                imageUrl: '',
            }
        },
        methods: {
            handleChange(file, fileList){
                console.log(file);
                let res = this.beforeAvatarUpload(file.raw)
                if(res) this.imageUrl = URL.createObjectURL(file.raw);
            },
            handleChoose() {
                // console.log(this.fileList);
                // this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 10;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                }
                return isJPG && isLt2M;
            },
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
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }


</style>
