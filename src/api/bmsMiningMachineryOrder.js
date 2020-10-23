import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/BmsMiningMachineryOrderDetail/list',
        method: 'get',
        params: params
    })
}