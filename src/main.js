import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store/index.js'
import config from "@/utils/config.js";
import api from "@/utils/api.js";
import validator from "@/static/js/validator.js";
import 'lib-flexible/flexible'

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
 *    如果设置data-url 使用路由地址跳转 （this.$route.query接受参数，地址栏上可见参数）
 *     params 是可以
 * */
Vue.prototype.$skip = (e,params)=>{
  var dataset = e.target.dataset;
  console.log("dataset",dataset);
  var url = dataset.url;
  if(!url)return;
  app.$router.push({path:url,query:params?params:''});
}


var app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


export default app
