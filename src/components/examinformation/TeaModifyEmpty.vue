<template>
  <!-- 考试安排“修改”和“重置”刷新跳转的空页面 -->
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
      path: "/teachermodifyexam",
    });
  },
};
</script>

<style>
</style>