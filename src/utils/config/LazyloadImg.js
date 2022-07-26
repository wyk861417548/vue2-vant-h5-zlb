// 长条banner图
export function LazyloadImg(img){
  return {
    src: img,
    error: require('@/static/images/lazy/default_banner.png'),
    loading: require('@/static/images/lazy/default_banner.png'),
  }
}