<template>
  <div class="loginAndRegin-box" :class="{Box:!loginShow}">
    <div class="login-box" :class="{transform:!loginShow}">
      <h2 v-if="loginShow">登录</h2>
      <h2 v-else>注册</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm login"
      >
        <el-form-item label="账号" prop="name" key="1">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" key="2" v-if="!loginShow">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" key="3">
          <el-input show-password v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" key="4" v-if="!loginShow">
          <el-input
            @blur="confirm(ruleForm.confirmPassword)"
            show-password
            v-model="ruleForm.confirmPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" v-if="loginShow" key="5">
          <div class="authCode-box">
            <el-input v-model="authCode" style="width: 150px"></el-input>
            <div class="authCode-img" @click="cutCode" v-html="svgCode"></div>
          </div>
        </el-form-item>
        <footer>
          <div>
            <el-button
              class="login-button"
              type="primary"
              @click="submitForm('ruleForm','log')"
              v-if="loginShow"
            >立即登录</el-button>
            <el-button
              class="login-button"
              type="primary"
              @click="submitForm('ruleForm','reg')"
              v-if="!loginShow"
            >立即注册</el-button>
          </div>
          <div>
            <div v-if="loginShow">
              没有账号？
              <span @click="cutType(false)">去注册</span>
            </div>
            <div v-if="!loginShow">
              已有账号？
              <span @click="cutType(true)">去登录</span>
            </div>
            <div v-if="loginShow">
              <span>忘记密码？</span>
            </div>
          </div>
        </footer>
      </el-form>
    </div>
  </div>
</template>

<script>
import { findSvg, login, reg } from "../../api/public";
import { encrypt, decrypt } from "@/encryption/aes";
export default {
  name: "login",
  data() {
    return {
      loginShow: true,
      svgCode: "",
      authCode: "",
      ruleForm: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      rules: {
        name: [{ required: true, message: "请输账号", trigger: "blur" }],
        email: [
          { required: true, message: "请输邮箱", trigger: "blur" },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]{6}$/,
            message: "请输入6位数字或英文密码",
            trigger: "blur"
          }
        ],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    cutType(val) {
      this.authCode="";
      this.loginShow = val;
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields();
      });
    },
    confirm(val) {
      if (val !== this.ruleForm.password) {
        this.$message.warning("两次密码不一致！");
      }
    },
    submitForm(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (type == "log") {
            let nameAndPassword =
              this.ruleForm.name + "&&" + this.ruleForm.password;
            let easObj = encrypt(nameAndPassword);
            let data = {
              userInfo: easObj,
              authCode: this.authCode
            };
            login(data).then(res => {
              if (res.status == 200) {
                this.$router.push("/home");
              } else {
                // this.cutCode();
              }
            });
          } else {
            let nameAndPassword =
              this.ruleForm.name + "&&" + this.ruleForm.password;
            let easObj = encrypt(nameAndPassword);
            let data = {
              userInfo: easObj,
              email: this.ruleForm.email
            };
            reg(data).then(res => {
              if (res.status == 200) {
                this.$message.success("注册成功，请登录");
                this.loginShow = true;
                this.$refs.ruleForm.resetFields();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cutCode() {
      findSvg().then(res => {
        if (res.status == 200) {
          this.svgCode = res.data.img;
        }
      });
    }
  },
  created() {
    this.cutCode();
  }
};
</script>
<style >
.login .el-form-item__label {
  color: #fff;
}
.login .el-input__inner {
  color: #fff;
  border: 1px solid rgba(2, 111, 255, 0.5);
  background-color: rgba(0, 0, 0, 0);
}
</style>
<style scoped lang="less">
@import "./login.less";
</style>
