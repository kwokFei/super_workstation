<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>


<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  [v-cloak] {
        display: none !important;
  }
#app {
  /*width: 19.2rem;*/
  height: 10.80rem;
  text-align: center;
  box-sizing: border-box;
}
  body::-webkit-scrollbar{
    display: none;
  }
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
