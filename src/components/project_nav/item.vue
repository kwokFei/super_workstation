<template>
    <div class="item">
        <span>{{item.title}}</span>
        <div :style="{color:item.color}">{{item.value}}
            <img v-for="i in item.img" :src="i" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "item",
        props:["item"],
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