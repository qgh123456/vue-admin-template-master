<template>
  <div class="app-container">
    <!--搜索框-->
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="文章标题: ">
        <el-input v-model.trim="query.title"></el-input>
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
      <el-table-column align="center" prop="title" label="文章标题" width="180"></el-table-column>
      <el-table-column align="center" prop="viewCount" label="浏览数" width="180"></el-table-column>
      <el-table-column align="center" prop="thumhup" label="点赞数" width="180"></el-table-column>
      <el-table-column align="center" prop="isPublish" label="是否公开" width="180">
        <template slot-scope="scope">
            {{ scope.row.isPublish}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态" width="180">
        <template slot-scope="scope">
            {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateDate" label="最后更新时间" width="180"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row.id)" size="mini">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row.id)" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageNo" :page-sizes="[8, 16, 24, 32]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
      </el-pagination>
    </div>

 <!--   &lt;!&ndash;新增弹框&ndash;&gt;
    <edit :title="edit.title" :dialogVisible="edit.visible" :formData="edit.formData" :remoteClose="remoteClose"></edit>
-->
  </div>
</template>

<script>
  import api from '@/api/article.js';

    export default {
        name: "Article",
        created(){
          this.fetchData();
        },
        data(){
          return{
            list: [],
            page: { // 分页对象
              pageNo: 1,
              pageSize: 8,
              total: 0
            },
            statusOptions: [],
            // 查询条件
            query: {

            },
          }
        },
        methods: {
          fetchData() {
            api.getList(this.query,this.page.pageNo,this.page.pageSize).then(response =>{
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
          // val 切换之后的每页显示多少条
          handleSizeChange(val){
            this.page.pageSize = val;
            this.fetchData();
          },
          handleCurrentChange(val){
            this.page.pageNo = val;
            this.fetchData();
          },
          openAdd(){

          }
        }


    }
</script>

<style scoped>

</style>
