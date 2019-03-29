import fetch from 'dva/fetch';

import hash from 'hash.js';
import { Toast } from 'antd-mobile';
import router from 'umi/router';

import { enCodeChar, sign } from '@/utils/utils';
import { getAuthority } from '@/utils/authority.js';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, params, option, skip) {
  const path = window.location.pathname;
  const isGuest = path.indexOf('/login') === 0;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...option,
  };

  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (params ? JSON.stringify(params) : '');
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');

  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    // 特殊处理 application/json
    if (newOptions.headers['Content-Type'] === 'application/json;charset=UTF-8') {
      const singData = sign({}, true);

      if (singData && singData.signature) {
        url = `${url}?signature=${singData.signature}&timestamp=${singData.timestamp}`;

        newOptions.headers['authorization'] = 'bearer ' + getAuthority();
      }
      newOptions.body = JSON.stringify(params);
    } else {
      // 注入签名
      if (!isGuest || url.indexOf('upc/user/wechatJoint') > 0) {
        params = sign(params || {});
      }
      newOptions.body = enCodeChar(params);
    }
  }

  const expirys = options.expirys && 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }
  return (
    fetch(url, newOptions)
      // .then(checkStatus)
      // .then(response => cachedSave(response, hashcode))
      .then(response => {
        // DELETE and 204 do not return data by default
        // using .json will report an error.
        if (newOptions.method === 'DELETE' || response.status === 204) {
          return response.text();
        }
        return response.json();
      })
      .then(data => {
        if (Number(data.returnCode) !== 0 && !isGuest) {
          // 登录失效
          if (data.returnCode === -110) {
            window.location.href = '/login?refresh_token=' + getAuthority('refresh_token');
            return false;
          }
          if (data.error === 'invalid_token') {
            window.location.href = '/login?refresh_token=' + getAuthority('refresh_token');
          }
          Toast.fail(data.error || data.msg || data.returnMsg || '请求失败');

          return { code: 1, msg: data.message || data.msg || '请求失败' };
        }
        return data;
      })
      .catch(error => {
        let msg;
        // console.log(error)
        switch (error.toString()) {
          case 'TypeError: Failed to fetch':
            msg = '请求失败';
            //

            // router.push({
            //   pathname: '/login',
            //   query: {
            //     refresh_token: getAuthority('refresh_token'),
            //   },
            // });
            break;
          case 'timeout':
            msg = '请求超时';
            break;
          default:
            msg = '请求失败';
        }
        Toast.offline(msg);
        return { errcode: 1, status: 1, msg };
      })
  );
}
