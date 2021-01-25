<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">

    <el-form ref="formData" :model="formData" label-width="100px" label-position="right" style="width: 300px" status-icon>
      <el-form-item label="标签名称: " prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="分类名称: ">
        <el-select v-model.trim="formData.categoryId" clearable filterable>
         <!-- <el-option v-for="item in categoryNameOptions" :key="item.id" :label="item.name" :value="item.id">
          </el-option>-->
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">确定</el-button>
        <el-button @click="cancelForm()">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

</template>

<script>
    export default {
        name: "edit.vue",
        props: {
          title: {
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
      methods: {
        cancelForm() {

        },
        submitForm(formName){

    }
      }
    }
</script>

<style scoped>

</style>
