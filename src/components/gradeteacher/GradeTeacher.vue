<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/teacherhome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>考试成绩</el-breadcrumb-item>
      <el-breadcrumb-item>成绩信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入要查询的考试编号"
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="SearchGrade"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- <el-button type="primary">导入成绩</el-button> -->
        </el-col>
      </el-row>

      <!--成绩展示-->
      <el-table
        :data="
          gradelist.data.slice(
            (queryInfo.pagenum - 1) * queryInfo.pagesize,
            queryInfo.pagenum * queryInfo.pagesize
          )
        "
        border
        stripe
        v-if="gradelist.data"
      >
        <el-table-column label="考试编号" prop="examid"></el-table-column>
        <el-table-column label="学号" prop="id"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="语文成绩" prop="chinese"></el-table-column>
        <el-table-column label="数学成绩" prop="math"></el-table-column>
        <el-table-column label="英语成绩" prop="english"></el-table-column>
        <el-table-column label="物理成绩" prop="physics"></el-table-column>
        <el-table-column label="化学成绩" prop="chemistry"></el-table-column>
        <el-table-column label="生物成绩" prop="biology"></el-table-column>
        <el-table-column label="政治成绩" prop="politics"></el-table-column>
        <el-table-column label="历史成绩" prop="history"></el-table-column>
        <el-table-column label="地理成绩" prop="geography"></el-table-column>
        <el-table-column label="总成绩">
          <template slot-scope="scope">
            {{
              (scope.row.sum =
                scope.row.chinese +
                scope.row.math +
                scope.row.english +
                scope.row.physics +
                scope.row.chemistry +
                scope.row.biology +
                scope.row.politics +
                scope.row.history +
                scope.row.geography)
            }}
          </template>
        </el-table-column>
        <el-table-column label="排名" prop="rank"></el-table-column>
      </el-table>

      <!--页码区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total,sizes, prev, pager, next,jumper"
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
      //获取成绩参数
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      searchInfo: {
        examid: "",
      },
      gradelist: [],
      total: 0,
      temp: null,
    };
  },
  created() {
    this.getGrade();
  },
  methods: {
    async getGrade() {
      //获取全部成绩信息
      const myGet = (data1) => {
        this.temp = data1;
      };

      this.searchInfo.id = window.sessionStorage.getItem("id");

      //发起fetch请求
      await fetch("http://175.27.240.116:5000/api/Score/GetById", {
        method: "POST",
        body: JSON.stringify(this.searchInfo),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data1) => myGet(data1));
      //.catch((error) => console.error("Unable to get items".error));

      this.gradelist = this.temp;
      this.total = this.gradelist.data.length;
      //this.searchInfo.id = window.sessionStorage.getItem("id");

      //this.searchInfo.examName=this.gradelist.queryInfo.query

      if (this.gradelist.code != 200) {
        this.$message.error("获取成绩信息失败");
      }

      console.log(this.gradelist.data);
      console.log(this.gradelist.code);
    },

    async SearchGrade() {
      this.searchInfo.examid = this.queryInfo.query;
      if (this.searchInfo.examid.length == 0) {
        this.getGrade();
        return;
      }

      //获取搜索的成绩信息
      const mySearchGet = (data1) => {
        this.temp = data1;
      };
      //发起fetch请求

      //this.searchInfo.examid = this.queryInfo.query;
      console.log(JSON.stringify(this.searchInfo));

      await fetch("http://175.27.240.116:5000/api/Score/GetAllByExamid", {
        method: "POST",
        body: JSON.stringify(this.searchInfo),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data1) => mySearchGet(data1));
      //.catch((error) => console.error("Unable to get items".error));

      this.gradelist = this.temp;
      this.total = this.gradelist.data.length;
      for (let i = 0; i < this.gradelist.data.length; ++i) {
        this.gradelist.data[i].rank = i + 1;
      }
      if (this.gradelist.code != 200) {
        this.$message.error("获取成绩信息失败");
      }

      console.log(JSON.stringify(this.searchInfo));
      console.log(this.gradelist.data);
      console.log(this.gradelist.code);
    },
    // //每页信息条数变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
    },
    //页码值改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
    },
  },
};
</script>

<style lang="less" scoped>
</style>