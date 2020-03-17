import Vue from 'vue'
import Vuex from 'vuex'
import {baseModuleList} from "@/utils/public_const"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allCheckedModuleList :  baseModuleList,
    indexSrc : "static/htmls/ggHome.html",
    logoUrl :"",
  },
  mutations: {
    changeAllCheckedModuleList(state,data){
      state.allCheckedModuleList = data
    },
    changeIndexSrc(state,data){
      // console.log(data);
      state.indexSrc = data
    },
    changelogoUrl(state,data){
      state.logoUrl = data
    }
  },
  actions: {
  },
  modules: {
  }
})
