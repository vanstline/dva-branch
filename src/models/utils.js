/*
 * @Author: yangws 
 * @Date: 2018-11-14 22:37:27 
 * @Mail: yangwenshou@qq.com 
 */
import { Toast } from 'antd-mobile';
import { sendSmsCaptcha, uploadByBase64 } from '@/services/index';

export default {
  namespace: 'utils',

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
    *fetchUploadByBase64({ payload, callback }, { call, put }) {
      const response = yield call(uploadByBase64, payload);
      // if (response && response.returnCode === 0) {
      //   Toast.success('上传成功');
      // } else {
      //   Toast.fail('上传失败');
      // }
      callback(response);
    },
  },

  reducers: {
    fetching(state) {
      return state;
    },
  },
};
