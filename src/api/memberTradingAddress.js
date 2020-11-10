import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/umsMTA/list',
        method: 'get',
        params: params
    })
}
export function getBalanceOen(params) {
  return request({
    url:'/eth/getBalanceOen/',
    method:'get',
    params:params
  })
}
export function ethCallOne(params) {
  return request({
    url:'eth/ethCallOne/',
    method:'get',
    params:params
  })
}
