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

export function updateStatus(data) {
    return request({
        url: '/umsMember/updateStatus/',
        method: 'post',
        params: params
    })
}

export function upPhone(params) {
    return request({
        url: '/umsMember/upPhone/',
        method: 'post',
        params: params
    })
}
export function updateStatusOne(params) {
    return request({
        url: '/umsMember/updateStatusOne/',
        method: 'post',
        params: params
    })
}
export function getMemberActivate(params) {
    return request({
        url: '/umsMember/getMemberActivate',
        method: 'get',
        params: params
    })
}
export function getMemberClass(params) {
    return request({
        url: '/umsMember/getMemberClass',
        method: 'get',
        params: params
    })
}
export function getMemberIncomeAndExpenses(params) {
    return request({
        url: '/umsMember/getMemberIncomeAndExpenses',
        method: 'get',
        params: params
    })
}
export function getMemberNewlyIncreased(params) {
    return request({
        url: '/umsMember/getMemberNewlyIncreased',
        method: 'get',
        params: params
    })
}

export function getMillIncomeAndExpenses(params) {
    return request({
        url: '/umsMember/getMillIncomeAndExpenses',
        method: 'get',
        params: params
    })
}
export function getMemberIncome(params) {
    return request({
        url: '/umsMember/getMemberIncome',
        method: 'get',
        params: params
    })
}
