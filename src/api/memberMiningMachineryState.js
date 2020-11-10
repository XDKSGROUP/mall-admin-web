import request from '@/utils/request'
export function BmsMiningMachineryOrderDetailList(params) {
  return request({
    url:'/BmsMiningMachineryOrderDetail/list',
    method:'get',
    params:params
  })
}
