<template>
  <div>
    <el-form id="form1" :model="passForm" status-icon :rules="rules" ref="passForm" label-width="100px" class="demo-ruleForm">
      <h2 id="tit1">修改密码</h2>
      <el-form-item label="旧密码" prop="currentPass">
        <el-input type="password" v-model="passForm.currentPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="passForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="passForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('passForm')">提交</el-button>
        <el-button @click="resetForm('passForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passForm.password) {
        callback(new Error('两次输入的密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      userInfo: {
      },
      passForm: {
        password: '',
        checkPass: '',
        currentPass: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在6到12个字符', trigger: 'blur'}
        ],
        checkPass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        currentPass: [
          { required: true, message: '请输入当前密码', trigger: 'blur' }
        ]
      }
    };
  },
  created(){
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$axios.get("/sys/userInfo").then(res => {
        this.userInfo = res.data.data;
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post('/sys/user/updataPass', this.passForm).then(res => {
            _this.$alert(res.data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$refs[formName].resetFields();
              }
            });
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      console.log("重置")
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
#form1{
  /*text-align: center;*/
  width: 420px;
  margin: -20px auto;
}
#tit1 {
  margin-bottom: -20px;
  color: cornflowerblue;
  text-shadow: 1px 1px 8px sandybrown;
}
</style>