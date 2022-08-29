<template>
  <Scroll ref="scroll" @scroll="getData">
    <div class="list"  v-for='(item,index) in dataList' :key='index' @click="$skip('/example/list/detail')">
      {{item.name}} -- {{item.age}}
    </div>
  </Scroll>

</template>

<script>
export default {
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

  created(){
    this.getData();
  },

  methods: {
    getData(){
      setTimeout(()=>{
        this.count++;
        for (let i = 0; i < 10; i++) {
          this.dataList.push({name:this.count+"---i---"+i,age:i})
        }

        this.$isScroll(this.$refs.scroll,this.dataList,30)
      },500)
    }
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