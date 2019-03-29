import router from 'umi/router';
import { Toast } from 'antd-mobile';
import {
  queryStoreUserInfo,
  queryStoreHomePageInfo,
  queryMonthMaterialCountInfo,
  updateStoreUserInfo,
  queryStoreDistribution,
} from '@/services/index';

// 格式化数字 万元
const formatChartData = (data, key) => {
  data = data || [];
  data.map((item, index) => {
    if (item[key]) {
      item[key] = (item[key] / 10000).toFixed(2);
    }
  });
  return data;
};
export default {
  namespace: 'store',

  state: {
    userInfo: {},
    storeInfo: {},
    materialCount: [],
    fetching: false,
  },
  effects: {
    *fetchQueryStoreUserInfo({ payload, callback }, { call, put }) {
      const response = yield call(queryStoreUserInfo, payload);

      if (response && response.returnCode === 0) {
        yield put({
          type: 'queryStoreUserInfoReducers',
          payload: response,
        });
      } else {
        // Toast.fail(response.returnMsg ||'查询失败');
      }
    },
    *fetchQueryStoreHomePageInfo({ payload, callback }, { call, put }) {
      yield put({ type: 'fetching', status: true });
      const response = yield call(queryStoreHomePageInfo, payload);
      yield put({ type: 'fetching', status: false });

      if (response && response.returnCode === 0) {
        yield put({
          type: 'queryStoreHomePageInfoReducers',
          payload: response,
        });
        const data = response.data;
        if (data && callback && typeof callback === 'function') {
          callback({ storeId: data.storeId, year: data.canSelectYears[0] });
        }
      } else {
        // Toast.fail(response.returnMsg ||'查询失败');
      }
    },
    *fetchQueryMonthMaterialCountInfo({ payload, callback }, { call, put }) {
      const response = yield call(queryMonthMaterialCountInfo, payload);

      if (response && response.returnCode === 0) {
        const data = response.data;
        if (data && callback && typeof callback === 'function') {
          callback(formatChartData(data.chartData, 'acc'));
        }
      } else {
        // Toast.fail(response.returnMsg ||'查询失败');
      }
    },
    *fetchUpdateStoreUserInfo({ payload, callback }, { call, put }) {
      const response = yield call(updateStoreUserInfo, payload);

      if (response && response.returnCode === 0) {
        if (callback && typeof callback === 'function') {
          callback();
        }
        Toast.success('更新成功');
      } else {
        Toast.fail('更新失败');
      }
    },
    *fetchQueryStoreDistribution({ payload }, { call, put }) {
      const response = yield call(queryStoreDistribution, payload);

      if (response && response.returnCode === 0) {
        yield put({
          type: 'queryStoreDistributionReducers',
          payload: response,
        });
      } else {
        Toast.fail('查询失败');
      }
    },
  },
  reducers: {
    queryStoreUserInfoReducers(state, { payload }) {
      state.userInfo = payload.data || {};
      return state;
    },
    queryStoreHomePageInfoReducers(state, { payload }) {
      state.storeInfo = payload.data || {};
      return state;
    },

    queryStoreDistributionReducers(state, { payload }) {
      return {
        ...state,

        storeDistribution: payload.data || {},
      };
    },
  },
};
