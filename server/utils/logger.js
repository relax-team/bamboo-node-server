/* ******************************************************************
 * log4js日志管理配置文件
 * 重要: pm2 cluster模式下，需要安装 pm2-intercom 模块
 * pm2 install pm2-intercom
 ****************************************************************** */
const path = require('path');
const fs = require('fs');
const log4js = require('log4js');
const moment = require('moment');

moment.locale('zh-cn');

module.exports = logPath => {
  logPath = logPath || path.join(__dirname, '../../logs/');    //日志存放路径
  const layout = {
    type: 'pattern',
    pattern: '%x{time} - %m',
    tokens: {
      time() {
        return moment().format('YYYY-MM-DD HH:mm:ss')
      },
    },
  };

  const dateFile = {
    type: 'dateFile',
    alwaysIncludePattern: true,
    filename: logPath,
    layout,
    maxLogSize: 10 * 1024 * 1024, // = 10Mb
    daysToKeep: 15
  };

  const appenders = {
    console: {type: 'console', layout},
    log_info: Object.assign({}, dateFile, {pattern: 'yyyyMMdd.log'}),
    log_error: Object.assign({}, dateFile, {pattern: 'yyyyMMdd.err.log'})
  };

  const categories = {
    default: {appenders: ['console', 'log_info'], level: 'info'},
    error: {appenders: ['log_error'], level: 'error'},
  };

  // 如果日志文件夹不存在就主动创建
  fs.existsSync(logPath) || fs.mkdirSync(logPath);

  log4js.configure({
    appenders,
    categories,
    pm2: true,
  });

  const logger = log4js.getLogger();
  const errLogger = log4js.getLogger('error');

  return {
    info: logger.info.bind(logger),
    error: errLogger.error.bind(errLogger)
  }
};
