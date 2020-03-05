<template>
  <div id="workstaion_center_container">
    <router-link to="/workstaion_center/apcos_workstation">apcos工作站</router-link>
    <router-link to="/workstaion_center/pubilish_center">发布中心</router-link>
    <router-link to="/workstaion_center/record_center">个人中心</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "Workstaion_center_index"
    }
</script>

<style scoped>

</style>