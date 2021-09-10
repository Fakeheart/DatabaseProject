<template>
<div class="container">
  <div class="header">
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-demo"
      mode="horizontal"
      router
      background-color=rgba(255,255,255,0.5)
      text-color="#333"
      active-text-color="#0084ff"
      style="flex:1"
    >
      <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
        <template slot="title">
          <span> {{ item.navItem }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
export default {
    data() {
    return {
        navList:[
            {name:'/comment/question', navItem:'热议问题'},
            {name:'/comment/releaseq', navItem:'发布问题'},
            {name:'/comment/myreply',navItem:'我参与的'},
             {name:'/comment/myquestion', navItem:'我的提问'},
        ]
                      
    }
  },
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  padding: 0 10px;
  margin-bottom:10px;
  box-sizing: border-box;
}
</style>