import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default{
    state: {
        // 导航栏模块使用到的全局参数包括两个: 导航列表,用户权限
        menuList: [],
        permList: []
    },
    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus
        },
        setPermList(state, perms) {
            state.permList = perms
        }
    },
    actions: {
    }
}
