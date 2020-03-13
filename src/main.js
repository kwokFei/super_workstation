import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/utils/setRem_api.js'
import '@/assets/css_super/normalize.css'
import '@/assets/css_super/public.css'
import $ from 'jquery'

Vue.use(ElementUI);

// import './permission' // permission control

Vue.config.productionTip = false;

//根据路由改变title
router.beforeEach((to,from,next) =>{
//  路由改变修改页面的title
  if(to.meta.title){
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
