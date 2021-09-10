<template>
  <div>
    <!-- 学生修改密码页面 -->
    <el-button class="back" type="text" @click="tohome"> &lt; 返回</el-button>
    <el-card>
      <div class="head">
        <h2><i class="el-icon-edit" /> 修改密码</h2>
      </div>
      <el-form
        :model="password"
        status-icon
        :rules="rules"
        ref="password"
        label-width="120px"
        class="password"
      >
        <el-form-item label="请输入新密码" prop="newpass">
          <el-col :span="8">
            <el-input
              type="password"
              v-model="password.newpass"
              autocomplete="off"
              show-password
              clearable
              placeholder="请输入新密码"
            >
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="请确认新密码" prop="checkword">
          <el-col :span="8">
            <el-input
              type="password"
              v-model="password.checkword"
              autocomplete="off"
              show-password
              clearable
              placeholder="请再输入一次"
            >
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('password')"
            >提交</el-button
          >
          <el-button @click="resetForm('password')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validatecheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.password.checkword !== "") {
          this.$refs.password.validateField("checkword");
        }
        callback();
      }
    };
    var validatepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.password.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      password: {
        newpass: "",
        checkword: "",
      },
      user: {}, //user信息，id，name，password
      rules: {
        newpass: [
          { required: true, validator: validatecheck, trigger: "blur" },
          {
            required: true,
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
        checkword: [
          { required: true, validator: validatepass, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getstudentInfo();
  },
  methods: {
    //获取该用户的id，name
    async getstudentInfo() {
      const myGet = (datastu) => {
        this.user = datastu.data; //存储需要的数据，确保不丢失
      };
      const id = window.sessionStorage.getItem("id");
      const item = { id };

      await fetch("http://175.27.240.116:5000/api/Customer/GetById", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => response.json()) //将获取的数据转化成json格式
        .then((datastu) => myGet(datastu)) //datastu储存转化完成的数据
        .catch((error) => console.error("Unable to get items".error)); //报错信息
      // console.log(this.user)
      // console.log(this.user.id)
      // console.log(this.user.name)
      // console.log(this.user.password)
    },
    //提交表单
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.password.newpass)
          this.user.password = this.password.newpass;
          const item = this.user;
          const myGet = (data) => {
            if (data.code == 200) this.$message.success("密码修改成功");
            //删除成功
            else this.$message.error("密码修改失败!"); //删除失败
          };
          fetch("http://175.27.240.116:5000/api/Customer/Edit", {
            //第一个参数是网址
            method: "PUT",
            headers: {
              //设置请求头
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "bearer " + window.sessionStorage.getItem("token"),
            },
            body: JSON.stringify(item), //JSON.stringify把定义的json对象title转换为json数据，然后在body里发送给后端
          })
            .then((res) => res.json())
            .then((data) => myGet(data))
            .catch((error) => console.error("Error!", error)); //如果你请求出错，将会在控制台看到Error!
          // console.log(item)
          window.sessionStorage.clear();
          this.$router.replace({
            path: "/login",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //返回home
    tohome() {
      this.$router.push("/studenthome");
    },
  },
};
</script>

<style>
.head {
  margin: 10px;
}
.password {
  margin-top: 20px;
}
</style>