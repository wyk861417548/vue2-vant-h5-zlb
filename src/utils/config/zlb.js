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
      resolve(res.code)
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
  ZWJSBridge.phoneCall({
    corpId:phone
  });
}

export function checkBrowser() {
  if (/MicroMessenger/.test(window.navigator.userAgent)) {
    return 1;
  } else if (/AlipayClient/.test(window.navigator.userAgent)) {
    return 2;
  } else if (/ZLB/.test(window.navigator.userAgent)) {
    return 3;
  } else {
    return 0;
  }
}