import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/RedisChanges/upRedisList',
        method: 'get',
        params: params
    })
}