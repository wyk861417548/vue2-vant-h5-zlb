<template>
  <Scroll ref="scroll" @scroll="getData">
    <div class="list"  v-for='(item,index) in dataList' :key='index' @click="$skip" data-url="/example/list/detail">
      {{item.name}} -- {{item.age}}
    </div>
  </Scroll>

</template>

<script>
import keepAlive from '@/mixins/keepAlive.js'
export default {
  mixins:[keepAlive],
  data () {
    return {
      dataList:[],

      count:1,

      data:{
        //列表初始页码
        current: 1,   

        //每页条数
        size:10,   
      },
    };
  },

  activated(){
    // 如果不是从详情页进入
    if(!this.$route.meta.isBack){
      this.dataList = [];
      this.count = 1;
      this.$refs.scroll.status =3;
      this.getData();
    }

    this.$route.meta.isBack = false;
  },

  methods: {
    getData(){
      setTimeout(()=>{
        this.count++;
        for (let i = 0; i < 10; i++) {
          this.dataList.push({name:this.count+"---i---"+i,age:i})
        }

        this.isScroll(this.dataList,30)
      },500)
    },

    //上拉加载默认状态 0：可加载， 1：无数据， 2已结束， 3:加载中
    isScroll(list,total){
      const SCROLL = this.$refs.scroll;

      //处理数据还在加载中，已经离开本页面
      if(!SCROLL) return;

      // 加载状态结束
      SCROLL.status = 0;

      // 无数据
      if(list.length < 1){
        SCROLL.status = 1;
        return;
      }

      // 如果已经是最后一页了 结束
      if(total <= list.length){
        SCROLL.status = 2;
      }
    },
  }
}
</script>
<style lang='less' scoped>
  .list {
    margin-top: 20px;
    height: 100px;
    background: linear-gradient(to right,#bdc3c7,#2c3e50);
    line-height: 100px;
    text-align: center;
  }

</style>