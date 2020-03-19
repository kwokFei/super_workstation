<template>
    <div class="headerBox">
        <!--系统时间-->
        <div id="systemTime" ref="systemTime"></div>
        <!-- 名称-->
        <div class="headerTitle">工业互联网研究院测试中心</div>
        <!-- 图标-->
        <div>
            <ul class="navIcons">
                <li name="return">
                    <img class="off" src="@/assets/img/nav_1/return.png"
                                     alt=""
                                     @mouseenter="chooseIndex(0)">
                    <img class="on" v-show="index === 0"
                                    src="@/assets/img/nav_1/return1.png"
                                    alt=""
                                    @mouseleave="chooseIndex(null)">
                </li>
                <li name="set">
                    <img class="off" src="@/assets/img/nav_1/set.png" alt=""
                                     @mouseenter="chooseIndex(1)">
                    <img class="on" v-show="index === 1"
                                    src="@/assets/img/nav_1/set1.png" alt=""
                                    @mouseleave="chooseIndex(null)" >
                </li>
                <li name="center">
                    <img class="off" src="@/assets/img/nav_1/center.png" alt=""
                                      @mouseenter="chooseIndex(2)">
                    <img class="on" v-show="index === 2"
                                    src="@/assets/img/nav_1/center1.png" alt=""
                                    @mouseleave="chooseIndex(null)">
                </li>
                <li name="brive">
                    <img class="off" src="@/assets/img/nav_1/brive.png" alt="后台管理"
                                     @mouseenter="chooseIndex(3)">
                    <img class="on" v-show="index === 3"
                                    src="@/assets/img/nav_1/brive1.png" alt="后台管理"
                                    @mouseleave="chooseIndex(null)">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cockpitheader",
        data(){
            return{
                index:null,
                dNow : new Date(),
                sWeek : new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"),
            }
        },
        mounted(){
            setInterval(()=>{
                this.showDate()
            },1000)
        },
        methods:{
            chooseIndex(index){
                this.index = index;
            },
            showDate() {
                var D = new Date();
                var yy = D.getFullYear();
                var mm = D.getMonth() + 1;
                var dd = D.getDate();
                var ww = D.getDay();
                var ss = parseInt(D.getTime() / 1000);
                var h = D.getHours();
                var m = D.getMinutes();
                var s = D.getSeconds();
                var sValue = D.getFullYear(this.dNow) + "年" + (this.dNow.getMonth() + 1) + "月" + this.dNow.getDate() + "日" + " " + this.sWeek[this.dNow.getDay()] + " ";
                //  sValue += GetLunarDay(yy, mm, dd);
                sValue += this.shapetime(h, m, s);

                if(document.getElementById("systemTime")){
                    document.getElementById("systemTime").innerHTML = sValue;
                }
            },
            shapetime(h, m, s) {
                if (s <= 9) s = "0" + s;
                if (m <= 9) m = "0" + m;
                if (h <= 9) h = "0" + h;
                return h + ":" + m + ":" + s
            },
        }
    }
</script>

<style scoped>
    .headerBox {
        width: 19.2rem;
        height: 0.82rem;
        background: url(~@/assets/img/nav_1/top-b.png);
        background-size: contain;
        display: flex;
        justify-content: space-between;
        padding: 0 0.15rem 0 0.3rem;
    }

    .headerBox>div {
        width: 33%;
        height: 100%;
        font-size: 0.16rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .headerBox>div:first-child {
        height: 0.57rem;
        justify-content: flex-start;
    }

    .headerBox>div:nth-child(2) {
        margin-top: 0.1rem;
    }

    .headerBox>div:last-child {
        justify-content: flex-end;
        height: 0.57rem;
    }

    .headerBox>.headerTitle {
        text-align: center;
        font-size: 0.3rem;
    }

    .headerBox>div>ul {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .headerBox>div>ul>li {
        margin-left: 0.3rem;
        position: relative;
    }

    .headerBox>div>ul>li:first-child {
        margin-left: 0.11rem;
    }

    .headerBox>div>ul>li>img {
        width: 0.3rem;
        height: 0.3rem;
        cursor: pointer;
    }

    .headerBox>div>ul>li .on{
        position: absolute;
        top:0;
        left: 0;
    }


</style>