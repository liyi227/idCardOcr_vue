<template>
  <div class="login-container">
    <el-form :model="userLoginRuleForm" :rules="userLoginRules" status-icon ref="userLoginRuleForm"
      label-position="left" label-width="0px" class="demo-ruleForm login-page">
      <h3 class="title">欢迎使用考试系统</h3>
      <el-form-item prop="userName">
        <el-input type="text" v-model="userLoginRuleForm.userName" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="passWord" v-model="userLoginRuleForm.password" auto-complete="off" show-password
          placeholder="请输入密码" @keyup.enter.native="submitLoginRuleForm">
        </el-input>
      </el-form-item>
      <!-- <a href="/" id="wjPwd">忘记密码</a> -->
      <el-form-item style="width:100%;margin-top: 20px;">
        <el-button type="primary" style="width:100%;" @click="submitLoginRuleForm" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        logining: false,
        userLoginRuleForm: {
          userName: '',
          password: '',
        },
        userLoginRules: {
          userName: [{
              required: true,
              message: '用户名不能为空',
              trigger: 'blur'
            },
            {
              required: true,
              message: '用户名不能为空',
              trigger: 'change'
            },
            {
              min: 4,
              max: 12,
              message: '用户名为4-12位',
              trigger: 'blur'
            },
            {
              min: 4,
              max: 12,
              message: '用户名为4-12位',
              trigger: 'change'
            }
          ],
          password: [{
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            },
            {
              required: true,
              message: '密码不能为空',
              trigger: 'change'
            },
            {
              min: 4,
              max: 16,
              message: '密码为4-16位，字母加数字',
              trigger: 'blur'
            },
            {
              min: 4,
              max: 16,
              message: '密码为4-16位，字母加数字',
              trigger: 'change'
            }
          ],
        }
        /* ,checked: false */
      }
    },
    methods: {
      submitLoginRuleForm(event) {
        let _this = this;
        var isMeetUserLoginRules = false;//是否符合账号和密码输入规则

        isMeetUserLoginRules = (4 <= _this.userLoginRuleForm.userName.length && _this.userLoginRuleForm.userName
            .length <=
            12) &&
          (4 <= _this.userLoginRuleForm.password.length && _this.userLoginRuleForm.password.length <= 16);

        if (isMeetUserLoginRules) {
          _this.$refs.userLoginRuleForm.validate((valid) => {

            _this.axios.post('http://127.0.0.1:8081/user/login', _this.userLoginRuleForm)
              .then(response => {
                console.log(response);

                var resultCode = response.data.code;
                var resultMsg = response.data.msg;
                if (resultCode == 1) {
                  _this.$message({
                    message: '登录成功',
                    type: 'success',
                  });
                  // var resultUserList = response.data.list[0];
                  // console.log(resultUserList);
                  // sessionStorage.setItem("userName", resultUserList.userName);
                  // sessionStorage.setItem("realName", resultUserList.realName);
                  // sessionStorage.setItem("department", resultUserList.department);
                  // sessionStorage.setItem("userRole", resultUserList.userRole);
                  _this.$router.push({
                    path: "/testIdCardOcr"
                  })
                } else if (resultCode == -1) {
                  _this.$message({
                    message: resultMsg,
                    type: 'error',
                  });
                }
              })
              .catch(error => {
                console.log(error);
                console.log("登录异常，请联系管理员！");
              })
          })
        }



      }
    }
  };
</script>

<style scoped>
  .login-container {
    width: 100%;
    height: 100%;
  }

  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 10px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  /*  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  } */
  #wjPwd {
    text-decoration: none;
    color: #409EFF;
  }

  #wjPwd:hover {
    color: orange;
  }
</style>
