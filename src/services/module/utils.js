/*
 * @Author: yangws 
 * @Date: 2018-11-14 21:58:52 
 * @Mail: yangwenshou@qq.com 
 */

import { apiDomain, request } from '../config';
import { getAuthority } from '@/utils/authority.js';

// 短信验证码发送
export async function sendSmsCaptcha(params) {
  return request(`${apiDomain}/cmc/auth/sendSmsCaptcha`, params, {
    // headers: {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json;charset=UTF-8',
    // },
  });
}
export async function uploadByBase64(params) {
  return request(`${apiDomain}/cmc/uploadByBase64`, params, {
    // headers:{
    //   authorization:'bearer ' + getAuthority()
    // }
  });
}
