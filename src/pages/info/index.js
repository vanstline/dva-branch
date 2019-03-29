import React, { PureComponent } from "react";
import {
  Icon,
  List,
  Flex,
  WhiteSpace,
  Badge,
  DatePicker,
  Popover,
  Tabs
} from "antd-mobile";
import NavBar from "../../components/NavBar";
import router from "umi/router";
import { connect } from "dva";
import { withRouter } from "react-router";
import banner from "../../assets/u16.png";
import "./index.less";

// @connect(({ store, loading }) => ({
//   storeInfo: store.storeInfo,
//   materialCount: store.materialCount,
//   loading: loading.effects['store/homePageInfo'],
// }))

const conect = [
  {
    title: "上海江桥店[20005]",
    number: "10",
    money: "50"
  }
];

class Info extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}

  render() {
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
              门店提交明细{" "}
            </span>
            <div className="buttons">
              <span
                onClick={() => {
                  this.props.history.push("../edit");
                }}
              >
                {" "}
                <i className="edit" /> 编辑{" "}
              </span>
              {/* 点击编辑时跳转新的组件 */}
              <span>
                {" "}
                <i className="filter" /> 筛选
              </span>
            </div>
          </div>
          {/* 门店明细内容 */}
          {conect.map(item => {
            return (
              <div className="infoList clearfix">
                <div className="infoDetail">
                  <span className="fl">{item.title}</span>
                  <div className="info">
                    <span>X</span>
                    <span className="infoNumber">{item.number}</span>
                  </div>
                </div>
                <span className="infoMoney">¥{item.money}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Info);
