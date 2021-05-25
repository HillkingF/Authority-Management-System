import axios from "axios";
import router from "./router";
import Element from "element-ui";
import {createConfig} from "http-proxy-middleware/dist/config-factory";
import {responseInterceptor} from "http-proxy-middleware";

// 定义axios的全局URL,不能与项目的url一样8080, 所以这里设置成8081端口
// 这里暂时先不用这个url
// axios.defaults.baseURL = "http://localhost:8081"



// 定义一个对象, 可以统一设置超时时间等属性
const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': "application/json; charset=utf-8"
    }
})
// 下面进行拦截
// 首先拦截request请求
request.interceptors.request.use(config=>{
    config.headers['Authorization'] = localStorage.getItem("token")
    return config
})
// 然后拦截response响应
request.interceptors.response.use(response=>{
    let res = response.data // 获取response的数据西信息
    if (res.code === 200){ // 如果响应码是200,说明返回信息没有问题
        return response // 直接继续传递response
    }else{  // 如果响应码有问题,则拦截并报警
        Element.Message.error(!res.msg? '系统异常': res.msg)
        return Promise.reject(response.data.msg)  // 拒绝信息
    }
}, error =>{  // 如果过程中出现了一些异常,可以进一步判断 状态码是不是401等
    if (error.response.data){
        error.message = error.response.data.msg
    }
    if (error.response.status === 401){
        router.push("/login")
    }
    Element.Message.error(error.message,  {duration: 3000})
    return Promise.reject(error)
})
// 最后将request进行export
export default request