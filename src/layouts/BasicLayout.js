/*
 * @Author: yangws 
 * @Date: 2018-11-11 22:36:08 
 * @Mail: yangwenshou@qq.com 
 */

import React, { PureComponent } from 'react';
import MenuBar from '@/components/MenuBar';
import NProgress from 'nprogress';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
// import '@/layouts/nprogress.less';
import { getAuthority } from '@/utils/authority.js';
import Redirect from 'umi/redirect';
import { Icon } from 'antd-mobile';
NProgress.configure({ showSpinner: false });

// 底部有bar菜单
const BarRoutes = ['/', '/task', '/demand', '/resource'];

class BasicLayout extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.props.dispatch({
    //   type: 'store/fetchQueryStoreUserInfo',
    //   payload:{},
    // });
    if (!this.isGuest() && getAuthority()) {
      this.props.dispatch({
        type: 'store/fetchQueryStoreHomePageInfo',
        payload: {},
      });
    }
  }
  isGuest = () => {
    return this.props.location.pathname.indexOf('/login') === 0;
  };
  render() {
    const { children, location, loading, storeInfo } = this.props;
    const isLogin = getAuthority();

    let currHref = '';
    const { href, pathname } = window.location; // 浏览器地址栏中地址
    if (!isLogin && !this.isGuest()) {
      return <Redirect to="/login" />;
    }
    if (currHref !== href) {
      // currHref 和 href 不一致时说明进行了页面跳转
      NProgress.start(); // 页面开始加载时调用 start 方法
      if (!loading.global) {
        // loading.global 为 false 时表示加载完毕
        NProgress.done(); // 页面请求完毕时调用 done 方法
        currHref = href; // 将新页面的 href 值赋值给 currHref
      }
    }

    if (BarRoutes.indexOf(location.pathname) < 0) {
      // return (<div style={{ height: '100%' }}>{children}</div>)
      return this.isGuest() || storeInfo.storeId ? (
        <div style={{ height: '100%' }}>{children}</div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Icon type="loading" size="md" />
        </div>
        // <Icon type="loading" size="md" />
      );
    }

    return (
      <div style={{ overflowX: 'hidden', height: '100%' }}>
        {this.isGuest() || storeInfo.storeId ? (
          <MenuBar pathname={location.pathname}>{children}</MenuBar>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Icon type="loading" size="md" />
          </div>
        )}
        {/* <div style={{height:'100vh',width:'100%'}}><Icon style={{margin:'0 auto'}} type="loading" size="md"/></div> */}
      </div>
    );
  }
}
export default connect(({ store, loading }) => ({
  userInfo: store.userInfo,
  storeInfo: store.storeInfo,

  loading,
}))(BasicLayout);
// export default withRouter(connect(({ user, loading }) => ({ user, loading }))(BasicLayout));
