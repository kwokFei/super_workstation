<template>
    <el-cascader
            v-model="value"
            :options="options"
            clearable
            placeholder = "请选择行业"
            :props="{ checkStrictly: true }"
            @change="handleChange">
    </el-cascader>
</template>

<script>
    export default {
        name: "Cascader",
        data(){
            return{
                value : [],
                options:[
                    {
                        value: '公共事业',
                        label: '公共事业',
                        children: [
                            {
                                value: '智慧家居',
                                label: '智慧家居',
                            },
                            {
                                value: '智慧楼宇',
                                label: '智慧楼宇',
                            },
                            {
                                value: '智慧养老',
                                label: '智慧养老',
                            },
                            {
                                value: '智慧厨房',
                                label: '智慧厨房',
                            },
                            {
                                value: '智慧美容',
                                label: '智慧美容',
                            },

                        ],
                    },
                    {
                        value: '建筑房产',
                        label: '建筑房产',
                        children: [
                            {
                                value: '智慧楼宇',
                                label: '智慧楼宇',
                            },
                            {
                                value: '智慧园区',
                                label: '智慧园区',
                            },
                            {
                                value: '智慧工程',
                                label: '智慧工程',
                            },
                        ],

                    },
                    {
                        value: '农林牧渔',
                        label: '农林牧渔',
                        children: [
                            {
                                value: '智慧农业',
                                label: '智慧农业',
                            },
                            {
                                value: '智慧养鸡',
                                label: '智慧养鸡',
                            },
                            {
                                value: '智慧养猪',
                                label: '智慧养猪',
                            },
                        ],
                    },
                    {
                        value: '医药卫生',
                        label: '农林牧渔',
                        children: [
                            {
                                value: '智慧医院',
                                label: '智慧医院',
                            },
                        ],

                    },
                    {
                        value: '建筑建材',
                        label: '建筑建材',
                        children: [
                            {
                                value: '智慧工地',
                                label: '智慧工地',
                            },
                        ],

                    },
                    {
                        value: '冶金矿产',
                        label: '冶金矿产',
                        children: [
                            {
                                value: '智慧砂石',
                                label: '智慧砂石',
                            },
                        ],

                    },
                    {
                        value: '石油化工',
                        label: '石油化工',
                        children: [
                            {
                                value: '智慧油罐',
                                label: '智慧油罐',
                            },
                        ],

                    },
                    {
                        value: '水利水电',
                        label: '水利水电',

                    },
                    {
                        value: '交通运输',
                        label: '交通运输',
                        children: [
                            {
                                value: '智慧交通',
                                label: '智慧交通',
                            },
                            {
                                value: '智慧物流',
                                label: '智慧物流',
                            },
                        ],

                    },
                    {
                        value: '信息产业',
                        label: '信息产业',

                    },
                    {
                        value: '机械机电',
                        label: '机械机电',
                        children: [
                            {
                                value: '智慧生产',
                                label: '智慧生产',
                            }
                        ],

                    },
                    {
                        value: '专业服务',
                        label: '专业服务',
                        children: [
                            {
                                value: '养老机构',
                                label: '养老机构',
                            }
                        ],

                    },
                    {
                        value: '环保绿化',
                        label: '环保绿化',
                        children: [
                            {
                                value: '智慧市政',
                                label: '智慧市政',
                            },
                            {
                                value: '智慧井盖',
                                label: '智慧井盖',
                            }
                        ],
                    },
                    {
                        value: '旅游休闲',
                        label: '旅游休闲',
                        children: [
                            {
                                value: '智慧景区',
                                label: '智慧景区',
                            }
                        ],

                    },
                    {
                        value: '电子电工',
                        label: '电子电工',
                    },
                    {
                        value: '消费品业',
                        label: '消费品业',
                    },
                ]
            }
        },
        methods:{
            handleChange(value) {
                this.$emit("handleChangeBusiness",value)
            }
        }
    }
</script>

<style scoped>

</style>