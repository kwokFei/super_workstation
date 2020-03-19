<template>
    <div class="maxBox">
        <div class="btns">
            <span>
                语言:
                    <el-select v-model="value1" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
            </span>
            <span style="margin:0 0.3rem">
                编辑器:
                    <el-select v-model="value2" placeholder="请选择">
                        <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
            </span>
            <el-button type="primary">运行</el-button>
        </div>
        <div class="contentBox">
            <textarea style="width: 40%;height: 100%"></textarea>
            <div style="width: 58%;height: 100%;background-color: white"></div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        value1:'',
        value2:'',
        options: [
          {
          value: 'C语言',
          label: 'C语言'
        }, {
          value: 'C++',
          label: 'C++'
        }, {
          value: 'Java',
          label: 'Java'
        }, {
          value: 'javaScript',
          label: 'javaScript'
        }, {
          value: 'python',
          label: 'python'
        }],
        options1: [
          {
            value: 'gcc',
            label: 'gcc'
          }
        ],
      }
    }
  }
</script>

<style scoped>
    .maxBox{
        width: 100%;
        height: 100%;
        background: #cccccc;
    }
    .btns{
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: left;
        align-items: center;
        padding: 0 0.2rem;
        background-color: white;
        border-bottom: 1px solid #999999;
    }
    .contentBox{
        margin-top: 0.2rem;
        width: 100%;
        height: calc(100% - 0.8rem);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
