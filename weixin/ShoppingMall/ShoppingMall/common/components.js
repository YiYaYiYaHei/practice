// 自动引入components文件夹下.vue结尾的文件
const modulesFiles = require.context('./components/', true, /\.vue$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  value.default && (modules[moduleName] = value.default);
  return modules;
}, {});

export default {
  ...modules
};
