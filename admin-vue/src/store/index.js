import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


// 手动引入其他组件模块的参数状态
import menus from "./modules/menus"


export default new Vuex.Store({
  state: {  // state中的变量不能直接操作,需要在mutations中解析
    //这里放全局参数
    token: ''
  },
  mutations: {
    //这里是set方法
    // 为了操作state属性中的变量token,自定义一个SET_TOKEN方法
    SET_TOKEN: (state, token) => {  // 将后端传来的token注入state属性进行存储
      state.token = token
      localStorage.setItem("token", token)
    },
  },
  getters: {
    //get方法
  },
  actions: {
  },
  modules: {
    // 这里是我自己理解的是为了给全局变量分组，
    // 所以需要写提前声明其他store文件，然后引入这里
    menus
  }
})
