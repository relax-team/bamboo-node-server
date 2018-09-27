const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const staticCache  = require('koa-static-cache');
const static  = require('koa-static');
const compress = require('koa-compress');
const cacheControl = require('koa-cache-control');
const cors = require('./server/middlewares/cors');

//Global
global.cfg = require('./config/env');

const app = new Koa();

app.use(bodyParser());

//处理日志配置
app.use(koaLogger());   //koa log
global.logger = require('./server/utils/logger')();

//cors跨越设置
app.use(cors());

//x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

//添加格式化处理响应结果的中间件，在添加路由之前调用
const formatter = require('./server/middlewares/response_formatter');
app.use(formatter('^/api'));  //指定url进行格式化处理

//路由规则
require('./server/routes')(app);

//代理转发
const proxy = require('./server/middlewares/proxy');
app.use(proxy());

// 设置静态服务器资源
app.use(staticCache(__dirname + '/static', {
  gzip: true,
  usePrecompiledGzip: /text|application/i
}));

// 文件压缩
app.use(compress({
  filter: (contentType) => {
    return /text|application/i.test(contentType)
  }
}));

// 缓存
app.use(cacheControl({
  public: true,
  //maxAge: 600
}));

// 错误异常处理
app.on('error', (err, ctx) => {
  err && console.error(err);
  ctx.status = err.status || 500;
  ctx.body = err.message;
});


//创建服务
const port = cfg.PORT || 3000;
app.listen(port, (err) => {
  logger.info('[当前环境 process.env.NODE_ENV]: ' + process.env.NODE_ENV);
  logger.info('Koa is listening in ' + port);
});
