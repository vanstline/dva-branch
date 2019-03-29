// https://umijs.org/config/
import path from 'path';
import pageRoutes from './router.config';
import theme from './theme.config';

export default {
  // add for transfer to umi
  define: {
    // 'process.env.APIDOMAIN': 'http://ism.proxy.linjiash.com',
    'process.env.APIDOMAIN': 'https://ism-test-api.customlink.com.cn',
    'process.env.IMGDOMAIN': 'https://s3.cn-northwest-1.amazonaws.com.cn/nxaws-s3-ism1/',
  },
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
          webpackChunkName: true,
        },
        title: {
          defaultTitle: 'ISM终端协同',
        },
        dll: false,
        pwa: false,
        hd: false,
        routes: {
          exclude: [],
        },
        hardSource: false,
      },
    ],
  ],
  exportStatic: {},
  // 路由配置
  routes: pageRoutes,
  // Theme for antd-mobile
  // https://github.com/ant-design/ant-design-mobile/blob/master/components/style/themes/default.less

  theme,
  //   ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssnano: {
    mergeRules: false,
  },
  targets: {
    android: 6,
    ios: 7,
  },
  disableCSSModules: true,
  outputPath: './deploy/dist',
  hash: true,
  alias: {
    '@': path.resolve(__dirname, 'src'),
    utils: path.resolve(__dirname, 'src/utils'),
    themes: path.resolve(__dirname, 'src/themes'),
    images: path.resolve(__dirname, 'src/assets'),
  },
};
