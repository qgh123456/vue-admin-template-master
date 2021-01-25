<template>
    <div class="app-container">
      <!--搜索框-->
      <el-form :inline="true" :model="query" size="mini">
        <el-form-item label="分类名称: ">
          <el-input v-model.trim="query.name"></el-input>
        </el-form-item>
        <el-form-item label="状态: ">
          <el-select v-model="query.status" clearable filterable style="width:105px;">
            <el-option v-for="item in statusOptions" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
          <el-button icon="el-icon-refresh" @click="reload">重置</el-button>
          <el-button icon="el-icon-circle-plus-outline" type="primary" @click="openAdd">新增</el-button>
        </el-form-item>
      </el-form>
      <!--表格-->
      <el-table :data="list" stripe border style="width: 100%;border-radius: 2px">
        <el-table-column type="index" align="center" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="name" label="分类名称" width="180"></el-table-column>
        <el-table-column align="center" prop="sort" label="排序" width="180"></el-table-column>
        <el-table-column align="center" prop="remark" label="备注" width="180"></el-table-column>
        <el-table-column align="center" prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">
              {{ scope.row.status == 1 ? '正常' : '禁用'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="success" @click="handleEdit(scope.row.id)" size="mini">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页组件-->
      <div class="block">
        <!--<span class="demonstration"></span>-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageNo" :page-sizes="[8, 16, 24, 32]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
        </el-pagination>
      </div>

      <!--新增弹框-->
      <edit :title="edit.title" :dialogVisible="edit.visible" :formData="edit.formData" :remoteClose="remoteClose"></edit>

    </div>
</template>

<script>
  import category from '@/api/category'
  import Edit from './edit'

  const statusOptions = [
    {code: 0,name: '禁用'},
    {code: 1,name: '正常'},
  ]

  export default {
        name: "Category",
        components: {
          Edit: Edit
        },
        data(){
          return{
            list: [],
            page: { // 分页对象
              pageNo: 1,
              pageSize: 8,
              total: 0
            },
            // 查询条件
            query: {

            },
            // 状态下拉框数组
            statusOptions,
            edit: {
              title: '',
              visible: false,
              formData: {}
            }
          }
        },
        filters: {
          statusFilter(status){
            // 0 禁用 1 正常
            const statusMap = {0: 'danger',1: 'success'};
            return statusMap[status];
          }
        },
        created(){
          this.fetchData();
        },
        methods: {
          fetchData() {
            console.log(this.query);
            category.getList(this.query,this.page.pageNo,this.page.pageSize).then(response =>{
              // 列表数据
              this.list = response.data.records;
              this.page.total = response.data.total;
            })
          },
          // 条件查询
          queryData(){
            // 将页面变成1
            this.page.pageNo = 1;
            this.fetchData();
          },
          // 重置
          reload(){
            this.query = {};
          },
          handleEdit(id){
            // 修改
            this.edit.visible = true;
            this.edit.title = '修改';
            category.getDetail(id).then(response =>{
              if(response.code == 200){
                console.log(response.data);
                this.edit.formData = response.data;
              };
            })
            // this.edit.formData = this.list.find((ele) => (ele.id == id));
          },
          handleDelete(id){
            this.$confirm('确认删除这条记录吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              category.deleteData(id).then(response =>{
                  this.$message({
                    message: '删除成功',
                    type: response.code == 200 ? 'success' : 'warning'
                  });
                // 刷新列表
                this.queryData();
              }).catch(response =>{
                this.$message({
                  message: '删除异常',
                  type: 'error'
                });
              });
            }).catch(() => {
              // 取消删除
            });
          },
          // val 切换之后的每页显示多少条
          handleSizeChange(val){
            this.page.pageSize = val;
            this.fetchData();
          },
          handleCurrentChange(val){
            this.page.pageNo = val;
            this.fetchData();
          },
          // 子组件会触发此事件的方法来关闭窗口
          remoteClose(){
              this.edit.formData = {};
              this.edit.visible = false;
              this.fetchData();
          },
          // 打开新增窗口
          openAdd(){
            this.edit.visible = true;
            this.edit.title = '新增';
          },


        }
    }

</script>

<style scoped>

</style>
