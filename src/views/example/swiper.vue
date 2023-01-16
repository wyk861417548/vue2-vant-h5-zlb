<template>
  <div class="j-vh" style="background:rgba(200,200,200,.8)">
    <Swiper :option="option">
      <swiper-slide v-for="(item,index) in list" :key="index">
        <p class="j-v-c">{{index}}</p>
      </swiper-slide>
    </Swiper>
  </div>

</template>

<script>
import {swiperSlide} from "vue-awesome-swiper";
export default {
  components:{
    swiperSlide
  },
  data () {
    return {
      list:[{},{},{},{},{},{},{},{},{},{},{},{},{}],
      // swiper滚动配置
      option:{
        slidesPerView: "auto",

        centeredSlides: true,
        // 自动播放
        // autoplay: {
        //   delay: 3000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false
        // },
      }
    };
  },

  created(){},


  methods: {
  }
}
</script>
<style lang='less' scoped>
.swiper {
  width: 100%;
  height: 100%;
}
.swiper-wrapper{
  .swiper-slide{
    background-color: #fff;
    width: 350px !important;
  }

  .swiper-slide-active{
    background: transparent;
  }
}
p{
  width: 260px;
  margin: auto;
  background-color: #82cc3a;
  height: 400px;
}

</style>
