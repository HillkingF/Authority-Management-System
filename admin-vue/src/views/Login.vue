<template>
  <!--template 只能有一个直系儿子-->
  <div id="bg">
    <div id="div-title">
      <h1 id="title-font"> Authority Management System </h1>
    </div>
    <div class="div-middle">
      <div class="div-bottom-middle"></div>
      <div class="div-bottom-middle">
        <div id="form-bg">
          <h2 id="login-font">Login</h2>
          <!--带有验证的表单:从文档复制来的,自己修改了部分内容-->
          <!--rules 属性传入约定的验证规则-->
          <!--prop 属性设置为需校验的字段名-->
          <!--设置表单: ref 绑定控件-->
          <!--:model是v-bind:model的缩写,用于绑定数据.v-model实现双向绑定数据-->
          <el-form :model="loginForm" :rules="rules"
                   ref="loginForm" label-width="25%"
                   class="demo-loginForm" label-position="left"
                   size="mini">
            <el-form-item label="账  号" class="label-font"  prop="username" >
              <el-input v-model="loginForm.name" placeholder="Username" class="inputtext"></el-input>
            </el-form-item>
            <el-form-item label="密  码"  class="label-font" prop="password">
              <el-input  v-model="loginForm.name" placeholder="Password" class="inputtext"></el-input>
            </el-form-item>
            <el-form-item label="验证码" class="label-font-code" prop="code" >
              <el-input v-model="loginForm.name" placeholder="Check Code" class="inputcode inputtext"></el-input>
              <!--这个元素用于防止校验码图像,src是图像路径-->
              <el-image src="" class="codeimg"></el-image>
            </el-form-item>

            <!--<el-form-item>-->
            <!--  -->
            <!--</el-form-item>-->
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>

          </el-form>

        </div>
      </div>
      <div class="div-bottom-middle"></div>
    </div>
    <div id="div-bottom">
      <!--可以在这里写联系方式-->
    </div>
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
#bg{
  background:url("../assets/bg1.jpg");
  /*大小设置为100%*/
  width:100%;
  height:100%;
  position: fixed;
  background-size:100% 100%;
  margin: -10px -10px -10px -10px;
  /*display: flex;*/
  /*align-items: center;*/
}
#div-title {
  width:100%;
  height:20%;
}
#title-font{
  color: white;
  text-align:center;
  padding: 3% 2% 9% 2%;
  /*自适应调整字体大小*/
  font-size: 4vw;
}
.div-middle{
  width:100%;
  height:55%;
  display: flex; /*将子元素设置成一行: 并等分*/
}
.div-bottom{
  width:100%;
  height:20%;
}
.div-bottom-middle{
  flex: 1; /*将子元素设置成一行: 并等分*/
}
#form-bg {
  height: 100%;
  width: 100%;
  /*使用rgba设置半透明的背景色*/
  background: rgba(248,248,255,0.5);
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
#login-font{
  font-size: 2vw;
  padding: 6% 2% 6% 2%;
  opacity:1
}
.el-form {
  padding: 0 2% 6% 5%;
}
.label-font{
  font-size: 1vw;
  padding: -10px 0 0 0;
}
.label-font-code{
  font-size: 1vw;
}
.inputtext{
  float: left;
  width: 80%;
  height: 100%;
  flex: 1; /*将子元素设置成一行: 并等分*/
}
.inputcode{
  width: 55%;
  height: 100%;
  flex: 1;
}
.codeimg{
  float: left;
  margin-left: 8px;
}



</style>






