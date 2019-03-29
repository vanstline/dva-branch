export default [
  {
    path: "/",
    component: "../layouts/BasicLayout",
    routes: [
      { path: "/", component: "./index/index", title: "首页" },
      {
        path: "/login",
        component: "./login/index",
        title: "登录",
        guest: true
      },
      {
        path: "/info",
        component: "./info/index",
        title: "物料提报明细",
        guest: true
      },
      {
        path: "/edit",
        component: "./edit/index",
        title: "物料提报明细",
        guest: true
      },

      // { path: '/test', component: './test/index', title: '测试页面' },
      {
        path: "/exception",
        component: "../layouts/ExceptionLayout",
        routes: [
          {
            path: "/exception/403",
            title: "无权限",
            component: "./exception/403"
          },
          {
            path: "/exception/500",
            title: "服务器出错了",
            component: "./exception/500"
          }
        ]
      },
      { component: "404", title: "页面没找到" }
    ]
  }
];
