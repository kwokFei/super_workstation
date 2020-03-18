<template>
    <div class="maxBox">
        <div class="navBox">
            <span class="leftBox">
                <i></i>
                <span>运维{{name}}</span>
            </span>
            <span class="bnts">
                <span :class="{isClass :num1}" @click="isStyle1">
                    <router-link to="/opGk">运维概况</router-link>
                </span>
                <span :class="{isClass :num2}" @click="isStyle2">
                    <router-link to="/opList">运维列表</router-link>
                </span>
            </span>
        </div>
        <div class="contentBox">
            <router-view />
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                name:'概况',
                num1:true,
                num2:false
            }
        },
        methods:{
            isStyle1(){
                this.name = "概况";
                this.num1 = true;
                this.num2 = false
            },
            isStyle2(){
                this.name = "列表";
                this.num1 = false;
                this.num2 = true
            }
        }
    }
</script>

<style scoped>
    .maxBox{
        text-align: left;
        width: 100%;
        height: 100%;
        background-color: #F0F2F5;
        padding: 0.4rem 3.6rem 0 3.6rem;
    }
    .navBox{
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .leftBox {
        display: flex;
        align-items: center;
    }
    .leftBox i{
        display: inline-block;
        width: 0.04rem;
        height: 0.28rem;
        background-color: #0f69c7;
    }
    .leftBox span{
        margin-left: 0.1rem;
        font-family: MicrosoftYaHei;
        font-size: 0.18rem;
        color: #1272fd;
    }
    .bnts{
        display:flex;
        width: 1.76rem;
        height: 0.32rem;
        background-color: #ffffff;
        border-radius: 0.04rem;
        border: solid 0.01rem #1272fd;
        overflow: hidden;
    }
    .bnts span{
        display: inline-block;
        width: 0.88rem;
        height: 100%;
        line-height: 0.32rem;
        text-align: center;
        border-radius: 0.04rem;
        font-family: MicrosoftYaHei;
        font-size: 0.18rem;
        color: #1272fd !important;
        cursor: pointer;
    }
    a{
        color: #1272fd;
    }
    .isClass> a,.isClass{
        background-color: #1272fd;
        color: white !important;
        border: solid 0.01rem #1272fd;
    }

    .contentBox{
        width: 100%;
        height: auto;
        margin-top: 0.2rem;
    }
</style>
