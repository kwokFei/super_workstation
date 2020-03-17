<template>
    <div class="maxBox">
        <img src="../../assets/img/ybk/ybkNav.png" alt="">
        <div class="navBox">
            <span>
                <router-link to="/ml_home" style="width: 100%;height: 100%;"></router-link>
            </span>
            <span>
                <router-link to="/people_ku" style="width: 100%;height: 100%;"></router-link>
            </span>
            <span>
                <router-link to="/my_zm" style="width: 100%;height: 100%;"></router-link>
            </span>
            <span>
                <router-link to="/my_yp" style="width: 100%;height: 100%;"></router-link>
            </span>
            <span>
                <router-link to="/dzht" style="width: 100%;height: 100%;"></router-link>
            </span>
        </div>
        <div class="contentBox">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    .maxBox{
        width: 100%;
        position: relative;
    }
    .maxBox img{
        width:100%;
    }
    .contentBox{
        width: 100%;
    }
    .navBox{
        position: absolute;
        top: 0.3rem;
        left: 6.1rem;
    }
    .navBox span{
        display: inline-block;
        width: 1rem;
        height: 0.6rem;
    }
</style>
