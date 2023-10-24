import request from '@/utils/request'
/**
 * 新增组织
 * ***/
export function addDepartment(data) {
    return request({
        method: 'post',
        url: '/company/department',
        data
    })
}

export function getManagerList() {
    return request({
        url: '/sys/user/simple'
    })
}


/**
 * 获取部门详情
 *
 * ***/

export function getDepartmentDetail(id) {
    return request({
        url: `/company/department/${id}`
    })
}

/** *
 * 更新部门
 * ***/
export function updateDepartment(data) {
    return request({
        method: 'put',
        url: `/company/department/${data.id}`,
        data
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


export function getDepartment() {
    return request({
        url: '/company/department',
        method: 'get'
    })
}