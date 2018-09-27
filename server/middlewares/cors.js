/**
 * @abstract 跨域相关配置
 * @date 2018/08/26 09:42:58
 * @author qingsong
 */
const cors = require('koa2-cors');

module.exports = () => {
  return cors({
    origin: (ctx) => {
      const origin = ctx.header.origin;
      if(!cfg.corsAllow) return origin;
      return new RegExp(cfg.corsAllow.join('|'), 'gi').test(origin) && origin;
    },
    credentials: true
  });
};
