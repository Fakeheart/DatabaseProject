<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>考试信息</el-breadcrumb-item>
      <el-breadcrumb-item>考试信息查询</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!--筛选框-->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入待查询的考试编号"
            v-model="search"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="chooseExaminfo"
            ></el-button>
          </el-input>
        </el-col>
        <!--查看全部按钮-->
        <el-col :span="4">
          <el-button type="primary" @click="getExaminfo">查看全部</el-button>
        </el-col>
      </el-row>

      <!--考试安排form展示-->
      <el-table
        :data="
          examinfolist.slice(
            (pageInfo.pagenum - 1) * pageInfo.pagesize,
            pageInfo.pagenum * pageInfo.pagesize
          )
        "
        stripe
        border
      >
        <el-table-column type="index"></el-table-column
        ><!--为表格填加索引项-->
        <el-table-column prop="EXAMID" label="考试编号"></el-table-column>
        <el-table-column prop="SUBJECT" label="科目"></el-table-column>
        <el-table-column prop="EXDATE" label="考试日期"></el-table-column>
        <el-table-column prop="EXTIME" label="考试时段"></el-table-column>
        <el-table-column prop="PLACE" label="考试地点"></el-table-column>
        <el-table-column prop="SEAT" label="座位号"></el-table-column>
        <el-table-column prop="REMARKS" label="考试备注"></el-table-column>
      </el-table>

      <!--实现分页-->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pageInfo.pagesize"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageInfo: {
        pagenum: 1, //当前页数
        pagesize: 5, //当前每页显示多少条数据
      },
      search: "",
      examinfolist: [],
      total: 0,
    };
  },
  created() {
    this.getExaminfo();
  },
  methods: {
    //监听pagesize的改变
    handleSizeChange(newsize) {
      this.pageInfo.pagesize = newsize;
    },
    //监听currentpage的改变
    handleCurrentChange(newpage) {
      this.pageInfo.pagenum = newpage;
    },

    //显示个人全部考试安排的函数
    async getExaminfo() {
      const myGet = (dataexam) => {
        this.examinfolist = dataexam; //直接返回数据（字符串）
        this.temporary = JSON.parse(this.examinfolist); //将字符串转换成json对象
        this.examinfolist = this.temporary; //存储需要地数据（json对象）
      };
      const item = {
        //json对象，给后台传送的信息,此次为学号
        id: window.sessionStorage.getItem("id"),
      };
      await fetch("http://175.27.240.116:5000/api/StuExam/GetById", {
        method: "POST",
        headers: {
          //请求头
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(item), //JSON.stringify把定义的json对象(item)转换为json数据，然后在body里发送给后端
      })
        .then((response) => response.json()) //将获取的数据转化成json对象
        .then((dataexam) => myGet(dataexam)); //dataexam储存转化完成的数据
      //.catch(error => console.error('Unable to get items'.error));//报错信息

      this.total = this.examinfolist.length;
      console.log(this.examinfolist); //控制台检测
    },
    //筛选某次考试的函数
    async chooseExaminfo() {
      const myGet = (dataexam) => {
        this.examinfolist = dataexam; //直接返回数据（字符串）
        this.temporary = JSON.parse(this.examinfolist); //将字符串转换成json对象
        this.examinfolist = this.temporary; //存储需要地数据（json对象）
        this.pageInfo.pagenum = 1; //搜索完成后自动跳转至第一页
      };
      const item = {
        //json对象，给后台传送的信息
        examid: this.search,
        id: window.sessionStorage.getItem("id"),
      };
      if (this.search.length == 0) {
        //搜索框为空，返回该生的全部考试安排
        this.getExaminfo();
        return;
      }
      await fetch("http://175.27.240.116:5000/api/StuExam/GetByNameAndId", {
        method: "POST",
        headers: {
          //请求头
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(item), //JSON.stringify把定义的json对象(item)转换为json数据，然后在body里发送给后端
      })
        .then((response) => response.json()) //将获取的数据转化成json对象
        .then((dataexam) => myGet(dataexam));
      // .catch(error => console.error('Unable to get items'.error));//报错信息
      this.total = this.examinfolist.length;
      console.log(this.examinfolist); //控制台检测
    },
  },
};
</script>

<style lang="less" scoped>
</style>