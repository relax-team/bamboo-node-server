'use strict';

const env = process.env.NODE_ENV;
let envCfg;
switch (env){
  case 'production':
    envCfg = require('./prod.env');
    break;
  default:
    envCfg = require('./dev.env');
    break;
}

module.exports = envCfg;
