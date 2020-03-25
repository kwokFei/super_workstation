<template>
    <div>
        <breadcrumb :breadcrumb="breadcrumb"></breadcrumb>
        <project-nav/>
        <delay-content/>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
    import projectNav from '@/components/project_nav/index'
    import delayContent from '@/components/delay/index'
    export default {
        name: "delay",
        components: {
            Breadcrumb,
            projectNav,
            delayContent
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
                        name: "延期",
                        link: "/project_center/all_in_progress_project/delay"
                    },
                ],
            }
        },

    }
</script>

<style scoped>

</style>