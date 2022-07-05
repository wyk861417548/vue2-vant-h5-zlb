import * as $loading from "./config/loading";
import * as $kCompass from "./config/kCompass";
import * as $idCard from "./config/idCard";
import * as $url from "./config/url";
import * as $zlb from "./config/zlb";

export default {
  ...$loading,
  ...$kCompass,
  ...$idCard,
  ...$url,
  ...$zlb,
  // 关闭当前游览器
  closeBrowser:function(){
    if (/MicroMessenger/.test(window.navigator.userAgent)) {
      WeixinJSBridge.call('closeWindow')
    } else if (/AlipayClient/.test(window.navigator.userAgent)) {
      AlipayJSBridge.call('closeWebview');
    } else if (/ZLB/.test(window.navigator.userAgent)) {
      ZWJSBridge.close();
    } else {
      return window.close();
    }
  },

  // 语音播报
  reader(text){
    let u =window.navigator.userAgent;
    var isAndroid  = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ;
    
    console.log('isAndroid',isAndroid);
    if(isAndroid){
      // let audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${text}&type=1`)
      let audio = new Audio(`http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=` + encodeURI(text))
      // let audio =  new Audio('https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=' + text);
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
  },

  // 数组对象排序  若 a 小于 b 在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值
  /**
   * @param {*} arr  需要排序的数组
   * @param {*} key  根据数组中的某个值来去重
   * @param {*} type 默认升序
   * @returns 
   */
  sort(arr,key,type){
    return arr.sort(function(a,b){
      if(type){
        return -(a[key] - b[key])
      }
      return a[key] - b[key];
    })
  },
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