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
          <!--:model是v-bind:model的缩写,用于绑定到return中的数据loginForm. v-model实现双向绑定数据:前端输入,vue字段接收;反之也成立-->
          <!--ref="loginForm": 注册对象-->
          <el-form :model="loginForm" :rules="rules"
                   ref="loginForm" label-width="25%"
                   class="demo-loginForm" label-position="left"
                   size="mini">
            <el-form-item label="账  号" class="label-font"  prop="username" >
              <el-input v-model="loginForm.username" placeholder="Username" class="inputtext"></el-input>
            </el-form-item>
            <el-form-item label="密  码"  class="label-font" prop="password">
              <el-input  v-model="loginForm.password" placeholder="Password" class="inputtext"></el-input>
            </el-form-item>
            <el-form-item label="验证码" class="label-font-code" prop="code" >
              <el-input v-model="loginForm.code" placeholder="Check Code" class="inputcode inputtext"></el-input>
              <!--这个元素用于防止校验码图像,src是图像路径-->
              <!--开发验证码功能,设置参数v-bing:src=captchaImg-->
              <el-image :src="captchaImg" class="codeimg" ></el-image>
            </el-form-item>

            <!--<el-form-item>-->
            <!--  -->
            <!--</el-form-item>-->
            <!--点击处罚按钮事件-->
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
        // token用于获取验证码生成的随机码
        token: ''
      },
      // 表单校验规则
      rules: {
        username: [
          //  trigger:blur 当失去焦点的时候,触发规则验证
          // required: true 表示这个是必填选项
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '长度为 5 个字符', trigger: 'blur' }
        ]
      },
      // 在return 中新增captchaImg捕获验证码图像
      captchaImg: null
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { // 如果校验成功可以登录
          console.log("有效")
          // 设置登录成功后的效果:从this.loginForm获取前端的结果
          // ajax技术实现了网页的局部数据刷新，axios实现了对ajax的封装。axios：提供了一些并发请求的接口（重要，方便了很多的操作）
          this.$axios.post('/login', this.loginForm).then(res =>{
            // 登录校验成功后,服务器会将JWT封装在header中并返回给客户端,
            // 客户端应该将jwt信息保存.之后每一次访问都将jwt发给后端用来快速验证
            const jwt = res.headers['authorization']  // 1.获取jwt
            // 2.浏览器存储jwt
            this.$store.commit("SET_TOKEN", jwt)

            // 完成以上工作后就可以进行界面跳转了,使用router进行跳转
            this.$router.push("/index")
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置信息
    resetForm(formName) {
      console.log("重置")
      this.$refs[formName].resetFields();
    },
    // 捕获验证码图片的方法
    getCaptcha(){
      console.log("daying");
      // 点击验证码图片位置向后端发起异步请求,刷新创建新的验证码图片
      this.$axios.get('/captcha').then(res =>{
        // 获取验证码对应的随机码
        this.loginForm.token = res.data.data.token  // res.data表示结果, 第二个data表示结果中的属性data
        // 获取验证码图像
        this.captchaImg = res.data.data.captchaImg
        console.log(this.loginForm.token)
        console.log(this.captchaImg)
      })
    }

  },
  // 一般可以在created函数中调用ajax获取页面初始化所需的数据。
  created() {
    this.getCaptcha();   // 调用登录页验证码请求,来显示初始验证码
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
  width: 60px;
  height: 30px;
  margin-left: 8px;
  border-radius: 4px;
}



</style>






