import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const localDataKey = 'localDataKey'

let state = {
  // 本地持久化放这里
  storage:{
    token:''
  }
}


//初始化状态数据
let initState = function(){
  if(sessionStorage[localDataKey]){
    const tempData = JSON.parse(sessionStorage[localDataKey])
    for(var i in tempData){
      state[i] = tempData[i];
    }
    sessionStorage[localDataKey] = '';
  }

  state.storage = localStorage.storage;
	return state;
}

//存储状态数据到本地sessionStorage 用于保证vuex刷新不丢失
let saveState = function(state){
	sessionStorage[localDataKey] = JSON.stringify(state);
}


const store = new Vuex.Store({
  state:initState(),

  mutations: {
    // 更新数据到saveState
    updateState(state){
      saveState(state);
    },
    
    setToken(state,data){
      state.token = data;
      localStorage.storage = state.storage
    },

    // 设置游览器环境全局使用
    setBrower(state,data){
      state.brower = data;
    }

  }
})

export default store
