<template>
    <div class="container">
        <!--系统名称-->
        <div class="container-title">
            <p>{{checkedname}}</p>
        </div>
        <div class="container-content">
            <el-row :gutter="20" class="conten-title">
                <el-col :xs="12">
                    <div>
                        <el-button type="primary">新建应用</el-button>
                    </div>
                </el-col>
                <el-col :xs="12">
                    <div>
                        <span>
                            <span>排列方式:</span>
                            <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">字母
                            </el-option>
                          </el-select>
                        </span>
                        <span></span>
                        <span><el-button type="info" plain>全选</el-button></span>
                        <span><el-button type="info" plain>删除</el-button></span>
                        <span>
                        <el-input
                                placeholder="请输入内容"
                                prefix-icon="el-icon-search"
                        >
                        </el-input>
                    </span>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :xs="8"
                        :span="6"
                        v-for="(item,index) in 20"
                        >
                    <div class="grid-content bg-purple"
                         @mouseenter="handleMarkShow(index)"
                         @mouseleave="handleMarkShow('')">
                        <main-item>
                            <div class="mark" v-show="markShow===index">
                                <div class="btns">
                                    <el-button type="primary" size="mini">编辑</el-button>
                                    <el-button type="primary" plain size="mini">预览</el-button>
                                </div>
                                <div>
                                    <el-button icon="el-icon-arrow-down"
                                               size="mini"
                                                @click="handleDotUl(index)"></el-button>
                                    <ul v-show="dotUl === index">
                                        <li>分享</li>
                                        <li>复制</li>
                                        <li>删除</li>
                                    </ul>
                                </div>
                            </div>
                        </main-item>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import mainItem from './main-item'
    export default {
        name: "container_main",
        components:{
            mainItem
        },
        props:["checkedname"],
        data(){
            return{
                dotUl : "",//分享负责列表展示
                markShow : "", //蒙版是否显示
                options: [{
                    value: '选项1',
                    label: '字母'
                }],
                value: '选项1'
            }
        },
        methods:{
            //显示蒙版
            handleMarkShow(index){
                if(index === ""){
                    this.dotUl = null
                }
                this.markShow= index;
            },
            //显示分享菜单
            handleDotUl(index){
                if(index === this.dotUl){
                    this.dotUl = null
                }else {
                    this.dotUl = index
                }

            },
        }
    }
</script>

<style scoped>
    .container{
        height: calc(100vh - 0.8rem);
        background: #F0F0F8;
        padding: 0 3.1rem;
    }
    .container-title{
        height: 0.88rem;
        display: flex;
        align-items: center;
    }
    .container-title>p{
        height: 0.28rem;
        border-left: 0.04rem solid #0068ff;
        margin-left: 0.1rem;
        padding-left: 0.15rem;
    }
    .container-content{
        width: 13rem;
        height: 80%;
        background-color: #ffffff;
        border-radius: 0.08rem;
        margin: 0 auto;
        overflow: hidden;
        padding: 0.19rem 0.46rem;
    }
    .conten-title{
        display: flex;
        justify-content: space-between;
    }
    .conten-title>.el-col:first-child{
        text-align: left;
    }
    .conten-title>.el-col:nth-child(2)>div>span:first-child{
        display: flex;
        align-items: center;
    }
    .conten-title>.el-col:nth-child(2)>div>span:first-child>span:first-child{
        display: inline-block;
        min-width: 59px;
    }
    .conten-title>div:nth-child(2)>div{
        display: flex;
        align-items: center;
    }

    .conten-title>div:nth-child(2)>span{
        margin: 0 0.02rem;
    }
    .grid-content {
        margin-top: 0.3rem;
        width: 2.8rem;
        /*height: 2rem;*/
        background-color: #ffffff;
        box-shadow: 0.024rem 0.168rem 0.261rem 0.029rem
        rgba(182, 180, 195, 0.55);
        border-radius: 0.12rem;
    }
    .container-content>.el-row:nth-child(2){
        height: 88%;
        overflow-y: auto;
        padding-bottom: 10px;

    }

</style>