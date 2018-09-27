/*
* 代理转发中间件
* by xqs 20180911
{
  proxy_methods: ['GET', 'POST', 'PUT', 'DELETE'],
  proxy_rules: [{
    proxy_location: '/version/',
    proxy_pass: 'http://localhost:5000/proxy/',
  }]
};
*/
const fetch = require('../utils/request');

module.exports = () => {
  const options = {
    proxy_methods: ['GET', 'POST', 'PUT', 'DELETE'],
    proxy_rules: cfg.proxy_rules
  };

  return async (ctx, next) => {
    if (shouldSkipNext(ctx, options)) return await next();

    //合并需要的参数，发请求
    let data = Object.assign({}, ctx.request.query, ctx.request.body);
    ctx.body = await fetch({
      method: ctx.method,
      url: resolvePath(ctx.path, options.proxy_rules),
      headers: ctx.header,
      data: data
    });
  }
};

/**
 * 是否跳过代理
 */
function shouldSkipNext(ctx, options) {
  return !resolvePath(ctx.path, options.proxy_rules) || options.proxy_methods.indexOf(ctx.method) === -1
}

/*
* 返回代理请求的真实路径
* */
function resolvePath(path, rules) {
  const result = rules.find(v => {
    return new RegExp(`^${v.proxy_location}`).test(path);
  });
  if (!result) return false;
  path = result.proxy_pass_merge ? path.replace(result.proxy_location, '') : path;
  return result.proxy_pass + path;
}
