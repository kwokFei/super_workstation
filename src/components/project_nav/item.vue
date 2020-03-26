<template>
    <div class="item">
        <span>{{item.title}}</span>
        <div :style="{color:item.color}">{{item.value}}
            <span v-if="item.otherremark"
                  style="font-size: 0.3rem;"
                  :style="{color:item.otherremark.color}">
                ({{item.otherremark.value}})
            </span>
            <img v-for="(i,index) in item.img"
                 :key="index"
                 :src="i" alt=""
                 @click="handleGotoDelay(index)">
        </div>
    </div>
</template>

<script>
    export default {
        name: "item",
        props:["item"],
        methods:{
            handleGotoDelay(index){
                if(index === 0){
                    this.$emit("handleGotoDetail")
                }
            }
        },
    }
</script>

<style scoped>

    .item{
        height: 100%;
        text-align: left;
        padding-top: 0.19rem;
    }
    .item > div{
        font-size: 0.3rem;
        color: #0068ff;
        margin-top: 0.13rem;
    }
    .item > span{
        color: #666666;
    }
    img{
        width: 0.19rem;
        cursor: pointer;
    }

</style>