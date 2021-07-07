/*********************************************************************
 * 接口公用方法
 *********************************************************************/

//  小程序appid、app screct
const APP_ID = 'wx0d9525966df3c4b2',
  APP_SECRECT = 'ef9154c3898612c63b9d9948bcb94d4b';

// 接口返回
function resSend(res, data) {
  res.send({
    status: data.status,
    message: data.message || '',
    data: data.data
  });
}

// 列表接口返回数据格式
function getResData(result) {
  let obj = null;
  if (result.hasOwnProperty('total')) {
    obj = {
      status: result.status,
      message: result.message || '',
      data: {
        total: result.total,
        rows: result.data || []
      }
    }
  } else {
    obj = {
      status: result.status,
      message: result.message || '',
      data: result.data
    }
  }
  return obj;
}

// 返回对象格式
function getObjResData(result) {
  return {
    status: result.status,
    message: result.message || '',
    data: result.data[0] || {}
  }
}



module.exports = {
  APP_ID,
  APP_SECRECT,
  resSend,
  getResData,
  getObjResData
};