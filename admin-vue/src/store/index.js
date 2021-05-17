import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  // state中的变量不能直接操作,需要在mutations中解析
    token: ''
  },
  mutations: {
    // 为了操作state属性中的变量token,自定义一个SET_TOKEN方法
    SET_TOKEN: (state, token) => {  // 将后端传来的token注入state属性进行存储
      state.token = token
      localStorage.setItem("token", token)
    }
  },
  actions: {
  },
  modules: {
  }
})
