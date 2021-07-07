/*********************************************************************
 * 登录相关接口
 * 单、双引号对数据库操作有影响，尽量使用双引号
 * 返回状态码：
 * 200-成功
 * 201-请求参数/后台报错
 * 500-数据库连接不上
 *********************************************************************/

const request = require("request");
const crypto = require("crypto"); // crypto 模块提供了加密功能，https://www.jianshu.com/p/c5c8c19bc80a。
var querystring = require('querystring');
const common = require("./common");
const dbFunc = require("./db_conf");

// 生成token
function makeToken(str) {
  const sha256 = crypto.createHash('sha256');
  // 输入流编码：utf8、ascii、binary（默认）
  sha256.update(str, 'utf8');
  return sha256.digest('hex');
}

module.exports = app => {
  // 微信授权登录-获取openid、sessionKey
  app.post('/wx/login', async (req, res) => {
    console.log('================ /wx/login start================');
    const requestUrl = 'https://api.weixin.qq.com/sns/jscode2session';
    const code = req.body.code;
    const params = req.body;
    if (!code) {
      common.resSend(res, {status: 201, message: 'code不存在'});
      return;
    }
    if (!params.userInfo) {
      common.resSend(res, {status: 201, message: '用户信息不存在'});
      return;
    }
    // 1、请求微信小程序，获取openid、sessionKey
    await request(`${requestUrl}?appid=${common.APP_ID}&secret=${common.APP_SECRECT}&js_code=${code}&grant_type=authorization_code`, async (error, response, body) => {
      if (response && (response.statusCode === 200)) {
        const errorMsg = {
          "-1": "系统繁忙，此时请开发者稍候再试",
          "40029": "code 无效，请检查mainifest.json中的mp-weixin：appid是否与后台一致！",
          "45011": "频率限制，每个用户每分钟100次",
          "0": "请求成功",
          "-2": "jscode2session接口未知错误"
        };
        let data = JSON.parse(body || '{}');
        if(!Object.keys(data).length) {
          common.resSend(res, {status: 201, message: errorMsg[-2]});
        }
        if(!!data.errcode) {
          common.resSend(res, {status: 201, message: errorMsg[data.errcode] || data.errmsg});
        }

        if(data.session_key) {
          // 2、查询登录用户在数据库中是否存在
          let find_res = await dbFunc.findFunc('user', {where: `openId="${data.openid}"`}).catch(e => {
            common.resSend(res, e);
            return;
          });
          console.log('查询结果:', find_res);
          if (find_res.status === 200) {
            const createdTime = +new Date();
            const token = makeToken(`${params.userInfo.nickName}${data.openid}${createdTime}`);
            let gender = '';
            switch(params.userInfo.gender) {
              case 0:
                gender = '未知';
                break;
              case 1:
                gender = '男';
                break;
              case 2:
                gender = '女';
                break;
            }
            const userData = {
              token: token,
              nickName: params.userInfo.nickName,   // 用户昵称
              gender: gender,  // 用户性别 0：未知、1：男、2：女
              avatarUrl: params.userInfo.avatarUrl,  // 用户头像
              sessionKey: `${data.session_key}`,
              openId: `${data.openid}`,
              createdTime: createdTime
            };
            // 返回参数
            const resData = {
              status: 200,
              message: '登录成功',
              data: {
                openId: data.openid,
                sessionKey: data.session_key,
                token: token,
                userInfo: {
                  nickName: params.userInfo.nickName,
                  gender: gender,
                  avatarUrl: params.userInfo.avatarUrl
                }
              }
            }

            if (!find_res.data.length) {
              // 3、若数据库中不存在该用户--新增
              await dbFunc.insertFunc('user', userData).catch(e => {
                common.resSend(res, e);
                return;
              });
              common.resSend(res, resData);
            } else {
              // 3、若数据库中存在该用户--修改 登录时间、更新token
              await dbFunc.updateFunc('user', {data: {loginTime: +new Date(), token}, where: `openId="${data.openid}"`}).catch(e => {
                common.resSend(res, e);
                return;
              });
              common.resSend(res, resData);
            }

          } else {
            common.resSend(res, find_res);
          }
        }
      } else {
        common.resSend(res, {status: 500, message: `openId获取失败:${error}`});
      }
      console.log('================ /wx/login end================');
    });
  });
  // 微信授权登录--刷新token
  app.post('/wx/refreshToken', async (req, res) => {
    console.log('================ /wx/refreshToken start================');
    const params = req.body;
    if (!params.openId) {
      common.resSend(res, {status: 201, message: 'openId不存在'});
      return;
    }
    // 1、查询登录用户在数据库中是否存在
    let find_res = await dbFunc.findFunc('user', {where: `openId="${params.openId}"`}).catch(e => {
      common.resSend(res, e);
      return;
    });
    console.log('查询结果:', find_res)
    if (find_res.status === 200) {
      const dbData = find_res.data[0];
      const loginTime = +new Date();
      const token = makeToken(`${dbData.nickName}${dbData.openId}${loginTime}`);
      // 返回参数
      const resData = {
        status: 200,
        message: '刷新token成功',
        data: {
          token: token
        }
      }
      // 2、若数据库中存在该用户--修改 登录时间、更新token
      await dbFunc.updateFunc('user', {data: {loginTime, token}, where: `openId="${params.openId}"`}).catch(e => {
        common.resSend(res, e);
        return;
      });
      common.resSend(res, resData);
    } else {
      common.resSend(res, find_res);
    }
    console.log('================ /wx/refreshToken end================');
  });


  /**
   * @description 手机号验证码登录--太懒了，只实现了第三方库接入和验证码正确性校验，插入数据库的操作没做
   * 生成验证码--验证码收费，所以用的其他的
   * 固定验证码--0616
   * 第三方工具：聚合数据--生日书  https://www.juhe.cn/docs/api/id/619
   * 使用案列: https://www.sdk.cn/details/vRw1ZkdWewxp8amByJ?s=api
   */
  app.post('/wx/loginPhone', async (req, res) => {
    const params = req.body;
    const resData = {
      status: 200,
      message: '登录成功',
      data: {
        openId: 'oz-FM46oLkyJ8H88Tf8EXtXowKy4',
        sessionKey: 'yggK9UWkvbD/UsZ+hwS1sg==',
        token: '9b13e61a3c862ea063fd6de93e23f88998dc62d200f2e511f3c619b89d0d1493',
        userInfo: {
          nickName: '微信用户',
          gender: '未知',
          avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
        }
      }
    }
    if (params.userName && params.password) {
      common.resSend(res, resData);
      return;
    }
    const queryData = querystring.stringify({
        "keyword": '2021-06-16',  // 生日日期
        "key": "32829f9e5855c3ac6544989c69d7b538",  // 您申请的API  key
    });
    const queryUrl = 'http://apis.juhe.cn/fapig/birthdayBook/query';

    request.post({url: queryUrl, form: queryData}, (error, response, body) => {
      if (response && (response.statusCode === 200)) {
        var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
        if (!!jsonObj) {
          var errorCode = jsonObj.error_code;
            var reason = jsonObj.reason;
            if (errorCode == 0) {
              // 请求发送成功，可根据实际逻辑修改
              var verificationCode = jsonObj.result.birthday.replace('-', '');
              if (verificationCode === params.verificationCode) {
                common.resSend(res, resData);
              } else {
                common.resSend(res, {status: 201, message: '验证码错误'});
              }
            } else {
              // 请求失败
              common.resSend(res, {status: 201, message: `验证码获取失败:${errorCode}--${reason}`});
            }
        } else{
          // 可能网络异常等问题请求失败，可根据实际逻辑修改
          common.resSend(res, {status: 201, message: '验证码获取失败:解析JSON异常'});
        }
      } else {
        common.resSend(res, {status: 500, message: `验证码获取失败:${error}`});
      }
    });
  })
};