/*********************************************************************
 * 分类相关接口
 * 单、双引号对数据库操作有影响，尽量使用双引号
 * 返回状态码：
 * 200-成功
 * 201-请求参数/后台报错
 * 500-数据库连接不上
 *********************************************************************/

const dbFunc = require("./db_conf");
const common = require("./common");

module.exports = app => {
  // 分类tab
  app.get('/wx/classification/tab/list', async (req, res) => {
    console.log('================ /wx/classification/tab/list start================');

    let find_res = await dbFunc.findFunc('classification', {}).catch(e => {
      common.resSend(res, e);
      return;
    });
    if (find_res.status === 200) {
      console.log(find_res);
      common.resSend(res, common.getResData(find_res));
    } else {
      common.resSend(res, find_res);
    }
    console.log('================ /wx/classification/tab/list end================');
  }),
  // 分类列表
  app.post('/wx/classification/list', async (req, res) => {
    console.log('================ /wx/classification/list start================');
    const params = req.body;
    if (!params.classificationId) {
      common.resSend({status: 201, message: '缺少参数classificationId'});
      return;
    }
    let find_res = await dbFunc.findFunc('subClassification', {where: `classificationId=${params.classificationId}`}).catch(e => {
      common.resSend(res, e);
      return;
    });
    if (find_res.status === 200) {
      let resData = {
        status: find_res.status,
        message: find_res.message,
        data: []
      }
      for (let i = 0; i < find_res.data.length; i++) {
        let it = find_res.data[i];
        let obj = resData.data.find(item => item.label === it.subClassificationName);
        if (obj) {
          obj.value.push(it);
        } else {
          resData.data.push({
            label: it.subClassificationName,
            value: [it]
          });
        }
      }
      console.log(resData)
      common.resSend(res, common.getResData(resData));
    } else {
      common.resSend(res, find_res);
    }

    console.log('================ /wx/classification/list end================');
  })
}