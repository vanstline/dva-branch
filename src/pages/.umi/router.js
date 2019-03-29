import React from "react";
import { Router as DefaultRouter, Route, Switch } from "react-router-dom";
import dynamic from "umi/dynamic";
import renderRoutes from "umi/_renderRoutes";
import _dvaDynamic from "dva/dynamic";

let Router = require("dva/router").routerRedux.ConnectedRouter;

let routes = [
  {
    path: "/",
    component: _dvaDynamic({
      component: () =>
        import(/* webpackChunkName: "layouts__BasicLayout" */ "../../layouts/BasicLayout"),
      LoadingComponent: require("E:/pinlor-static-ism-in-store-branch-h5/src/components/PageLoading/index")
        .default
    }),
    routes: [
      {
        path: "/index.html",
        component: _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "p__index__index" */ "../index/index"),
          LoadingComponent: require("E:/pinlor-static-ism-in-store-branch-h5/src/components/PageLoading/index")
            .default
        }),
        title: "首页",
        exact: true,
        Routes: [require("./TitleWrapper.jsx").default],
        _title: "首页",
        _title_default: "ISM终端协同"
      },
      {
        path: "/",
        component: _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "p__index__index" */ "../index/index"),
          LoadingComponent: require("E:/pinlor-static-ism-in-store-branch-h5/src/components/PageLoading/index")
            .default
        }),
        title: "首页",
        exact: true,
        Routes: [require("./TitleWrapper.jsx").default],
        _title: "首页",
        _title_default: "ISM终端协同"
      },
      {
        path: "/login",
        component: _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "p__login__index" */ "../login/index"),
          LoadingComponent: require("E:/pinlor-static-ism-in-store-branch-h5/src/components/PageLoading/index")
            .default
        }),
        title: "登录",
        guest: true,
        exact: true,
        Routes: [require("./TitleWrapper.jsx").default],
        _title: "登录",
        _title_default: "ISM终端协同"
      },
      {
        path: "/info",
        component: _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "p__info__index" */ "../info/index"),
          LoadingComponent: require("E:/pinlor-static-ism-in-store-branch-h5/src/components/PageLoading/index")
            .default
        }),
        title: "物料提报明细",
        guest: true,
        exact: true,
        Routes: [require("./TitleWrapper.jsx").default],
        _title: "物料提报明细",
        _title_default: "ISM终端协同"
      },
      {
        path: "/edit",
        component: _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "p__edit__index" */ "../edit/index"),
          LoadingComponent: require("E:/pinlor-static-ism-in-store-branch-h5/src/components/PageLoading/index")
            .default
        }),
        title: "物料提报明细",
        guest: true,
        exact: true,
        Routes: [require("./TitleWrapper.jsx").default],
        _title: "物料提报明细",
        _title_default: "ISM终端协同"
      },
      {
        path: "/exception",
        component: _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__ExceptionLayout" */ "../../layouts/ExceptionLayout"),
          LoadingComponent: require("E:/pinlor-static-ism-in-store-branch-h5/src/components/PageLoading/index")
            .default
        }),
        routes: [
          {
            path: "/exception/403",
            title: "无权限",
            component: _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__ExceptionLayout" */ "../exception/403"),
              LoadingComponent: require("E:/pinlor-static-ism-in-store-branch-h5/src/components/PageLoading/index")
                .default
            }),
            exact: true,
            Routes: [require("./TitleWrapper.jsx").default],
            _title: "无权限",
            _title_default: "ISM终端协同"
          },
          {
            path: "/exception/500",
            title: "服务器出错了",
            component: _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__ExceptionLayout" */ "../exception/500"),
              LoadingComponent: require("E:/pinlor-static-ism-in-store-branch-h5/src/components/PageLoading/index")
                .default
            }),
            exact: true,
            Routes: [require("./TitleWrapper.jsx").default],
            _title: "服务器出错了",
            _title_default: "ISM终端协同"
          },
          {
            component: () =>
              React.createElement(
                require("E:/pinlor-static-ism-in-store-branch-h5/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
                  .default,
                { pagesPath: "src/pages", hasRoutesInConfig: true }
              ),
            _title: "ISM终端协同",
            _title_default: "ISM终端协同"
          }
        ],
        _title: "ISM终端协同",
        _title_default: "ISM终端协同"
      },
      {
        component: _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ "../404"),
          LoadingComponent: require("E:/pinlor-static-ism-in-store-branch-h5/src/components/PageLoading/index")
            .default
        }),
        title: "页面没找到",
        exact: true,
        Routes: [require("./TitleWrapper.jsx").default],
        _title: "页面没找到",
        _title_default: "ISM终端协同"
      },
      {
        component: () =>
          React.createElement(
            require("E:/pinlor-static-ism-in-store-branch-h5/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
              .default,
            { pagesPath: "src/pages", hasRoutesInConfig: true }
          ),
        _title: "ISM终端协同",
        _title_default: "ISM终端协同"
      }
    ],
    _title: "ISM终端协同",
    _title_default: "ISM终端协同"
  },
  {
    component: () =>
      React.createElement(
        require("E:/pinlor-static-ism-in-store-branch-h5/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
          .default,
        { pagesPath: "src/pages", hasRoutesInConfig: true }
      ),
    _title: "ISM终端协同",
    _title_default: "ISM终端协同"
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach("patchRoutes", { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach("onRouteChange", {
    initialValue: {
      routes,
      location,
      action
    }
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return <Router history={window.g_history}>{renderRoutes(routes, {})}</Router>;
}
