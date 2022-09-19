<template>
  <div id="app" class="page-bg">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default{
  created(){
    // 将游览器环境存入vuex
    console.log(',this.$config.checkBrowser()',this.$config.checkBrowser());
    this.$store.commit('setBrower',this.$config.checkBrowser());

    ZWJSBridge.onReady(() => {console.log('初始化完成后，执⾏bridge⽅法')})

    window.addEventListener('beforeunload',this.beforeunloadFn);
    
    // 用于线上打开调试工具
    sessionStorage.__CONSOLE__ = this.$config.getParams() && this.$config.getParams().console;
  },

  methods:{
    beforeunloadFn(){
      this.$store.commit('updateState');
    }
  }
}
</script>

<style lang="less">
@import url('~@/static/css/common.css');
</style>
