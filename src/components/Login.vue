<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="avatar" />
      </div>
      <!-- 登录表单 -->
      <div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          label-width="60px"
          class="login_form"
        >
          <el-form-item label="账号" prop="id">
            <el-input
              v-model="loginForm.id"
              placeholder="请输入你的学号/工号"
              prefix-icon="iconfont icon-user"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入你的密码"
              type="password"
              prefix-icon="iconfont icon-3702mima"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login" class="button1"
              >登录</el-button
            >
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumver="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :lineDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
      class="lizi"
    >
    </vue-particles>
  </div>
</template>

<script>
export default {
  data() {
    return {
      res: null,
      loginForm: {
        id: "",
        password: "",
      },
      // 表单验证
      loginFormRules: {
        id: [
          { required: true, message: "请输入学号/工号", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 表单重置按钮
    resetLoginForm() {
      // console.log(this)
      // resetFields：element-ui提供的表单方法
      this.$refs.loginFormRef.resetFields();
    },
    async login() {
      // 表单预验证
      // valid：bool类型
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return false;
        else this.getloginInfo();
      });
    },
    async getloginInfo() {
      const getData = (data1) => {
        this.res = data1;
      };

      await fetch("http://175.27.240.116:6060/api/Authorize/Login", {
        method: "POST",
        body: JSON.stringify(this.loginForm),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data1) => getData(data1));

      console.log(this.res);
      if (this.res.code !== 200) return this.$message.error("登录失败");
      this.$message.success("登录成功");
      console.log(this.res);
      // 1、将登陆成功之后的token, 保存到客户端的sessionStorage中; localStorage中是持久化的保存
      //   1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
      //   1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
      window.sessionStorage.setItem("token", this.res.data.token);
      window.sessionStorage.setItem("id", this.res.data.id);
      console.log(window.sessionStorage.setItem + "***");

      console.log(window.sessionStorage.getItem("id").length);
      if (window.sessionStorage.getItem("id").length == 5)
        this.$router.push("/teacherhome");
      else if (window.sessionStorage.getItem("id").length == 6)
        this.$router.push("/studenthome");
    },
  },
};
</script>

<style lang="less" scoped>
/* // lang="less" 支持less格式
    // scoped vue的指令，只在当前组件生效 */
.login_container {
  background-color: #668b8b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 360px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 5px 5px 5px #000000;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  //-ms-transform: translate(-50%, -50%);

  background-color: #fff;
  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 60px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: center;
}

.button1 {
  position: relative;
  right: 60px;
}

.info {
  font-size: 13px;
  margin: 10px 15px;
}
</style>
