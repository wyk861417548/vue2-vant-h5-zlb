<template>
  <div id="container" class="ct" style="text-align:center;"></div>
</template>

<script>
import * as PDFJS from "pdfjs-dist/legacy/build/pdf";
import { renderAsync } from "docx-preview";
import alloyfinger from '@/utils/alloyfinger.js'
// import axios from 'axios';
export default {
  data () {
    return {
      DOM:'',

      pdfDocPage:[],
    };
  },

  mounted(){
    this.DOM = document.getElementById('container');

    this.getFile(this.$route.query.file);
  },

  methods: {
    getFile(file){
      if(!file)return;

      const flieArr = file.split('.'); // 根据.分割数组
      let suffix = flieArr[flieArr.length - 1]; // 取最后一个
      suffix = suffix && suffix.toLocaleLowerCase(); // 将后缀所有字母改为小写方便操作

      // let responseType = suffix=='pdf'?'arraybuffer':'blob'

      axios({method:'get',url:decodeURIComponent(file),responseType:'arraybuffer'}).then((res) => {
        if(suffix == 'pdf'){
          this.perviewPDF(res.data)
        }

        if(suffix == 'docx'){
          renderAsync(res.data, this.DOM);
        }
      }).catch((err) => {console.log('err',err);});
    },


    perviewPDF(data){
      // 设置pdf.worker.js文件的引入地址
      PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/legacy/build/pdf.worker.entry.js");
      // data是一个ArrayBuffer格式，也是一个buffer流的数据
      PDFJS.getDocument(data).promise.then(pdfDoc=>{
        const numPages = pdfDoc.numPages; // pdf的总页数

        Promise.all(this.promiseAll(pdfDoc,numPages)).then(()=>{
          this.setCanvas();
        })
      })
    },
    
    // 用于保证pdf页码排序正确
    promiseAll(pdfDoc,numPages){
      var arr =[];
      for(let i=1;i<numPages+1;i++){
        arr.push(
          pdfDoc.getPage(i).then(page=>{
            this.pdfDocPage[i-1] = page;
          })
        )
      }
      return arr;
    },

    setCanvas(){
      // this.pdfDocPage保存所有的页
      this.pdfDocPage.map(page=>{
        // 设置canvas相关的属性
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
        this.DOM.appendChild(canvas);
        const dpr = window.devicePixelRatio || 1;
        const bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1;
        const ratio = dpr / bsr;
        
        const viewport = page.getViewport({ scale: 10 });

        // 移动端  进行屏幕适配  canvas图片宽度==手机页面宽度
        // const scale = document.documentElement.clientWidth / viewport.width;

        canvas.width = viewport.width* ratio;
        canvas.height = viewport.height* ratio;
        // console.log('this.DOM',this.DOM.offsetWidth,this.DOM.offsetHeight);
        // canvas.style.width = 1400 + "px";
        canvas.style.width = this.DOM.offsetWidth + "px";
        // canvas.style.height = 800 + "px"; 
        
        // 移动端
        // canvas.style.width = viewport.width*scale + "px";
        // canvas.style.height = viewport.height*scale + "px";
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        // 数据渲染到canvas画布上
        page.render(renderContext);
      })
    }
  }
}
</script>
<style lang='less' scoped>
::v-deep #container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  canvas{
    width: 100%;
    display: block;
  }
}
</style>