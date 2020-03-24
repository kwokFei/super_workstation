<template>
    <div>
        <breadcrumb :breadcrumb="breadcrumb"></breadcrumb>
        <div class="container-all">
            <form-progress/>
            <form-tabble/>
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
        name: "in_progress_project",
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
                        name: "进行中的项目",
                        link: "/project_center/all_in_progress_project"
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