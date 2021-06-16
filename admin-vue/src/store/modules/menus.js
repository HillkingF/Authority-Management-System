import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default{
    state: {
        // 导航栏模块使用到的全局参数包括两个: 导航列表,用户权限
        menuList: [],
        permList: [],

        // 定义一个导航栏相关route 是否更新的标志
        hasRoute: false,

        // 标签页动态定制相关的状态
        editableTabsValue: 'Index',
        editableTabs: [{
            title: '首页',
            name: 'Index',
        }],

    },
    mutations: {

        // 导航栏相关参数的获取
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
        },

        // addTab(): 动态添加标签: 修改state参数表中的参数 editableTabs 和 editableTabsValue
        addTab(state, tab) {
            state.editableTabsValue = tab.name;
            state.editableTabs.push({
                title: tab.title,
                name: tab.name,
            });
        },
    },
    actions: {
    }
}
