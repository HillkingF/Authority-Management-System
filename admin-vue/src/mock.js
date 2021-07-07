// 引入mockjs,创建mockjs对象
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// 模拟数据的封装
let Result = {
    code: 200,
    msg: '操作成功',
    data: null
};
//模拟'/captcha'请求的返回结果:即模拟点击验证码图像后的响应结果
Mock.mock('/captcha', "get", () =>  {
    // 点击验证码图像响应后的返回结果:
    // 验证码的响应需要两个结果:token随机码和验证码图像
    Result.data = {
        // 生成的token随机码是一个32为数据
        token: Random.string(32),
        captchaImg: Random.dataImage('100x50', 'pn454')  // 注意这里的x是英文字母x,不然会报错
    }
    return Result
})


//模拟'/login'请求的返回结果:即模拟用户登录信息响应
Mock.mock('/login', "post", () =>  {
    Result.code=200   // 这里设置成200就可以进入主页, 设置成401就无法进入主页
    Result.msg = "正确"
    // 无法在header中传入jwt
    return Result
})

//模拟'/sys/userInfo' 请求  获取用户信息
Mock.mock('/sys/userInfo', "get", () =>  {
    Result.data = {
        // 根据Header.vue中data() return的结果,返回对应的用户信息
        id: "1",
        username: "nini",
        avatar: "https://img.zcool.cn/community/01129957723f4b0000018c1b6692bb.jpg@1280w_1l_2o_100sh.jpg"
    }
    return Result
})

// 模拟退出 的数据
Mock.mock('/logout', "post", () =>  {
    return Result
})


Mock.mock('/sys/menu/nav', "get", () =>  {
    // nav中是导航栏的信息
    let nav = [
        {
            // 构建菜单栏的json数组
            name: 'SysMange',
            title: '系统管理',
            icon: 'el-icon-location',
            path: '',
            component: '',
            children: [
                {
                    name: 'SysUser',
                    title: '用户管理',
                    icon: 'el-icon-user',
                    path: '/sys/users',
                    component: 'sys/User',
                    children: []
                },
                {
                    name: 'SysRole',
                    title: '角色管理',
                    icon: 'el-icon-view',
                    path: '/sys/roles',
                    component: 'sys/Role',
                    children: []
                },
                {
                    name: 'SysMenu',
                    title: '菜单管理',
                    icon: 'el-icon-menu',
                    path: '/sys/menus',
                    component: 'sys/Menu',
                    children: []
                },

            ]
        },
        {
            name: 'SysTools',
            title: '系统工具',
            icon: 'el-icon-s-tools',
            path: '',
            component: '',
            children: [
                {
                    name: 'SysDict',
                    title: '数字字典',
                    icon: 'el-icon-tickets',
                    path: '/sys/dicts',
                    component: '',
                    children: []
                }
            ]
        }
    ]
    // authoritys是用户权限信息
    let authoritys = []
    // 将两个信息放到返回的结果中
    Result.data = {
        nav: nav,
        authoritys: authoritys
    }
    return Result
})

// 菜单管理界面主体部分,树形表单项数据模拟
Mock.mock('/sys/menu/list', 'get', ()=>{
    let menus = [
        {
            "id": 1,
            "created": "2021-01-15T18:58:18",
            "updated": "2021-01-15T18:58:20",
            "statu": 1,
            "parentId": 0,
            "name": "系统管理",
            "path": "",
            "perms": "sys:manage",
            "component": "",
            "type": 0,
            "icon": "el-icon-s-operation",
            "orderNum": 1,
            "children": [
                {
                    "id": 2,
                    "created": "2021-01-15T19:58:18",
                    "updated": "2021-01-15T19:58:20",
                    "statu": 1,
                    "parentId": 1,
                    "name": "用户管理",
                    "path": "/sys/users",
                    "perms": "sys:user:list",
                    "component": "sys/User",
                    "type": 1,
                    "icon": "el-icon-s-custom",
                    "orderNum": 1,
                    "children": []
                },
                {
                    "id": 3,
                    "created": "2021-01-15T20:58:18",
                    "updated": "2021-01-15T20:58:20",
                    "statu": 1,
                    "parentId": 1,
                    "name": "角色管理",
                    "path": "/sys/roles",
                    "perms": "sys:role:list",
                    "component": "sys/Role",
                    "type": 1,
                    "icon": "el-icon-rank",
                    "orderNum": 2,
                    "children": []
                },

            ]


        }
    ]
    Result.data = menus
    return Result
})


// 模拟主体界面  编辑  更新本行数据后的结果
Mock.mock(RegExp('/sys/menu/info/*'), 'get', ()=>{
    Result.data = {
        "id": 3,
        "statu": 1,
        "parentId": 1,
        "name": "角色管理",
        "path": "/sys/roles",
        "perms": "sys:role:list",
        "component": "sys/Role",
        "type": 1,
        "icon": "el-icon-rank",
        "orderNum": 2,
        "children": []

    }
    return Result
})

// 菜单主界面  新增后 提交后的返回值
Mock.mock(RegExp('/sys/menu/*'), 'post', ()=>{
    return Result
})


// 模拟角色管理  界面主体部分,表单项数据模拟
Mock.mock(RegExp('/sys/role/list*'), 'get', ()=>{
    Result.data = {
        "records": [
            {
                "id": 3,
                "created": "2021-01-15T18:58:18",
                "updated": "2021-01-15T18:58:20",
                "statu": 1,
                "name": "普通用户",
                "code" : "normal",
                "remark" : "只有基本查看功能",
                "menuIds" : []

            },
            {
                "id": 6,
                "created": "2021-01-15T18:58:18",
                "updated": "2021-01-15T18:58:20",
                "statu": 1,
                "name": "超级管理员",
                "code" : "admin",
                "remark" : "拥有所有功能",
                "menuIds" : []
            }
        ],
        "total": 2,
        "size": 10,
        "current" : 1,
        "orders" : [],
        "optimizeCountSql" : true,
        "hitCount": false,
        "countId" : null,
        "maxLimit": null,
        "searchCount" : true,
        "pages": 1
    }
    return Result
})

// 角色管理主界面  的返回值
Mock.mock(RegExp('/sys/role/info/*'), 'get', ()=>{
    Result.data = {
        "id": 6,
        "created": "2021-01-15T18:58:18",
        "updated": "2021-01-15T18:58:20",
        "statu": 1,
        "name": "超级管理员",
        "code": "admin",
        "remark": "系统默认最高权限,不可以编辑和任意修改",
        "menuIds": []
    }
    return Result
})

// 菜单主界面  新增后 提交后的返回值
Mock.mock(RegExp('/sys/role/*'), 'post', ()=>{
    return Result
})
