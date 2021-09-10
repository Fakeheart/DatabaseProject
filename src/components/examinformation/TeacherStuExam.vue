<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>考试信息</el-breadcrumb-item>
      <el-breadcrumb-item>学生考试信息上传</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域，表单呈现 -->
    <el-card>
      <h3><i class="el-icon-edit"></i> 上传个人考试安排</h3>
      <el-form
        ref="formStuExam"
        :label-position="labelPosition"
        :rules="rules"
        :model="formStuExam"
        label-width="120px"
        class="Form"
      >
        <el-form-item label="考生学号" prop="id">
          <el-input placeholder="请输入学号" v-model="formStuExam.id" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="考试编号" prop="examid">
          <el-input
            placeholder="请输入考试编号"
            v-model="formStuExam.examid"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="考试科目" prop="subject">
          <el-select
            placeholder="请选择排考科目"
            v-model="formStuExam.subject"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考场" prop="place">
          <el-input
            placeholder="请输入考场"
            v-model="formStuExam.place"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="座位号" prop="seat">
          <el-input
            placeholder="请输入座位号"
            v-model="formStuExam.seat"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitStuExam('formStuExam')"
            >上传</el-button
          >
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //学生排考表单，此处输入和提交的数据一致
      formStuExam: {
        id: "",
        examid: "",
        subject: "",
        place: "",
        seat: "",
      },
      labelPosition: "left",
      //科目选择字段
      options: [
        {
          value: "语文",
        },
        {
          value: "数学",
        },
        {
          value: "英语",
        },
        {
          value: "物理",
        },
        {
          value: "化学",
        },
        {
          value: "生物",
        },
        {
          value: "政治",
        },
        {
          value: "历史",
        },
        {
          value: "地理",
        },
      ],
      rules: {
        id: [
          { required: true, message: "请填写考生学号", trigger: "change" },
          { min: 6, max: 6, message: "长度只能为6", trigger: "change" },
        ],
        examid: [
          { required: true, message: "请填写考试编号", trigger: "change" },
          { min: 5, max: 5, message: "长度只能为5", trigger: "change" },
        ],
        subject: [
          { required: true, message: "请选择考试科目", trigger: "change" },
        ],
        place: [
          { required: true, message: "请输入考试地点", trigger: "change" },
        ],
        seat: [{ required: true, message: "请输入座位号", trigger: "change" }],
      },
    };
  },
  methods: {
    async submitStuExam(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(JSON.stringify(this.formStuExam)); //通过控制台检测发送的数据情况
          const item = this.formStuExam; //json对象，给后台传送的信息
          fetch("http://175.27.240.116:5000/api/StuExam/Insert", {
            //第一个参数是网址
            method: "POST",
            headers: {
              //请求头
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "bearer " + window.sessionStorage.getItem("token"),
            },
            body: JSON.stringify(item), //JSON.stringify把定义的json对象(item)转换为json数据，然后在body里发送给后端
          })
            .then((response) => response.json()) //将后端返回的数据储存在response中，再调用response.json()进行格式转换
            .then((dataEX) => {
              console.log(dataEX.data); //将转换好的数据定义为dataEX，可以选择打印出来，也可以选择调用函数赋值，此处打印
              if (dataEX.data != true)
                this.$message.error("学生考试情况上传失败");
              //失败
              else this.$message.success("学生排考情况上传成功"); //成功返回true
            });
        } else {
          return false;
        }
      });
    },
    //点击取消按钮实现界面重置
    reset() {
      this.$router.push("/stuexamempty");
    },
  },
};
</script>

<style>
.Form {
  margin-top: 20px;
}
</style>