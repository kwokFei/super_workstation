<template>
    <div class="contextBox" id="xxxx" style="position: relative">
        <!-- 左边导航栏-->
        <div class="navLeft">
            <p>
                <img :src="$store.state.logoUrl" alt="">
                <!--<img :src="logoUrl" alt="">-->
            </p>
            <ul>
                <li v-for="(item,index) in $store.state.allCheckedModuleList" :key="index" class="liClick" @click="cutUrl(index)">
                    <span>
                        <img :src="item.icon" alt="">
                    </span>
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="rnBox" style="width:82.5%;height: 100%;position: absolute;top:0;left: 17.5%">
            <iframe :src="mysrc"  frameborder="0"></iframe>
        </div>
    </div>
</template>

<script>
    export default {
        name: "center",
        computed: {
            mysrc: {
                get(){
                    return this.$store.state.indexSrc
                },
                set(val){
                    this.$store.commit('changeIndexSrc',val)
                },
            }
        },
        data(){
            return{
            }
        },
        created(){
            let allCheckedModuleList =JSON.parse(window.localStorage.getItem("allCheckedModuleList"));
            if( !allCheckedModuleList ){
                return
            }
            // console.log(allCheckedModuleList);
            //菜单数组
            this.$store.commit('changeAllCheckedModuleList',allCheckedModuleList)

            //第一次导航页面src
            let indexSrc =JSON.parse(window.localStorage.getItem("indexSrc"));
            this.$store.commit('changeIndexSrc',indexSrc)

            //logo
            let logoUrl =JSON.parse(window.localStorage.getItem("logoUrl"));
            this.$store.commit('changelogoUrl',logoUrl)


            window.localStorage.removeItem('allCheckedModuleList')
            window.localStorage.removeItem('indexSrc')
            window.localStorage.removeItem('logoUrl')
        },
        methods:{
            cutUrl(index) {
                // this.mysrc = this.moduleList[index].iframeUrl;
                this.mysrc = this.$store.state.allCheckedModuleList[index].iframeUrl;
            }
        },
    }
</script>

<style scoped>
    iframe{
        width:100%;;
        height: 100%;
        background: white;
        /*min-width: 1200px;*/

    }
    .rnBox{
        overflow-x: auto !important;
        overflow-y: hidden !important;

    }
    #pagName{
        width: 100%;
        height: 1.34rem;
        text-align: center;
        line-height: 1.34rem;
        font-size: 0.36rem;
        color: #ffffff;
    }

    .contextBox{
        height: 95%;
        margin-left: 0.5rem;
    }

    .centerBox >.contextBox {

        width: 14.09rem;
        height: 7.93rem;
        background: #E1EEF6;
        position: relative;

    }

    .navLeft{
        width: 17.5%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        background-color: white;
    }
    .navLeft::-webkit-scrollbar {
        display: none;
    }
    .navLeft>p{
        width: 100%;
        height: 8%;
        text-align: center;
    }
    .navLeft>p img{
        width: 80%;
        max-height: 100%;
    }

    .navLeft > ul{
        width: 100%;
        height: 92%;
        background: #FFFFFF;
        border-right: 0.01rem solid #E7F1F8;
        overflow-y: auto;
    }

    .navLeft > ul>li{
        width: 100%;
        height: 0.6rem;
        background: #FFFFFF;
        display: flex;
        /*justify-content: center;*/
        align-items: center;
        border-bottom: 0.01rem solid #E1EEF6;
        cursor: pointer;

    }

    .navLeft > ul>li >span:first-child{
        display: flex;
        align-items: center;
    }
    .navLeft > ul>li >span>img{
        width: 0.5rem;
        /*height: 0.19rem;*/
        margin-right: 0.21rem;
    }

    .navLeft > ul>li >span:nth-child(2){
        /*font-size: 0.24rem;*/
        color: #868daa;
    }


    .navLeft > ul>li:hover{
        background: #E1EEF6;
    }


    .rnBox{
        width: 100%;
        height: 100%;
        border: none;
    }
</style>