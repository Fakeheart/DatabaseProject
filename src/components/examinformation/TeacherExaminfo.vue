<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>考试信息</el-breadcrumb-item>
      <el-breadcrumb-item>考试安排上传</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域，表单呈现 -->
    <el-card>
      <h3><i class="el-icon-edit"></i> 上传考试安排</h3>

      <el-form
        ref="inputform"
        :label-position="labelPosition"
        :rules="rules"
        :model="inputform"
        label-width="120px"
        class="Form"
      >
        <el-form-item label="考试编号" prop="examid">
          <el-input
            placeholder="请输入考试编号"
            v-model="inputform.examid"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="考试科目" prop="subject">
          <el-select
            placeholder="请选择排考科目"
            v-model="inputform.subject"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试日期" prop="exDate">
          <el-date-picker
            placeholder="请选择日期"
            v-model="inputform.exDate"
            value-format="yyyy-MM-dd"
            ><!--表示日期的格式-->
          </el-date-picker>
        </el-form-item>
        <el-form-item label="考试开始时间" prop="startTime">
          <el-time-select
            placeholder="请选择开始时间"
            v-model="inputform.startTime"
            :picker-options="{ start: '08:00', step: '00:15', end: '18:00' }"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="考试结束时间" prop="endTime">
          <el-time-select
            placeholder="请选择结束时间"
            v-model="inputform.endTime"
            :picker-options="{
              start: '08:00',
              step: '00:15',
              end: '18:00',
              minTime: inputform.startTime,
            }"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            placeholder="请输入备注"
            v-model="inputform.remarks"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitExamInfo('inputform')"
            >上传</el-button
          >
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //界面上输入的考试安排数据
      inputform: {
        examid: "",
        subject: "",
        exDate: "",
        startTime: "",
        endTime: "",
        remarks: "无",
      },
      //提交给后台的考试安排数据
      submitform: {
        examid: "",
        subject: "",
        exDate: "",
        exTime: "", //由startTime和endTime拼接而成
        remarks: "无",
      },
      labelPosition: "left",
      //科目选择字段
      options: [
        {
          value: "语文",
        },
        {
          value: "数学",
        },
        {
          value: "英语",
        },
        {
          value: "物理",
        },
        {
          value: "化学",
        },
        {
          value: "生物",
        },
        {
          value: "政治",
        },
        {
          value: "历史",
        },
        {
          value: "地理",
        },
      ],
      rules: {
        examid: [
          { required: true, message: "请填写考试编号", trigger: "change" },
          { min: 5, max: 5, message: "长度只能为5", trigger: "change" },
        ],
        subject: [
          { required: true, message: "请选择考试科目", trigger: "change" },
        ],
        exDate: [
          { required: true, message: "请选择考试日期", trigger: "change" },
        ],
        startTime: [
          { required: true, message: "请选择考试开始时间", trigger: "change" },
        ],
        endTime: [
          { required: true, message: "请选择考试结束时间", trigger: "change" },
        ],
        remarks: [
          { required: true, message: "请选择输入备注", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    async submitExamInfo(formName) {
      //将输入的表单数据转换为提交给后台的表单数据
      this.submitform.examid = this.inputform.examid;
      this.submitform.subject = this.inputform.subject;
      this.submitform.exDate = this.inputform.exDate;
      this.submitform.remarks = this.inputform.remarks;
      this.submitform.exTime =
        this.inputform.startTime + "-" + this.inputform.endTime;
      //验证表单的数据是否合法
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(JSON.stringify(this.submitform)); //通过控制台检测发送的数据情况
          const item = this.submitform; //json对象，给后台传送的信息
          fetch("http://175.27.240.116:5000/api/ExamInfo/Insert", {
            //网址（第一个参数）
            method: "POST",
            headers: {
              //请求头
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "bearer " + window.sessionStorage.getItem("token"),
            },
            body: JSON.stringify(item), //JSON.stringify把定义的json对象(item)转换为json数据，然后在body里发送给后端
          })
            .then((response) => response.json()) //将后端返回的数据储存在response中，再调用response.json()进行格式转换
            .then((dataEX) => {
              console.log(dataEX.data);
              if (dataEX.data != true) this.$message.error("排考情况上传失败");
              //失败
              else this.$message.success("排考情况上传成功"); //成功返回true
            });
        } else {
          return false;
        }
      });
    },
    //点击重置按钮实现界面重置
    reset() {
      this.$router.push("/examinfoempty");
    },
  },
};
</script>

<style>
.Form {
  margin-top: 20px;
}
</style>