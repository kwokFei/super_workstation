<template>
    <div class="container-delay">
        <form1 :form1-option="form1Option"
                :form1-titlle="form1Titlle"/>
        <form2 :form2-titlle="form2Titlle"/>
    </div>
</template>

<script>
    import form1 from './module/form1'
    import form2 from './module/form2'
    export default {
        name: "index",
        props:["form1Titlle","form1Option","form2Titlle"],
        components:{
            form1,
            form2
        },

    }
</script>

<style scoped>
    .container-delay{
        width: 12rem;
        height: 6.82rem;
        background-color: #ffffff;
        border-radius: 0.08rem;
        border: solid 0.01rem #ebebeb;
        padding: 0.2rem;
    }

</style>