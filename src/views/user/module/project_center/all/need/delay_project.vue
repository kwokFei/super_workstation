<template>
    <div>
        <breadcrumb :breadcrumb="breadcrumb"></breadcrumb>
        <project-nav :itemOption = "itemOption"/>
        <delay-content :form1-titlle = "form1Titlle"
                       :form1-option="form1Option"
                       :form2-titlle="form2Titlle"/>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
    import projectNav from '@/components/project_nav/index'
    import delayContent from '@/components/delay/index'
    export default {
        name: "delay_project",
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
                        name: "待办项目",
                        link: "/project_center/all_need_project"
                    },
                    {
                        name: "立项处理",
                        link: "/project_center/all_need_project/delay_change"
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
                        value:"超时",
                        color:"#e35d5d",
                    }
                ],
                form1Titlle:"立项申请日志",
                form1Option:[
                    {
                        title:"已签订合同，对方已打前期款项，并获取到相关资料，申请正式立项",
                        projectLoder : "邹达海",
                        taskNode:"产品接入    原型设计    UI设计    前端开发    应用开发    测试    客户验收",
                        applyLoder : "罗乐",
                        applyTime:"2019-11-09   20:22:18",
                    }
                ],
                form2Titlle:"操作"
            }
        },
    }
</script>

<style scoped>

</style>