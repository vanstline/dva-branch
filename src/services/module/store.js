/*
 * @Author: yangws 
 * @Date: 2018-11-13 21:43:44 
 * @Mail: yangwenshou@qq.com 
 */
import { apiDomain, request } from '../config';

// 查询门店个人信息接口
export async function queryStoreUserInfo() {
  return request(`${apiDomain}/ismc/store/queryStoreUserInfo`, {});
}
export async function queryStoreHomePageInfo(params) {
  // return {
  //   returnCode: 0,
  //   returnMsg: '',
  //   timestamp: 1542538900834,
  //   data: {
  //     canSelectYears: ['2018'],
  //     deliveryNum: 2,
  //     demandNum: 3,
  //     headimgurl: '',
  //     id: 1,
  //     installNum: 2,
  //     messageNum: 1,
  //     mobile: '15001894728',
  //     storeId: 1,
  //     storeName: '前端模拟数据',
  //     storeNo: '123333',
  //     username: '临时名称',
  //   },
  // };
  return request(`${apiDomain}/ismc/store/queryStoreHomePageInfo`, params);
}
// 查询物料月度采购统计接口
export async function queryMonthMaterialCountInfo(params) {
  return request(`${apiDomain}/ismc/store/queryMonthMaterialCountInfo`, params);
}
// 修改门店个人信息接口
export async function updateStoreUserInfo(params) {
  return request(`${apiDomain}/upc/storeUser/updateStoreUserInfo`, params);
}
// 查询门店收货地址
export async function queryStoreDistribution(params) {
  return request(`${apiDomain}/ismc/storeDistribution/queryStoreDistribution`, params);
}
