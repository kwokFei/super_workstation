<template>
    <div class="container-detail-table">
        <div v-for="item in tableData">
            <table1 :table1-data="item.table1"/>
            <table2 :table2-data="item.table2"
                    :is-do="item.table1[0].isDo"/>
        </div>
    </div>
</template>

<script>
    import table1 from './module/table1'
    import table2 from './module/table2'

    export default {
        name: "index",
        components:{
            table1,
            table2
        },
        data() {
            return {
                tableData:[
                    {
                        table1:[{
                            node: '客户流转卡',
                            name: '易仁军',
                            status: '已完成',
                            progress : "80%",
                            file : false,
                            isDo : true,
                        }],
                        table2:[
                            {
                                data: '2019-09-14',
                                logContent: '*********************',
                                progressDay: '65%',
                                remarks : "无",
                            },{
                                data: '2019-09-14',
                                logContent: '*********************',
                                progressDay: '65%',
                                remarks : "无",
                            },{
                                data: '2019-09-14',
                                logContent: '*********************',
                                progressDay: '65%',
                                remarks : "无",
                            },
                        ]
                    },
                    {
                        table1:[{
                            node: '客户流转卡',
                            name: '易仁军',
                            status: '已完成',
                            progress : "80%",
                            file : false,
                            isDo : true,
                        }],
                        table2:[
                            {
                                data: '2019-09-14',
                                logContent: '*********************',
                                progressDay: '65%',
                                remarks : "无",
                            },{
                                data: '2019-09-14',
                                logContent: '*********************',
                                progressDay: '65%',
                                remarks : "无",
                            },{
                                data: '2019-09-14',
                                logContent: '*********************',
                                progressDay: '65%',
                                remarks : "无",
                            },
                        ]
                    },
                    {
                        table1:[{
                            node: '客户流转卡',
                            name: '易仁军',
                            status: '已完成',
                            progress : "80%",
                            file : false,
                            isDo : true,
                        }],
                        table2:[
                            {
                                data: '2019-09-14',
                                logContent: '*********************',
                                progressDay: '65%',
                                remarks : "无",
                            },{
                                data: '2019-09-14',
                                logContent: '*********************',
                                progressDay: '65%',
                                remarks : "无",
                            },{
                                data: '2019-09-14',
                                logContent: '*********************',
                                progressDay: '65%',
                                remarks : "无",
                            },
                        ]
                    },
                    {
                        table1:[{
                            node: '',
                            name: '',
                            status: '',
                            progress : "",
                            file : "",
                            isDo : false,
                        }],
                        table2:[
                            {
                                data: '',
                                logContent: '',
                                progressDay: '',
                                remarks : "",
                            },{
                                data: '',
                                logContent: '',
                                progressDay: '',
                                remarks : "",
                            },{
                                data: '',
                                logContent: '',
                                progressDay: '',
                                remarks : "",
                            },
                        ]
                    },
                ],

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