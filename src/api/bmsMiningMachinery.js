import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/BmsMiningMachinery/list',
        method: 'get',
        params: params
    })
}
  export function BmsMiningMachineryCycleList(params) {
    return request({
      url: '/BmsMiningMachineryCycle/list',
      method: 'get',
      params: params
    })
  }  export function BmsMiningMachineryCycleListOne(params) {
    return request({
      url: '/BmsMiningMachineryCycle/listOne',
      method: 'get',
      params: params
    })
  }
  export function upBmsMiningMachineryCycle(params) {
    return request({
      url: '/BmsMiningMachineryCycle/upBmsMiningMachineryCycle',
      method: 'post',
      params: params
    })
  }

