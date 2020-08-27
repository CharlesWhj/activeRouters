<template>
  <div class="login">
    <div class="login-main">
      <el-card shadow="always">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.name" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-form>
        <el-button size="medium" type="primary" @click="handleLogin">登录</el-button>
      </el-card>
    </div>
  </div>
</template>
<script>
import util from "@/common/auth";
export default {
  data() {
    return {
      form: {
        name: "", //用户登录手机号
      },
    };
  },
  methods: {
    handleLogin() {
      this.$message({
        // showClose: true,
        message: "登录成功",
        type: 'success'
      });
      util.setCookies("BackARuserName", this.form.name);
      util.setCookies("BackARuserToken", "yc1134353253xlz");
      this.$router.push("/");
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  background: url("../../assets/login-banner.png") no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  &-main {
    height: 300px;
    width: 30%;
    margin: 0 auto;
    position: relative;
    transform: translateY(80%);
    .el-card {
      height: 100%;
      padding: 20px;
    }
    .el-button {
      position: absolute;
      height: 50px;
      left: 25%;
      bottom: 20%;
      width: 50%;
      font-size: 18px;
    }
  }
}
</style>