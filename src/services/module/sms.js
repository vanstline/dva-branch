/*
 * @Author: yangws 
 * @Date: 2018-11-14 21:58:52 
 * @Mail: yangwenshou@qq.com 
 */

import { apiDomain, request } from '../config';

// 短信验证码发送
export async function sendSmsCaptcha(params) {
  return request(`${apiDomain}/cmc/sms/sendSmsCaptcha`, params);
}
