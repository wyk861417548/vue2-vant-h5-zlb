// 长条banner图
export function LazyloadImg(img){
  return {
    src: img,
    error: require('@/assets/images/lazy/default_banner.png'),
    loading: require('@/assets/images/lazy/default_banner.png'),
  }
}