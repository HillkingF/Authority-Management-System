<template>
  <el-menu
      default-active="2"
      class="menu_total el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <!--@open="handleOpen"-->
    <!--@close="handleClose"-->

    <!--导航栏标题-->
    <router-link to="/index">
      <el-menu-item>
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span><strong class="toolbar-title">主页</strong></span>
        </template>
      </el-menu-item>
    </router-link>

    <!--导航栏选项-->
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>系统管理</span>
      </template>

      <router-link to="/users">
        <el-menu-item index="1-1">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>用户管理</span>
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/roles">
        <el-menu-item index="1-2">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>角色管理</span>
          </template>
        </el-menu-item>
      </router-link>
      <router-link to="/menus">
        <el-menu-item index="1-3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>菜单管理</span>
          </template>
        </el-menu-item>
      </router-link>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span>系统工具</span>
      </template>
      <el-menu-item index="2-1">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>数字字典</span>
        </template>
      </el-menu-item>
    </el-submenu>


  </el-menu>
</template>

<script>
export default {
  name: "SideMenu"
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
  color: #FFA500;
}

</style>