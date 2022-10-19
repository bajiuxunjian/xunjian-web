import request from '@/utils/request'

export const getUser = (parameter) => {
  return request({
    // url: api.service,
    url: 'http://47.92.99.126:8089/configcenter/user/list',
    method: 'get',
    params: parameter
  })
}

// 更新用户信息
export const updateUser = (parameter) => {
  return request({
    url: 'http://47.92.99.126:8089/configcenter/user/update',
    method: 'post',
    data: parameter
  })
}

// 创建用户
export const createUser = (parameter) => {
  return request({
    url: 'http://47.92.99.126:8089/configcenter/user/create',
    method: 'post',
    data: parameter
  })
}
