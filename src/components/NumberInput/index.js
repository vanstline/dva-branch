/*
 * @Author: yangws 
 * @Date: 2018-11-07 23:33:00 
 * @Mail: yangwenshou@qq.com 
 */

import React, { PureComponent } from "react";
import { InputItem } from "antd-mobile";

import "./index.less";

export default class NumberInput extends PureComponent {
  constructor(props) {
    super(props);
    const { value, min, max, multiple, firstDouble } = props;
    this.state = {
      value,
      min: min || 0,
      max,
      firstDouble: firstDouble || 0, // 变态的计算 firstDouble存在的时候增加firstDouble最后减少firstDouble
      multiple: multiple || 1
    };
  }
  handleNumberPlus = () => {
    const { multiple, max, value, min, firstDouble } = this.state;
    let number = 0;
    if (firstDouble && value === min) {
      number = (value || 0) + firstDouble;
    } else {
      number = (value || 0) + multiple;
    }

    const temp = max && number > max ? max : number;
    this.setState({ value: temp });
    this.props.callback && this.props.callback(temp);
  };
  handleNumberSub = () => {
    const { multiple, min, value, firstDouble } = this.state;
    let number = 0;
    if (firstDouble && value - firstDouble === min) {
      number = (value || 0) - firstDouble;
    } else {
      number = (value || 0) - multiple;
    }

    const temp = number < min ? min : number;
    this.setState({ value: temp });
    this.props.callback && this.props.callback(temp);
  };
  handleNumberChange = value => {
    const { multiple, min, max } = this.state;
    let number = 0;
    if (max && value > max) {
      number = max;
    } else if (value < min) {
      number = min;
    } else {
      number = Number.parseInt(value / multiple) * multiple;
    }
    this.setState({ value: number });

    this.props.callback && this.props.callback(number);
  };

  render() {
    const { value, min, max, multiple } = this.state;
    return (
      <InputItem
        style={this.props.style}
        className="ism-number-input"
        type="number"
        value={value}
        onChange={value => {
          this.setState({ value });
        }}
        onBlur={this.handleNumberChange}
        // extra={<i className="iconfont icon-jia1" onClick={this.handleNumberPlus} />}
        extra={<span onClick={this.handleNumberPlus}>+</span>}
        placeholder="请输入数字"
      >
        <span onClick={this.handleNumberSub}>-</span>
        {/* <i className="iconfont icon-jian" onClick={this.handleNumberSub} /> */}
      </InputItem>
    );
  }
}
