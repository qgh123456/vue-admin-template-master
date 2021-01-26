import request from '@/utils/request'

export default {
  // 分页条件查询列表
  getList(query,pageNo = 1,pageSize = 20){
    return request({
      url: `/acs/label/getList/${pageNo}/${pageSize}`,
      method: 'post',
      data: query // 合并为一个新对象
    })
  },
  // 新增标签
  add(data){
    return request({
      url: `/acs/label/saveLabel`,
      method: 'post',
      data: data
    })
  },
  // 获取详情
  getDetail(id){
    return request({
      url: `/acs/label/selectLabelById`,
      method: 'get',
      params: {id:id}
    })
  },
  deleteLabel(id){
    return request({
      url: `/acs/label/deleteLabel`,
      method: 'delete',
      params: {id:id}
    })
  },
  updateLabel(data){
    return request({
      url: `/acs/label/updateLabel`,
      method: 'put',
      data: data
    })
  }

}
