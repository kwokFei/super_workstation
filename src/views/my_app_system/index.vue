<template>
    <div>
        <!--导航栏-->
        <public-nav>
            <div slot="header">
                <span class="header-item">
                    <img @click="goToUrl" src="@/assets/img/publich_nav/logo.png" alt="">
                </span>
                <span class="header-item"
                        v-for="(item,index) in headerList"
                        :key="item.name"
                        @click="handleischeckIndex(index)">
                    <router-link
                            :to="item.link"
                            :class="{ischeck : ischeckIndex === index }">
                        {{item.name}}
                    </router-link>
                </span>
            </div>
        </public-nav>
        <!--内容-->
        <container-main :checkedname =headerList[ischeckIndex].name ></container-main>

    </div>
</template>

<script>
    import publicNav from '@/components/nav/nav'
    import containerMain from './module/container_main'
    export default {
        name: "my_app_system",
        components:{
            publicNav,
            containerMain
        },
        data(){
          return{
              ischeckIndex : 0,
              headerList : [
                  {name : "我的应用系统" , index:0, link : "/my_app_system"},
                  {name : "我的收藏" , index:1,  link : "/my_app_system"},
                  {name : "我的发布" , index:2, link : "/my_app_system"},
              ],


          }
        },
        methods:{
          // 返回上一层
          goToUrl() {
            console.log(111);
            this.$router.go(-1);
          },
            handleischeckIndex(index){
                this.ischeckIndex = index;
            },
        }
    }
</script>

<style scoped>
    .ischeck{
        color: #0068ff;
    }
    img{
        width: 100%;
        height: 100%;
    }


</style>
