<template>
  <Swiper :option="option">
    <swiper-slide v-for="(item,index) in list" :key="index">
      <p>{{index}}</p>
    </swiper-slide>
  </Swiper>

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
    height: 100px;
    background: #ddd;
    margin-bottom:10px;
  }

</style>
