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

export default router
