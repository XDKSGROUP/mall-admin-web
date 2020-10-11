import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/umsMTA/list',
        method: 'get',
        params: params
    })
}