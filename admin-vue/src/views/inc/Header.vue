<template>
  <el-header id="header">
    <strong>后台管理界面</strong>
    <div class="headimg">
      <!--头像框-->
      <!--:src 传入用户头像-->
      <el-avatar :src="userInfo.avatar" class="userimg" size="medium" >User</el-avatar>

      <!--下拉菜单-->
      <el-dropdown class="dropdown">
        <span class="el-dropdown-link">
          <!--传入用户名-->
          {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <!--<router-view></router-view>-->
            <router-link :to="{name: 'userCenter'}">个人中心</router-link>
            <!--<router-link to="/userCenter">个人中心</router-link>-->
          </el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!--页面内的网页跳转-->
      <el-link class="el-link-1" href="https://www.baidu.com/" target="_blank">网站</el-link>
      <el-link href="https://www.bilibili.com/video/BV1af4y1s7Wh?p=10&spm_id_from=pageDriver" target="_blank">视频</el-link>
    </div>
  </el-header>
</template>

<script>
import SideMenu from "@/views/inc/SideMenu";

export default {
  name: "Header",
  data(){
    return {   // 向这个页面(头部)返回用户信息
      userInfo: {
        id: "",
        username: "",
        avatar: ""
      }
    }
  },
  methods: { // 在methods中定义用户方法
    getUserInfo(){
      this.$axios.get("/sys/userInfo").then(res=>{
        this.userInfo = res.data.data
      })
    }
  },
  created() { // 接收调用用户方法
    this.getUserInfo()  // 页面加载的时候获取用户信息
  }
}
</script>

<style scoped>
#header{
  background-color: palegoldenrod;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 20%;
}
/*设置头像框div*/
.headimg{
  width: 250px;
  /*向右侧浮动,保持行内水平*/
  float: right;
  /*设置上下居中*/
  display: flex;
  align-items: center;
}
/*设置头像*/
.userimg{
  /*设置右侧外部间隔*/
  margin-right: 8px;
  /*设置背景图像*/
  /*background-image: url("../../assets/touxiang.png");*/
  /*设置背景图像的大小*/
  /*background-size: cover;*/
}
/*下拉框*/
.dropdown{
  margin-right: 8px;
}
.el-link-1{
  margin-right: 8px;
}
/*设置下拉菜单属性*/
.el-dropdown-link {
  cursor: pointer;
  color: #6A5ACD;
  /*color: #409EFF;*/
}
.el-icon-arrow-down {
  font-size: 12px;
}
#header{
  /*设置右侧头部框*/
  background-color: palegoldenrod;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 20%;
}

</style>