<template>
    <ul>
        <li v-for="(item,index) in liList" :key="index"
            :class="{isChecked: isChecked === item}"
            @click="handleChooseType(index,item)">
            {{item}}
        </li>
    </ul>
</template>

<script>
    export default {
        name: "moduleClassify",
        props:["isChecked"],
        data(){
            return{
                liList:[
                    "传感类",
                    "控制类",
                    "应用类",
                    "其他",
                    "我的库",
                ],
            }
        },
        methods:{
            handleChooseType(index,item){
                this.$emit("chooseType",item)
            }
        }
    }
</script>

<style scoped>
    .isChecked{
        background: #0066FF !important;
        color: #FFFFFF !important;
    }
    #design-container > ul{
        position: absolute;
        left: 12.5%;
        top: 1.9rem;
    }
    #design-container > ul > li{
        background: #ffffff;
        width: 0.28rem;
        border-radius: 5px;
        border: 1px solid #409EFF;
        cursor: pointer;
    }

</style>