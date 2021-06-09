import Vue from 'vue'
import VueRouter from 'vue-router'
// 1.手动导入需要使用路由的页面
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'  // 1.默认显示页面
import Login from '../views/Login.vue'  // 2.登录首页
// 2. 导入home页面的sys目录下的子路由
import Menu from "@/views/sys/Menu";
import Role from "@/views/sys/Role";
import User from "@/views/sys/User";
import UserCenter from "@/views/UserCenter";
import axios from "axios"
// 导入全局参数的目录store
import store from "../store"

Vue.use(VueRouter)

// 新增的路由在routes中增加
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[   // 创建home页面的子路由
      {
        // 将index作为home的子页面, 完整请求是 : http://localhost:8080/index
        path: '/index',
        name: 'Index',
        component: Index
      },
      { // 下拉菜单的个人中心页
        path: '/userCenter',
        name: 'userCenter',
        // component: ()=> import("@/views/UserCenter.vue")
        component: UserCenter
      },
      {
        path: '/sys/users',
        name: 'SysUser',
        component: User
      },
      {
        path: '/sys/roles',
        name: 'SysRole',
        component: Role
      },
      {
        path: '/sys/menus',
        name: 'SysMenu',
        component: Menu
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 在这里面判断不同用户的请求路径是否存在
// 首先导入 import axios from "axios"
// 然后在下面的router.beforeEach 导航钩子 中主要用来拦截导航，让它完成跳转或取消。
router.beforeEach((to, fromJson,  next) => {
  // axios.get: 发起获取左侧导航栏信息的请求
  axios.get("/sys/menu/nav", {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  }).then(res => {
    // 从mockjs中获取result返回值: nav和 authoritys
    // 拿到 menuList信息 nav
    store.commit("setMenuList", res.data.data.nav);

    // 拿到用户权限: authoritys
    store.commit("setPermList", res.data.data.authoritys);

  })
  next()  // 必须要有next()才会跳转
})

export default router
