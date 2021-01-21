import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/acs/login?username=' + data.username +"&password=" + data.password,
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/acs/admin/getUserInfo',
    method: 'get',
    // params: { token },
  /*  headers: {
      'Authorization':token,
    },*/
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
