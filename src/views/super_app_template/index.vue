<template>
    <div class="maxBox">

        <img src="../../assets/img/super_design_center/my_appTemplate_img.jpg" alt="">
        <div class="listBox">
            <span v-for="item in 8" @click="goTo1110" :key="item">
                <span class="minTo"></span>
            </span>

        </div>
    </div>
</template>

<script>
    import {goTo1110} from '@/utils/public_fun'
    export default {
        name: "index",
        methods:{
            goTo1110(){
                goTo1110()
            },
        }
    }
</script>

<style scoped>
    img{
        width: 100%;
    }
    .maxBox{
        width: 100%;
        position: relative;
    }
    .listBox{
        position: absolute;
        top: 2.1rem;
        left: 3.55rem;
        width: 12.1rem;
        height: 4.4rem;
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
    }
    .listBox span{
        width: 25%;
        height: 2.2rem;
    }
    .minTo{
        width: 100%;
        height: 100%;
    }
</style>
