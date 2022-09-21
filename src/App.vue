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
    // 0:普通 1:微信 2:支付宝 3:浙里办 4：微信端浙里办  5:支付宝浙里办
    const brower = this.$config.checkBrowser();
  
    this.asnyLoadJs(brower)

    // 将游览器环境存入vuex
    this.$store.commit('setBrower',brower);

    window.addEventListener('beforeunload',this.beforeunloadFn);

    // 用于线上打开调试工具
    sessionStorage.__CONSOLE__ = this.$config.getParams() && this.$config.getParams().console;
  },

  methods:{
    asnyLoadJs(brower){
      if([3,4].includes(brower)){
        this.loadZLBJS(brower);
      }else{
        this.init = true;
      }
    },

    // 浙里办js异步加载
    loadZLBJS(brower){
      var loadScript = [
        'https://jssdk.yyhj.zjzwfw.gov.cn/jsbridge/v2.0.0/bridge.min.js',
        'https://assets.zjzwfw.gov.cn/assets/ZWJSBridge/1.1.0/zwjsbridge.js',
      ]
      // 微信浙里办埋点js
      if(brower == 4){
        loadScript.push('https://assets.zjzwfw.gov.cn/assets/zwlog/1.0.0/zwlog.js')
      }
      this.$config.loadScriptAll(loadScript,()=>{
        ZWJSBridge.onReady(() => {console.log('初始化完成后，执⾏bridge⽅法')})
        if(window.ZWJSBridge && ZWJSBridge.setTitle){
          ZWJSBridge.setTitle({title:"模板"})
        }
        this.init = true;
      })

    },

    // 页面刷新调用  防止vuex丢失
    beforeunloadFn(){
      this.$store.commit('updateState');
    }
  }
}
</script>

<style lang="less">
@import url('~@/static/css/common.css');
</style>
