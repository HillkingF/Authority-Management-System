import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 手动1: 引入Element-ui依赖并显式的使用
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
Vue.use(Element)
// 手动2: 引入axios
// import axios from 'axios'
import axios from "./axios"  // 用自定义的axios代替默认的axios

// 引入自定义的全局权限文件
import global from './globalFun'

Vue.prototype.$axios = axios
// 手动3: 引入mock数据,用来编写随机数据的api
require("./mock.js") //引入mock数据，关闭则注释该行

Vue.config.productionTip = false

// 这里就是主程序入口了,启动后默认请求路径会进入App.vue
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
