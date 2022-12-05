// 定位自己的位置
export function getLocationGD(){
  return new Promise((resolve,reject) => {
    const AMap = window.AMap

    // 检查浏览器环境是否为 https 不是则无法使用精准定位
    const geolocation = new AMap.Geolocation({
      // 是否使用高精度定位，默认：true
      enableHighAccuracy: false,
      // 设置定位超时时间，默认：无穷大
      timeout: 8000,
      // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
      buttonOffset: new AMap.Pixel(10, 20),
      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      zoomToAccuracy: true,
      // 定位按钮的排放位置,  RB表示右下
      buttonPosition: 'RB'
    })

    // 成功后加载其他点数据
    const onComplete = ({position})=>{
      // const {lng,lat} = position;
      resolve(position)
    }

    const onError = ()=> {
      reject()
    }

    geolocation.getCurrentPosition()
    AMap.event.addListener(geolocation, 'complete', onComplete)
    AMap.event.addListener(geolocation, 'error', onError)
  })
  
}