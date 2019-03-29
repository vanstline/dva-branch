import router from 'umi/router';
import { Toast } from 'antd-mobile';
import { queryMesssageListPage, updateMesssageStatus } from '@/services/index';

export default {
  namespace: 'message',

  state: {
    dataSource: {},
    fetching: false,
  },

  effects: {
    *QUERYMESSSAGELISTPAGE({ payload, callback }, { call, put }) {
      yield put({ type: 'fetching', status: true });
      const response = yield call(queryMesssageListPage, payload);
      yield put({ type: 'fetching', status: false });

      if (response && response.returnCode === 0) {
        yield put({
          type: 'QUERYMESSSAGELISTPAGE_REDUCERS',
          payload: response,
        });
        if (callback && typeof callback === 'function') {
          callback(response.data);
        }
      } else {
        Toast.fail('查询失败');
      }
    },
    *UPDATEMESSSAGESTATUS({ payload, callback }, { call, put }) {
      yield put({ type: 'fetching', status: true });
      const response = yield call(updateMesssageStatus, payload);
      yield put({ type: 'fetching', status: false });

      if (response && response.returnCode === 0) {
        // yield put({
        //   type: 'UPDATEMESSSAGESTATUS_REDUCERS',
        //   payload: response,
        // });
        if (callback && typeof callback === 'function') {
          callback();
        }
      } else {
        Toast.fail('更新失败');
      }
    },
  },

  reducers: {
    QUERYMESSSAGELISTPAGE_REDUCERS(state, { payload }) {
      state.dataSource = payload.data;
      return state;
    },
    UPDATEMESSSAGESTATUS_REDUCERS(state, { payload }) {
      state.dataSource = payload.data;
      return state;
    },
    fetching(state) {
      return state;
    },
  },
};
