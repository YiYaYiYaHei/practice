var formidable = require('formidable');
var fs = require('fs');  //node.js核心的文件处理模块
var path = require('path');

module.exports = (app) => {
  app.post('/upload', async (req, res) => {
    var form = new formidable.IncomingForm();   //创建上传表单
      form.encoding = 'utf-8';                  //设置编辑
      form.uploadDir = 'public/upload/';        //设置上传目录
      form.keepExtensions = true;               //保留后缀
      form.maxFieldsSize = 2 * 1024 * 1024;     //文件大小

    form.parse(req, function(err, fields, files) {
      if (err) {
        res.send({
          status: 201,
          message: err
        });
        return;
      };
      try {
        var filename = files.file.name;
        // 对文件名进行处理，以应对上传同名文件的情况
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length-1];
        var name = '';
        for(var i=0; i<nameArray.length-1; i++){
          name = name + nameArray[i];
        }
        var rand = Math.random() * 100 + 900;
        var num = parseInt(rand, 10);

        var avatarName = name + num +  '.' + type;

        var newPath = form.uploadDir + avatarName ;
        fs.renameSync(files.file.path, newPath);  //重命名
        res.send({status: 200, message: '文件上传成功'});
      } catch (err) {
        res.send({
          status: 201,
          message: err
        });
        return;
      }
    });
  });

  app.get('/download', async (req, res) => {
    try {
      // 获取文件路径
      let filePath = path.join(__dirname,'../public/upload/' + req.query.name);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.send({
            status: 201,
            message: err
          });
          return;
        }
        // 获取文件大小
        const size = fs.statSync(filePath).size;
        res.writeHead(200, {
          'Content-Disposition': 'attachment; filename=' + encodeURIComponent(req.query.name),  // 告诉浏览器这是一个需要以附件形式下载的文件（浏览器下载的默认行为，前端可以从这个响应头中获取文件名：前端使用ajax请求下载的时候，后端若返回文件流，此时前端必须要设置文件名-主要是为了获取文件后缀，否则前端会默认为txt文件）
          'Content-Type': 'application/octet-stream',  // 告诉浏览器是二进制文件，不要直接显示内容
          'Content-Length': size,   // 下载文件大小
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'X-Requested-With',
          'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        });
        fs.createReadStream(filePath).pipe(res);
      })
    } catch (err) {
      res.send({
        status: 201,
        message: err
      })
      return;
    }
  })
}