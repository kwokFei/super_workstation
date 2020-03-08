<template>
    <div id="nav-right-nav">
        <slot name="header">
            <slot></slot>
        </slot>
        <div class="nav-right">
            <span>
                <img src="" alt="">
            </span>
            <span>
                <img src="" alt="">
            </span>
            <span>
                <img src="" alt="">
            </span>
            <span>BeoneAPCOS</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "public_nav",
        methods:{
        }
    }
</script>

<style scoped>
    a{
        margin: 0.3rem;
    }
    #nav-right-nav{
        width: 100%;
        height: 0.8rem;
        display: flex;
        background-color: #ffffff;
        box-shadow: 0.004rem 0.03rem 0.074rem 0.006rem
        rgba(0, 0, 0, 0.08);
    }
    #nav-right-nav>div:first-child{
        width: 10.3rem;
        padding-left: 3.04rem;
        /*padding-right: 5.22rem;*/
        display: flex;
        align-items: center;
    }
    #nav-right-nav>div:first-child> .header-item > a:hover{
        color: #0068ff;
    }
    #nav-right-nav>div:first-child > .header-item{
        display: block;
        /*flex: 1;*/
        cursor: pointer;
    }
    #nav-right-nav>div:first-child >.header-item:first-child{
        width: 1.11rem;
        height: 0.34rem;
        border: 1px solid red;
    }
    .nav-right{
        display: flex;
        justify-content:center;
        align-items: center;
        width:8.9rem;
    }
    .nav-right > span{
        display: block;
        width: 0.73rem;
        height: 0.35rem;
        border: 1px solid red;
        line-height: 0.35rem;
        text-align: center;
        cursor: pointer;
    }
    .nav-right > span:nth-child(2){
        border-left: 0.01rem solid #e6e6e6;
        border-right: 0.01rem solid #e6e6e6;
    }

</style>