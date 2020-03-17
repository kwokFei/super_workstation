<template>
    <div class="maxBox">
        <img src="../../assets/img/super_design_center/my_appSystem_img.jpg" alt="">
        <div class="listBox">
            <span>
                <router-link class="minTo" to="/sys_index"></router-link>
            </span>
            <span>
                <router-link class="minTo" to="/sys_index"></router-link>
            </span>
            <span>
                <router-link class="minTo" to="/sys_index"></router-link>
            </span>
            <span>
                <router-link class="minTo" to="/sys_index"></router-link>
            </span>
            <span>
                <router-link class="minTo" to="/sys_index"></router-link>
            </span>
            <span>
                <router-link class="minTo" to="/sys_index"></router-link>
            </span>
            <span>
                <router-link class="minTo" to="/sys_index"></router-link>
            </span>
            <span>
                <router-link class="minTo" to="/sys_index"></router-link>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index"
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
