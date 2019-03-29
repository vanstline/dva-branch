/*
 * @Author: yangws 
 * @Date: 2018-11-12 22:19:41 
 * @Mail: yangwenshou@qq.com 
 */
import { request, apiDomain, fetchFn } from '../config';

export async function oauthToken(params) {
  params = {
    client_id: 'test',
    client_secret: 'test',

    ...params,
  };

  return request(`${apiDomain}/upc/oauth/token`, params);
}
export async function smsOauthToken(params) {
  params = {
    client_id: 'test',
    client_secret: 'test',

    ...params,
  };

  return request(`${apiDomain}/upc/oauth/sms`, params);
}
export async function wechatOauthToken(params) {
  params = {
    client_id: 'test',
    client_secret: 'test',

    ...params,
  };

  return request(`${apiDomain}/upc/oauth/wechat`, params);
}
// 微信登录用户绑定openid
export async function wechatJoint(params) {
  return request(`${apiDomain}/upc/user/wechatJoint`, params);
}

export async function logout(params) {
  return request(`${apiDomain}/upc/user/logout`, params);
}
//
// /upc/user/wechatJoint
// http://ism.proxy.linjiash.com/upc/oauth/wechat?client_id=test&client_secret=test&code=111

// export
// /oauth/token?client_id=test&client_secret=test&grant_type=refresh_token&refresh_token=724db3b5-3894-431a-bda9-8fd412013288
