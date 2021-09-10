<template>
  <!-- 老师发布公告的页面 -->
  <div class="announce">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>通知公告</el-breadcrumb-item>
      <el-breadcrumb-item>发布公告</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <h2><i class="el-icon-edit" /> 发布公告</h2>
      <br />
      <el-form
        ref="form"
        :label-position="labelPosition"
        :rules="rules"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="公告标题" prop="title">
          <el-col :span="10">
            <el-input placeholder="请输入标题" v-model="form.title" clearable>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="公告正文" prop="text">
          <el-col :span="20">
            <el-input
              type="textarea"
              :rows="15"
              placeholder="请输入内容"
              v-model="form.text"
            >
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="发布时间" prop="startDate">
          <el-date-picker
            v-model="form.startDate"
            type="date"
            value-format="yyyy-MM-dd"
            :disabled="true"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')"
            >发 布</el-button
          >
          <el-button @click="toAnnouncement">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Announce",
  data() {
    return {
      labelPosition: "right",
      form: {
        title: "",
        text: "",
        startDate: "",
      },
      rules: {
        title: [{ required: true, message: "请输入公告标题", trigger: "blur" }],
        text: [
          { required: true, message: "请填入正文内容", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getStartDate();
  },
  methods: {
    getStartDate() {
      //获取当前年月日
      const date = new Date();
      const year = date.getFullYear();
      const month =
        date.getMonth() + 1 > 10
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      const day = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
      this.form.startDate = year + "-" + month + "-" + day;
    },
    //表单提交
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(JSON.stringify(this.form));
          //通过fetch将输入的公告提交给后台
          const item = this.form;
          fetch("http://175.27.240.116:5000/api/Announce/Insert", {
            //第一个参数是网址
            method: "POST",
            headers: {
              //设置请求头
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "bearer " + window.sessionStorage.getItem("token"),
            },
            body: JSON.stringify(item), //JSON.stringify把定义的json对象(item)转换为json数据，然后在body里发送给后端
          })
            .then((response) => response.json()) //如果后端返回给你了数据，那么就将这个数据储存在response中，再调用response.json()进行格式转换
            .then((data) => {
              //将转换好的数据定义为data，然后针对data调用函数，函数里可以选择直接对data进行操作，也可以先储存到另一个变量中。这里选择直接在控制台打出来data.
              console.log(data.data);
              //发布成功提示相应消息
              this.$message.success("公告发布成功");
              // alert('公告发布成功！');
              this.$router.push("/teacherannouncement");
            })
            .catch((error) => {
              console.error("Error!", error);
              console.log("error submit!!!");
              //发布失败提示相应消息
              this.$message.error("公告发布失败！");
              // alert('公告发布失败！');
            }); //如果你请求出错，将会在控制台看到Error!
        } else {
          return false;
        }
      });
    },
    //跳转到公告信息页面
    toAnnouncement() {
      this.$router.push("/teacherannouncement");
    },
  },
};
</script>

<style>
</style>