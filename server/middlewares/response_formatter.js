/**
 * 在app.use(router)之前调用
 */
module.exports = (pattern) => {
  return async (ctx, next) => {
    try {
      await next(); //先去执行路由
    } catch (err) {
      throw err;  //继续抛，让外层中间件处理日志
    }

    //通过正则的url进行格式化处理
    const reg = new RegExp(pattern);
    if (reg.test(ctx.originalUrl)) {
      const {code, message, data} = ctx.body;
      ctx.body = {
        success: code === 200,
        message: message || '暂无数据',
        data: data || null
      };
    }
  }
};

