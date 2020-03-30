<template>
    <div class="maxBox">
        <div class="navBox">
            <div class="navLeft">
                <img @click="goToUrl" style="cursor:pointer;" src="../../assets/img/user/logo.png" alt="">
                <span v-for="(item,index) in navData" :key="index" :class="{isAdd:num == index}"
                      @click="addClass(index)">
                    {{item.name}}
                </span>
            </div>
            <div class="navRight">
                <span>
                    <img src="../../assets/img/publich_nav/shop.png" alt="">
                </span>
                <span>
                    <img src="../../assets/img/publich_nav/message.png" alt="">
                </span>
                <span>
                    <img src="../../assets/img/publich_nav/set.png" alt="">
                </span>
                <span>BeoneAPCOS</span>
            </div>
        </div>
        <div class="contentBox">
            <div class="titleBox">
                <i></i>
                <span>{{title}}</span>
            </div>
            <div class="listBox">
                <div class="btnBox">
                    <button @click="addTemplate">创建3D</button>
                </div>
                <div class="dataListBox">
                    <div class="listItem" v-for="(item,index) in dataList" :key="index"
                         @mouseenter="handleMarkShow(index)"
                         @mouseleave="handleMarkShow('')"
                    >
                        <div class="imgBox">
                            <img :src="item.imgUrl" alt="">
                            <div class="mbBox" v-show="isMaxShow === index">
                                <el-button type="primary" plain size="mini" icon="el-icon-money" @click="goTo3D">编辑
                                </el-button>
                                <img @click="handleMinShow(index)" src="../../assets/img/user/more.png" alt=""
                                     class="imgBtns">
                                <ul class="czMore" v-show="isMinShow === index">
                                    <li>分享</li>
                                    <li>复制</li>
                                    <li @click="handleRemoveItem(index)">删除</li>
                                </ul>
                            </div>
                        </div>
                        <div class="textBox">
                            <p>{{item.name}}</p>
                            <p>{{item.createTime}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 弹框 -->
        <div class="templateBox" v-show="isTemplate">
            <div class="mintTem">
                <div class="titleName">
                    <p class="">新建3D</p>
                    <span @click="addTemplate">X</span>
                </div>
                <div class="listUIBox">
                    <p style="margin-top: 0.3rem">
                        <span>方案名称:</span>
                        <el-input style="width: 3rem" v-model="DDName"></el-input>
                    </p>
<!--                    <p>-->
<!--                        <span>版本号:</span>-->
<!--                        <el-input style="width: 3rem" v-model="DDbbh"></el-input>-->
<!--                    </p>-->

                    <div class="btns">
                        <el-button type="primary" @click="addBtn">确认</el-button>
                        <el-button type="primary" plain @click="outBtn">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        isTemplate: false,
        title: '我的3D设计',
        num: '',
        DDName: '',
        DDbbh: '',
        isMaxShow: '',
        isMinShow: '',
        navData: [
          {
            name: '我的3D设计',
          },
          {
            name: '我的收藏',
          },
          {
            name: '我的发布'
          }
        ],
        dataList: [
          {
            imgUrl: require('../../assets/img/user/listBj004.png'),
            name: '智慧楼宇',
            createTime: '2020-03-17'
          },
          {
            imgUrl: require('../../assets/img/user/listBj004.png'),
            name: '智慧社区',
            createTime: '2020-03-15'
          },
          {
            imgUrl: require('../../assets/img/user/listBj004.png'),
            name: '智慧万盛',
            createTime: '2020-03-05'
          }
        ],
        form: {
          pro_type: '',
          pro_name: '',
          pro_code: '',
          pro_inter: '',
          pro_img: '',
          pro_time: new Date()
        }
      }
    },
    methods: {
      // 返回上一层
      goToUrl() {
        // console.log(111);
        this.$router.go(-1);
      },
      goTo3D() {
          let routeUrl = this.$router.resolve({
              path: "super_3d/threed_set",
          });
          window.open(routeUrl.href, '_blank');
      },
      addTemplate() {
        this.isTemplate = !this.isTemplate;
      },
      // 添加数据
      addBtn() {
        this.dataList.push({
          imgUrl: require('../../assets/img/user/listBj004.png'),
          name: this.DDName,
          createTime: '2020-03-24'
        })
        this.isTemplate = false;
      },
      // 关闭蒙版
      outBtn() {
        this.isTemplate = false;
      },

      addClass(index) {
        this.num = index;
        this.title = this.navData[index].name;
      },
      //显示蒙版
      handleMarkShow(index) {
        if (index === "") {
          this.isMinShow = null
        }
        this.isMaxShow = index;
      },
      //显示分享菜单
      handleMinShow(index) {
        if (index === this.isMinShow) {
          this.isMinShow = null
        } else {
          this.isMinShow = index
        }
      },
      //删除
      handleRemoveItem(index) {
        this.dataList.splice(index, 1);
      },
    }
  }
</script>

<style scoped>
    .maxBox {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #f0f0f8;
    }

    .navBox {
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        padding: 0 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #ffffff;
        box-shadow: 0.004rem 0.03rem 0.074rem 0.006rem rgba(0, 0, 0, 0.08);
    }

    .navLeft {
        display: flex;
        align-items: center;
    }

    .navLeft img {
        width: 1.11rem;
        height: 0.34rem;
        margin-right: 0.2rem;
    }

    .navLeft span {
        font-family: MicrosoftYaHeiLight;
        font-size: 0.16rem;
        color: #505055;
        margin: 0 0.3rem;
        cursor: pointer;
    }

    .isAdd {
        color: #0C76FB !important;
    }

    .navRight {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .navRight span {
        display: flex;
        align-items: center;
    }

    .navRight span img {
        margin: 0 0.1rem;
        cursor: pointer;
    }

    .contentBox {
        padding: 0 3rem;
        width: 100%;
        /*position: relative;*/
        /*height: 100%;*/
    }

    .titleBox {
        margin-top: 0.4rem;
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: left;
    }

    .titleBox i {
        display: inline;
        width: 0.04rem;
        height: 0.28rem;
        background-color: #0068ff;
    }

    .titleBox span {
        margin-left: 0.1rem;
        font-family: MicrosoftYaHei;
        font-size: 0.18rem;
        color: #666666;
    }

    .listBox {
        margin-top: 0.2rem;
        width: 100%;
        height: 7rem;
        background-color: #ffffff;
    }

    .btnBox {
        display: flex;
        justify-content: left;
        align-items: center;
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
    }

    .btnBox button {
        margin-left: 0.2rem;
        width: 1.2rem;
        height: 0.4rem;
        border-radius: 0.04rem;
        border: none;
        outline: none;
        background: #0C76FB;
        color: white;
        font-size: 0.18rem;
        letter-spacing: 0.01rem;
        cursor: pointer;
    }

    .dataListBox {
        width: 100%;
        padding: 0 0.16rem;
        /*height: 90%;*/
        display: flex;
        flex-wrap: wrap;
    }

    .listItem {
        margin: 0.2rem;
        width: 2.8rem;
        height: 2rem;
        background-color: white;
        border-radius: 0.08rem;
        box-shadow: 0 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
    }

    .listItem .imgBox {
        width: 100%;
        height: 1.45rem;
        overflow: hidden;
        position: relative;
    }

    .listItem .imgBox > img {
        width: 100%;
        height: 100%;
        transition: all 2s;
        cursor: pointer;
    }

    .listItem:hover .imgBox > img {
        transform: scale(1.2);
    }

    .textBox {
        width: 100%;
        height: 0.6rem;
        padding-left: 0.2rem;
        text-align: left;
    }

    .textBox p:nth-child(1) {
        font-size: 0.18rem;
        line-height: 0.3rem;
        color: #333333;
    }

    .textBox p:nth-child(2) {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #666666;
    }

    .mbBox {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }

    .mbBox button{
        margin-top: 0.6rem;
    }

    .imgBtns {
        display: inline-block;
        cursor: pointer;
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        width: 0.3rem;
        height: 0.08rem;
    }

    .czMore {
        position: absolute;
        top: 0.25rem;
        right: 0.05rem;
        width: 0.5rem;
        height: 0.84rem;
        background: rgba(32, 33, 43, 1);
        border-radius: 0.04rem;
    }

    .czMore li {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: white;
        line-height: 24px;
        cursor: pointer;
    }

    .czMore li:hover {
        color: rgba(47, 128, 237, 1);
    }

    .templateBox {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
    }

    .mintTem {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 6rem;
        height: 3rem;
        background: white;
        border-radius: 0.08rem;
        overflow: hidden;
        box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.02);
    }

    .titleName {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: Microsoft YaHei;
        font-size: 0.16rem;
        height: 0.4rem;
        width: 100%;
        line-height: 0.4rem;
        padding: 0 0.1rem;
        background: #0C76FB;
        color: white;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .titleName > span {
        cursor: pointer;
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.2rem;
    }

    .listUIBox {
        margin-top: 0.5rem;
        width: 100%;
    }

    .listUIBox p {
        width: 100%;
        display: flex;
        justify-content: left;
        align-items: center;
        padding-left: 0.5rem;
        line-height: 0.6rem;
    }

    .listUIBox p span {
        margin-right: 0.3rem;
    }

    .btns {
        margin-top: 0.3rem;
    }
</style>
