
// 自动引入mixins文件夹下.js结尾的文件（注意：export default 才可以被引入）
const modulesFiles = require.context('./', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  value.default && (modules[moduleName] = value.default);
  return modules;
}, {});

export default {
  ...modules
};
