import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default{
    state: {
        // 导航栏模块使用到的全局参数包括两个: 导航列表,用户权限
        menuList: [],
        permList: [],
        // 定义一个导航栏相关route 是否更新的标志
        hasRoute: false
    },
    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus
        },
        setPermList(state, perms) {
            state.permList = perms
        },
        // 获取导航栏状态是否改变了的方法
        changeRouteStatus(state, hasRoute){
            state.hasRoute = hasRoute
            // sessionStorage.setItem("hasRoute", hasRoute)
        }
    },
    actions: {
    }
}
