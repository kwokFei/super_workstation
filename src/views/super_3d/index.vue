<template>
    <div class="maxBox">
        <img src="../../assets/img/super_design_center/my_3d_img.png" alt="">
        <div class="listBox">
            <span v-for="item in 8"
                  :key="item"
                  @click="goTo3D">
                <span class="minTo" to="/threeD_index"></span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        methods:{
            goTo3D(){
                window.open(
                    "http://113.204.9.70:9080/3dwebgl/otheAPI/openDesign1?user_token=20164d0dc1fc4591a6d4c38b4a47312a1584518011269",
                    "_blank"
                )
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
