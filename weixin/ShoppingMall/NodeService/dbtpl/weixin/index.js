/*********************************************************************
 * 模块接口引用入口
 *********************************************************************/

const Login = require('./login');
const Home = require('./home');
const Classification = require('./classification');

module.exports = app => {
  Login(app);
  Home(app);
  Classification(app);
};
