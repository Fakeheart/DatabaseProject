<template>
  <!-- 学生的公告页面 -->
  <div class="about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/studenthome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>通知公告</el-breadcrumb-item>
      <el-breadcrumb-item>公告信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <h2><i class="el-icon-s-claim" /> 公告信息</h2>
      <el-table
        class="table"
        style="font-size: 15px"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        stripe
      >
        <el-table-column prop="title" label="标题" width="280">
        </el-table-column>
        <el-table-column prop="startDate" label="发布日期" width="180">
        </el-table-column>
        <el-table-column label="操作" alian="center">
          <template slot-scope="scope">
            <message :text="scope.row.text" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        @current-change="Pagechange"
        layout="total,sizes,prev, pager, next, jumper"
        :total="tableData.length"
        :page-size="pageSize"
        :page-sizes="[3, 5, 10]"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Message from "./message.vue";

export default {
  data() {
    return {
      //表单内容
      tableData: [], //展示的公告
      //分页的实现
      totalData: [], // 所有公告的数据
      pageSize: 3, // 每页显示数量，默认为3
      pageNum: 1, // 共几页
      currentPage: 1, // 默认当前显示第一页
      totalSize: 50, //公告最多展示50条
    };
  },
  components: {
    Message,
  },
  created() {
    this.gettableData();
  },
  methods: {
    //实现分页
    Pagechange(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage);
    },
    //选择每页显示的数据
    handleSizeChange(newsize) {
      this.pageSize = newsize;
    },
    //获得公告信息
    async gettableData() {
      const myGet = (tablelist) => {
        this.totalData = tablelist.data; //存储需要的数据，确保不丢失
      };
      await fetch("http://175.27.240.116:5000/api/Announce/GetList", {
        headers: {
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => response.json()) //将获取的数据转化成json格式
        .then((tablelist) => myGet(tablelist)) //tablelist储存转化完成的数据
        .catch((error) => console.error("Unable to get items".error)); //报错信息
      this.tableData = this.totalData.slice(0, this.totalSize); //通过slice来展示最新的50条（最多）公告
      this.total = this.tableData.length;
    },
  },
};
</script>

<style>
.atable {
  border: 1px solid #d3d3d3;
  box-shadow: 1px 1px 1px #888888;
}
.table {
  margin: auto;
}
</style>

