<template>
  <div >
    <!-- class="j-full-curbox" -->
      <section class="box">
        <h2 class="box-title">测试上传图片压缩</h2>
        <upload path='fullUrl' :max='3' @change="changeUpload"></upload>
      </section>

      <section class="box">
        <h2 class="box-title">测试支付宝或浙里办扫一扫</h2>
        <button class="el-button el-button-primary" @click="handleClick">扫一扫</button>
      </section>

      <section class="box">
        <h2 class="box-title">测试不是详情返回缓存页面，是否刷新</h2>
        <button class="el-button el-button-primary" @click="$skip" data-url='/BScroll'>BScroll</button>
      </section>

      <section class="box">
        <h2 class="box-title">测试不是详情返回缓存页面，是否刷新</h2>
        <button class="el-button el-button-primary" @click="$skip" data-url='/scroll'>原生scroll</button>
      </section>

      <section class="box">
        <h2 class="box-title">二维码组件</h2>
        <Qrcode class="qrcode" code='二维码组件' color="#108ee9"></Qrcode>
      </section>

      <section class="box">
        <h2 class="box-title">测试刷新页面vuex数据是否还是存在</h2>
        <p class="mb-5">vuex:{{$store.state.token}}</p>
        <button class="el-button el-button-primary" @click="reload">reload</button>
      </section>

      <section class="box">
        <button class="el-button el-button-primary" @click="$refs.DatetimePicker.show = true">显示日期</button>
        <DatetimePicker type='year-month' ref="DatetimePicker" format="yyyy-MM" @change="changeDatetimePicker"></DatetimePicker>
      </section>


  </div>

</template>

<script>
export default {
  data () {
    return {
      date:''
    };
  },

  methods: {
    handleClick(){
      this.$config.scan().then(res=>{
        console.log('scan',res);
      })
    },

    // 上传图片测试
    changeUpload(){

    },

    changeDatetimePicker(date){
      this.date = date;
    },

    // 重新加载页面
    reload(){
      window.location.reload();
    }
  }
}
</script>
<style lang='less' scoped>
.qrcode{
  width: 100px;
  height: 100px;
}
</style>