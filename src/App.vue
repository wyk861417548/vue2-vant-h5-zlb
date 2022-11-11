<template>
  <div id="app" class="page-bg" v-if="init">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default{
  data(){
    return {
      init:false
    }
  },
  created(){
    // 0:普通 1:微信 2:支付宝 3:浙里办 4：微信端浙里办  5:支付宝浙里办
    const brower = this.$config.checkBrowser();
    if([3,4,5].includes(brower)){
      this.initZWJSBridge(brower);
    }else{
      this.init = true;
    }

    // 将游览器环境存入vuex
    this.$store.commit('setBrower',brower);

    window.addEventListener('beforeunload',this.beforeunloadFn);

    // 用于线上打开调试工具
    sessionStorage.__CONSOLE__ = this.$config.getParams() && this.$config.getParams().vconsole;
  },

  methods:{
    initZWJSBridge(brower){
      ZWJSBridge.onReady(() => {
        console.log('初始化完成后，执行bridge方法');
        if(window.ZWJSBridge && ZWJSBridge.setTitle){
          ZWJSBridge.setTitle({title:"安心善"})
          this.judgeUiStyle();
          this.init = true;
        }
      })
      if(brower == 4){
        const uiStyle =  this.$config.getParams() && this.$config.getParams()._uiStyle
        this.setUiStyle(uiStyle);
        return;
      }
    },

    // 判断浙里办当前 UI 风格
    judgeUiStyle() {
      ZWJSBridge.getUiStyle({}).then((result) => { 
        console.log('result',result);
        this.setUiStyle(result.uiStyle);
      }).catch((error) => {
        console.log(error); 
      })
    },

    // 设置适老化
    setUiStyle(uiStyle){
      if(uiStyle == 'normal'){  
        this.$store.commit('updateLocalData',{uiStyle:'normal'})
        document.documentElement.style.fontSize = (window.innerWidth/10) +'px';
      }else{
        this.$store.commit('updateLocalData',{uiStyle:'elder'})
        document.documentElement.style.fontSize = (window.innerWidth/10*1.3) +'px';
      }
    },
    // 页面刷新调用  防止vuex丢失
    beforeunloadFn(){
      this.$store.commit('updateState');
    }
  }
}
</script>

<style lang="less">
@import url('~@/assets/css/common.css');
</style>
