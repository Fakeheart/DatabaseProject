<template>
  <div>
    <el-card>
      <!-- 头部 -->
      <div class="container_header">
        <!-- 左边的头像和个人信息部分 -->
        <div class="left">
          <!-- 头像部分 -->
          <div class="port_box">
            <img src="../assets/头像3.png" />
          </div>

          <!-- 个人信息部分 -->
          <div class="Info">
            <strong>学号：</strong>{{ studentID }}<br />
            <strong> 姓名：</strong>{{ studentInfo.name }} <br />
            <strong>年级：</strong>{{ studentInfo.year }} 级<br />
            <strong>班级：</strong>{{ studentInfo.classid }} 班
          </div>
        </div>

        <!-- 显示当前时间 -->
        <div class="time">
          {{ date }}
          <br /><br /><br /><br /><br /><br />
          <el-button class="change" type="danger" round plain @click="tochange"
            >修改密码</el-button
          >
        </div>
      </div>

      <!-- 主体部分 -->
      <div class="container_content">
        <!-- 公告显示+所有公告的链接 -->
        <div class="notice">
          <h3>&nbsp;&nbsp;最新公告&nbsp;&nbsp;</h3>
          <el-button type="text" class="more" @click="formore"
            >查看更多 ></el-button
          >
        </div>

        <!-- 最新的公告内容 -->
        <div class="notice_content">
          <el-table
            :data="
              tableData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            stripe
            style="width: 100%"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          >
            <el-table-column
              prop="title"
              label="标题"
              width="280"
            ></el-table-column>

            <el-table-column
              prop="startDate"
              label="发布日期"
              width="180"
            ></el-table-column>

            <el-table-column label="操作" alian="center">
              <template slot-scope="scope">
                <message :text="scope.row.text" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>


<script language="Javascript" type="text/javascript">
// 引入message组件用于查看公告信息
import Message from "./Announce/message.vue";

export default {
  data() {
    return {
      // 返回个人信息
      studentID: window.sessionStorage.getItem("id"),
      studentInfo: {}, //学生个人信息
      item: {
        id: "",
      },

      // 返回公告信息
      tableData: [],
      date: "",
      pageSize: 5, // 每页显示数量
      currentPage: 1, // 默认当前显示第一页
    };
  },
  // 定时显示
  mounted() {
    setInterval(() => {
      this.dateFormat();
    }, 100);
  },
  created() {
    this.gettableData();
    this.getstudentInfo();
  },
  methods: {
    // 查看更多，跳转到公告页
    formore() {
      this.$router.push("/announcement");
    },

    //跳转到修改密码
    tochange() {
      this.$router.push("/stupasswrd");
    },

    handleClick(row) {
      console.log(row);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    // 请求学生个人信息
    async getstudentInfo() {
      const myGet = (datastu) => {
        this.studentInfo = datastu.data; //存储需要的数据，确保不丢失
      };
      this.item.id = window.sessionStorage.getItem("id");

      await fetch("http://175.27.240.116:5000/api/Student/GetById", {
        method: "POST",
        body: JSON.stringify(this.item),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => response.json()) //将获取的数据转化成json格式
        .then((datastu) => myGet(datastu)) //datastu储存转化完成的数据
        .catch((error) => console.error("Unable to get items".error)); //报错信息
    },

    //显示实时时间

    //  设置显示的时间格式
    dateFormat() {
      const nowDate = new Date();
      /*       console.log("date:");
      console.log(nowDate); */
      const date = {
        year: nowDate.getFullYear(),
        month:
          nowDate.getMonth() + 1 < 10
            ? "0" + (nowDate.getMonth() + 1)
            : nowDate.getMonth() + 1,
        date:
          nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate(),
        hour:
          nowDate.getHours() < 10
            ? "0" + nowDate.getHours()
            : nowDate.getHours(),
        minutes:
          nowDate.getMinutes() < 10
            ? "0" + nowDate.getMinutes()
            : nowDate.getMinutes(),
        seconds:
          nowDate.getSeconds() < 10
            ? "0" + nowDate.getSeconds()
            : nowDate.getSeconds(),
        weekDay: nowDate.getDay(),
      };
      const week = new Array(7);
      week[0] = "星期日";
      week[1] = "星期一";
      week[2] = "星期二";
      week[3] = "星期三";
      week[4] = "星期四";
      week[5] = "星期五";
      week[6] = "星期六";
      this.date =
        date.year +
        "-" +
        date.month +
        "-" +
        date.date +
        " " +
        week[date.weekDay] +
        " " +
        date.hour +
        ":" +
        date.minutes +
        ":" +
        date.seconds;
    },

    // 请求公告信息
    async gettableData() {
      const myGet = (tablelist) => {
        this.tableData = tablelist.data; //存储需要的数据，确保不丢失
      };
      await fetch("http://175.27.240.116:5000/api/Announce/GetList", {
        headers: {
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => response.json()) //将获取的数据转化成json格式
        .then((tablelist) => myGet(tablelist)) //tablelist储存转化完成的数据
        .catch((error) => console.error("Unable to get items".error)); //报错信息
      this.total = this.tableData.length;
    },
  },
  components: {
    Message,
  },
};
</script>


<style>
* {
  margin: 0;
}

.container_header {
  background-color: white;
  border-radius: 3px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.left {
  display: flex;
  align-items: center;
}
.port_box {
  height: 90px;
  width: 90px;
  border: 1px solid #eee;
  border-radius: 50%; /* 圆角 */
  padding: 3px; /*图片和边框之间的间距 */
  box-shadow: 0 0 10px #ddd; /*阴影 */
  position: relative;
  margin: 30px;
}
.port_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%; /* 圆角 */
  background-color: #eee;
}

.Info {
  text-align: left;
  font: 15px "Microsoft YaHei";
  margin: 30px;
  position: relative;
}

.time {
  text-align: center;
  font: 15px "Microsoft YaHei";
}

.container_content {
  background-color: rgb(255, 255, 255);
  margin: 0 auto;
}
.notice {
  width: 100%;
  background-color: rgb(237, 241, 245);
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  text-align: center;
  color: #888888;
  margin: 10px;
}
.more {
  line-height: 50px;
  position: relative;
  right: 20px;
}

.notice_content {
  height: 400px;
  position: relative;
  left: 10px;
}
.change {
  float: right;
}
</style>