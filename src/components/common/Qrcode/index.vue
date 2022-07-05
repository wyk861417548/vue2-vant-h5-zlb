<template>
  <div id="qrCode" ref="qrCodeDiv"></div>
</template>

<script>
import QRCode from 'qrcodejs2';
export default {
  props: ["code", "color"],

  data() {
    return {
      qrcode: "",

      text: "Qrcode"
    };
  },

  mounted() {
    this.setCode();
  },


  methods: {
    setCode() {
      this.qrcode = new QRCode(this.$refs.qrCodeDiv, {
        text: this.code || this.text,
        width: 1080,
        height: 1080,
        colorDark: this.color || "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
      })
    },

    clearCode() {
      let code = document.getElementById("qrCode");
      code.innerHTML = '';
    },
  },

  watch: {
    // 不使用makeCode  是因为  不能再动态改变颜色
    code(newVal) {
      this.text = newVal;
      // this.qrcode.makeCode(newVal);
      this.clearCode();
      this.$nextTick(function () {
        this.setCode();
      })
    }
  }
}
</script>

<style scoped>
/* 注意这里别写lang='less'或者其他  不然>>>不生效 */
#qrCode>>>canvas {
  width: 100% !important;
  height: 100% !important;
}

#qrCode>>>img {
  width: 100% !important;
  height: 100% !important;
}
</style>