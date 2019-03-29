/*
 * @Author: yangws 
 * @Date: 2018-11-18 19:28:20 
 * @Mail: yangwenshou@qq.com 
 */

import { Toast } from 'antd-mobile';
import { queryMaterialPage, queryMaterialDtl } from '@/services/index';

export default {
  namespace: 'material',

  state: {
    storeResource: {},
  },

  effects: {
    *fetchQueryMaterialPage({ payload }, { call, put }) {
      const response = yield call(queryMaterialPage, payload);
      if (response && response.returnCode === 0) {
        yield put({
          type: 'queryMaterialPageReducers',
          payload: response,
        });
      } else {
        Toast.fail('查询失败');
      }
    },
    *fetchQueryMaterialDtl({ payload }, { call, put }) {
      const response = yield call(queryMaterialDtl, payload);
      if (response && response.returnCode === 0) {
        yield put({
          type: 'queryMaterialDtlReducers',
          payload: response,
        });
      } else {
        Toast.fail('查询失败');
      }
    },
  },

  reducers: {
    queryStoreResourceReducers(state, { payload }) {
      state.MaterialList = payload.data || {};
      return state;
    },
    queryMaterialDtlReducers(state, { payload }) {
      state.MaterialDetail = payload.data || {};
      return state;
    },
  },
};
