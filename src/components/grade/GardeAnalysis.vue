<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/studenthome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>考试成绩</el-breadcrumb-item>
      <el-breadcrumb-item>成绩分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="Echarts">
        <div id="chartLineBox" style="width: 90%; height: 70vh"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Echarts",
  data() {
    return {
      searchInfo: {
        examid: "",
        id: "",
      },
      gradelist: [],
      total: 0,
      temp: null,
    };
  },
  methods: {
    async getGrade() {
      console.log("success");
      const myGet = (data1) => {
        this.temp = data1;
      };

      this.searchInfo.id = window.sessionStorage.getItem("id");
      console.log("111");
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

      console.log("111");

      this.gradelist = this.temp;
      console.log(this.gradelist.data[0].rank);
      this.total = this.gradelist.data.length;

      if (this.gradelist.code != 200) {
        this.$message.error("获取成绩信息失败");
      }

      console.log(this.gradelist.data);
      console.log(this.gradelist.code);
    },
  },

  created() {
    console.log("111");
  },
  async mounted() {
    await this.getGrade();
    this.$nextTick(function () {
      // 仅在渲染整个视图之后运行的代码
      console.log("222");
      console.log("3");
      let echarts = require("echarts");
      this.chartLine = echarts.init(document.getElementById("chartLineBox"));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          //设置tip提示
          trigger: "axis",
        },

        legend: {
          //设置区分（哪条线属于什么）
          data: ["我的成绩", "平均成绩", "我的排名"],
          selected: { 我的成绩: false, 平均成绩: false, 我的排名: true },
        },
        color: ["#4169E1", "#9B30FF", "#8AE09F"], //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {
          //设置x轴
          type: "category",
          boundaryGap: false, //坐标轴两边不留白
          data: [
            this.gradelist.data[6].examid,
            this.gradelist.data[5].examid,
            this.gradelist.data[4].examid,
            this.gradelist.data[3].examid,
            this.gradelist.data[2].examid,
            this.gradelist.data[1].examid,
            this.gradelist.data[0].examid,
          ],
          name: "考试编号", //X轴 name
          nameTextStyle: {
            //坐标轴名称的文字样式
            color: "#2F4F4F",
            fontSize: 16,
            padding: [0, 0, 0, 20],
          },
          axisLine: {
            //坐标轴轴线相关设置。
            lineStyle: {
              color: "#2F4F4F",
            },
          },
        },
        yAxis: {
          name: "总成绩",
          scale: true,
          nameTextStyle: {
            color: "#2F4F4F",
            fontSize: 16,
            padding: [0, 0, 10, 0],
          },
          axisLine: {
            lineStyle: {
              color: "#2F4F4F",
            },
          },
          type: "value",
        },
        series: [
          {
            name: "我的成绩",
            data: [
              this.gradelist.data[6].totalGrade,
              this.gradelist.data[5].totalGrade,
              this.gradelist.data[4].totalGrade,
              this.gradelist.data[3].totalGrade,
              this.gradelist.data[2].totalGrade,
              this.gradelist.data[1].totalGrade,
              this.gradelist.data[0].totalGrade,
            ],
            type: "line", // 类型为折线图
            lineStyle: {
              // 线条样式 => 必须使用normal属性
              color: "#4169E1",
            },
          },
          {
            name: "我的排名",
            data: [
              this.gradelist.data[6].rank,
              this.gradelist.data[5].rank,
              this.gradelist.data[4].rank,
              this.gradelist.data[3].rank,
              this.gradelist.data[2].rank,
              this.gradelist.data[1].rank,
              this.gradelist.data[0].rank,
            ],
            type: "line", // 类型为折线图
            lineStyle: {
              // 线条样式 => 必须使用normal属性
              color: "#9B30FF",
            },
          },
          {
            name: "平均成绩",
            data: [
              this.gradelist.data[6].totalGrade,
              (this.gradelist.data[6].totalGrade +
                this.gradelist.data[5].totalGrade) /
                2,
              (this.gradelist.data[6].totalGrade +
                this.gradelist.data[5].totalGrade +
                this.gradelist.data[4].totalGrade) /
                3,
              (this.gradelist.data[6].totalGrade +
                this.gradelist.data[5].totalGrade +
                this.gradelist.data[4].totalGrade +
                this.gradelist.data[3].totalGrade) /
                4,
              (this.gradelist.data[6].totalGrade +
                this.gradelist.data[5].totalGrade +
                this.gradelist.data[4].totalGrade +
                this.gradelist.data[3].totalGrade +
                this.gradelist.data[2].totalGrade) /
                5,
              (this.gradelist.data[6].totalGrade +
                this.gradelist.data[5].totalGrade +
                this.gradelist.data[4].totalGrade +
                this.gradelist.data[3].totalGrade +
                this.gradelist.data[2].totalGrade +
                this.gradelist.data[1].totalGrade) /
                6,
              (this.gradelist.data[6].totalGrade +
                this.gradelist.data[5].totalGrade +
                this.gradelist.data[4].totalGrade +
                this.gradelist.data[3].totalGrade +
                this.gradelist.data[2].totalGrade +
                this.gradelist.data[1].totalGrade +
                this.gradelist.data[0].totalGrade) /
                7,
            ],
            type: "line", // 类型为折线图
            lineStyle: {
              // 线条样式 => 必须使用normal属性
              color: "#8AE09F",
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      this.chartLine.setOption(option);
    });
  },
};
</script>

<style lang="less" scoped>
</style>


