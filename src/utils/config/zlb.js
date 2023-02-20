/**
 * 支付宝或者浙里办扫一扫 	
 * @param {*} type 不传默认扫描二维码 传值为真 扫描条形码
 * @returns 
 */

export function scan(type){
  //检测是微信还是支付宝 0:普通 1:微信 2:支付宝 3:浙里办
  if(checkBrowser() == 3){
    return scanZLB(type);
  }else{
    return scanZFB(type);
  }
}

/**
 * 扫码支付宝 
 * @param {*} type 不传默认扫描二维码,传值为真 扫描条形码
 * @returns 
 */
export function scanZFB(type){
  return new Promise(resolve=>{
    window.ap.scan({
      type: type?'qr':'bar'
    },(res)=>{
      res.code && resolve(res.code)
    });
  })
}

/**
 * 扫码浙里办
 * @param {*} type 不传默认扫描二维码 ,传值为真 扫描条形码
 * @returns 
 */
export function scanZLB(type){
  return new Promise(resolve=>{
    ZWJSBridge.scan({
      type: type?'qrCode':'barCode',
    }).then((data) => {
      resolve(data.text)
    });
  })
}

// 浙里办拨打电话
export function call(phone){
  if(window.ZWJSBridge && [3,4,5].includes(checkBrowser())){
    ZWJSBridge.phoneCall({
      corpId:phone
    });
  }else{
    window.location.href = `tel:${phone}`
  }
  
}

// 0:普通 1:微信 2:支付宝 3:浙里办 4：微信端浙里办  5:支付宝浙里办
export function checkBrowser() {
  const userAgent = window.navigator.userAgent.toLowerCase()

  if(userAgent.indexOf('miniprogram') > -1 && userAgent.indexOf('alipay') > -1){
    return 5
  }if(userAgent.includes('miniprogram/wx') || window.__wxjs_environment === 'miniprogram'){
    return 4
  } else if (/alipay/.test(userAgent)) {
    return 2;
  } else if (/dtdreamweb/.test(userAgent)) {
    return 3;
  }else if (/micromessenger/.test(userAgent)) {
    return 1;
  } else {
    return 0;
  }
}


// 关闭当前页面
export function  closeBrowser(){
  const userAgent = window.navigator.userAgent.toLowerCase()
  if (/micromessenger/.test(userAgent)) {
    WeixinJSBridge.call('closeWindow')
  } else if (/alipay/.test(userAgent)) {
    AlipayJSBridge.call('closeWebview');
  } else if (/dtdreamweb/.test(userAgent)) {
    ZWJSBridge.close();
  } else {
    return window.close();
  }
}