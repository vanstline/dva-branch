/*
 * @Author: yangws 
 * @Date: 2018-11-14 22:34:57 
 * @Mail: yangwenshou@qq.com 
 */

import { request, apiDomain } from '../config';

// 我的任务列表接口
export async function queryTaskListPage(params) {
  return request(`${apiDomain}/ismc/task/queryTaskListPage`, params);
}
// 查询物料需求提报任务详情接口
export async function queryMaterialDemandTaskDeatil(params) {
  return request(`${apiDomain}/ismc/task/queryMaterialDemandTaskDeatil`, params);
}
// 收货、安装确认信息接口
export async function queryStoreDeliveredConfirmInfo(params) {
  return request(`${apiDomain}/ismc/task/queryStoreDeliveredConfirmInfo`, params);
}
// 查询收货、安装任务详情接口
export async function queryStoreDeliveredTaskDeatil(params) {
  return request(`${apiDomain}/ismc/task/queryStoreDeliveredTaskDeatil`, params);
}
// 需求单详情接口
export async function queryStoreDemandOrderDetail(params) {
  return request(`${apiDomain}/ismc/task/queryStoreDemandOrderDetail`, params);
}
// 查询门店需求单列表接口
export async function queryStoreDemandOrderListPage(params) {
  return request(`${apiDomain}/ismc/task/queryStoreDemandOrderListPage`, params);
}
// 物料需求单提交接口
export async function saveStoreDemandOrder(params) {
  return request(`${apiDomain}/ismc/task/saveStoreDemandOrder`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
// 确认收货、安装接口
export async function storeDeliveredConfirm(params) {
  return request(`${apiDomain}/ismc/task/storeDeliveredConfirm`, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
// 查询需求单收货信息接口
export async function queryStoreOrderDistributionInfo(params) {
  return request(`${apiDomain}/ismc/task/queryStoreOrderDistributionInfo`, params);
}
