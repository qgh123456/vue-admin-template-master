<template>
  <el-dialog :title="title" :visible.sync="visible" width="70%" :before-close="handleClose">
    <!--审核文章-->
  </el-dialog>
</template>

<script>
    export default {
      name: "audit.vue",

      props:{
        title: { // 弹窗的标题
          type: String,
          default: ''
        },
        dialogVisible: { // 弹出窗口
          type: Boolean,
          default: false
        },
        formData: { // 提交表单数据
          type: Object,
          default: {}
        },
        remoteClose: Function
      },
    }
</script>

<style scoped>

</style>
