'use strict';
module.exports = {
  NODE_ENV: 'production',
  PORT: 9002,
  protocol: 'http',
  corsAllow: ['bamboo.com'],    //允许跨域请求的域名
  proxy_rules: [{
    proxy_location: '/proxy',
    proxy_pass: 'http://rap2api.taobao.org/app/mock/86011',
    proxy_pass_merge: true
  }]
};
