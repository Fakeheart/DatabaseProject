<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>问卷调查</el-breadcrumb-item>
      <el-breadcrumb-item>查看问卷</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 问卷进度区间 -->
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <p>问卷进度</p>
      </div>
      <el-progress
        type="circle"
        :percentage="percentage"
        :color="colors"
      ></el-progress>
    </el-card>

    <!-- 问卷区间 -->
    <el-card>
      <div class="text">
        <h1>{{ "最新问卷标题：" + question.title }}</h1>
        <!-- <h4>{{ "最新问卷发布日期：" + question.issuedate }}</h4> -->
      </div>
    </el-card>
    <el-card>
      <div style="margin-top: 3%">
        <el-card style="margin-left: 10%; margin-right: 10%">
          <div slot="header" class="clearfix">
            <span>题目1：本次考试题量是否适中？</span>
          </div>
          <el-radio-group v-model="answer.answer1" @change="toclick1">
            <el-radio :label="1">很好</el-radio>
            <el-radio :label="2">好</el-radio>
            <el-radio :label="3">一般</el-radio>
            <el-radio :label="4">差</el-radio>
          </el-radio-group>
        </el-card>
      </div>

      <div style="margin-top: 3%">
        <el-card style="margin-left: 10%; margin-right: 10%">
          <div slot="header" class="clearfix">
            <span>题目2：本次考试的题目质量怎么样？</span>
          </div>
          <el-radio-group v-model="answer.answer2" @change="toclick2">
            <el-radio :label="1">很好</el-radio>
            <el-radio :label="2">好</el-radio>
            <el-radio :label="3">一般</el-radio>
            <el-radio :label="4">差</el-radio>
          </el-radio-group>
        </el-card>
      </div>
      <div style="margin-top: 3%">
        <el-card style="margin-left: 10%; margin-right: 10%">
          <div slot="header" class="clearfix">
            <span>题目3：试卷印刷是否清晰？</span>
          </div>
          <el-radio-group v-model="answer.answer3" @change="toclick3">
            <el-radio :label="1">很好</el-radio>
            <el-radio :label="2">好</el-radio>
            <el-radio :label="3">一般</el-radio>
            <el-radio :label="4">差</el-radio>
          </el-radio-group>
        </el-card>
      </div>
      <div style="margin-top: 3%">
        <el-card style="margin-left: 10%; margin-right: 10%">
          <div slot="header" class="clearfix">
            <span>题目4：对自己成绩是否满意？</span>
          </div>
          <el-radio-group v-model="answer.answer4" @change="toclick4">
            <el-radio :label="1">很好</el-radio>
            <el-radio :label="2">好</el-radio>
            <el-radio :label="3">一般</el-radio>
            <el-radio :label="4">差</el-radio>
          </el-radio-group>
        </el-card>
      </div>

      <!-- 提交按钮 -->
      <div style="margin-top: 3%">
        <el-card style="margin-left: 10%; margin-right: 10%">
          <div slot="header" class="clearfix">
            <el-button type="primary" round class="submit_btns" @click="submi">
              提交
            </el-button>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: {
        title: "",
        issuedate: "",
      },
      answerstate: {
        s1: 0,
        s2: 0,
        s3: 0,
        s4: 0,
      },
      answer: {
        id: window.sessionStorage.getItem("id"),
        title: "",
        answer1: 0,
        answer2: 0,
        answer3: 0,
        answer4: 0,
      },
      //回答问题的百分比
      percentage: 0,
      colors: [
        { color: "#f56c6c", percentage: 25 },
        { color: "#e6a23c", percentage: 50 },
        { color: "#5cb87a", percentage: 75 },
        { color: "#1989fa", percentage: 100 },
      ],
    };
  },
  async created() {
    await fetch("http://175.27.240.116:5000/api/Question/GetLatest", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "bearer " + window.sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        (this.answer.title = data.data.title),
          (this.question.title = data.data.title),
          (this.question.issuedate = data.data.issueDate.substr(0, 10)); //截取正确长度的日期
      })
      .catch((error) => console.error("出现错误", error));
  },
  methods: {
    //change改变状态
    toclick1() {
      this.answerstate.s1 = 1;
      this.changepercentage();
    },
    toclick2() {
      this.answerstate.s2 = 1;
      this.changepercentage();
    },
    toclick3() {
      this.answerstate.s3 = 1;
      this.changepercentage();
    },
    toclick4() {
      this.answerstate.s4 = 1;
      this.changepercentage();
    },
    //统计百分比
    changepercentage() {
      if (this.answerstate.s1) {
        this.percentage =
          25 *
          (this.answerstate.s1 +
            this.answerstate.s2 +
            this.answerstate.s3 +
            this.answerstate.s4);
      }
      if (this.answerstate.s2) {
        this.percentage =
          25 *
          (this.answerstate.s1 +
            this.answerstate.s2 +
            this.answerstate.s3 +
            this.answerstate.s4);
      }
      if (this.answerstate.s3) {
        this.percentage =
          25 *
          (this.answerstate.s1 +
            this.answerstate.s2 +
            this.answerstate.s3 +
            this.answerstate.s4);
      }
      if (this.answerstate.s4) {
        this.percentage =
          25 *
          (this.answerstate.s1 +
            this.answerstate.s2 +
            this.answerstate.s3 +
            this.answerstate.s4);
      }
    },

    async submi() {
      console.log(this.answer);
      if (this.percentage !== 100) return this.$message.error("请做完所有题目");
      await fetch("http://175.27.240.116:5000/api/Answer/Insert", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(this.answer),
      })
        .then((response) => response.json()) //如果后端返回给你了数据，那么就将这个数据储存在response中，再调用response.json()进行格式转换
        .then((data) => {
          if (data.data != true) this.$message.error("已提交过此问卷");
          //将转换好的数据定义为data，然后针对data调用函数，函数里可以选择直接对data进行操作，也可以先储存到另一个变量中。这里选择直接在控制台打出来data.
          // console.log(data.data);
          //提交成功提示相应消息
          else this.$message.success("问卷提交成功");
        })
        .catch((error) => {
          console.error("Error!", error);
          console.log("error submit!!!");
          //提交失败提示相应消息
          this.$message.error("问卷提交失败！");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  position: fixed;
  width: 170;
  right: 0px;
  top: 60px;
}
.submit_btns {
  position: flex;
  float: right;
}
.text {
  text-align: center;
}
</style>