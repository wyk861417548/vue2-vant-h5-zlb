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