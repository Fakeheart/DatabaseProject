<template>
  <!-- 用于跳转的中转页面 -->
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
      path: "/teacherannouncement",
    });
  },
};
</script>

<style>
</style>