<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div class="j-full-curbox">
    <!-- <p @click="$skip" data-url="/index2">我是父級-{{data.title}}--{{data.content}}-----{{data.age}}</p> -->
    <BScroll ref="scroll" @change="change" :vdata="dataList">
      <div class="box"  v-for='(item,index) in dataList' :key='index' @click="$skip" data-url="/BScrollDetail">
        {{item.name}} -- {{item.age}}
      </div>
    </BScroll>
    
  </div>

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
      // bscroll 初始化配置
      this.$refs.scroll.reload();

      this.dataList = [];
      this.count = 1;

      this.getData();
    }

    this.$route.meta.isBack = false;
  },

  mounted(){
    // this.getData()
  },

  methods: {
    getData(){
      setTimeout(()=>{
        this.count++;
        for (let i = 0; i < 10; i++) {
          this.dataList.push({name:this.count+"---i---"+i,age:i})
        }

        this.isScroll(this.dataList,30)
        
      },2000)
    },

    isScroll(list,total){
      //上拉加载默认状态status  0：可加载 1：无数据 2已结束
      this.$nextTick(()=>{
        if(!this.$refs.scroll) return;

        this.$refs.scroll.finishPullUp();

        if(list.length < 1){
          this.$refs.scroll.status = 1;
          return;
        }

        if(total <= list.length ){
          this.$refs.scroll.status = 2;
          return;
        }
        
      })
    },

    change(){
      this.getData();
    }
  }
}
</script>
<style lang='less' scoped>
  .list {
    margin-top: 20px;
    height: 50px;
    background: #ddd;
    line-height: 50px;
    text-align: center;
  }

</style>