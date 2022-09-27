<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      time0:new Date().getTime()
    };
  },

  methods: {
    // 微信浙里办埋点
    init(info){
      let params;
      if(!info){
        params = this.$config.getParams()?this.$config.getParams().info:'';
      }
      console.log('params',params);
      var arr =this.decode(params).split("-") || [];
      // 登录成功后后台回传埋点信息给前端埋点
      if(arr.length > 0 ){
        this.setbury(arr);
      }
    },

    decode(str){
      return decodeURIComponent(escape(window.atob(str)))
    },

    // 微信浙里办小程序埋点
    setbury(arr){
      console.log("开始埋点");
      var that = this;
      // 在声明 Zwlog 对象实例时，可以传入一些 app 或者用户信息
      const zwlog = new ZwLog({
        _user_id:arr[0],
        _user_nick:arr[1]
      })

      //onReady 表示 zwlog 加载完成后的函数，它接收一个匿名函数，而 sendPV 与 record 方法均要在匿名函数内调用。eg:
      zwlog.onReady(function (){
        zwlog.sendPV({
          Page_duration: new Date().getTime(), //'用户从进入到离开当前页面的时长'
          t2: new Date().getTime(),//页面启动到加载完成的时间
          t0: that.time0 ,//页面启动到页面响应完成的时间
          log_status: '02', //用户登录状态（01:未登录/02:单点登录）
          miniAppId: '2002271932',//应用开发管理平台appId
          miniAppName:'安心善',
          pageId:document.title, //应用页面 id
          pageName:document.title //应用页面名称
        })


        //record⽅法将发送⼀条事件⽇志，它接收三个参数：
        //trackerEventCode：为注册的事件编码. 当上报的事件为 PV 事件时,trackerEventCode 可传空值或'PageView'常量；
        //eventType：时间类型 取值为'EXP':⾃定义曝光事件/'CLK':⾃定义点击事件/'OTHER': 其他⾃定义事件；
        //eventParams： 为本次事件中上报的事件参数. 其取值为⼀个 JSON 对象（平铺的简单对象，不能多层嵌套）；
        //JSON 中的 key 不能是以下保留属性：uidaplus,spm-url,spm-pre,spm_cnt,pvid,_dev_id,_anony_id,_user_id,_user_nick,_session_id
        zwlog.record('yourTrackerEventCode', 'CLK', {
          trackerEventCode:'PageView',
          eventType:'EXP',
          Test1: '测试参数 1',
        });
        let { metaInfo } = zwlog; // SDK 元配置的当前设置
      })

      console.log('浙里办埋点成功');
    }
  }
}
</script>
<style lang='scss' scoped>

</style>