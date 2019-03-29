/*
 * @Author: yangws
 * @Date: 2018-10-14 16:02:44 
 * @Last Modified by: yangws
 * @Last Modified time: 2018-12-11 22:25:21
 */

import { stringify } from 'qs';
import request from './request';
import fetchFn from './fetch';

const dev = process.env.NODE_ENV === 'development';
const defaultApi = 'http://ism.proxy.linjiash.com';
const defaultImg = 'https://s3.cn-northwest-1.amazonaws.com.cn/nxaws-s3-ism1/';

const apiDomain = process.env.APIDOMAIN || defaultApi;
const imgDomain = process.env.IMGDOMAIN || defaultImg;

// 请求地址是当前访问地址
const currentHost = () => {
  if (dev || /^[\d]|localhost/.test(window.location.host)) return defaultHost;
  return `${window.location.origin}`;
};
// 自定义前缀，对应后端微服务
const apiUrlfun = val => {
  if (val) {
    return `${currentHost()}/upc/${val}`;
  }
  return `${currentHost()}/upc`;
};
// 分页参数
const PAGINATION_PARAMS = {
  pageIndex: 1,
  pageSize: 10,
};
export { stringify, apiUrlfun, request, apiDomain, fetchFn, PAGINATION_PARAMS, imgDomain };
