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
import axios from "../axios"
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
        meta: {
          title: "首页",
        },
        component: Index
      },
      { // 下拉菜单的个人中心页
        path: '/userCenter',
        name: 'userCenter',
        meta: {
          title: "个人中心",
        },
        // component: ()=> import("@/views/UserCenter.vue")
        component: UserCenter
      },
        /**
         * 由于需要动态绑定路由,
         * 因此下面的三个子路由需要在router.beforeEach中实现
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
         **/
    ]
  },
  {
    path: '/about',
    name: 'About',
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

//重复点击导航时，控制台会报错.增加下面这段代码防止重复点击报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}


// 在这里面判断不同用户的请求路径是否存在
// 首先导入 import axios from "axios"
// 然后在下面的router.beforeEach 导航钩子 中主要用来拦截导航，让它完成跳转或取消。
router.beforeEach((to, fromJson,  next) => {
  // 首先从store中获取hasRoute参数,判断导航栏路由状态是否更新了
  let hasRoute = store.state.menus.hasRoute

  // 增加token判断
  // 首先获取token
  let token = localStorage.getItem("token")
  if(to.path == "/login"){
    // 当path是login,则进行下一步,不用判断token
     next()
  }else if(!token){
    // 当token不存在, 则跳转到login页面
    next({path: "/login"})
  }else if(token && !hasRoute){ // 如果还没有更新过,则进行更新
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

      // 动态绑定路由
      // 1.首先获取当前的路由newRoutes ,即 const routes ={}
      let newRoutes = router.options.routes
      // 2.循环遍历导航栏信息res.data.data.nav,获取其中的子导航项目进行绑定
      res.data.data.nav.forEach(menu => {
        // 3.判断如果此导航标题有子标题,循环获取并绑定每一个子标题
        if(menu.children){
          menu.children.forEach(submenu => {
            // 4.路由转换: 在自定义的方法中实现 获取mockjs中的导航栏信息并转换成route的形式
            let route = menuToRoute(submenu);
            // 5.把路由添加到1获取的当前路由中:
            if (route){
              newRoutes[0].children.push(route)
            }
          })
        }
      })
      // 将当前的新路由添加到 全局的router中
      router.addRoutes(newRoutes)
      // 改变hasRoute的状态
      hasRoute = true
      // 将状态更新到changeRouteStatus方法中保存
      store.commit("changeRouteStatus", hasRoute)
    })
  }
  // 最后必须要有next()才会跳转
  next()

})

// 自定义实现路由转换的方法
const menuToRoute = (menu) => {
  // 1.首先判断 component 是否为空: 不为空才进行路由转换
  if (!menu.component){ return null;}
  // 2.component不为空,进行路由转换
  let route = {
    // 3.根据mockjs中的数据进行转换[这就是具体的转换过程]
    // name: 'SysUser',
    // title: '用户管理',
    // icon: 'el-icon-user',
    // path: '/sys/users',
    // component: 'sys/User',
    // children: []
    name: menu.name,
    path: menu.path,
    meta: {
      icon: menu.icon,
      title: menu.title
    }
  }
  // 3.component与上面的格式不同,所有进行单独转换
  route.component = () => import('@/views/' + menu.component + '.vue')
  // 4.最后返回转换后的路由部分
  return route
}
export default router
