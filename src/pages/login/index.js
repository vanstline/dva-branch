/*
 * @Author: yangws 
 * @Date: 2018-11-07 13:30:11 
 * @Last Modified by: yangws
 * @Last Modified time: 2019-01-14 11:49:54
 */
import React, { PureComponent } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, InputItem, List, Button, Toast, Tabs, Icon } from 'antd-mobile';
import router from 'umi/router';
import { getAuthority } from '@/utils/authority.js';
import { isWeiXin } from '@/utils/utils';
import './index.less';
import loginBg from '@/assets/login-bg.png';
import { from } from '../../../node_modules/array-flatten/array-flatten';

import { apiDomain } from '@/services/config';
// const loginBg = '/'
@createForm()
@connect(({ login, loading }) => ({
  login,
  userLogin: loading.effects['user/fetchOauthToken'],
  sending: loading.effects['utils/fetchSendSmsCaptcha'],
  smsloading: loading.effects['utils/fetchSmsOauthToken'],
}))
export default class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      btnText: '获取验证码',
      timer: 60,
      discodeBtn: false,
      isWechatFirst: true, // 是否首次微信登录
      loginType: 0, //
      ticket: '',
      pageLoading: false,
    };
  }
  componentWillMount() {
    if (isWeiXin()) {
      this.setState({ pageLoading: true });
      const code = this.props.location.query.code;
      const state = this.props.location.query.state;
      if (code) {
        this.props.dispatch({
          type: 'user/fetchWechatOauthToken',
          payload: {
            code,
          },
          callback: response => {
            // 微信票据
            this.setState({ pageLoading: false });
            if (response.data) {
              this.setState({ ticket: response.data });
            }
            // 登录成功
            if (response.access_token) {
              window.location.href = '/';
            }
          },
        });
      } else {
        // console.log(11111);
        window.location.href = `${apiDomain}/cmc/auth/getWxOauthCode?redirectUri=${
          window.location.origin
        }/login&scope=snsapi_userinfo`;
      }
      // 判断是否首次微信登录
      if (state && state === 'isWechatFirst') {
        this.setState({ isWechatFirst: true });
      }
    } else {
      const refresh_token = this.props.location.query.refresh_token;

      if (refresh_token && refresh_token.length > 10) {
        this.props.dispatch({
          type: 'user/fetchOauthToken',
          payload: {
            refresh_token: getAuthority('refresh_token'),
            grant_type: 'refresh_token',
            // scope: 'read',
          },
          callback: () => {
            router.goBack();
          },
        });
        return false;
      }
    }
  }

  handleGetCode = () => {
    const { getFieldValue } = this.props.form;
    let { timer, discodeBtn } = this.state;
    const phone = (getFieldValue('phone') || '').replace(/\s/g, '');
    var reg = /^1\d{10}$/;
    if (phone && reg.test(phone)) {
      this.props.dispatch({
        type: 'utils/fetchSendSmsCaptcha',
        payload: { mobile: phone },
      });
      this.setState({ btnText: '发送中...' });
      let siv = setInterval(() => {
        this.setState({ timer: timer--, btnText: `${timer}秒后重试`, discodeBtn: true }, () => {
          if (timer === 0) {
            clearInterval(siv);
            this.setState({ btnText: '重新发送', discodeBtn: false });
          }
        });
      }, 1000);
      // }
    } else {
      Toast.fail('请输入正确的手机号');
      return;
    }
  };
  onSubmit = async () => {
    const { dispatch, form } = this.props;
    const { loginType, isWechatFirst, ticket } = this.state;
    const { code, password, phone, username } = form.getFieldsValue();
    if (loginType === 0) {
      if (!username) {
        Toast.fail('请输入账号');
        return;
      }
      if (!password) {
        Toast.fail('请输入密码');
        return;
      }
      dispatch({
        type: 'user/fetchOauthToken',
        payload: {
          username: username + (username === 'test6' ? '@1' : '@2'),
          password,
          grant_type: 'password',
          scope: 'read',
        },
        ticket,
      });

      // let res = await this.props.login({ username,password });
      // debugger
    }
    if (loginType === 1) {
      if (!phone) {
        Toast.fail('请输入手机号');
        return;
      }
      if (!code) {
        Toast.fail('请输入验证码');
        return;
      }
      dispatch({
        type: 'user/fetchSmsOauthToken',
        payload: {
          mobile: phone.replace(/ /g, '') + '@2',
          scode: code,
          // grant_type: 'password',
          // scope: 'read',
        },
        ticket,
      });
    }
  };
  componentDidMount() {
    // if (__CLIENT__) {
    //     setTimeout(() => {
    //         !this.state.params && Toast.fail('请从公众号内点击进入');
    //     }, 0)
    // }
  }
  render() {
    const { smsloading, userLogin, form, loginError } = this.props;
    const { getFieldDecorator } = form;
    const { loading, params, btnText, discodeBtn, loginType, pageLoading } = this.state;
    if (loginError) {
      Toast.fail(loginError, 1, () => this.props.clearLoginErr());
    }
    const tabs = [{ title: '账号密码登录', id: 1 }, { title: '手机号登录', id: 2 }];
    let background = {
      backgroundImage: 'url(' + loginBg + ')',
    };
    return pageLoading ? (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Icon type="loading" size="md" />
      </div>
    ) : (
      <div className="login-container" style={background}>
        <div className="login-content">
          <WingBlank size="lg">
            <div className="icon-lg">终端门店协同登录</div>
            <WhiteSpace />
            <WhiteSpace />
            <WhiteSpace />
            <WhiteSpace />
          </WingBlank>

          <WingBlank size="lg">
            <Tabs
              tabs={tabs}
              initalPage={loginType}
              onChange={(tab, index) => {
                this.setState({ loginType: index * 1 });
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '150px',
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                }}
              >
                <List className="global-list">
                  {getFieldDecorator('username', {
                    rules: [
                      {
                        required: true,
                        message: '请输入您的登录账号!',
                      },
                    ],
                    validateFirst: true,
                  })(
                    <InputItem clear placeholder="请输入您的登录账号">
                      <i className="iconfont icon-yonghu" />
                    </InputItem>
                  )}
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: '请输入您的登录密码!',
                      },
                    ],
                    validateFirst: true,
                  })(
                    <InputItem type="password" clear placeholder="请输入您的登录密码">
                      <i className="iconfont icon-mima" />
                    </InputItem>
                  )}
                </List>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '150px',
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                }}
              >
                <List className="global-list">
                  {getFieldDecorator('phone', {
                    rules: [
                      {
                        required: true,
                        message: '请输入您的手机号!',
                      },
                    ],
                    validateFirst: true,
                  })(
                    <InputItem type="phone" clear placeholder="请输入您的手机号">
                      <i className="iconfont icon-shoujihao" />
                    </InputItem>
                  )}

                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码!',
                      },
                    ],
                    validateFirst: true,
                  })(
                    <InputItem
                      type="number"
                      clear
                      placeholder="请输入验证码"
                      extra={
                        <Button onClick={this.handleGetCode} disabled={discodeBtn} size="small">
                          {btnText}
                        </Button>
                      }
                    >
                      <i className="iconfont icon-yanzhengma" />
                    </InputItem>
                  )}
                </List>
              </div>
            </Tabs>
            <div
              style={{
                padding: '.2rem',
              }}
            >
              <Button loading={userLogin} onClick={this.onSubmit} size="small">
                立即登录
              </Button>
            </div>
            <p className="copyright">In-Store Marketing System </p>
          </WingBlank>
        </div>
      </div>
    );
  }
}
