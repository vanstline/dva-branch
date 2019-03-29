/*
 * @Author: yangws
 * @Date: 2018-10-09 15:37:17 
 * @Last Modified by: yangws
 * @Last Modified time: 2018-11-07 13:24:11
 */

import React, { PureComponent } from 'react';
import { TabBar } from 'antd-mobile';
import Router from 'umi/router';
import PropTypes from 'prop-types';
// import BizIcon from '../BizIcon';

const tabBarData = [
  {
    title: '首页',
    icon: 'shouye',
    selectedIcon: 'shouye',
    link: '/',
  },
  {
    title: '我的任务',
    icon: 'task',
    selectedIcon: 'task',
    link: '/task',
  },
  {
    title: '物料需求单',
    icon: 'renwu',
    selectedIcon: 'renwu',
    link: '/demand',
  },
  {
    title: '资源点',
    icon: 'huoyuanshichang',
    selectedIcon: 'huoyuanshichang',
    link: '/resource',
  },
];

class MenuBar extends PureComponent {
  render() {


    const { isMenubar, children, pathname } = this.props;

    const Cont = () => (
      <TabBar 
        unselectedTintColor="#949494"
      tintColor="#f60"
      barTintColor="#f8f8f8" hidden={isMenubar}>
        {tabBarData.map(({ title, icon, selectedIcon, link }) => (
          <TabBar.Item
            key={link}
            title={title}
            
            // icon={<BizIcon type={icon} />}
            // selectedIcon={<BizIcon type={selectedIcon} />}
            selected={pathname === link}
            onPress={() => Router.push(`${link}`)}
          >
            {/* 匹配到的children路由进行渲染 */}
            {children.props.location.pathname === link && children}
          </TabBar.Item>
        ))}
      </TabBar>
    )
    return (
      <Cont />
    );
  }
}

MenuBar.defaultProps = {
  isMenubar: false,
  children: null,
  pathname: '/',
};

MenuBar.propTypes = {
  isMenubar: PropTypes.bool,
  children: PropTypes.node,
  pathname: PropTypes.string,
};

export default MenuBar;
