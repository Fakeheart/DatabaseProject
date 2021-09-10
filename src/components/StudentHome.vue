<template>
  <el-container class="home-container">
    <!--头部区-->
    <el-header>
      <div>
        <!-- logo -->
        <div class="logo_box">
          <img src="../assets/homelogo.png" alt="" />
        </div>
        <span style="font-size: 20px; font-weight: 550; color: #dcdcdc"
          >中学生考试管理系统</span
        >
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <!--页面主体区-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">
          <div v-if="this.isCollapse == true">
            <i class="el-icon-s-fold"></i>
          </div>
          <div v-else>
            <i class="el-icon-s-unfold"></i>
          </div>
        </div>
        <el-menu
          background-color="#668B8B"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- :unique-opened="true"->只允许展开一个菜单 -->
          <!-- :collapse-transition="false" -> 关闭动画 -->
          <!-- router -> 导航开启路由模式 -->
          <el-menu-item
            index="/studenthome"
            @click="saveNavState('/studenthome')"
          >
            <i class="el-icon-s-home" style="color: #dcdcdc"></i>
            <span slot="title">主 页</span>
          </el-menu-item>
          <!-- 一级菜单  -->
          <el-submenu
            :index="item.id + ' '"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <i :class="item.iconsObj" style="color: #dcdcdc"></i>
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <!-- 导航开启路由模式：
                      将index值作为导航路由 -->
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <i class="el-icon-menu" style="color: #dcdcdc"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧主体区-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [
        {
          id: 101,
          authName: "考试成绩",
          iconsObj: "el-icon-document",
          path: null,
          children: [
            {
              id: 102,
              authName: "成绩信息",
              path: "grade",
            },
            {
              id: 103,
              authName: "成绩分析与模拟",
              path: "gradeanalysis",
            },
          ],
        },
        {
          id: 201,
          authName: "竞赛报名",
          iconsObj: "el-icon-coordinate",
          path: null,
          children: [
            {
              id: 202,
              authName: "竞赛报名",
              path: "competition",
            },
          ],
        },
        {
          id: 301,
          authName: "问卷调查",
          iconsObj: "el-icon-s-claim",
          path: null,
          children: [
            {
              id: 302,
              authName: "填写问卷",
              path: "viewQuest",
            },
          ],
        },
        {
          id: 401,
          authName: "问答区",
          iconsObj: "el-icon-s-comment",
          path: null,
          children: [
            {
              id: 402,
              authName: "问答区",
              path: "comment",
            },
          ],
        },
        {
          id: 501,
          authName: "考试信息",
          iconsObj: "el-icon-star-on",
          path: null,
          children: [
            {
              id: 502,
              authName: "考试信息查询",
              path: "examinformation",
            },
          ],
        },
        {
          id: 601,
          authName: "通知公告",
          iconsObj: "el-icon-reading",
          path: null,
          children: [
            {
              id: 602,
              authName: "公告信息",
              path: "announcement",
            },
          ],
        },
      ],
      // 默认不折叠
      isCollapse: false,
      // 被激活导航地址
      activePath: "",
    };
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    logout() {
      // 清空token
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    async getMenuList() {
      //const { data: res } = await this.$http.get('menus')
      //if(res.meta.status!=200) return this.$message.error(res.meta.msg)
      //this.menulist = res.data
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #53868b;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #668b8b;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #668b8b;
  font-size: 15px;
  line-height: 24px;
  color: #87cefa;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  padding: 10px;
}
.logo_box {
  height: 60px;
  width: 60px;
  border: 5px #53868b;
  border-radius: 50%; /* 圆角 */
  position: relative;
  margin: 30px;
}
.port_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%; /* 圆角 */
  background-color: #53868b;
}
</style>
