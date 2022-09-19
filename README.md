## About

此项目是基于vue-cli3.x构建的,基于vant框架的h5模板。
## 技术栈
vue2 + vuex + vue-router +  + ES6/7 + sass + vant

## 环境
```
npm 6.14.8
node 14.15.1
yarn 1.22.10
```

## 
```
接口请求设置后端返回设置 cache-control: no-cache, no-store, max-age=0, must-revalidate
// ios从公众号页面返回不请求接口处理
ios(){
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if(isiOS){
    window.onpageshow =(event)=>{
      if (event.persisted || window.performance && window.performance.navigation.type == 2) {
        //接口请求
      }
    };
  }
}
```

## 目录结构
```
├── public                     # 静态资源
│   └── index.html             # html模板
├── src                        # 源代码
│   ├──static                  # 图片、字体等静态资源 (存放不会变动的文件，不会被webpack处理)
        ├──css                 # css
        ├──images              # 图片
        ├──js                  # 公共js
            ├──config（文件夹） # 公共方法拆分的js文件
              ├──idCard        # 身份证处理相关
              ├──kCompass      # 图片压缩
              ├──loading       # 全局动画加载
              ├──url           # 地址栏处理相关
              ├──zlb           # 浙里办支付宝相关
            ├──index           # 全局主动注册公共组件
            ├──config          # 公共方法
            ├──request         # 公共请求封装
            ├──validator       # 提交校验
    ├──assets                  # 图片、字体等资源  （存放会变动的文件，会被webpack处理）
        ├──images              # 图片
        ├──less                # 自定义全局less
    ├── mixins                 # 代码混入
        ├──keepAlive           # 页面缓存
│   ├── components             # 全局公用组件
        ├──common              # 全局公共组件（“自动注册” 遵循一个文件夹里面定义index.vue格式，文件夹名称作为全局组件使用名称）
        ├──code                # 发送验证码倒计时
        ├──qrcode              # 生产二维码
        ├──swiper              # 轮播图
        ├──upload              # 上传图片
        ├──webSocket           # webSocket链接
│   ├── router                 # 路由
│   ├── store                  # 全局store管理
│   ├── utils                  # 全局公用方法
        ├── api                # 请求接口配置
        ├── plugins            # 插件引入
│   ├── views                  # views所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
├── .borwserslistrc            # 浏览器兼容相关
├── .env.xxx                   # 环境变量配置（dev:本地环境，prod：生产环境，test：测试环境）;
├── .eslintrc.js               # eslint 配置项
├── .gitignore.js              # git忽略文件设置
├── .babelrc.config.js         # babel-loader 配置
├── package.json               # package.json
├── postcss.config.js          # postcss 配置
└── vue.config.js              # vue-cli 配置
```
## 1.懒加载图片组件使用
```
<section v-for="(item,index) in imgList" :key="index">
  <img v-lazy="item.img" alt="" style="width:200px;height:200px;">
</section>

imgList:[
  {name:"1",menuId:'1',img:require('@/static/images/nodata.png')},
  {name:"2",menuId:'10013',img:require('@/static/images/nodata.png')},
]

// v-lazy 单独配置 自定义加载以及错误图片
computed:{
  LazyloadImg(){
    return (img)=>{
      return {
        src: img,
        error: require('@/assets/images/health.png'),
        loading: require('@/assets/images/health.png'),
      }
    }
  }
},
```

## 2.原生scroll（单页面无切换）如果有切换请看示例
```
<Scroll ref="scroll" @scroll="getData">
  <div class="list"  v-for='(item,index) in dataList' :key='index'>
    {{item.name}} -- {{item.age}}
  </div>
</Scroll>

<script>
import keepAlive from '@/mixins/keepAlive.js'
export default {
  mixins:[keepAlive],
  data () {
    return {
      init:false,

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
    // 如果不是从详情页进入  重新加载
    if(!this.$route.meta.isBack){
      this.dataList = [];
      this.count = 1;
      this.$refs.scroll.status =3;
      this.getData();
    }else if(!this.init){
      this.init = true;
    }
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
    },
  }
}
</script>
```
## 3上传图片组件
```
<upload :mode="false" path='fullUrl' :max='3' @change="changeUpload">
  //自定义icon
  <template v-slot:icon>
    <van-icon name="photograph" size="25" />
  </template>
</upload>

methods:{
  changeUpload({name,value}){
    
  },
}
```

### Props

| 参数 | 说明                                         | 类型   | 默认值 |
| :--- | -------------------------------------------- | :----- | :----- |
| max  | *最大上传数*                                 | Number | 1      |
| path | *上传接口返回图片字段*（预览展示的图片地址） | String | path   |
| name | *用于父组件接受已上传的图片名称*             | String | upload |
| mode | *上传ui模式(false:背景色模式 true:虚线模式)*             | Boolean | false |

### Events

| 事件名  | 说明     | 回调参数                  |
| :------ | -------- | :------------------------ |
| @change | 上传回调 | {name:String,value:Array} |

## 4.Qrcode 二维码
```
<Qrcode code='二维码组件' color="#ff3"></Qrcode>
```
### Props
| 参数 | 说明                                         | 类型   | 默认值 |
| :--- | -------------------------------------------- | :----- | :----- |
| code  | 二维码值                                 | String | Qrcode      |
| color | 二维码颜色 | String | |

