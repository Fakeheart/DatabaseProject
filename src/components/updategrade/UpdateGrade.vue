<template>
  <div>
    <el-card>
      <h3><i class="el-icon-edit"></i> 上传学生成绩</h3>

      <el-form
        ref="form"
        :label-position="labelPosition"
        :rules="rules"
        :model="form"
        label-width="120px"
        class="Form"
      >
        <el-form-item label="考试编号" prop="examid">
          <el-input
            placeholder="请输入考试编号"
            v-model="form.examid"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="考生ID" prop="id">
          <el-input placeholder="请输入考生ID" v-model="form.id" clearable>
          </el-input>
        </el-form-item>

        <el-form-item label="考生姓名" prop="name">
          <el-input placeholder="请输入考生姓名" v-model="form.name" clearable>
          </el-input>
        </el-form-item>

        <el-form-item label="语文成绩" prop="chinese">
          <el-input
            placeholder="请输入语文成绩"
            v-model="form.chinese"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item label="数学成绩" prop="math">
          <el-input placeholder="请输入数学成绩" v-model="form.math" clearable>
          </el-input>
        </el-form-item>

        <el-form-item label="英语成绩" prop="english">
          <el-input
            placeholder="请输入英语成绩"
            v-model="form.english"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item label="物理成绩" prop="physics">
          <el-input
            placeholder="请输入物理成绩"
            v-model="form.physics"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item label="化学成绩" prop="chemistry">
          <el-input
            placeholder="请输入化学成绩"
            v-model="form.chemistry"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item label="生物成绩" prop="biology">
          <el-input
            placeholder="请输入生物成绩"
            v-model="form.biology"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item label="政治成绩" prop="politics">
          <el-input
            placeholder="请输入政治成绩"
            v-model="form.politics"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item label="历史成绩" prop="history">
          <el-input
            placeholder="请输入历史成绩"
            v-model="form.history"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item label="地理成绩" prop="geography">
          <el-input
            placeholder="请输入地理成绩"
            v-model="form.geography"
            clearable
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitGrade()">上传</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        examid: "",
        id: "",
        name: "",
        chinese: 0,
        math: 0,
        english: 0,
        physics: 0,
        chemistry: 0,
        biology: 0,
        politics: 0,
        history: 0,
        geography: 0,
      },
      labelPosition: "left",
      rules: {
        examid: [
          { required: true, message: "请填入考生ID", trigger: "change" },
        ],
        id: [{ required: true, message: "请填入考生ID", trigger: "change" }],
        name: [
          { required: true, message: "请填入考试编号", trigger: "change" },
        ],
        chinese: [
          { required: true, message: "请填入考试科目", trigger: "change" },
        ],
        math: [
          { required: true, message: "请填入考试科目", trigger: "change" },
        ],
        english: [
          { required: true, message: "请填入考试科目", trigger: "change" },
        ],
        physics: [
          { required: true, message: "请选择考试日期", trigger: "change" },
        ],
        chemistry: [
          { required: true, message: "请选择考试开始时间", trigger: "change" },
        ],
        biology: [
          { required: true, message: "请选择考试结束时间", trigger: "change" },
        ],
        politics: [
          { required: true, message: "请输入考试地点", trigger: "change" },
        ],
        history: [
          { required: true, message: "请输入座位号", trigger: "change" },
        ],
        geography: [
          { required: true, message: "请填入考生学号", trigger: "change" },
        ],
      },
      temp: [],
    };
  },
  methods: {
    async submitGrade() {
      //显示全部的函数
      const myGet = (data1) => {
        this.temp = data1;
      };
      console.log(this.form);
      await fetch("http://175.27.240.116:5000/api/Score/Insert", {
        method: "POST",
        body: JSON.stringify(this.form),
        headers: {
          //请求头
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => response.json()) //将获取的数据转化成json对象
        .then((data) => myGet(data))
        .catch((error) => console.error("Unable to post grade".error)); //报错信息
      if (this.temp.code == 200)
        this.$message.success("导入成功"), (this.temp.code = 0);
      else this.$message.error("导入失败");
    },
  },
};
</script>

<style>
.Form {
  margin-top: 20px;
}
</style>