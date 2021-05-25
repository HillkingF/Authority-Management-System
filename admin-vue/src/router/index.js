import Vue from 'vue'
import VueRouter from 'vue-router'
// 1.手动导入需要使用路由的页面
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'  // 1.默认显示页面
import Login from '../views/Login.vue'  // 2.登录首页

Vue.use(VueRouter)

// 新增的路由在routes中增加
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 将index作为home的子页面
    children:[
      {
        // 完整哇请求是 : http://localhost:8080/index
        path: '/index',
        name: 'Index',
        component: Index
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
