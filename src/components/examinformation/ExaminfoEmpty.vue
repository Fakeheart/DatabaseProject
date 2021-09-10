<template>
  <!-- 考试安排发布重置刷新跳转的空页面 -->
  <div>
    <h2>Empty Page</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$router.replace({
      path: "/teacherexaminfo",
    });
  },
};
</script>

<style>
</style>