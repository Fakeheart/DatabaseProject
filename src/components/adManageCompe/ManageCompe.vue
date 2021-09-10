<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/teacherhome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>竞赛管理</el-breadcrumb-item>
      <el-breadcrumb-item>竞赛列表</el-breadcrumb-item>
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
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加竞赛</el-button
          >
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
        <el-table-column label="竞赛名称" prop="compname"></el-table-column>
        <el-table-column label="介绍信息" prop="compremark"></el-table-column>
        <el-table-column label="报名人数" prop="compnumber"></el-table-column>
        <el-table-column
          label="竞赛开始时间"
          prop="compstarttime"
        ></el-table-column>
        <el-table-column
          label="竞赛结束时间"
          prop="compendTime"
        ></el-table-column>
        <el-table-column
          label="报名截止时间"
          prop="signddltime"
        ></el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="scope">
            <!--编辑按钮-->
            <el-button
              type="primary"
              size="mini"
              @click="showEditDialog(scope.row)"
              >编辑</el-button
            >
            <!--删除按钮-->
            <el-button
              type="danger"
              size="mini"
              @click="removeCompeById(scope.row.compname)"
              >删除</el-button
            >
            <!--报名情况按钮-->
            <el-button type="warning" size="mini" @click="showsignup(scope.row)"
              >报名情况</el-button
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

      <!--添加用户对话框-->
      <el-dialog
        title="添加竞赛"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <!--内容主体区-->
        <el-form
          :model="addCompetitionForm"
          :rules="addCompetitionFormRules"
          ref="addCompetitionFormRef"
          label-width="150px"
        >
          <el-form-item label="竞赛名称" prop="compname">
            <el-input v-model="addCompetitionForm.compname"></el-input>
          </el-form-item>
          <el-form-item label="介绍信息" prop="compremark">
            <el-input
              type="textarea"
              size="medium"
              v-model="addCompetitionForm.compremark"
            ></el-input>
          </el-form-item>
          <el-form-item label="竞赛时间" required>
            <el-form-item prop="comtime">
              <el-date-picker
                v-model="addCompetitionForm.comtime"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="报名截止时间" required>
            <el-form-item prop="signddltime">
              <el-date-picker
                v-model="addCompetitionForm.signddltime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-form>
        <!--底部区-->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addCompetition">确 定</el-button>
          <el-button @click="addDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>

      <!--修改介绍信息对话框-->
      <el-dialog
        title="修改介绍信息"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed"
      >
        <!--内容主体区-->
        <el-form
          :model="editCompetitionForm"
          :rules="editCompetitionFormRules"
          ref="editCompetitionFormRef"
          label-width="150px"
        >
          <el-form-item label="竞赛名称" prop="compname">
            <el-input
              v-model="editCompetitionForm.compname"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="介绍信息" prop="compremark">
            <el-input
              type="textarea"
              size="medium"
              v-model="editCompetitionForm.compremark"
            ></el-input>
          </el-form-item>
          <el-form-item label="竞赛时间" required>
            <el-form-item prop="comtime">
              <el-date-picker
                v-model="editCompetitionForm.comtime"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="报名截止时间" required>
            <el-form-item prop="signddltime">
              <el-date-picker
                v-model="editCompetitionForm.signddltime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-form>
        <!--底部区-->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editCompetition">确 定</el-button>
          <el-button @click="editDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>

      <!--展示竞赛报名情况对话框-->
      <el-dialog title="提示" :visible.sync="signupdialogVisible" width="50%">
        <!--内容主体区-->
        <el-table
          :data="
            signupstudentList.slice(
              (sighupInfo.pagenum - 1) * sighupInfo.pagesize,
              sighupInfo.pagenum * sighupInfo.pagesize
            )
          "
          border
          stripe
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column label="学号" prop="id"></el-table-column>
          <el-table-column label="竞赛名称" prop="compname"></el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination
          @size-change="handleSignUpSizeChange"
          @current-change="handleSignUpCurrentChange"
          :current-page="sighupInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="sighupInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="sighuptotal"
        >
        </el-pagination>
        <!--底部区-->
        <span slot="footer" class="dialog-footer">
          <download-excel
            :data="signupstudentList"
            :fields="json_fields"
            type="xls"
            worksheet="My Worksheet"
            name="报名信息.xls"
          >
            <el-button type="success">导出为Excel表格</el-button>
          </download-excel>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    //检验报名截止时间自定义校验规则
    var checksignddltime = (rule, value, callback) => {
      if (
        value > this.addCompetitionForm.comtime[0] ||
        value > this.editCompetitionForm.comtime[0]
      ) {
        callback(new Error("报名截止时间晚于竞赛开始时间"));
      } else callback();
    };
    return {
      queryInfo: {
        query: "",
        //当前页数
        pagenum: 1,
        //当前每页显示数据条数
        pagesize: 5,
      },
      sighupInfo: {
        //当前页数
        pagenum: 1,
        //当前每页显示数据条数
        pagesize: 5,
      },
      competitionList: [],
      studentList: [],
      scList: [],
      signupstudentList: [],
      total: 0,
      sighuptotal: 0,
      pickerOptions: {},
      //控制添加对话框的显示与隐藏
      addDialogVisible: false,
      //控制修改对话框的显示与隐藏
      editDialogVisible: false,
      //控制展示情况对话框的显示与隐藏
      signupdialogVisible: false,
      //添加竞赛表单数据
      addCompetitionForm: {
        compname: "",
        compremark: "",
        compnumber: 0,
        comtime: [],
        compstarttime: "",
        compendTime: "",
        signddltime: "",
      },
      //添加表单的验证规则对象
      addCompetitionFormRules: {
        compname: [
          { required: true, message: "请输入竞赛名称", trigger: "blur" },
          {
            min: 0,
            max: 30,
            message: "竞赛名称的长度15个字以内",
            trigger: "blur",
          },
        ],
        compremark: [
          { required: true, message: "请输入介绍信息", trigger: "blur" },
          {
            min: 0,
            max: 100,
            message: "介绍信息的长度50个字以内",
            trigger: "blur",
          },
        ],
        comtime: [
          {
            type: "array",
            required: true,
            message: "请选择时间",
            trigger: "change",
            fields: {
              //tpye类型试情况而定,所以如果返回的是date就改成date
              0: { type: "string", required: true, message: "请选择开始日期" },
              1: { type: "string", required: true, message: "请选择结束日期" },
            },
          },
        ],
        signddltime: [
          {
            type: "string",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
          { validator: checksignddltime, trigger: "change" },
        ],
      },
      //修改竞赛表单数据
      editCompetitionForm: {
        compname: "",
        compremark: "",
        compnumber: 0,
        comtime: [],
        comstarttime: "",
        comendTime: "",
        signddltime: "",
      },
      editItem: [],
      //修改表单的验证规则对象
      editCompetitionFormRules: {
        compname: [
          { required: true, message: "请输入竞赛名称", trigger: "blur" },
          {
            min: 0,
            max: 30,
            message: "竞赛名称的长度15个字以内",
            trigger: "blur",
          },
        ],
        compremark: [
          { required: true, message: "请输入介绍信息", trigger: "blur" },
          {
            min: 0,
            max: 100,
            message: "介绍信息的长度50个字以内",
            trigger: "blur",
          },
        ],
        comtime: [
          {
            type: "array",
            required: true,
            message: "请选择时间",
            trigger: "change",
            fields: {
              //tpye类型试情况而定,所以如果返回的是date就改成date
              0: { type: "string", required: true, message: "请选择开始日期" },
              1: { type: "string", required: true, message: "请选择结束日期" },
            },
          },
        ],
        signddltime: [
          {
            type: "string",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
          { validator: checksignddltime, trigger: "change" },
        ],
      },
      json_fields: {
        学号: "id",
        竞赛名称: "compname",
      },
    };
  },
  created() {
    this.getCompititionList();
  },
  methods: {
    async getCompititionList() {
      const item = {
        id: window.sessionStorage.getItem("id"),
      };
      const myGet = (res) => {
        this.temp = res;
        this.queryInfo.pagenum = 1;
      };
      // const {data: res} = await this.$http.get('http://175.27.240.116:5000/api/Grade',{params: this.queryInfo})
      //需要一个data的实例，现在还没有
      await fetch("http://175.27.240.116:5000/api/CompInfo/GetList", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
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
          compname: this.queryInfo.query,
        };
        const myGet = (res) => {
          this.temp = res;
          this.queryInfo.pagenum = 1;
        };
        await fetch("http://175.27.240.116:5000/api/CompInfo/GetByName", {
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
    //监听pagesize改变事件
    handleSignUpSizeChange(newSize) {
      //console.log(newSize)
      this.sighupInfo.pagesize = newSize;
    },
    //监听页码值改变事件
    handleSignUpCurrentChange(newPage) {
      //console.log(newPage)
      this.sighupInfo.pagenum = newPage;
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addCompetitionFormRef.resetFields();
    },
    // 添加用户
    async addCompetition() {
      // 提交请求前，表单预验证
      this.$refs.addCompetitionFormRef.validate(async (valid) => {
        if (!valid) return;
        const myGet1 = (res1) => {
          this.temp1 = res1;
        };
        this.addCompetitionForm.compstarttime =
          this.addCompetitionForm.comtime[0];
        this.addCompetitionForm.compendTime =
          this.addCompetitionForm.comtime[1];
        await fetch("http://175.27.240.116:5000/api/Student/GetList", {
          //第一个参数是网址
          method: "GET",
          headers: {
            //设置请求头
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "bearer " + window.sessionStorage.getItem("token"),
          },
        })
          .then((response) => response.json())
          .then((res1) => myGet1(res1));
        if (this.temp1.code !== 200) {
          return this.$message.error("添加竞赛信息失败");
        }
        this.studentList = this.temp1.data;
        const myGet3 = (res3) => {
          this.temp3 = res3;
        };
        for (var i = 0; i < this.studentList.length; i++) {
          this.scList.id = this.studentList[i].id;
          this.scList.compname = this.addCompetitionForm.compname;
          this.scList.signstatus = "未报名";
          const item = {
            id: this.scList.id,
            compname: this.scList.compname,
            signstatus: this.scList.signstatus,
          };
          await fetch("http://175.27.240.116:5000/api/StuComp/Insert", {
            //第一个参数是网址
            method: "POST", //表示使用POST方法
            headers: {
              //设置请求头
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "bearer " + window.sessionStorage.getItem("token"),
            },
            body: JSON.stringify(item), //这行是要发送的内容，函数将javascript值转换为json
          })
            .then((response) => response.json())
            .then((res3) => myGet3(res3));
          if (this.temp3.code !== 200) {
            return this.$message.error("添加竞赛信息失败");
          }
        }
        const myGet2 = (res2) => {
          this.temp2 = res2;
        };
        await fetch("http://175.27.240.116:5000/api/CompInfo/Insert", {
          //第一个参数是网址
          method: "POST", //表示使用POST方法
          headers: {
            //设置请求头
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "bearer " + window.sessionStorage.getItem("token"),
          },
          body: JSON.stringify(this.addCompetitionForm), //这行是要发送的内容，函数将javascript值转换为json
        })
          .then((response) => response.json())
          .then((res2) => myGet2(res2));
        if (this.temp2.code !== 200) {
          return this.$message.error("添加竞赛信息失败");
        }
        this.$message.success("添加竞赛信息成功");

        this.getCompititionList();
        this.addDialogVisible = false;
      });
    },
    // 展示编辑当前用户信息
    async showEditDialog(EditData) {
      this.$set(this.editCompetitionForm, "compname", EditData.compname);
      this.$set(this.editCompetitionForm, "compremark", EditData.compremark);
      this.$set(this.editCompetitionForm, "compnumber", EditData.compnumber);
      this.$set(this.editCompetitionForm, "comtime", [
        EditData.compstarttime,
        EditData.compendTime,
      ]);
      this.$set(this.editCompetitionForm, "signddltime", EditData.signddltime);
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editCompetitionFormRef.resetFields();
    },
    // 修改用户信息
    async editCompetition() {
      // 提交请求前，表单预验证
      this.$refs.editCompetitionFormRef.validate(async (valid) => {
        // console.log(valid)
        // 表单预校验失败
        if (!valid) return;
        const item = {
          compname: this.editCompetitionForm.compname,
          compnumber: this.editCompetitionForm.compnumber,
          compremark: this.editCompetitionForm.compremark,
          compstarttime: this.editCompetitionForm.comtime[0],
          compendTime: this.editCompetitionForm.comtime[1],
          signddltime: this.editCompetitionForm.signddltime,
        };
        const myGet = (res) => {
          this.temp = res;
        };
        await fetch("http://175.27.240.116:5000/api/CompInfo/Edit", {
          //第一个参数是网址
          method: "PUT", //表示使用POST方法
          headers: {
            //设置请求头
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "bearer " + window.sessionStorage.getItem("token"),
          },
          body: JSON.stringify(item), //这行是要发送的内容，函数将javascript值转换为json
        })
          .then((response) => response.json())
          .then((res) => myGet(res));
        if (this.temp.code !== 200) {
          return this.$message.error("更新竞赛信息失败");
        }
        this.$message.success("更新竞赛信息成功！");
        // 隐藏添加用户对话框
        this.editDialogVisible = false;
        this.getCompititionList();
      });
    },
    //根据compname删除对应竞赛
    async removeCompeById(DeleteData) {
      //弹框确认删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该竞赛, 是否继续?",
        "提示",
        {
          cancelButtonClass: "cancelbtn",
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });
      if (confirmResult !== "confirm") return this.$message.info("已取消删除");
      //向服务器发送删除数据请求
      const item = {
        compname: DeleteData,
      };
      const myGet = (res) => {
        this.temp = res;
      };
      await fetch("http://175.27.240.116:5000/api/StuComp/DeleteByName", {
        //第一个参数是网址
        method: "DELETE", //表示使用Delete方法
        headers: {
          //设置请求头
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(item), //这行是要发送的内容，函数将javascript值转换为json
      })
        .then((response) => response.json())
        .then((res) => myGet(res));
      if (this.temp.code !== 200) {
        return this.$message.error("删除竞赛信息失败");
      }
      await fetch("http://175.27.240.116:5000/api/CompInfo/DeleteByName", {
        //第一个参数是网址
        method: "DELETE", //表示使用Delete方法
        headers: {
          //设置请求头
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "bearer " + window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(item), //这行是要发送的内容，函数将javascript值转换为json
      })
        .then((response) => response.json())
        .then((res) => myGet(res));
      if (this.temp.code !== 200) {
        return this.$message.error("删除竞赛信息失败");
      }
      this.getCompititionList();
      this.$message.success("删除竞赛信息成功");
    },
    //展示所选竞赛的报名情况
    async showsignup(competi) {
      this.signupdialogVisible = true;
      const item = {
        compname: competi.compname,
      };
      const myGet = (res) => {
        this.temp = res;
      };
      // const {data: res} = await this.$http.get('http://175.27.240.116:5000/api/Grade',{params: this.queryInfo})
      //需要一个data的实例，现在还没有
      await fetch("http://175.27.240.116:5000/api/StuComp/GetByName", {
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
        return this.$message.error("获取报名信息失败");
      }
      this.signupstudentList = this.temp.data;
    },
  },
};
</script>

<style lang="less">
.cancelbtn {
  float: right;
  margin-left: 10px;
}
</style>