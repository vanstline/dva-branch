/*
 * @Author: yangws 
 * @Date: 2018-11-07 13:38:13 
 * @Last Modified by: yangws
 * @Last Modified time: 2018-11-07 16:16:47
 */

import React, { PureComponent } from "react";
import "./index.less";

export default class NavBar extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="ism-nav-bar-header">
        <div
          className="ism-nav-bar-header-left"
          onClick={() => {
            this.props.leftClick && this.props.leftClick();
          }}
        >
          {this.props.leftContent}
        </div>
        <div className="ism-nav-bar-header-center">{this.props.title}</div>
        <div className="ism-nav-bar-header-right">
          {this.props.rightButton && this.props.rightButton.map(item => item)}
        </div>
      </div>
    );
  }
}
