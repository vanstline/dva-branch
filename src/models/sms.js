/*
 * @Author: yangws 
 * @Date: 2018-11-14 22:37:27 
 * @Mail: yangwenshou@qq.com 
 */
import { Toast } from 'antd-mobile';
import { sendSmsCaptcha } from '@/services/index';

export default {
  namespace: 'sms',

  state: {
    fetching: false,
  },

  effects: {
    *fetchSendSmsCaptcha({ payload }, { call, put }) {
      const response = yield call(sendSmsCaptcha, payload);
      if (response && response.returnCode === 0) {
        Toast.success('短信发送成功');
      } else {
        Toast.fail('短信发送失败');
      }
    },
  },

  reducers: {
    fetching(state) {
      return state;
    },
  },
};
