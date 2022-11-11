import {request} from "@/utils/request.js";
export default {
  common:{
    // 上传组件
    upload(data){return request({url:'',method:'post',data,headers: {'Content-Type': 'multipart/form-data'}})},
  }
}