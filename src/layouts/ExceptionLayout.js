/*
 * @Author: yangws
 * @Date: 2018-09-27 20:38:14 
 * @Last Modified by: yangws
 * @Last Modified time: 2018-10-14 14:50:32
 */

import React, { PureComponent } from 'react';

class Exception extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div>
        异常页面通用结构
        {children}
      </div>
    );
  }
}

export default Exception;
