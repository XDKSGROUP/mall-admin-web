import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/RedisChanges/list',
        method: 'get',
        params: params
    })
}

export function updateRedis(params) {
    return request({
      url:'/RedisChanges/upRedis',
      method:'post',
      params:params
    })
  }