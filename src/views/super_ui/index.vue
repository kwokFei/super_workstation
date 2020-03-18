<template>
    <div class="maxBox">
        <img src="../../assets/img/super_design_center/my_ui_img.jpg" alt="">
        <div class="listBox">
            <span v-for="item in 3"
                  :key="item"
                  @click="goToUI">
                <span class="minTo" ></span>
            </span>

        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        methods:{
            goToUI(){
                window.open(
                    "http://developer.apcoscheck.com:20001/device/UIEditor?productCode=00028801&account=13609036889",
                    "_blank"
                )
            }
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
