<template>
    <div >
        <breadcrumb :breadcrumb="breadcrumb"></breadcrumb>
        <div class="container-all">
            <form-all/>
            <from-tabble/>
            <page-footer/>
        </div>

    </div>
</template>

<script>

    import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
    import FormAll from '@/components/form_all/FormAll'
    import FromTabble from '@/components/form_all/FromTabble'
    import PageFooter from '@/components/page_footer/PageFooter'

    export default {
        name: "project_all_list",
        components: {
            Breadcrumb,
            FormAll,
            FromTabble,
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
                        name: "总项目",
                        link: "/project_center/all_project_all_list"
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