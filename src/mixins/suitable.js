// 浙里办适老化适配
export default {
  created(){
    // 0:普通 1:微信 2:支付宝 3:浙里办 4：微信端浙里办  5:支付宝浙里办
    const brower = this.brower;

    if([3,4,5].includes(brower)){
      this.initZWJSBridge(brower);
    }else{
      this.init = true;
    }
  },
  methods:{
    initZWJSBridge(brower){
      ZWJSBridge.onReady(() => {
        if(window.ZWJSBridge && ZWJSBridge.setTitle){
          ZWJSBridge.setTitle({title:document.title})
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

    // 设置适老化 注意 不能直接搭配flexible npm包直接使用  修改源码解决输入框弹出后导致 重新rem适配)
    setUiStyle(uiStyle){
      if(uiStyle == 'normal'){  
        document.documentElement.style.fontSize = (window.innerWidth/10) +'px';
      }else{
        document.documentElement.style.fontSize = (window.innerWidth/10*1.3) +'px';
      }
    },
  }
}