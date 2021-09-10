<template>
  <div class="container">
    <el-form ref="form" :model="item" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="item.title"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-col :span="11">
          <el-date-picker
            placeholder="选择日期"
            v-model="item.issuedate"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <!-- 添加选项 -->
      <el-form-item>
        <el-button type="primary" @click="Submit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        title: "",
        issueDate: "",
      },
    };
  },
  methods: {
    async Submit() {
      if (this.item.title == undefined) {
        return this.$message.error("请输入选项的标题内容");
      }
      if (this.item.issuedate == undefined) {
        return this.$message.error("请选择问卷发布时间");
      }
      this.$message.success("创建成功");
      await fetch("http://175.27.240.116:5000/api/Question/Insert", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(this.item),
      });
    },
  },
};
</script>


<style lang="less" scoped>
</style>