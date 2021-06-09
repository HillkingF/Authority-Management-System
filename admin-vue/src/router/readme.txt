路由跳转前做一些验证，比如登录验证（未登录去登录页），是网站中的普遍需求。
对此，vue-route 提供的 beforeRouteUpdate 可以方便地实现导航守卫
（navigation-guards）。