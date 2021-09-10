<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/studenthome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>竞赛报名</el-breadcrumb-item>
      <el-breadcrumb-item>竞赛报名</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card>
      <!--搜索区域-->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getCompititionList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchCompititionList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 竞赛列表区域 -->
      <el-table
        :data="
          competitionList.slice(
            (queryInfo.pagenum - 1) * queryInfo.pagesize,
            queryInfo.pagenum * queryInfo.pagesize
          )
        "
        style="width: 100%"
        border
        stripe
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="竞赛名称"
          prop="compInfo.compname"
        ></el-table-column>
        <el-table-column
          label="介绍信息"
          prop="compInfo.compremark"
        ></el-table-column>
        <el-table-column
          label="报名人数"
          prop="compInfo.compnumber"
        ></el-table-column>
        <el-table-column
          label="竞赛开始时间"
          prop="compInfo.compstarttime"
        ></el-table-column>
        <el-table-column
          label="竞赛结束时间"
          prop="compInfo.compendTime"
        ></el-table-column>
        <el-table-column
          label="报名截止时间"
          prop="compInfo.signddltime"
        ></el-table-column>
        <el-table-column label="状态" prop="signstatus"></el-table-column>
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
            <!--报名按钮-->
            <el-button type="primary" @click="signStateTrue(scope.row)"
              >报名</el-button
            >
            <!--取消按钮-->
            <el-button type="danger" @click="signStateFalse(scope.row)"
              >取消报名</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
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
      queryInfo: {
        query: "",
        //当前页数
        pagenum: 1,
        //当前每页显示数据条数
        pagesize: 5,
      },
      competitionList: [],
      total: 0,
    };
  },
  created() {
    this.getCompititionList();
  },
  methods: {
    async getCompititionList() {
      //const{data:res}=await this.$http.get('competitions', { params: {this.queryInfo}})
      //if(res.matamstatus!=200) this.$message.error('获取失败')
      //this.competitionList = res.data.competitions
      //this.total = res.data.total
      const item = {
        id: window.sessionStorage.getItem("id"),
      };
      const myGet = (res) => {
        this.temp = res;
        this.queryInfo.pagenum = 1;
      };
      // const {data: res} = await this.$http.get('http://175.27.240.116:5000/api/Grade',{params: this.queryInfo})
      //需要一个data的实例，现在还没有
      await fetch("http://175.27.240.116:5000/api/StuComp/GetById", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(item),
      })
        .then((response) => response.json())
        .then((res) => myGet(res));

      if (this.temp.code !== 200) {
        return this.$message.error("获取竞赛信息失败");
      }
      this.total = this.temp.data.length;
      this.competitionList = this.temp.data;
    },
    //实现搜索功能
    async searchCompititionList() {
      if (this.queryInfo.query !== "") {
        const item = {
          id: window.sessionStorage.getItem("id"),
          compname: this.queryInfo.query,
        };
        const myGet = (res) => {
          this.temp = res;
          this.queryInfo.pagenum = 1;
        };
        await fetch("http://175.27.240.116:5000/api/StuComp/GetByNameAndId", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "bearer " + window.sessionStorage.getItem("token"),
          },
          body: JSON.stringify(item),
        })
          .then((response) => response.json())
          .then((res) => myGet(res));
        if (this.temp.code !== 200) {
          return this.$message.error("获取竞赛信息失败");
        }
        this.total = this.temp.data.length;
        this.competitionList = this.temp.data;
      }
    },
    //监听pagesize改变事件
    handleSizeChange(newSize) {
      //console.log(newSize)
      this.queryInfo.pagesize = newSize;
    },
    //监听页码值改变事件
    handleCurrentChange(newPage) {
      //console.log(newPage)
      this.queryInfo.pagenum = newPage;
    },
    //报名<-未报名的状态改变
    async signStateTrue(competitionInfo) {
      const item = {
        id: window.sessionStorage.getItem("id"),
        compname: this.queryInfo.query,
      };
      const myGet = (res) => {
        this.temp = res;
      };
      competitionInfo.signstatus = "已报名";
      competitionInfo.compInfo.compnumber += 1;
      // const { data: res }=this.$http.put(`users/${competitionInfo.id}/state/${competition.signstatus}`)
      fetch(`${"http://175.27.240.116:5000/api/StuComp/Edit"}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(competitionInfo),
      })
        .then((response) => response.json())
        .then((res) => myGet(res));
      if (this.temp.code !== 200) {
        competitionInfo.signstatus = "未报名";
        competitionInfo.compInfo.compnumber -= 1;
        return this.$message.error("报名失败");
      }
      this.$message.success("更新状态成功！");
    },
    //报名->未报名的状态改变
    async signStateFalse(competitionInfo) {
      const item = {
        id: window.sessionStorage.getItem("id"),
      };
      const myGet = (res) => {
        this.temp = res;
      };
      competitionInfo.signstatus = "未报名";
      competitionInfo.compInfo.compnumber -= 1;
      // const { data: res }=this.$http.put(`users/${competitionInfo.id}/state/${competition.signstatus}`)

      fetch(`${"http://175.27.240.116:5000/api/StuComp/Edit"}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(competitionInfo),
      })
        .then((response) => response.json())
        .then((res) => myGet(res));
      if (this.temp.code !== 200) {
        competitionInfo.signstatus = "已报名";
        competitionInfo.compInfo.compnumber += 1;
        return this.$message.error("取消失败");
      }
      this.$message.success("更新状态成功！");
    },
  },
};
</script>

<style lang="less" scoped>
</style>