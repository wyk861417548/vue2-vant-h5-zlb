import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  routes: [
    {path: '/index',component: () => import(/* webpackChunkName: "about" */ '@/views/index.vue')},

    // 栗子
    {path: '/',component: () => import(/* webpackChunkName: "about" */ '@/views/example/tab/index.vue')},
    {path: '/Scroll',component: () => import(/* webpackChunkName: "about" */ '@/views/example/Scroll.vue'),meta: {title:"滚动页面",keepAlive:true}},
    {path: '/ScrollDetail',component: () => import(/* webpackChunkName: "about" */ '@/views/example/ScrollDetail.vue'),meta:{title:"滚动详情",isBack:true}},
    {path: '/v-lazy',component: () => import(/* webpackChunkName: "about" */ '@/views/example/v-lazy.vue')},
    {path: '/swiper',component: () => import(/* webpackChunkName: "about" */ '@/views/example/swiper.vue')}
  ]
})

// 全局路由守卫
router.beforeEach((to,path,next)=>{
  document.title = to.meta.title?to.meta.title:"模板"
  next();
})

export default router;
