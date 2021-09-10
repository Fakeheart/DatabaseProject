<template>
  <div>
    <el-card class="head">
      <div class="text">
        <h1>{{ "最新问卷标题：" + question.title }}</h1>
        <br />
        <!-- <h4>{{ "最新问卷发布日期：" + question.issuedate }}</h4> -->
      </div>
    </el-card>
    <el-card class="sum">
      <h3>本次问卷填写人数: {{ length }}</h3>
      <el-table :data="total" border style="width: 100%">
        <el-table-column prop="name" label="问题" width="180">
        </el-table-column>
        <el-table-column prop="a1" label="很好"> </el-table-column>
        <el-table-column prop="a2" label="好"> </el-table-column>
        <el-table-column prop="a3" label="一般"> </el-table-column>
        <el-table-column prop="a4" label="差"> </el-table-column>
      </el-table>
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
      total: [
        { name: "本次考试题量是否适中？", a1: 0, a2: 0, a3: 0, a4: 0 }, //第一个问题
        { name: "本次考试的题目质量怎么样？", a1: 0, a2: 0, a3: 0, a4: 0 }, //第二个问题
        { name: "试卷印刷是否清晰？", a1: 0, a2: 0, a3: 0, a4: 0 }, //第三个问题
        { name: "对自己成绩是否满意？", a1: 0, a2: 0, a3: 0, a4: 0 }, //第四个问题
      ],
      tableData: [
        {
          name: "本次考试题量是否适中？",
          answer1: 43,
          answer2: 34,
          answer3: 23,
          answer4: 42,
        },
        {
          name: "本次考试的题目质量怎么样？",
          answer1: 43,
          answer2: 54,
          answer3: 53,
          answer4: 72,
        },
        {
          name: "试卷印刷是否清晰？",
          answer1: 43,
          answer2: 34,
          answer3: 23,
          answer4: 42,
        },
        {
          name: "对自己成绩是否满意？",
          answer1: 43,
          answer2: 34,
          answer3: 23,
          answer4: 42,
        },
      ],
      //回答的列表
      replylist: [],
      length: 0,
    };
  },
  created() {
    this.getinfo();
    // this.getreplylist()
  },
  methods: {
    async getinfo() {
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
          (this.question.title = data.data.title),
            (this.question.issuedate = data.data.issueDate.substr(0, 10)); //截取正确长度的日期
        })
        .catch((error) => conso.error("出现错误", error));

      //获得当前问卷填写的list
      const myGet = (tablelist) => {
        this.replylist = tablelist.data; //存储需要的数据，确保不丢失
      };
      const item = {
        title: this.question.title,
      };
      await fetch("http://175.27.240.116:5000/api/Answer/GetByTitle", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(item),
      })
        .then((response) => response.json()) //将获取的数据转化成json格式
        .then((tablelist) => myGet(tablelist)) //tablelist储存转化完成的数据
        .catch((error) => console.error("Unable to get items".error)); //报错信息
      this.length = this.replylist.length;
      console.log(this.replylist);
      //
      for (let i = 0; i < this.replylist.length; i++) {
        //第一个问题
        if (this.replylist[i].answer1 == 1) this.total[0].a1 += 1;
        else if (this.replylist[i].answer1 == 2) this.total[0].a2 += 1;
        else if (this.replylist[i].answer1 == 3) this.total[0].a3 += 1;
        else this.total[0].a4 += 1;

        //第二个问题
        if (this.replylist[i].answer2 == 1) this.total[1].a1 += 1;
        else if (this.replylist[i].answer2 == 2) this.total[1].a2 += 1;
        else if (this.replylist[i].answer2 == 3) this.total[1].a3 += 1;
        else this.total[1].a4 += 1;

        //第三个问题
        if (this.replylist[i].answer3 == 1) this.total[2].a1 += 1;
        else if (this.replylist[i].answer3 == 2) this.total[2].a2 += 1;
        else if (this.replylist[i].answer3 == 3) this.total[2].a3 += 1;
        else this.total[i].a4 += 1;

        //第四个问题
        if (this.replylist[i].answer4 == 1) this.total[3].a1 += 1;
        else if (this.replylist[i].answer4 == 2) this.total[3].a2 += 1;
        else if (this.replylist[i].answer4 == 3) this.total[3].a3 += 1;
        else this.total[3].a4 += 1;
      }
      console.log(this.total);
    },
    // 统计问卷回答
    sumreply() {
      for (let i = 0; i < this.replylist; i++) {
        for (let j = 0; j < 4; j++) {
          //第一个问题
          if (this.replylist[i].answer1 == 1) this.total.a1 += 1;
          else if (this.replylist[i].answer1 == 2) this.total.a2 += 1;
          else if (this.replylist[i].answer1 == 3) this.total.a3 += 1;
          else this.total.a4 += 1;

          //第二个问题
          if (this.replylist[i].answer2 == 1) this.total.a1 += 1;
          else if (this.replylist[i].answer2 == 2) this.total.a2 += 1;
          else if (this.replylist[i].answer2 == 3) this.total.a3 += 1;
          else this.total.a4 += 1;

          //第三个问题
          if (this.replylist[i].answer3 == 1) this.total.a1 += 1;
          else if (this.replylist[i].answer3 == 2) this.total.a2 += 1;
          else if (this.replylist[i].answer3 == 3) this.total.a3 += 1;
          else this.total.a4 += 1;

          //第四个问题
          if (this.replylist[i].answer4 == 1) this.total.a1 += 1;
          else if (this.replylist[i].answer4 == 2) this.total.a2 += 1;
          else if (this.replylist[i].answer4 == 3) this.total.a3 += 1;
          else this.total.a4 += 1;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.btns {
  position: flex;
  float: right;
  margin-left: 1000px;
}
.head {
  margin: 10px;
}
.text {
  text-align: center;
}
.sum {
  margin: 10px;
}
</style>