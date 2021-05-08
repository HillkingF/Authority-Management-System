<template>
  <!--template 只能有一个直系儿子-->
  <div id="login-bg">  <!--最外层的背景图-->
    <h1>xianshi</h1>
    <!--第一行-->
    <el-row type="flex" justify="center" align="center">
      <el-col :span="3">
        <div class="grid-content bg-purple-dark">
          <h1>首页</h1>
        </div>
      </el-col>
    </el-row>



  </div>
</template>

<script>
export default {
  name: "Login"
}
</script>

<style scoped>
/*设置登录页的背景图像*/
#login-bg{
  background:url("../assets/bg1.jpg");
  /*大小设置为100%*/
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}

</style>






