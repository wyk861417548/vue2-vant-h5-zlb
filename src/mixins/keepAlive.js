export default{
  beforeRouteEnter(to, from, next){
    console.log('from.meta',from.meta);
    if (from.meta.isBack) {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  }
}