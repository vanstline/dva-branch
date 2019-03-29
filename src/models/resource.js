/*
 * @Author: yangws 
 * @Date: 2018-11-18 19:28:20 
 * @Mail: yangwenshou@qq.com 
 */

import { Toast } from 'antd-mobile';
import { queryStoreResource, updateStoreResource } from '@/services/index';

export default {
  namespace: 'resource',

  state: {
    storeResource: [],
  },

  effects: {
    *fetchQueryStoreResource({ payload }, { call, put }) {
      const response = yield call(queryStoreResource, payload);
      if (response && response.returnCode === 0) {
        yield put({
          type: 'queryStoreResourceReducers',
          payload: response,
        });
      } else {
        Toast.fail('查询失败');
      }
    },
    *fetchUpdateStoreResource({ payload, callback }, { call, put }) {
      const response = yield call(updateStoreResource, payload);
      if (response && response.returnCode === 0) {
        if (callback && typeof callback === 'function') {
          Toast.success('更新成功', 0.5, () => {
            callback();
          });
        }
        yield put({
          type: 'updateStoreResourceReducers',
          payload: response,
        });
      } else {
        Toast.fail('更新失败');
      }
    },
  },

  reducers: {
    queryStoreResourceReducers(state, { payload }) {
      state.storeResource = payload.data || {};
      return state;
    },
  },
};
