<template>
    <div class="maxBox">
        <div class="btns">
            <el-select v-model="value" placeholder="请选择" style="width: 1.2rem">
                <el-option
                        v-for="item in proStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-input
                    style="width: 1.5rem;margin: 0 0.1rem"
                    placeholder="请输入项目名称"
                    suffix-icon="el-icon-search"
                    v-model="searchInput">
            </el-input>
            <el-button type="primary">查询</el-button>
            <el-button type="primary" plain>重置</el-button>
        </div>
        <div class="proListBox">
            <div class="headerBox">
                <span>序号</span>
                <span>项目名称</span>
                <span>项目负责人</span>
                <span>项目状态</span>
                <span>创建人</span>
                <span>创建时间</span>
                <span>操作</span>
            </div>
            <div class="headerBox">
                <span>1</span>
                <span>中意智慧家居</span>
                <span>邹达海</span>
                <span style="color: #2ea47c">已立项</span>
                <span>易仁军</span>
                <span>2019-09-02 15:20:17</span>
                <span>
                    <span>-</span>
                </span>
            </div>
            <div class="headerBox" style="background-color: rgba(207,288,255,0.3)">
                <span>2</span>
                <span>北碚智慧市政</span>
                <span>邹达海</span>
                <span style="color: #f35858">待立项</span>
                <span>黄杰</span>
                <span>2019-09-02 15:20:17</span>
                <span class="czBox">
                    <button style="background-color: #f35858">删除</button>
                    <button style="background-color: #3d7aae">编辑</button>
                    <button style="background-color: #1272fd">申请立项</button>
                </span>
            </div>
            <div class="headerBox">
                <span>3</span>
                <span>汶山养老</span>
                <span>罗乐</span>
                <span style="color: #1272fd">审核中</span>
                <span>黄杰</span>
                <span>2019-09-02 15:20:17</span>
                <span class="czBox">
                    <button style="background-color: #f35858">删除</button>
                    <button style="background-color: #3d7aae">编辑</button>
                    <button style="background-color: #1272fd">申请立项</button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "project_create_project",
        data(){
          return{
            value:'',
            searchInput:"",
            proStatus:[
              {
                value: "已立项",
                label:'已立项'
              },
              {
                value: "待立项",
                label:'待立项'
              },
              {
                value: "审核中",
                label:'审核中'
              }
            ],
            proListData:[
              {
                proName:'',
                proHead:'',
                proStat:'',
                createPeople:'',
                createTime:'',
              }
            ]
          }
      },
        methods:{
          isStatus(proStat){
            console.log("------"+proStat);
          }
        }
    }
</script>

<style scoped>
    .maxBox{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: white;
        border-radius: 0.08rem;
        padding: 0 0.2rem;
    }
    .btns{
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: left;
        align-items: center;
    }
    .proListBox{
        width: 100%;
        margin-top: 0.15rem;
    }
    .proListBox .headerBox{
        text-align: left;
        width: 100%;
        height: 0.48rem;
        line-height: 0.48rem;
    }
    .proListBox .headerBox:nth-child(1){
        background-color: #d0e3ff !important;
    }
    .proListBox .headerBox:nth-child(n+1){
        background-color: white;
    }
    .headerBox span{
        display: inline-block;
        font-family: MicrosoftYaHei;
        font-size: 0.18rem;
        /*min-height: 0.48rem;*/
        letter-spacing: 0.009rem;
        color: #666666;
        white-space: nowrap;
        text-align: center;
    }
    .headerBox span:nth-child(1){
        width: 0.5rem;
    }
    .headerBox span:nth-child(2){
        width: 1.28rem;
    }
    .headerBox span:nth-child(3){
        width: 1rem;
    }
    .headerBox span:nth-child(4){
        width: 0.8rem;
    }
    .headerBox span:nth-child(5){
        width: 0.8rem;
    }
    .headerBox span:nth-child(6){
        width: 2rem;
    }
    .headerBox span:nth-child(7){
        width: 2rem;
    }
    .czBox{
        display: inline-block;
    }
    .czBox button{
        padding: 0.06rem 0.08rem;
        font-size: 0.14rem;
        margin: 0 0.04rem;
        border-radius: 0.04rem;
        border: none;
        outline: none;
        color: white;
        cursor: pointer;
    }

</style>
