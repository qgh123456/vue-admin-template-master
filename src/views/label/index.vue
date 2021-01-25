<template>
  <div>
    <div class="app-container">
      <!--搜索框-->
      <el-form :inline="true" :model="query" size="mini">
        <el-form-item label="标签名称: ">
          <el-input v-model.trim="query.labelName"></el-input>
        </el-form-item>
        <el-form-item label="分类名称: ">
          <el-select v-model.trim="query.id" clearable filterable style="width:105px;">
            <el-option v-for="item in categoryNameOptions" :key="item.id" :label="item.name" :value="item.id">
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
        <el-table-column align="center" prop="labelName" label="标签名称" width="180"></el-table-column>
        <el-table-column align="center" prop="categoryName" label="分类名称" width="180"></el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="success" @click="handleEdit(scope.row.id)" size="mini">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页组件-->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.current" :page-sizes="[8, 16, 24, 32]" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
        </el-pagination>
      </div>

      <!--新增弹框-->
      <edit :title="edit.title" :dialogVisible="edit.visible" :formData="edit.formData" :remoteClose="remoteClose"></edit>
    </div>
  </div>

</template>

<script>
  import api from '@/api/label';
  import categoryApi from '@/api/category';
  import Edit from '@/views/label/edit'

    export default {
        name: "Label",
        components: {Edit},

        data() {
          return {
            list: [], // 封装列表数据
            page: { // 分页对象
              current: 1,
              size: 20,
              total: 0
            },
            query: {},
            categoryNameOptions: [],
            edit: {
              title: '',
              visible: false,
              formData: {}
            }
          }
        },

        created() {
          this.fetchData();
          this.getListCategory();
        },

        methods: {
          fetchData() {
            api.getList(this.query,this.page.current,this.page.size).then(response => {
                this.list = response.data.records;
                this.page.total = response.data.total;
            })
          },
          getListCategory(){
            categoryApi.getListCategory("").then(response =>{
              this.categoryNameOptions = response.data;
              console.log(response);
            })
          },
          handleEdit(id){
            console.log('编辑',id);
          },
          handleDelete(id){
            console.log('删除',id);
          },
          handleSizeChange(val){
            this.page.size = val;
            this.fetchData();

          },
          handleCurrentChange(val){
            this.page.current = val;
            this.fetchData();
          },
          queryData(){
            this.query.current = 1;
            this.fetchData();
          },
          reload(){
            this.query = {};
          },
          // 打开新增窗口
          openAdd(){
            // this.edit.visible = true;
            // this.edit.title = '新增';
          }
        }

    }
</script>

<style scoped>

</style>
