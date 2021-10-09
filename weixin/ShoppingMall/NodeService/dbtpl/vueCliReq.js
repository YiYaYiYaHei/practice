const crypto = require("crypto"),
      log4 =  require("../logs/log4js.js"),
      logger = log4.getLogger('info'),
      loggerError = log4.getLogger('error');

const baseResponse = {
  status: 200,
  message: '成功',
  data: null
};

// 验证token是否存在（记录请求、错误日志）
const commonDeal = async (req, res, cb) => {
  // 验证header中是否有token
  if ((!req.headers.authorization || req.headers.authorization === 'null') && !req.url.startsWith('/login?_date')) {
    loggerError.error(`${req.method} -- 请求地址：${req.url}， 请求参数：${JSON.stringify(req.body || req.params)}，错误原因：hearder中无token`);
    res.send(Object.assign({}, baseResponse, {status: 500, message: 'token不存在'}));
  } else {
    logger.info(`${req.method} -- 请求地址：${req.url}， 请求参数：${JSON.stringify(req.body || req.params)}`);
  }
  if (typeof cb === 'function') {
    const data = await cb();
    const msg = `${req.method} -- 地址：${req.url}， 响应：${JSON.stringify(data)}`;
    /401|201|500/g.test(data.status) ? loggerError.error(msg) : logger.info(msg);
    res.send(data);
  } else {
    res.send(baseResponse);
  }
};

// createCipheriv - key(32位随机)
const tokenKey = 'abcdefg123456higklmn123456789opk';
// createCipheriv - iv(16位随机)
const tokenIv = 'rstuvwxyz1234567';
// 生成token -- 对称加密
function createToken(userName) {
  // createCipheriv  key的长度取决于加密类型，这里用的aes-256-cbc所以得是32位(aes-128-cbc对应16位), iv始终16位
  const cipher = crypto.createCipheriv('aes-256-cbc', tokenKey, tokenIv);
  let crypted = cipher.update(JSON.stringify({userName, time: Date.now()}), "utf8", "base64");
  crypted += cipher.final("base64");
  return crypted;
}
// 解token
function decryptToken(req) {
  const token = req.headers.authorization.slice(7);
  const cipher = crypto.createDecipheriv('aes-256-cbc', tokenKey, tokenIv);
  let decrypted = cipher.update(token, "base64", "utf8");
  decrypted += cipher.final("utf8");
  return decrypted;
}

module.exports = app => {
  // 用户登录
  app.post('/login', (req, res) => commonDeal(req, res, () => {
    const role = req.body.userName === 'admin' ? '管理员' : '普通用户';
    const data = {
      // 使用crypto.createHash('sha256').update(req.body.userName).digest('hex')，无法解密，因为hash是单向的
      token: createToken(req.body.userName),
      role,
      userId: parseInt(Math.random() * 100)
    }
    return Object.assign({}, baseResponse, {data});
  }));
  // 用户退出
  app.get('/logout', (req, res) => commonDeal(req, res));
  // 修改密码 -- 校验旧密码是否正确
  app.post('/checkOldPwd', (req, res) => commonDeal(req, res, () => {
    const date = Date.now();
    const flag = date % 2 === 0;
    return Object.assign({}, baseResponse, {status: flag ? 201 : 200, data: flag, message: flag ? '旧密码错误' : ''});
  }));
  // 修改密码 -- 验证用户名是否存在
  app.post('/checkUserName', (req, res) => commonDeal(req, res));
  // 商品创建 - 表格数据
  app.post('/table/list', (req, res) => commonDeal(req, res, () => {
    const length = parseInt(Math.random() * 200);
    const rows = [];
    for(let i = 0; i < length; i++) {
      rows.push({
        lastOrderTime: +new Date(),
        userName: i % 5 === 1 ? '张三' : i % 5 === 2 ? '李四' : i % 5 === 3 ? '隔壁王五' : i % 5 === 4 ? '老李头' : '小王头',
        orderTotal: parseInt(Math.random() * 100000),
        orderUnfinished: parseInt(Math.random() * 10000),
        orderFinished: parseInt(Math.random() * 1000),
        purchaseType: i % 2 === 0 ? '衣物' : '电器',
        purchaseTotal: parseInt(Math.random() * 100),
        isVip: i % 2 === 0 ? true : false,
        description: '客户的描述' + i
      });
    };
    return Object.assign({}, baseResponse, {data: {rows, total: length}});
  }));
  // 商品创建 - 表格行展开数据
  app.post('/table/detail', (req, res) => commonDeal(req, res, () => {
    const flag = +new Date();
    return Object.assign({}, baseResponse, {data: {
      lastOrderTime: +new Date(),
      userName: '张三',
      orderTotal: parseInt(Math.random() * 100000),
      orderUnfinished: parseInt(Math.random() * 10000),
      orderFinished: parseInt(Math.random() * 1000),
      purchaseType: flag ? '衣物' : '电器',
      purchaseTotal: parseInt(Math.random() * 100),
      isVip: flag ? true : false,
      description: '客户的描述客户的描述客户的描述客户的描述客户的描述客户的描述客户的描述'
    }});
  }));
  // 首页 - 饼状图
  app.post('/chart/pie', (req, res) => commonDeal(req, res, () => {
    return Object.assign({}, baseResponse, {data: [
      {value: 196, name: "电脑数码"},
      {value: 234, name: "日用百货"},
      {value: 125, name: "个护清洁"},
      {value: 316, name: "图书影像"},
      {value: 63, name: "家具厨具"}
    ]});
  }));
  // 首页 - 折线图
  app.post('/chart/line', (req, res) => commonDeal(req, res, () => {
    return Object.assign({}, baseResponse, {data: [
      {value: 196, name: "电脑数码"},
      {value: 234, name: "日用百货"},
      {value: 125, name: "个护清洁"},
      {value: 316, name: "图书影像"},
      {value: 63, name: "家具厨具"}
    ]});
  }));
  // 首页 - 柱状图
  app.post('/chart/bar', (req, res) => commonDeal(req, res, () => {
    return Object.assign({}, baseResponse, {data: [
      {value: 196, name: "电脑数码"},
      {value: 234, name: "日用百货"},
      {value: 125, name: "个护清洁"},
      {value: 316, name: "图书影像"},
      {value: 63, name: "家具厨具"}
    ]});
  }));
  // 首页 - 地图
  app.post('/chart/map', (req, res) => commonDeal(req, res, () => {
    return Object.assign({}, baseResponse, {data: [
      {value: 196, name: "新疆"},
      {value: 234, name: "四川"},
      {value: 125, name: "内蒙古"},
      {value: 316, name: "广东"},
      {value: 63, name: "湖北"},
      {value: 63, name: "黑龙江"}
    ]});
  }));
  // 刷新token
  app.get('/auth/refresh', (req, res) => commonDeal(req, res, () => {
    const userName = (decryptToken(req) || {userName: 'null'}).userName;
    return Object.assign({}, baseResponse, {data: createToken(userName)});
  }));

  // 系统管理-用户管理 - 表格数据
  app.post('/user/table/list', (req, res) => commonDeal(req, res, () => {
    const length = parseInt(Math.random() * 200);
    const rows = [];
    for(let i = 0; i < length; i++) {
      rows.push({
        createdTime: +new Date(),
        userName: (i % 5 === 1 ? '张三' : i % 5 === 2 ? '李四' : i % 5 === 3 ? '隔壁王五' : i % 5 === 4 ? '老李头' : '小王头') + i,
        role: i % 2 === 0 ? '管理员' : '普通用户',
        describe: '用户的描述' + i,
        id: i
      });
    };
    return Object.assign({}, baseResponse, {data: {rows, total: length}});
  }));
  // 系统管理-用户管理 - 删除用户   接口/user/delete/30   获取id: req.params.id
  app.delete('/user/delete/:id', (req, res) => commonDeal(req, res));
  // 系统管理-用户管理 - 新增/删除用户
  app.post('/user/addOrEdit', (req, res) => commonDeal(req, res));
  // 系统管理-系统日志 - 表格数据
  app.post('/system/log', (req, res) => commonDeal(req, res, () => {
    const length = parseInt(Math.random() * 200);
    const rows = [];
    for(let i = 0; i < length; i++) {
      rows.push({
        createdTime: +new Date(),
        name: '日志名称' + i,
        userName: (i % 5 === 1 ? '张三' : i % 5 === 2 ? '李四' : i % 5 === 3 ? '隔壁王五' : i % 5 === 4 ? '老李头' : '小王头') + i,
        path: '/user/operator/log',
        id: i
      });
    };
    return Object.assign({}, baseResponse, {data: {rows, total: length}});
  }));

};