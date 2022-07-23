<template>
  <listpage v-if="init"></listpage>
</template>

<script>
import keepAlive from '@/mixins/keepAlive.js'
import listpage from './listpage.vue'

export default {
  components:{
    listpage
  },
  mixins:[keepAlive],

  data(){
    return {
      init:false
    }
  },

  activated(){
    console.log('activated',this.$route.meta.isBack);
    // 如果不是从详情页返回  整个页面重新加载
    if(!this.$route.meta.isBack){
      this.init = false;
      this.$nextTick(()=>{
        this.init = true
      })
    }
    
  }
}
</script>