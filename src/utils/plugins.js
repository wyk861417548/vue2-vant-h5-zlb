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


/**
 * @param {*} SCROLL 滚动组件ref
 * @param {*} list  滚动列表
 * @param {*} total 列表总长度
 * @returns 
 */
//上拉加载默认状态 0：可加载， 1：无数据， 2已结束， 3:加载中
Vue.prototype.$isScroll = (SCROLL,list,total)=>{
  //处理数据还在加载中，已经离开本页面
  if(!SCROLL) return;

  // 加载状态结束
  SCROLL.status = 0;

  // 无数据
  if(list.length < 1){
    SCROLL.status = 1;
    return;
  }

  // 如果已经是最后一页了 结束
  if(total <= list.length){
    SCROLL.status = 2;
  }
}