<template>
    <div class="maxBox">
        <div class="bannerBox">
            <img src="../../../assets/img/mercenary_library/bannerImg.png" alt="">
        </div>
        <div class="contentBox">
            <div class="oneBox">
                <p class="titleName">人才库</p>
                <router-link class="moreBtn" to="">更多》</router-link>
                <div class="peopleList">
                    <div class="peopleListItem" v-for="(item,index) in peopleData" :key="index">
                        <img :src="item.userImg" alt="">
                        <p>{{ item.name }}</p>
                        <span class="work">{{ item.work }}</span>
                        <br>
                        <span class="remake">{{ item.remake }}</span>
                    </div>
                </div>
                <div class="MvvMBox">
                    <div class="MvvMLeft">
                        <div class="minLeft">
                            <p style="display: flex;align-items: center;margin-left: -0.2rem">
                                <i style="display: inline-block;width: 0.02rem;height: 0.14rem;background-color: #7DBBF8"></i>
                                <span style="margin-left: 0.1rem;font-size: 0.14rem;color: #999">简介</span>
                            </p>
                            <p>专长:</p>
                            <p>熟悉计算机网络、硬软件;</p>
                            <p>技能:</p>
                            <p>各种服务器建设;</p>
                            <p>评价:</p>
                            <p>有自制力，肯学，有问题有逃避，愿意虚心向他人学习；</p>
                        </div>
                        <img class="minUserImg" src="../../../assets/img/mercenary_library/userIcon_5.png" alt="">
                    </div>
                    <img class="MvvMRightImg" src="../../../assets/img/mercenary_library/talentpool.png" alt="">
                </div>
            </div>
            <div class="twoBox">
                <p class="titleName">我招募的</p>
                <router-link class="moreBtn" to="">更多》</router-link>
                <div class="twoList">
                    <div class="twoListItem" v-for="(item,index) in myzpData" :key="index">
                        <img :src="item.userIcon" alt="">
                        <p>{{ item.userName }}</p>
                        <span>{{ item.userWork }}</span>
                    </div>
                </div>
            </div>
            <div class="threeBox">
                <p class="titleName">我应聘的</p>
                <div class="myypList">
                    <div class="myypListItem" v-for="(item,index) in myypData" :key="index">
                        <img :src="item.userIcon" alt="">
                        <p>{{ item.name }}</p>
                        <span class="mmWork">{{item.work}}</span>
                        <br>
                        <span style="display: flex;justify-content: center">推荐 <el-rate style="margin-left: 0.1rem"
                                                                                        v-model="item.rate"></el-rate></span>
                    </div>
                </div>
                <router-link class="goMore" to="">查看更多>></router-link>
            </div>
        </div>
        <div class="dzhtBox">
            <p class="titleName">电子合同</p>
            <div class="dzList">
                <div class="dzItem">
                    <img src="../../../assets/img/mercenary_library/dzhtImg_1.png" alt="">
                    <p>电子签名</p>
                    <span>防抵赖或者篡改</span>
                </div>
                <span class="joker"></span>
                <div class="dzItem">
                    <img src="../../../assets/img/mercenary_library/dzhtImg_2.png" alt="">
                    <p>电子合同</p>
                    <span>专业签署平台</span>
                </div>
                <span class="joker"></span>
                <div class="dzItem">
                    <img src="../../../assets/img/mercenary_library/dzhtImg_3.png" alt="">
                    <p>法律服务</p>
                    <span>存证出征一键服务</span>
                </div>
                <span class="joker"></span>
                <div class="dzItem">
                    <img src="../../../assets/img/mercenary_library/dzhtImg_4.png" alt="">
                    <p>数据证据</p>
                    <span>数据资产确权报全</span></div>
            </div>
            <router-link class="goShow" to="">立即查看</router-link>
        </div>
    </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        value1: 4.5,
        peopleData: [
          {
            userImg: require('../../../assets/img/mercenary_library/userIcon_1.png'),
            name: '顾伟杰',
            work: '硬件接入培训讲师',
            remake: '有自制力；肯学习，有问题不逃避，愿意虚心向他人学习；会用100%的热...'
          },
          {
            userImg: require('../../../assets/img/mercenary_library/userIcon_2.png'),
            name: '顾伟杰',
            work: '硬件接入培训讲师',
            remake: '有自制力；肯学习，有问题不逃避，愿意虚心向他人学习；会用100%的热...'
          },
          {
            userImg: require('../../../assets/img/mercenary_library/userIcon_3.png'),
            name: '顾伟杰',
            work: '硬件接入培训讲师',
            remake: '有自制力；肯学习，有问题不逃避，愿意虚心向他人学习；会用100%的热...'
          },
          {
            userImg: require('../../../assets/img/mercenary_library/userIcon_4.png'),
            name: '顾伟杰',
            work: '硬件接入培训讲师',
            remake: '有自制力；肯学习，有问题不逃避，愿意虚心向他人学习；会用100%的热...'
          }
        ], // 人才库数据
        myzpData: [
          {
            userIcon: require('../../../assets/img/mercenary_library/myzp_1.png'),
            userName: '邹开宇',
            userWork: '高级数据库工程师'
          },
          {
            userIcon: require('../../../assets/img/mercenary_library/myzp_2.png'),
            userName: '邹开宇',
            userWork: '高级数据库工程师'
          },
          {
            userIcon: require('../../../assets/img/mercenary_library/myzp_3.png'),
            userName: '邹开宇',
            userWork: '高级数据库工程师'
          },
          {
            userIcon: require('../../../assets/img/mercenary_library/myzp_4.png'),
            userName: '邹开宇',
            userWork: '高级数据库工程师'
          }
        ],   // 我招聘数据
        myypData: [
          {
            userIcon: require('../../../assets/img/mercenary_library/myyp_1.png'),
            name: '李贤俊',
            work: '高级数据库专家',
            rate: 3
          },
          {
            userIcon: require('../../../assets/img/mercenary_library/myyp_2.png'),
            name: '李贤俊',
            work: '高级数据库专家',
            rate: 4
          },
          {
            userIcon: require('../../../assets/img/mercenary_library/myyp_3.png'),
            name: '李贤俊',
            work: '高级数据库专家',
            rate: 3
          },
          {
            userIcon: require('../../../assets/img/mercenary_library/myyp_4.png'),
            name: '李贤俊',
            work: '高级数据库专家',
            rate: 4
          },
          {
            userIcon: require('../../../assets/img/mercenary_library/myyp_5.png'),
            name: '李贤俊',
            work: '高级数据库专家',
            rate: 5
          }
        ],   // 我应聘数据
      }
    }
  }
</script>

<style scoped>
    .maxBox {
        width: 100%;
        height: 100%;
        background-color: #f5f5fa;
    }

    .bannerBox {
        width: 100%;
        height: 4.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #c8e2fc;
    }

    .contentBox {
        width: 100%;
        padding: 0.58rem 3.75rem;
        box-sizing: border-box;
    }

    .oneBox {
        width: 100%;
        position: relative;
    }

    .oneBox .titleName {
        width: 100%;
        font-family: MicrosoftYaHei;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.24rem;
        letter-spacing: 0rem;
        color: #232323;
    }

    .oneBox .moreBtn {
        position: absolute;
        right: 0;
        top: 0;
        font-family: MicrosoftYaHei;
        font-size: 0.12rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.24rem;
        letter-spacing: 0rem;
        color: #999999;
    }

    .oneBox .moreBtn:hover {
        color: #0D72FB;
    }

    .peopleList {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.56rem;
    }

    .peopleList .peopleListItem {
        width: 2.78rem;
        height: 3.6rem;
        padding: 0 0.22rem;
        background-color: #ffffff;
    }

    .peopleListItem > img {
        margin-top: 0.39rem;
        width: 1.34rem;
        height: 1.34rem;
    }

    .peopleListItem > p {
        margin: 0.2rem 0;
        font-family: MicrosoftYaHei;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0.008rem;
        color: #333333;
    }

    .peopleListItem .work {
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #777777 !important;
    }

    .peopleListItem .remake {
        margin-top: 0.2rem;
        display: inline-block;
        font-family: MicrosoftYaHei;
        font-size: 0.12rem;
        line-height: 0.26rem;
        letter-spacing: 0rem;
        color: #aaaaaa;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .MvvMBox {
        margin-top: 0.3rem;
        width: 100%;
        height: 3.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .MvvMBox .MvvMLeft {
        padding: 0.6rem;
        width: 7.7rem;
        height: 3.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        background-color: #ffffff;
    }

    .MvvMBox .MvvMRightImg {
        width: 3.7rem;
        height: 3.5rem;
    }

    .minLeft p {
        line-height: 0.36rem;
        padding-left: 0.1rem;
        font-size: 0.12rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #555555;
    }

    .minUserImg {
        width: 1.34rem;
        height: 1.34rem;
        margin-right: 0.3rem;
    }

    .twoBox {
        width: 100%;
        position: relative;
        margin-top: 0.4rem;
    }

    .twoBox .titleName {
        width: 100%;
        font-family: MicrosoftYaHei;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.24rem;
        letter-spacing: 0rem;
        color: #232323;
    }

    .twoBox .moreBtn {
        position: absolute;
        right: 0;
        top: 0;
        font-family: MicrosoftYaHei;
        font-size: 0.12rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.24rem;
        letter-spacing: 0rem;
        color: #999999;
    }

    .twoBox .moreBtn:hover {
        color: #0D72FB;
    }

    .twoList {
        margin-top: 0.3rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .twoList .twoListItem {
        width: 2.7rem;
        height: 2.9rem;
        background-color: #ffffff;
        border: solid 0.01rem #e6e6e6;
    }

    .twoList .twoListItem img {
        width: 1.7rem;
        height: 1.7rem;
        margin-top: 0.3rem;
    }

    .twoList .twoListItem p {
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0.007rem;
        color: #333333;
        margin: 0.12rem 0;
    }

    .twoList .twoListItem span {
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.24rem;
        letter-spacing: 0rem;
        color: #888888;
    }

    .threeBox {
        height: 5.57rem;
        width: 100%;
        background-color: white;
        margin-top: 0.3rem;
        padding: 0.2rem;
    }

    .threeBox .titleName {
        margin-top: 0.3rem;
        font-family: MicrosoftYaHei;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.24rem;
        letter-spacing: 0rem;
        color: #232323;
    }

    .myypList {
        margin-top: 0.2rem;
        padding: 0 0.5rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .myypList .myypListItem {
        height: 2.74rem;
        width: 2rem;
    }

    .myypListItem img {
        margin-top: 0.2rem;
    }

    .myypListItem > p {
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0.007rem;
        color: #333333;
        margin: 0.06rem 0;
    }

    .myypListItem .mmWork {
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.24rem;
        letter-spacing: 0rem;
        color: #888888;
    }

    .goMore {
        margin: auto;
        width: 1.2rem;
        height: 0.4rem;
        line-height: 0.4rem;
        border-radius: 0.02rem;
        border: solid 0.01rem #4281f5;
        font-family: MicrosoftYaHei;
        font-size: 0.14rem;
        color: #4281f5;
    }

    .dzhtBox {
        width: 19.19rem;
        height: 5rem;
        background-color: #4281f5;
        color: white;
        padding-top: 0.6rem;
    }

    .dzhtBox .titleName {
        font-family: MicrosoftYaHei;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.24rem;
        letter-spacing: 0rem;
        color: #ffffff;
    }

    .dzList {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 0.8rem;
    }

    .dzList .joker {
        display: inline-block;
        width: 0.01rem;
        height: 1.46rem;
        background-color: #ffffff;
        opacity: 0.17;
        margin: 0 0.5rem;
    }

    .dzList .dzItem > img {
        width: 0.44rem;
        height: 0.44rem;
    }

    .dzList .dzItem > p {
        font-size: 0.16rem;
        color: #ffffff;
        margin-top: 0.26rem;
        margin-bottom: 0.44rem;
    }

    .dzList .dzItem > span {
        font-size: 0.14rem;
        color: #ffffff;
    }

    .goShow {
        width: 1.2rem;
        height: 0.4rem;
        margin: auto;
        margin-top: 0.8rem;
        line-height: 0.4rem;
        border-radius: 0.02rem;
        border: solid 0.01rem #ffffff;
        color: white;
    }

</style>
