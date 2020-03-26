<template>
    <div>
        <breadcrumb :breadcrumb="breadcrumb"></breadcrumb>
        <div class="container-all">
            <form-progress :projectStatuOptions="projectStatuOptions"/>
            <form-tabble :tableData="tableData"/>
            <page-footer/>
        </div>

    </div>
</template>

<script>
    import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
    import FormProgress from '@/components/wait_do/form_table/index'
    import FormTabble from '@/components/wait_do/form_table/table_form'
    import PageFooter from '@/components/page_footer/PageFooter'
    export default {
        name: "need_project",
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
                        name: "待办任务",
                        link: "/project_center/all_need_project"
                    },
                ],
                projectStatuOptions: [
                    {
                        value: '0',
                        label: '全部申请'
                    },
                    {
                        value: '1',
                        label: '延期申请'
                    },
                    {
                        value: '2',
                        label: '变更申请'
                    },
                    {
                        value: '3',
                        label: '立项申请'
                    }],
                tableData: [
                    {
                        applyTime: '2019-09-08  17:32:33',
                        projectLoder : "张千思",
                        projectName: '北碚智慧市政',
                        applyType : "延期申请",
                    },
                    {
                        applyTime: '2019-09-08  17:32:33',
                        projectLoder : "张千思",
                        projectName: '北碚智慧市政',
                        applyType : "延期申请",
                    },
                    {
                        applyTime: '2019-09-08  17:32:33',
                        projectLoder : "张千思",
                        projectName: '北碚智慧市政',
                        applyType : "延期申请",
                    },
                    {
                        applyTime: '2019-09-08  17:32:33',
                        projectLoder : "张千思",
                        projectName: '北碚智慧市政',
                        applyType : "变更申请",
                    },
                    {
                        applyTime: '2019-09-08  17:32:33',
                        projectLoder : "张千思",
                        projectName: '北碚智慧市政',
                        applyType : "立项申请",
                    },
                    {
                        applyTime: '2019-09-08  17:32:33',
                        projectLoder : "张千思",
                        projectName: '北碚智慧市政',
                        applyType : "延期申请",
                    },
                    {
                        applyTime: '2019-09-08  17:32:33',
                        projectLoder : "张千思",
                        projectName: '北碚智慧市政',
                        applyType : "延期申请",
                    },
                    {
                        applyTime: '2019-09-08  17:32:33',
                        projectLoder : "张千思",
                        projectName: '北碚智慧市政',
                        applyType : "延期申请",
                    },
                    {
                        applyTime: '2019-09-08  17:32:33',
                        projectLoder : "张千思",
                        projectName: '北碚智慧市政',
                        applyType : "延期申请",
                    },
                    {
                        applyTime: '2019-09-08  17:32:33',
                        projectLoder : "张千思",
                        projectName: '北碚智慧市政',
                        applyType : "延期申请",
                    },
                    {
                        applyTime: '2019-09-08  17:32:33',
                        projectLoder : "张千思",
                        projectName: '北碚智慧市政',
                        applyType : "延期申请",
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