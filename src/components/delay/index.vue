<template>
    <div class="container-delay">
        <form1/>
        <form2/>
    </div>
</template>

<script>
    import form1 from './module/form1'
    import form2 from './module/form2'
    export default {
        name: "index",
        components:{
            form1,
            form2
        }
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