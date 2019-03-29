/*
 * @Author: yangws 
 * @Date: 2018-11-14 22:37:27 
 * @Mail: yangwenshou@qq.com 
 */
import router from 'umi/router';
import { Toast } from 'antd-mobile';
import {
  queryTaskListPage,
  queryMaterialDemandTaskDeatil,
  queryStoreDeliveredConfirmInfo,
  queryStoreDeliveredTaskDeatil,
  queryStoreDemandOrderDetail,
  queryStoreDemandOrderListPage,
  saveStoreDemandOrder,
  storeDeliveredConfirm,
  queryStoreOrderDistributionInfo,
} from '@/services/index';

export default {
  namespace: 'task',
  state: {
    taskInfo: {},
    taskData: {},
    distributionInfo: {},
    fetching: false,
  },

  effects: {
    *fetchQueryTaskListPage({ payload, callback }, { call, put }) {
      const response = yield call(queryTaskListPage, payload);
      if (response && response.returnCode === 0) {
        if (callback && typeof callback === 'function') {
          callback(response.data);
        }
        yield put({
          type: 'queryTaskListPageReducers',
          payload: response.data,
        });
      } else {
        Toast.fail('查询失败');
      }
    },
    *fetchQueryMaterialDemandTaskDeatil({ payload, callback }, { call, put }) {
      const response = yield call(queryMaterialDemandTaskDeatil, payload);

      if (response && response.returnCode === 0) {
        yield put({
          type: 'queryMaterialDemandTaskDeatilReducers',
          payload: response.data,
        });
        if (callback && typeof callback === 'function') {
          callback(response.data);
        }
      } else {
        Toast.fail('查询失败');
      }
    },
    *fetchQueryStoreDeliveredTaskDeatil({ payload }, { call, put }) {
      const response = yield call(queryStoreDeliveredTaskDeatil, payload);
      if (response && response.returnCode === 0) {
        yield put({
          type: 'queryStoreDeliveredTaskDeatilReducers',
          payload: response.data,
        });
      } else {
        Toast.fail('查询失败');
      }
    },
    *fetchSaveStoreDemandOrder({ payload, callback }, { call, put }) {
      const response = yield call(saveStoreDemandOrder, payload);
      if (response && response.returnCode === 0) {
        if (callback && typeof callback === 'function') {
          callback();
        }
        Toast.success('提交成功', 0.5, () => {
          router.push('/demand');
        });
      } else {
        Toast.fail('提交失败');
      }
    },
    *fetchQueryStoreDemandOrderListPage({ payload }, { call, put }) {
      const response = yield call(queryStoreDemandOrderListPage, payload);
      if (response && response.returnCode === 0) {
        yield put({
          type: 'queryStoreDemandOrderListPageReducers',
          payload: response.data,
        });
      } else {
        Toast.fail('查询失败');
      }
    },
    *fetchQueryStoreDemandOrderDetail({ payload, callback }, { call, put }) {
      const response = yield call(queryStoreDemandOrderDetail, payload);
      if (response && response.returnCode === 0) {
        if (callback && typeof callback === 'function') {
          callback(response.data);
        }
        yield put({
          type: 'queryStoreDemandOrderDetailReducers',
          payload: response.data,
        });
      } else {
        Toast.fail('查询失败');
      }
    },
    *fetchStoreDeliveredConfirm({ payload }, { call, put }) {
      const response = yield call(storeDeliveredConfirm, payload);
      if (response && response.returnCode === 0) {
        Toast.success('提交成功', 0.5, () => {
          router.push('/demand');
        });
      } else {
        Toast.fail('提交失败');
      }
    },
    *fetchQueryStoreOrderDistributionInfo({ payload, callback }, { call, put }) {
      const response = yield call(queryStoreOrderDistributionInfo, payload);
      if (response && response.returnCode === 0) {
        if (callback && typeof callback === 'function') {
          callback(response.data);
        }
        yield put({
          type: 'queryStoreOrderDistributionInfoReducers',
          payload: response.data,
        });
      } else {
        Toast.fail('查询失败');
      }
    },

    //
  },

  reducers: {
    queryTaskListPageReducers(state, action) {
      return {
        taskData: action.payload,
      };
    },
    queryMaterialDemandTaskDeatilReducers(state, action) {
      const data = action.payload;
      return {
        taskInfo: {
          ...data,
          // 后台返回字段不统一
          relatedStoreDeliveredDtlInfoList:
            data.relatedStoreDeliveredDtlInfoList || data.relatedStoreDemandOrderDtlInfo,
          relatedStoreDeliveredOrderInfo:
            data.relatedStoreDeliveredOrderInfo || data.relatedStoreDemandOrderInfo,
        },
      };
    },
    queryStoreDeliveredTaskDeatilReducers(state, action) {
      return {
        taskInfo: action.payload,
      };
    },
    queryStoreDemandOrderListPageReducers(state, action) {
      return {
        demandData: action.payload,
      };
    },
    queryStoreDemandOrderDetailReducers(state, action) {
      return {
        demandDetail: action.payload,
      };
    },
    queryStoreOrderDistributionInfoReducers(state, action) {
      return {
        ...state,
        distributionInfo: action.payload,
      };
    },

    fetching(state) {
      return state;
    },
  },
};
