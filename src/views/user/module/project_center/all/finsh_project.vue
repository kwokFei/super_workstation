<template>
    <div>
        <breadcrumb :breadcrumb="breadcrumb"></breadcrumb>
        <div class="container-all">
            <form-progress :projectLeaderOptions="projectLeaderOptions"
                           :projectStatuOptions="projectStatuOptions"/>
            <form-tabble :tableData="tableData"
                         statu="已完成"/>
            <page-footer/>
        </div>

    </div>
</template>

<script>
    import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
    import FormProgress from '@/components/form_progress/FormProgress'
    import FormTabble from '@/components/form_progress/FormTabble'
    import PageFooter from '@/components/page_footer/PageFooter'

    export default {
        name: "finsh_project",
        components: {
            Breadcrumb,
            FormProgress,
            FormTabble,
            PageFooter,
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
                ],
                projectLeaderOptions: [
                    {
                        value: '0',
                        label: '所有负责人'
                    },
                    {
                        value: '1',
                        label: '邹达海'
                    },
                    {
                        value: '2',
                        label: '罗乐'
                    },
                    {
                        value: '3',
                        label: '张千思'
                    }],
                projectStatuOptions: [
                    {
                        value: '0',
                        label: '全部状态'
                    },
                    {
                        value: '1',
                        label: '进行中'
                    },
                    {
                        value: '2',
                        label: '已完成'
                    },
                    {
                        value: '3',
                        label: '超时'
                    }],
                tableData: [
                    {
                        startdate: '2019-09-09',
                        enddata : "2019-10-11",
                        projectLoder : "邹达海",
                        projectName: '中意智慧家居',
                        status : "进行中",
                        file : false,
                        detail : false,
                        overTimeRecoder : false,
                    },
                    {
                        startdate: '2019-09-09',
                        enddata : "2019-10-11",
                        projectLoder : "邹达海",
                        projectName: '中意智慧家居',
                        status : "进行中",
                        file : false,
                        detail : true,
                        overTimeRecoder : false,
                    },
                    {
                        startdate: '2019-09-09',
                        enddata : "2019-10-11",
                        projectLoder : "邹达海",
                        projectName: '中意智慧家居',
                        status : "进行中",
                        file : false,
                        detail : true,
                        overTimeRecoder : false,
                    },
                    {
                        startdate: '2019-09-09',
                        enddata : "2019-10-11",
                        projectLoder : "邹达海",
                        projectName: '中意智慧家居',
                        status : "进行中",
                        file : false,
                        detail : true,
                        overTimeRecoder : false,
                    },
                    {
                        startdate: '2019-09-09',
                        enddata : "2019-10-11",
                        projectLoder : "罗乐",
                        projectName: '智慧银行',
                        status : "进行中",
                        file : false,
                        detail : true,
                        overTimeRecoder : false,
                    },
                    {
                        startdate: '2019-09-09',
                        enddata : "2019-10-11",
                        projectLoder : "罗乐",
                        projectName: '智慧银行',
                        status : "已完成",
                        file : false,
                        detail : true,
                        overTimeRecoder : false,
                    },
                    {
                        startdate: '2019-09-09',
                        enddata : "2019-10-11",
                        projectLoder : "罗乐",
                        projectName: '智慧银行',
                        status : "已完成",
                        file : false,
                        detail : true,
                        overTimeRecoder : false,
                    },
                    {
                        startdate: '2019-09-09',
                        enddata : "2019-10-11",
                        projectLoder : "罗乐",
                        projectName: '智慧银行',
                        status : "已完成",
                        file : false,
                        detail : true,
                        overTimeRecoder : false,
                    },
                    {
                        startdate: '2019-09-09',
                        enddata : "2019-10-11",
                        projectLoder : "罗乐",
                        projectName: '智慧银行',
                        status : "已完成",
                        file : false,
                        detail : true,
                        overTimeRecoder : false,
                    },
                    {
                        startdate: '2019-09-09',
                        enddata : "2019-10-11",
                        projectLoder : "罗乐",
                        projectName: '智慧银行',
                        status : "已完成",
                        file : false,
                        detail : true,
                        overTimeRecoder : false,
                    },{
                        startdate: '2019-09-09',
                        enddata : "2019-10-11",
                        projectLoder : "罗乐",
                        projectName: '智慧银行',
                        status : "已完成",
                        file : false,
                        detail : true,
                        overTimeRecoder : false,
                    },
                ],
            }
        },
    }
</script>

<style scoped>

    .container-all{
        width: 12rem;
        height: 6.5rem;
        background-color: #ffffff;
        border-radius: 0.08rem;
    }

</style>