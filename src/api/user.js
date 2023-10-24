import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
export function getUserInfo() {
  return request({
    url: '/sys/profile'
  })
}
export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function updatePassword(data) {
  return request({
    url: '/sys/user/updatePass',
    method: 'put',
    data
  })
}

export function getDepartment() {
  return request({
    url: '/company/department'
  })
}


export function getManagerList() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 删除部门
 *
*/

export function delDepartment(id) {
  return request({
    method: 'delete',
    url: `/company/department/${id}`
  })
}



/**
 * 导出员工的excel
 * **/

export function exportEmployee() {
  return request({
      url: '/sys/user/export',
      // 改变接收数据的类型
      responseType: 'blob' // 使用blob接收二进制文件流
  })
}