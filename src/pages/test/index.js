/*
 * @Author: yangws
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: yangws
 * @Last Modified time: 2018-11-22 00:25:52
 */

import React, { PureComponent } from 'react';
import { Button, Toast } from 'antd-mobile';
// import Ball from '@/components/Balls';
import Cart from '@/components/Parabola';

import './index.less';

export default class Test extends PureComponent {
  render() {
    const { route } = this.props;
    return <Cart> </Cart>;
  }
}
