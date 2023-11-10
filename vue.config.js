'use strict';
const EndWebpackPlugin = require('./plugins/webpack.end.js');
module.exports = {
  devServer: {
    port: 9991,
    open: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000/api',
        ws: true,
        pathRewrite: {'^/api' : ''},
        changeOrigin: true
      },
    }
  },
  configureWebpack: config => {
    if (process.env.ENV === 'production') {
      config.plugins.push(new EndWebpackPlugin('dist','admin-ui'))
      config.externals = {
        vue: 'Vue',
        axios: 'axios',
        moment: 'moment',
        screenfull: 'screenfull',
        nprogress: 'NProgress',
        'vue-router': 'VueRouter',
        'ant-design-vue': 'antd',
      }
    }
  },
  chainWebpack: (config) => {
    // config.resolve.alias
    //   .set('@', resolve('src')) 
    //   .end();
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 'primary-color': '#0064c8', // 主色调
            // 'link-color': '#0070cc', // 链接颜色
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};