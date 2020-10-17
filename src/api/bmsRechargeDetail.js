import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/BmsRechargeDetail/list',
        method: 'get',
        params: params
    })
}

export function addRechargeDetail(data) {
    return request({
      url: '/BmsRechargeDetail/add',
      method: 'post',
      data: data
    })
  }