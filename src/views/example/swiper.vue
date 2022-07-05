<template>
  <div style="height:600px;width:600px;margin:auto;border:1px solid #f33;">
    <Swiper :option="option">
      <swiper-slide style="height:10px" v-for="(item,index) in list" :key="index">
        <p>{{index}}</p>
      </swiper-slide>
    </Swiper>
  </div>

</template>

<script>
import {swiperSlide } from "vue-awesome-swiper";
export default {
  components:{
    swiperSlide
  },
  data () {
    return {
      list:[
        {name:"xxx"},
        {name:"xxx"},
        {name:"xxx"},
        {name:"xxx"},
        {name:"xxx"},
        {name:"xxx"},
        {name:"xxx"},
        {name:"xxx"},
        {name:"xxx"},
        {name:"xxx"},
        {name:"xxx"},
        {name:"xxx"},
        {name:"xxx"},
      ],
      // swiper滚动配置
      option:{
        loop: true,
        // 自动播放
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },

        direction : 'vertical',
        // height:'100%',
        slidesPerView: '10',
      }
    };
  },

  created(){},


  methods: {
  }
}
</script>
<style lang='less' scoped>
  p{
    height: 45px;
    background: #ff3;
    margin-bottom:10px;
  }

</style>
