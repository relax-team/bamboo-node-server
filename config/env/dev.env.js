'use strict';
module.exports = {
  NODE_ENV: 'development',
  PORT: 9001,
  protocol: 'http',
  proxy_rules: [{
    proxy_location: '/proxy',
    proxy_pass: 'http://rap2api.taobao.org/app/mock/86011',
    proxy_pass_merge: true
  }]
};
