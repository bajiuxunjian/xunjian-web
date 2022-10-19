import request from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  hospitalList: '/hospitalList',
  getHospitalInspectList: '/getHospitalInspectList'
}

export default api

/**
 * 根据医院列表
 */
export function getHospitalList (parameter) {
  return request({
    // url: api.hospitalList,
    url: 'http://47.92.99.126:8089/configcenter/hospitalInfo/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取医院详情
 */
export function getHospitalInfo (parameter) {
  return request({
    // url: api.service,
    url: 'http://47.92.99.126:8089/configcenter/hospitalInfo/get',
    method: 'get',
    params: parameter
  })
}

// 创建医院
export function createHospital (data) {
  return request({
    // url: userApi.twoStepCode,
    url: 'http://47.92.99.126:8089/configcenter/hospitalInfo/create',
    method: 'post',
    data
  })
}

export function updateHospitalInfo (data) {
  return request({
    // url: userApi.twoStepCode,
    url: 'http://47.92.99.126:8089/configcenter/hospitalInfo/update',
    method: 'post',
    data
  })
}

// 获取全部检测单元列表
export function getAllInspectorList (parameter) {
  return request({
    // url: api.service,
    url: 'http://47.92.99.126:8089/configcenter/inspector/list',
    method: 'get',
    params: parameter
  })
}
// 删除检测单元项
export function delInspectorById (parameter) {
  return request({
    // url: api.service,
    url: 'http://47.92.99.126:8089/configcenter/inspector/del',
    method: 'get',
    params: parameter
  })
}

export function getInspectorById (parameter) {
  return request({
    // url: api.service,
    url: 'http://47.92.99.126:8089/configcenter/inspector/get',
    method: 'get',
    params: parameter
  })
}
// 新建检测项
export function createInspector (data) {
  return request({
    // url: userApi.twoStepCode,
    url: 'http://47.92.99.126:8089/configcenter/inspector/create',
    method: 'post',
    data
  })
}

// 更新检测项
export function updateInspector (data) {
  return request({
    // url: userApi.twoStepCode,
    url: 'http://47.92.99.126:8089/configcenter/inspector/update',
    method: 'post',
    data
  })
}

/**
 * 获取当前医院所有的检测详情
 */
export function getHospitalInspectList (parameter) {
  return request({
    url: api.getHospitalInspectList,
    method: 'get',
    params: parameter
  })
}

export function getUserList (parameter) {
  return request({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return request({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return request({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions (parameter) {
  return request({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return request({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return request({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}

export function saveSub (sub) {
  return request({
    url: '/sub',
    method: sub.id === 0 ? 'post' : 'put',
    data: sub
  })
}
