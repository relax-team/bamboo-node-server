'use strict';

const axios = require('axios');

module.exports = async (opt) => {
  opt = Object.assign({
    method: 'POST',
    headers: {},
    data: {},
    timeout: 10000  //设置默认超时
  }, opt);

  //处理opt中的url
  let reqUrl = opt.url;
  if (!reqUrl) {
    const error = 'request缺少必要参数, url: ' + opt.url;
    logger.info(error);
    return Promise.reject({
      err_code: 1003,
      msg: error
    })
  }

  //创建一个axios示例，可以自定义配置
  const instance = axios.create({
    headers: Object.assign({}, opt.headers),
    timeout: opt.timeout, // request timeout
    withCredentials: true
  });

  //处理请求方式，默认post请求
  const fetch = function (opt) {
    if (opt.method.toUpperCase() === 'GET') {
      return instance.get(reqUrl, {params: opt.data});
    }
    return instance.post(reqUrl, opt.data);
  };

  //开始发送请求，处理返回结果
  let err, res;
  try {
    logger.info(`[请求URL ${opt.method}] ${opt.url}`);
    logger.info(`[请求Header] ${JSON.stringify(opt.headers)}`);
    logger.info(`[请求参数] ${JSON.stringify(opt.data)}`);

    const response = await fetch(opt);

    if (response.status === 200) {
      res = response.data;
    } else {
      err = {
        err_code: response.status,
        msg: response.statusText || '服务器错误'
      };
    }

    //统一错误提示
    if (err) {
      logger.info('请求出错啦! #', err.err_code);
      return Promise.reject(err);
    }

    logger.info(`[响应结果] ${JSON.stringify(res)}`);

    return res || {};
  } catch (e) {
    err = {
      message: e.message,
      type: 'error',
      duration: 5 * 1000
    };
    return Promise.reject(err);
  }
};
