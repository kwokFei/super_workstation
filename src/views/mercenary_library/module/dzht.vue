<template>
    <div class="maxBox">
        <!--   搜索盒子  -->
        <div class="searchBox">
            <input style="height: 0.48rem"/>
            <button style="width: 1.52rem">搜索</button>
        </div>
        <!--  功能盒子  -->
        <div class="optBox">
            <el-button size="mini" type="primary">全部</el-button>
            <el-button size="mini" type="primary">已生效</el-button>
            <el-button size="mini" type="info">未生效</el-button>
        </div>
        <!--  列表盒子 -->
        <div class="dzList">
            <div class="dzItem" v-for="(item,index) in dzData" :key="index">
                <img :src="item.dzImg" alt="">
                <p>
                    <span>姓名:<span class="name">{{ item.name }}</span></span>
                    <span class="look">查看>></span>
                </p>
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
    name: "dzht",
    data() {
      return {
        dzData:[
          {
            dzImg:require('../../../assets/img/mercenary_library/ht_ok.png'),
            name:'邓咏远',
          },
          {
            dzImg:require('../../../assets/img/mercenary_library/ht_ok.png'),
            name:'邓咏远',
          },
          {
            dzImg:require('../../../assets/img/mercenary_library/ht_sx.png'),
            name:'邓咏远',
          },
          {
            dzImg:require('../../../assets/img/mercenary_library/ht_ok.png'),
            name:'邓咏远',
          },
          {
            dzImg:require('../../../assets/img/mercenary_library/ht_ok.png'),
            name:'邓咏远',
          },
          {
            dzImg:require('../../../assets/img/mercenary_library/ht_ok.png'),
            name:'邓咏远',
          },
          {
            dzImg:require('../../../assets/img/mercenary_library/ht_ok.png'),
            name:'邓咏远',
          },
          {
            dzImg:require('../../../assets/img/mercenary_library/ht_ok.png'),
            name:'邓咏远',
          },
          {
            dzImg:require('../../../assets/img/mercenary_library/ht_sx.png'),
            name:'邓咏远',
          },
          {
            dzImg:require('../../../assets/img/mercenary_library/ht_ok.png'),
            name:'邓咏远',
          },
          {
            dzImg:require('../../../assets/img/mercenary_library/ht_ok.png'),
            name:'邓咏远',
          },
          {
            dzImg:require('../../../assets/img/mercenary_library/ht_sx.png'),
            name:'邓咏远',
          }
        ]
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

    .dzList {
        width: 100%;
        margin-top: 0.2rem;
        display: flex;
        justify-content: left;
        align-items: center;
        flex-wrap: wrap;
    }

    .dzItem {
        margin: 0.11rem;
        width: 2.7rem;
        height: 2.9rem;
        background-color: #ffffff;
        border: solid 0.01rem #e6e6e6;
    }

    .dzItem > img {
        margin-top: 0.21rem;
        width: 2.22rem;
        height: 1.96rem;
    }

    .dzItem > p {
        padding: 0 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.2rem;
    }

    .dzItem > p .name {
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        letter-spacing: 0.007rem;
        color: #999999;
        margin-left: 0.05rem;

    }

    .dzItem > p .look {
        font-size: 0.12rem;
        line-height: 0.24rem;
        color: #4385f4;
        cursor: pointer;
    }
</style>
