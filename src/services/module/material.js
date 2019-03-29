/*
 * @Author: yangws 
 * @Date: 2018-11-18 20:23:15 
 * @Mail: yangwenshou@qq.com 
 */

import { apiDomain, request } from '../config';

// 分页查询物料列表
export async function queryMaterialPage(params) {
  return request(`${apiDomain}/ismc/material/queryMaterialPage`, params);
}
// 查询物料详情
export async function queryMaterialDtl(params) {
  return request(`${apiDomain}/ismc/material/queryMaterialDtl`, params);
}
