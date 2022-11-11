<template>
  <div class="my-scroll j-full-curbox" ref="scroll" id="scroll" @scroll="onScroll">

    <slot></slot>

    <div v-show="status==1" class="j-full-curbox">
      <div class="j-full-center" style="top:40%;text-align:center;">
        <img src="@/assets/images/error/nodata.png" alt="图片">
        <div style="color:#5A5B5C;">暂无数据</div>
      </div>
    </div>

    <div v-show="[2,3].includes(status)"  style="text-align:center;line-height:1;padding:10px;font-size:14px;color:#c5c5c5;">
      {{status == 2?'已经到底了':'加载中...'}}
    </div>
  </div>
  
</template>
<script>
export default {
  data () {
    return {
      position:{
        scrollHeight:"",
        scrollTop:0,
        clientHeight:""
      },

      // 距离底部还有多远触发
      bottom:10,

      //上拉加载默认状态 0：可加载 1：无数据 2已结束 3:加载中
      status:3
    };
  },

  activated(){
    // 设置离开前的位置距离
    this.$nextTick(()=>{
      this.$refs.scroll.scrollTop = this.position.scrollTop;
    })
    
  },

  methods:{
    // 监听滚动  上拉加载默认状态 status 0：可加载 1：无数据 2已结束 3:加载中
    onScroll(e){
      // 当前1滚动盒子
      var aim = e.target;

      this.position ={
        scrollHeight:aim.scrollHeight,
        scrollTop:aim.scrollTop,
        clientHeight:aim.clientHeight
      }

      // 如果还是加载中的状态 this.status !=0 || 
      if(this.status !=0)return;
      
      // 如果当前盒子总滚动高度减去距离底部距离 不大于 滚动距离 + 盒子默认占据高度  可以加载数据
      var site = (aim.scrollHeight-this.bottom) <= Math.ceil(aim.scrollTop+aim.clientHeight);

      // 传递给父组件可以加载数据
      if(site){
        this.status = 3;
        this.$emit("scroll",{site:site})
      }
    }
  },
};
</script>

<style lang="less" scoped>
  .my-scroll{
    width:100%;
    height:100%;
    overflow: auto;
    -webkit-overflow-scrolling:touch
  }
</style>