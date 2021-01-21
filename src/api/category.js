import request from '@/utils/request';


export default {
  // 查询分页列表
  getList(query,pageNo,pageSize){
    return request({
      url: '/acs/category/getList/' + pageNo + '/' + pageSize,
      method: 'post',
      params: query
    })
  },
  add(data){
    return request({
      url: `/acs/category/saveCategory`,
      method: 'post',
      data: data
    })
  },
  edit(data){
    return request({
      url: `/acs/category/updateCategory`,
      method: 'put',
      data: data
    })
  },
  deleteData(id){
    return request({
      url: '/acs/category/deleteCategory/' + id,
      method: 'delete'
      // , params: {id: id}
    })
  },
  getDetail(id){
    return request({
      url: '/acs/category/getCategoryDetail/' + id,
      method: 'get'
      // , params: {id: id}
    })
  },

}
