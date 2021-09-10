<template>
  <div class="message">
    <el-button type="text" @click="DialogVisible = true">查看详情</el-button>
    <el-dialog title="公告" :visible.sync="DialogVisible" width="60%" center>
      <span>{{ text }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="DialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      DialogVisible: false,
    };
  },
  props: {
    text: { type: String, required: true, default: "" },
  },
};
</script>