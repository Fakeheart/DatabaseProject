<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>考试信息</el-breadcrumb-item>
      <el-breadcrumb-item>修改考试安排</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="editdiv">
      <!--左侧栏 ———— 查看当前的考试安排 -->
      <el-card class="checkcard">
        <!--筛选框-->
        <el-row :gutter="10">
          <el-col :span="100">
            <el-input
              placeholder="请输入待查看的考试编号"
              v-model="search"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="chooseTeaExaminfo"
              ></el-button>
            </el-input>
          </el-col>
          <!--查看全部按钮-->
          <el-col :span="4">
            <el-button type="primary" @click="getTeaExaminfo" size="mini"
              >查看全部</el-button
            >
          </el-col>
        </el-row>
        <!--考试安排form展示-->
        <el-table
          :data="
            teaExaminfolist.slice(
              (pageInfo.pagenum - 1) * pageInfo.pagesize,
              pageInfo.pagenum * pageInfo.pagesize
            )
          "
          stripe
          border
          @row-click="toedit"
        >
          <!--点击对应行触发-->
          <el-table-column type="index"></el-table-column
          ><!--为表格填加索引项-->
          <el-table-column prop="examid" label="考试编号"></el-table-column>
          <el-table-column prop="subject" label="科目"></el-table-column>
          <el-table-column prop="exdate" label="考试日期"></el-table-column>
          <el-table-column prop="extime" label="考试时段"></el-table-column>
          <el-table-column prop="remarks" label="考试备注"></el-table-column>
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
      <!-- 右侧栏————修改栏目 -->
      <el-card class="editcard">
        <h3><i class="el-icon-edit"></i> 修改考试安排</h3>
        <el-form
          ref="inputform"
          :label-position="labelPosition"
          :rules="rules"
          :model="inputform"
          label-width="120px"
          class="Form"
        >
          <el-form-item label="考试编号" prop="examid">
            <el-input v-model="inputform.examid" :disabled="true"
              ><!--框的内容不可改-->
            </el-input>
          </el-form-item>
          <el-form-item label="考试科目" prop="subject">
            <el-input v-model="inputform.subject" :disabled="true"> </el-input>
          </el-form-item>
          <el-form-item label="考试日期" prop="exdate">
            <el-date-picker
              placeholder="请选择日期"
              v-model="inputform.exdate"
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
            <el-button type="primary" @click="EditExamInfo('inputform')"
              >修改</el-button
            >
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
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
      search: "", //搜索框数据
      teaExaminfolist: [], //获取的examinfo表格数据
      total: 0,
      labelPosition: "left",
      //从界面上传的考试安排数据
      inputform: {
        examid: "",
        subject: "",
        exdate: "",
        startTime: "",
        endTime: "",
        remarks: "无",
      },
      //提交给后台的考试安排数据
      submitform: {
        examid: "",
        subject: "",
        exDate: "",
        extime: "", //由startTime和endTime拼接而成
        remarks: "无",
      },
      rules: {
        examid: [
          { required: true, message: "请填写考试编号", trigger: "change" },
        ],
        subject: [
          { required: true, message: "请选择考试科目", trigger: "change" },
        ],
        exdate: [
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
  created() {
    this.getTeaExaminfo();
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

    //显示全部考试安排的函数
    async getTeaExaminfo() {
      const myGet = (dataexam) => {
        this.teaExaminfolist = dataexam.data; //存储得到的数据
      };
      await fetch("http://175.27.240.116:5000/api/ExamInfo/GetList", {
        method: "GET",
        headers: {
          //请求头
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => response.json()) //将获取的数据转化成json对象
        .then((dataexam) => myGet(dataexam)); //dataexam储存转化完成的数据
      //.catch(error => console.error('Unable to get items'.error));//报错信息
      this.total = this.teaExaminfolist.length;
      console.log(this.teaExaminfolist); //控制台检测
    },
    //筛选某次考试的函数
    async chooseTeaExaminfo() {
      const myGet = (dataexam) => {
        this.teaExaminfolist = dataexam.data; //存储需要的数据，确保不丢失
      };
      const item = {
        //json对象，给后台传送的信息，此处为搜索框的输入
        examid: this.search,
      };
      if (this.search.length == 0) {
        //搜索框内无数据，点击搜索呈现全部
        this.getTeaExaminfo();
        return;
      }
      await fetch("http://175.27.240.116:5000/api/ExamInfo/GetByExamId", {
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
      //.catch(error => console.error('Unable to get items'.error));//报错信息
      this.total = this.teaExaminfolist.length;

      console.log(this.teaExaminfolist); //控制台检测
    },

    //点击某行获取相应的信息至修改card界面，便于修改
    toedit(teaExaminfolist) {
      //后台获取的数据呈现在界面上
      this.inputform.examid = teaExaminfolist.examid;
      this.inputform.subject = teaExaminfolist.subject;
      this.inputform.exdate = teaExaminfolist.exdate;
      //将考试时段拆分成开始和结束显示在界面上
      this.inputform.startTime = teaExaminfolist.extime.slice(0, 5);
      this.inputform.endTime = teaExaminfolist.extime.slice(6, 11);
      this.inputform.remarks = teaExaminfolist.remarks;
    },
    //点击上传实现提交数据至后台
    async EditExamInfo(formName) {
      //将输入的表单数据转换为提交给后台的表单数据
      this.submitform.examid = this.inputform.examid;
      this.submitform.subject = this.inputform.subject;
      this.submitform.exdate = this.inputform.exdate;
      this.submitform.remarks = this.inputform.remarks;
      this.submitform.extime =
        this.inputform.startTime + "-" + this.inputform.endTime;
      //验证表单的数据是否合法
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(JSON.stringify(this.submitform)); //通过控制台检测发送的数据情况
          const item = this.submitform; //json对象，给后台传送的信息
          fetch("http://175.27.240.116:5000/api/ExamInfo/Edit", {
            //网址（第一个参数）
            method: "PUT",
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
            }) //将转换好的数据定义为dataEX，可以选择打印出来，也可以选择调用函数赋值，此处打印
            .catch((error) => console.error("Error!", error)); //若出错，在控制台看到Error!
          alert("考试安排修改成功!");
          this.$router.push("/teamodifyempty"); //实现刷新
        } else {
          console.log("error submit!!"); //控制台提醒
          alert("考试安排修改失败！"); //弹窗提醒
          return false;
        }
      });
    },
    //点击重置按钮实现界面重置
    reset() {
      this.$router.push("/teamodifyempty");
    },
  },
};
</script>

<style>
.Form {
  margin-top: 20px;
}
.editdiv {
  display: flex; /*实现左右分栏 */
}
.checkcard {
  margin: 10px;
}
.editcard {
  margin: 10px;
  width: 500px;
}
</style>