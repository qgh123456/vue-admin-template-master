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
  }

}
