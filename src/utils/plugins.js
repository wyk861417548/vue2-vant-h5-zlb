import Vue from 'vue'

// vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


// 全局公共组件
import "@/static/js/index.js";

import Vconsole from 'vconsole'
if (process.env.NODE_ENV == 'dev') {
  let vConsole = new Vconsole()
  Vue.use(vConsole)
}


// 图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload, {
  lazyComponent: true,
  error: require('@/static/images/lazy/error.png'),
  loading: require('@/static/images/lazy/default.png'),
  preLoad: 1,
  attempt: 1,
});

// 禁用页面滚动
Vue.prototype.$banScroll = ()=>{
  const mo = function(e){e.preventDefault()};
  document.body.style.overflow='hidden';
  document.addEventListener("touchmove",mo,{passive:false});//禁止页面滑动
}
// 取消页面滚动限制
Vue.prototype.$canScroll = ()=>{
  var mo=function(e){e.preventDefault();};
  document.body.style.overflow='';//出现滚动条
  document.removeEventListener("touchmove",mo,false);
}