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
            <div class="headerBox" v-for="(item,index) in proListData" :key="index">
                <span>{{index + 1}}</span>
                <span>{{item.proName}}</span>
                <span>{{item.proHead}}</span>
                <span :class="addColor">{{item.proStat}}</span>
                <span>{{item.createPeople}}</span>
                <span>{{item.createTime}}</span>
                <span>
                    <span>-</span>
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
                proName:'中意智慧家居',
                proHead:'邹达海',
                proStat:'已立项',
                createPeople:'易仁军',
                createTime:'2019-09-02 15:20:17',
              },
              {
                proName:'北碚智慧市政',
                proHead:'邹达海',
                proStat:'待立项',
                createPeople:'黄杰',
                createTime:'2019-09-02 15:20:17',
              },
              {
                proName:'汶山养老',
                proHead:'罗乐',
                proStat:'审核中',
                createPeople:'黄杰',
                createTime:'2019-09-02 15:20:17',
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
        border: 1px solid red;
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

</style>
