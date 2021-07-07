/**
 * 数据库操作文件
 * 返回码定义：
 * 201       数据连接错误
 * 202       数据插入数据错误
 * 203       数据删除数据错误
 * 204       数据查找错误
 */

let client = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/CustomizeDB';

let connectFunc = () => {
    return new Promise((resolve, reject) => {
        client.connect(url, (e, db) => {
            if (!!e) {
                reject({code: 201, message: 'database connect error'});
            } else {
                resolve({code: 200, data: db});
            }
        });
    });
};

let findFunc = (collectionName, data) => {
    return new Promise( async (resolve, reject) => {

        let result = await connectFunc().catch(e => {
            reject(e);
        });

        console.log(result);

        let db = result.data;

        db.collection(collectionName).find(data).toArray((err, resData) => {
            if (!!err) {
                reject({code: 204, message: 'data find error'});
            } else {
                resolve({code: 200, data: resData});
            }
        });
    });
};

let insertOneFunc = (collectionName, data) => {
    return new Promise(async (resolve, reject) => {
        
        let result = await connectFunc().catch(e => {
            reject(e);
        });

        let db = result.data;

        db.collection(collectionName).insertOne(data, (err, resData) => {
            if (!!err) {
                reject({code: 202, message: 'insert one data error'});
            } else {
                resolve({code: 200, data: resData});
            }
        });
    });
};

let deleteOneFunc = (collectionName, data) => {

    return new Promise(async (resolve, reject) => {

        let result = await connectFunc().catch(e => {
            reject(e);
        });

        let db = result.data;

        db.collection(collectionName).deleteMany(data, function(err, resData){
            if(!!err) {
                reject({code: 203, message: 'delete data error'});
            } else {
                resolve({code: 200, message: 'delete data success'});
            }
        });
    });
};

module.exports = {
    findFunc,
    insertOneFunc,
    deleteOneFunc
};