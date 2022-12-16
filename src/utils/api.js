import {request} from "@/utils/request.js";
export default {
  common:{
    // 上传组件
    upload(data){return request({url:'common/upload',method:'post',data,headers: {'Content-Type': 'multipart/form-data'},opt:{loading:false}})},
  }
}