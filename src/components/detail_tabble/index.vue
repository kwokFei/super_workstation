<template>
    <div class="container-detail-table">
        <table1 :table1Data="table1Data"/>

    </div>
</template>

<script>
    import table1 from './module/table1'
    export default {
        name: "index",
        components:{
            table1
        },
        data() {
            return {
                table1Data: [{
                    node: '客户流转卡',
                    name: '易仁军',
                    status: '已完成',
                    progress : "80%",
                    file : false,
                }]
            }
        },

    }
</script>

<style scoped>
    .container-detail-table{
        width: 12rem;
        background-color: #ffffff;
        border-radius: 0.08rem;
        border: solid 0.01rem #ebebeb;
        margin-top: 0.2rem;
        padding: 0 0.2rem 0.2rem 0.2rem;
    }

</style>