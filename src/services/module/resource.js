/*
 * @Author: yangws 
 * @Date: 2018-11-18 19:25:21 
 * @Mail: yangwenshou@qq.com 
 */

import { apiDomain, request } from '../config';

// 查询门店资源
export async function queryStoreResource(params) {
  return request(`${apiDomain}/ismc/storeResource/queryStoreResource`, params);
}
// 更新门店资源
export async function updateStoreResource(params) {
  return request(`${apiDomain}/ismc/storeResource/updateStoreResource`, params);
}
