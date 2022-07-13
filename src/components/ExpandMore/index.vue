<template>
  <div ref="expandMore" class="expandMore">
    <slot :style="styles(show)"></slot>
    
    <footer v-if="hidden">
      <section class="more" v-show="show" @click="show = false">
        <p>
          <span>展示更多</span>
          <van-icon name="arrow-down" />
        </p>
      </section>
      

      <p class="putAway" v-show="!show" @click="show = true">
        收起
        <van-icon name="arrow-up" />
      </p>
    </footer>
  </div>

</template>

<script>
export default {
  props:{
    // 超过这个值代表需要展示更多了
    height:{
      type:Number,
      default:60
    }
  },
  data () {
    return {
      // 是否开启隐藏
      hidden:false,

      // 展开收缩开关
      show:false,
    };
  },

  created(){
    this.$nextTick(()=>{
      this.getContent()
    })
  },

  computed:{
    styles(){
      return (boolean)=>{
        if(boolean){
          return {
            height:this.height + 'px',

            overflow:'hidden',
          }
        }
      }
    }
  },


  methods: {
    getContent(){
      const aim = this.$refs.expandMore.getBoundingClientRect();

      if(this.height < aim.height){
        this.hidden = true;
        this.show = true;
      }
    },

    showExpandMore(){
      this.show = false;
      console.log();
    }
  }
}
</script>
<style lang='less' scoped>
  .expandMore{
    position: relative;
    .more{
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      color: #666;
      height: 60px;
      background: linear-gradient(180deg, rgba(255,255,255,0.6) 0%, #FFFFFF 60%);
      p{
        position: absolute;
        bottom: 0;
      }
    }
    .putAway{
      position: relative;
      text-align: center;
      color: #666;
      margin-top: 5px;
      padding: 5px 0;
      &::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #EAEAEA;
        transform: scaleY(.5);
      }
    }
  }
</style>