<template>
    <div class="container-steps">
        <div class="cx-time-main" id="cxTime"></div>
    </div>
</template>

<script>
    import '@/utils/timeAxis_new'
    import $ from 'jquery'

    export default {
        name: "index",
        props:["timeList"],
        mounted() {
            var oTimeAxiosFun = null;
            var timeList = this.timeList
            var param = {
                data: timeList,
                id: 'cxTime',
                width: '150px',
                index: 0,
                then: (index) => {
                   this.toRoll(index)
                }
            }
            oTimeAxiosFun = new oTimeAxios(param);
            $(".cx-time-bottom[data-index="+0+"]").show()
        },
        methods:{
            toRoll(index){
                this.$emit("toRoll",index)
            }
        }
    }
</script>

<style scoped>
    @import '../../assets/css_super/timeAxis.css';

    .container-steps {
        width: 12rem;
        height: 246px;
        background-color: #ffffff;
        border-radius: 0.08rem;
        border: solid 0.01rem #ebebeb;
        display: flex;
        align-items: center;
        justify-items: center;
    }
</style>