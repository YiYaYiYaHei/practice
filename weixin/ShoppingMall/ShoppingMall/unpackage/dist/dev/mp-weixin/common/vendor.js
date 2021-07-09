(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"ShoppingMall","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 100:
/*!**************************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/plugins/luch-request/luch-request/adapters/index.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _buildURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/buildURL */ 101));
var _buildFullPath = _interopRequireDefault(__webpack_require__(/*! ../core/buildFullPath */ 103));
var _settle = _interopRequireDefault(__webpack_require__(/*! ../core/settle */ 106));
var _utils = __webpack_require__(/*! ../utils */ 102);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * 返回可选值存在的配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @param {Array} keys - 可选值数组
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @param {Object} config2 - 配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @return {{}} - 存在的配置项
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           */
var mergeKeys = function mergeKeys(keys, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    }
  });
  return config;
};var _default =
function _default(config) {
  return new Promise(function (resolve, reject) {
    var fullPath = (0, _buildURL.default)((0, _buildFullPath.default)(config.baseURL, config.url), config.params);
    var _config = {
      url: fullPath,
      header: config.header,
      complete: function complete(response) {
        config.fullPath = fullPath;
        response.config = config;
        try {
          // 对可能字符串不是json 的情况容错
          if (typeof response.data === 'string') {
            response.data = JSON.parse(response.data);
          }
          // eslint-disable-next-line no-empty
        } catch (e) {
        }
        (0, _settle.default)(resolve, reject, response);
      } };

    var requestTask;
    if (config.method === 'UPLOAD') {
      delete _config.header['content-type'];
      delete _config.header['Content-Type'];
      var otherConfig = {



        filePath: config.filePath,
        name: config.name };

      var optionalKeys = [









      'formData'];

      requestTask = uni.uploadFile(_objectSpread(_objectSpread(_objectSpread({}, _config), otherConfig), mergeKeys(optionalKeys, config)));
    } else if (config.method === 'DOWNLOAD') {





      requestTask = uni.downloadFile(_config);
    } else {
      var _optionalKeys = [
      'data',
      'method',

      'timeout',

      'dataType',

      'responseType'];











      requestTask = uni.request(_objectSpread(_objectSpread({}, _config), mergeKeys(_optionalKeys, config)));
    }
    if (config.getTask) {
      config.getTask(requestTask, config);
    }
  });
};exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 101:
/*!****************************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/plugins/luch-request/luch-request/helpers/buildURL.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildURL;

var utils = _interopRequireWildcard(__webpack_require__(/*! ./../utils */ 102));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

function encode(val) {
  return encodeURIComponent(val).
  replace(/%40/gi, '@').
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

/**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
function buildURL(url, params) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

/***/ }),

/***/ 102:
/*!*****************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/plugins/luch-request/luch-request/utils.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// utils is a library of generic helper functions non-specific to axios
Object.defineProperty(exports, "__esModule", { value: true });exports.isArray = isArray;exports.isObject = isObject;exports.isDate = isDate;exports.isURLSearchParams = isURLSearchParams;exports.forEach = forEach;exports.isBoolean = isBoolean;exports.isPlainObject = isPlainObject;exports.deepMerge = deepMerge;exports.isUndefined = isUndefined;
var toString = Object.prototype.toString;

/**
                                           * Determine if a value is an Array
                                           *
                                           * @param {Object} val The value to test
                                           * @returns {boolean} True if value is an Array, otherwise false
                                           */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}


/**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}


/**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
   * 是否为boolean 值
   * @param val
   * @returns {boolean}
   */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/**
   * 是否为真正的对象{} new Object
   * @param {any} obj - 检测的对象
   * @returns {boolean}
   */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}



/**
   * Function equal to merge with the difference being that no reference
   * to original objects is kept.
   *
   * @see merge
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
function deepMerge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

function isUndefined(val) {
  return typeof val === 'undefined';
}

/***/ }),

/***/ 103:
/*!******************************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/plugins/luch-request/luch-request/core/buildFullPath.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildFullPath;

var _isAbsoluteURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/isAbsoluteURL */ 104));
var _combineURLs = _interopRequireDefault(__webpack_require__(/*! ../helpers/combineURLs */ 105));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                            * Creates a new URL by combining the baseURL with the requestedURL,
                                                                                                                                                                            * only when the requestedURL is not already an absolute URL.
                                                                                                                                                                            * If the requestURL is absolute, this function returns the requestedURL untouched.
                                                                                                                                                                            *
                                                                                                                                                                            * @param {string} baseURL The base URL
                                                                                                                                                                            * @param {string} requestedURL Absolute or relative URL to combine
                                                                                                                                                                            * @returns {string} The combined full path
                                                                                                                                                                            */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}

/***/ }),

/***/ 104:
/*!*********************************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/plugins/luch-request/luch-request/helpers/isAbsoluteURL.js ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Determines whether the specified URL is absolute
               *
               * @param {string} url The URL to test
               * @returns {boolean} True if the specified URL is absolute, otherwise false
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/***/ }),

/***/ 105:
/*!*******************************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/plugins/luch-request/luch-request/helpers/combineURLs.js ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Creates a new URL by combining the specified URLs
               *
               * @param {string} baseURL The base URL
               * @param {string} relativeURL The relative URL
               * @returns {string} The combined URL
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ?
  baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
  baseURL;
}

/***/ }),

/***/ 106:
/*!***********************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/plugins/luch-request/luch-request/core/settle.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = settle; /**
                                                                                                      * Resolve or reject a Promise based on response status.
                                                                                                      *
                                                                                                      * @param {Function} resolve A function that resolves the promise.
                                                                                                      * @param {Function} reject A function that rejects the promise.
                                                                                                      * @param {object} response The response.
                                                                                                      */
function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  var status = response.statusCode;
  if (status && (!validateStatus || validateStatus(status))) {
    resolve(response);
  } else {
    reject(response);
  }
}

/***/ }),

/***/ 107:
/*!***********************************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/plugins/luch-request/luch-request/core/InterceptorManager.js ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


function InterceptorManager() {
  this.handlers = [];
}

/**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected });

  return this.handlers.length - 1;
};

/**
    * Remove an interceptor from the stack
    *
    * @param {Number} id The ID that was returned by `use`
    */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
    * Iterate over all the registered interceptors
    *
    * This method is particularly useful for skipping over any
    * interceptors that may have become `null` calling `eject`.
    *
    * @param {Function} fn The function to call for each interceptor
    */
InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};var _default =

InterceptorManager;exports.default = _default;

/***/ }),

/***/ 108:
/*!****************************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/plugins/luch-request/luch-request/core/mergeConfig.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 102);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 合并局部配置优先的配置，如果局部有该配置项则用局部，如果全局有该配置项则用全局
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Array} keys - 配置项
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} globalsConfig - 当前的全局配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} config2 - 局部配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @return {{}}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */
var mergeKeys = function mergeKeys(keys, globalsConfig, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    } else if (!(0, _utils.isUndefined)(globalsConfig[prop])) {
      config[prop] = globalsConfig[prop];
    }
  });
  return config;
};
/**
    *
    * @param globalsConfig - 当前实例的全局配置
    * @param config2 - 当前的局部配置
    * @return - 合并后的配置
    */var _default =
function _default(globalsConfig) {var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = config2.method || globalsConfig.method || 'GET';
  var config = {
    baseURL: globalsConfig.baseURL || '',
    method: method,
    url: config2.url || '',
    params: config2.params || {},
    custom: _objectSpread(_objectSpread({}, globalsConfig.custom || {}), config2.custom || {}),
    header: (0, _utils.deepMerge)(globalsConfig.header || {}, config2.header || {}) };

  var defaultToConfig2Keys = ['getTask', 'validateStatus'];
  config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultToConfig2Keys, globalsConfig, config2));

  // eslint-disable-next-line no-empty
  if (method === 'DOWNLOAD') {







  } else if (method === 'UPLOAD') {
    delete config.header['content-type'];
    delete config.header['Content-Type'];
    var uploadKeys = [









    'filePath',
    'name',



    'formData'];

    uploadKeys.forEach(function (prop) {
      if (!(0, _utils.isUndefined)(config2[prop])) {
        config[prop] = config2[prop];
      }
    });





  } else {
    var defaultsKeys = [
    'data',

    'timeout',

    'dataType',

    'responseType'];











    config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultsKeys, globalsConfig, config2));
  }

  return config;
};exports.default = _default;

/***/ }),

/***/ 109:
/*!*************************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/plugins/luch-request/luch-request/core/defaults.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 默认的全局配置
                                                                                                      */var _default =


{
  baseURL: '',
  header: {},
  method: 'GET',
  dataType: 'json',

  responseType: 'text',

  custom: {},

  timeout: 60000,










  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  } };exports.default = _default;

/***/ }),

/***/ 11:
/*!*************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/store/index.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _uniTools = _interopRequireDefault(__webpack_require__(/*! ../utils/uniTools.js */ 12));

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 116));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

_vue.default.use(_vuex.default);

var userInfoInit = {
  id: '',
  username: '',
  role: '',
  token: '' };


var state = {
  userInfo: _objectSpread({}, userInfoInit) };


var getters = {
  getToken: function getToken(state) {
    return state.userInfo.token || _uniTools.default.setStorage('current_login_user_token');
  } };


var actions = {
  setUserInfo: function setUserInfo(_ref, data) {var commit = _ref.commit;
    commit('mutationUserInfo', data);
  } };


var mutations = {
  mutationUserInfo: function mutationUserInfo(state, data) {
    /* 扭转数据状态 */
    state.userInfo = data;
  },
  resetUserInfo: function resetUserInfo(state) {
    state.userInfo = userInfoInit;
  } };var _default =


new _vuex.default.Store({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations,
  modules: {} });exports.default = _default;

/***/ }),

/***/ 110:
/*!*****************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/apis/url.config.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.BASE_URL = void 0; /**
                                                                                                       * 入门demoA: 
                                                                                                       * appId: 'wx0d9525966df3c4b2',
                                                                                                       * appSecrect: 'ef9154c3898612c63b9d9948bcb94d4b'
                                                                                                       */

var BASE_URL =  true ? 'http://localhost:13666' : undefined;exports.BASE_URL = BASE_URL;

/***/ }),

/***/ 111:
/*!***********************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/mixins sync ^.+(?<!index)\.(js|vue)$ ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./common.js": 35,
	"./form.js": 112,
	"./guide.js": 113,
	"./list.js": 114,
	"./user.js": 115
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 111;

/***/ }),

/***/ 112:
/*!*************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/mixins/form.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*********************************************************************
                                                                                                      * 混入-表单方法
                                                                                                      *********************************************************************/var _default =

{
  data: function data() {
    return {};


  },
  computed: {},
  methods: {
    /**
              * @description 表单验证
              */
    submitForm: function submitForm(successCb) {var formName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'form';
      this.$refs[formName].validate().then(function (res) {
        if (typeof successCb === 'function') successCb();
      }).catch(function (err) {
        return false;
      });
    },
    /**
        * @description 部分表单校验
        * @param {String|Array} validateField  - 只校验传入 name 表单域的值
        */
    formValidate: function formValidate(validateField, successCb) {var formName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'form';
      this.$refs[formName].validateField(validateField).then(function (res) {
        if (typeof successCb === 'function') successCb();
      }).catch(function (err) {
        return false;
      });
    },
    /** 
        * @description 移除表单校验结果
        * @param {String|Array} validateField - 为空，默认移除所有
        * @param {Object} formRule - 表单校验规则
        * 移除后，需要调用setTimeout,重新设置校验规则setRules
        */
    clearValidate: function clearValidate(formRule, validateField) {var _this = this;var formName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'form';
      validateField ? this.$refs[formName].clearValidate(validateField) : this.$refs[formName].clearValidate();
      setTimeout(function () {
        _this.$refs[formName].setRules(formRule);
      });
    } } };exports.default = _default;

/***/ }),

/***/ 113:
/*!**************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/mixins/guide.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 36));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} /*********************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * 混入-新手引导页
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         *********************************************************************/var _default =
{
  data: function data() {
    return {
      explainList: [],
      currentStep: 0,
      guideNodeId: 0 };

  },
  computed: {},
  methods: {
    /**
              * @description 根据id，获取节点位置信息
              * @return {Array} [{bottom: 0, height: 0, id: '节点id', left: 0, message: '提示内容', right: 0, tooltipPos: '提示的位置top、left、right、bottom', top: 0, width: 0}]  
              */
    getExplainList: function getExplainList() {var _arguments = arguments,_this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var list, temp, _iterator, _step, item, pos;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:list = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : _this.list;
                temp = [];_iterator = _createForOfIteratorHelper(
                list);_context.prev = 3;_iterator.s();case 5:if ((_step = _iterator.n()).done) {_context.next = 13;break;}item = _step.value;_context.next = 9;return (
                  _this.getDom(item.id, false));case 9:pos = _context.sent;
                if (pos.status === 'success') {
                  temp.push(Object.assign(item, pos.data));
                }case 11:_context.next = 5;break;case 13:_context.next = 18;break;case 15:_context.prev = 15;_context.t0 = _context["catch"](3);_iterator.e(_context.t0);case 18:_context.prev = 18;_iterator.f();return _context.finish(18);case 21:

                _this.explainList = temp;
                console.log(_this.explainList);case 23:case "end":return _context.stop();}}}, _callee, null, [[3, 15, 18, 21]]);}))();
    },
    // 关闭新手引导界面
    closeGuide: function closeGuide() {
      this.guideNodeId = 0;
      this.currentStep = 0;
    },
    // 上一步/下一步
    operatorStepEvt: function operatorStepEvt(type) {
      if (type === 'prev') {
        this.currentStep--;
      } else if (type === 'next') {
        this.currentStep++;
      }
    } } };exports.default = _default;

/***/ }),

/***/ 114:
/*!*************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/mixins/list.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 36));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} /*********************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * 混入-列表方法
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * 上拉加载，需设置requestListParams参数，onLoad生命周期中需要手动调用getList，调用getList方法前需设置请求地址和参数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              * 需在onReachBottom生命周期，调用reachBottomEvt方法
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              *********************************************************************/var _default =

{
  data: function data() {
    return {
      // 分页参数
      pagingData: {
        size: 10, // 每页展示的条数
        current: 1, // 当前页
        total: 0 // 总数
      },
      // 列表数据
      listData: [],
      // 列表接口请求参数
      requestListParams: {
        url: '',
        params: null },

      // 加载更多参数
      loadMoreData: {
        iconSize: 24,
        status: 'more',
        showIcon: true,
        iconType: 'auto',
        color: '#777777',
        contentText: {
          contentdown: "上拉显示更多",
          contentrefresh: "正在加载...",
          contentnomore: "没有更多数据了" },

        otherStatus: '' // 其他状态：当otherStatus有值时，表示接口请求失败otherStatus=error/数据为空otherStatus=empty
      } };

  },
  methods: {
    // 页面滚动到底部的事件--在onReachBottom生命周期调用
    reachBottomEvt: function reachBottomEvt() {
      this.pagingData.current++;
      this.getList();
    },
    // 获取分页参数
    getPageParams: function getPageParams() {
      return {
        pageCurrent: this.pagingData.current,
        pageSize: this.pagingData.size };

    },
    // getList请求前，需判断是否最后一页
    isLoadMore: function isLoadMore() {
      return (this.pagingData.current - 1) * this.pagingData.size >= this.pagingData.total;
    },
    // 获取列表数据--调用getList方法前需设置请求地址(requestListParams.url)和参数(requestListParams.params 对分页参数已做自动添加)
    getList: function getList(callback) {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var result;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!(

                !!_this.listData.length && _this.isLoadMore())) {_context.next = 3;break;}
                _this.loadMoreData.status = 'noMore';return _context.abrupt("return");case 3:


                _this.requestListParams.params = _this.requestListParams.params ? Object.assign(_this.requestListParams.params, _objectSpread({}, _this.getPageParams())) : _objectSpread({}, _this.getPageParams());
                _this.loadMoreData.status = 'loading';_context.next = 7;return (
                  _this.$apis.login[_this.requestListParams.url](_this.requestListParams.params));case 7:result = _context.sent;
                _this.loadMoreData.status = 'more';
                if (result.status === 200) {
                  _this.listData = _this.listData.concat((result.data || { row: [] }).row);
                  _this.pagingData.total = (result.data || { total: [] }).total;

                  // 设置加载更多的状态--防止上拉过快，最后一页“加载更多”的提示语不正确(解决滑到最后一页的时候，没有触发onReachBottom，需要手动下滑在上拉的问题)
                  _this.loadMoreData.status = _this.pagingData.current === Math.ceil(_this.pagingData.total / _this.pagingData.size) ? 'noMore' : 'more';
                  _this.loadMoreData.otherStatus = _this.pagingData.total ? '' : 'empty';
                } else {
                  _this.loadMoreData.otherStatus = 'error';
                  _this.$uniTools.showToast({ title: result.message });
                }
                callback && callback();case 11:case "end":return _context.stop();}}}, _callee);}))();
    },
    // 按条件搜索时调用, type=pullDownRefresh表示下拉刷新操作
    refreshList: function refreshList(type) {var _this2 = this;
      this.pagingData.current = 1;
      this.pagingData.total = 0;
      this.listData = [];
      setTimeout(function () {
        type === 'pullDownRefresh' && _this2.getList(function () {return uni.stopPullDownRefresh();});
        type !== 'pullDownRefresh' && _this2.getList();
      }, 800);
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 115:
/*!*************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/mixins/user.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;



var _vuex = __webpack_require__(/*! vuex */ 116);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =
{
  data: function data() {
    return {};
  },
  computed: _objectSpread(_objectSpread({},
  (0, _vuex.mapState)({
    openid: function openid(state) {return state.userInfo.openid;},
    sessionKey: function sessionKey(state) {return state.userInfo.sessionKey;} })),

  (0, _vuex.mapGetters)({
    token: 'getToken' })),


  methods: {
    // 判断APP版本是否过旧--小程序强制更新
    updateApp: function updateApp(cb) {var _this = this;
      // uni.canIUse: 判断应用的 API，回调，参数，组件等是否在当前版本可用。
      if (uni.canIUse('getUpdateManager')) {
        var updateManager = uni.getUpdateManager();

        // 请求完新版本信息的回调,无新版本，直接进入
        updateManager.onCheckForUpdate(function (res) {
          if (!res.hasUpdate) {
            cb(); // 刷新token，并进行相应的跳转
          }
        });

        var successCb = function successCb(res) {
          // 成功的回调
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
          cb(); // 刷新token，并进行相应的跳转
        };

        // 当新版本下载完成，会进行回调
        updateManager.onUpdateReady(function (uRes) {
          _this.$uniTools.showModel({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？' },
          successCb, function () {return cb();});
        });
      } else {
        cb();
      }
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 116:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 117:
/*!**************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/common/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;



var _tools = __webpack_require__(/*! ../utils/tools.js */ 13);
var Filters = _interopRequireWildcard(__webpack_require__(/*! ./filters.js */ 118));
var Prototypes = _interopRequireWildcard(__webpack_require__(/*! ./prototypes.js */ 119));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;} /*********************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * 过滤器、指令、原型、组件全局注册
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * 最好使用easycom组件规范，即在/components下创建组件（官网解释：easycom打包后会自动剔除没有使用的组件，对组件库的使用尤为友好）
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             *********************************************************************/var _default = { install: function install(Vue) {
    this.registerFilter(Vue);
    this.registerDirective(Vue);
    this.registerPrototype(Vue);
    // this.registerComponents(Vue);
  },

  registerFilter: function registerFilter(Vue) {
    for (var name in Filters) {
      if (Filters.hasOwnProperty(name)) {
        /* 注册过滤器 */
        Vue.filter(name, Filters[name]);
      }
    }
  },

  registerDirective: function registerDirective(Vue) {
    var Directives = (0, _tools.getModules)('directives');
    for (var name in Directives) {
      if (Directives.hasOwnProperty(name)) {
        /* 注册指令 */
        Vue.directive(name.toLowerCase(), Directives[name]);
      }
    }
  },

  registerPrototype: function registerPrototype(Vue) {
    for (var name in Prototypes) {
      if (Prototypes.hasOwnProperty(name)) {
        /* 将方法挂载在原型上 */
        Vue.prototype["$" + name] = Prototypes[name];
      }
    }
  },

  registerComponents: function registerComponents(Vue) {
    var Components = (0, _tools.getModules)('components');
    for (var name in Components) {
      if (Components.hasOwnProperty(name)) {
        // 生成组件名：comp-name格式
        var key = name.replace(/[A-Z]/g, function (_char, index) {
          var res = _char.toLowerCase();
          res = index > 0 ? "-".concat(res) : res;
          return res;
        });

        /* 注册组件 */
        Vue.component(key, Components[name]);
      }
    }
  } };exports.default = _default;

/***/ }),

/***/ 118:
/*!****************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/common/filters.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _tools = _interopRequireDefault(__webpack_require__(/*! @/utils/tools.js */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                    * 日期格式化
                                                                                                                                                                                                                                                                    * @param {string|number} val - 原始值
                                                                                                                                                                                                                                                                    * @param {string} type - 格式YYYY-MM-DD hh:mm:ss
                                                                                                                                                                                                                                                                    * @returns {string} 返回值
                                                                                                                                                                                                                                                                    */
var formatDate = function formatDate(val) {var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD hh:mm:ss';return val ? _tools.default.formatDate(val, type) : '-';};

// 字节大小格式化
var formatByteSize = function formatByteSize(val) {return _tools.default.formatByteSize(val);};

// 数字千分位展示
var numberWithCommas = function numberWithCommas(val) {return _tools.default.numberWithCommas(val);};

// 转换空字符串
var transformNull = function transformNull(value, defaultString) {
  defaultString = defaultString || defaultString === 0 ? defaultString : '-';
  return value || value === 0 ? value : defaultString;
};

// 数组转字符串
var transformArrayToString = function transformArrayToString(val) {var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';var emptyVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';return _tools.default.arrayToString(val, sep, emptyVal);};

// 字符串转数组
var transformStringToArray = function transformStringToArray(value) {var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';return (value || '').split(split);};var _default =

{
  formatDate: formatDate,
  formatByteSize: formatByteSize,
  numberWithCommas: numberWithCommas,
  transformNull: transformNull,
  transformArrayToString: transformArrayToString,
  transformStringToArray: transformStringToArray };exports.default = _default;

/***/ }),

/***/ 119:
/*!*******************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/common/prototypes.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, "tools", { enumerable: true, get: function get() {return _tools.default;} });Object.defineProperty(exports, "uniTools", { enumerable: true, get: function get() {return _uniTools.default;} });Object.defineProperty(exports, "validates", { enumerable: true, get: function get() {return _validates.default;} });exports.apis = void 0;var _tools = _interopRequireWildcard(__webpack_require__(/*! ../utils/tools.js */ 13));




var _uniTools = _interopRequireDefault(__webpack_require__(/*! ../utils/uniTools.js */ 12));

var _validates = _interopRequireDefault(__webpack_require__(/*! ../utils/validates.js */ 120));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;} /* 引入工具方法 */ /* 引入uni-app工具方法 */ /* 引入校验方法 */
/* 引入接口请求公用方法 */
var apis = (0, _tools.getModules)('apis');exports.apis = apis;

/***/ }),

/***/ 12:
/*!****************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/utils/uniTools.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


var _tools = _interopRequireDefault(__webpack_require__(/*! ./tools.js */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /*********************************************************************
                                                                                                                                                          * uni-app原生方法
                                                                                                                                                          *********************************************************************/ /** 
                                                                                                                                                                                                                                  * @description 消息提示框
                                                                                                                                                                                                                                  * @param {Object} obj - showToast配置项
                                                                                                                                                                                                                                  * @param {Function} successCb - showToast调用成功的回调函数
                                                                                                                                                                                                                                  * @param {Function} errorCb - showToast调用失败的回调函数
                                                                                                                                                                                                                                  */
var showToast = function showToast() {var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var successCb = arguments.length > 1 ? arguments[1] : undefined;var errorCb = arguments.length > 2 ? arguments[2] : undefined;
  var title = obj.title || 'title不存在', // 提示的内容，长度与 icon 取值有关。
  icon = obj.icon || 'none', // success: 显示成功图标，此时 title 文本最多显示 7 个汉字长度(默认值)   loading: 显示加载图标，此时 title 文本最多显示 7 个汉字长度。 none: 不显示图标，此时 title 文本在小程序最多可显示两行，App仅支持单行显示。
  image = obj.image || '', // 自定义图标的本地路径
  mask = obj.mask || false, // 是否显示透明蒙层，防止触摸穿透，默认：false
  duration = obj.duration || 1500, // 提示的延迟时间，单位毫秒，默认：1500
  position = obj.position || 'center'; // 值为top、center、bottom;纯文本轻提示显示位置，填写有效值后只有 title 属性生效， 
  uni.showToast({
    title: title,
    icon: icon,
    image: image,
    mask: mask,
    duration: 2000,
    position: position,
    success: function success() {
      typeof successCb === 'function' && successCb();
    },
    fail: function fail(err) {
      console.log('showToast接口异常，请联系管理员!', err);
      typeof errorCb === 'function' && errorCb();
    } });

};

/** 
    * @description 显示 loading 提示框, 需主动调用 uni.hideLoading 才能关闭提示框。
    * @param {Object} obj - showLoading配置项
    * @param {Function} successCb - showLoading调用成功的回调函数
    * @param {Function} errorCb - showLoading调用失败的回调函数
    */
var showLoading = function showLoading() {var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var successCb = arguments.length > 1 ? arguments[1] : undefined;var errorCb = arguments.length > 2 ? arguments[2] : undefined;
  var title = obj.title || '加载中', // 提示的文字内容，显示在loading的下方
  mask = obj.mask || true; // 是否显示透明蒙层，防止触摸穿透
  uni.showLoading({
    title: '加载中',
    mask: mask,
    success: function success() {
      typeof successCb === 'function' && successCb();
    },
    fail: function fail(err) {
      console.log('showLoading接口异常，请联系管理员!', err);
      showToast({ title: 'showLoading接口异常，请联系管理员!' });
      typeof errorCb === 'function' && errorCb();
    } });

};

/** 
    * @description 显示模态弹窗(alert、confirm)--根据端的不同，确认和取消按钮存在位置差异
    * @param {Object} obj - showModal配置项
    * @param {Function} successCb - showModal调用成功的回调函数(“确定”按钮 返回 “确定”, “取消”按钮 返回 “取消”)
    * @param {Function} errorCb - showModal调用失败的回调函数
    */
var showModal = function showModal() {var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var successCb = arguments.length > 1 ? arguments[1] : undefined;var errorCb = arguments.length > 2 ? arguments[2] : undefined;
  var title = obj.hasOwnProperty('title') ? obj.title : '提示', // 提示的标题
  content = obj.content || '内容', // 提示的内容
  showCancel = obj.hasOwnProperty('showCancel') ? obj.showCancel : true, // 是否显示取消按钮
  cancelText = obj.cancelText || '取消', // 取消按钮的文字，最多 4 个字符
  cancelColor = obj.cancelColor || '#000000', // 取消按钮的文字颜色
  confirmText = obj.confirmText || '确定', // 确定按钮的文字，最多 4 个字符
  confirmColor = obj.confirmColor || '#3CC51F'; // 确定按钮的文字颜色
  uni.showModal({
    title: title,
    content: content,
    showCancel: showCancel,
    cancelText: cancelText,
    cancelColor: cancelColor,
    confirmText: confirmText,
    confirmColor: confirmColor,
    success: function success(res) {
      if (res.confirm) {
        // 用户点击确定
        typeof successCb === 'function' && successCb('确定');
      } else if (res.cancel) {
        // 用户点击取消
        typeof successCb === 'function' && successCb('取消');
      }
    },
    fail: function fail(err) {
      console.log('showModel接口异常，请联系管理员!', err);
      showToast({ title: 'showModal接口异常，请联系管理员!' });
      typeof errorCb === 'function' && errorCb();
    } });

};

/** 
    * @description 从底部向上弹出操作菜单
    * @param {Object} obj - showActionSheet配置项
    * @param {Function} successCb - showActionSheet调用成功的回调函数
    * @param {Function} errorCb - showActionSheet调用失败的回调函数
    */
var showActionSheet = function showActionSheet() {var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var successCb = arguments.length > 1 ? arguments[1] : undefined;var errorCb = arguments.length > 2 ? arguments[2] : undefined;
  var itemList = obj.itemList || [], // 按钮的文字数组Array<String>
  itemColor = obj.itemColor || '#000000', // 按钮的文字颜色
  popover = obj.popover || {}; // 大屏设备弹出原生选择按钮框的指示区域，默认居中显示(仅APP有效)
  uni.showActionSheet({
    itemList: itemList,
    itemColor: itemColor,
    popover: popover,
    success: function success(res) {
      // {Number} res.tapIndex--用户点击的按钮，从上到下的顺序，从0开始
      typeof successCb === 'function' && successCb(res.tapIndex);
    },
    fail: function fail(err) {
      console.log('showActionSheet接口异常，请联系管理员!', err);
      showToast({ title: 'showActionSheet接口异常，请联系管理员!' });
      typeof errorCb === 'function' && errorCb();
    } });

};

/** 
    * @description 路由跳转--在onLoad生命周期中可以获取参数(不能跳转到tabBar)
    * @param {Object} obj - navigateTo配置项
    * @param {Object} events - 页面间通信接口，用于监听被打开页面发送到当前页面的数据。2.8.9+ 开始支持。--跳转后的页面发数据给跳转前的页面
    * @param {Function} successCb - navigateTo调用成功的回调函数
    * @param {Function} errorCb - navigateTo调用失败的回调函数
    */
var navigateTo = function navigateTo() {var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var successCb = arguments.length > 2 ? arguments[2] : undefined;var errorCb = arguments.length > 3 ? arguments[3] : undefined;
  if (!obj.url) {
    showToast({ title: 'url不存在' });
    return;
  }
  var _url = obj.url;
  // 拼接参数: /pages/index/index?a=1&b=2
  if (!!obj.params) {
    var str = '';
    for (var key in obj.params) {
      str += "".concat(key, "=").concat(obj.params[key], "&");
    }
    _url = "".concat(_url, "?").concat(str.slice(0, str.length - 1));
  }
  var url = _url, // 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数
  animationType = obj.animationType || 'pop-in', // 窗口显示的动画效果
  animationDuration = obj.animationDuration || 300; // 窗口动画持续时间，单位为 ms
  uni.navigateTo({
    url: url,
    animationType: animationType,
    animationDuration: animationDuration,
    events: events, // 跳转后的页面发数据给跳转前的页面
    success: function success(res) {
      // 跳转成功后,可以获取上一页面通过eventChannel传送到当前页面的数据
      // url有长度限制，数据过长时，在successCb中调用 res.eventChannel.emit('事件名称', 参数) 来发送数据; 下一个页面使用this.getOpenerEventChannel().on监听
      typeof successCb === 'function' && successCb(res);
    },
    fail: function fail(err) {
      console.log('navigateTo接口异常，请联系管理员!', err);
      showToast({ title: 'navigateTo接口异常，请联系管理员!' });
      typeof errorCb === 'function' && errorCb();
    } });

};

/** 
    * @description 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
    * @param {Object} obj - navigateBack配置项
    */
var navigateBack = function navigateBack() {var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var delta = obj.delta || 1, // 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
  animationType = obj.animationType || 'pop-out', // 窗口关闭的动画效果
  animationDuration = obj.animationDuration || 300; // 窗口关闭动画的持续时间，单位为 ms
  uni.navigateBack({
    delta: delta,
    animationType: animationType,
    animationDuration: animationDuration });

};

/** 
    * @description 从本地相册选择图片或使用相机拍照
    * @param {Object} obj - 上传文件配置项
    * @param {Function} successCb - 上传图片成功的回调函数
    * @param {Function} errorCb - 上传图片失败的回调函数
    */
var chooseImage = function chooseImage() {var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var successCb = arguments.length > 1 ? arguments[1] : undefined;var errorCb = arguments.length > 2 ? arguments[2] : undefined;
  var count = obj.count || 1, // 最多可以选择的图片张数
  sizeType = obj.sizeType || ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
  sourceType = obj.sourceType || ['album', 'camera']; // album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
  uni.chooseImage({
    count: count,
    sizeType: sizeType,
    sourceType: sourceType,
    success: function success(res) {
      // 返回的tempFilePaths,可以使用image的src属性,将图片展示出来
      typeof successCb === 'function' && successCb(res);
    },
    fail: function fail(err) {
      console.log('chooseImage接口异常，请联系管理员!', err);
      showToast({ title: 'chooseImage接口异常，请联系管理员!' });
      typeof errorCb === 'function' && errorCb();
    } });

};

/** 
    * @description 保存文件到本地
    * @param {Object} tempFilePath - 需要保存的文件的临时路径
    * @param {Function} successCb - 文件保存成功的回调函数
    * @param {Function} errorCb - 文件保存失败的回调函数
    */
var saveFile = function saveFile(tempFilePath, successCb, errorCb) {
  if (!tempFilePath) showToast({ title: '文件的临时路径不存在' });
  uni.saveFile({
    tempFilePath: tempFilePath,
    success: function success(res) {
      // 返回文件的保存路径
      console.log("savePath:", res.savedFilePath, res);
      typeof successCb === 'function' && successCb(res.savedFilePath);
    },
    error: function error(err) {
      console.log('saveFile接口异常，请联系管理员!', err);
      showToast({ title: 'saveFile接口异常，请联系管理员!' });
      typeof errorCb === 'function' && errorCb();
    } });

};

/** 
    * @description 获取节点基本信息(uni-app不能对节点进行增删改查操作，目前只能获取到位置信息，子组件的节点需要通过refs来调用getDom方法)
    * @param {Object} _this - 组件this
    * @param {Function} className - 选择器：.box，  #box，  .box>a，   .box a，  .box>>>a，.box,a
    * @param {Function} isAll - 是否选择获取所有节点
    * @example let result = await this.$refs.baseHeaderLayout.getDom('#baseContentScrollBox', false);
    */
var getDom = function getDom(_this, className) {var isAll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var query = uni.createSelectorQuery().in(_this);
  return new Promise(function (resolve, reject) {
    var dom = isAll ? query.selectAll(className) : query.select(className);
    dom.boundingClientRect(function (res) {
      if (_tools.default.getDataType(res, Array) && res.length || _tools.default.getDataType(res, Object)) {
        resolve({ status: 'success', data: res });
      } else {
        showToast({ title: "\u672A\u83B7\u53D6\u5230".concat(className, "\u8282\u70B9\u4FE1\u606F") });
        resolve({ status: 'error', message: "\u672A\u83B7\u53D6\u5230".concat(className, "\u8282\u70B9\u4FE1\u606F") });
      }
    }).exec();
  });
};

/** 
    * @description 带过期时间的存储（无法自动删除，需手动调用判断）
    * @param {String} key - 存储key（只传key时，表示判断是否过期）
    * @param {String} value - 存储value
    * @param {Number} seconds - 过期时间（单位秒）
    */
var setStorage = function setStorage(key, value, seconds) {
  if (!key) {
    showToast({ title: 'key不存在!' });
    return;
  }
  // 获取当前时间的秒
  var timestamp = Date.parse(new Date()) / 1000;

  // 判断是否过期
  if (key && !value) {
    var val = uni.getStorageSync(key);
    var tmp = val.split("|");
    if (!tmp[1] || timestamp >= tmp[1]) {
      // 过期操作--删除缓存
      uni.removeStorageSync(key);
      return "";
    } else {
      // 未过期--返回值
      return tmp[0];
    }
  } else if (key && value) {
    // 设置带过期时间的缓存
    var expire = timestamp + seconds;
    uni.setStorageSync(key, "".concat(value, "|").concat(expire));
  }
};

/** 
    * @description 预览图片
    * @param {Object} obj - previewImage配置项
    * @param {Function} successCb - errorCb接口调用成功的回调函数
    * @param {Function} errorCb - errorCb接口调用失败的回调函数
    * @param {Boolean} isCustomizeLong - 是否自定义长按事件(使用plus.nativeUI.previewImage可以实现自定义长按事件，仅限APP)
    */
var previewImage = function previewImage() {var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var successCb = arguments.length > 1 ? arguments[1] : undefined;var errorCb = arguments.length > 2 ? arguments[2] : undefined;var isCustomizeLong = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (!obj.hasOwnProperty('current')) {
    showToast({ title: 'current不存在!' });
    return;
  }
  if (!obj.urls) {
    showToast({ title: 'urls不存在!' });
    return;
  }
  if (obj.urls.constructor !== Array) {
    showToast({ title: 'urls类型为数组!' });
    return;
  }
  var current = obj.current, // current 为当前显示图片的链接/索引值，不填或填写的值无效则为 urls 的第一张
  urls = obj.urls, // 需要预览的图片链接列表
  indicator = obj.indicator || 'none', // 图片指示器样式，可取值："default" - 底部圆点指示器； "number" - 顶部数字指示器； "none" - 不显示指示器。
  loop = obj.loop || false, // 是否可循环预览，默认值为 false
  longPressActions = obj.longPressActions || {}; // 长按图片显示操作菜单
  if (!isCustomizeLong) {
    uni.previewImage({
      current: current,
      urls: urls,
      indicator: indicator,
      loop: loop,
      // longPressActions：长按图片显示操作菜单，如不填默认为保存相册(实践证明，微信小程序不管有没有longPressActions参数，都有长按功能)
      longPressActions: {
        itemList: ['发送给朋友', '保存图片', '收藏'], // 实践证明，itemList参数没啥用，微信小程序有自己的想法，不管你改不改，它都坚定自个儿~
        success: function success(data) {
          console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
        },
        fail: function fail(err) {
          console.log(err.errMsg);
        } },

      success: function success() {
        typeof successCb === 'function' && successCb();
      },
      error: function error(err) {
        console.log('previewImage接口异常:', err);
        showToast({ title: 'previewImage接口异常，请联系管理员!' });
        typeof errorCb === 'function' && errorCb();
      } });

  } else {
    // 小程序及 H5 等平台是没有 HTML5+ 扩展规范的，使用plus会报plus未定义
















  }
};

/** 
    * @description 模拟a标签的锚点链接
    * @param {String} className - css选择器：.box，  #box，  .box>a，   .box a，  .box>>>a，.box,a
    * @param {String|Object} pDom - 父节点css选择器 | 父节点位置信息
    */
var jumpId = function jumpId(className, pDom) {
  uni.createSelectorQuery().select(className).boundingClientRect(function (res) {
    var scrollTop = res.top;
    var flag = true;
    if (typeof pDom === 'object') {
      flag = true;
      scrollTop = res.top - pDom.top;
    } else if (typeof pDom === 'string') {
      flag = false;
      uni.createSelectorQuery().select(pDom).boundingClientRect(function (data) {// 父节点位置信息
        uni.pageScrollTo({
          duration: 100, //过渡时间
          scrollTop: res.top - data.top //到达距离顶部的top值
        });
      }).exec();
    }
    if (flag) {
      uni.pageScrollTo({
        duration: 300, //过渡时间
        scrollTop: scrollTop //到达距离顶部的top值
      });
    }
  }).exec();
};var _default =

{
  showToast: showToast,
  showLoading: showLoading,
  showModal: showModal,
  showActionSheet: showActionSheet,
  navigateTo: navigateTo,
  navigateBack: navigateBack,
  chooseImage: chooseImage,
  saveFile: saveFile,
  getDom: getDom,
  setStorage: setStorage,
  previewImage: previewImage,
  jumpId: jumpId };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 120:
/*!*****************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/utils/validates.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 36));






var _tools = _interopRequireDefault(__webpack_require__(/*! @/utils/tools.js */ 13));
var _login = _interopRequireDefault(__webpack_require__(/*! @/apis/login.js */ 95));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @description 密码验证方法
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @param {Object} rule - 当前校验字段在 rules 中所对应的校验规则
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @param {string} rule.passwordType - 密码类型，一般是中文
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @param {string} [rule.newPassword] - 新密码，一般确认密码才需要这个参数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @param {boolean} rule.required - 表示该密码是否必填
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */
var password = function password(rule, value, data, callback) {
  console.log("密码校验:", rule);
  return new Promise(function (resolve, reject) {
    // 密码不需要验证
    if (!rule.required) resolve();
    var newPassword = data.newPassword;
    var type = rule.passwordType = '密码';
    var ERROR_MSG = {
      EMPTY: "\u8BF7\u8F93\u5165".concat(type),
      ILLEGAL: "".concat(type, "\u4E3A8~20\u4F4D\u5927\u5C0F\u5199\u82F1\u6587\u5B57\u6BCD\u548C\u6570\u5B57\uFF08\u7279\u6B8A\u5B57\u7B26\u53EF\u9009\uFF09\u6DF7\u5408"),
      NOT_REPEAT: '确认密码和新密码不同',
      NOT_SAME: '两次输入密码不同' };

    if (!value) {
      reject(new Error(ERROR_MSG.EMPTY));
    } else if (!_tools.default.isValidPassword(value, false)) {
      reject(new Error(ERROR_MSG.ILLEGAL));
    } else if (type === '确认密码' && value !== newPassword) {
      reject(new Error(ERROR_MSG.NOT_REPEAT));
    } else if (type === '重复密码' && value !== newPassword) {
      reject(new Error(ERROR_MSG.NOT_SAME));
    } else {
      resolve();
    }
  });
};

var userName = function userName(rule, value, data, callback) {
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {var result;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!(
              rule.required && !value)) {_context.next = 4;break;}
              reject(new Error('请输入用户名'));_context.next = 9;break;case 4:if (!(
              value.trim() && !rule.isEdit)) {_context.next = 9;break;}_context.next = 7;return (
                _login.default.systemManage.checkUser(value));case 7:result = _context.sent;
              if (!!result && result.status === 200 && result.data) {
                reject(new Error('该用户名已存在'));
              }case 9:

              resolve();case 10:case "end":return _context.stop();}}}, _callee);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());

};

var phone = function phone(rule, value, data, callback) {
  return new Promise(function (resolve, reject) {
    if (rule.required && !value) {
      reject(new Error('请输入手机号'));
    } else if (value && !_tools.default.isPhone(value)) {
      reject(new Error('手机号格式有误'));
    } else {
      resolve();
    }
  });
};

var ip = function ip(rule, value, data, callback) {
  return new Promise(function (resolve, reject) {
    if (rule.required && !value) {
      reject(new Error('请输入IP'));
    } else if (value && !_tools.default.isIp(value)) {
      reject(new Error('IP格式有误'));
    } else {
      resolve();
    }
  });
};var _default =


{
  password: password,
  userName: userName,
  phone: phone,
  ip: ip };exports.default = _default;

/***/ }),

/***/ 13:
/*!*************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/utils/tools.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.getModules = void 0;


var _uniTools = _interopRequireDefault(__webpack_require__(/*! ./uniTools.js */ 12));var _this = void 0;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * 拿到指定路径下面的模块，减少index.js文件 require.context - dir reg 不能用变量
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * @param {string} name
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * @return {Object}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         */
var getModules = function getModules(name) {
  var modulesFiles;
  if (name === 'directives') modulesFiles = __webpack_require__(14);
  if (name === 'components') modulesFiles = __webpack_require__(15);
  if (name === 'apis') modulesFiles = __webpack_require__(94);
  if (name === 'mixins') modulesFiles = __webpack_require__(111);

  return modulesFiles.keys().reduce(function (modules, modulePath) {
    var moduleName = modulePath.replace(/^\.\/(.+)\.(js|vue)$/, '$1');
    var value = modulesFiles(modulePath);
    value.default && (modules[moduleName] = value.default);
    return modules;
  }, {});
};

/**
    * @description 根据毫秒，获取时分秒
    * @param {Number} time 
    * @return {String} 10:01:01
    * @example this.$util.formatTime(0)
    */exports.getModules = getModules;
var formatTime = function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time;
  }

  var hour = parseInt(time / 3600);
  time = time % 3600;
  var minute = parseInt(time / 60);
  time = time % 60;
  var second = time;

  return [hour, minute, second].map(function (n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }).join(':');
};

/**
    * @description 格式化地理坐标
    * @param {String | Float} longitude 
    * @param {String | Float} latitude
    * @return {Object} {longitude:Array,latitude:array}
    * @example this.$util.formatLocation(20.99,30.00) {longitude:[20,99],latitude:[30,00]}
    */
var formatLocation = function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude);
    latitude = parseFloat(latitude);
  }

  longitude = longitude.toFixed(2);
  latitude = latitude.toFixed(2);

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.') };

};

/**
    * @description 日期处理对象
    */
var dateUtils = {
  // 日期单位
  UNITS: {
    '年': 31557600000, // 365天
    '月': 2629800000, // 30天
    '天': 86400000,
    '小时': 3600000,
    '分钟': 60000,
    '秒': 1000 },


  /**
                  * @description 计算目标时间与当前时间的时间差
                  * @param {String} targetDate - 目标时间 2021-06-18 15:00:00
                  * @param {String} currentDate - 当前时间 2021-06-17 15:00:00（默认当前时间Date.now()）
                  * @param {String} type - 返回类型 值为string / array
                  * @return {String | Array | NULL} '刚刚' / '0年0月2天23小时51分钟3秒前' / '1年1月2天23小时51分钟3秒后' / [1, 1, 2, 23, 51, 3] / null
                  * @example  this.$tools.dateUtils.humanize('2021-06-18 15:00:00')
                  */
  humanize: function humanize(targetDate, currentDate) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'string';
    try {
      currentDate = currentDate || formatDate();

      // ios 系统上时间转换上不支持-，需要替换成/
      currentDate = currentDate.replace(/-/g, '/');
      targetDate = targetDate.replace(/-/g, '/');var

      t_timeStamp = +new Date(targetDate),c_timeStamp = +new Date(currentDate);var _ref =
      [t_timeStamp - c_timeStamp, Math.abs(t_timeStamp - c_timeStamp)],diff_timeStamp = _ref[0],milliseconds = _ref[1];
      var defaultStr = diff_timeStamp > 0 ? '后' : '前';
      var humanize = '';
      for (var key in this.UNITS) {
        humanize += milliseconds >= this.UNITS[key] ? Math.floor(milliseconds / this.UNITS[key]) + key : "0".concat(key);
        if (milliseconds >= this.UNITS[key]) {
          milliseconds = milliseconds - Math.floor(milliseconds / this.UNITS[key]) * this.UNITS[key];
        }
      }
      humanize = type === 'array' ? humanize.match(/\d+/g) : humanize ? humanize + defaultStr : '刚刚';
      return humanize;
    } catch (e) {
      _uniTools.default.showToast({ title: '时间传参错误' });
    }
  },

  /**
      * @description 格式化日期 yyyy-mm-dd HH:MM:ss 转为 yyyy/mm/dd-HH:MM
      * @param {String} dateStr 
      * @return {String} "2019/10/14-10:10"
      * @example  this.$tools.dateUtils.format("2019-10-14 10:10:10")  
      */
  format: function format(dateStr) {
    var date = this.parse(dateStr);
    var diff = Date.now() - date.getTime();
    if (diff < this.UNITS['天']) {
      return this.humanize(diff);
    }
    var _format = function _format(number) {
      return number < 10 ? '0' + number : number;
    };
    return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
    _format(date.getHours()) + ':' + _format(date.getMinutes());
  },

  //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
  parse: function parse(str) {
    var a = str.split(/[^0-9]/);
    return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
  } };


/**
        * formatByteSize. 字节大小格式化
        * @param {(null|string|number)} byteSize - 字节大小
        * @return {string} 格式化后的值  例：2KB
        */
var formatByteSize = function formatByteSize(byteSize) {
  if (byteSize == null || byteSize === '' || !byteSize) {
    return '0B';
  }
  var unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var index = 0;
  var srcSize = parseFloat(byteSize);
  index = Math.floor(Math.log(srcSize) / Math.log(1024));
  var size = srcSize / Math.pow(1024, index);
  size = size.toFixed(2);
  return size + unitArr[index];
};

/**
    * 按指定格式-格式化时间
    * @param {string} fmt - 时间格式化方式
    * @param {boolean} [hasWeek=false] - 是否显示星期
    * @return {string} 格式化后的时间
    * @example
    * new Date().format("YYYY-MM-DD hh:mm:ss")
    */
// eslint-disable-next-line no-extend-native
Date.prototype.format = function (fmt) {var hasWeek = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  var o = {
    'M+': _this.getMonth() + 1,
    'D+': _this.getDate(),
    'h+': _this.getHours(),
    'm+': _this.getMinutes(),
    's+': _this.getSeconds(),
    // 季度
    'q+': Math.floor((_this.getMonth() + 3) / 3),
    // 毫秒
    S: _this.getMilliseconds() };

  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  }

  return fmt + (hasWeek ? '&nbsp;&nbsp;&nbsp;&nbsp;' + weekday[_this.getDay()] : '');
};

/**
    * 日期格式化
    * @param {Date|number|string} val - Date实例或者是时间戳
    * @param {string} [type='YYYY-MM-DD hh:mm:ss'] - 日期格式
    * @param {number} [granularity=1] 分粒度 默认为1，若为10可能显示为 10:10 10:20等
    * @return {string} 格式化后的时间
    */
var formatDate = function formatDate(val) {var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD hh:mm:ss';var granularity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var date = val instanceof Date ? val : new Date(/^[0-9]*$/g.test(val) ? val * 1 : Date.now());
  var YYYY = date.getFullYear() + '';
  var m = date.getMonth() + 1;
  var MM = m > 9 ? m + '' : '0' + m;
  var d = date.getDate();
  var DD = d > 9 ? d + '' : '0' + d;
  var h = date.getHours();
  var hh = h > 9 ? h + '' : '0' + h;
  var $m = Math.ceil(date.getMinutes() / granularity) * granularity;
  var mm = $m > 9 ? $m + '' : '0' + $m;
  var s = date.getSeconds();
  var ss = s > 9 ? s + '' : '0' + s;
  var obj = {
    YYYY: YYYY,
    MM: MM,
    DD: DD,
    hh: hh,
    mm: mm,
    ss: ss };


  return type.replace(/(YYYY)|(MM)|(DD)|(hh)|(mm)|(ss)/g, function (key) {return obj[key];});
};

/**
    * 数组转为字符串的展示
    * @param {Array} arr - 数组
    * @param {string} [sep=','] - 分隔符
    * @param {string} [emptyVal=''] - 数组为空时默认显示
    * @return {string} 转换后的字符串
    */
var arrayToString = function arrayToString(arr) {var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';var emptyVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  if (Array.isArray(arr)) {
    return arr.length === 0 ? emptyVal : arr.join(sep);
  }
  return arr || emptyVal;
};

/**
    * 将对象中指定属性值设为true/false
    * @param {Object} obj - 传入的对象
    * @param {string|string[]} keys - 需要设置的键名数组
    * @param {boolean} val - 需要设置的值（true/false）
    */
var setObjectKeyIsBooleanValue = function setObjectKeyIsBooleanValue(obj, keys, val) {
  if (Array.isArray(keys)) {var _iterator = _createForOfIteratorHelper(
    keys),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var name = _step.value;
        obj[name] = val;
      }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
  } else {
    obj[keys] = val;
  }
};

/**
    * 将对象中的属性值置空 （属性值目前只考虑 字符串、数组、对象）
    * @param {Object} obj - 需要处理的对象
    * @param {Object} opt - 额外的重置默认值
    */
var resetObject = function resetObject(obj) {var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  for (var key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key] = [];
    } else if (typeof obj[key] === 'object') {
      obj[key] = {};
    } else {
      obj[key] = '';
    }
    undefined !== opt[key] && (obj[key] = opt[key]);
  }
};

/**
    * 给对象属性赋值 不改变对象属性数量，赋值源对象就算是空值也会修改目标数据
    * @param {Object} target - 传入目标对象，被赋值对象 target
    * @param {Object} source - 传入源对象，赋值对象，有基础数据 source
    * @param {boolean} [isExtend=false] - 是否需要继承source其它属性
    * @return {Object} 返回赋值后的对象
    */
var setObject = function setObject(target, source) {var isExtend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!target) return false;
  if (isExtend) return Object.assign(target, source);
  for (var key in target) {
    target[key] = source[key] === undefined ? target[key] : source[key];
  }
  return target;
};

/**
    * 判断对象是否为空对象
    * @param {Object} obj - 传入对象
    * @return {boolean} 返回对象是否为空对象
    */
var isEmptyObject = function isEmptyObject(obj) {
  if (obj && typeof obj === 'object') {
    return Object.keys(obj).length === 0;
  }
  return true;
};

/**
    * 拿到对象属性值去掉的两端空格后的值，不改变原对象本身
    * @param {Object} obj - 目标对象
    * @return {Object}
    */
var trimObject = function trimObject(obj) {
  var res = {};
  for (var name in obj) {
    res[name] = obj[name].trim();
  }
  return res;
};

/**
    * 用千分位表示数字 以','隔开
    * @param {number|string} x - 待转换的值
    * @return {string} 返回千分位表示的数字
    */
var numberWithCommas = function numberWithCommas(x) {
  if (x === undefined) {
    return '0';
  }
  if (typeof x !== 'number') x = parseInt(x);
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
    * 取小数
    * @param {number|string} val 目标数据
    * @param {number} [fixedLen=2] - 保留小数长度，默认保留2位
    * @param {boolean} [isCeil=true] - 是否四舍五入
    * @return {string}
    */
var numberFixed = function numberFixed(val) {var fixedLen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;var isCeil = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (isCeil) return parseFloat(val).toFixed(fixedLen);
  var str = val + '';
  var index = str.lastIndexOf('.') + 1;
  // 小数部分的长度
  var fractionalPartLen = str.length - index;
  if (index > 0) str = str.substring(0, index + fixedLen);
  if (fractionalPartLen < fixedLen) {
    str += '0'.repeat(fixedLen - fractionalPartLen);
  }
  return str;
};

/* 获取字符串长度 */
var getStringLength = function getStringLength(str) {
  var num = 0;var _iterator2 = _createForOfIteratorHelper(
  str),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var it = _step2.value;
      num += /^[\u4e00-\u9fa5]+$/.test(it) ? 2 : ['【', '】', '，', '：'].includes(it) ? 2 : 1;
    }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
  return num;
};

/* 获取数据类型 , null 、undefined无constructor*/
var getDataType = function getDataType(data, type) {
  return data ? data.constructor === type : typeof data === type;
};

/**
    * 判断输入的密码格式是否正确（密码为8到20位的大小写字母、数字和特殊字符混合）
    * @param {string} pwd - 待判断密码
    * @param {boolean} [isMustSpecialChar = true] - 是否必须包含特殊字符
    * @return {boolean}
    */
var isValidPassword = function isValidPassword(pwd) {var isMustSpecialChar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var count = 0;
  // 判断密码长度是8-20位
  if (pwd.length >= 8 && pwd.length <= 20) ++count;

  // 判断密码是否包含大写字母
  if (/[A-Z]+/.test(pwd)) ++count;

  // 判断密码是否包含小写字母
  if (/[a-z]+/.test(pwd)) ++count;

  // 判断密码是否包含数字
  if (/[0-9]+/.test(pwd)) ++count;

  if (!isMustSpecialChar) return count === 4;

  // 判断密码是否包含特殊字符
  // eslint-disable-next-line
  if (/[~@#%\+\-=\/\(_\)\*\&\<\>\[\"\;\'\|\$\^\?\!.\{\}\`]+/.test(pwd)) ++count;

  return count === 5;
};

/**
    * 判断输入的电话号码格式是否正确
    * @param {string} phone - 电话号码
    * @return {boolean}
    */
var isPhone = function isPhone(phone) {
  var reg = /^1[3|4|5|8][0-9]\d{8}$/;
  return reg.test(phone);
};

/**
    * @feature 判断输入的邮箱（email）格式是否正确
    * @param {string} 123@qq.com
    * @return {boolean}
    */
var isEmail = function isEmail(str) {
  // eslint-disable-next-line
  // const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  // const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
  var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(str);
};

/**
    * 判断输入的字符串是否全英文
    * @param {string} str - 待判断的字符串
    * @return {boolean}
    */
var isEnglish = function isEnglish(str) {
  return /[\u4e00-\u9fa5]/g.test(str);
};

/* 判断是否是正确的IP格式 192.136.23.6 */
var isIp = function isIp(str) {
  var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return reg.test(str);
};var _default =





{
  formatTime: formatTime,
  formatLocation: formatLocation,
  dateUtils: dateUtils,
  formatByteSize: formatByteSize,
  formatDate: formatDate,
  arrayToString: arrayToString,
  setObjectKeyIsBooleanValue: setObjectKeyIsBooleanValue,
  resetObject: resetObject,
  setObject: setObject,
  isEmptyObject: isEmptyObject,
  trimObject: trimObject,
  numberWithCommas: numberWithCommas,
  numberFixed: numberFixed,
  getStringLength: getStringLength,
  getDataType: getDataType,
  isValidPassword: isValidPassword,
  isPhone: isPhone,
  isEmail: isEmail,
  isEnglish: isEnglish,
  isIp: isIp };exports.default = _default;

/***/ }),

/***/ 14:
/*!****************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/common/directives sync ^.+(?<!index)\.js$ ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 14;

/***/ }),

/***/ 15:
/*!**********************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/common/components sync ^.+(?<!index)\.(js|vue)$ ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./base-count-down.vue": 16,
	"./base-guide.vue": 23,
	"./base-header-layout.vue": 30,
	"./base-image.vue": 41,
	"./base-list.vue": 48,
	"./base-progress.vue": 55,
	"./base-tab.vue": 62,
	"./form/radio-group.vue": 69,
	"./form/radio.vue": 76,
	"./popup/common.js": 81,
	"./popup/dialog.vue": 82,
	"./popup/message.vue": 89
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 15;

/***/ }),

/***/ 151:
/*!*****************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/static/images/home/banner1.jpg ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 152:
/*!*****************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/static/images/home/banner2.jpg ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 153:
/*!*****************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/static/images/home/banner3.jpg ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 154:
/*!*****************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/static/images/home/banner4.jpg ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAEsAhYDASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAAAwABAgQFBgf/xAA9EAACAgEDAgQEBAQEBQUBAQABAgADEQQSIQUxEyJBUQYyYXEUgZGhIzNCUnKxwdEVJGKS4QdTovDxRLL/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAiEQEBAAIDAQEAAwEBAQAAAAAAAQIRAyExEkETIlEyYXH/2gAMAwEAAhEDEQA/APUr7LBYwDSubrB2eH1H84yuwmbRarvdlHm/aE8Z/wC79pTpbBxLI5lRFE8V/wC79ovFf3/aQj4lEqa+uy2okMc/Sc67X1vgu06/bkcyu+hpsOWUSplpvxc3wodJrvx4js3PabQss9G/aQrrCAADAHEJiTbuo5M/u7I22Duf2kltc+v7SDciJRiZ70n8G8R/f9pLxH9/2jASYEudp0Qsf3H6COHc+o/QRYksRgxZ8dx+kA7WDnP7SyFzI2Vycp0cCqucHuOfoJYFj47j9BKoXBlirkScaqzpPe/0/QRb39x+gksf/cRbfqJohHe/uP0EXiP9P0Elt+oi2wCPiP8AT9BIWW2KpxjP1AhdszOs6xtDoXtTBcfLu7RUT1yfxV1i6jUDQadyrBPFvYHsWPb74E4s6vVJlhbYLLflG7sDL+qsN+r1D2NuVDvtb1sc+hmRZeMtexyRwg9zMfptJotRqdWKF06ah9zHzndzHrvvrQ51FhI/6pWJ/DoXfm9zk/TMr32+HQTnzNwIHotX1XVeIVS+wH/EZPRX6sWK9motOfTcZTRcHxHwSRwD6y/okd8uVP0ENjQyai5Uyb7FH+Iyrf1HVZwl1uPqxj37lJBPA7mZltzEkDtCBZbXaz0vs/7zB/j9ap82ot/JzKvmMLXU7+krZ6WV6lqjx49v/cYfTajUNcudRaAfdjH0nSNRfytZ+5m1R0K5UBsryPpJtOY1Q1mo1aLtF9mBzu3GUR1HUqMHUWf95m1foXFbIR27TB1FLVMdy85hKLjpY/G6h141Fv8A3GQOs1WMfiLf+4wFVyLw1eR7iFdK3XKtj2HtK2mwJtVqR/8A02/95k6tfqQcHU24/wARgmrxwZELjj0MadNKvXautg6aiwr/AIjNKnqdupUK9rq3vmYVLlD7j295cWvKiys8eojDoqNZrqQD49gtr5Q5zmdz8M61rNPbWthZC25QRypIyQf1nneh1AYCuwYx2M7f4dNi6o2bS6uArt2Ct6H/AE/OTOqL464O/uP0i3v6sP0Ecrz9uIts1ZGLv7/sI29/cfoJPbGxAI739x+kRd/cfpJERtsAjvf3/aMbX9/2k9sjtgETY/v+0Y2P7/tJFY23iARNr+/7SPiv7/tJEDEYrAG8V/cfpGNr+/7RESEAc2v7/tG8V/f9ooxEAfxX9/2jeK/9x/SRjQA1Vz7jz+0UhV8x+0UADf8AzWlcyxf/ADWgDM2gWdpzLlZyoMqMIWh8jbHCq1JCMslLQUfEYSYEAcLHIjxYivgR25MkFklWFCzNSKQgGYgsmBiaSJILJBY8kBGEcekZlMKFzJbBiBxSarBjpwRLTV5ECU2mZ67XLtMcyYWNWuYTbLiKhti2yeI+IyC2znPi0tXoVCrnzbmB9QOAJ1E5L431dem6YFbJtvsCIo9cckyM/FY+vM9XmvTLpwx8R2LOfc//AJKlaBj4zc11jai+hMuXB7EucY58oPsPUypefKKk+RRtH395hG+lFybtSPdjKl7C3UHJ/hp+8vEDT1N/7j8f4RM/HiPsT3xKhaG09J1Nu9vkHYf6TffGh03hKQLH5c+w9hKem2aZAxAwnP5yrdfZqrS3JZuABDKqkV9bb4h2Jwg/cwFemLnLcCbD9JOkrRtSf4z/ACp6gfWa/ROgtqm8Q1kIAcH7esj60uYbYWl6NZb5vDIX3InTdJ6BtO5q1P1M6Lp/SPxtSWhNmkrOEX/3D6k/SXrKBQNqrtA4AiuVVqTxTp0VdNeABx6YitTy8YH0jWajb6wfjblxEajqNOrZPr9pi67pS3VMyjzTonAOYNRWEO4gQ3o9SvPb+n3U2EJgMPeDUM4wVCuO4951/UaUuDBFBPoZgXabYpR+SfWVjntnlhpnKdxIYdo5pHoeInDK5U9/f3ha2HYibSsbAghDA4lmpvC8w5H9QjmrIwBkR9Of4j1EYOOPrC0mjRgso7Bvlb6z0H4Qu8VH0listgAJGOD65B9Zwmg04sr8NsMp9J1/w0TVr6a2sYozhSTxj2ilFnTvMfvFthNnJ57HEfbNoxC2xbYTbFtgA9sjthtsbEACVjFYYrGKwABEbHENtkCsACVkSIYiQKwAREiRCkSJEAFGkyJAiARIjSciRAJU/MYo9XzH7RQCre38RoKEu/mtIcTJqG3aKo4YQoTMG67DAl5DkSWIGhsp3lhZpPEUgIQDAjY4kgMxkdRzJbY4WTUSaCVITbJKJMAQkPaAWSCSYXmTC4MYDCSeyTGI4EZIhTHwZLEcCARxB2JkSxiRIyIqculZODiWNsDaNrZENWdy8SZezpYixJ4ilpQxOA+Oksu6ppkJC1U0ltxH9TN/tPQpw3xlZjVIACdi5z9T6TPkv9V8c/s4LVhd6aZAQg5Y/uZl32bRtQeZzz9B6S/qm7qGw1x8xlW1alViB2ON3vMI6NMnVtsG3uQI+jpKqGb5mkCpsvPqqnJMPqLhRQSD5iOBKLSF1huuFa9szpei6FNBQepahFbadtSn1aYHRtIbbi7jPv8ASdRWtnUdTTpK8hEGFHsPUzPPJvxxLQdLs6tqvEs/mWtn6AepnYtolK19P0iha24c9sgdyfpF0zSmiotQgqTGxN3fA7tNPpmiUGzUWZLWZVc+ij/eROzzuhgtWmpVV2pWowqj0H2mXrLVbJRGI99pnQmitRwgB95UvpDDE1vjHHLtxuq8Rzwhx9FlfwLym4Vt+bTqrdHn24la6oZC47d5G2rnhorbAPEbaPYQi6CvPYn7mbFlQHpAlMHMVps+zp1YrJ2/vOd6lpEL8DE6+w7lKzA19XfiKXR2ON1dZrJyMY9IBGx3ml1JRu7TLHD4M6MbuMM40NOwIwZO+gBksXgjEqVll5E06Suqq2H1Ee2S3pHA22Jx58GdFoGNWtXaR5iGB9iDmczpwavKx3Ke/wB5vaVt1S4y1lZ7fST+m9XGHUN7gH9otsVA/gV577Fz98QmJ0Rz30Pb94tsJiMRGENojbYTEYiADKiR2wuI2BAA7eJEiHKiQZYAArIEQ5AkGWAAIkCIYiQIgAiIMwrCRIgAojHIjQCVXzGKPX8xigFa9cWsYHEtXD+I0AV5mdi5UgAQMSFy+XMIpOI1g8hgAqGIbEvrKFQ88vIYY0UUSagSKiEUTRCQXEmg5jqJMLEEgJNViUSYEYLEcCOJICARxJASWIsQBsR4sRxAGjHgSWcQbsMd4qALjmRocjiRc8yAcKe8zX60QcrFA02BgOYbI95pE2IntOI+NAlaK23libHOfyE7gzz749c7x5iFwcfl/wCTI5f+V8f/AE4K1zZfWQu5ieAB2EFrlI8g42/5mX9LQSWuJxgY/M//AIZR17KisT3Y9/Ye0546KyLCtSY9ZXBOouUYzFfZ4j7Vmr0Pp41OoAc7Vz5mx2E0t1BjN1q9PpXT6HPZcZYkfMfadL8P0Cmsu3lvu4J9UWZhQajUAVqopqOFx2P1l9ddVpvKGGZzXeTompHV1strDT18bhgn+1fabdSjYAOw4nK9H11BGTYN57zpaL0ZAFYGVhNeseXvxaIyJVsHMJ+IA9RBFxYSRLtZ4yq9nA+8o2V5ZjLl3cSuwMzrSM9t24ggxbN3bMtlecyJIX0ES9qD0lecTI19Zw2ROitcEY4zMbqKFgeO8cPbhuoLlz7TI/qI/SdFr6ODxzOfvGy3M2wrLODV9hLejbbaPaVaD58fSHq8uoA9DKrJsWodyMvqOR9feaPSbz+ORm9+fylfTJ42m45dDNDpPTn1VyrSxBOSGHoYodes1sr1q69iJPEr6Gt69HSjkllQA57yxidE8c99LEbAj4ijIxWNtkooBArI7YWMRABERiMiTIjY4gAisGwhyINhAAkQREORIMIABhBmGIg2GDABkSBhCIMiASq5YxR6R5jFABWj+I0GRmFt/mmQxJyhyowVj4EPiV9RX/Db7SVQBdQiPyZdr1CtjE5J7dQ2qNVYJbM6bpujaupTYxLH0kS1rZJGpXyJYUcQSrgcQ6jibTbC6SUcQijiMBCARkdRiTEiJIQCQElIgx8wB4o2Y8AeMWxFGxAIk57SBXMLti2wCu1UEdPmXdkWwRaPavVXshwJILH2xltA9pw3xpQ12sr48tVe/jn1/wB53m3AmLqemprOsObBuTwlBH6yOSbisLqvLNV/BoStiVCDe/1M5LqGosvsB7D0E9E+Nehr0/VoKN3g3DIyc89jPPdRUfHxjkcCYa06ZdxTrXzqoXLOcT0Hpugs0nT10tYBssUG445H0nH9M0jt1rR17QxNoGPrPZa+mLpdLtIBsPLt7mTyXbTDr1yt3T/Dp21ZBx6TEs6Tq2bcB+pna3IFYjtKFzqoyWUD3Jmcy001tzGNbohwpz7gyxpfifXaZtpyPfMvXarTh8G5MGBtp0t3IKn/AAmP6Hxf9ael+Lmt8toAPvNzQ9Yqv5D9/ScQNEMnYM/WXNHVbTYGUniTb/hzHXruXsDjOYNnEBp3a3TA+uJQ1msakYBi2UxXXvUcBpXs1CergATl9Vr73sbYTxMnU67Vliu4jPtKxm6V/wDHbnXadLATYDmNqtdonqwzjM4CttXa+PMZq6bp+qsAJ7fUzX5iN0bqVCt56yCD7GcvrdP5s4nXN0rV1puxlR6TL1ujwcFSCY5E27YFYOAfVZZCfxFPuIJF23Op7qcGXdPWWXae47SmdafS7TWQT8vZp1/QUWjqdFmxioY8AduDzOQ0a7WGRlexxO6+Hk8G3St4m7+IyOh5xxkEfSE9TlenaqQ2CpBB9R6yWIyqFAC4A9hJToYGxHxFFAFGMeLEAjFHigEcSJGJOMYAIiRI4hDImABYQbCHYQTQADCDYQzDiDYQAMgwxCN3kWGYAqvmP2ij1DzH7RQAFp/itEBxmJz/ABWjAxA8TKGBEePFo5sCrRVLYXCjJ7nEvIoEGsMnbMcFEUesKsgvaFAjJISUYCSCmASHaSEZVhQMQBgPWPiPHEAYKI+BHigDYEcCKPAFiKKKAKKKKAKKKKAKRKDO71kosQDm/jPQvq+htbUgezTneAO+31H+v5TyHW6IfjAFXKqg/Mnme/ugZCCAQRgjHeeY9c+HTouqCmtSam/lv7AnsfzmHLNdt+Gzeq5noek8Pr2gYqMLqFOcT169TsJ45zPONBSqdQrB4em4bh7cz0q/mr7ic+9t+TrTmNcpO4gczl+oaXX3g+HaEHpgZM63WKVLCCo04K8iTGsv4826v0nUafSVXubiM7bHJyAT2/1j9C6bbdqbGeyzwQnz7vWeh26QKGC5CnuO+ZjavSBTkDA/tAwJp9TSfm2+spbW02qFW/dj1E6TpbrYDuAJmGNIttwJXBz6cTpNDphWy4mWTbyNnT6YirIHeYPWavCYZHedlUoXTj7Tneuac2lSO0r462wmd3pyC02XWFKx6ZJPoPeY2o6n0+l2VC+oZTgsvy5+k7dOkDWdOOk8e3TpdYDc9Pzso/pyewmXr/gbplWG0Wp1VPuLVDg/5Yjx1+ryv5GJRrgUW1dMRWR83J/ym907XpYBsVXx3CNyPykqNDXodFXpq/PtByxGNx95WX4fOp1B1L2FHHy+H5T+ZlSS+VFtnsdNUVsQEcg+hEyuoaPfaX2+UH2l7Q6e6lAljs+PVjzL9lGdLYzDspY/kI5Kj9eTuhXX3tjylzNHTUO7FFUnapc49APWBVPF1DHuCTNrRJbRpbLdte3UhtMjE8k4yce+JUpZQOhDWwtQd+CvpPS/hmhR04NtGTYxBx2+n7TiPhro+q1euGmuRjVUx3v6Djgfcz0rpuns02jSmwglOMgYzNMJ+sM70uAYj4iimzI0UeKANFHxGgCjR4oA0aPGMAiRIGEPaQMAGRBsIaDaABaCaGaCYQALD1kD2hW7QRgCq+c/aKPX85+0UAqOD4rcR8QlgHimNiTIZuY3PtJgSQEOzlMoYw9amJBxCqOI0poIVRILCqIBMCTA+kiJMRhNY8YSQgCjiNHgCiijwBRRRQBRRRQBRRRQBRRRQBRRRQBj2nP9f6W2q1Oi1YZimkYlqx/UD/pOgMYgY57RZTcOXV285v6P+C6y9iHKM5P5HtOvB3aSpv8ApxMzrllWn1qJbkFvMHxxjOJfobOir+mQZxa1k7MsvrGVl69NzcSdFX8MZEld5rJbpUbBJqt9Kz6csvAmXqdCSfNjE6IngiZetPlMR4VhNUlR4X85Y0bOLAeSMwGoO5sS90yre+MQ1tp+OloszphkYlLWVq9Z95eNezTjEp2nchE3k6c892q6FFCFT6GG1Ok3oSv7QOns22bc8zQFnHImWWOq0+q5u7RurdzC6aooR3mxeqMDxKgAB4ixmhctxFK8tkyzq12dKvxgbq9uT9RGq5YSHWVe/SVaVAc2NnvjtNt9bY670830lNrl227UHm3Y4Cidd0T4T1XWNTXruqg0aFFC6fTDg7R2+3vnucczc0XRa9Rqg5rUULYPLj5gB/vOpCgYx2Erjw33S5uT8gGl0NGjpWqldqj9/qfcyxHim8mnMUUUUYKKKKAKKKKANFHMaAMYjHxGgDHtImSkW4EAG3EgwhDINAAsIFhDsIJoAFuRBkQpgmgD1DLmKKr5jFAAWfzGjCPZ/NaMIBIQgEgJMRARewhEkBJpGBh2hVEEvaFWAEEmsgJMd4BOOI0cQBCPEIoAo8QigCiiigCiiigCiiigCiiigCiiigCjHtk+keIjIxAOS+NekNr9JpL0DMKL0FyKeWqZhu/TgzXbTppaDTXnYDlQfTPp/wDfeajDj2lTVj9x2meeM1tphld6c/bw2frLNL+USpcfOwkarCq9+04q7JNxplhgzN1jAKcwg1AlbVA28CTarGarGtctaAgySZ0PSdK9abmHJ5lDp2jX8fus7BeBN78RVV5cgS8aef8AkW3I8LHriUHXcCPeFfUoa854xM38bi7avOPpNJmxmNZWq1TaPqVe/gZ5x7TfFm5QQRiYPxCK7dFXemA/igfrLPTtT4uhXJyy8GZ5+tZP6tBnySJXIO6Itg5zFncY4i9LGnzumfqdRdrPiN+n0Lu8JApKnkEjJz7d5q6NB4i57Z7x/hTpLaSvW9QvUjVdQ1L3tu7qmfIv6c/nNsMfr1jnn8tvSacabTV0gltigbj6yzGxHnRJpzW7KKKKMFFFFAFFFFAFFFFAFGjxuIAo0fMaANGYZEeMe0AGe0gYQiQIgAmgmEK0GwgAWHME0K3eCaAPV8xijVfOftFAAWfzmjCPZ/MaMIBMSYkAZPsIAUdpNZQu6hRp+GsGfaA/45QOME/lJ+oqYVuDEKuJz6/EFIPyMYZPiHTnuGH5Q+4fxW8JMd5kV9c0rDliJoafWU34KWA/SH1E3GxajiMDmOJRHEUQigDiKMI8AUUUUAUUaVNb1GjQ0tbcx2r7QC5FMnR9aXXqWqrZF9C+OYc6qzOMgR/NLcXosyh4zt/UYi+08kt9o5jS+l/I94szI/EWreAx8hlmu6zccEfUH0h8nKvxiZX8SwLknkx9/BJJkmr9V6nV0zSeK+WsdhXVWPmsc9lH/wB7ZlPRVXJTY2os8TUWtvsx8qn+1foO0w7dUep/Hd5POm6RUEr+tz9z+Q4/Ob9doWncxAyZz58m78xvjx9brL1CYtaQqqyDmWNYCtv3gVs2jAnNk6cfFaxSlhHpD6dBYcweos3YzJaZwnYyF3wa3TZQ7ThscH2nJazR69debbW1SOvbw2JQztkIsEsIgA7xpmenDjqjqmywvkcc8GU31F+pyviMlec4Q8n7zq+r9Op1gAdfN/eo5EwbOk6nQvll31Hs4/1lYr3ubgStbqQq2nKJyst6JvA1GwkhX4+0HWmPTEkw5Bl3uJlrVdsGFoO5jmUFtNgA9cS9pF59ZOIynTZ6fWGuXPYd5tAADicn1LqF/S9H41ATcOXDjv7AS7Xr0tWvxHai1kDhgfKwPsZ38WH9Xn8uXboMx5hp1LUUMReyOp+Ugd5ZHW9KoXxnFbNwBnJMu42Il204pBHWxQytkGTkmUUUUAUUUaAPGiigCjR4oA0aPEe0Ab2kSTJSLdoBEyBMkZBoANoNsSbZg2gAm7wbwh7yDQBUgbj9oo9PzGKAVbji04kQYrT/ABTGBgExKXU9eNNQQD5zwBC6jUrRWWJnKdQ1j6i0sx4zgCZcmWmvFhuovqGscszdzG8UDuZTNoGYFtQAZy3Ku2YzTTF4z3kheB6zJ8fJji/6w+6PlspqB7zV0erKEFWII7czkTq9p7y7pdcSRjMJnSuEr0vRdRFoVXOGM0hOBo1zBV75nadPsezR1s+ckTrwu44+TD5W48aPNGRRicZJPH3iMxer9Rr236RG8wQB/wA4BZp6707UWtXVqldlODtmgliuMhwfsZ5g3T6zaLdHrfw2oVuFtUlG+5HpN/QXavV7dNaLdNcRkWVMCPuD2I+kcgdda+0bR3M53r7s+nATkBsN9JaqbqjaS+gMn4uvhLrVwLB6HHoZmdM1N76l9B1Gg16jGXV+dw9wexzKx6KzaOi1LaWiwJXvZRlVz6/7SPRev39QvavVJWDnClBg/mId+lWdP1gvTNmjYZOeSh9j9JQ1uhs6bqvxtCkV2YLBey/X8/2iyyExdK1iouSfylO666/iolR9Y/hPctN6HcrLkiGSizOWGSOwEf10Xz2hQjPVssbc3ofaXEwACR5yfMfeCNbI4xgE/tLG3FZJwDjkmR9L0jqbgliJnkkYEIxLMAO2Zl6+4p1HTYBw7YyZol/mA7hST+kzmXarHGfDtFqUdR1t6qLdbrLbQQc+QHCj9p0V4K6EY9szJ+HK2s6LShHaxl/+U1+p2CvT7R9pxT/q12X8gFjjUadXHzAYMpE4l3Q1eLpSB3lO5CGYYwR3Bk3vs51dK9pyO/aVjqvCU5OAPWPa5UypYRYxBxgydNom3xdo9IdjWAv7SLfGa2EBbKkB9cyk+joWwkVrk/8ASJA0opOETH+ES5ppjhhfVsfEztZxqayfbMDf8QXu3mtQD23DmZ9nT9I5JamvP0UCDTpenDhqwRzLx1tpcMJOh269XTZsZLHJ/wDbQnE0KdYt6htjDjswwZKjR1ggsMk/SX7NOvhqiLyfpHlY5bZtDSBnsPHE2tOvhL4jYx6AnufaVtFpPDALEAYySewHqTMfUdXHUerV16dj+GqO1P8ArPq3+0riw+su2PLn0L8Q6hjpaq2bLu+5h9BNTSaot0ugBVcIMEH1nN9csNuu2EjCDaMTQ6fds0gUkz0JdXp59m417KtNrqNm+yojuEbAlbT9PSrWVlTuGeSTkymdTsfKsMy7o7yQHPJ+k03tPjoDr204QIck8YM163FiK4OQROVptN+oDAgqOPznRaSxVHhjsBxM8orGrcUUUzUUUUUAUUURgCijRZgDxj2izFmANGbkR4zdoBD0kCOJM9pAwAbQTQz94FoAFoN+0K/+sE0Aer5z9opGv5z9ooBVt/mGBstWpCWOAI+svSlmZzgTl+p9TbUEqpwkjLP5i8cLkbqHUm1NhVT5B2mW9hOZBnxzAF8sZyXLbsxxkhX24Era2jVUUJcykI3IM0ekaI9V6vXQRmtcO/2nQ/GLVU9M8NVAY4UD2HtHjjubGWerpwlWobZk55lqti4lVK+FGPSX6UwvMuYxFzpxUWmjokVGG7iVlxLFfGI5jEXK10enao7exxOs0HUKWqVN6ggdszzkMR2JENXqrUOQxmuOUjPLHb1FbFIHOYQHM8+0XXrqSAznA95u6f4kVh58H7SvqIuNa3VtenTdBZqW5I4QH1acPRVrNXqmv8Ntlhyz2MFX9T3nSX6/T6y5XsAZU5VG+XPufeNb4OqzvIaaTHaLbGEekVizdbrqk5z5QTOn6bp6aNIK0cuC2/cRjmZ1nTaXIZDyI9Veq05/hqhAjuOvBMnQ1tuwT37EekV+kp1DI9igtWcq3qJkVa64Y3oVA9fSVLfilaNXXTam2uxsC4DIXHoR6SLueq/+OoCgJtPImZTq6L9dqNAw2X1c7HHzp/cvuPQylrbuoa6kHQ6xNHUWwXKbnK+/sPtM7qPRNXqKKr9D1a99dRk12aoDJB9AwAx/lJ2elvWda6X8P3pp9bqDp6LQWoZgdpIPKKR7d5fOueqoWLptVaGGQVrBzkZHYytq+lU/Enwz+B12nNFm3HbLU2D+oe/v9QZn/C1mr6boq+mdRyttdrUKjHvgZBr90I5HtgiSc7aI6haSW/4Z1Cyw9gKguPzYzSRLr0V7q9nlz4O7IU/U+v8AlDKq98flM3qHXdPo/wCGnnf6en3hvQ1ay+u3JV1jplWNtp1KFiDwVzzxOg0wLqWPdiZ531HVNqnfVNZuYNkT0rTjCID7DP34kS720zmo534UAboOnfHdrD/8zC9Q/iI3PaT6HWNN0Smv2ewf/MwF9qtYw9Mzly6bYd3az0oYqHf7yxrtD4yeJWP4g7j+4QeiGFE0O4xDDwZ2/W3FatcMfT6e0ouOZ0/WtD4iNfX/ADAMke85gnIzxJ1pvjdwFz7wD5AyJZIBkCMCGlbZ7+KTkKSISlyG54lyvyNmXanRhgop+4j0N1HRKzMCfym1p6QX3tjgesraehQcqoHMo6vq4svfTUH+Ep2u47s3t9ppx4/TDky1FL4o663n6bpztQgG6wf1/wDT9pn9CH/NVE5AU5xMrqtm7qV3IOCB+k1ui5Smy7HyoefrOrHHWWo5rdxPUWjUax2Pqc5l1bPBpGDMip91uRxzLzW7a8fuZrtlYMrG+5UHGeTNRr0qq2qPMOB9Zk6DPmvPYckwi3NferL75ErGpsdJ01DVy5IxNfS3mxyQTMlLVsSqscMy5OJfoZalwPm9TKQ6Cpw6A+0mZS0VmeM95cmVnbSXZR40QgDxYiigDEYjEyRkTAFFFFAGjGSPaQgETInvJGQPeADaDMI3pBtAAt3kGk27yBgCq+YxRVfM0UA43rWqNmrZQ3AmHY2TLuuJfWWY55lN62HM48rbe3bj1NKtrYUytu5zmHuUkys42ydNG98HamvT9R1Rc+ZqwB+sf4u1tepvqprbJU7mnPaXVHTXO+cZHeBfVeNqGfOczXHzTLknexgMGW1OAJSWwFofxQJWma0rcyzWZmi8SxVdANJWGIQYxKS2QotjIc8RByOxxA+JGFkDWxqLF/rMNT1K2tu+ZQ8TMbIjmVifmOk0vWs4DnmaVWtruHzTjVPrnmHqvsrbIaaTlv6i8f8Ajq3rV8ncTmZWu6aNRU9bAnPb6wFXVLEHm5lhOqI3eV9zL1HxZ4wa9Z1Pp14pssYhf5bnsR7TptD8QixQNV5G/vA7/lIMNLrF2vjPv7SLdKresqG/MR/M/D3XRafqVaJuWzxKz/UOwguq9P0vWPw+pqcDWaZxZU3Ytjup+hHE4/8AB9Q6Xd4lDF0zyAe/3E2tHrvxCrYuK7PVfp9JFxqppu6TVrqdCLKiASCAGPKkcEH7H/KcnrOmax9Rt3KzOwXAPJkG60fh34pZNSyjpnUf4mT2qu7M32PBxOj6hUVA1KDlMMCvOft9Jje2kunNdU6RXoenqpvL3B1LcYA5x/rPQkAUhR6cThdfpdVrar2ZSdy5/wBf9J21dm9K2J5ZQ36iPAs1Clduj2ezv/8A6MxtUCl2PrN3ID6msf0WZ/UZmNrly26cnL1XRw+Lmis4AmkH4nP6S/BAmzU+4Z9JOF0fJD3nKk4nIdW0hosN9I/hsfMvsZ2bLlSPSYWtq8zIRlW4IjyPjrmRaG9cRHtG1WmNFh/t9DBrn0bMTYXEuaSksQSOBH0tIxusGfpiG1Wqq0WktvswKql3tj19JUx2jLLQHWOonQ6UV0/z7fKmPQerflOfqIqKKv3lrrbF7NO3qRnHtxM29vw2isscnxGG1J144/MceWW6yb38XUn3Z501X8DpAA4L8TmNAjW61QOdpnTdRylNNSkgqJeP+pqnpjtsye0bV3lnCqTycCQZ/B07Me54EFpQWc3MCQB5c+8PoabFli0dK2ju52gxaFixHpxiUtfaA+n06j5V3HP1mn0uoMwdwdqDJlSp103UtGlrDZ/iOMAewh9Nd4a5ZvNjMxhe12oLu3bsPpL9GbmYZ9JpN6Zyd9tvpnUg7FS2W9BN2jVV3llU+dfmE87DtRcckqwPcTV6f1RlvNjPljxmc05O+3XnwTW8XbCPKmk11eqQcgN9+8t+uJrLL45b1dUo8aLOIwcyJjk5jQBRZjGMTAJSERMbPEAYyBjkyJgEDmDaTJkDzABHuYNoRjzBtAHq+YxRVfMYoBwepUDU2H6yrYQYXXWf8zZj3lE2czks7dc2axBzK1tG4cSyTmErrDQ6V2wtRobGBKDEpLodQpJnYrSvsJNtPXjlRH9aOzbkF094PaHTTXN7zesrrB4USdK157CH2n4Yg0V5hBp70xxOmqrqx8ohPBpYcqIfZ/Ec4viKOQY4tIm9Zpq8cSnZpUz2h/IP41AWkx97exlsU1qOcRFU7Q/kh/xVVFxB5k0uBMI1IK5AmezeHbj6xzKUsuOxrVnIyIUQGnbKiWAMiNkmvaMTzxFjAkc8ygmljqchjL1HUrK+4yPvKCiSOAscyqbI1P8AiYc+aE2rZ/EowHHM5izqCVWbSRNPpOsNlh2kYMvHO77Rlh/gHxbpF1fQ7L1GGoYWYI9Ox/aaPwT1xupdKfp995a/Tr5N39Sf+IfWVrfQ9Vg8lyGs/c9p5x0bV39I6tXYpIspsKnnuBwQf3kZerx8et+KKGsDuAccAmaHSNV+J0KhiPEqY0sPbHI/YiczrdSNYq31EhXGV57ZljoGqFevspySLlGB/wBS/wDiRj0dm43bmanqAbvXdVg/4lP+xmZq3ALDM0Ne48NLxj+G3Of7TwT+Wc/lMjUNuyDw6kqw+omXNhfY04cpvSt4uywETU0usGACZg3NIV6tqz3nPHVZ/rtUuVlHMz+oL5dy8zIr6sEHJJgL+sM4IVTiVe0Y4aqpq7DY7Ke0DShB+kd7vEbce8nXzHF26aFeAo9SeAJy/VOpHqtn4TTnNJ1tOmB/vIy7/kAoH6w/xJ1hundNKVH/AJm4Fa/+lfVpl9A0rK3TEwSKq7dU2e5ZztXP1wpP5zp4ce3NzVpdXYtraVHtmY/WtQN6VA52DJ+81tU4s17PuG2tZy+vd31SllK+KSV+om2dYYdtXoVO6wPjljzNTqrnxRnuI3Q6QijI7CPrPNcSeYTzYv8A0ytbZmyulfN6y9RWcpXj1xgTO6ePxfU3f+lJr1uReXGAFyc+0lSkz+P1K9+6h9i/YTZZhRpa60JDPy32mV0ypWwT83zt9yZedzdczE4UcD7SoirdbCtQfU+81NGGWg2HgHgZmFQ1mouCoOAcTW/EDy1L2UY/Oayoq9ZpU1dQC+W0difWZhW3T3FHBBHebOicFfTIlyzRV9TpZgwW1eEfHGfYzPl4plOmnDzfP9cvGVpOoWVEc9jOl0PWVcBbMkfvOOu09mluam1Sjqe3+30hKrmVQVYgicuOdxuq6c+OZTceirYrqGU8R8zmek9YBwln2IM6NWV13IcqZ1Y5TJx543Gp5izGEeUgvSRMlInvAGjExz2kSRA0SZBpImDJgDNBscSRg2MAi0CxhCeII+8AnV8xikaz5z9ooB5prLidVbz/AFSuHBkdUx/FW/4jAeKQZ5+3o9Lu6HrswszhZCC8AYhujTTW2EazKd5k/i1U9xCDX14wWELs9CWscxI5EEdQjdo4sU+snsLteoPEs13EzNWxQe8IuoCmPdGmoX8sq3vg8wX4xfeDtvD5IMntcsJ2JHeRU5kGcEcxlb2jnStzSwzYSYuqY+PxNQnIlN9P4lgMqXdK2SLuhJNYz7S349SHBYcStxTpmPricT1XrOor1ZSs4xOhx316IHSwcGMRic58N663VVA2nnM6grGlAcSL8qeZPbI4BcAwDneodNs1FoYFgAc8Td6Bpmq27s8d5pDSoUziT0q+EwCDn2hKVbXVtIlXRL714KIGB+oaeV9foFPXrbF4W4Lco9sjmeg/E+vsp+EkovOx9ZetVa+oRfMT+04v4jQNRoNUec76if3EdLFpdE1W/TCliSo+XmbvTVJp1F64D1MCOfacl0S3a4UgYnR1WeCzqOFs+sWjrq9x1Oi31ZKuuR7n6CctrNW9XVUsau6sWotVu9QELrwu3nJO3vxjiafSNeK9N4RZ91b4I+npiaGqro1ylbUBznDYAIz9fTnELNzRTq7c7d8uRyPeUnPPJl3V1PQrOEJRDtuA/ob+7/Ce8z2dWbgg/UTlywuF07McplNxIcx9ok0GBIOwGSYjPxJG1aamsc4VRkwCtuOPSY3xD1DZSNMp78sRHj3RWH1HUP1brCFzgWOEB/tXM7XT1Jpq7rMENYeMeiDhR+gnO/DnTla86zUJkKMVqfr6zodcxWsVg9+/0nZxS4zbk5cpbpi9Sv8AD0d3YNaTyJz+hpv1OspN9mRSMKPpL/VLzbqFrB8qwvS6f68d4ZXZY9Oj6flKiSO8p9XuGn0r4+Z+AJo0IqV5znHPM5rrGp/E6kjPlWVbrFE7yWuiVCvQXXtgcQ4H/K288kYA+sjX/A6MiY5c4zEuDQoZu5yftIq1jSDwqWOMFuBj2gzYxbaD644i3AVqoByR2jBjQAAuHJ/SOUq0KGWlfDHLdyfaWqnHJHb3mZWAqDnztyTCHUkKETkk44mkRW3VcTtpqOXPBM6XRhaEWoHIQZb6zlunp+HG5ubW9faaq6shdleSx4mkZ1tanp6dd6blvLehPh2gcj/xOPtrt0l703LssQ4YH/Od10y2qnRIj2IG74zzKfX9Bp+oafxKnUamoHY3fI9jMOXjmXjfg5Lj1XIpZtO4ZzmdF0rrWzFb9vrOR8Ta2Ox9j6SxTb5gcznxtwrrywmUemU2pcgdCCDCZ4nEaPqlukYENlfadRoup1axRggMfSdOOcrhy47F08Ros8xGWgxPEGTJEyJx6QCBMiTHJkDAGYwRPEkxgyPrAIMZAyTHn6SDGAPV85+0Uer5j9ooB5XrExq7f8RlR5pa5c6u0j+4yi1WTOLTu2atcrGZCTgSytRAk6qctDR9s59JYRkZmdq6b1HlzxOxSkbMQduhR15USa0xyclptTYFwxOZdW98d5c1HSlTlRKRqKHHtKmUZ5Y38FFrH1hFc+5gAIdCpHeVNVnbYKpPuYVQxkFHMtVYlaLdQCNx7SYQyyMYjCGi+qGEMkqebtCHGJEHBhqD6qdtfi0lROU1vw211zWAHJnXI3MsIFbgiMbc/wBE6c+jO0g4nSKPLz3jqig9o7kAcQKhniQPzCJ3gw3mjJoLcRWBHS0pYpUeY4H5Sqj+cD0lusKFLOcARyFkwfjXX2avqXTlc4FdbEDPbJx/kJU6qDZ8NOSRiq5HH0zwYD4kPjdcb2rrRM/uf85ZZPG+HNfV6moWfmGEDin0k4YZ9J0Tms6Lp2sUqV13OnAPmPGTkemMczm+m12XVMEO1tuFYntmXOn9P1Wnvoa/ULZTpqmq06J2rDNkj9SeZWuh613ss02p3g48QZPM0tP1Q/y7DuBHH3mZqgLKayeMcAQFbkcfofrJJvaq1U6jVZn+Hq6hW/tle2fuJh6/QNp7vH0hL058yeq/7iWbNT43TXz89LK4/wBZIs3lcNt4ziPOfQ48vmhUWeJWD9PWV77RyMy81ZsoZqh/EHp6GcpqtdqlvZPw1hYHHy8CYZcVjox5ZWu+qWmh3JxgTmsHXapr7f5QPA/uljbdrCBqMhR2rHv9YS9DRSA52BmCBsdieBiPDj/Sz5J41+lWo2kRkI2gnt/lA63WfO2f0hL7PwWmr06uGcAKTtxMTWXbkNanJY8ma/WppjrtQObLS2eSZv6GpkVFHMydHQGvGflUZM6jQ07RvHP5x4wrdJ69/wAPpCAfM4wBOZ2b7QD3Jmv1jUeLcFHoJnadd1w4yRC+jFpaxiNNpqlHcky8vRrvAD2XVVbhgeIDx94CrYOraNG5VFzz6malmvIZiGByfeRldVrx4fcVk6PduzXfpXbsCLMf5iQ/4B1HxC5Sp+eNtymE8YMdw4Mkl7eJyTiL+SSrvCBb0bqoAC9Pucn2K4/XMt6boXUKQHs0zNcfquF/eWK9WccFv1kzq7CCdxMqckZ3jpfgOpoONIzE9/Ov+8e0ajQoDarKzDGccD84B9XYOxMevqmqq4W5sex7R/zfhTh/Q06pbU2VYnnvnvNSrrjMoDtg/WVDq6dRzqNJp7D77MH9RzBHTdNZty6eys/9FzY/Q5ilXZP2KOutFmtsdcAMcxqrCPSWG0FTWFgzH7mEGhAHBkXHda3kkh11J24xNDpeqavUKfTPvM8aU9hkyzptPYloJ4jksRuV6BXZvqVge4j5lPp77tOB6j3lomdEvTis1S3YkSYxMGzYgDloMtGZswZeBJEwZMRbMGxxGEu3rIMZEmNmICVHzH7RRU/MYoB5lq3xqrf8Rg0YGLWD/mrf8RgUJzOC7ejF5SuBJqQOZSNjLF+Jx3hujTTW0cQu8Ee0yU1Q95YS9SPmjGlm3BHeZd6Lky81mR3lC/JaSudKzKDAMrp2ltV55hNgIlS2JykvqpTqCOGmhTaG9ZUehSe2JEK1Z4PE0mTK4f42FfiSDTLTVFTyZbr1KsO/Mr62m4WLeY2MyKsCIRRkRo1SBxD1viAbiJWxAl4PHZsiVQ3A5i8THrA0rGA9YINzI2PmRU8QJa05zZmXixKqowMnEo6TvkyxbaFDMMbUQtz6mXE5OQ6m41HUdTarZPisPyHE0+nBrqrKCR/EpK5P2mM65fOeTn7TW6RZi6rnsQDJ/VfgfTal0+nCsSTL4s28eUA+0pP/AAtXdWxHlc4P0kt6seeMesdLW20FF2lBB5HvM1kYW5yQJb0l38LZkHMr6nysOcAx/hS6MLfC1QTBZHG1h9DDpaRQFyW2+Ug9xKd3lUOpzGuueu/xFJ2WYOfY+scu5oeXbW0tgFhBPcS5XpkZLa9TSjVk5DE8zHGrruQCypSf7hwZa/5dz/Os7cAt2+0qWa0Wr6lbo+m0ghKV45yDzMWyrRas/jbH3HS27aaVcHz98sPaaV71ml9OEWsbSXtbkoPf7+wmEng1ptqVVHqwXBf6n6yc+lY6NqHYsz2HJznMzXbczMR37S3cRtODzLfQOi3de6rXo0JSoDfdYBnaokSK3+q2iqwgGAWY8zo6itOkJK4IE6x/groul04ZDerqvztZn9ROP6mxrratGB57zSdM/WJcd9pbAyZLSIfFwBkt7QRzkjv9Za0iYZWY4xJUbU2leouxOPDGBj6Rq+qsqB76KzY3ORwZV1DOtdjqAzuxABMy69Ollm621959Ce0nKSrwyuLpqurVWDmpk/MQ69Q045JIP2nOoi1sFO7H05lhCv8ATn7+GZP8UX/Nk6KrqGnfhXOf8Msi+s8bxOZrNxPlsH5qRLtSMTju3/VxHODZfz39jYYK44YYgsLnG4frBacMp89V2B3KgYl0anSEhLtPtT1Ir3MYXgn+jHm3+BAgcZ/WPvxNOnS/Cly4fUamhz67nGP2xOd68y9M1yV9Kts12lavcXxyrZ7dpFwuK5lMvxpLeRDJqx6mc7R1KxgC9Fin6iXVvZucd4padxjep1datkia+ivo1WUAAaccLys2+jagO+AeZWOV2WWM06rSsa7Ap4HaXC0y67Sw57rLviBlB+k6MfHHlP0QvIE5JkS0jv4lJOTiQJjZjEwBiZAmOWkCYA/aMeZAmNmID0nzGKBqJ3tFAPOtWoOps4/qMAq4MsXsfxVvP9Rg8gmcFejDhRiQsrU+kIO0ZhmI9gChYjQ4GR2hgsNjiPY2pZsU8kyDXDPMtOZTcAntA9pi5IQWIexlQ1Z7ReE47GA9XCRGZciVhvzLdSsRA9dKhXGRiRAYcjImj4S8k9/b1luvpztQLDXjIzzKmNtGWcxZNOodTg5mjTqA3GYNtMucFcGRVRWcD0l6sZ3LCrjMD6xgZWckIXzxK41FoYADIMphdbaeeIsmAW4YAP6mTDqfWBIu3mkg3lEAxy0IvcSiaGnO1RxBanLaTUsCeF4H5yHibFGZHUOBoLQf6h3z9cx9p9YDfOPTEs6JylmZUsyXwDxDVNg4I7GKeqX+qJjUraoG11B/OVq2zwR+80ra11PTq2OCUP5zMFfhtlf1lWFKv6ezwyNv6w2oPiAYAJHtKAbsNxP2h0uZFIA/WKUWCNs2YwQRI+XaVYA1t3A7j6xvEJ8zHvxiQe1MHAP5Ql14Nb9Cz4TYYlkzhXHaGLFgFR9oHJc9lEEl6bRVac1Me3sT6ynrNRsB0qHKD5z7n2+0qSelbfBdVqxZX4FJxQDkg92PuZVNgAOTANyAQckyWQo9z9ZNu1SaTUAnjnPA+89U+D9CnTelfKPGsO53xyfYfYTzTQ1lr0JxjcJ6JpuriqhawBkD3j/Sq/17WhNMaw3LDAnnvUGV7ueBN3qmsN9xbPAHE52xH1V61Vrud2CgemScSqmI6bpOv1qK2m0l1lbchlXjH3ljU9O1PTKHOqqKHGAO89OrRdBoKtMh/h0VhPvgTgfi7W+NYlSnjOZNP1xWuci/Spk7t+4zSuprfa5QZPczF6if+cLlsFeBNPSa5NZUtZO20fvFP/VVMVICMbv1hAm35bH/AFjAspwRmED8YC8wmtjslGO7OfuYUIWYAXPmQzkDy4lnRqnjk9yJW9QpJav1VNTUAXZmJySZFj5+whDYuOT2gVJufbUC7ewnPcrlenVJMZ2IHx9vaS8UD0/eSGg1x+XR2v8A4cGCt02soRrLdDqkRRksajgCP+09TuflEDVt3EfZUe2BKCaymw4WxT+cMGBHBh9DS6lVWRkgibGg0dK4srPI74nMm0p6zb6JrcuU3ZyI5lN6pZS6bhYpZkH6S7TaMbcyg5z6xqrirYzNp05q0y0jukFbI7xTRmkWxIF45kSIA2YxaKMYAiZDPOYj3jQISo4YxRqvmMUA891NbfirMD+oyK0M3vNG4KdTZx/VFhROKYu77V00xAyY7VCWSRtgGaP5hfVV2QAx/SO7D85HdJsipaFZUTADTsTLm+LcMSdK+1cUHEl4OOIUtjucSzpdBqdYCyLsr/vfgfl7ypjam8kih4QALHAAGSSeB9zM63rdIxXpB4zMdof+nP095q/EHwl1DqVajp+rVqwPNRadmW+h9R95pdH+CNLRpKD1Lz218mupsAH6n/aaTiqLzdLGg6bWvT6dRawZ3Jwft/5gNXqWRyqt5R2mn1MHT11CldlNS7Qo7Cc5YWtb1mt6jHf1dmexrG8zZgbcpjOefaW0q2oXfyqJStPi2ZBz7SaqIFiRjuPYxxjHbmJht7/rIb9nlJIkmKpI4/zj7sHvj7SAfByR3kuCflHPrAHFnmDEzVoRLaRYuPtMkrlT7S506zZZs9++ZphrfacvOh9ZWG2lc4HeVdQc6dl9Zec8YI7ylqEzk5IE0uMZzJiWYV+VP5SdTgsO4BMV6hXI/aNp1Ytn09pnpo3dGVZCm4HcO0rX07c49+wkKbdjDbxL1h8VAy4+srGbTfWSfKQdhH3jBznd2ENcG3c5MqFgMkniK46VKMbmAyDAvqiM5aD3BySCce0GwwuAoGe5Jk6G06AdXq6qtu8M3I47evrAOEW+wAZTcdpxjj7TQ+H3qu1SKoUdSquxWlgyjH0OPX1lujotx61q9JqCLHQs5cHIPm7x/Oqe2KAwxjBMJWnmBcACW9VoW02sspVNxrHmxziV2Rs8jiOEs03Cu3co7cATY02oss5bAH7zIooYnhZpUoa0BaOQqLqLfJgH84b4ZoF/WRewymmHiH7+kzNRcTkgZwcTR6Tr00dLgEKznJjpR1+t1oWlyfacHZU/WPiGjTIfnfZn29Sf0mjquqG2plyTxnML8Fac29Vu17qAKkwp+rf+JnTgVn/pVVZcz/8AGXyxzzSP94bS/wDpemmvSz/izttPYUjmdyHzEDn7zTUR915PrtK2k1ttLZBRypgVUHtOs+LumMdYdXUvDrlgPcTkhlWxic2X9cnVhd4jLUCBziWKairMQ3p2gUPEMGPEN09Talbe92pFSbsepE19O1tSBa+B6+WArVFfKgDJ5mmVAryD6SccrjdtM9ZzR06vq9P5QavuVlsdf6jq6LNKEqfxEZGCoxOCMH1nO6jcz++IbpqF9fp0YkK1gVsHHB+s0/ltZ/xSKp+DgMEVaxcdsKQD+ss0dJNDbFssYqcFSOc+37zfqsq1Oor0jWaIVoXVRXqW3ep/MyPQ7bzVhrXFC3EsilwzEgdyGA9OOcw1C+rIzbNG1TslyFSvfI7TT6V0u0MLq6rGTnkLwcfWG6zqdTpNNdm/KWNsUK7uAh5G4sxw2Ja6UardFWVDWqjsAHrAYZ5/vAxz+0Jreituti2q1blXUqR6EYgTuYjaDn7SzrAbNXswyucBgVxgY4Pc8cSGk1G/XBUueof0bVBB2gnnn6TXbAapnHdWAHB4lpEscZVHI7cCVz1KqxAE1F6hvMw2D5v17TR0G2yoZI+bceASPvKiKquGrALIy5z3EbDMcBST7AGWdaAqKoxwcjHrntiFNjLYRuJVbACAfQDBlEzjkHBGDE2QBkEZGR9Yaur+MwtPCAlvyjlUcVI/DGo7T6AwCqAW5HOOTj2iIK4yMZGRn1l7RchQGG7cdw3AYHHpjn1kNYS9THykK+NwcEj6QCrV8xiip5YxQDiriRqbP8UQPEe5R+Ifv3jKoxOOOw1j4WV2aGuQAesBtBbEKIgWMaE2An1l7p3T6dVqVrsLhT/acRSbVtmjzEAD8hzNTSdA1mow1ijTofWzufsJ11HStJoVAor2nHzHlv1hRSvuee/1m2PHGGfLYxaOiaPSKCVN7/3Wdv0lpuF59Owly2lfcyrfWNvczWSRjcrVZbhux+stI24cTPWsGzuZraaldvcxhl9dBPT8A8kiYul0hZfEc8CdR1GhGQq2SMTH6iop0YCcZk1UYmv1AYtWnYTOQkdu0tWVKeecwVihUwJnVwK1icg8iDzuxk/lCOPT6SIUbCfURGdWzxz+cJ68NzB0jd35hVQENAz8kc4/KRFjg7gQTCBBsMiygDgmKehqaazxqPMDkesg4znnI9pqfDaLZo7lcZ8wHMl1LR01XeQEZM6cb0xycprNGbLQ6nH0gfDtrHAAm62nrLc5/WANCE85hcdiZaZQYgAGWadSUGO4HpDWUoMn2MAUAzJ1o97TtvUjPyn2MzrMu3AGIZ1ycZMXhKVySf1jCuVIGYamg3cE8SSVK3BzNGihEQEZzIqmVpdPXo+tV6lQSwySc84xJP1bUt1G7U6W6zT7yQNh9PaXdXQhYtyDtPIP0g9F0rTt0G/Wk2eLVeta88YIk7tOuj6Ro6dR0Yare1llzN4rscnI4/yxMmzpp8YkfKWxzOh6NUtPwrQUJ829j98mZ2o/lVtk5zKIyVV1gggcDtKVznnb6ektnJBJMz9T5WYA8YlYhUdt7bc/pGx58DOR6mWNLQj7mOcwz0rgjmFpKbttqxkgtxO8+HNCdD0WoNzZb/Eb8+04/T6WuzqOnRs7dy8Znpw06IAq5AHAkSbovUV+feTDQngrnuYvCX3M0iFDqNYt0p9duTOC6tpVquLouAe89IspUqQc9pw/WalDtye5mHNO5W/DerGDWwA5hgwPriC2DJhEQY9ZnG9FDeXb6ZzmHR+ACxx95XVB9YVEG6VqFutLS6JLzkpkfUzU0/T9LTdXYtJV0YMCG9ZR0JIAAOBNqpAy8kysZGWVv+iDSXOPFp19iOMnFlaMv+WZzOpXW9Fb8K+xVc796D5x6gN39u07HS1jJGT2mL8XUr4WiPOQ7j9gZeeHW4nDLeWqwLOo6iw2lWWtbUCMiKAu0dgBJ6CxdParmtHwD5XGRKgrAGee8tUVgj1nNL26cpNNsa2y92diAXGCFGBjtiRW1qLlurwGHbIzA6aoEHkwmwdsnGZtK5sp2srrLHUrsqGRjy1gTT0mqZtOoDgrWxXGPUTL09KnHfv/ALQ/w5X4mj1bMzE/jrfX7CaY1FjT8ZxxuyA24Aj1khqbFVlDDDEk8e8fwV9zG8Ffcytsw7LWsILYJAAzj2kbrDYyk4wBjAGBCmpQO5kTSuO5jgQW91QKuAAfQd/vIWXWOpUsdu7dj0zCGlfcxGlQO5jAdHzHMUPVSu49+0UA/9k="

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"ShoppingMall","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"ShoppingMall","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"ShoppingMall","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"ShoppingMall","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 205:
/*!*****************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/plugins/arctext.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /*********************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 绘制弧形文字
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 使用: <view class="swiper-item hfull dinlineb" v-for="(item, i) in listFinallyShow" :key="i">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  					<text class="label dinlineb" v-for="it in item" :key="it.label" :style="it.style">{{it.label}}</text>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  				</view>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   this.arcText = new Arctext({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  			radius: uni.getSystemInfoSync().windowWidth * 2,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  			data: this.dealListShow(),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  			textWidth: uni.getSystemInfoSync().windowWidth <= 320 ? 9 : 12
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  		})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  	this.listFinallyShow = this.arcText.getList();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   *********************************************************************/var

Arctext = /*#__PURE__*/function () {
  /** 
                                     * @params [Object]  options - 配置参数 (defaults的默认参数都可以传进来)
                                     * @params [Array]   options.data - 原始数据   [{label: '展示的文字'}]
                                     * @params [Number]  options.textWidth - 文字的宽度
                                     * @return [{data: {}, label: '', style: ''}]
                                     */
  function Arctext(options) {_classCallCheck(this, Arctext);
    if (!options.data) {
      uni.showToast({ title: 'data参数不存在', icon: 'none' });
      return;
    }
    var defaults = {
      radius: 0, // radius:弯曲度数，最小的值是文字长度，如果设置为-1，则显示直线。
      dir: 1, // dir:默认1 (1：向下弯曲 非1（-1,0,2等）：向上弯曲 )
      rotate: true, // rotate:默认true，为false则不旋转文字
      textWidth: 9, // 文字的宽度
      list: [], // 带平移角度的一维数组
      finallyList: [] // 带平移角度的二维数组
    };
    this.options = Object.assign({}, defaults, options);
    this.dir = this.options.dir;
    this.rotate = this.options.rotate;
    this.radius = this.options.radius;
    this.dtArc = null;
    this.dtWord = null;
    this.render();
  }_createClass(Arctext, [{ key: "render", value: function render()

    {
      if (this.options.data.length) {
        var length = this.options.data.length;
        var dtWord = 0;
        for (var i = 0; i < length; i++) {
          var item = this.options.data[i].label;
          var len = item.length;
          for (var j = 0; j < len; j++) {
            var it = item[j];
            dtWord += this.options.textWidth;
            this.options.list.push({
              label: it,
              data: {
                center: (dtWord - this.options.textWidth) / 2 } });


          }
        }
        var centerWord = dtWord / 2;
        if (this.radius < centerWord) this.radius = centerWord;
        var dtArcBase = dtWord;
        var angle = 2 * Math.asin(dtArcBase / (2 * this.radius)); // Math.asin 返回值-PI/2 到 PI/2
        this.dtArc = this.radius * angle;
        this.dtWord = dtWord;

        this.calcLetters();
        this.rotateWord(this.options.animation);
      }
    }

    // 计算文本平移、旋转的数值
  }, { key: "calcLetters", value: function calcLetters() {var
      radius = this.radius,dtWord = this.dtWord,dtArc = this.dtArc,rotate = this.rotate,dir = this.dir;
      var iteratorX = 0;
      var length = this.options.list.length;
      for (var i = 0; i < length; i++) {
        var item = this.options.list[i];
        var dtArcLetter = this.options.textWidth / dtWord * dtArc,
        beta = dtArcLetter / radius,
        h = radius * Math.cos(beta / 2),
        alpha = Math.acos((dtWord / 2 - iteratorX) / radius),
        theta = alpha + beta / 2,
        x = Math.cos(theta) * h,
        y = Math.sin(theta) * h,
        xpos = iteratorX + Math.abs(dtWord / 2 - x - iteratorX),
        xval = 0 | xpos - item.data.center,
        yval = 0 | radius - y,
        angle = rotate ? 0 | -Math.asin(x / radius) * (180 / Math.PI) : 0; //在角度和弧度之间转换
        iteratorX = 2 * xpos - iteratorX;
        item.data = Object.assign(item.data, {
          x: xval,
          y: dir === 1 ? yval : -yval,
          a: dir === 1 ? angle : -angle });

      }
    } }, { key: "rotateWord", value: function rotateWord(

    animation) {
      // 设置文本的偏移量
      var radius = this.radius;
      var length = this.options.list.length;
      for (var i = 0; i < length; i++) {
        var item = this.options.list[i];
        var transformation = radius === -1 ? 'none' : "translate(".concat(item.data.x, "px, ").concat(item.data.y, "px) rotate(").concat(item.data.a, "deg)"),
        transition = animation ? "all ".concat(animation.speed || 0, "ms ").concat(animation.easing || 'linear') : 'none';
        item.style = "transition: ".concat(transition, "; transform: ").concat(transformation);
      }

      // 处理成二维数组
      var list = [];
      var start = 0,end = 0;
      for (var _i = 0; _i < this.options.data.length; _i++) {
        var _item = this.options.data[_i].label;
        start = end;
        end = start + _item.length;
        list.push(this.options.list.slice(start, end));
      }
      this.options.finallyList = list;
    }

    // 重新设置data
  }, { key: "setData", value: function setData(list) {
      this.options.data = list;
      this.options.list = [];
      this.options.finallyList = [];
    }

    // 获取最终结果
  }, { key: "getList", value: function getList() {
      return this.options.finallyList;
    } }]);return Arctext;}();var _default =


Arctext;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 254:
/*!**************************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 283:
/*!**************************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/uni_modules/uni-popup/components/uni-popup/popup.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  data: function data() {
    return {};


  },
  created: function created() {
    this.popup = this.getParent();
  },
  methods: {
    /**
              * 获取父元素实例
              */
    getParent: function getParent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'uniPopup';
      var parent = this.$parent;
      var parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent) return false;
        parentName = parent.$options.name;
      }
      return parent;
    } } };exports.default = _default;

/***/ }),

/***/ 291:
/*!*****************************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/uni_modules/uni-forms/components/uni-forms/validate.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 36));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}
var pattern = {
  email: /^\S+?@\S+?\.\S+?$/,
  idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", 'i') };


var FORMAT_MAPPING = {
  "int": 'integer',
  "bool": 'boolean',
  "double": 'number',
  "long": 'number',
  "password": 'string'
  // "fileurls": 'array'
};

function formatMessage(args) {var resources = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var defaultMessage = ['label'];
  defaultMessage.forEach(function (item) {
    if (args[item] === undefined) {
      args[item] = '';
    }
  });

  var str = resources;
  for (var key in args) {
    var reg = new RegExp('{' + key + '}');
    str = str.replace(reg, args[key]);
  }
  return str;
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string' && !value) {
    return true;
  }

  if (Array.isArray(value) && !value.length) {
    return true;
  }

  if (type === 'object' && !Object.keys(value).length) {
    return true;
  }

  return false;
}

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  string: function string(value) {
    return typeof value === 'string';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === 'number';
  },
  "boolean": function boolean(value) {
    return typeof value === 'boolean';
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  date: function date(value) {
    return value instanceof Date;
  },
  timestamp: function timestamp(value) {
    if (!this.integer(value) || Math.abs(value).toString().length > 16) {
      return false;
    }
    return true;
  },
  file: function file(value) {
    return typeof value.url === 'string';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  pattern: function pattern(reg, value) {
    try {
      return new RegExp(reg).test(value);
    } catch (e) {
      return false;
    }
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  idcard: function idcard(value) {
    return typeof value === 'string' && !!value.match(pattern.idcard);
  },
  'url-https': function urlHttps(value) {
    return this.url(value) && value.startsWith('https://');
  },
  'url-scheme': function urlScheme(value) {
    return value.startsWith('://');
  },
  'url-web': function urlWeb(value) {
    return false;
  } };var


RuleValidator = /*#__PURE__*/function () {

  function RuleValidator(message) {_classCallCheck(this, RuleValidator);
    this._message = message;
  }_createClass(RuleValidator, [{ key: "validateRule", value: function () {var _validateRule = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(

      fieldKey, fieldValue, value, data, allData) {var result, rules, hasRequired, message, i, rule, vt, now, resultExpr;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                result = null;

                rules = fieldValue.rules;

                hasRequired = rules.findIndex(function (item) {
                  return item.required;
                });if (!(
                hasRequired < 0)) {_context.next = 8;break;}if (!(
                value === null || value === undefined)) {_context.next = 6;break;}return _context.abrupt("return",
                result);case 6:if (!(

                typeof value === 'string' && !value.length)) {_context.next = 8;break;}return _context.abrupt("return",
                result);case 8:



                message = this._message;if (!(

                rules === undefined)) {_context.next = 11;break;}return _context.abrupt("return",
                message['default']);case 11:


                i = 0;case 12:if (!(i < rules.length)) {_context.next = 35;break;}
                rule = rules[i];
                vt = this._getValidateType(rule);

                Object.assign(rule, {
                  label: fieldValue.label || "[\"".concat(fieldKey, "\"]") });if (!


                RuleValidatorHelper[vt]) {_context.next = 20;break;}
                result = RuleValidatorHelper[vt](rule, value, message);if (!(
                result != null)) {_context.next = 20;break;}return _context.abrupt("break", 35);case 20:if (!




                rule.validateExpr) {_context.next = 26;break;}
                now = Date.now();
                resultExpr = rule.validateExpr(value, allData, now);if (!(
                resultExpr === false)) {_context.next = 26;break;}
                result = this._getMessage(rule, rule.errorMessage || this._message['default']);return _context.abrupt("break", 35);case 26:if (!




                rule.validateFunction) {_context.next = 32;break;}_context.next = 29;return (
                  this.validateFunction(rule, value, data, allData, vt));case 29:result = _context.sent;if (!(
                result !== null)) {_context.next = 32;break;}return _context.abrupt("break", 35);case 32:i++;_context.next = 12;break;case 35:





                if (result !== null) {
                  result = message.TAG + result;
                }return _context.abrupt("return",

                result);case 37:case "end":return _context.stop();}}}, _callee, this);}));function validateRule(_x, _x2, _x3, _x4, _x5) {return _validateRule.apply(this, arguments);}return validateRule;}() }, { key: "validateFunction", value: function () {var _validateFunction = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(


      rule, value, data, allData, vt) {var result, callbackMessage, res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                result = null;_context2.prev = 1;

                callbackMessage = null;_context2.next = 5;return (
                  rule.validateFunction(rule, value, allData || data, function (message) {
                    callbackMessage = message;
                  }));case 5:res = _context2.sent;
                if (callbackMessage || typeof res === 'string' && res || res === false) {
                  result = this._getMessage(rule, callbackMessage || res, vt);
                }_context2.next = 12;break;case 9:_context2.prev = 9;_context2.t0 = _context2["catch"](1);

                result = this._getMessage(rule, _context2.t0.message, vt);case 12:return _context2.abrupt("return",

                result);case 13:case "end":return _context2.stop();}}}, _callee2, this, [[1, 9]]);}));function validateFunction(_x6, _x7, _x8, _x9, _x10) {return _validateFunction.apply(this, arguments);}return validateFunction;}() }, { key: "_getMessage", value: function _getMessage(


    rule, message, vt) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message['default']);
    } }, { key: "_getValidateType", value: function _getValidateType(

    rule) {
      // TODO
      var result = '';
      if (rule.required) {
        result = 'required';
      } else if (rule.format) {
        result = 'format';
      } else if (rule.arrayType) {
        result = 'arrayTypeFormat';
      } else if (rule.range) {
        result = 'range';
      } else if (rule.maximum || rule.minimum) {
        result = 'rangeNumber';
      } else if (rule.maxLength || rule.minLength) {
        result = 'rangeLength';
      } else if (rule.pattern) {
        result = 'pattern';
      } else if (rule.validateFunction) {
        result = 'validateFunction';
      }
      return result;
    } }]);return RuleValidator;}();


var RuleValidatorHelper = {
  required: function required(rule, value, message) {
    if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
      return formatMessage(rule, rule.errorMessage || message.required);
    }

    return null;
  },

  range: function range(rule, value, message) {var
    range = rule.range,errorMessage = rule.errorMessage;

    var list = new Array(range.length);
    for (var i = 0; i < range.length; i++) {
      var item = range[i];
      if (types.object(item) && item.value !== undefined) {
        list[i] = item.value;
      } else {
        list[i] = item;
      }
    }

    var result = false;
    if (Array.isArray(value)) {
      result = new Set(value.concat(list)).size === list.length;
    } else {
      if (list.indexOf(value) > -1) {
        result = true;
      }
    }

    if (!result) {
      return formatMessage(rule, errorMessage || message['enum']);
    }

    return null;
  },

  rangeNumber: function rangeNumber(rule, value, message) {
    if (!types.number(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }var

    minimum = rule.minimum,maximum = rule.maximum,exclusiveMinimum = rule.exclusiveMinimum,exclusiveMaximum = rule.exclusiveMaximum;
    var min = exclusiveMinimum ? value <= minimum : value < minimum;
    var max = exclusiveMaximum ? value >= maximum : value > maximum;

    if (minimum !== undefined && min) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMinimum ? 'exclusiveMinimum' : 'minimum']);
    } else if (maximum !== undefined && max) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMaximum ? 'exclusiveMaximum' : 'maximum']);
    } else if (minimum !== undefined && maximum !== undefined && (min || max)) {
      return formatMessage(rule, rule.errorMessage || message['number'].range);
    }

    return null;
  },

  rangeLength: function rangeLength(rule, value, message) {
    if (!types.string(value) && !types.array(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    var min = rule.minLength;
    var max = rule.maxLength;
    var val = value.length;

    if (min !== undefined && val < min) {
      return formatMessage(rule, rule.errorMessage || message['length'].minLength);
    } else if (max !== undefined && val > max) {
      return formatMessage(rule, rule.errorMessage || message['length'].maxLength);
    } else if (min !== undefined && max !== undefined && (val < min || val > max)) {
      return formatMessage(rule, rule.errorMessage || message['length'].range);
    }

    return null;
  },

  pattern: function pattern(rule, value, message) {
    if (!types['pattern'](rule.pattern, value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    return null;
  },

  format: function format(rule, value, message) {
    var customTypes = Object.keys(types);
    var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;

    if (customTypes.indexOf(format) > -1) {
      if (!types[format](value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
    }

    return null;
  },

  arrayTypeFormat: function arrayTypeFormat(rule, value, message) {
    if (!Array.isArray(value)) {
      return formatMessage(rule, rule.errorMessage || message.typeError);
    }

    for (var i = 0; i < value.length; i++) {
      var element = value[i];
      var formatResult = this.format(rule, element, message);
      if (formatResult !== null) {
        return formatResult;
      }
    }

    return null;
  } };var


SchemaValidator = /*#__PURE__*/function (_RuleValidator) {_inherits(SchemaValidator, _RuleValidator);var _super = _createSuper(SchemaValidator);

  function SchemaValidator(schema, options) {var _this;_classCallCheck(this, SchemaValidator);
    _this = _super.call(this, SchemaValidator.message);

    _this._schema = schema;
    _this._options = options || null;return _this;
  }_createClass(SchemaValidator, [{ key: "updateSchema", value: function updateSchema(

    schema) {
      this._schema = schema;
    } }, { key: "validate", value: function () {var _validate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(

      data, allData) {var result;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context3.next = 5;break;}_context3.next = 4;return (
                  this.invokeValidate(data, false, allData));case 4:result = _context3.sent;case 5:return _context3.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context3.stop();}}}, _callee3, this);}));function validate(_x11, _x12) {return _validate.apply(this, arguments);}return validate;}() }, { key: "validateAll", value: function () {var _validateAll = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(


      data, allData) {var result;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context4.next = 5;break;}_context4.next = 4;return (
                  this.invokeValidate(data, true, allData));case 4:result = _context4.sent;case 5:return _context4.abrupt("return",

                result);case 6:case "end":return _context4.stop();}}}, _callee4, this);}));function validateAll(_x13, _x14) {return _validateAll.apply(this, arguments);}return validateAll;}() }, { key: "validateUpdate", value: function () {var _validateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(


      data, allData) {var result;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context5.next = 5;break;}_context5.next = 4;return (
                  this.invokeValidateUpdate(data, false, allData));case 4:result = _context5.sent;case 5:return _context5.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context5.stop();}}}, _callee5, this);}));function validateUpdate(_x15, _x16) {return _validateUpdate.apply(this, arguments);}return validateUpdate;}() }, { key: "invokeValidate", value: function () {var _invokeValidate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(


      data, all, allData) {var result, schema, key, value, errorMessage;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
                result = [];
                schema = this._schema;_context6.t0 = _regenerator.default.keys(
                schema);case 3:if ((_context6.t1 = _context6.t0()).done) {_context6.next = 15;break;}key = _context6.t1.value;
                value = schema[key];_context6.next = 8;return (
                  this.validateRule(key, value, data[key], data, allData));case 8:errorMessage = _context6.sent;if (!(
                errorMessage != null)) {_context6.next = 13;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context6.next = 13;break;}return _context6.abrupt("break", 15);case 13:_context6.next = 3;break;case 15:return _context6.abrupt("return",


                result);case 16:case "end":return _context6.stop();}}}, _callee6, this);}));function invokeValidate(_x17, _x18, _x19) {return _invokeValidate.apply(this, arguments);}return invokeValidate;}() }, { key: "invokeValidateUpdate", value: function () {var _invokeValidateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(


      data, all, allData) {var result, key, errorMessage;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:
                result = [];_context7.t0 = _regenerator.default.keys(
                data);case 2:if ((_context7.t1 = _context7.t0()).done) {_context7.next = 13;break;}key = _context7.t1.value;_context7.next = 6;return (
                  this.validateRule(key, this._schema[key], data[key], data, allData));case 6:errorMessage = _context7.sent;if (!(
                errorMessage != null)) {_context7.next = 11;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context7.next = 11;break;}return _context7.abrupt("break", 13);case 11:_context7.next = 2;break;case 13:return _context7.abrupt("return",


                result);case 14:case "end":return _context7.stop();}}}, _callee7, this);}));function invokeValidateUpdate(_x20, _x21, _x22) {return _invokeValidateUpdate.apply(this, arguments);}return invokeValidateUpdate;}() }, { key: "_checkFieldInSchema", value: function _checkFieldInSchema(


    data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return '';
      }

      var noExistFields = keys.filter(function (key) {return keys2.indexOf(key) < 0;});
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields) },
      SchemaValidator.message.TAG + SchemaValidator.message['defaultInvalid']);
      return [{
        key: 'invalid',
        errorMessage: errorMessage }];

    } }]);return SchemaValidator;}(RuleValidator);


function Message() {
  return {
    TAG: "",
    default: '验证错误',
    defaultInvalid: '提交的字段{field}在数据库中并不存在',
    validateFunction: '验证无效',
    required: '{label}必填',
    'enum': '{label}超出范围',
    timestamp: '{label}格式无效',
    whitespace: '{label}不能为空',
    typeError: '{label}类型无效',
    date: {
      format: '{label}日期{value}格式无效',
      parse: '{label}日期无法解析,{value}无效',
      invalid: '{label}日期{value}无效' },

    length: {
      minLength: '{label}长度不能少于{minLength}',
      maxLength: '{label}长度不能超过{maxLength}',
      range: '{label}必须介于{minLength}和{maxLength}之间' },

    number: {
      minimum: '{label}不能小于{minimum}',
      maximum: '{label}不能大于{maximum}',
      exclusiveMinimum: '{label}不能小于等于{minimum}',
      exclusiveMaximum: '{label}不能大于等于{maximum}',
      range: '{label}必须介于{minimum}and{maximum}之间' },

    pattern: {
      mismatch: '{label}格式不匹配' } };


}


SchemaValidator.message = new Message();var _default =

SchemaValidator;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 334:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni, process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 36));var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 337);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e26) {throw _e26;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e27) {didErr = true;err = _e27;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;function t(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function s(e, t, s) {return e(s = { path: t, exports: {}, require: function require(e, t) {return function () {throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");}(null == t && s.path);} }, s.exports), s.exports;}var n = s(function (e, t) {var s;e.exports = (s = s || function (e, t) {var s = Object.create || function () {function e() {}return function (t) {var s;return e.prototype = t, s = new e(), e.prototype = null, s;};}(),n = {},r = n.lib = {},o = r.Base = { extend: function extend(e) {var t = s(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = r.WordArray = o.extend({ init: function init(e, t) {e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,s = e.words,n = this.sigBytes,r = e.sigBytes;if (this.clamp(), n % 4) for (var o = 0; o < r; o++) {var i = s[o >>> 2] >>> 24 - o % 4 * 8 & 255;t[n + o >>> 2] |= i << 24 - (n + o) % 4 * 8;} else for (o = 0; o < r; o += 4) {t[n + o >>> 2] = s[o >>> 2];}return this.sigBytes += r, this;}, clamp: function clamp() {var t = this.words,s = this.sigBytes;t[s >>> 2] &= 4294967295 << 32 - s % 4 * 8, t.length = e.ceil(s / 4);}, clone: function clone() {var e = o.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var s, n = [], r = function r(t) {t = t;var s = 987654321,n = 4294967295;return function () {var r = ((s = 36969 * (65535 & s) + (s >> 16) & n) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & n) & n;return r /= 4294967296, (r += .5) * (e.random() > .5 ? 1 : -1);};}, o = 0; o < t; o += 4) {var a = r(4294967296 * (s || e.random()));s = 987654071 * a(), n.push(4294967296 * a() | 0);}return new i.init(n, t);} }),a = n.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, s = e.sigBytes, n = [], r = 0; r < s; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16));}return n.join("");}, parse: function parse(e) {for (var t = e.length, s = [], n = 0; n < t; n += 2) {s[n >>> 3] |= parseInt(e.substr(n, 2), 16) << 24 - n % 8 * 4;}return new i.init(s, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, s = e.sigBytes, n = [], r = 0; r < s; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;n.push(String.fromCharCode(o));}return n.join("");}, parse: function parse(e) {for (var t = e.length, s = [], n = 0; n < t; n++) {s[n >>> 2] |= (255 & e.charCodeAt(n)) << 24 - n % 4 * 8;}return new i.init(s, t);} },h = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },l = r.BufferedBlockAlgorithm = o.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var s = this._data,n = s.words,r = s.sigBytes,o = this.blockSize,a = r / (4 * o),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * o,u = e.min(4 * c, r);if (c) {for (var h = 0; h < c; h += o) {this._doProcessBlock(n, h);}var l = n.splice(0, c);s.sigBytes -= u;}return new i.init(l, u);}, clone: function clone() {var e = o.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 }),d = (r.Hasher = l.extend({ cfg: o.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {l.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, s) {return new e.init(s).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, s) {return new d.HMAC.init(e, s).finalize(t);};} }), n.algo = {});return n;}(Math), s);}),r = (s(function (e, t) {var s;e.exports = (s = n, function (e) {var t = s,n = t.lib,r = n.WordArray,o = n.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = o.extend({ _doReset: function _doReset() {this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var s = 0; s < 16; s++) {var n = t + s,r = e[n];e[n] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);}var o = this._hash.words,i = e[t + 0],c = e[t + 1],f = e[t + 2],p = e[t + 3],g = e[t + 4],m = e[t + 5],y = e[t + 6],_ = e[t + 7],v = e[t + 8],w = e[t + 9],S = e[t + 10],k = e[t + 11],T = e[t + 12],P = e[t + 13],A = e[t + 14],I = e[t + 15],E = o[0],O = o[1],U = o[2],b = o[3];E = u(E, O, U, b, i, 7, a[0]), b = u(b, E, O, U, c, 12, a[1]), U = u(U, b, E, O, f, 17, a[2]), O = u(O, U, b, E, p, 22, a[3]), E = u(E, O, U, b, g, 7, a[4]), b = u(b, E, O, U, m, 12, a[5]), U = u(U, b, E, O, y, 17, a[6]), O = u(O, U, b, E, _, 22, a[7]), E = u(E, O, U, b, v, 7, a[8]), b = u(b, E, O, U, w, 12, a[9]), U = u(U, b, E, O, S, 17, a[10]), O = u(O, U, b, E, k, 22, a[11]), E = u(E, O, U, b, T, 7, a[12]), b = u(b, E, O, U, P, 12, a[13]), U = u(U, b, E, O, A, 17, a[14]), E = h(E, O = u(O, U, b, E, I, 22, a[15]), U, b, c, 5, a[16]), b = h(b, E, O, U, y, 9, a[17]), U = h(U, b, E, O, k, 14, a[18]), O = h(O, U, b, E, i, 20, a[19]), E = h(E, O, U, b, m, 5, a[20]), b = h(b, E, O, U, S, 9, a[21]), U = h(U, b, E, O, I, 14, a[22]), O = h(O, U, b, E, g, 20, a[23]), E = h(E, O, U, b, w, 5, a[24]), b = h(b, E, O, U, A, 9, a[25]), U = h(U, b, E, O, p, 14, a[26]), O = h(O, U, b, E, v, 20, a[27]), E = h(E, O, U, b, P, 5, a[28]), b = h(b, E, O, U, f, 9, a[29]), U = h(U, b, E, O, _, 14, a[30]), E = l(E, O = h(O, U, b, E, T, 20, a[31]), U, b, m, 4, a[32]), b = l(b, E, O, U, v, 11, a[33]), U = l(U, b, E, O, k, 16, a[34]), O = l(O, U, b, E, A, 23, a[35]), E = l(E, O, U, b, c, 4, a[36]), b = l(b, E, O, U, g, 11, a[37]), U = l(U, b, E, O, _, 16, a[38]), O = l(O, U, b, E, S, 23, a[39]), E = l(E, O, U, b, P, 4, a[40]), b = l(b, E, O, U, i, 11, a[41]), U = l(U, b, E, O, p, 16, a[42]), O = l(O, U, b, E, y, 23, a[43]), E = l(E, O, U, b, w, 4, a[44]), b = l(b, E, O, U, T, 11, a[45]), U = l(U, b, E, O, I, 16, a[46]), E = d(E, O = l(O, U, b, E, f, 23, a[47]), U, b, i, 6, a[48]), b = d(b, E, O, U, _, 10, a[49]), U = d(U, b, E, O, A, 15, a[50]), O = d(O, U, b, E, m, 21, a[51]), E = d(E, O, U, b, T, 6, a[52]), b = d(b, E, O, U, p, 10, a[53]), U = d(U, b, E, O, S, 15, a[54]), O = d(O, U, b, E, c, 21, a[55]), E = d(E, O, U, b, v, 6, a[56]), b = d(b, E, O, U, I, 10, a[57]), U = d(U, b, E, O, y, 15, a[58]), O = d(O, U, b, E, P, 21, a[59]), E = d(E, O, U, b, g, 6, a[60]), b = d(b, E, O, U, k, 10, a[61]), U = d(U, b, E, O, f, 15, a[62]), O = d(O, U, b, E, w, 21, a[63]), o[0] = o[0] + E | 0, o[1] = o[1] + O | 0, o[2] = o[2] + U | 0, o[3] = o[3] + b | 0;}, _doFinalize: function _doFinalize() {var t = this._data,s = t.words,n = 8 * this._nDataBytes,r = 8 * t.sigBytes;s[r >>> 5] |= 128 << 24 - r % 32;var o = e.floor(n / 4294967296),i = n;s[15 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), s[14 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (s.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var h = c[u];c[u] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8);}return a;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, s, n, r, o, i) {var a = e + (t & s | ~t & n) + r + i;return (a << o | a >>> 32 - o) + t;}function h(e, t, s, n, r, o, i) {var a = e + (t & n | s & ~n) + r + i;return (a << o | a >>> 32 - o) + t;}function l(e, t, s, n, r, o, i) {var a = e + (t ^ s ^ n) + r + i;return (a << o | a >>> 32 - o) + t;}function d(e, t, s, n, r, o, i) {var a = e + (s ^ (t | ~n)) + r + i;return (a << o | a >>> 32 - o) + t;}t.MD5 = o._createHelper(c), t.HmacMD5 = o._createHmacHelper(c);}(Math), s.MD5);}), s(function (e, t) {var s, r, o;e.exports = (r = (s = n).lib.Base, o = s.enc.Utf8, void (s.algo.HMAC = r.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = o.parse(t));var s = e.blockSize,n = 4 * s;t.sigBytes > n && (t = e.finalize(t)), t.clamp();for (var r = this._oKey = t.clone(), i = this._iKey = t.clone(), a = r.words, c = i.words, u = 0; u < s; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}r.sigBytes = i.sigBytes = n, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,s = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(s));} })));}), s(function (e, t) {e.exports = n.HmacMD5;}));function o(e) {return function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}, function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}var i = /*#__PURE__*/function (_Error) {_inherits(i, _Error);var _super = _createSuper(i);function i(e) {var _this;_classCallCheck(this, i);_this = _super.call(this, e.message), _this.errMsg = e.message || "", Object.defineProperties(_assertThisInitialized(_this), { code: { get: function get() {return e.code;} }, requestId: { get: function get() {return e.requestId;} }, message: { get: function get() {return this.errMsg;}, set: function set(e) {this.errMsg = e;} } });return _this;}return i;}( /*#__PURE__*/_wrapNativeSuper(Error));var _e2 = (0, _uniI18n.initVueI18n)({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" } }, "zh-Hans"),a = _e2.t,c = _e2.setLocale,u = _e2.getLocale;var h, l, d;try {h = __webpack_require__(/*! uni-stat-config */ 338).default || __webpack_require__(/*! uni-stat-config */ 338);} catch (e) {h = { appid: "" };}function f() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;var t = "";for (; t.length < e;) {t += Math.random().toString(32).substring(2);}return t.substring(0, e);}function p() {var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),e = _uni$getSystemInfoSyn.deviceId;return { PLATFORM: "mp-weixin", OS: d, APPID: h.appid, LOCALE: u(), DEVICEID: e, CLIENT_SDK_VERSION: "1.0.1" };}function g() {if ("n" === m()) {try {l = plus.runtime.getDCloudId();} catch (e) {l = "";}return l;}return l || (l = f(32), uni.setStorage({ key: "__DC_CLOUD_UUID", data: l })), l;}function m() {var _appPlus$h5$mpWeixi;return (_appPlus$h5$mpWeixi = { "app-plus": "n", h5: "h5", "mp-weixin": "wx" }, _defineProperty(_appPlus$h5$mpWeixi, ["y", "a", "p", "mp-ali"].reverse().join(""), "ali"), _defineProperty(_appPlus$h5$mpWeixi, "mp-baidu", "bd"), _defineProperty(_appPlus$h5$mpWeixi, "mp-toutiao", "tt"), _defineProperty(_appPlus$h5$mpWeixi, "mp-qq", "qq"), _defineProperty(_appPlus$h5$mpWeixi, "quickapp-native", "qn"), _appPlus$h5$mpWeixi)["mp-weixin"];}var y = { sign: function sign(e, t) {var s = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (s = s + "&" + t + "=" + e[t]);}), s = s.slice(1), r(s, t).toString();}, wrappedRequest: function wrappedRequest(e, t) {return new Promise(function (s, n) {t(Object.assign(e, { complete: function complete(e) {e || (e = {}),  false && false;var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return n(new i({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: t }));var r = e.data;if (r.error) return n(new i({ code: r.error.code, message: r.error.message, requestId: t }));r.result = r.data, r.requestId = t, delete r.data, s(r);} }));});} };var _ = { request: function request(e) {return uni.request(e);}, uploadFile: function uploadFile(e) {return uni.uploadFile(e);}, setStorageSync: function setStorageSync(e, t) {return uni.setStorageSync(e, t);}, getStorageSync: function getStorageSync(e) {return uni.getStorageSync(e);}, removeStorageSync: function removeStorageSync(e) {return uni.removeStorageSync(e);}, clearStorageSync: function clearStorageSync() {return uni.clearStorageSync();} };var v = /*#__PURE__*/function () {function v(e) {_classCallCheck(this, v);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(a("uniCloud.init.paramRequired", { param: t }));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = _;}_createClass(v, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestWrapped", value: function requestWrapped(e) {return y.wrappedRequest(e, this.adapter.request);} }, { key: "requestAuth", value: function requestAuth(e) {return this.requestWrapped(e);} }, { key: "request", value: function request(e, t) {var _this2 = this;return Promise.resolve().then(function () {return _this2.hasAccessToken ? t ? _this2.requestWrapped(e) : _this2.requestWrapped(e).catch(function (t) {return new Promise(function (e, s) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? s(t) : e();}).then(function () {return _this2.getAccessToken();}).then(function () {var t = _this2.rebuildRequest(e);return _this2.request(t, !0);});}) : _this2.getAccessToken().then(function () {var t = _this2.rebuildRequest(e);return _this2.request(t, !0);});});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = y.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var s = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),n = { "Content-Type": "application/json" };return "auth" !== t && (s.token = this.accessToken, n["x-basement-token"] = this.accessToken), n["x-serverless-sign"] = y.sign(s, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: s, dataType: "json", header: n };} }, { key: "getAccessToken", value: function getAccessToken() {var _this3 = this;return this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, s) {e.result && e.result.accessToken ? (_this3.setAccessToken(e.result.accessToken), t(_this3.accessToken)) : s(new i({ code: "AUTH_FAILED", message: "获取accessToken失败" }));});});} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var _this4 = this;var e = _ref.url,t = _ref.formData,s = _ref.name,n = _ref.filePath,r = _ref.fileType,o = _ref.onUploadProgress;return new Promise(function (a, c) {var u = _this4.adapter.uploadFile({ url: e, formData: t, name: s, filePath: n, fileType: r, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? a(e) : c(new i({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {c(new i({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && u && "function" == typeof u.onProgressUpdate && u.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this5 = this;var e = _ref2.filePath,t = _ref2.cloudPath,_ref2$fileType = _ref2.fileType,s = _ref2$fileType === void 0 ? "image" : _ref2$fileType,n = _ref2.onUploadProgress,r = _ref2.config;if (!t) throw new i({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var o = r && r.envType || this.config.envType;var a, c;return this.getOSSUploadOptionsFromPath({ env: o, filename: t }).then(function (t) {var r = t.result;a = r.id, c = "https://" + r.cdnDomain + "/" + r.ossPath;var o = { url: "https://" + r.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: r.accessKeyId, Signature: r.signature, host: r.host, id: a, key: r.ossPath, policy: r.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: s };return _this5.uploadFileToOSS(Object.assign({}, o, { onUploadProgress: n }));}).then(function () {return _this5.reportOSSUpload({ id: a });}).then(function (t) {return new Promise(function (s, n) {t.success ? s({ success: !0, filePath: e, fileID: c }) : n(new i({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref4.fileList;return new Promise(function (t, s) {Array.isArray(e) && 0 !== e.length || s(new i({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t({ fileList: e.map(function (e) {return { fileID: e, tempFileURL: e };}) });});} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return v;}();var w = { init: function init(e) {var t = new v(e);["deleteFile", "getTempFileURL"].forEach(function (e) {t[e] = o(t[e]).bind(t);});var s = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return s;}, t.customAuth = t.auth, t;} },S = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:",k = "undefined" != typeof process && "e2e" === "development" && "pre" === Object({"NODE_ENV":"development","VUE_APP_NAME":"ShoppingMall","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).END_POINT ? "//tcb-pre.tencentcloudapi.com/web" : "//tcb-api.tencentcloudapi.com/web";var T;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(T || (T = {}));var P = function P() {};s(function (e, t) {var s;e.exports = (s = n, function (e) {var t = s,n = t.lib,r = n.WordArray,o = n.Hasher,i = t.algo,a = [],c = [];!function () {function t(t) {for (var s = e.sqrt(t), n = 2; n <= s; n++) {if (!(t % n)) return !1;}return !0;}function s(e) {return 4294967296 * (e - (0 | e)) | 0;}for (var n = 2, r = 0; r < 64;) {t(n) && (r < 8 && (a[r] = s(e.pow(n, .5))), c[r] = s(e.pow(n, 1 / 3)), r++), n++;}}();var u = [],h = i.SHA256 = o.extend({ _doReset: function _doReset() {this._hash = new r.init(a.slice(0));}, _doProcessBlock: function _doProcessBlock(e, t) {for (var s = this._hash.words, n = s[0], r = s[1], o = s[2], i = s[3], a = s[4], h = s[5], l = s[6], d = s[7], f = 0; f < 64; f++) {if (f < 16) u[f] = 0 | e[t + f];else {var p = u[f - 15],g = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3,m = u[f - 2],y = (m << 15 | m >>> 17) ^ (m << 13 | m >>> 19) ^ m >>> 10;u[f] = g + u[f - 7] + y + u[f - 16];}var _ = n & r ^ n & o ^ r & o,v = (n << 30 | n >>> 2) ^ (n << 19 | n >>> 13) ^ (n << 10 | n >>> 22),w = d + ((a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25)) + (a & h ^ ~a & l) + c[f] + u[f];d = l, l = h, h = a, a = i + w | 0, i = o, o = r, r = n, n = w + (v + _) | 0;}s[0] = s[0] + n | 0, s[1] = s[1] + r | 0, s[2] = s[2] + o | 0, s[3] = s[3] + i | 0, s[4] = s[4] + a | 0, s[5] = s[5] + h | 0, s[6] = s[6] + l | 0, s[7] = s[7] + d | 0;}, _doFinalize: function _doFinalize() {var t = this._data,s = t.words,n = 8 * this._nDataBytes,r = 8 * t.sigBytes;return s[r >>> 5] |= 128 << 24 - r % 32, s[14 + (r + 64 >>> 9 << 4)] = e.floor(n / 4294967296), s[15 + (r + 64 >>> 9 << 4)] = n, t.sigBytes = 4 * s.length, this._process(), this._hash;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });t.SHA256 = o._createHelper(h), t.HmacSHA256 = o._createHmacHelper(h);}(Math), s.SHA256);}), s(function (e, t) {e.exports = n.HmacSHA256;}), s(function (e, t) {var s, r, o;e.exports = (r = (s = o = n).lib.WordArray, s.enc.Base64 = { stringify: function stringify(e) {var t = e.words,s = e.sigBytes,n = this._map;e.clamp();for (var r = [], o = 0; o < s; o += 3) {for (var i = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, a = 0; a < 4 && o + .75 * a < s; a++) {r.push(n.charAt(i >>> 6 * (3 - a) & 63));}}var c = n.charAt(64);if (c) for (; r.length % 4;) {r.push(c);}return r.join("");}, parse: function parse(e) {var t = e.length,s = this._map,n = this._reverseMap;if (!n) {n = this._reverseMap = [];for (var o = 0; o < s.length; o++) {n[s.charCodeAt(o)] = o;}}var i = s.charAt(64);if (i) {var a = e.indexOf(i);-1 !== a && (t = a);}return function (e, t, s) {for (var n = [], o = 0, i = 0; i < t; i++) {if (i % 4) {var a = s[e.charCodeAt(i - 1)] << i % 4 * 2,c = s[e.charCodeAt(i)] >>> 6 - i % 4 * 2;n[o >>> 2] |= (a | c) << 24 - o % 4 * 8, o++;}}return r.create(n, o);}(e, t, n);}, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" }, o.enc.Base64);}), s(function (e, t) {e.exports = n.enc.Utf8;});var A = function A() {var e;if (!Promise) {e = function e() {}, e.promise = {};var _t = function _t() {throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');};return Object.defineProperty(e.promise, "then", { get: _t }), Object.defineProperty(e.promise, "catch", { get: _t }), e;}var t = new Promise(function (t, s) {e = function e(_e3, n) {return _e3 ? s(_e3) : t(n);};});return e.promise = t, e;};function I(e) {return void 0 === e;}function E(e) {return "[object Null]" === Object.prototype.toString.call(e);}var O;function U(e) {var t = (s = e, "[object Array]" === Object.prototype.toString.call(s) ? e : [e]);var s;var _iterator = _createForOfIteratorHelper(t),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _e4 = _step.value;var _t2 = _e4.isMatch,_s = _e4.genAdapter,_n = _e4.runtime;if (_t2()) return { adapter: _s(), runtime: _n };}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(O || (O = {}));var b = { adapter: null, runtime: void 0 },D = ["anonymousUuidKey"];var C = /*#__PURE__*/function (_P) {_inherits(C, _P);var _super2 = _createSuper(C);function C() {var _this6;_classCallCheck(this, C);_this6 = _super2.call(this), b.adapter.root.tcbObject || (b.adapter.root.tcbObject = {});return _this6;}_createClass(C, [{ key: "setItem", value: function setItem(e, t) {b.adapter.root.tcbObject[e] = t;} }, { key: "getItem", value: function getItem(e) {return b.adapter.root.tcbObject[e];} }, { key: "removeItem", value: function removeItem(e) {delete b.adapter.root.tcbObject[e];} }, { key: "clear", value: function clear() {delete b.adapter.root.tcbObject;} }]);return C;}(P);function x(e, t) {switch (e) {case "local":return t.localStorage || new C();case "none":return new C();default:return t.sessionStorage || new C();}}var R = /*#__PURE__*/function () {function R(e) {_classCallCheck(this, R);if (!this._storage) {this._persistence = b.adapter.primaryStorage || e.persistence, this._storage = x(this._persistence, b.adapter);var _t3 = "access_token_" + e.env,_s2 = "access_token_expire_" + e.env,_n2 = "refresh_token_" + e.env,_r = "anonymous_uuid_" + e.env,_o = "login_type_" + e.env,_i = "user_info_" + e.env;this.keys = { accessTokenKey: _t3, accessTokenExpireKey: _s2, refreshTokenKey: _n2, anonymousUuidKey: _r, loginTypeKey: _o, userInfoKey: _i };}}_createClass(R, [{ key: "updatePersistence", value: function updatePersistence(e) {if (e === this._persistence) return;var t = "local" === this._persistence;this._persistence = e;var s = x(e, b.adapter);for (var _e5 in this.keys) {var _n3 = this.keys[_e5];if (t && D.includes(_e5)) continue;var _r2 = this._storage.getItem(_n3);I(_r2) || E(_r2) || (s.setItem(_n3, _r2), this._storage.removeItem(_n3));}this._storage = s;} }, { key: "setStore", value: function setStore(e, t, s) {if (!this._storage) return;var n = { version: s || "localCachev1", content: t },r = JSON.stringify(n);try {this._storage.setItem(e, r);} catch (e) {throw e;}} }, { key: "getStore", value: function getStore(e, t) {try {if (!this._storage) return;} catch (e) {return "";}t = t || "localCachev1";var s = this._storage.getItem(e);if (!s) return "";if (s.indexOf(t) >= 0) {return JSON.parse(s).content;}return "";} }, { key: "removeStore", value: function removeStore(e) {this._storage.removeItem(e);} }]);return R;}();var q = {},F = {};function L(e) {return q[e];}var N = function N(e, t) {_classCallCheck(this, N);this.data = t || null, this.name = e;};var M = /*#__PURE__*/function (_N) {_inherits(M, _N);var _super3 = _createSuper(M);function M(e, t) {var _this7;_classCallCheck(this, M);_this7 = _super3.call(this, "error", { error: e, data: t }), _this7.error = e;return _this7;}return M;}(N);var $ = new ( /*#__PURE__*/function () {function _class() {_classCallCheck(this, _class);this._listeners = {};}_createClass(_class, [{ key: "on", value: function on(e, t) {return function (e, t, s) {s[e] = s[e] || [], s[e].push(t);}(e, t, this._listeners), this;} }, { key: "off", value: function off(e, t) {return function (e, t, s) {if (s && s[e]) {var _n4 = s[e].indexOf(t);-1 !== _n4 && s[e].splice(_n4, 1);}}(e, t, this._listeners), this;} }, { key: "fire", value: function fire(e, t) {if (e instanceof M) return console.error(e.error), this;var s = "string" == typeof e ? new N(e, t || {}) : e;var n = s.name;if (this._listens(n)) {s.target = this;var _e6 = this._listeners[n] ? _toConsumableArray(this._listeners[n]) : [];var _iterator2 = _createForOfIteratorHelper(_e6),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _t4 = _step2.value;_t4.call(this, s);}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}return this;} }, { key: "_listens", value: function _listens(e) {return this._listeners[e] && this._listeners[e].length > 0;} }]);return _class;}())();function K(e, t) {$.on(e, t);}function j(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};$.fire(e, t);}function B(e, t) {$.off(e, t);}var H = "loginStateChanged",W = "loginStateExpire",V = "loginTypeChanged",z = "anonymousConverted",J = "refreshAccessToken";var Y;!function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";}(Y || (Y = {}));var X = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],G = { "X-SDK-Version": "1.3.5" };function Q(e, t, s) {var n = e[t];e[t] = function (t) {var r = {},o = {};s.forEach(function (s) {var _s$call = s.call(e, t),n = _s$call.data,i = _s$call.headers;Object.assign(r, n), Object.assign(o, i);});var i = t.data;return i && function () {var e;if (e = i, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, i), r);else for (var _e7 in r) {i.append(_e7, r[_e7]);}}(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), o), n.call(e, t);};}function Z() {var e = Math.random().toString(16).slice(2);return { data: { seqId: e }, headers: _objectSpread(_objectSpread({}, G), {}, { "x-seqid": e }) };}var ee = /*#__PURE__*/function () {function ee() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, ee);var t;this.config = e, this._reqClass = new b.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"), restrictedMethods: ["post"] }), this._cache = L(this.config.env), this._localCache = (t = this.config.env, F[t]), Q(this._reqClass, "post", [Z]), Q(this._reqClass, "upload", [Z]), Q(this._reqClass, "download", [Z]);}_createClass(ee, [{ key: "post", value: function () {var _post = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this._reqClass.post(e);case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));function post(_x) {return _post.apply(this, arguments);}return post;}() }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this._reqClass.upload(e);case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function upload(_x2) {return _upload.apply(this, arguments);}return upload;}() }, { key: "download", value: function () {var _download = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this._reqClass.download(e);case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function download(_x3) {return _download.apply(this, arguments);}return download;}() }, { key: "refreshAccessToken", value: function () {var _refreshAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var e, t;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());_context4.prev = 1;_context4.next = 4;return this._refreshAccessTokenPromise;case 4:e = _context4.sent;_context4.next = 10;break;case 7:_context4.prev = 7;_context4.t0 = _context4["catch"](1);t = _context4.t0;case 10:if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {_context4.next = 12;break;}throw t;case 12:return _context4.abrupt("return", e);case 13:case "end":return _context4.stop();}}}, _callee4, this, [[1, 7]]);}));function refreshAccessToken() {return _refreshAccessToken2.apply(this, arguments);}return refreshAccessToken;}() }, { key: "_refreshAccessToken", value: function () {var _refreshAccessToken3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var _this$_cache$keys, e, t, s, n, r, o, i, a, _e8, _e9, _t5, _n5;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, s = _this$_cache$keys.refreshTokenKey, n = _this$_cache$keys.loginTypeKey, r = _this$_cache$keys.anonymousUuidKey;this._cache.removeStore(e), this._cache.removeStore(t);o = this._cache.getStore(s);if (o) {_context5.next = 5;break;}throw new Error("未登录CloudBase");case 5:i = { refresh_token: o };_context5.next = 8;return this.request("auth.fetchAccessTokenWithRefreshToken", i);case 8:a = _context5.sent;if (!a.data.code) {_context5.next = 21;break;}_e8 = a.data.code;if (!("SIGN_PARAM_INVALID" === _e8 || "REFRESH_TOKEN_EXPIRED" === _e8 || "INVALID_REFRESH_TOKEN" === _e8)) {_context5.next = 20;break;}if (!(this._cache.getStore(n) === Y.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e8)) {_context5.next = 19;break;}_e9 = this._cache.getStore(r);_t5 = this._cache.getStore(s);_context5.next = 17;return this.send("auth.signInAnonymously", { anonymous_uuid: _e9, refresh_token: _t5 });case 17:_n5 = _context5.sent;return _context5.abrupt("return", (this.setRefreshToken(_n5.refresh_token), this._refreshAccessToken()));case 19:j(W), this._cache.removeStore(s);case 20:throw new Error("刷新access token失败：" + a.data.code);case 21:if (!a.data.access_token) {_context5.next = 23;break;}return _context5.abrupt("return", (j(J), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), { accessToken: a.data.access_token, accessTokenExpire: a.data.access_token_expire }));case 23:a.data.refresh_token && (this._cache.removeStore(s), this._cache.setStore(s, a.data.refresh_token), this._refreshAccessToken());case 24:case "end":return _context5.stop();}}}, _callee5, this);}));function _refreshAccessToken() {return _refreshAccessToken3.apply(this, arguments);}return _refreshAccessToken;}() }, { key: "getAccessToken", value: function () {var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var _this$_cache$keys2, e, t, s, n, r, o;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, s = _this$_cache$keys2.refreshTokenKey;if (this._cache.getStore(s)) {_context6.next = 3;break;}throw new Error("refresh token不存在，登录状态异常");case 3:n = this._cache.getStore(e), r = this._cache.getStore(t), o = !0;_context6.t0 = this._shouldRefreshAccessTokenHook;if (!_context6.t0) {_context6.next = 9;break;}_context6.next = 8;return this._shouldRefreshAccessTokenHook(n, r);case 8:_context6.t0 = !_context6.sent;case 9:_context6.t1 = _context6.t0;if (!_context6.t1) {_context6.next = 12;break;}o = !1;case 12:return _context6.abrupt("return", (!n || !r || r < Date.now()) && o ? this.refreshAccessToken() : { accessToken: n, accessTokenExpire: r });case 13:case "end":return _context6.stop();}}}, _callee6, this);}));function getAccessToken() {return _getAccessToken.apply(this, arguments);}return getAccessToken;}() }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(e, t, s) {var n, r, o, _e10, i, _e11, _e12, a, c, u, h, l, d, f, p, g;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:n = "x-tcb-trace_" + this.config.env;r = "application/x-www-form-urlencoded";o = _objectSpread({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);if (!(-1 === X.indexOf(e))) {_context7.next = 10;break;}_e10 = this._cache.keys.refreshTokenKey;_context7.t0 = this._cache.getStore(_e10);if (!_context7.t0) {_context7.next = 10;break;}_context7.next = 9;return this.getAccessToken();case 9:o.access_token = _context7.sent.accessToken;case 10:if ("storage.uploadFile" === e) {i = new FormData();for (_e11 in i) {i.hasOwnProperty(_e11) && void 0 !== i[_e11] && i.append(_e11, o[_e11]);}r = "multipart/form-data";} else {r = "application/json;charset=UTF-8", i = {};for (_e12 in o) {void 0 !== o[_e12] && (i[_e12] = o[_e12]);}}a = { headers: { "content-type": r } };s && s.onUploadProgress && (a.onUploadProgress = s.onUploadProgress);c = this._localCache.getStore(n);c && (a.headers["X-TCB-Trace"] = c);u = t.parse, h = t.inQuery, l = t.search;d = { env: this.config.env };u && (d.parse = !0), h && (d = _objectSpread(_objectSpread({}, h), d));f = function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var n = /\?/.test(t);var r = "";for (var _e13 in s) {"" === r ? !n && (t += "?") : r += "&", r += "".concat(_e13, "=").concat(encodeURIComponent(s[_e13]));}return /^http(s)?\:\/\//.test(t += r) ? t : "".concat(e).concat(t);}(S, k, d);l && (f += l);_context7.next = 22;return this.post(_objectSpread({ url: f, data: i }, a));case 22:p = _context7.sent;g = p.header && p.header["x-tcb-trace"];if (!(g && this._localCache.setStore(n, g), 200 !== Number(p.status) && 200 !== Number(p.statusCode) || !p.data)) {_context7.next = 26;break;}throw new Error("network request error");case 26:return _context7.abrupt("return", p);case 27:case "end":return _context7.stop();}}}, _callee7, this);}));function request(_x4, _x5, _x6) {return _request.apply(this, arguments);}return request;}() }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(e) {var t,s,_s3,_args8 = arguments;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:t = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};_context8.next = 3;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 3:s = _context8.sent;if (!("ACCESS_TOKEN_EXPIRED" === s.data.code && -1 === X.indexOf(e))) {_context8.next = 13;break;}_context8.next = 7;return this.refreshAccessToken();case 7:_context8.next = 9;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 9:_s3 = _context8.sent;if (!_s3.data.code) {_context8.next = 12;break;}throw new Error("[".concat(_s3.data.code, "] ").concat(_s3.data.message));case 12:return _context8.abrupt("return", _s3.data);case 13:if (!s.data.code) {_context8.next = 15;break;}throw new Error("[".concat(s.data.code, "] ").concat(s.data.message));case 15:return _context8.abrupt("return", s.data);case 16:case "end":return _context8.stop();}}}, _callee8, this);}));function send(_x7) {return _send.apply(this, arguments);}return send;}() }, { key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys3 = this._cache.keys,t = _this$_cache$keys3.accessTokenKey,s = _this$_cache$keys3.accessTokenExpireKey,n = _this$_cache$keys3.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(s), this._cache.setStore(n, e);} }]);return ee;}();var te = {};function se(e) {return te[e];}var ne = /*#__PURE__*/function () {function ne(e) {_classCallCheck(this, ne);this.config = e, this._cache = L(e.env), this._request = se(e.env);}_createClass(ne, [{ key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys4 = this._cache.keys,t = _this$_cache$keys4.accessTokenKey,s = _this$_cache$keys4.accessTokenExpireKey,n = _this$_cache$keys4.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(s), this._cache.setStore(n, e);} }, { key: "setAccessToken", value: function setAccessToken(e, t) {var _this$_cache$keys5 = this._cache.keys,s = _this$_cache$keys5.accessTokenKey,n = _this$_cache$keys5.accessTokenExpireKey;this._cache.setStore(s, e), this._cache.setStore(n, t);} }, { key: "refreshUserInfo", value: function () {var _refreshUserInfo = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var _yield$this$_request$, e;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$ = _context9.sent;e = _yield$this$_request$.data;return _context9.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context9.stop();}}}, _callee9, this);}));function refreshUserInfo() {return _refreshUserInfo.apply(this, arguments);}return refreshUserInfo;}() }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e);} }]);return ne;}();var re = /*#__PURE__*/function () {function re(e) {_classCallCheck(this, re);if (!e) throw new Error("envId is not defined");this._envId = e, this._cache = L(this._envId), this._request = se(this._envId), this.setUserInfo();}_createClass(re, [{ key: "linkWithTicket", value: function linkWithTicket(e) {if ("string" != typeof e) throw new Error("ticket must be string");return this._request.send("auth.linkWithTicket", { ticket: e });} }, { key: "linkWithRedirect", value: function linkWithRedirect(e) {e.signInWithRedirect();} }, { key: "updatePassword", value: function updatePassword(e, t) {return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });} }, { key: "updateEmail", value: function updateEmail(e) {return this._request.send("auth.updateEmail", { newEmail: e });} }, { key: "updateUsername", value: function updateUsername(e) {if ("string" != typeof e) throw new Error("username must be a string");return this._request.send("auth.updateUsername", { username: e });} }, { key: "getLinkedUidList", value: function () {var _getLinkedUidList = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var _yield$this$_request$2, e, t, s;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return this._request.send("auth.getLinkedUidList", {});case 2:_yield$this$_request$2 = _context10.sent;e = _yield$this$_request$2.data;t = !1;s = e.users;return _context10.abrupt("return", (s.forEach(function (e) {e.wxOpenId && e.wxPublicId && (t = !0);}), { users: s, hasPrimaryUid: t }));case 7:case "end":return _context10.stop();}}}, _callee10, this);}));function getLinkedUidList() {return _getLinkedUidList.apply(this, arguments);}return getLinkedUidList;}() }, { key: "setPrimaryUid", value: function setPrimaryUid(e) {return this._request.send("auth.setPrimaryUid", { uid: e });} }, { key: "unlink", value: function unlink(e) {return this._request.send("auth.unlink", { platform: e });} }, { key: "update", value: function () {var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {var t, s, n, r, o, i, _yield$this$_request$3, a;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:t = e.nickName;s = e.gender;n = e.avatarUrl;r = e.province;o = e.country;i = e.city;_context11.next = 8;return this._request.send("auth.updateUserInfo", { nickName: t, gender: s, avatarUrl: n, province: r, country: o, city: i });case 8:_yield$this$_request$3 = _context11.sent;a = _yield$this$_request$3.data;this.setLocalUserInfo(a);case 11:case "end":return _context11.stop();}}}, _callee11, this);}));function update(_x8) {return _update.apply(this, arguments);}return update;}() }, { key: "refresh", value: function () {var _refresh = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var _yield$this$_request$4, e;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$4 = _context12.sent;e = _yield$this$_request$4.data;return _context12.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context12.stop();}}}, _callee12, this);}));function refresh() {return _refresh.apply(this, arguments);}return refresh;}() }, { key: "setUserInfo", value: function setUserInfo() {var _this8 = this;var e = this._cache.keys.userInfoKey,t = this._cache.getStore(e);["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {_this8[e] = t[e];}), this.location = { country: t.country, province: t.province, city: t.city };} }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e), this.setUserInfo();} }]);return re;}();var oe = /*#__PURE__*/function () {function oe(e) {_classCallCheck(this, oe);if (!e) throw new Error("envId is not defined");this._cache = L(e);var _this$_cache$keys6 = this._cache.keys,t = _this$_cache$keys6.refreshTokenKey,s = _this$_cache$keys6.accessTokenKey,n = _this$_cache$keys6.accessTokenExpireKey,r = this._cache.getStore(t),o = this._cache.getStore(s),i = this._cache.getStore(n);this.credential = { refreshToken: r, accessToken: o, accessTokenExpire: i }, this.user = new re(e);}_createClass(oe, [{ key: "isAnonymousAuth", get: function get() {return this.loginType === Y.ANONYMOUS;} }, { key: "isCustomAuth", get: function get() {return this.loginType === Y.CUSTOM;} }, { key: "isWeixinAuth", get: function get() {return this.loginType === Y.WECHAT || this.loginType === Y.WECHAT_OPEN || this.loginType === Y.WECHAT_PUBLIC;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return oe;}();var ie = /*#__PURE__*/function (_ne) {_inherits(ie, _ne);var _super4 = _createSuper(ie);function ie() {_classCallCheck(this, ie);return _super4.apply(this, arguments);}_createClass(ie, [{ key: "signIn", value: function () {var _signIn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var _this$_cache$keys7, e, t, s, n, r, _e14;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:this._cache.updatePersistence("local");_this$_cache$keys7 = this._cache.keys;e = _this$_cache$keys7.anonymousUuidKey;t = _this$_cache$keys7.refreshTokenKey;s = this._cache.getStore(e) || void 0;n = this._cache.getStore(t) || void 0;_context13.next = 8;return this._request.send("auth.signInAnonymously", { anonymous_uuid: s, refresh_token: n });case 8:r = _context13.sent;if (!(r.uuid && r.refresh_token)) {_context13.next = 20;break;}this._setAnonymousUUID(r.uuid);this.setRefreshToken(r.refresh_token);_context13.next = 14;return this._request.refreshAccessToken();case 14:j(H);j(V, { env: this.config.env, loginType: Y.ANONYMOUS, persistence: "local" });_e14 = new oe(this.config.env);_context13.next = 19;return _e14.user.refresh();case 19:return _context13.abrupt("return", _e14);case 20:throw new Error("匿名登录失败");case 21:case "end":return _context13.stop();}}}, _callee13, this);}));function signIn() {return _signIn.apply(this, arguments);}return signIn;}() }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {var _this$_cache$keys8, t, s, n, r, o;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_this$_cache$keys8 = this._cache.keys;t = _this$_cache$keys8.anonymousUuidKey;s = _this$_cache$keys8.refreshTokenKey;n = this._cache.getStore(t);r = this._cache.getStore(s);_context14.next = 7;return this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: n, refresh_token: r, ticket: e });case 7:o = _context14.sent;if (!o.refresh_token) {_context14.next = 16;break;}this._clearAnonymousUUID();this.setRefreshToken(o.refresh_token);_context14.next = 13;return this._request.refreshAccessToken();case 13:j(z, { env: this.config.env });j(V, { loginType: Y.CUSTOM, persistence: "local" });return _context14.abrupt("return", { credential: { refreshToken: o.refresh_token } });case 16:throw new Error("匿名转化失败");case 17:case "end":return _context14.stop();}}}, _callee14, this);}));function linkAndRetrieveDataWithTicket(_x9) {return _linkAndRetrieveDataWithTicket.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "_setAnonymousUUID", value: function _setAnonymousUUID(e) {var _this$_cache$keys9 = this._cache.keys,t = _this$_cache$keys9.anonymousUuidKey,s = _this$_cache$keys9.loginTypeKey;this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(s, Y.ANONYMOUS);} }, { key: "_clearAnonymousUUID", value: function _clearAnonymousUUID() {this._cache.removeStore(this._cache.keys.anonymousUuidKey);} }]);return ie;}(ne);var ae = /*#__PURE__*/function (_ne2) {_inherits(ae, _ne2);var _super5 = _createSuper(ae);function ae() {_classCallCheck(this, ae);return _super5.apply(this, arguments);}_createClass(ae, [{ key: "signIn", value: function () {var _signIn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {var t, s;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:if (!("string" != typeof e)) {_context15.next = 2;break;}throw new Error("ticket must be a string");case 2:t = this._cache.keys.refreshTokenKey;_context15.next = 5;return this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });case 5:s = _context15.sent;if (!s.refresh_token) {_context15.next = 15;break;}this.setRefreshToken(s.refresh_token);_context15.next = 10;return this._request.refreshAccessToken();case 10:j(H);j(V, { env: this.config.env, loginType: Y.CUSTOM, persistence: this.config.persistence });_context15.next = 14;return this.refreshUserInfo();case 14:return _context15.abrupt("return", new oe(this.config.env));case 15:throw new Error("自定义登录失败");case 16:case "end":return _context15.stop();}}}, _callee15, this);}));function signIn(_x10) {return _signIn2.apply(this, arguments);}return signIn;}() }]);return ae;}(ne);var ce = /*#__PURE__*/function (_ne3) {_inherits(ce, _ne3);var _super6 = _createSuper(ce);function ce() {_classCallCheck(this, ce);return _super6.apply(this, arguments);}_createClass(ce, [{ key: "signIn", value: function () {var _signIn3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16(e, t) {var s, n, r, o, i;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:if (!("string" != typeof e)) {_context16.next = 2;break;}throw new Error("email must be a string");case 2:s = this._cache.keys.refreshTokenKey;_context16.next = 5;return this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(s) || "" });case 5:n = _context16.sent;r = n.refresh_token;o = n.access_token;i = n.access_token_expire;if (!r) {_context16.next = 22;break;}this.setRefreshToken(r);if (!(o && i)) {_context16.next = 15;break;}this.setAccessToken(o, i);_context16.next = 17;break;case 15:_context16.next = 17;return this._request.refreshAccessToken();case 17:_context16.next = 19;return this.refreshUserInfo();case 19:j(H);j(V, { env: this.config.env, loginType: Y.EMAIL, persistence: this.config.persistence });return _context16.abrupt("return", new oe(this.config.env));case 22:throw n.code ? new Error("\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: [".concat(n.code, "] ").concat(n.message)) : new Error("邮箱登录失败");case 23:case "end":return _context16.stop();}}}, _callee16, this);}));function signIn(_x11, _x12) {return _signIn3.apply(this, arguments);}return signIn;}() }, { key: "activate", value: function () {var _activate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:return _context17.abrupt("return", this._request.send("auth.activateEndUserMail", { token: e }));case 1:case "end":return _context17.stop();}}}, _callee17, this);}));function activate(_x13) {return _activate.apply(this, arguments);}return activate;}() }, { key: "resetPasswordWithToken", value: function () {var _resetPasswordWithToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18(e, t) {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:return _context18.abrupt("return", this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t }));case 1:case "end":return _context18.stop();}}}, _callee18, this);}));function resetPasswordWithToken(_x14, _x15) {return _resetPasswordWithToken.apply(this, arguments);}return resetPasswordWithToken;}() }]);return ce;}(ne);var ue = /*#__PURE__*/function (_ne4) {_inherits(ue, _ne4);var _super7 = _createSuper(ue);function ue() {_classCallCheck(this, ue);return _super7.apply(this, arguments);}_createClass(ue, [{ key: "signIn", value: function () {var _signIn4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {var s, n, r, o, i;return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:if (!("string" != typeof e)) {_context19.next = 2;break;}throw new Error("username must be a string");case 2:"string" != typeof t && (t = "", console.warn("password is empty"));s = this._cache.keys.refreshTokenKey;_context19.next = 6;return this._request.send("auth.signIn", { loginType: Y.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(s) || "" });case 6:n = _context19.sent;r = n.refresh_token;o = n.access_token_expire;i = n.access_token;if (!r) {_context19.next = 23;break;}this.setRefreshToken(r);if (!(i && o)) {_context19.next = 16;break;}this.setAccessToken(i, o);_context19.next = 18;break;case 16:_context19.next = 18;return this._request.refreshAccessToken();case 18:_context19.next = 20;return this.refreshUserInfo();case 20:j(H);j(V, { env: this.config.env, loginType: Y.USERNAME, persistence: this.config.persistence });return _context19.abrupt("return", new oe(this.config.env));case 23:throw n.code ? new Error("\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: [".concat(n.code, "] ").concat(n.message)) : new Error("用户名密码登录失败");case 24:case "end":return _context19.stop();}}}, _callee19, this);}));function signIn(_x16, _x17) {return _signIn4.apply(this, arguments);}return signIn;}() }]);return ue;}(ne);var he = /*#__PURE__*/function () {function he(e) {_classCallCheck(this, he);this.config = e, this._cache = L(e.env), this._request = se(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), K(V, this._onLoginTypeChanged);}_createClass(he, [{ key: "anonymousAuthProvider", value: function anonymousAuthProvider() {return new ie(this.config);} }, { key: "customAuthProvider", value: function customAuthProvider() {return new ae(this.config);} }, { key: "emailAuthProvider", value: function emailAuthProvider() {return new ce(this.config);} }, { key: "usernameAuthProvider", value: function usernameAuthProvider() {return new ue(this.config);} }, { key: "signInAnonymously", value: function () {var _signInAnonymously = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:return _context20.abrupt("return", new ie(this.config).signIn());case 1:case "end":return _context20.stop();}}}, _callee20, this);}));function signInAnonymously() {return _signInAnonymously.apply(this, arguments);}return signInAnonymously;}() }, { key: "signInWithEmailAndPassword", value: function () {var _signInWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:return _context21.abrupt("return", new ce(this.config).signIn(e, t));case 1:case "end":return _context21.stop();}}}, _callee21, this);}));function signInWithEmailAndPassword(_x18, _x19) {return _signInWithEmailAndPassword.apply(this, arguments);}return signInWithEmailAndPassword;}() }, { key: "signInWithUsernameAndPassword", value: function signInWithUsernameAndPassword(e, t) {return new ue(this.config).signIn(e, t);} }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee22(e) {return _regenerator.default.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:this._anonymousAuthProvider || (this._anonymousAuthProvider = new ie(this.config)), K(z, this._onAnonymousConverted);_context22.next = 3;return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);case 3:return _context22.abrupt("return", _context22.sent);case 4:case "end":return _context22.stop();}}}, _callee22, this);}));function linkAndRetrieveDataWithTicket(_x20) {return _linkAndRetrieveDataWithTicket2.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "signOut", value: function () {var _signOut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee23() {var _this$_cache$keys10, e, t, s, n, r;return _regenerator.default.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:if (!(this.loginType === Y.ANONYMOUS)) {_context23.next = 2;break;}throw new Error("匿名用户不支持登出操作");case 2:_this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, s = _this$_cache$keys10.accessTokenExpireKey, n = this._cache.getStore(e);if (n) {_context23.next = 5;break;}return _context23.abrupt("return");case 5:_context23.next = 7;return this._request.send("auth.logout", { refresh_token: n });case 7:r = _context23.sent;return _context23.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(s), j(H), j(V, { env: this.config.env, loginType: Y.NULL, persistence: this.config.persistence }), r));case 9:case "end":return _context23.stop();}}}, _callee23, this);}));function signOut() {return _signOut.apply(this, arguments);}return signOut;}() }, { key: "signUpWithEmailAndPassword", value: function () {var _signUpWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {return _regenerator.default.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:return _context24.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t }));case 1:case "end":return _context24.stop();}}}, _callee24, this);}));function signUpWithEmailAndPassword(_x21, _x22) {return _signUpWithEmailAndPassword.apply(this, arguments);}return signUpWithEmailAndPassword;}() }, { key: "sendPasswordResetEmail", value: function () {var _sendPasswordResetEmail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {return _regenerator.default.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:return _context25.abrupt("return", this._request.send("auth.sendPasswordResetEmail", { email: e }));case 1:case "end":return _context25.stop();}}}, _callee25, this);}));function sendPasswordResetEmail(_x23) {return _sendPasswordResetEmail.apply(this, arguments);}return sendPasswordResetEmail;}() }, { key: "onLoginStateChanged", value: function onLoginStateChanged(e) {var _this9 = this;K(H, function () {var t = _this9.hasLoginState();e.call(_this9, t);});var t = this.hasLoginState();e.call(this, t);} }, { key: "onLoginStateExpired", value: function onLoginStateExpired(e) {K(W, e.bind(this));} }, { key: "onAccessTokenRefreshed", value: function onAccessTokenRefreshed(e) {K(J, e.bind(this));} }, { key: "onAnonymousConverted", value: function onAnonymousConverted(e) {K(z, e.bind(this));} }, { key: "onLoginTypeChanged", value: function onLoginTypeChanged(e) {var _this10 = this;K(V, function () {var t = _this10.hasLoginState();e.call(_this10, t);});} }, { key: "getAccessToken", value: function () {var _getAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee26() {return _regenerator.default.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.next = 2;return this._request.getAccessToken();case 2:_context26.t0 = _context26.sent.accessToken;_context26.t1 = this.config.env;return _context26.abrupt("return", { accessToken: _context26.t0, env: _context26.t1 });case 5:case "end":return _context26.stop();}}}, _callee26, this);}));function getAccessToken() {return _getAccessToken2.apply(this, arguments);}return getAccessToken;}() }, { key: "hasLoginState", value: function hasLoginState() {var e = this._cache.keys.refreshTokenKey;return this._cache.getStore(e) ? new oe(this.config.env) : null;} }, { key: "isUsernameRegistered", value: function () {var _isUsernameRegistered = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {var _yield$this$_request$5, t;return _regenerator.default.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!("string" != typeof e)) {_context27.next = 2;break;}throw new Error("username must be a string");case 2:_context27.next = 4;return this._request.send("auth.isUsernameRegistered", { username: e });case 4:_yield$this$_request$5 = _context27.sent;t = _yield$this$_request$5.data;return _context27.abrupt("return", t && t.isRegistered);case 7:case "end":return _context27.stop();}}}, _callee27, this);}));function isUsernameRegistered(_x24) {return _isUsernameRegistered.apply(this, arguments);}return isUsernameRegistered;}() }, { key: "getLoginState", value: function getLoginState() {return Promise.resolve(this.hasLoginState());} }, { key: "signInWithTicket", value: function () {var _signInWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {return _regenerator.default.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:return _context28.abrupt("return", new ae(this.config).signIn(e));case 1:case "end":return _context28.stop();}}}, _callee28, this);}));function signInWithTicket(_x25) {return _signInWithTicket.apply(this, arguments);}return signInWithTicket;}() }, { key: "shouldRefreshAccessToken", value: function shouldRefreshAccessToken(e) {this._request._shouldRefreshAccessTokenHook = e.bind(this);} }, { key: "getUserInfo", value: function getUserInfo() {return this._request.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, { requestId: e.seqId });});} }, { key: "getAuthHeader", value: function getAuthHeader() {var _this$_cache$keys11 = this._cache.keys,e = _this$_cache$keys11.refreshTokenKey,t = _this$_cache$keys11.accessTokenKey,s = this._cache.getStore(e);return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + s };} }, { key: "_onAnonymousConverted", value: function _onAnonymousConverted(e) {var t = e.data.env;t === this.config.env && this._cache.updatePersistence(this.config.persistence);} }, { key: "_onLoginTypeChanged", value: function _onLoginTypeChanged(e) {var _e$data = e.data,t = _e$data.loginType,s = _e$data.persistence,n = _e$data.env;n === this.config.env && (this._cache.updatePersistence(s), this._cache.setStore(this._cache.keys.loginTypeKey, t));} }, { key: "currentUser", get: function get() {var e = this.hasLoginState();return e && e.user || null;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return he;}();var le = function le(e, t) {t = t || A();var s = se(this.config.env),n = e.cloudPath,r = e.filePath,o = e.onUploadProgress,_e$fileType = e.fileType,i = _e$fileType === void 0 ? "image" : _e$fileType;return s.send("storage.getUploadMetadata", { path: n }).then(function (e) {var _e$data2 = e.data,a = _e$data2.url,c = _e$data2.authorization,u = _e$data2.token,h = _e$data2.fileId,l = _e$data2.cosFileId,d = e.requestId,f = { key: n, signature: c, "x-cos-meta-fileid": l, success_action_status: "201", "x-cos-security-token": u };s.upload({ url: a, data: f, file: r, name: n, fileType: i, onUploadProgress: o }).then(function (e) {201 === e.statusCode ? t(null, { fileID: h, requestId: d }) : t(new Error("STORAGE_REQUEST_FAIL: " + e.data));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;},de = function de(e, t) {t = t || A();var s = se(this.config.env),n = e.cloudPath;return s.send("storage.getUploadMetadata", { path: n }).then(function (e) {t(null, e);}).catch(function (e) {t(e);}), t.promise;},fe = function fe(_ref5, t) {var e = _ref5.fileList;if (t = t || A(), !e || !Array.isArray(e)) return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };var _iterator3 = _createForOfIteratorHelper(e),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _t6 = _step3.value;if (!_t6 || "string" != typeof _t6) return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}var s = { fileid_list: e };return se(this.config.env).send("storage.batchDeleteFile", s).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},pe = function pe(_ref6, t) {var e = _ref6.fileList;t = t || A(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });var s = [];var _iterator4 = _createForOfIteratorHelper(e),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _n6 = _step4.value;"object" == typeof _n6 ? (_n6.hasOwnProperty("fileID") && _n6.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), s.push({ fileid: _n6.fileID, max_age: _n6.maxAge })) : "string" == typeof _n6 ? s.push({ fileid: _n6 }) : t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var n = { file_list: s };return se(this.config.env).send("storage.batchGetDownloadUrl", n).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},ge = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee29(_ref7, t) {var e, s, n, r;return _regenerator.default.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:e = _ref7.fileID;_context29.next = 3;return pe.call(this, { fileList: [{ fileID: e, maxAge: 600 }] });case 3:s = _context29.sent.fileList[0];if (!("SUCCESS" !== s.code)) {_context29.next = 6;break;}return _context29.abrupt("return", t ? t(s) : new Promise(function (e) {e(s);}));case 6:n = se(this.config.env);r = s.download_url;if (!(r = encodeURI(r), !t)) {_context29.next = 10;break;}return _context29.abrupt("return", n.download({ url: r }));case 10:_context29.t0 = t;_context29.next = 13;return n.download({ url: r });case 13:_context29.t1 = _context29.sent;(0, _context29.t0)(_context29.t1);case 15:case "end":return _context29.stop();}}}, _callee29, this);}));return function ge(_x26, _x27) {return _ref8.apply(this, arguments);};}(),me = function me(_ref9, o) {var e = _ref9.name,t = _ref9.data,s = _ref9.query,n = _ref9.parse,r = _ref9.search;var i = o || A();var a;try {a = t ? JSON.stringify(t) : "";} catch (e) {return Promise.reject(e);}if (!e) return Promise.reject(new Error("函数名不能为空"));var c = { inQuery: s, parse: n, search: r, function_name: e, request_data: a };return se(this.config.env).send("functions.invokeFunction", c).then(function (e) {if (e.code) i(null, e);else {var _t7 = e.data.response_data;if (n) i(null, { result: _t7, requestId: e.requestId });else try {_t7 = JSON.parse(e.data.response_data), i(null, { result: _t7, requestId: e.requestId });} catch (e) {i(new Error("response data must be json"));}}return i.promise;}).catch(function (e) {i(e);}), i.promise;},ye = { timeout: 15e3, persistence: "session" },_e = {};var ve = /*#__PURE__*/function () {function ve(e) {_classCallCheck(this, ve);this.config = e || this.config, this.authObj = void 0;}_createClass(ve, [{ key: "init", value: function init(e) {switch (b.adapter || (this.requestClient = new b.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD") })), this.config = _objectSpread(_objectSpread({}, ye), e), !0) {case this.config.timeout > 6e5:console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;break;case this.config.timeout < 100:console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;}return new ve(this.config);} }, { key: "auth", value: function auth() {var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref10.persistence;if (this.authObj) return this.authObj;var t = e || b.adapter.primaryStorage || ye.persistence;var s;return t !== this.config.persistence && (this.config.persistence = t), function (e) {var t = e.env;q[t] = new R(e), F[t] = new R(_objectSpread(_objectSpread({}, e), {}, { persistence: "local" }));}(this.config), s = this.config, te[s.env] = new ee(s), this.authObj = new he(this.config), this.authObj;} }, { key: "on", value: function on(e, t) {return K.apply(this, [e, t]);} }, { key: "off", value: function off(e, t) {return B.apply(this, [e, t]);} }, { key: "callFunction", value: function callFunction(e, t) {return me.apply(this, [e, t]);} }, { key: "deleteFile", value: function deleteFile(e, t) {return fe.apply(this, [e, t]);} }, { key: "getTempFileURL", value: function getTempFileURL(e, t) {return pe.apply(this, [e, t]);} }, { key: "downloadFile", value: function downloadFile(e, t) {return ge.apply(this, [e, t]);} }, { key: "uploadFile", value: function uploadFile(e, t) {return le.apply(this, [e, t]);} }, { key: "getUploadMetadata", value: function getUploadMetadata(e, t) {return de.apply(this, [e, t]);} }, { key: "registerExtension", value: function registerExtension(e) {_e[e.name] = e;} }, { key: "invokeExtension", value: function () {var _invokeExtension = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {var s;return _regenerator.default.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:s = _e[e];if (s) {_context30.next = 3;break;}throw Error("\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C"));case 3:_context30.next = 5;return s.invoke(t, this);case 5:return _context30.abrupt("return", _context30.sent);case 6:case "end":return _context30.stop();}}}, _callee30, this);}));function invokeExtension(_x28, _x29) {return _invokeExtension.apply(this, arguments);}return invokeExtension;}() }, { key: "useAdapters", value: function useAdapters(e) {var _ref11 = U(e) || {},t = _ref11.adapter,s = _ref11.runtime;t && (b.adapter = t), s && (b.runtime = s);} }]);return ve;}();var we = new ve();function Se(e, t, s) {void 0 === s && (s = {});var n = /\?/.test(t),r = "";for (var o in s) {"" === r ? !n && (t += "?") : r += "&", r += o + "=" + encodeURIComponent(s[o]);}return /^http(s)?:\/\//.test(t += r) ? t : "" + e + t;}var ke = /*#__PURE__*/function () {function ke() {_classCallCheck(this, ke);}_createClass(ke, [{ key: "post", value: function post(e) {var t = e.url,s = e.data,n = e.headers;return new Promise(function (e, r) {_.request({ url: Se("https:", t), data: s, method: "POST", header: n, success: function success(t) {e(t);}, fail: function fail(e) {r(e);} });});} }, { key: "upload", value: function upload(e) {return new Promise(function (t, s) {var n = e.url,r = e.file,o = e.data,i = e.headers,a = e.fileType,c = _.uploadFile({ url: Se("https:", n), name: "file", formData: Object.assign({}, o), filePath: r, fileType: a, header: i, success: function success(e) {var s = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && o.success_action_status && (s.statusCode = parseInt(o.success_action_status, 10)), t(s);}, fail: function fail(e) { false && false, s(new Error(e.errMsg || "uploadFile:fail"));} });"function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {e.onUploadProgress({ loaded: t.totalBytesSent, total: t.totalBytesExpectedToSend });});});} }]);return ke;}();var Te = { setItem: function setItem(e, t) {_.setStorageSync(e, t);}, getItem: function getItem(e) {return _.getStorageSync(e);}, removeItem: function removeItem(e) {_.removeStorageSync(e);}, clear: function clear() {_.clearStorageSync();} };var Pe = { genAdapter: function genAdapter() {return { root: {}, reqClass: ke, localStorage: Te, primaryStorage: "local" };}, isMatch: function isMatch() {return !0;}, runtime: "uni_app" };we.useAdapters(Pe);var Ae = we,Ie = Ae.init;Ae.init = function (e) {e.env = e.spaceId;var t = Ie.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var s = t.auth;t.auth = function (e) {var t = s.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = o(t[e]).bind(t);}), t;}, t.customAuth = t.auth;return ["deleteFile", "getTempFileURL", "downloadFile"].forEach(function (e) {t[e] = o(t[e]).bind(t);}), t;};var Ee = /*#__PURE__*/function (_v) {_inherits(Ee, _v);var _super8 = _createSuper(Ee);function Ee() {_classCallCheck(this, Ee);return _super8.apply(this, arguments);}_createClass(Ee, [{ key: "getAccessToken", value: function getAccessToken() {var _this11 = this;return new Promise(function (e, t) {_this11.setAccessToken("Anonymous_Access_token"), e("Anonymous_Access_token");});} }, { key: "setupRequest", value: function setupRequest(e, t) {var s = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),n = { "Content-Type": "application/json" };"auth" !== t && (s.token = this.accessToken, n["x-basement-token"] = this.accessToken), n["x-serverless-sign"] = y.sign(s, this.config.clientSecret);var r = p(),o = r.APPID,i = r.PLATFORM,a = r.DEVICEID,c = r.CLIENT_SDK_VERSION;return n["x-client-platform"] = i, n["x-client-appid"] = o, n["x-client-device-id"] = a, n["x-client-version"] = c, n["x-client-token"] = _.getStorageSync("uni_id_token"), { url: this.config.requestUrl, method: "POST", data: s, dataType: "json", header: JSON.parse(JSON.stringify(n)) };} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref12) {var _this12 = this;var e = _ref12.url,t = _ref12.formData,s = _ref12.name,n = _ref12.filePath,r = _ref12.fileType,o = _ref12.onUploadProgress;return new Promise(function (a, c) {var u = _this12.adapter.uploadFile({ url: e, formData: t, name: s, filePath: n, fileType: r, success: function success(e) {e && e.statusCode < 400 ? a(e) : c(new i({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {c(new i({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && u && "function" == typeof u.onProgressUpdate && u.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "uploadFile", value: function uploadFile(_ref13) {var _this13 = this;var e = _ref13.filePath,t = _ref13.cloudPath,_ref13$fileType = _ref13.fileType,s = _ref13$fileType === void 0 ? "image" : _ref13$fileType,n = _ref13.onUploadProgress;if (!t) throw new i({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var r;return this.getOSSUploadOptionsFromPath({ cloudPath: t }).then(function (t) {var _t$result = t.result,o = _t$result.url,i = _t$result.formData,a = _t$result.name,c = _t$result.fileUrl;r = c;var u = { url: o, formData: i, name: a, filePath: e, fileType: s };return _this13.uploadFileToOSS(Object.assign({}, u, { onUploadProgress: n }));}).then(function () {return _this13.reportOSSUpload({ cloudPath: t });}).then(function (t) {return new Promise(function (s, n) {t.success ? s({ success: !0, filePath: e, fileID: r }) : n(new i({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }]);return Ee;}(v);var Oe = { init: function init(e) {var t = new Ee(e);["deleteFile", "getTempFileURL"].forEach(function (e) {t[e] = o(t[e]).bind(t);});var s = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return s;}, t.customAuth = t.auth, t;} };var Ue, be;function De(_ref14) {var e = _ref14.name,t = _ref14.data,s = _ref14.spaceId,n = _ref14.provider;Ue || (Ue = p(), be = { ak: h.appid, p: "android" === d ? "a" : "i", ut: m(), uuid: g() });var r = JSON.parse(JSON.stringify(t || {})),o = e,i = s,a = { tencent: "t", aliyun: "a" }[n];{var _e15 = Object.assign({}, be, { fn: o, sid: i, pvd: a });Object.assign(r, { clientInfo: Ue, uniCloudClientInfo: encodeURIComponent(JSON.stringify(_e15)) });var _uni$getSystemInfoSyn2 = uni.getSystemInfoSync(),_t8 = _uni$getSystemInfoSyn2.deviceId;r.uniCloudDeviceId = _t8;}if (!r.uniIdToken) {var _e16 = _.getStorageSync("uni_id_token") || _.getStorageSync("uniIdToken");_e16 && (r.uniIdToken = _e16);}return r;}function Ce(_ref15) {var _this14 = this;var e = _ref15.name,t = _ref15.data;var s = this.localAddress,n = this.localPort,r = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider],o = this.config.spaceId,a = "http://".concat(s, ":").concat(n, "/system/check-function"),c = "http://".concat(s, ":").concat(n, "/cloudfunctions/").concat(e);return new Promise(function (t, s) {_.request({ method: "POST", url: a, data: { name: e, platform: "mp-weixin", provider: r, spaceId: o }, timeout: 3e3, success: function success(e) {t(e);}, fail: function fail() {t({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });} });}).then(function () {var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref16.data;var _ref17 = e || {},t = _ref17.code,s = _ref17.message;return { code: 0 === t ? 0 : t || "SYS_ERR", message: s || "SYS_ERR" };}).then(function (_ref18) {var s = _ref18.code,n = _ref18.message;if (0 !== s) {switch (s) {case "MODULE_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "FUNCTION_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "ACTION_ENCRYPTED":console.error(n || "需要访问加密的uni-clientDB-action，自动切换为云端环境");break;case "NETWORK_ERROR":{var _e17 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";throw console.error(_e17), new Error(_e17);}case "SWITCH_TO_CLOUD":break;default:{var _e18 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(n, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");throw console.error(_e18), new Error(_e18);}}return _this14.originCallFunction({ name: e, data: t });}return new Promise(function (s, n) {var a = De({ name: e, data: t, provider: _this14.config.provider, spaceId: o });_.request({ method: "POST", url: c, data: { provider: r, platform: "mp-weixin", param: a }, success: function success() {var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref19.statusCode,t = _ref19.data;return !e || e >= 400 ? n(new i({ code: t.code || "SYS_ERR", message: t.message || "request:fail" })) : s({ result: t });}, fail: function fail(e) {n(new i({ code: e.code || e.errCode || "SYS_ERR", message: e.message || e.errMsg || "request:fail" }));} });});});}var xe = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确已经是否已上传到服务空间", mode: "append" }];var Re = /[\\^$.*+?()[\]{}|]/g,qe = RegExp(Re.source);function Fe(e, t, s) {return e.replace(new RegExp((n = t) && qe.test(n) ? n.replace(Re, "\\$&") : n, "g"), s);var n;}function Le(e) {var t = e.callFunction;e.callFunction = function (e) {var _this15 = this;var s;s = this.isReady ? Promise.resolve() : this.initUniCloud;var n = e.name;return s.then(function () {e.data = De({ name: n, data: e.data, provider: _this15.config.provider, spaceId: _this15.config.spaceId });var s = { aliyun: "aliyun", tencent: "tcb" }[_this15.config.provider];return new Promise(function (r, o) {t.call(_this15, e).then(function (e) {if (_this15.config.useDebugFunction && e && e.requestId) {var _t9 = JSON.stringify({ spaceId: _this15.config.spaceId, functionName: n, requestId: e.requestId });console.log("[".concat(s, "-request]").concat(_t9, "[/").concat(s, "-request]"));}r(e);}).catch(function (t) {if (_this15.config.useDebugFunction && t && t.requestId) {var _e19 = JSON.stringify({ spaceId: _this15.config.spaceId, functionName: n, requestId: t.requestId });console.log("[".concat(s, "-request]").concat(_e19, "[/").concat(s, "-request]"));}t && t.message && (t.message = function () {var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref20$message = _ref20.message,e = _ref20$message === void 0 ? "" : _ref20$message,_ref20$extraInfo = _ref20.extraInfo,t = _ref20$extraInfo === void 0 ? {} : _ref20$extraInfo,_ref20$formatter = _ref20.formatter,s = _ref20$formatter === void 0 ? [] : _ref20$formatter;for (var _n7 = 0; _n7 < s.length; _n7++) {var _s$_n = s[_n7],_r3 = _s$_n.rule,_o2 = _s$_n.content,_i2 = _s$_n.mode,_a = e.match(_r3);if (!_a) continue;var _c = _o2;for (var _e20 = 1; _e20 < _a.length; _e20++) {_c = Fe(_c, "{$".concat(_e20, "}"), _a[_e20]);}for (var _e21 in t) {_c = Fe(_c, "{".concat(_e21, "}"), t[_e21]);}switch (_i2) {case "replace":return _c;case "append":default:return e + _c;}}return e;}({ message: "[".concat(e.name, "]: ").concat(t.message), formatter: xe, extraInfo: { functionName: n } })), o(t);});});});};var s = e.callFunction;e.originCallFunction = e.callFunction, e.callFunction = function (t) {return o(function (t) {var _this16 = this;var n;n = e.isReady ? Promise.resolve() : e.initUniCloud;var r = n.then(function () {return  true && e.debugInfo && !e.debugInfo.forceRemote && [] ? Ce.call(_this16, t) : s.call(_this16, t);});return Object.defineProperty(r, "result", { get: function get() {return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {};} }), r;}).call(this, t);};}var Ne = Symbol("CLIENT_DB_INTERNAL");function Me(e, t) {return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = Ne, new Proxy(e, { get: function get(e, s, n) {return function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}(e, s) || e[s] || "string" != typeof s ? e[s] : t.get(e, s, n);} });}var $e = /*#__PURE__*/function (_Error2) {_inherits($e, _Error2);var _super9 = _createSuper($e);function $e(e, t) {var _this17;_classCallCheck(this, $e);_this17 = _super9.call(this, e), _this17.code = t;return _this17;}return $e;}( /*#__PURE__*/_wrapNativeSuper(Error));function Ke(e) {switch (t = e, Object.prototype.toString.call(t).slice(8, -1).toLowerCase()) {case "array":return e.map(function (e) {return Ke(e);});case "object":return e._internalType === Ne || Object.keys(e).forEach(function (t) {e[t] = Ke(e[t]);}), e;case "regexp":return { $regexp: { source: e.source, flags: e.flags } };case "date":return { $date: e.toISOString() };default:return e;}var t;}function je() {var e = _.getStorageSync("uni_id_token") || "",t = e.split(".");if (!e || 3 !== t.length) return { uid: null, role: [], permission: [], tokenExpired: 0 };var s;try {s = JSON.parse((n = t[1], decodeURIComponent(atob(n).split("").map(function (e) {return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);}).join(""))));} catch (e) {throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message);}var n;return s.tokenExpired = 1e3 * s.exp, delete s.exp, delete s.iat, s;}var Be = t(s(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 });var s = "chooseAndUploadFile:fail";function n(e, t) {return e.tempFiles.forEach(function (e, s) {e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + s + e.name.substring(e.name.lastIndexOf("."));}), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {return e.path;})), e;}function r(e, t, _ref21) {var s = _ref21.onChooseFile,n = _ref21.onUploadProgress;return t.then(function (e) {if (s) {var _t10 = s(e);if (void 0 !== _t10) return Promise.resolve(_t10).then(function (t) {return void 0 === t ? e : t;});}return e;}).then(function (t) {return !1 === t ? { errMsg: "chooseAndUploadFile:ok", tempFilePaths: [], tempFiles: [] } : function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;var n = arguments.length > 3 ? arguments[3] : undefined;(t = Object.assign({}, t)).errMsg = "chooseAndUploadFile:ok";var r = t.tempFiles,o = r.length;var i = 0;return new Promise(function (a) {for (; i < s;) {c();}function c() {var s = i++;if (s >= o) return void (!r.find(function (e) {return !e.url && !e.errMsg;}) && a(t));var u = r[s];e.uploadFile({ filePath: u.path, cloudPath: u.cloudPath, fileType: u.fileType, onUploadProgress: function onUploadProgress(e) {e.index = s, e.tempFile = u, e.tempFilePath = u.path, n && n(e);} }).then(function (e) {u.url = e.fileID, s < o && c();}).catch(function (e) {u.errMsg = e.errMsg || e.message, s < o && c();});}});}(e, t, 5, n);});}t.initChooseAndUploadFile = function (e) {return function () {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "all" };return "image" === t.type ? r(e, function (e) {var t = e.count,r = e.sizeType,_e$sourceType = e.sourceType,o = _e$sourceType === void 0 ? ["album", "camera"] : _e$sourceType,i = e.extension;return new Promise(function (e, a) {uni.chooseImage({ count: t, sizeType: r, sourceType: o, extension: i, success: function success(t) {e(n(t, "image"));}, fail: function fail(e) {a({ errMsg: e.errMsg.replace("chooseImage:fail", s) });} });});}(t), t) : "video" === t.type ? r(e, function (e) {var t = e.camera,r = e.compressed,o = e.maxDuration,i = e.sourceType,a = e.extension;return new Promise(function (e, c) {uni.chooseVideo({ camera: t, compressed: r, maxDuration: o, sourceType: i, extension: a, success: function success(t) {var s = t.tempFilePath,r = t.duration,o = t.size,i = t.height,a = t.width;e(n({ errMsg: "chooseVideo:ok", tempFilePaths: [s], tempFiles: [{ name: t.tempFile && t.tempFile.name || "", path: s, size: o, type: t.tempFile && t.tempFile.type || "", width: a, height: i, duration: r, fileType: "video", cloudPath: "" }] }, "video"));}, fail: function fail(e) {c({ errMsg: e.errMsg.replace("chooseVideo:fail", s) });} });});}(t), t) : r(e, function (e) {var t = e.count,r = e.extension;return new Promise(function (e, o) {var i = uni.chooseFile;if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i = wx.chooseMessageFile), "function" != typeof i) return o({ errMsg: s + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });i({ type: "all", count: t, extension: r, success: function success(t) {e(n(t));}, fail: function fail(e) {o({ errMsg: e.errMsg.replace("chooseFile:fail", s) });} });});}(t), t);};};}));var He = "manual";function We(_x30, _x31) {return _We.apply(this, arguments);}function _We() {_We = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee32(e, t) {var s, _e28, n;return _regenerator.default.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:s = "http://".concat(e, ":").concat(t, "/system/ping");_context32.prev = 1;_context32.next = 4;return n = { url: s, timeout: 500 }, new Promise(function (e, t) {_.request(_objectSpread(_objectSpread({}, n), {}, { success: function success(t) {e(t);}, fail: function fail(e) {t(e);} }));});case 4:_e28 = _context32.sent;return _context32.abrupt("return", !(!_e28.data || 0 !== _e28.data.code));case 8:_context32.prev = 8;_context32.t0 = _context32["catch"](1);return _context32.abrupt("return", !1);case 11:case "end":return _context32.stop();}}}, _callee32, null, [[1, 8]]);}));return _We.apply(this, arguments);}var Ve = new ( /*#__PURE__*/function () {function _class2() {_classCallCheck(this, _class2);}_createClass(_class2, [{ key: "init", value: function init(e) {var t = {};var s = !1 !== e.debugFunction && "development" === "development" && ( false || "app-plus" === "mp-weixin");switch (e.provider) {case "tencent":t = Ae.init(Object.assign(e, { useDebugFunction: s }));break;case "aliyun":t = w.init(Object.assign(e, { useDebugFunction: s }));break;case "private":t = Oe.init(Object.assign(e, { useDebugFunction: s }));break;default:throw new Error("未提供正确的provider参数");}var n = undefined; true && n && !n.code && (t.debugInfo = n), t.isReady = !1;var r = t.auth();return t.initUniCloud = r.getLoginState().then(function (e) {return e ? Promise.resolve() : r.signInAnonymously();}).then(function () {if ( true && t.debugInfo) {var _t$debugInfo = t.debugInfo,_e22 = _t$debugInfo.address,_s4 = _t$debugInfo.servePort;return function () {var _ref22 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee31(e, t) {var s, _n8, _r4;return _regenerator.default.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:_n8 = 0;case 1:if (!(_n8 < e.length)) {_context31.next = 11;break;}_r4 = e[_n8];_context31.next = 5;return We(_r4, t);case 5:if (!_context31.sent) {_context31.next = 8;break;}s = _r4;return _context31.abrupt("break", 11);case 8:_n8++;_context31.next = 1;break;case 11:return _context31.abrupt("return", { address: s, port: t });case 12:case "end":return _context31.stop();}}}, _callee31);}));return function (_x32, _x33) {return _ref22.apply(this, arguments);};}()(_e22, _s4);}return Promise.resolve();}).then(function () {var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref23.address,s = _ref23.port;if (e) t.localAddress = e, t.localPort = s;else if (t.debugInfo) {var _e23 =  false ? undefined : "warn",_s5 = console[_e23];"remote" === t.debugInfo.initialLaunchType ? (t.debugInfo.forceRemote = !0, _s5("当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试")) : _s5("无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试");}}).then(function () {return function () {if (true) return;if (uni.getStorageSync("__LAST_DCLOUD_APPID") === h.appid) return;uni.setStorageSync("__LAST_DCLOUD_APPID", h.appid), uni.removeStorageSync("uni_id_token") && (console.warn("检测到当前项目与上次运行到此端口的项目不一致，自动清理uni-id保存的token信息（仅开发调试时生效）"), uni.removeStorageSync("uni_id_token"), uni.removeStorageSync("uni_id_token_expired"));}(), new Promise(function (e) { false ? (undefined) : setTimeout(function () {d = uni.getSystemInfoSync().platform, l = uni.getStorageSync("__DC_CLOUD_UUID") || f(32), e();}, 0);});}).then(function () {t.isReady = !0;}), Le(t), function (e) {var t = e.uploadFile;e.uploadFile = function (e) {var _this18 = this;var s;return s = this.isReady ? Promise.resolve() : this.initUniCloud, s.then(function () {return t.call(_this18, e);});};var s = e.uploadFile;e.uploadFile = function (e) {return o(s).call(this, e);};}(t), function (e) {e.database = function () {if (this._database) return this._database;var t = {},s = {};var n = /*#__PURE__*/function () {function n(e, t, s) {_classCallCheck(this, n);this.content = e, this.prevStage = t, this.actionName = s;}_createClass(n, [{ key: "toJSON", value: function toJSON() {var e = this;var t = [e.content];for (; e.prevStage;) {e = e.prevStage, t.push(e.content);}return { $db: t.reverse().map(function (e) {return { $method: e.$method, $param: e.$param };}) };} }, { key: "get", value: function get() {return this._send("get", Array.from(arguments));} }, { key: "add", value: function add() {return this._send("add", Array.from(arguments));} }, { key: "remove", value: function remove() {return this._send("remove", Array.from(arguments));} }, { key: "update", value: function update() {return this._send("update", Array.from(arguments));} }, { key: "end", value: function end() {return this._send("end", Array.from(arguments));} }, { key: "set", value: function set() {throw new Error("clientDB禁止使用set方法");} }, { key: "_send", value: function _send(n, r) {var o = this.toJSON();return o.$db.push({ $method: n, $param: r }), e.callFunction({ name: "DCloud-clientDB", data: { action: this.actionName, command: o } }).then(function (e) {var _e$result = e.result,n = _e$result.code,r = _e$result.message,o = _e$result.token,i = _e$result.tokenExpired,_e$result$systemInfo = _e$result.systemInfo,a = _e$result$systemInfo === void 0 ? [] : _e$result$systemInfo;if (a) for (var _e24 = 0; _e24 < a.length; _e24++) {var _a$_e = a[_e24],_t11 = _a$_e.level,_s6 = _a$_e.message,_n9 = _a$_e.detail,_r5 =  false ? undefined : _t11,_o3 = console[_r5] || console.log;var _i3 = "[System Info]" + _s6;_n9 && (_i3 = "".concat(_i3, "\n\u8BE6\u7EC6\u4FE1\u606F\uFF1A").concat(_n9)), _o3(_i3);}return n ? Promise.reject(new $e(r, n)) : (o && i && t.refreshToken && t.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });}), o && i && s.refreshToken && s.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });}), Promise.resolve(e));}).catch(function (e) {var t = new $e(e.message, e.code || "SYSTEM_ERROR");return s.error && s.error.forEach(function (e) {e(t);}), /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB"), Promise.reject(e);});} }, { key: "useAggregate", get: function get() {var e = this,t = !1;for (; e.prevStage;) {e = e.prevStage;var _s7 = e.content.$method;if ("aggregate" === _s7 || "pipeline" === _s7) {t = !0;break;}}return t;} }, { key: "count", get: function get() {if (!this.useAggregate) return function () {return this._send("count", Array.from(arguments));};var e = this;return function () {return i({ $method: "count", $param: Ke(Array.from(arguments)) }, e, e.actionName);};} }]);return n;}();var r = ["db.Geo", "db.command", "command.aggregate"];function o(e, t) {return r.indexOf("".concat(e, ".").concat(t)) > -1;}function i(e, t, s) {return Me(new n(e, t, s), { get: function get(e, t) {var n = "db";return e && e.content && (n = e.content.$method), o(n, t) ? i({ $method: t }, e, s) : function () {return i({ $method: t, $param: Ke(Array.from(arguments)) }, e, s);};} });}function a(_ref24) {var e = _ref24.path,t = _ref24.method;return /*#__PURE__*/function () {function _class3() {_classCallCheck(this, _class3);this.param = Array.from(arguments);}_createClass(_class3, [{ key: "toJSON", value: function toJSON() {return { $newDb: [].concat(_toConsumableArray(e.map(function (e) {return { $method: e };})), [{ $method: t, $param: this.param }]) };} }]);return _class3;}();}var c = { auth: { on: function on(e, s) {t[e] = t[e] || [], t[e].indexOf(s) > -1 || t[e].push(s);}, off: function off(e, s) {t[e] = t[e] || [];var n = t[e].indexOf(s);-1 !== n && t[e].splice(n, 1);} }, on: function on(e, t) {s[e] = s[e] || [], s[e].indexOf(t) > -1 || s[e].push(t);}, off: function off(e, t) {s[e] = s[e] || [];var n = s[e].indexOf(t);-1 !== n && s[e].splice(n, 1);}, env: Me({}, { get: function get(e, t) {return { $env: t };} }), action: function action(e) {return Me({}, { get: function get(t, s) {return o("db", s) ? i({ $method: s }, null, e) : function () {return i({ $method: s, $param: Ke(Array.from(arguments)) }, null, e);};} });}, Geo: Me({}, { get: function get(e, t) {return a({ path: ["Geo"], method: t });} }), getCloudEnv: function getCloudEnv(e) {if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");return { $env: e.replace("$cloudEnv_", "") };}, get serverDate() {return a({ path: [], method: "serverDate" });}, get RegExp() {return a({ path: [], method: "RegExp" });} },u = Me(c, { get: function get(e, t) {return o("db", t) ? i({ $method: t }) : function () {return i({ $method: t, $param: Ke(Array.from(arguments)) });};} });return this._database = u, u;};}(t), function (e) {e.getCurrentUserInfo = je, e.chooseAndUploadFile = o(Be.initChooseAndUploadFile(e));}(t), t.init = this.init, t;} }]);return _class2;}())();(function () {{var e = {};if (1 === [].length) e = [][0], Ve = Ve.init(e);else {var _e25 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo"],t = [].length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间";_e25.forEach(function (e) {Ve[e] = function () {return console.error(t), Promise.reject(new i({ code: "SYS_ERR", message: t }));};});}Object.assign(Ve, { get mixinDatacom() {return e = Ve, { props: { localdata: { type: Array, default: function _default() {return [];} }, options: { type: [Object, Array], default: function _default() {return {};} }, collection: { type: String, default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: !1 }, gettree: { type: [Boolean, String], default: !1 }, gettreepath: { type: [Boolean, String], default: !1 }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: !1 }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: !1 } }, data: function data() {return { mixinDatacomLoading: !1, mixinDatacomHasMore: !1, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} };}, created: function created() {var _this19 = this;this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(function () {var e = [];return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {e.push(_this19[t]);}), e;}, function (e, t) {if (_this19.loadtime === He) return;var s = !1;var n = [];for (var _r6 = 2; _r6 < e.length; _r6++) {e[_r6] !== t[_r6] && (n.push(e[_r6]), s = !0);}e[0] !== t[0] && (_this19.mixinDatacomPage.current = _this19.pageCurrent), _this19.mixinDatacomPage.size = _this19.pageSize, _this19.onMixinDatacomPropsChange(s, n);});}, methods: { onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {}, mixinDatacomEasyGet: function mixinDatacomEasyGet() {var _this20 = this;var _ref25 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref25$getone = _ref25.getone,e = _ref25$getone === void 0 ? !1 : _ref25$getone,t = _ref25.success,s = _ref25.fail;this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (s) {_this20.mixinDatacomLoading = !1;var _s$result = s.result,n = _s$result.data,r = _s$result.count;_this20.getcount && (_this20.mixinDatacomPage.count = r), _this20.mixinDatacomHasMore = n.length < _this20.pageSize;var o = e ? n.length ? n[0] : void 0 : n;_this20.mixinDatacomResData = o, t && t(o);}).catch(function (e) {_this20.mixinDatacomLoading = !1, _this20.mixinDatacomErrorMessage = e, s && s(e);}));}, mixinDatacomGet: function mixinDatacomGet() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var s = e.database();var n = t.action || this.action;n && (s = s.action(n));var r = t.collection || this.collection;s = s.collection(r);var o = t.where || this.where;o && Object.keys(o).length && (s = s.where(o));var i = t.field || this.field;i && (s = s.field(i));var a = t.foreignKey || this.foreignKey;a && (s = s.foreignKey(a));var c = t.groupby || this.groupby;c && (s = s.groupBy(c));var u = t.groupField || this.groupField;u && (s = s.groupField(u)), !0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (s = s.distinct());var h = t.orderby || this.orderby;h && (s = s.orderBy(h));var l = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,d = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,f = void 0 !== t.getcount ? t.getcount : this.getcount,p = void 0 !== t.gettree ? t.gettree : this.gettree,g = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,m = { getCount: f },y = { limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel, startWith: void 0 !== t.startwith ? t.startwith : this.startwith };return p && (m.getTree = y), g && (m.getTreePath = y), s = s.skip(d * (l - 1)).limit(d).get(m), s;} } };var e;} });}})();var ze = Ve;var _default2 = ze;exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../../../node-libs-browser/mock/process.js */ 335)))

/***/ }),

/***/ 335:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 336);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 336:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 335)))

/***/ }),

/***/ 337:
/*!**************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.esm.js ***!
  \**************************************************************/
/*! exports provided: I18n, initVueI18n */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(uni) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I18n", function() { return I18n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initVueI18n", function() { return initVueI18n; });
const isObject = (val) => val !== null && typeof val === 'object';
class BaseFormatter {
    constructor() {
        this._caches = Object.create(null);
    }
    interpolate(message, values) {
        if (!values) {
            return [message];
        }
        let tokens = this._caches[message];
        if (!tokens) {
            tokens = parse(message);
            this._caches[message] = tokens;
        }
        return compile(tokens, values);
    }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format) {
    const tokens = [];
    let position = 0;
    let text = '';
    while (position < format.length) {
        let char = format[position++];
        if (char === '{') {
            if (text) {
                tokens.push({ type: 'text', value: text });
            }
            text = '';
            let sub = '';
            char = format[position++];
            while (char !== undefined && char !== '}') {
                sub += char;
                char = format[position++];
            }
            const isClosed = char === '}';
            const type = RE_TOKEN_LIST_VALUE.test(sub)
                ? 'list'
                : isClosed && RE_TOKEN_NAMED_VALUE.test(sub)
                    ? 'named'
                    : 'unknown';
            tokens.push({ value: sub, type });
        }
        else if (char === '%') {
            // when found rails i18n syntax, skip text capture
            if (format[position] !== '{') {
                text += char;
            }
        }
        else {
            text += char;
        }
    }
    text && tokens.push({ type: 'text', value: text });
    return tokens;
}
function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values)
        ? 'list'
        : isObject(values)
            ? 'named'
            : 'unknown';
    if (mode === 'unknown') {
        return compiled;
    }
    while (index < tokens.length) {
        const token = tokens[index];
        switch (token.type) {
            case 'text':
                compiled.push(token.value);
                break;
            case 'list':
                compiled.push(values[parseInt(token.value, 10)]);
                break;
            case 'named':
                if (mode === 'named') {
                    compiled.push(values[token.value]);
                }
                else {
                    if (true) {
                        console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
                    }
                }
                break;
            case 'unknown':
                if (true) {
                    console.warn(`Detect 'unknown' type of token!`);
                }
                break;
        }
        index++;
    }
    return compiled;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
    if (!locale) {
        return;
    }
    locale = locale.trim().replace(/_/g, '-');
    if (messages[locale]) {
        return locale;
    }
    locale = locale.toLowerCase();
    if (locale.indexOf('zh') === 0) {
        if (locale.indexOf('-hans') !== -1) {
            return 'zh-Hans';
        }
        if (locale.indexOf('-hant') !== -1) {
            return 'zh-Hant';
        }
        if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
            return 'zh-Hant';
        }
        return 'zh-Hans';
    }
    const lang = startsWith(locale, ['en', 'fr', 'es']);
    if (lang) {
        return lang;
    }
}
class I18n {
    constructor({ locale, fallbackLocale, messages, watcher, formater, }) {
        this.locale = 'en';
        this.fallbackLocale = 'en';
        this.message = {};
        this.messages = {};
        this.watchers = [];
        if (fallbackLocale) {
            this.fallbackLocale = fallbackLocale;
        }
        this.formater = formater || defaultFormatter;
        this.messages = messages;
        this.setLocale(locale);
        if (watcher) {
            this.watchLocale(watcher);
        }
    }
    setLocale(locale) {
        const oldLocale = this.locale;
        this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
        this.message = this.messages[this.locale];
        this.watchers.forEach((watcher) => {
            watcher(this.locale, oldLocale);
        });
    }
    getLocale() {
        return this.locale;
    }
    watchLocale(fn) {
        const index = this.watchers.push(fn) - 1;
        return () => {
            this.watchers.splice(index, 1);
        };
    }
    t(key, locale, values) {
        let message = this.message;
        if (typeof locale === 'string') {
            locale = normalizeLocale(locale, this.messages);
            locale && (message = this.messages[locale]);
        }
        else {
            values = locale;
        }
        if (!hasOwn(message, key)) {
            console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
            return key;
        }
        return this.formater.interpolate(message[key], values).join('');
    }
}

function initLocaleWatcher(appVm, i18n) {
    appVm.$i18n &&
        appVm.$i18n.vm.$watch('locale', (newLocale) => {
            i18n.setLocale(newLocale);
        }, {
            immediate: true,
        });
}
function getDefaultLocale() {
    if (typeof navigator !== 'undefined') {
        return navigator.userLanguage || navigator.language;
    }
    if (typeof plus !== 'undefined') {
        // TODO 待调整为最新的获取语言代码
        return plus.os.language;
    }
    return uni.getSystemInfoSync().language;
}
function initVueI18n(messages, fallbackLocale = 'en', locale) {
    const i18n = new I18n({
        locale: locale || fallbackLocale,
        fallbackLocale,
        messages,
    });
    let t = (key, values) => {
        if (typeof getApp !== 'function') {
            // app-plus view
            /* eslint-disable no-func-assign */
            t = function (key, values) {
                return i18n.t(key, values);
            };
        }
        else {
            const appVm = getApp().$vm;
            if (!appVm.$t || !appVm.$i18n) {
                if (!locale) {
                    i18n.setLocale(getDefaultLocale());
                }
                /* eslint-disable no-func-assign */
                t = function (key, values) {
                    return i18n.t(key, values);
                };
            }
            else {
                initLocaleWatcher(appVm, i18n);
                /* eslint-disable no-func-assign */
                t = function (key, values) {
                    const $i18n = appVm.$i18n;
                    const silentTranslationWarn = $i18n.silentTranslationWarn;
                    $i18n.silentTranslationWarn = true;
                    const msg = appVm.$t(key, values);
                    $i18n.silentTranslationWarn = silentTranslationWarn;
                    if (msg !== key) {
                        return msg;
                    }
                    return i18n.t(key, $i18n.locale, values);
                };
            }
        }
        return t(key, values);
    };
    return {
        t(key, values) {
            return t(key, values);
        },
        getLocale() {
            return i18n.getLocale();
        },
        setLocale(newLocale) {
            return i18n.setLocale(newLocale);
        },
        mixin: {
            beforeCreate() {
                const unwatch = i18n.watchLocale(() => {
                    this.$forceUpdate();
                });
                this.$once('hook:beforeDestroy', function () {
                    unwatch();
                });
            },
            methods: {
                $$t(key, values) {
                    return t(key, values);
                },
            },
        },
    };
}



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 338:
/*!*************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/pages.json?{"type":"stat"} ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__39CFF30" };exports.default = _default;

/***/ }),

/***/ 339:
/*!*******************************************************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/uni_modules/uni-file-picker/components/uni-file-picker/choose-and-upload-file.js ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, uniCloud) {

Object.defineProperty(exports, '__esModule', { value: true });

var ERR_MSG_OK = 'chooseAndUploadFile:ok';
var ERR_MSG_FAIL = 'chooseAndUploadFile:fail';
function chooseImage(opts) {var
  count = opts.count,sizeType = opts.sizeType,sourceType = opts.sourceType,extension = opts.extension;
  return new Promise(function (resolve, reject) {
    uni.chooseImage({
      count: count,
      sizeType: sizeType,
      sourceType: sourceType,
      extension: extension,
      success: function success(res) {
        resolve(normalizeChooseAndUploadFileRes(res, 'image'));
      },
      fail: function fail(res) {
        reject({
          errMsg: res.errMsg.replace('chooseImage:fail', ERR_MSG_FAIL) });

      } });

  });
}
function chooseVideo(opts) {var
  camera = opts.camera,compressed = opts.compressed,maxDuration = opts.maxDuration,sourceType = opts.sourceType,extension = opts.extension;
  return new Promise(function (resolve, reject) {
    uni.chooseVideo({
      camera: camera,
      compressed: compressed,
      maxDuration: maxDuration,
      sourceType: sourceType,
      extension: extension,
      success: function success(res) {var
        tempFilePath = res.tempFilePath,duration = res.duration,size = res.size,height = res.height,width = res.width;
        resolve(normalizeChooseAndUploadFileRes({
          errMsg: 'chooseVideo:ok',
          tempFilePaths: [tempFilePath],
          tempFiles: [
          {
            name: res.tempFile && res.tempFile.name || '',
            path: tempFilePath,
            size: size,
            type: res.tempFile && res.tempFile.type || '',
            width: width,
            height: height,
            duration: duration,
            fileType: 'video',
            cloudPath: '' }] },


        'video'));
      },
      fail: function fail(res) {
        reject({
          errMsg: res.errMsg.replace('chooseVideo:fail', ERR_MSG_FAIL) });

      } });

  });
}
function chooseAll(opts) {var
  count = opts.count,extension = opts.extension;
  return new Promise(function (resolve, reject) {
    var chooseFile = uni.chooseFile;
    if (typeof wx !== 'undefined' &&
    typeof wx.chooseMessageFile === 'function') {
      chooseFile = wx.chooseMessageFile;
    }
    if (typeof chooseFile !== 'function') {
      return reject({
        errMsg: ERR_MSG_FAIL + ' 请指定 type 类型，该平台仅支持选择 image 或 video。' });

    }
    chooseFile({
      type: 'all',
      count: count,
      extension: extension,
      success: function success(res) {
        resolve(normalizeChooseAndUploadFileRes(res));
      },
      fail: function fail(res) {
        reject({
          errMsg: res.errMsg.replace('chooseFile:fail', ERR_MSG_FAIL) });

      } });

  });
}
function normalizeChooseAndUploadFileRes(res, fileType) {
  res.tempFiles.forEach(function (item, index) {
    if (!item.name) {
      item.name = item.path.substring(item.path.lastIndexOf('/') + 1);
    }
    if (fileType) {
      item.fileType = fileType;
    }
    item.cloudPath =
    Date.now() + '_' + index + item.name.substring(item.name.lastIndexOf('.'));
  });
  // wx.chooseMessageFile
  if (!res.tempFilePaths) {
    res.tempFilePaths = res.tempFiles.map(function (file) {return file.path;});
  }
  return res;
}
function uploadCloudFiles(res) {var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;var _onUploadProgress = arguments.length > 2 ? arguments[2] : undefined;
  res = Object.assign({}, res);
  res.errMsg = ERR_MSG_OK;
  var files = res.tempFiles;
  var len = files.length;
  var count = 0;
  return new Promise(function (resolve) {
    while (count < max) {
      next();
    }
    function next() {
      var cur = count++;
      if (cur >= len) {
        !files.find(function (item) {return !item.url && !item.errMsg;}) && resolve(res);
        return;
      }
      var fileItem = files[cur];
      uniCloud.
      uploadFile({
        filePath: fileItem.path,
        cloudPath: fileItem.cloudPath,
        fileType: fileItem.fileType,
        onUploadProgress: function onUploadProgress(res) {
          res.index = cur;
          res.tempFile = fileItem;
          res.tempFilePath = fileItem.path;
          _onUploadProgress &&
          _onUploadProgress(res);
        } }).

      then(function (res) {
        fileItem.url = res.fileID;
        if (cur < len) {
          next();
        }
      }).
      catch(function (res) {
        // fileItem.errMsg = res.message;
        fileItem.errMsg = res.errMsg || res.message;
        if (cur < len) {
          next();
        }
      });
    }
  });
}
function uploadFiles(choosePromise, _ref) {var onChooseFile = _ref.onChooseFile,onUploadProgress = _ref.onUploadProgress;
  return choosePromise.
  then(function (res) {
    if (onChooseFile) {
      var customChooseRes = onChooseFile(res);
      if (typeof customChooseRes !== 'undefined') {
        return Promise.resolve(customChooseRes).then(function (chooseRes) {return typeof chooseRes === 'undefined' ? res : chooseRes;});
      }
    }
    return res;
  }).
  then(function (res) {
    if (res === false) {
      return {
        errMsg: ERR_MSG_OK,
        tempFilePaths: [],
        tempFiles: [] };

    }
    return uploadCloudFiles(res, 5, onUploadProgress);
  });
}
function chooseAndUploadFile() {var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: 'all' };
  if (opts.type === 'image') {
    return uploadFiles(chooseImage(opts), opts);
  } else
  if (opts.type === 'video') {
    return uploadFiles(chooseVideo(opts), opts);
  }
  return uploadFiles(chooseAll(opts), opts);
}

exports.chooseAndUploadFile = chooseAndUploadFile;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 334)["default"]))

/***/ }),

/***/ 35:
/*!***************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/mixins/common.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 36));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} /*********************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 混入-其他公共方法
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   *********************************************************************/var _default =

{
  data: function data() {
    return {};


  },
  computed: {},
  methods: {
    // 获取节点尺寸信息
    getDom: function getDom(className) {var _arguments = arguments,_this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var isAll, result;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:isAll = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : true;_context.next = 3;return (
                  _this.$uniTools.getDom(_this, className, isAll));case 3:result = _context.sent;return _context.abrupt("return",
                result);case 5:case "end":return _context.stop();}}}, _callee);}))();
    },
    // 获取时间戳
    getTimeStamp: function getTimeStamp() {
      return +new Date();
    },
    // 页面跳转
    jumpPage: function jumpPage(url, params) {
      this.$uniTools.navigateTo({ url: url, params: params });
    } } };exports.default = _default;

/***/ }),

/***/ 354:
/*!**********************************************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/uni_modules/uni-transition/components/uni-transition/createAnimation.js ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.createAnimation = createAnimation;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} // const defaultOption = {
// 	duration: 300,
// 	timingFunction: 'linear',
// 	delay: 0,
// 	transformOrigin: '50% 50% 0'
// }
var


MPAnimation = /*#__PURE__*/function () {
  function MPAnimation(options, _this) {_classCallCheck(this, MPAnimation);
    this.options = options;
    this.animation = uni.createAnimation(options);
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;

  }_createClass(MPAnimation, [{ key: "_nvuePushAnimates", value: function _nvuePushAnimates(

    type, args) {
      var aniObj = this.currentStepAnimates[this.next];
      var styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {} };

      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = '';
        }
        var unit = '';
        if (type === 'rotate') {
          unit = 'deg';
        }
        styles.styles.transform += "".concat(type, "(").concat(args + unit, ") ");
      } else {
        styles.styles[type] = "".concat(args);
      }
      this.currentStepAnimates[this.next] = styles;
    } }, { key: "_animateRun", value: function _animateRun()
    {var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ref = this.$.$refs['ani'].ref;
      if (!ref) return;
      return new Promise(function (resolve, reject) {
        nvueAnimation.transition(ref, _objectSpread({
          styles: styles },
        config),
        function (res) {
          resolve();
        });
      });
    } }, { key: "_nvueNextAnimate", value: function _nvueNextAnimate(

    animates) {var _this2 = this;var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var fn = arguments.length > 2 ? arguments[2] : undefined;
      var obj = animates[step];
      if (obj) {var

        styles =

        obj.styles,config = obj.config;
        this._animateRun(styles, config).then(function () {
          step += 1;
          _this2._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === 'function' && fn();
        this.isEnd = true;
      }
    } }, { key: "step", value: function step()

    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.animation.step(config);






      return this;
    } }, { key: "run", value: function run(

    fn) {

      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(function () {
        typeof fn === 'function' && fn();
      }, this.$.durationTime);








    } }]);return MPAnimation;}();



var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d',
'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY',
'translateZ'];

var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {var _this$animation;

    (_this$animation = this.animation)[type].apply(_this$animation, arguments);




    return this;
  };
});

function createAnimation(option, _this) {
  if (!_this) return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 36:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 37);

/***/ }),

/***/ 37:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 38);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 38:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 4:
/*!*********************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/pages.json ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 81:
/*!********************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/common/components/popup/common.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  props: {
    nodeId: {
      type: Number,
      default: 0 } },


  watch: {
    nodeId: function nodeId(newVal) {
      if (!!newVal) {
        this.open();
      } else {
        this.close();
      }
    } },

  methods: {
    open: function open() {
      this.$refs.popup.open();
    },
    close: function close() {
      this.$refs.popup.close();
    } } };exports.default = _default;

/***/ }),

/***/ 94:
/*!***************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/apis sync ^.+(?<!index)\.js$ ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./login.js": 95,
	"./url.config.js": 110
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 94;

/***/ }),

/***/ 95:
/*!************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/apis/login.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var ajax = _interopRequireWildcard(__webpack_require__(/*! @/utils/request.js */ 96));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var _default =

{
  login: function login(params) {return ajax.post('/wx/login', params);},
  refreshToken: function refreshToken(params) {return ajax.post('/wx/refreshToken', params);},
  loginPhone: function loginPhone(params) {return ajax.post('/wx/loginPhone', params);},

  homeGetLimitList: function homeGetLimitList(params) {return ajax.get('/wx/home/limit/list', params);},
  homeGetGroupList: function homeGetGroupList(params) {return ajax.get('/wx/home/group/list', params);},
  homeGetGoodsList: function homeGetGoodsList(params) {return ajax.post('/wx/home/goods/list', params, { showLoading: false });},
  homeGetGoodsDeatil: function homeGetGoodsDeatil(params) {return ajax.post('/wx/home/goods/detail', params);},

  classificationGetClassList: function classificationGetClassList(params) {return ajax.get('/wx/classification/tab/list', params);},
  classificationGetList: function classificationGetList(params) {return ajax.post('/wx/classification/list', params);},

  getList: function getList(params, taskCallBack) {return ajax.post('/plat/net', params, { isTask: true, taskCallBack: taskCallBack });},
  addTask: function addTask(params) {return ajax.get('/plat/cabinet', params);},
  fileUpload: function fileUpload(params) {return ajax.upload('/upload', params);},
  fileDownLoad: function fileDownLoad(params) {return ajax.download('/download', params, {});} };exports.default = _default;

/***/ }),

/***/ 96:
/*!***************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/utils/request.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.download = exports.upload = exports.put = exports.del = exports.post = exports.get = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 36));



var _index = _interopRequireDefault(__webpack_require__(/*! @/plugins/luch-request/luch-request/index.js */ 97));
var UrlConfig = _interopRequireWildcard(__webpack_require__(/*! @/apis/url.config.js */ 110));
var _index2 = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 11));
var _uniTools = _interopRequireDefault(__webpack_require__(/*! ./uniTools.js */ 12));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var request = new _index.default();
var TIME_OUT = 20 * 1000;
var MESSAGE = {
  NETWORK_ERR: '哎哟,出问题啦,刷新界面试试！',
  PERMISSION_DENIED: '凭证失效，请重新登录',
  NETWORK_REFUSE: '服务器拒绝连接或连接超时' };


// 请求拦截器
request.interceptors.request.use(function (config) {
  return config;
}, function (config) {
  return Promise.reject(config);
});

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 去除response的data层 直接使用数据就可以res.xx即可
  return response.data;
}, function (response) {
  return Promise.reject(response);
});

// 获取请求地址
var getUrl = function getUrl(url) {var urlPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'BASE_URL';
  return !!url ? "".concat(UrlConfig[urlPrefix]).concat(url) : '';
};

// 根据header里的contenteType转换请求参数
var transformRequestData = function transformRequestData(requestConfig) {var _ref =
  [requestConfig.contentType, requestConfig.params],contentType = _ref[0],requestData = _ref[1];
  if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
    // formData格式：key1=value1&key2=value2；uni-app不支持new FormData();
    var str = "";
    for (var key in requestData) {
      if (requestData.hasOwnProperty(key)) {
        str += "".concat(key, "=").concat(requestData[key], "&");
      }
    }
    return encodeURI(str.slice(0, str.length - 1));
  } else {
    // json字符串{key: value}
    return !!Object.keys(requestData).length ? JSON.stringify(requestData) : '';
  }
};

// 构建请求头
var buildReqHeader = function buildReqHeader(requestConfig) {
  var token = 'FHJSHFJASKHFLA';
  requestConfig.contentType = requestConfig.contentType || "application/json;charset=utf-8";
  return {
    "Content-Type": requestConfig.contentType,
    "Authorization": token };

};

// 构建请求配置
var buildRequestConfig = function buildRequestConfig(requestConfig) {
  var config = {};
  config.header = buildReqHeader(requestConfig);
  /** 
                                                  * 方法只能是大写--GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE|UPLOAD|DOWNLOAD
                                                  * UPLOAD: 实际是contentType为multipart/form-data的post请求, 可以获取文件上传的各种进度,
                                                  * DOWNLOAD: 实际是GET请求, 可以获取文件下载的各种进度
                                                  */
  config.method = requestConfig.method;
  // 请求接口地址
  config.url = /^(http|https):/g.test(requestConfig.url) ? requestConfig.url : getUrl(requestConfig.url, requestConfig.urlPrefix);
  // 请求参数
  if (config.method === 'UPLOAD') {
    // 文件上传参数
    config.filePath = requestConfig.params.filePath;
    config.formData = requestConfig.params;
    delete config.formData.filePath;
    config.name = 'file';
  } else {
    config[/GET|DELETE|DOWNLOAD/.test(config.method) ? 'params' : 'data'] = transformRequestData(requestConfig);
  }

  // 请求超时时间
  config.timeout = TIME_OUT;





  // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
  config.custom = {}; // 可以加一些自定义参数，在拦截器等地方使用。











  // requestTask: 返回当前请求的task, options。请勿在此处修改options。--可以中断请求
  if (requestConfig.isTask) {
    config.getTask = function (task, options) {
      requestConfig.taskCallBack && typeof requestConfig.taskCallBack === 'function' && requestConfig.taskCallBack(task, options);
    };
  }

  return config;
};

// 发送请求
var sendRequest = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(requestConfig) {var config, result;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            config = buildRequestConfig(requestConfig);
            requestConfig.showLoading = typeof requestConfig.showLoading === 'undefined' ? true : requestConfig.showLoading;
            if (requestConfig.showLoading) _uniTools.default.showLoading();_context.next = 5;return (
              request.middleware(config).catch(function (e) {
                console.log("错误的请求:", e);
                var isTimeout = e.errMsg.indexOf('ECONNREFUSED') > -1 || e.errMsg.indexOf('TIMEOUT') > -1;
                return {
                  message: isTimeout ? MESSAGE.NETWORK_REFUSE : MESSAGE.NETWORK_ERR,
                  status: isTimeout ? 502 : 500 };

              }));case 5:result = _context.sent;
            if (requestConfig.showLoading) uni.hideLoading();if (
            result) {_context.next = 9;break;}return _context.abrupt("return",
            {
              message: MESSAGE.NETWORK_ERR,
              status: 500 });case 9:


            if (result.status === 401) {
              _uniTools.default.showToast({ title: MESSAGE.PERMISSION_DENIED }, function () {
                uni.clearStorageSync();
                _index2.default.commit('resetUserInfo');
                _uniTools.default.navigateTo({ url: '/pages/user/login' });
                return result;
              });
            }
            if (result.status >= 500 && result.status !== 502) result.message = result.message || MESSAGE.NETWORK_ERR;return _context.abrupt("return",
            result);case 12:case "end":return _context.stop();}}}, _callee);}));return function sendRequest(_x) {return _ref2.apply(this, arguments);};}();


// 文件下载
var downLoadEvt = function downLoadEvt(requestConfig, successCb, errorCb) {
  var url = /^(http|https):/g.test(requestConfig.url) ? requestConfig.url : getUrl(requestConfig.url, requestConfig.urlPrefix);
  if (!!Object.keys(requestConfig.params).length) {
    var str = '';
    for (var key in requestConfig.params) {
      str += "".concat(key, "=").concat(requestConfig.params[key], "&");
    }
    url = "".concat(url, "?").concat(str.slice(0, str.length - 1));
  }
  return uni.downloadFile({
    url: url,
    header: buildReqHeader(requestConfig),
    timeout: TIME_OUT,
    success: function success(res) {
      typeof successCb === 'function' && successCb(Object.assign(res, { status: res.statusCode }));
    },
    fail: function fail(err) {
      typeof errorCb === 'function' && errorCb({
        message: MESSAGE.NETWORK_ERR,
        status: 500 });

    } });

};

// 文件下载请求--根据successCb/errorCb判断是否有requestTask, 默认返回接口结果
var sendDownLoadReq = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(requestConfig) {var result;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!(
            requestConfig.successCb || requestConfig.errorCb)) {_context2.next = 4;break;}return _context2.abrupt("return",
            downLoadEvt(requestConfig, requestConfig.successCb, requestConfig.errorCb));case 4:_context2.next = 6;return (

              new Promise(function (resolve, reject) {
                downLoadEvt(requestConfig, resolve, reject);
              }));case 6:result = _context2.sent;return _context2.abrupt("return",
            result);case 8:case "end":return _context2.stop();}}}, _callee2);}));return function sendDownLoadReq(_x2) {return _ref3.apply(this, arguments);};}();



/** 
                                                                                                                                                                   * @description 请求方法封装  get/post/delete/put/upload/download
                                                                                                                                                                   * @param {String} url - 请求地址
                                                                                                                                                                   * @param {Object} params - 请求参数
                                                                                                                                                                   * @param {Object} config - 请求接口配置
                                                                                                                                                                   *        {Boolean} config.isTask - 该请求是否需要requestTask 
                                                                                                                                                                   *        {Function} config.taskCallBack - requestTask 的回调函数
                                                                                                                                                                   * 				{Function} config.successCb - 接口调用成功 的回调函数
                                                                                                                                                                   *        {Function} config.errorCb - 接口调用失败 的回调函数
                                                                                                                                                                   * 				{Boolean} config.showLoading - 该请求是否需要添加loading，默认true
                                                                                                                                                                   */
var get = function get(url) {var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};return sendRequest(_objectSpread({ method: 'GET', url: url, params: params }, config));};exports.get = get;
var post = function post(url) {var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};return sendRequest(_objectSpread({ method: 'POST', url: url, params: params }, config));};exports.post = post;
var del = function del(url) {var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};return sendRequest(_objectSpread({ method: 'DELETE', url: url, params: params }, config));};exports.del = del;
var put = function put(url) {var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};return sendRequest(_objectSpread({ method: 'PUT', url: url, params: params }, config));};
// App支持多文件上传，微信小程序只支持单文件上传，传多个文件需要反复调用本API。所以跨端的写法就是循环调用本API。端的不同，请求参数也不同
exports.put = put;var upload = function upload(url) {var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { contentType: 'multipart/form-data' };return sendRequest(_objectSpread({ method: 'UPLOAD', url: url, params: params }, config));};exports.upload = upload;
var download = function download(url) {var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};return sendDownLoadReq(_objectSpread({ method: 'DOWNLOAD', url: url, params: params }, config));};exports.download = download;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 97:
/*!*****************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/plugins/luch-request/luch-request/index.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 98));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
_Request.default;exports.default = _default;

/***/ }),

/***/ 98:
/*!************************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/plugins/luch-request/luch-request/core/Request.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













var _dispatchRequest = _interopRequireDefault(__webpack_require__(/*! ./dispatchRequest */ 99));
var _InterceptorManager = _interopRequireDefault(__webpack_require__(/*! ./InterceptorManager */ 107));
var _mergeConfig = _interopRequireDefault(__webpack_require__(/*! ./mergeConfig */ 108));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ 109));
var _utils = __webpack_require__(/*! ../utils */ 102);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

Request = /*#__PURE__*/function () {
  /**
                                     * @param {Object} arg - 全局配置
                                     * @param {String} arg.baseURL - 全局根路径
                                     * @param {Object} arg.header - 全局header
                                     * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
                                     * @param {String} arg.dataType = [json] - 全局默认的dataType
                                     * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。支付宝小程序不支持
                                     * @param {Object} arg.custom - 全局默认的自定义参数
                                     * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
                                     * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
                                     * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
                                     * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
                                     * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
                                     */
  function Request() {var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, Request);
    if (!(0, _utils.isPlainObject)(arg)) {
      arg = {};
      console.warn('设置全局参数必须接收一个Object');
    }
    this.config = _objectSpread(_objectSpread({}, _defaults.default), arg);
    this.interceptors = {
      request: new _InterceptorManager.default(),
      response: new _InterceptorManager.default() };

  }

  /**
     * @Function
     * @param {Request~setConfigCallback} f - 设置全局默认配置
     */_createClass(Request, [{ key: "setConfig", value: function setConfig(
    f) {
      this.config = f(this.config);
    } }, { key: "middleware", value: function middleware(

    config) {
      config = (0, _mergeConfig.default)(this.config, config);
      var chain = [_dispatchRequest.default, undefined];
      var promise = Promise.resolve(config);

      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });

      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    }

    /**
       * @Function
       * @param {Object} config - 请求配置项
       * @prop {String} options.url - 请求路径
       * @prop {Object} options.data - 请求参数
       * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
       * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
       * @prop {Object} [options.header = config.header] - 请求header
       * @prop {Object} [options.method = config.method] - 请求方法
       * @returns {Promise<unknown>}
       */ }, { key: "request", value: function request()
    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.middleware(config);
    } }, { key: "get", value: function get(

    url) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.middleware(_objectSpread({
        url: url,
        method: 'GET' },
      options));

    } }, { key: "post", value: function post(

    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'POST' },
      options));

    } }, { key: "put", value: function put(


    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'PUT' },
      options));

    } }, { key: "delete", value: function _delete(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE' },
      options));

    } }, { key: "connect", value: function connect(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT' },
      options));

    } }, { key: "head", value: function head(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD' },
      options));

    } }, { key: "options", value: function options(




    url, data) {var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS' },
      _options));

    } }, { key: "trace", value: function trace(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE' },
      options));

    } }, { key: "upload", value: function upload(



    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'UPLOAD';
      return this.middleware(config);
    } }, { key: "download", value: function download(

    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'DOWNLOAD';
      return this.middleware(config);
    } }]);return Request;}();



/**
                               * setConfig回调
                               * @return {Object} - 返回操作后的config
                               * @callback Request~setConfigCallback
                               * @param {Object} config - 全局默认config
                               */exports.default = Request;

/***/ }),

/***/ 99:
/*!********************************************************************************************************************************!*\
  !*** D:/webBC/YiYaYiYaHei/practice/weixin/ShoppingMall/ShoppingMall/plugins/luch-request/luch-request/core/dispatchRequest.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! ../adapters/index */ 100));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =


function _default(config) {
  return (0, _index.default)(config);
};exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map