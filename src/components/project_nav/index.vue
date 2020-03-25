<template>
    <div class="container-nav">
       <item v-for="(item,index) in itemOption"
             :key="index"
             :item="item"
             @handleGotoDetail="handleGotoDetail"></item>
    </div>
</template>

<script>
    import item from './item'
    export default {
        name: "index",
        components:{
            item
        },
        data(){
            return{
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
                    },{
                        title:"状态",
                        value:"进行中",
                        color:"#e35d5d",
                        img:[
                            require("@/assets/img/project_center/all/time.png")
                        ]
                    }
                ]
            }
        },
        methods:{
            handleGotoDetail(){
                this.$emit("handletoDelay")
            }
        },
    }
</script>

<style scoped>
    .container-nav{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 12rem;
        height: 1.08rem;
        background-color: #ffffff;
        border-radius: 0.08rem;
        border: solid 0.01rem #ebebeb;
        margin: 0.43rem 0 0.1rem 0;
    }


</style>