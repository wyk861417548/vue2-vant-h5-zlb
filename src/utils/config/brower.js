// 获取浏览器环境
export function kgetUseragent(){
  const userAgent = window.navigator.userAgent.toLowerCase()

  const userFrom = {
    // 支付宝
    alipay: userAgent.indexOf('alipay') > -1,

    // 支付宝app内h5
    alipayh5: userAgent.indexOf('alipay') > -1 && userAgent.indexOf('miniprogram') === -1,

    // 支付宝小程序
    alipayminiprogram:userAgent.indexOf('miniprogram') > -1 && userAgent.indexOf('alipay') > -1,

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
}