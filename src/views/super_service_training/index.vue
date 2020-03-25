<template>
    <div class="maxBox">
        <div class="maxNavBox">
            <img style="margin-right: 0.3rem" src="../../assets/img/mercenary_library/logo.png" alt="">
            <div class="navBox">
                <span v-for="(item,index) in navData" :key="index" :class="{active:num == index}"
                      @click="changeItem(index)">
                    <router-link :to="item.path" class="mmmm"
                                 style="width: 100%;height: 100%;">{{item.name}}</router-link>
                </span>
            </div>
            <el-input suffix-icon="el-icon-search" style="width: 3rem;margin-left: 0.3rem"></el-input>
        </div>
        <div class="contentBox">
            <router-view/>
        </div>
        <div class="footerBox">
            <span>重庆金鑫智慧科技有限公司 ©2019-2020版权所有 渝ICP备14001530号-1</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        num: '0',
        navData: [
          {
            path: '/service_home',
            name: '首页'
          },
          {
            path: '',
            name: 'OA'
          },
          {
            path: '/service_course',
            name: '课程'
          },
          {
            path: '',
            name: '预约'
          },
          {
            path: '',
            name: '知识库'
          },
        ]
      }
    },
    methods: {
      changeItem(index) {
        this.num = index;
      }
    }
  }
</script>

<style scoped>
    .maxBox {
        width: 100%;
        position: relative;
    }

    .contentBox {
        width: 100%;
    }

    .navBox {
        margin-left: 0.2rem;
        /*position: absolute;*/
        /*top: 0.35rem;*/
        /*left: 6.1rem;*/
        /*background: white;*/
    }

    .maxNavBox {
        width: 100%;
        height: 0.6rem;
        display: flex;

        justify-content: center;
        align-items: center;
        background-color: white !important;
        box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
    }

    .navBox span {
        display: inline-block;
        width: 1rem;
        height: 0.4rem;
        line-height: 0.4rem;
    }

    .mmmm {
        /*font-weight: bold;*/
        font-size: 0.16rem;
        color: #0C0C0C;
    }

    .active > a {
        color: white;
        background-color: #0D72FB;
    }

    .footerBox {
        width: 100%;
        height: 0.9rem;
        line-height: 0.9rem;
        background-color: #232323;
    }

    .footerBox span {
        font-size: 0.12rem;
        line-height: 0.25rem;
        color: #aaaaaa;
    }
</style>
