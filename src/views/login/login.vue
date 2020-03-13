<template>
  <div id="login-container">
    <div class="maxBox">
      <p class="title">APCOS 万物互联超级工作站</p>
      <div class="loginBox">
        <img style="position: absolute;top:0.12rem;right: 0.12rem;width: 0.5rem;height: 0.5rem;cursor: pointer" @click="ewmShow" :src="ewmOne" alt="">
        <div class="navBox">
          <router-link class="routerLink" to="/account">账号登陆</router-link>  |  <router-link class="routerLink" to="/tel">手机号登陆</router-link>
        </div>
        <div class="minBox">
          <router-view style="position: absolute;top: 0;left: 0" />
        </div>
        <div class="ewmBox" v-show="isRwm">
          <img style="position: absolute;top:0.12rem;right: 0.12rem;width: 0.5rem;height: 0.5rem;cursor: pointer" @click="goBlock" :src="ewmTwo" alt="">
          <p class="ewmTitle">微信二维码登录</p>
          <img class="ewmImg" src="../../assets/img/login/ewmImg.png" alt="">
          <p class="tipP">请使用微信扫描二维码登录</p>
          <div>
            <span @click="blackTo" style="margin: 0 10px;font-size: 14px"><router-link class="routerLink" to="/account" >账号登陆</router-link></span>|
            <span @click="blackTo" style="margin: 0 10px;font-size: 14px"><router-link class="routerLink" to="/tel">短信登陆</router-link></span>
          </div>
        </div>
      </div>
      <img style="margin-top: 34px" src="../../assets/img/login/logo_bcca.png" alt="">
    </div>
    <!-- 底部说明 -->
    <div class="footerBox">
      <p>重庆金鑫智慧科技有限公司 ©2019-2020版权所有 BETA V1.1.0 TEL:400-000-3877</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "login",
      data(){
          return{
            isRwm:true,
            ewmOne:require('../../assets/img/login/login_icon_ewm01.png'),
            ewmTwo:require('../../assets/img/login/login_icon_ewm02.png'),
          }
      },
      methods:{
        ewmShow(){
          this.isRwm = true;
          this.ewmOne = require('../../assets/img/login/login_icon_ewm02.png');
        },
        blackTo(){
          this.isRwm = false;
          this.ewmOne = require('../../assets/img/login/login_icon_ewm01.png');
        },
        goBlock(){
          this.isRwm = false;
          this.ewmOne = require('../../assets/img/login/login_icon_ewm01.png');
        }
      }
    }
</script>

<style scoped>
  #login-container{
    width: 100%;
    height: 100%;
    background: url("../../assets/img/login/loginBj.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
  .maxBox{
    position: absolute;
    top: 2rem;
    right: 3.4rem;
    padding: 0.1rem;
  }
  .maxBox .title{
    font-size:0.41rem;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .loginBox{
    width: 3.6rem;
    height: 3.8rem;
    margin-top: 0.6rem;
    margin-left: 0.8rem;
    background-color: #ffffff;
    padding: 0.1rem;
    position: relative;
  }
  .footerBox{
    width: 100%;
    position: absolute;
    bottom: 0.34rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.12rem;
  }
  .navBox{
    margin-top: 0.12rem;
    padding-left: 0.1rem;
    box-sizing: border-box;
    text-align: left;
    width: 85%;
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .routerLink{
    display: inline-block;
    font-size:0.14rem;
    font-family:Microsoft YaHei;
    font-weight:400;
    line-height:0.49rem;
  }
  .navBox a.router-link-exact-active {
     color: #3D8CFB;
  }
  .minBox{
    width: 100%;
    height: 2.9rem;
    margin-top: 0.16rem;
    position: relative;
  }
  /* 二维码*!*/
  .ewmBox{
    position: absolute;
    padding: 0.1rem;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
  }
  .ewmTitle{
    font-size:0.14rem;
    width: 100%;
    text-align: left;
    margin-top: 0.1rem;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:0.49rem;
  }
  .ewmImg{
    width: 1.7rem;
    height: 1.7rem;
    margin-top: 0.3rem;
    text-align: center;
  }
  .tipP{
    width: 100%;
    text-align: center;
    font-size:0.14rem;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(102,102,102,1);
    margin-top: 0.24rem;
    line-height:0.24rem;
  }
</style>