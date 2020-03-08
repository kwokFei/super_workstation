import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allCheckedModuleList : [],
    indexSrc : "",
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
