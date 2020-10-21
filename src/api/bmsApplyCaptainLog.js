import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/bmsApplyCaptainLog/list',
        method: 'get',
        params: params
    })
}

export function agreeApply(id, params) {
    return request({
        url: '/bmsApplyCaptainLog/upStatus/' + id,
        method: 'post',
        params: params
    })
}

export function disagreeApply(id, params) {
    return request({
        url: '/bmsApplyCaptainLog/upStatus/' + id,
        method: 'post',
        params: params
    })
}