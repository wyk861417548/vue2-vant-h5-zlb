import * as $loading from "./config/loading";
import * as $kCompass from "./config/kCompass";
import * as $idCard from "./config/idCard";
import * as $url from "./config/url";
import * as $zlb from "./config/zlb";
import * as $LazyloadImg from './config/LazyloadImg'
import * as $load from './config/load'

export default {
  ...$loading,
  ...$kCompass,
  ...$idCard,
  ...$url,
  ...$zlb,
  ...$LazyloadImg,
  ...$load,

  // 获取浏览器环境
  kgetUseragent(){
    const userAgent = window.navigator.userAgent.toLowerCase()
  
    const userFrom = {
      // 支付宝
      alipay: userAgent.indexOf('alipay') > -1,
  
      // 支付宝app内h5
      alipayh5: userAgent.indexOf('alipay') > -1 && userAgent.indexOf('miniprogram') === -1,
  
      // 支付宝小程序
      alipayminiprogram:
        userAgent.indexOf('miniprogram') > -1 && userAgent.indexOf('alipay') > -1,
  
      // 微信
      wx: userAgent.indexOf('micromessenger') > -1,
  
      // 微信小程序
      wxminiprogram: userAgent.indexOf('miniprogram') > -1 && userAgent.indexOf('micromessenger') > -1,
  
      // 浙里办App
      zlb: userAgent.indexOf('dtdreamweb') > -1,
  
      // 浙里办支付宝小程序
      zlbminiprogram: userAgent.indexOf('miniprogram') > -1 && userAgent.indexOf('alipay') > -1,
  
      // 是否为手机
      isMobile: /android|iphone|symbianos|windows phone|ipad|ipod/.test(userAgent),
  
      // 是否为安卓
      isAndroid: userAgent.indexOf('android') > -1 || userAgent.indexOf('adr') > -1,
  
      // 是否为ios
      isIOS: /\(i[^;]+;( U;)? cpu.+mac os x/.test(userAgent)
    }
  
    return userFrom
  },
  
  // 语音播报
  reader(text){
    let u =window.navigator.userAgent;
    var isAndroid  = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ;
    
    console.log('isAndroid',isAndroid);
    if(isAndroid){
      let audio = new Audio(`http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=` + encodeURI(text))
      audio.pause();
      audio.play();
      return;
    }
    
    speechSynthesis.cancel();
    const speech = new window.SpeechSynthesisUtterance();
    speech.text = text;
    //用声音阅读文字， 语音播放
    speechSynthesis.speak(speech);   
  },

  /**
   * 下载图片
   * @param {*} src 图片地址
   * @param {*} name 自定义下载图片名称
   */
   downLoadImg(src,name){
    var image = new Image();
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function() {
      var canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      var context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, image.width, image.height);
      var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

      var a = document.createElement("a"); // 生成一个a元素
      var event = new MouseEvent("click"); // 创建一个单击事件
      a.download = name || "photo"; // 设置图片名称
      a.href = url; // 将生成的URL设置为a.href属性
      a.dispatchEvent(event); // 触发a的单击事件
    };
    image.src = src;
  },

  /**
   * @param {*} num 需要转换金额
   * @param {*} type 0：元  1：万元  2:亿元 以此类推
   * @param {*} fixed 保留小数
   * @returns 
   */
  unitConvert:function(num,type=1,fixed=2) {
    var dividend = Math.pow(10000,type)
    var curNum = num;
    //转换金额位数
    curNum = curNum / dividend 
    return curNum.toFixed(fixed);
  },
  
  /**
   * @param {*} arr  需要去重的对象
   * @param {*} key  根据对象中的某个值来去重
   * @returns 
   */
  distinct(arr,key) {
    var obj ={}
    var arrCl = arr.reduce(function (item,next) {
      obj[next[key]]?"":obj[next[key]]=true&&item.push(next)
      return item;
    },[])
    return arrCl;
  }
}

Date.prototype.format = function (fmt) { 
  var cNumber = ["日", "一", "二", "三", "四", "五", "六"];
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒
    'w+': cNumber[this.getDay()], //星期
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}