/*
 * @Author: yangws 
 * @Date: 2018-11-14 18:28:58 
 * @Last Modified by: yangws
 * @Last Modified time: 2018-11-15 13:50:34
 */
import fetch from 'dva/fetch';
import { Toast } from 'antd-mobile';
// import { notification,message } from 'antd';
import router from 'umi/router';

import { enCodeChar, sign } from '@/utils/utils';

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
const TIMEOUT = 30000;

/**
 * 带有timeout的_fetch
 * @param fetchPromise
 * @param timeout {number} 延迟时间
 */
const _fetch = (fetchPromise, timeout) => {
  let timeoutAction;
  const timerPromise = new Promise((resolve, reject) => {
    timeoutAction = () => {
      reject('timeout');
    };
  });
  setTimeout(() => {
    timeoutAction();
  }, timeout);
  return Promise.race([fetchPromise, timerPromise]);
};

// const cachedSave = (response, hashcode) => {
//   /**
//    * Clone a response data and store it in sessionStorage
//    * Does not support data other than json, Cache only json
//    */
//   const contentType = response.headers.get('Content-Type');
//   if (contentType && contentType.match(/application\/json/i)) {
//     // All data is saved as text
//     response
//       .clone()
//       .text()
//       .then(content => {
//         sessionStorage.setItem(hashcode, content);
//         sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
//       });
//   }
//   return response;
// };

/**
 * fetchFn 对window.fetch的封装，方面统一管理
 * @param url {String<URL>} 请求地址
 * @param data {Object<JSON>} 请求参数
 * @param option {Object<JSON>} 额外的fetch可配置参数
 */
export default function fetchFn(url, data, option) {
  const path = window.location.pathname;
  // 判断需要token和签名的条件
  const isGuest = path === '/login';

  if (!isGuest) {
    data = sign(data);
  }
  let json = {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'FetchRequest',
    },
    timeout: TIMEOUT,
    body: enCodeChar(data),
    credentials: 'include',
  };

  if (option) {
    const { headers, method } = option;
    if (headers && headers['Content-Type'] == 'application/json') {
      option.body = JSON.stringify(data);
      headers['dataType'] = 'json';
    }
    json = {
      ...json,
      ...option,
    };

    /**
     * 如果method为get,
     * get方式不允许body传参，
     * 只能url传参
     */
    if (method && method.toLocaleLowerCase() === 'get') {
      url = `${url}?${json.body}`;
      delete json.body;
    }
  }
  return new Promise((resolve, reject) => {
    _fetch(fetch(url, json), json.timeout)
      // .then(checkStatus)
      // .then(res => {
      //   console.log(res)
      //   return res.json();
      // })
      .then(handleResponse)
      .then(data => {
        if (Number(data.returnCode) !== 0 && !isGuest) {
          Toast.fail(data.error || data.msg || data.returnMsg || '请求失败');
        }
        resolve(data);
      })
      .catch(error => {
        // debugger
        let msg;
        switch (error.toString()) {
          case 'TypeError: Failed to fetch':
            msg = '请求失败';
            break;
          case 'timeout':
            msg = '请求超时';
            break;
          default:
            msg = '请求失败';
        }

        Toast.offline(msg);
        const data = { returnCode: 1, returnMsg: msg };
        resolve(data);
      });
  });
}
function handleResponse(response) {
  // debugger
  let contentType = response.headers.get('content-type');
  if (contentType.includes('application/json')) {
    return handleJSONResponse(response);
  } else if (contentType.includes('text/html')) {
    return handleTextResponse(response);
  } else {
    // Other response types as necessary. I haven't found a need for them yet though.
    throw new Error(`Sorry, content-type ${contentType} not supported`);
  }
}

function handleJSONResponse(response) {
  return response.json().then(json => {
    if (response.ok) {
      return json;
    } else {
      return Promise.reject(
        Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText,
        })
      );
    }
  });
}
function handleTextResponse(response) {
  return response.text().then(text => {
    if (response.ok) {
      return json;
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText,
        err: text,
      });
    }
  });
}
