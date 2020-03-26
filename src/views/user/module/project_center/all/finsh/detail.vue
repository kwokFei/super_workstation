<template>
    <div>
        <breadcrumb :breadcrumb="breadcrumb"></breadcrumb>
        <project-nav @handletoDelay = "handletoDelay"
                     :itemOption = "itemOption"/>
        <steps @toRoll="handleToRoll" :timeList="timeList"/>
        <detail-tabble :talbe-index="talbeIndex" :tableData="tableData"/>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
    import projectNav from '@/components/project_nav/index'
    import steps from '@/components/steps/index'
    import detailTabble from "@/components/detail_tabble/index"
    export default {
        name: "detail",
        components: {
            Breadcrumb,
            projectNav,
            steps,
            detailTabble
        },
        data() {
            return {
                breadcrumb: [
                    {
                        name: "项目总览",
                        link: "/project_center"
                    },
                    {
                        name: "已完成项目",
                        link: "/project_center/all_finsh_project"
                    },
                    {
                        name: "项目详情",
                        link: "/project_center/all_finsh_project/details"
                    },
                ],
                talbeIndex:null,
                timeList:[
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
                            isDo : false,
                            projectLeader:"杨娟",
                            status : "进行中",
                            startTime :"2019-09-02",
                            endTime : "2019-09-06",
                            progress:"80%",
                            remarks : "协议翻译完毕后，即刻进行设备的接入"
                        }
                    }
                ],
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
                itemOption:[
                    {
                        title:"项目名称",
                        value:"中意智慧家居",
                        color:"#0068ff"
                    },
                    {
                        title:"开始时间",
                        value:"2019-09-09",
                        color:"#edd14d"
                    },
                    {
                        title:"计划完成时间",
                        value:"2019-10-11",
                        color:"#56d7ab"
                    },
                    {
                        title:"项目总负责人",
                        value:"邹达海",
                        color:"#3d7aae"
                    },
                    {
                        title:"状态",
                        value:"已完成",
                        color:"#56d7ab",
                        otherremark:{
                            value:"超时",
                            color:"#e35d5d"
                        },
                    }
                ]


            }
        },
        methods:{
            handletoDelay(){
                this.$router.push("/project_center/all_in_progress_project/delay")
            },
            //获取点击的第几个点
            handleToRoll(index){
                // console.log(index);
                this.talbeIndex = index;
            }
        },
    }
</script>

<style scoped>

</style>