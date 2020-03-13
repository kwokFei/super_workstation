<template>
    <div class="maxBox">
        <div class="inputBox">
            <input class="userName" v-model.trim="userName" type="text" placeholder="用户名/账号" @blur="userBlur">
            <img class="userIcon" :src="userIcon" alt="">
            <span></span>
        </div>
        <div class="inputBox">
            <input class="password" v-model.trim="password"type="password" placeholder="密码" @blur="pwdBlur">
            <img :src="pwdIcon" alt="">
            <span></span>
        </div>
        <button class="dlBtn" :style="dlClass" :disabled="disabled" @click="dlFun">登陆</button>
        <p>
            <span>忘记密码？</span>
        </p>
    </div>
</template>

<script>
    export default {
        name: "account",
        data(){
            return{
                dlClass:'dlActive',
                disabled:'true',
                userName:'',
                password:'',
                userIcon:require('../../../assets/img/login/login_icon_user_nor.png'),
                pwdIcon:require('../../../assets/img/login/login_icon_mm_nor.png'),
            }
        },
        methods:{
            userBlur(){
                if(this.userName != ''){
                    this.userIcon = require('../../../assets/img/login/login_icon_user_sel.png')
                }else {
                    this.userIcon = require('../../../assets/img/login/login_icon_user_nor.png')
                }
            },
            pwdBlur(){
                if(this.password != ''){
                    this.pwdIcon = require('../../../assets/img/login/login_icon_mm_sel.png')
                }else {
                    this.pwdIcon = require('../../../assets/img/login/login_icon_mm_nor.png')
                }
                if(this.userName != '' && this.password != ''){
                    this.disabled=false;
                    this.dlClass = {
                        opacity:0.8
                    };
                }else {
                    this.disabled=true;
                    this.dlClass = {
                        opacity:0.3
                    };
                }
            },
            dlFun(){
                console.log(this.userName+this.password);
            }
        }
    }
</script>

<style scoped>
    .maxBox{
        position: absolute;
        width:100%;
        height: 100%;
        text-align: center;
    }
    .maxBox .inputBox{
        width:3rem;
        height:0.48rem;
        position: relative;
        margin: 0.12rem 0;
    }
    .maxBox .inputBox >img{
        position: absolute;
        top: 0.17rem;
        left: 0.1rem;
        display: inline-block;
        width: 0.14rem;
        height: 0.16rem;
    }
    .maxBox .inputBox> span{
        position: absolute;
        top: 0.14rem;
        left: 0.4rem;
        width: 1px;
        height: 0.2rem;
        border: 1px solid #DEDEDE;
    }
    .maxBox input{
        width:3rem;
        height:0.48rem;
        background:rgba(247,247,247,1);
        border-radius:4px;
        border: none;
        outline: none;
        padding-left: 0.5rem;
    }
    .maxBox input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: #B1B1B1;
    }
    .maxBox .dlBtn{
        margin-top: 0.12rem;
        width:3rem;
        height:0.48rem;
        background:rgba(0,104,250,1);
        opacity:0.3;
        border-radius:0.06rem;
        font-size:0.16rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(254,254,254,1);
        line-height:0.49rem;
        border: none;
        outline: none;
        cursor: pointer;
    }
    .maxBox p {
        width: 100%;
        text-align: right;
    }
    .maxBox p span{
        font-size:0.12rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.49rem;
        cursor: pointer;
    }
</style>