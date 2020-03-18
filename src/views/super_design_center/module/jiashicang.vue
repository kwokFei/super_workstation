<template>
    <div class="maxBox">
        <img src="../../../assets/img/jsc_img.png" alt="">
        <span class="goBox">
            <router-link class="goXia" target="_blank"  to="/jsc_setting_2"></router-link>
        </span>
    </div>
</template>

<script>
    export default {
        name: "jiashicang"
    }
</script>

<style scoped>
    .maxBox{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
    img{
        width: 100%;
    }
    .goBox{
        display: inline-block;
        position: absolute;
        top: 5.65rem;
        right: 6.5rem;
        width: 1.8rem;
        height: 0.6rem;
    }
    .goXia{
        width: 100%;
        height: 100%;
    }
</style>
