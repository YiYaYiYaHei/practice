/*********************************************************************
 * 首页相关接口
 * 单、双引号对数据库操作有影响，尽量使用双引号
 * 返回状态码：
 * 200-成功
 * 201-请求参数/后台报错
 * 500-数据库连接不上
 *********************************************************************/

const dbFunc = require("./db_conf");
const common = require("./common");

module.exports = app => {
  // 限时好物
  app.get('/wx/home/limit/list', async (req, res) => {
    console.log('================ /wx/home/limit/list start================');

    let find_res = await dbFunc.findFunc('goods', {limit: `0, 10`}).catch(e => {
      common.resSend(res, e);
      return;
    });
    if (find_res.status === 200) {
      console.log(find_res);
      common.resSend(res, common.getResData(find_res));
    } else {
      common.resSend(res, find_res);
    }

    console.log('================ /wx/home/limit/list end================');
  }),
  // 精品团购
  app.get('/wx/home/group/list', async (req, res) => {
    console.log('================ /wx/home/group/list start================');

    let find_res = await dbFunc.findFunc('goods', {limit: `10, 10`}).catch(e => {
      common.resSend(res, e);
      return;
    });
    if (find_res.status === 200) {
      common.resSend(res, common.getResData(find_res));
    } else {
      common.resSend(res, find_res);
    }

    console.log('================ /wx/home/group/list end================');
  }),
  // 商品列表
  app.post('/wx/home/goods/list', async (req, res) => {
    console.log('================ /wx/home/goods/list start================');
    let params = req.body;
    if (!params.pageCurrent || !params.pageSize) {
      common.resSend({status: 201, message: '缺少参数pageCurrent/pageSize'});
    }
    let find_res = await dbFunc.findFunc('goods', {isGetTotal: true, limit: `${(params.pageCurrent - 1) * params.pageSize}, ${params.pageSize}`}).catch(e => {
      common.resSend(res, e);
      return;
    });
    if (find_res.status === 200) {
      common.resSend(res, common.getResData(find_res));
    } else {
      common.resSend(res, find_res);
    }

    console.log('================ /wx/home/goods/list end================');
  }),
  // 商品详情
  app.post('/wx/home/goods/detail', async (req, res) => {
    console.log('================ /wx/home/goods/detail start================');
    let params = req.body;
    if (!params.goodsId) {
      common.resSend({status: 201, message: '缺少参数goodsId'});
    }
    let find_res = await dbFunc.findFunc('goods', {where: `goodId=${params.goodsId}`}).catch(e => {
      common.resSend(res, e);
      return;
    });
    if (find_res.status === 200) {
      common.resSend(res, common.getObjResData(find_res));
    } else {
      common.resSend(res, find_res);
    }

    console.log('================ /wx/home/goods/detail end================');
  })
}