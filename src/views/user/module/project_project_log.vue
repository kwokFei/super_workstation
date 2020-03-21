<template>
    <div class="maxBox">
        <p class="titleBox">
            <img src="../../../assets/img/project_center/logImg.png" alt="">
            <span>项目日志</span>
        </p>
        <div class="addLog">
            <p>
                <span>选择项目:</span>
                <el-select v-model="value" placeholder="请选择" style="margin-left: 0.1rem">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <span style="margin-left: 0.1rem">选择节点:</span>
                <el-select v-model="value1" placeholder="请选择" style="margin-left: 0.1rem">
                    <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <p>
                <span>日志内容:</span>
                <el-input type="textarea" v-model="textarea" style="margin-left: 0.1rem;width: 7rem;"></el-input>
            </p>
            <p>
                <span>任务进度:</span>
                <el-progress :percentage="50" style="width: 3rem"></el-progress>
            </p>
            <p>
                <span>备注:</span>
                <el-input type="textarea" v-model="textarea1" style="margin-left: 0.1rem;width: 7rem;"></el-input>
            </p>
            <p>
                <span>文件上传:</span>
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </p>
            <p style="padding-left: 1rem;margin-top: 0.5rem">
                <el-button type="primary" style="width: 1.6rem;height: 0.4rem">确定</el-button>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "project_project_log",
        data(){
          return{
            value:'',
            value1:'',
            textarea:'',
            textarea1:'',
            options:[
              {
                value:'我参与的项目1',
                label:'我参与的项目1'
              },
              {
                value:'我参与的项目2',
                label:'我参与的项目2'
              },
              {
                value:'我参与的项目3',
                label:'我参与的项目3'
              },
              {
                value:'我参与的项目4',
                label:'我参与的项目4'
              }
            ],
            options1:[
              {
                value:'我参与的节点1',
                label:'我参与的节点1'
              },
              {
                value:'我参与的节点2',
                label:'我参与的节点2'
              },
              {
                value:'我参与的节点3',
                label:'我参与的节点3'
              },
              {
                value:'我参与的节点4',
                label:'我参与的节点4'
              }
            ]
          }
        }
    }
</script>

<style scoped>
    .maxBox{
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 0.08rem;
        overflow: hidden;
    }
    .titleBox{
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        display: flex;
        justify-content: left;
        align-items: center;
        padding-left: 0.1rem;
    }
    .titleBox > img{
        width: 0.22rem;
        height: 0.24rem;
        margin-right: 0.1rem;
    }
    .titleBox > span{
        font-family: MicrosoftYaHei;
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        line-height: 48px;
        letter-spacing: 0px;
        color: #1272fd;
    }
    .addLog{
        width: 100%;
        height: 6.2rem;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .addLog::-webkit-scrollbar {
        display: none;
    }
    .addLog p{
        width: 100%;
        display: flex;
        justify-content: left;
        align-items: center;
        margin: 0.2rem 0;
        padding-left: 0.2rem;
    }
    .addLog p > span{
        /*display: inline-block;*/
        width: 0.8rem;
        text-align: justify;
        font-family: MicrosoftYaHei;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0.004rem;
        color: #666666;
        text-align-last: justify;
    }
</style>
