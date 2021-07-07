const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  path = require('path'),
  port = process.env.PORT || 13666,
  request = require('./dbtpl/request'),
  formReq = require('./dbtpl/formReq'),
  fileReq = require('./dbtpl/fileReq'),
  weixinReq = require('./dbtpl/weixin/index.js'),
  socket = require('./dbtpl/socket');

/* 设置启动静态资源路径和请求编码及转义 */
app.use(express.static(path.join(__dirname, '/static')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/* 服务启动监听 */
const server = app.listen(port, function () {
  console.log('customize system service starting on port ' + port);
});

/* 设置CORS跨域 */
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,token");
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

/* 微信小程序接口 */
weixinReq(app);

/* socket 接入 */
socket(app, server);

/* 导出模块 */
module.exports = app;