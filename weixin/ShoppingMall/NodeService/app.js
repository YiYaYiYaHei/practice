const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  path = require('path'),
  port = process.env.PORT || 13666,
  request = require('./dbtpl/request'),
  formReq = require('./dbtpl/formReq'),
  fileReq = require('./dbtpl/fileReq'),
  bigFileReq = require('./dbtpl/bigFileReq'),
  weixinReq = require('./dbtpl/weixin/index.js'),
  vueCliReq = require('./dbtpl/vueCliReq'),
  socket = require('./dbtpl/socket'),
  https = require('https'),
  fs = require('fs');

// 服务端开启gzip支持
var compression = require('compression');
//尽量在其他中间件前使用compression
app.use(compression());


/* 设置启动静态资源路径和请求编码及转义 */
app.use(express.static(path.join(__dirname, '/static')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/* 服务启动监听 */
var privateCrt = fs.readFileSync(path.join(process.cwd(), 'cert/server.pem'), 'utf8');
var privateKey = fs.readFileSync(path.join(process.cwd(), 'cert/server.key'), 'utf8');
const HTTPS_OPTOIN = {
  key: privateKey,
  cert: privateCrt
};
const SSL_PORT = 13666;
const httpsServer = https.createServer(HTTPS_OPTOIN, app);
httpsServer.listen(SSL_PORT, () => {
  console.log(`HTTPS Server is running on: https://localhost:${SSL_PORT}`);
});
// ==================== http配置 start=======================
/* const httpsServer = app.listen(port, function () {
  console.log('customize system service starting on port ' + port);
}); */
// ==================== http配置 end =======================

/* 设置CORS跨域 */
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With,token");
  /**
   * 解决跨域
   * 包含自定义header字段的跨域请求，浏览器会先向服务器发送OPTIONS请求，探测该服务器是否允许自定义的跨域字段。如果允许，则继续实际的POST／GET正常请求，否则，返回标题所示错误。
   * 若报跨域:...by CORS policy: Request header field range is not allowed by Access-Control-Allow-Headers in preflight response，只需在响应头中包含该字段即可(加入range)
  */
  res.header("Access-Control-Allow-Headers", "content-type,x-requested-with,Authorization,x-ui-request,lang,accept,access-control-allow-origin,range");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

/* 自定义大屏数据请求 */
request(app);

/* 自定义表单接口请求 */
formReq(app);

/* 文件上传、下载 */
fileReq(app);

/* 大文件文件上传、下载 */
bigFileReq(app);

/* 微信小程序接口 */
weixinReq(app);

/* vue-cli-empty 接口*/
vueCliReq(app);

/* socket 接入 */
socket(app, httpsServer);

/* 导出模块 */
module.exports = app;