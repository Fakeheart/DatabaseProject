<template>
  <!-- 老师的公告页面 -->
  <div class="tannounce">
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>通知公告</el-breadcrumb-item>
      <el-breadcrumb-item>公告信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="anav">
        <h2 class="tinfo"><i class="el-icon-s-claim" /> 公告信息</h2>
        <!-- 通过发布公告实现跳转到发布公告的页面 -->
        <div style="margin-left: 20px">
          <el-button
            type="primary"
            round
            style="
               {
                font-size: 15px;
              }
            "
            @click="toAnnounce"
            >发布公告</el-button
          >
        </div>
      </div>
      <el-table
        class="table"
        style="font-size: 15px"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        stripe
      >
        <el-table-column prop="title" label="标题" mid-width="280">
        </el-table-column>
        <el-table-column prop="startDate" label="发布日期" mid-width="180">
        </el-table-column>
        <el-table-column mid-width="50">
          <template slot-scope="scope">
            <message :text="scope.row.text" />
          </template>
        </el-table-column>
        <el-table-column label="操作" mid-width="50">
          <template slot-scope="scope">
            <el-button
              type="danger"
              round
              size="small"
              @click="deleteAnnounce(scope.row.title)"
              >删除</el-button
            >
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
    //删除公告
    async deleteAnnounce(title) {
      const item = {
        title: title,
      };
      const myGet = (data) => {
        if (data.code == 200) this.$message.success("删除成功");
        //删除成功
        else this.$message.error("删除失败"); //删除失败
      };
      await fetch("http://175.27.240.116:5000/api/Announce/DeleteByTitle", {
        //第一个参数是网址
        method: "DELETE",
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
      console.log(item);
      //删除后设置刷新
      this.$router.replace({
        path: "/announceempty",
      });
    },
    //跳转到发布公告页面
    toAnnounce() {
      this.$router.push("/teacherannounce");
    },
  },
};
</script>

<style>
.table {
  /* 公告信息table */
  margin: auto;
}
.anav {
  /* 公告信息导航栏div */
  display: flex;
  align-items: center;
  margin: 10px;
}
.tinfo {
  /* 公告信息h2 */
  margin: 10px;
}
</style>