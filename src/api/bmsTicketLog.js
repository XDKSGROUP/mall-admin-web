import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/BmsTicketLog/list',
        method: 'get',
        params: params
    })
}