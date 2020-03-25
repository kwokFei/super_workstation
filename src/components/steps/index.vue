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
        mounted() {
            var oTimeAxiosFun = null;
            var timeList = [
                {
                    name: '客户流转卡',
                    info: {
                        isDo : true,
                        projectLeader:"杨娟",
                        status : "进行中",
                        startTime :"2019-09-02",
                        endTime : "2019-09-06",
                        progress:"80%",
                        remarks : "协议翻译完毕后，即刻进行设备的接入"
                    }
                },
                {
                    name: '方案设计',
                    info: {
                        isDo : true,
                        projectLeader:"杨娟",
                        status : "进行中",
                        startTime :"2019-09-02",
                        endTime : "2019-09-06",
                        progress:"80%",
                        remarks : "协议翻译完毕后，即刻进行设备的接入"
                    }
                },
                {
                    name: '合同、资料',
                    info: {
                        isDo : true,
                        projectLeader:"杨娟",
                        status : "进行中",
                        startTime :"2019-09-02",
                        endTime : "2019-09-06",
                        progress:"80%",
                        remarks : "协议翻译完毕后，即刻进行设备的接入"
                    }
                },
                {
                    name: '合同、资料',
                    info: {
                        isDo : true,
                        projectLeader:"杨娟",
                        status : "进行中",
                        startTime :"2019-09-02",
                        endTime : "2019-09-06",
                        progress:"80%",
                        remarks : "协议翻译完毕后，即刻进行设备的接入"
                    }
                },
                {
                    name: '合同、资料',
                    info: {
                        isDo : true,
                        projectLeader:"杨娟",
                        status : "进行中",
                        startTime :"2019-09-02",
                        endTime : "2019-09-06",
                        progress:"80%",
                        remarks : "协议翻译完毕后，即刻进行设备的接入"
                    }
                },
                {
                    name: '合同、资料',
                    info: {
                        isDo : true,
                        projectLeader:"杨娟",
                        status : "进行中",
                        startTime :"2019-09-02",
                        endTime : "2019-09-06",
                        progress:"80%",
                        remarks : "协议翻译完毕后，即刻进行设备的接入"
                    }
                },{
                    name: '合同、资料',
                    info: {
                        isDo : true,
                        projectLeader:"杨娟",
                        status : "进行中",
                        startTime :"2019-09-02",
                        endTime : "2019-09-06",
                        progress:"80%",
                        remarks : "协议翻译完毕后，即刻进行设备的接入"
                    }
                },


            ];//参数列表
            var param = {
                data: timeList,
                id: 'cxTime',
                width: '150px',
                index: 0,
                then: function (index) {
                    $(".cx-time-bottom").hide();
                    console.log(index);
                    if(timeList[index].info.isDo){
                        $("div,[data-index="+index+"]").show()
                    }
                }
            }
            oTimeAxiosFun = new oTimeAxios(param);
        }
    }
</script>

<style scoped>
    @import '../../assets/css_super/timeAxis.css';

    .container-steps {
        width: 12rem;
        height: 400px;
        background-color: #ffffff;
        border-radius: 0.08rem;
        border: solid 0.01rem #ebebeb;
        display: flex;
        align-items: center;
        justify-items: center;
    }
</style>