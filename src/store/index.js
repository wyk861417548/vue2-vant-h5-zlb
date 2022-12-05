import Vue from 'vue'
import Vuex from 'vuex'
import * as $ST from './storage'
Vue.use(Vuex)

let state = {
  // 需要本地持久化放这里
  storage:{
    token:''
  }
}

const store = new Vuex.Store({
  state:$ST.initState(state),

  mutations: {
    // 更新数据到sessionStorage
    updateState(state){
      $ST.saveState(state);
    },
    
    setToken(state,data){
      state.token = data;
      $ST.updateLocalStorage(state);
    },

    // 设置游览器环境全局使用
    setBrower(state,data){
      state.brower = data;
    }

  }
})

export default store
