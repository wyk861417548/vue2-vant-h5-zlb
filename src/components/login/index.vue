<template>
  <span></span>
</template>
<script>
export default {
  // 在登录后的界面引入当前组件 并调用this.$refs.login.init();  
  methods: {
    // 初始化浙里办以及获取登录后从后台拿取到的浙里办用户信息和用户id
    init(){
      var that = this;
      
      var params = this.$config.getParams()?this.$config.getParams().info:'';

      // 如果沒有重地址栏获取到浙里办数据
      if(!params) return;

      if(params && params.indexOf("#") != '-1'){
        params = params.slice(0,params.indexOf("#"));
      }

      var arr =  params?this.decode(params).split("-"):[];
 
      // 登录成功后后台回传埋点信息给前端埋点
      if(arr.length > 0 ){
        that.setbury(arr);
      }
    },

    // 解码url参数
    decode(str){
      return decodeURIComponent(escape(window.atob(str)))
    },
    
    // 埋点
    setbury(arr){
      console.log("开始埋点");
      // 初始化
      (function(w, d, s, q) { w[q] = w[q] || []; var f = d.getElementsByTagName(s)[0],j = d.createElement(s); j.async = true; j.id = 'beacon-aplus'; j.src = 'https://d.alicdn.com/alilog/mlog/aplus.js?id=202951085'; f.parentNode.insertBefore(j, f); })(window, document, 'script', 'aplus_queue');
      
      // 基础埋点
      aplus_queue.push({ action: 'aplus.setMetaInfo', arguments: ['aplus-rhost-v', 'alog.zjzwfw.gov.cn'] });
      aplus_queue.push({ action: 'aplus.setMetaInfo', arguments: ['aplus-rhost-g', 'alog.zjzwfw.gov.cn'] });
      aplus_queue.push({ action: 'aplus.setMetaInfo',arguments: ['appId', '60506758'] });
      
    
      // 获取地理位置以及PV日志 埋点
      ZWJSBridge.getLocation().then((data) => {
        localStorage.site = JSON.stringify({long:data.longitude,lati:data.latitude})
        console.log("localStorage.site",localStorage.site);
        aplus_queue.push({ 
          action: 'aplus.sendPV', 
          arguments: [
            {is_auto: false, },
            {
              long:data.longitude, 
              lati:data.latitude,
              userType:"puser",
              miniAppId:'xxxx',
              miniAppName:'xxx'
            }
          ] 
        });
      }).catch((error) => {
        console.log(error);
      });

      aplus_queue.push({action: 'aplus.setMetaInfo', arguments: ['_user_id', arr[1]]});
      aplus_queue.push({action: 'aplus.setMetaInfo',  arguments: ['_user_nick',arr[2]]});
    },
  }
}
</script>
<style lang='less' scoped>

</style>