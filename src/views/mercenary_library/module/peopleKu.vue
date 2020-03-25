<template>
    <div class="maxBox">
        <div class="bannerBox">
            <img src="../../../assets/img/mercenary_library/bannerImg_2.png" alt="">
        </div>
        <div class="contentBox">
            <div class="navBox">
                <span>全部</span>
                <span>最新</span>
            </div>
            <div class="listBox">
<!--                <router-link to="">-->
                    <div class="itemBox" v-for="(item,index) in peopleData" :key="index">
                        <img :src="item.peoIcon" alt="">
                        <p>{{ item.peoName }}</p>
                        <span class="itemWork">{{ item.peoWork }}</span>
                        <br>
                        <span class="itemRemake">{{ item.peoRemake }}</span>
                    </div>
<!--                </router-link>-->
            </div>
            <el-pagination
                style="margin-top: 0.5rem;margin-bottom: 1rem"
                background
                layout="prev, pager, next"
                :total="100">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  export default {
    name: "peopleKu",
    data() {
      return {
        peopleData: [
          {
            peoIcon:require('../../../assets/img/mercenary_library/peopleIcon_1.png'),
            peoName:'顾伟杰',
            peoWork:'硬件接入培训讲师',
            peoRemake:'有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;',
          },
          {
            peoIcon:require('../../../assets/img/mercenary_library/peopleIcon_2.png'),
            peoName:'顾伟杰',
            peoWork:'硬件接入培训讲师',
            peoRemake:'有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;',
          },
          {
            peoIcon:require('../../../assets/img/mercenary_library/peopleIcon_3.png'),
            peoName:'顾伟杰',
            peoWork:'硬件接入培训讲师',
            peoRemake:'有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;',
          },
          {
            peoIcon:require('../../../assets/img/mercenary_library/peopleIcon_4.png'),
            peoName:'顾伟杰',
            peoWork:'硬件接入培训讲师',
            peoRemake:'有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;',
          },
          {
            peoIcon:require('../../../assets/img/mercenary_library/peopleIcon_1.png'),
            peoName:'顾伟杰',
            peoWork:'硬件接入培训讲师',
            peoRemake:'有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;',
          },
          {
            peoIcon:require('../../../assets/img/mercenary_library/peopleIcon_2.png'),
            peoName:'顾伟杰',
            peoWork:'硬件接入培训讲师',
            peoRemake:'有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;',
          },
          {
            peoIcon:require('../../../assets/img/mercenary_library/peopleIcon_3.png'),
            peoName:'顾伟杰',
            peoWork:'硬件接入培训讲师',
            peoRemake:'有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;',
          },
          {
            peoIcon:require('../../../assets/img/mercenary_library/peopleIcon_4.png'),
            peoName:'顾伟杰',
            peoWork:'硬件接入培训讲师',
            peoRemake:'有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;',
          },
          {
            peoIcon:require('../../../assets/img/mercenary_library/peopleIcon_3.png'),
            peoName:'顾伟杰',
            peoWork:'硬件接入培训讲师',
            peoRemake:'有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;',
          },
          {
            peoIcon:require('../../../assets/img/mercenary_library/peopleIcon_4.png'),
            peoName:'顾伟杰',
            peoWork:'硬件接入培训讲师',
            peoRemake:'有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;有自制力;肯学习，有问题不逃避，愿意虚心向他人学习;',
          }
        ]
      }
    }
  }
</script>

<style scoped>
    .maxBox {
        width: 100%;
    }

    .bannerBox {
        width: 100%;
        height: 4.5rem;
    }

    .bannerBox img {
        height: 4.5rem;
    }

    .contentBox {
        width: 100%;
        background-color: #F5F5Fa;
        padding: 0.39rem 3.75rem;
    }

    .navBox {
        width: 100%;
        height: 0.36rem;
        line-height: 0.36rem;
        text-align: left;
    }

    .navBox span {
        font-family: MicrosoftYaHei;
        font-size: 0.16rem;
        letter-spacing: 0.008rem;
        color: #333333;
        font-weight: bold;
        margin-right: 0.2rem;
    }

    .listBox {
        width: 100%;
        margin-top: 0.2rem;
        display: flex;
        justify-content: left;
        align-items: center;
        flex-wrap: wrap;
    }

    .listBox .itemBox {
        width: 2.78rem;
        height: 3.6rem;
        margin: 0.06rem;
        background-color: #ffffff;
        transition: all 1s;
        border: 1px solid white;
    }

    .listBox .itemBox:hover {
        transform: translateY(-0.05rem);
        box-shadow: 0rem 0.03rem 0.16rem 0rem rgba(0, 0, 0, 0.09);
        border: solid 0.01rem #7baeff;
    }
    .listBox .itemBox img {
        margin-top: 0.39rem;
    }

    .listBox .itemBox p {
        font-family: MicrosoftYaHei;
        font-size: 0.16rem;
        letter-spacing: 0.008rem;
        color: #333333;
        margin: 0.2rem 0;
    }
    .itemWork {
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        letter-spacing: 0rem;
        color: #777777;
    }

    .itemRemake {
        display: inline-block;
        text-align: left;
        padding: 0 0.1rem;
        font-size: 0.12rem;
        line-height: 0.26rem;
        letter-spacing: 0rem;
        color: #aaaaaa;
        margin-top: 0.3rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
</style>
