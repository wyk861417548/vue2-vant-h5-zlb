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
    ZWJSBridge.onReady(() => {console.log('初始化完成后，执⾏bridge⽅法')})
    window.addEventListener('beforeunload',this.beforeunloadFn);
  },

  methods:{
    beforeunloadFn(){
      this.$store.commit('updateState');
    },

  }
}
</script>

<style lang="less">
@import url('~@/static/css/common.css');
</style>
