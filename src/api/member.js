import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/umsMember/list',
        method: 'get',
        params: params
    })
}

export function batchResetLoginPassword(id, params) {
    return request({
        url: '/admin/batchResetLoginPassword/' + id,
        method: 'post',
        params: params
    })
}

export function exportExcel(params) {
    //window.location.href="http://192.168.110.100:8088/lctext/export?pageSize=5&pageNum=1"
    return request({
        url: '/lctext/export',
        method: 'get',
        params: params,
        responseType: 'blob',
    })
}

export function getMemberDetail(id) {
    return request({
        url: '/umsMember/list/' + id,
        method: 'get'
    });
}

export function updateStatus( params) {
    return request({
        url: '/umsMember/updateStatus/',
        method: 'post',
        params: params
    })
}