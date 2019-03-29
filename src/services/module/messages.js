/*
 * @Author: yangws 
 * @Date: 2018-11-12 22:19:47 
 * @Mail: yangwenshou@qq.com 
 */
import { request, apiDomain } from '../config';

// 查询消息列表接口
export async function queryMesssageListPage(params) {
  return request(`${apiDomain}/ismc/message/queryMesssageListPage`, params);
}
// 修改消息状态接口
export async function updateMesssageStatus(params) {
  return request(`${apiDomain}/ismc/message/updateMesssageStatus`, params);
}
