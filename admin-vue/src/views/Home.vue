<template>
  <el-container id="all">
    <el-aside width="200px">
      <!--3. 使用已经引用的侧边栏的包-->
      <SideMenu></SideMenu>
    </el-aside>

    <el-container id="all1">
      <el-header id="header">
        <!-- 嵌入头部-->
        <Header></Header>
      </el-header>
      <el-main id="el-main">
        <!--添加标签页-->
        <Tabs></Tabs>
        <!--当浏览器请求/index会异步显示这部分局部页面-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 1.引入SideMenu 侧边栏的包文件
import SideMenu from "@/views/inc/SideMenu";
import Header from "@/views/inc/Header";
import Tabs from "./inc/Tabs";
export default {
  name: "Home",
  components: {
    Header,
    SideMenu,
    Tabs
  }
}
</script>

<!--css 样式表 =====================================-->
<style scoped>
/*设置最大的容器*/
#all{
  padding: 0;
  margin: -10px -10px -10px -10px;
  height: 100%;
  width:100%;
  position: fixed;
}
/*设置其中右侧的容器样式*/
#all1{
  padding: 0;
  margin: 0;
  height: 100%;
}
#header{
/*设置右侧头部框*/
  background-color: palegoldenrod;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 20%;
}
/*设置右下主界面*/
#el-main {
  background-color: lightgoldenrodyellow;
  color: #333;
  text-align: center;
  /*line-height: 160px;*/
  height: 80%;
  padding: 0px;
}

</style>