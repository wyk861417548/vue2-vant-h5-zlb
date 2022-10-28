import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store/index.js'
import config from "@/utils/config.js";
import api from "@/utils/api.js";
import validator from "@/static/js/validator.js";
import 'lib-flexible/flexible'
// 适老化使用这个
// import windowflex from '@/utils/flexible'

// 各种插件引入
import "@/utils/plugins.js";

Vue.config.productionTip = false

// 公共方法
Vue.prototype.$config = config;

// 接口文件
Vue.prototype.$api = api;

Vue.prototype.$validator = validator;


/** 
 * 页面跳转  
 *   url地址
 *   params 传参
 * */
 Vue.prototype.$skip = (url,params)=>{
  if(!url)return;
  app.$router.push({path:url,query:params});
}

Vue.prototype.$replace = (url,params)=>{
  if(!url)return;
  app.$router.replace({path:url,query:params});
}


var app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// windowflex(window, window['lib'] || (window['lib'] = {}),app);
export default app
