<template>
    <div class="container-detail-table">
        <div v-for="(item,index) in tableData"
                    :key = "index"
                    :ref = "'table'+index">
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
        props:["talbeIndex","tableData"],
        watch:{
            talbeIndex(){
                if(this.$refs['table'+this.talbeIndex]){
                    window.scrollTo(0,this.$refs['table'+this.talbeIndex][0]['offsetTop']);
                }
            }
        }
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