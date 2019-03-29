import React, { Component } from "react";
import {
  Icon,
  List,
  Flex,
  WhiteSpace,
  Popover,
  Tabs,
  Stepper
} from "antd-mobile";
import NavBar from "../../components/NavBar";
import router from "umi/router";
import { connect } from "dva";
import "./index.less";
import { withRouter } from "react-router";
import banner from "../../assets/u16.png";

const conect = [
  {
    title: "上海江桥店[20005]",
    number: "10",
    money: "50",
    id: "1"
  },
  {
    title: "上海江桥店[20005]",
    number: "10",
    money: "50",
    id: "2"
  },
  {
    title: "上海江桥店[20005]",
    number: "10",
    money: "50",
    id: "3"
  }
];

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: "1",
      choiceArr: [],
      conect: [...conect]
    };
  }

  componentWillMount() {}

  changeValue = val => {
    this.setState({ val });
  };

  // 点击了√
  choice = id => {
    // let { choiceArr } = this.state;
    // // 如果点击的在数组中已经存在，则从数组删除，否则，添加到数组
    // if (choiceArr.indexOf(index) > -1) {
    //   choiceArr.splice(choiceArr.indexOf(index), 1);
    // } else {
    //   choiceArr.push(index);
    // }
    // const newChoiceArr = choiceArr;
    // // 改变state状态值
    // this.setState({
    //   choiceArr: newChoiceArr,
    // });
    // console.log(this.state.choiceArr);
    // console.log(this.state.choiceArr.indexOf(index) > -1);
    const { conect } = this.state;
    conect.forEach(item => {
      if (item.id === id) {
        item.isToggle = !item.isToggle;
      }
    });
    this.setState({ conect });
  };
  // 全选
  // selectAll = () => {
  //every 判断如果有一个是true就改变toggle
  //拿到数组.找里面的toggle,如果有一个toggle是false就全部为true
  // }

  render() {
    const _this = this;
    const { conect } = this.state;
    return (
      <div>
        <NavBar
          title="物料提报明细"
          leftContent={
            <Icon
              type="left"
              onClick={() => {
                this.props.history.goBack();
              }}
            />
          }
          rightButton={[<Icon key="1" type="ellipsis" />]}
        />
        <div className="clearfix fontSize">
          <img className="baner" src={banner} />
          <div className="detailTitle">
            <span>牛大骨展板</span>
            <div className="totalNumber">
              <span className="number">50</span>
              <span>/ 80</span>
            </div>
          </div>
          <div className="detailNumber">
            <span>850*750</span>
            <div className="totalNumber">
              <span>订货店数</span>
            </div>
          </div>
          <div className="Statistics">
            <div className="width">
              {" "}
              单价 <span className="money">¥50</span>
            </div>
            <div className="width">
              {" "}
              数量 <span className="number">50</span>
            </div>
            <div className="width">
              {" "}
              小计 <span className="money">¥50</span>
            </div>
          </div>
        </div>
        {/* 门店明细 */}
        <div className="shopdetail clearfix">
          <div className="shopdetailTitle">
            <span className="storeInfoText">
              {" "}
              <i className="file" />
              门店明细清单{" "}
            </span>
            <div className="buttons">
              <span>
                {" "}
                <i className="delete" /> 删除{" "}
              </span>
            </div>
          </div>
          {/* 门店明细内容 */}
          {conect.map((item, index) => {
            console.log(!!item.isToggle, item);
            return (
              <div className="infoList clearfix" key={index}>
                <div className="infoDetail">
                  <Icon
                    onClick={() => this.choice(item.id)}
                    className="Choice"
                    type={`check-circle${!item.isToggle ? "-o" : ""}`}
                  />
                  <span className="fl">{item.title}</span>
                  <Stepper
                    className="steps"
                    showNumber
                    max={10}
                    min={1}
                    step={1}
                    value={this.state.val}
                    onChange={this.changeValue}
                  />
                </div>
                <span className="infoMoney">¥{item.money}</span>
              </div>
            );
          })}
        </div>
        <div className="footer">
          <div
            onClick={() => {
              this.selectAll;
            }}
            className="ckeckAll"
          >
            <Icon type="check-circle-o" />
            全选
          </div>
          <div className="pass">完成</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Edit);
