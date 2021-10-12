const log4js = require("log4js");


// 请求、错误日志 -- https://www.cnblogs.com/aipeli/p/9975809.html
log4js.configure({
  replaceConsole: true,
  appenders: {
    stdout: {
      //将日志在 控制台输出
      type: 'console'
    },
    info: {
      type: 'dateFile',
      filename: 'logs/infolog/',
      pattern: 'info-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    error: {
      type: 'dateFile',
      filename: 'logs/errorlog/',
      pattern: 'error-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    //appenders:采用的appender,取appenders项,level:设置级别
    default: {
      appenders: ['stdout', 'info'],
      level: 'info'
    },
    error: {
      appenders: ['stdout', 'error'],
      level: 'error'
    },
  }
});

exports.getLogger = function (name) {
  //name取categories项
  return log4js.getLogger(name || 'info');
}

exports.useLogger = function (app, logger) {
  //用来与express结合
  app.use(log4js.connectLogger(logger || log4js.getLogger('info'), {
      format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]'//自定义输出格式
  }))
}