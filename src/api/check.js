import request from '@/utils/request'

export function getCheckInfoById (parameter) {
  return request({
    // url: api.service,
    url: 'http://localhost:8089/configcenter/checkList/get',
    method: 'get',
    params: parameter
  })
}

// 根据医院 id 获取检测单列表详情
export function getCheckListByHospitalId (parameter) {
  return request({
    url: 'http://localhost:8089/configcenter/checkList/listAll',
    method: 'get',
    params: parameter
  })
}

export function updateCheckListById (data) {
  return request({
    // url: userApi.twoStepCode,
    url: 'http://localhost:8089/configcenter/checkList/update',
    method: 'post',
    data
  })
}

// 创建单子一件
export function createCheckList (data) {
  return request({
    // url: userApi.twoStepCode,
    url: 'http://localhost:8089/configcenter/checkList/create',
    method: 'post',
    data
  })
}
