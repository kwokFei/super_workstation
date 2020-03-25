<template>
    <div class="maxBox">
        <!--   搜索盒子  -->
        <div class="searchBox">
            <input style="height: 0.48rem"/>
            <button style="width: 1.52rem">搜索</button>
        </div>
        <!--  功能盒子  -->
        <div class="optBox">
            <el-button size="mini" type="primary">添加</el-button>
            <el-button size="mini" type="primary">删除</el-button>
            <el-button size="mini" type="primary">替换</el-button>
            <el-button size="mini" type="primary">分配设定</el-button>
        </div>
        <!--  列表盒子 -->
        <div class="zmList">
            <div class="zmItem" v-for="(item,index) in zmData" :key="index">
                <div class="zmLeft">
                    <img :src="item.userIcon" alt="">
                    <div>
                        <p class="oneTop">
                            <span>{{ item.userName }}</span>
                            <span>{{ item.userSex }}</span>
                            <span>{{ item.userAge }}岁</span>
                            <span>{{ item.userAddress }}</span>
                            <span>{{ item.userJY }}</span>
                        </p>
                        <p class="oneBottom">
                            <span>{{ item.userWork }}</span>
                            <span>技能:</span>
                            <span>{{ item.userJN_1 }}</span>
                            <span>{{ item.userJN_2 }}</span>
                            <span>{{ item.userJN_3 }}</span>
                        </p>
                    </div>
                </div>
                <div class="zmRight">
                    <img :src="delIcon" alt="">
                    <span @click="zmDel(index)">删除</span>
                </div>
            </div>
        </div>
        <el-pagination
            style="margin: 0.5rem 0;"
            background
            layout="prev, pager, next"
            :total="100">
        </el-pagination>
    </div>
</template>

<script>
  export default {
    name: "my_zm",
    data() {
      return {
        delIcon:require("../../../assets/img/mercenary_library/zm_del.png"),
        zmData:[
          {
            userIcon:require('../../../assets/img/mercenary_library/peopleIcon_1.png'),
            userName:'顾洁',
            userSex:'女',
            userAge:'28',
            userAddress:'重庆市',
            userJY:'3-5年工作经验/本科毕业',
            userWork:'硬件接入培训讲师',
            userJN_1:'hive',
            userJN_2:'zookeeper',
            userJN_3:'大数据',
          },
          {
            userIcon:require('../../../assets/img/mercenary_library/peopleIcon_2.png'),
            userName:'顾洁',
            userSex:'女',
            userAge:'28',
            userAddress:'重庆市',
            userJY:'3-5年工作经验/本科毕业',
            userWork:'硬件接入培训讲师',
            userJN_1:'hive',
            userJN_2:'zookeeper',
            userJN_3:'大数据',
          },
          {
            userIcon:require('../../../assets/img/mercenary_library/peopleIcon_3.png'),
            userName:'顾洁',
            userSex:'女',
            userAge:'28',
            userAddress:'重庆市',
            userJY:'3-5年工作经验/本科毕业',
            userWork:'硬件接入培训讲师',
            userJN_1:'hive',
            userJN_2:'zookeeper',
            userJN_3:'大数据',
          },
          {
            userIcon:require('../../../assets/img/mercenary_library/peopleIcon_1.png'),
            userName:'顾洁',
            userSex:'女',
            userAge:'28',
            userAddress:'重庆市',
            userJY:'3-5年工作经验/本科毕业',
            userWork:'硬件接入培训讲师',
            userJN_1:'hive',
            userJN_2:'zookeeper',
            userJN_3:'大数据',
          },
          {
            userIcon:require('../../../assets/img/mercenary_library/peopleIcon_2.png'),
            userName:'顾洁',
            userSex:'女',
            userAge:'28',
            userAddress:'重庆市',
            userJY:'3-5年工作经验/本科毕业',
            userWork:'硬件接入培训讲师',
            userJN_1:'hive',
            userJN_2:'zookeeper',
            userJN_3:'大数据',
          },
          {
            userIcon:require('../../../assets/img/mercenary_library/peopleIcon_3.png'),
            userName:'顾洁',
            userSex:'女',
            userAge:'28',
            userAddress:'重庆市',
            userJY:'3-5年工作经验/本科毕业',
            userWork:'硬件接入培训讲师',
            userJN_1:'hive',
            userJN_2:'zookeeper',
            userJN_3:'大数据',
          },
          {
            userIcon:require('../../../assets/img/mercenary_library/peopleIcon_1.png'),
            userName:'顾洁',
            userSex:'女',
            userAge:'28',
            userAddress:'重庆市',
            userJY:'3-5年工作经验/本科毕业',
            userWork:'硬件接入培训讲师',
            userJN_1:'hive',
            userJN_2:'zookeeper',
            userJN_3:'大数据',
          },
          {
            userIcon:require('../../../assets/img/mercenary_library/peopleIcon_2.png'),
            userName:'顾洁',
            userSex:'女',
            userAge:'28',
            userAddress:'重庆市',
            userJY:'3-5年工作经验/本科毕业',
            userWork:'硬件接入培训讲师',
            userJN_1:'hive',
            userJN_2:'zookeeper',
            userJN_3:'大数据',
          },
          {
            userIcon:require('../../../assets/img/mercenary_library/peopleIcon_3.png'),
            userName:'顾洁',
            userSex:'女',
            userAge:'28',
            userAddress:'重庆市',
            userJY:'3-5年工作经验/本科毕业',
            userWork:'硬件接入培训讲师',
            userJN_1:'hive',
            userJN_2:'zookeeper',
            userJN_3:'大数据',
          },
          {
            userIcon:require('../../../assets/img/mercenary_library/peopleIcon_3.png'),
            userName:'顾洁',
            userSex:'女',
            userAge:'28',
            userAddress:'重庆市',
            userJY:'3-5年工作经验/本科毕业',
            userWork:'硬件接入培训讲师',
            userJN_1:'hive',
            userJN_2:'zookeeper',
            userJN_3:'大数据',
          },
        ]
      }
    },
    methods: {
      // go(){
      //   this.delIcon = require('../../../assets/img/mercenary_library/zm_icon_del_sel.png');
      // },
      // out(){
      //   this.delIcon = require('../../../assets/img/mercenary_library/zm_del.png');
      // },
      // 删除
      zmDel(Index){
        console.log(Index);
        this.zmData.splice(Index,1)
      }
    }
  }
</script>

<style scoped>
    .maxBox {
        width: 100%;
        padding: 0.4rem 3.75rem;
        background-color: #F5F7FA;
    }

    .searchBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 0.48rem;
        position: relative;
        background-color: white;
    }

    .searchBox input {
        height: 0.48rem;
        width: 100%;
        outline: none;
        border: none;
        font-size: 0.16rem;
        padding-left: 0.1rem;
    }

    .searchBox button {
        position: absolute;
        top: 0;
        right: 0;
        width: 1.52rem;
        height: 100%;
        background-color: #0D72FB;
        color: white;
        font-size: 0.16rem;
        letter-spacing: 0.02rem;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .optBox {
        margin: 0.3rem 0;
        width: 100%;
        height: 0.48rem;
        background-color: white;
        line-height: 0.48rem;
        padding: 0 0.2rem;
        text-align: left;
    }

    .zmList {
        width: 100%;

    }

    .zmItem {
        width: 100%;
        height: 1.6rem;
        justify-content: space-between;
        display: flex;
        align-items: center;
        background-color: white;
        padding: 0 0.2rem;
        margin: 0.2rem 0;
    }

    .zmItem .zmLeft {
        height: 100%;
        width: 60%;
        display: flex;
        justify-content: left;
        align-items: center;
    }

    .zmItem .zmLeft > img{
        width: 0.92rem;
        height: 0.92rem;
        margin-left: 0.2rem;
    }
    .zmItem .zmLeft .oneTop{
        text-align: left;
        line-height: 0.3rem;
    }
    .zmItem .zmLeft .oneTop span{
        margin: 0 0.1rem;
    }
    .zmItem .zmLeft .oneTop span:nth-child(1){
        font-family: MicrosoftYaHei;
        font-size: 0.16rem;
        letter-spacing: 0.008rem;
        color: #333333;
    }
    .zmItem .zmLeft .oneTop span:nth-child(2),
    .zmItem .zmLeft .oneTop span:nth-child(3),
    .zmItem .zmLeft .oneTop span:nth-child(4){
        font-size: 0.14rem;
        color: #777777;
    }
    .zmItem .zmLeft .oneTop span:nth-child(5){
        font-size: 0.14rem;
        color: #999999;
    }
    .zmItem .zmLeft .oneBottom{
        line-height: 0.3rem;
        text-align: left;
    }
    .zmItem .zmLeft .oneBottom span{
        margin: 0 0.1rem;
    }

    .zmItem .zmLeft .oneBottom span:nth-child(1){
        font-size: 0.14rem;
        color: #555555;
    }
    .zmItem .zmLeft .oneBottom span:nth-child(2){
        font-size: 0.14rem;
        color: #999999;
    }
    .zmItem .zmLeft .oneBottom span:nth-child(3),
    .zmItem .zmLeft .oneBottom span:nth-child(4),
    .zmItem .zmLeft .oneBottom span:nth-child(5){
        font-size: 0.12rem;
        color: #555555;
        padding: 0.03rem 0.05rem;
        background-color: #e7e7e7;
    }

    .zmItem .zmRight {
        /*width: 40%;*/
        height: 0.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-right: 1.5rem;

    }

    .zmItem .zmRight:hover span {
        color: red;
    }

    .zmItem .zmRight img {
        width: 0.14rem;
        height: 0.14rem;
        margin-right: 0.1rem;
    }

    .zmItem .zmRight span {
        font-size: 0.14rem;
        color: #999999;
    }
</style>
