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
            //index = -1 表示此标签还没有出现过
            let index = state.editableTabs.findIndex(e => e.name === tab.name)
            if (index === -1){
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.name,
                });
            }
            state.editableTabsValue = tab.name;
        },

        // 下拉菜单的退出
        resetState: (state) => {
            state.menuList = []
            state.permList = []
            state.hasRoute = false
            state.editableTabsValue = 'Index'
            state.editableTabsValue = 'Index'
            state.editableTabs = [{
                title: '首页',
                name: 'Index',
            }]
        }
    },
    actions: {
    }
}
