<template>
  <el-dialog  :title="title" :visible.sync="dialogVisible" width="400px" :before-close="cancelForm">

    <el-form :rules="rules" ref="formData" :model="formData" label-width="100px"  label-position="right" style="width: 300px" status-icon>
      <el-form-item label="标签名称: "  prop="labelName">
        <el-input v-model.trim="formData.labelName" clearable></el-input>
      </el-form-item>
      <el-form-item label="分类名称: " prop="categoryId">
        <el-select v-model.trim="formData.categoryId"  clearable filterable >
          <el-option v-for="item in categoryNameOptions" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
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
  import api from '@/api/label.js';
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
          categoryNameOptions: {
            type: Array,
            default: []
          },
          remoteClose: Function
      },
      data(){
        return {
          rules: {
            labelName: [
              {required: true,message: '请输入标签名称',trigger: 'blur'}
            ],
            categoryId: [
              {required: true,message: '请输入分类名称',trigger: 'blur'}
            ]
          }
        }
      },
      methods: {
          // 关闭弹窗
        cancelForm() {
          // 表单清空
          this.$refs['formData'].resetFields();
          // 调用父组件中的方法关闭窗口
          this.remoteClose();

        },
        submitForm(formName){

          // 提交表单
          this.$refs[formName].validate((valid) => {
            if(valid) {
              // 通过校验，提交表单
              this.submitData();

            }else {
              return false;

            }
          })
        },
        // 调用接口,提交数据
        async submitData() {
          let response = await api.add(this.formData);
          if(response.code = 200){
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            // 关闭窗口
            this.cancelForm();
          }else {
            this.$message({
              message: '保存失败',
              type: 'error'
            })
          }
        }
      }
    }
</script>

<style scoped>

</style>
