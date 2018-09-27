'use strict';

const env = {
  dev: require('./config/env/dev.env'),
  prod: require('./config/env/prod.env'),
};

module.exports = {
  apps : [
    {
      name: "node-server",
      script: "./app.js",
      cwd: "./",           //根目录
      watch: true,        //监听文件变化，自动重启，可正则匹配
      instances: 1,       //同max
      exec_mode: "fork",  //默认fork, 集群:cluster
      "env": {
        "PORT": env.prod.PORT,
        "NODE_ENV": env.prod.NODE_ENV
      },
      "env_dev": {
        "PORT": env.dev.PORT,
        "NODE_ENV": env.dev.NODE_ENV
      },
    }
  ]
};
