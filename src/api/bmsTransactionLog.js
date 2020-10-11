import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/BmsTransactionLog/list',
        method: 'get',
        params: params
    })
}