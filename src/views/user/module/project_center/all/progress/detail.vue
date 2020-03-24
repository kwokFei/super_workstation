<template>
    <div >
        <breadcrumb :breadcrumb="breadcrumb"></breadcrumb>
        <project-nav/>
        <steps/>
        <detail-tabble/>
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
                        name: "进行中的项目",
                        link: "/project_center/all_in_progress_project"
                    },
                    {
                        name: "项目详情",
                        link: "/project_center/all_in_progress_project/details"
                    },
                ],
            }
        },
    }
</script>

<style scoped>

    .container-progress-detail{
        width: 12rem;
        /*height: 6.5rem;*/
        overflow: auto;
        background-color: #ffffff;
        border-radius: 0.08rem;
    }

</style>