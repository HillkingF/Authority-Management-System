<template>
  <!--<el-menu>中:default-active 使得动态标签有高亮的显示效果-->
  <el-menu
      :default-active="this.$store.state.menus.editableTabsValue"
      class="menu_total el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <!--@open="handleOpen"-->
    <!--@close="handleClose"-->

    <!--导航栏标题-->
    <router-link to="/index">
      <el-menu-item index="0" @click="selectMenu({name:'Index', title:'首页'})">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span><strong class="toolbar-title">主页导航</strong></span>
        </template>
      </el-menu-item>
    </router-link>

    <!--导航栏选项-->
    <el-submenu v-for="menu in menuList" :key="menu" :index="menu.name">
      <template slot="title">
        <i :class="menu.icon"></i>   <!--将图标改成json数组中的值-->
        <span>{{menu.title}}</span> <!--将导航名字改成json数组中的值-->
      </template>

      <router-link :to="item.path" v-for="item in menu.children" :key="item">
        <el-menu-item :index="item.name" @click="selectMenu(item)">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
        </el-menu-item>
      </router-link>
      <!--<router-link to="/sys/roles">-->
      <!--  <el-menu-item index="1-2">-->
      <!--    <template slot="title">-->
      <!--      <i class="el-icon-view"></i>-->
      <!--      <span>角色管理</span>-->
      <!--    </template>-->
      <!--  </el-menu-item>-->
      <!--</router-link>-->
      <!--<router-link to="/sys/menus">-->
      <!--  <el-menu-item index="1-3">-->
      <!--    <template slot="title">-->
      <!--      <i class="el-icon-menu"></i>-->
      <!--      <span>菜单管理</span>-->
      <!--    </template>-->
      <!--  </el-menu-item>-->
      <!--</router-link>-->
    </el-submenu>

    <!--<el-submenu index="2">-->
    <!--  <template slot="title">-->
    <!--    <i class="el-icon-s-tools"></i>-->
    <!--    <span>系统工具</span>-->
    <!--  </template>-->
    <!--  <el-menu-item index="2-1">-->
    <!--    <template slot="title">-->
    <!--      <i class="el-icon-tickets"></i>-->
    <!--      <span>数字字典</span>-->
    <!--    </template>-->
    <!--  </el-menu-item>-->
    <!--</el-submenu>-->


  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {
      //menuList: this.$store.state.menus.menuList
      //     [
      //   {
      //     // 构建菜单栏的json数组
      //     name: 'SysMange',
      //     title: '系统管理',
      //     icon: 'el-icon-location',
      //     path: '',
      //     children: [
      //       {
      //         name: 'SysUser',
      //         title: '用户管理',
      //         icon: 'el-icon-user',
      //         path: '/sys/users',
      //         children: []
      //       }
      //     ]
      //   },
      //   {
      //     name: 'SysTools',
      //     title: '系统工具',
      //     icon: 'el-icon-s-tools',
      //     path: '',
      //     children: [
      //       {
      //         name: 'SysDict',
      //         title: '数字字典',
      //         icon: 'el-icon-tickets',
      //         path: '/sys/dicts',
      //         children: []
      //       }
      //     ]
      //   }
      // ]
    }
  },
  computed: {
    menuList: {
      get() {
        return this.$store.state.menus.menuList
      },
      // set(val) {
      //   this.$store.state.menus.menuList = val
      // }
    }
  },
  methods: {
    // 通过点击事件 向store参数表中传递 标签栏参数
    selectMenu(item){
      this.$store.commit("addTab", item)
    }

  }
}
</script>

<style scoped>
.menu_total {
  height: 100%;
  width: 200px;
  position: fixed;
  background-color: darkslategray;
  /*color: #333;*/
  text-align: left;
  line-height: 200px;
  float: left;
}

.toolbar-title {
  color: moccasin;
  font-size: large;
}

a {
  text-decoration: none;
}

</style>