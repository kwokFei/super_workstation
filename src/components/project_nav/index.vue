<template>
    <div class="container-nav">
       <item v-for="(item,index) in itemOption"
             :key="index"
             :item="item"
             @handleGotoDetail="handleGotoDetail">
           {{item}}
       </item>
    </div>
</template>

<script>
    import item from './item'
    export default {
        name: "index",
        props:["itemOption"],
        components:{
            item
        },
        methods:{
            handleGotoDetail(){
                this.$emit("handletoDelay")
            }
        },
    }
</script>

<style scoped>
    .container-nav{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 12rem;
        height: 1.08rem;
        background-color: #ffffff;
        border-radius: 0.08rem;
        border: solid 0.01rem #ebebeb;
        margin: 0.43rem 0 0.1rem 0;
    }


</style>