import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/BmsMiningMachinery/list',
        method: 'get',
        params: params
    })
}