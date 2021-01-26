<template>
  <div class="app-container">
    <!--搜索框-->
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="文章标题:">
        <el-input v-model.trim="query.title"></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="query.status" clearable filterable style="width:120px;">
          <el-option label="未审核" :value="1"></el-option>
          <el-option label="审核通过" :value="2"></el-option>
          <el-option label="审核未通过" :value="3"></el-option>
          <el-option label="已删除" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reload">重置</el-button>
        <!--<el-button icon="el-icon-circle-plus-outline" type="primary" @click="openAdd">新增</el-button>-->
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
          <el-tag v-if="scope.row.isPublish == 0" type="danger">不公开</el-tag>
          <el-tag v-if="scope.row.isPublish == 1" type="warning">公开</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <!--0 已删除 1 未审核 2 已审核 3 审核未通过-->
          <el-tag v-if="scope.row.status == 0" type="danger">已删除</el-tag>
          <el-tag v-if="scope.row.status == 1">未审核</el-tag>
          <el-tag v-if="scope.row.status == 2" type="success">审核通过</el-tag>
          <el-tag v-if="scope.row.status == 3" type="warning">审核未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateTime" label="最后更新时间" width="180"></el-table-column>
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
            this.fetchData();
          },
          // val 切换之后的每页显示多少条
          handleSizeChange(val){
            this.page.pageSize = val;
            this.fetchData();
          },
          handleCurrentChange(val){
            this.page.pageNo = val;
            this.fetchData();
          }
        }


    }
</script>

<style scoped>

</style>
