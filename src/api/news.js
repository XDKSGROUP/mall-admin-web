import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/CmsNews/list',
    method:'get',
    params:params
  })
}
// export function updateStatus(id,params) {
//   return request({
//     url:'/home/advertise/update/status/'+id,
//     method:'post',
//     params:params
//   })
// }
// export function deleteHomeAdvertise(data) {
//   return request({
//     url:'/home/advertise/delete',
//     method:'post',
//     data:data
//   })
// }
export function createNews(data) {
  return request({
    url:'/CmsNews/addNews',
    method:'post',
    data:data
  })
}
 export function getNews(id) {
   return request({
     url:'/CmsNews/'+id,
     method:'get',
   })
 }

 export function updateNews(id,data) {
   return request({
     url:'/CmsNews/upNews/'+id,
     method:'post',
     data:data
   })
 }
