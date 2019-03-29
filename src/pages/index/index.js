/*
 * @Author: yangws
 * @Date: 2018-09-27 20:38:37 
 * @Last Modified by: yangws
 * @Last Modified time: 2018-12-29 15:36:55
 */

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
import { Chart, Geom, Axis, Tooltip } from "bizcharts";
import Link from "umi/link";
import { connect } from "dva";
import moment from "moment";
import activeIcon from "../../assets/active.png";
import banner from "../../assets/u16.png";
import right from "../../assets/rightArrow.png";
import screen from "../../assets/filter.png";
import { withRouter } from "react-router";
import { PullToRefresh, ListView } from "antd-mobile";

import "./index.less";

const Item = Popover.Item;
const tabs = [
  {
    title: "物料汇总"
  },
  {
    title: "门店完成进度"
  }
];

@connect(({ store, loading }) => ({
  storeInfo: store.storeInfo,
  materialCount: store.materialCount,
  loading: loading.effects["store/homePageInfo"]
}))

// 上拉加载
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  changeTable = (tab, index) => {
    //  控制底部footer的显示隐藏
    if (index === 1) {
      this.setState({
        tableShow: true
      });
    } else {
      this.setState({
        tableShow: false
      });
    }
  };

  render() {
    const { storeInfo, materialCount } = this.props;
    const {
      storeName,
      username,
      mobile,
      demandNum,
      deliveryNum,
      canSelectYears,
      headimgurl,
      installNum,
      messageNum
    } = storeInfo;
    return (
      <div className="home-container">
        <NavBar
          title="需求单汇总"
          leftContent={<Icon type="left" />}
          rightButton={[<Icon key="1" type="ellipsis" />]}
        />
        <div className="am-list-item user-info-item am-list-item-middle">
          <div className="am-list-thumb">
            <img src={headimgurl} />
          </div>
          <div className=" m-list-line-multiple">
            <div className="am-list-content">
              {username} {mobile} <WhiteSpace size="sm" />
              创业分部：
              {storeName}{" "}
            </div>
          </div>
        </div>
        <WhiteSpace size="sm" />
        <div className="ism-active clearFix">
          <div className="ism-active-img">
            <img src={activeIcon} />
            <p>营销活动</p>
          </div>
          <div className="ism-active-desc">
            <strong>4月1日西贝莜面春节活动</strong>
            <p>西贝莜面村物流需求收集</p>
            <p>
              <i className="iconfont icon-calendar" />
              2019-04-01 至 2019-06-01{" "}
            </p>
          </div>
          <div className="ism-active-store">
            <p className="ism-active-store-num">
              <span className="complete">50</span> / 80
            </p>
            <p className="text">提报店数</p>
          </div>
        </div>
        <WhiteSpace size="sm" />
        <Tabs
          tabs={tabs}
          className="ism-tabs"
          initialPage={0}
          // onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onChange={(tab, index) => {
            this.changeTable(tab, index);
          }}
          // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          {/* { 
            tabs.map( item => {
              return (
                <div>{item.title}</div>
              )
            } )
          } */}
          <PullToRefresh>
            <div
              className="container"
              onClick={() => {
                this.props.history.push("../info");
              }}
            >
              {tabs.map(item => {
                return (
                  <div className="clearfix fontSize">
                    <img className="baner" src={banner} />
                    <img className="right" src={right} />
                    <div className="detailTitle">
                      <span>牛大骨展板</span>
                      <div className="totalNumber">
                        <span className="number">50</span>
                        <span>/ 80</span>
                      </div>
                    </div>
                    <div className="detailTitle">
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
                );
              })}
            </div>
          </PullToRefresh>
          {/* 第二个tab */}
          <div>
            <p className="shopTitle">
              截至目前完成提报门店
              <span className="shopNumber">50</span>
              家, 剩余
              <span className="shopMoney">30</span>
              家未完成提报
            </p>
            {/* 标题区域 */}
            <div className="shop">
              <div className="shopName">门店名称</div>
              <div className="status">
                <span>状态</span>
                <span className="totalColor">全部</span>
                <img src={screen} />
              </div>
            </div>
            {/* 内容区域 map出数据 */}
            {tabs.map(item => {
              return (
                <div className="shopDetail clearfix">
                  <p>上海江桥店</p>
                  <p className="gray">店长 王英 13661693062</p>
                  <p className="complete">已完成</p>
                  {/* <p>未完成</p> */}
                </div>
              );
            })}
          </div>
        </Tabs>
        {/* footer动态显示 */}
        <div
          style={{ display: this.state.tableShow ? "none" : "block" }}
          className="footer"
        >
          <div className="total">
            {" "}
            物料总额 <span className="money">¥7000</span>
          </div>
          <div className="pass">审批通过</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Index);
