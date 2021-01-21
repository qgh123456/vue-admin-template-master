<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">

    <el-form :rules="rules" ref="formData" :model="formData" label-width="100px" label-position="right" style="width: 400px" status-icon>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序: " prop="sort">
        <el-input-number v-model="formData.sort" :min="1" :max="10000" style="width: 300px;"></el-input-number>
      </el-form-item>
      <el-form-item label="备注: " prop="remark">
        <el-input type="textarea" v-model="formData.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">确定</el-button>
        <el-button @click="cancelForm()">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<script>
    import category from '@/api/category';
    export default {
      data(){
        return {
          rules: {
              name: [
                {required: true,message: '请输入分类名称',trigger: 'blur'}
              ],
              status: [
                {required: true,message: '请选择状态',trigger: 'change'}
              ],
              sort: [
                {required: true,message: '请选择排序号',trigger: 'blur'}
              ]
            }
        }
      },
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
      methods: {
        // 关闭窗口
        handleClose(){
          // 将表单清空
          this.$refs['formData'].resetFields();
          // 通过调用方法去来关闭
          this.remoteClose();
        },
        // 提交表单数据
        submitForm(formName){
          this.$refs[formName].validate((valid) => {
            if(valid){
              // 校验通过提交表单数据
              this.submitData();
            }else {
              return false;
            }
          })
        },
        async submitData(){
          let response = null;
          if(typeof(this.formData.id) == "undefined"){
            // 新增
            response = await category.add(this.formData);
          }else {
            // 修改
            response = await category.edit(this.formData);
          }
          if(response.code === 200){
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            // 关闭窗口
            this.handleClose()
          }else {
            this.$message({
              message: '保存失败',
              type: 'error'
            })
          }
           },
        async editData(){
          // 获取返回值
          category.edit(this.formData).then(response => {
            if(response.code == 200){
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              // 关闭窗口
              this.handleClose();
            }else {
              this.$message({
                message: '修改失败',
                type: 'error'
              });
            }
          })
        },
        cancelForm(){
          // 关闭窗口
          this.handleClose();
        }

      }
    }
</script>

<style scoped>

</style>
