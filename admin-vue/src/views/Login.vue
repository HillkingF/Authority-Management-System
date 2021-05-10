<template>
  <!--template 只能有一个直系儿子-->
  <div id="login-bg">  <!--最外层的背景图-->
    <!--第1-3行: 空白行,占位置位置.span属性默认每一行是24个栅格-->
    <el-row type="flex" justify="center" align="center">
      <el-col :span="24"><div><h1></h1></div></el-col>
    </el-row>
    <el-row type="flex" justify="center" align="center">
      <el-col :span="24"><div><h1></h1></div></el-col>
    </el-row>
    <el-row type="flex" justify="center" align="center">
      <el-col :span="24"><div><h1></h1></div></el-col>
    </el-row>
    <!--第4行: 标题行.栅格在center水平位置及垂直位置-->
    <el-row type="flex" justify="center" align="center">
      <el-col>
        <div><h1 id="title-font"> Authority Management System </h1></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="center">
      <el-col :span="24"><div><h1></h1></div></el-col>
    </el-row>

    <!--第5行: 设置大表单:最外层的是半透明的边框-->
    <el-row  type="flex" justify="center">
      <el-col :span="8">
        <div id="form-bg">
          <!--设置表单内的标题-->
          <h2 id="login-font">Login</h2>

          <!--带有验证的表单:从文档复制来的,自己修改了部分内容-->
          <!--rules 属性传入约定的验证规则-->
          <!--prop 属性设置为需校验的字段名-->
          <!--设置表单: ref 绑定控件-->
          <!--:model是v-bind:model的缩写,用于绑定数据-->
          <el-form :model="loginForm" :rules="rules"
                   ref="loginForm" label-width="100px"
                   class="demo-loginForm" label-position="left" size="mini">
            <el-form-item label="账号" prop="username">
              <el-input v-model="loginForm.name" placeholder="请输入数字字母的组合"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.name" placeholder="请输入数字字母的组合"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input v-model="loginForm.name" placeholder="点击图片刷新"></el-input>
              <!--这个元素用于防止校验码图像,src是图像路径-->
              <el-image src=""></el-image>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>

        </div>
      </el-col>
    </el-row>
    <!--底部占位留白的行-->
    <el-row type="flex" justify="center" align="center">
      <el-col :span="24"><div><h1></h1></div></el-col>
    </el-row>
    <el-row type="flex" justify="center" align="center">
      <el-col :span="24"><div><h1></h1></div></el-col>
    </el-row>
    <el-row type="flex" justify="center" align="center">
      <el-col :span="24"><div><h1></h1></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
      },
      // 表单校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '长度为 5 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
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
#title-font{
  color: white;
}
#form-bg {
  /*background-color: transparent;*/
  height: 80%;
  padding: 20% 20% 20% 20%;
  background: #f9fafc;
  opacity:0.5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
#login-font{
  font-size: larger;
  position: relative;
  z-index:1100;   /*设置图层不起作用*/
  opacity:1
}

</style>






