import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/BmsHusdtChangeHistory/list',
        method: 'get',
        params: params
    })
}