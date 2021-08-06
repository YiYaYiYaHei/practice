/*********************************************************************
 * 常用工具方法
 *********************************************************************/
import uniTools from './uniTools.js';

/**
 * 拿到指定路径下面的模块，减少index.js文件 require.context - dir reg 不能用变量
 * @param {string} name
 * @return {Object}
 */
const getModules = (name) => {
	let modulesFiles, dir, reg;
	switch(name) {
		case 'directives':
			modulesFiles = require.context('@/common/directives/', true, /^.+(?<!index)\.js$/);
			break;
		case 'components':
			modulesFiles = require.context('@/common/components/', true, /^.+(?<!index)\.(js|vue)$/);
			break;
		case 'apis':
			modulesFiles = require.context('@/apis/', true, /^.+(?<!index)\.js$/);
			break;
		case 'mixins':
			modulesFiles = require.context('@/mixins/', true, /^.+(?<!index)\.(js|vue)$/);
			break;
	}
	return modulesFiles.keys().reduce((modules, modulePath) => {
		const moduleName = modulePath.replace(/^\.\/(.+)\.(js|vue)$/, '$1');
		const value = modulesFiles(modulePath);
		value.default && (modules[moduleName] = value.default);
		return modules;
	}, {});
}

/**
 * @description 根据毫秒，获取时分秒
 * @param {Number} time
 * @return {String} 10:01:01
 * @example this.$util.formatTime(0)
 */
const formatTime = (time) => {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
};

/**
 * @description 格式化地理坐标
 * @param {String | Float} longitude
 * @param {String | Float} latitude
 * @return {Object} {longitude:Array,latitude:array}
 * @example this.$util.formatLocation(20.99,30.00) {longitude:[20,99],latitude:[30,00]}
 */
const formatLocation = (longitude, latitude) => {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
};

/**
 * @description 日期处理对象
 */
const dateUtils = {
		// 日期单位
		UNITS: {
			'年': 31557600000,  // 365天
			'月': 2629800000,   // 30天
			'天': 86400000,
			'小时': 3600000,
			'分钟': 60000,
			'秒': 1000
		},

		/**
		 * @description 计算目标时间与当前时间的时间差
		 * @param {String} targetDate - 目标时间 2021-06-18 15:00:00
		 * @param {String} currentDate - 当前时间 2021-06-17 15:00:00（默认当前时间Date.now()）
		 * @param {String} type - 返回类型 值为string / array
		 * @return {String | Array | NULL} '刚刚' / '0年0月2天23小时51分钟3秒前' / '1年1月2天23小时51分钟3秒后' / [1, 1, 2, 23, 51, 3] / null
		 * @example  this.$tools.dateUtils.humanize('2021-06-18 15:00:00')
		 */
		humanize: function(targetDate, currentDate, type ='string') {
			try {
				currentDate = currentDate || formatDate();

				// ios 系统上时间转换上不支持-，需要替换成/
				currentDate = currentDate.replace(/-/g, '/');
				targetDate = targetDate.replace(/-/g, '/');

				const [t_timeStamp, c_timeStamp] = [+new Date(targetDate), +new Date(currentDate)];
				let [diff_timeStamp, milliseconds] = [t_timeStamp - c_timeStamp, Math.abs(t_timeStamp - c_timeStamp)];
				const defaultStr = diff_timeStamp > 0 ? '后' : '前';
				var humanize = '';
				for (var key in this.UNITS) {
					humanize += milliseconds >= this.UNITS[key] ? Math.floor(milliseconds / this.UNITS[key]) + key : `0${key}`;
					if (milliseconds >= this.UNITS[key]) {
						milliseconds = milliseconds - (Math.floor(milliseconds / this.UNITS[key]) * this.UNITS[key]);
					}
				}
				humanize = type === 'array' ? humanize.match(/\d+/g) : humanize ? (humanize + defaultStr) : '刚刚';
				return humanize;
			} catch(e) {
				uniTools.showToast({title: '时间传参错误'});
			}
		},

		/**
		 * @description 格式化日期 yyyy-mm-dd HH:MM:ss 转为 yyyy/mm/dd-HH:MM
		 * @param {String} dateStr
		 * @return {String} "2019/10/14-10:10"
		 * @example  this.$tools.dateUtils.format("2019-10-14 10:10:10")
		 */
		format: function(dateStr) {
			var date = this.parse(dateStr)
			var diff = Date.now() - date.getTime();
			if (diff < this.UNITS['天']) {
				return this.humanize(diff);
			}
			var _format = function(number) {
				return (number < 10 ? ('0' + number) : number);
			};
			return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
				_format(date.getHours()) + ':' + _format(date.getMinutes());
		},

		//将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		parse: function(str) {
			var a = str.split(/[^0-9]/);
			return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
		}
};

/**
 * formatByteSize. 字节大小格式化
 * @param {(null|string|number)} byteSize - 字节大小
 * @return {string} 格式化后的值  例：2KB
 */
const formatByteSize = (byteSize) => {
  if (byteSize == null || byteSize === '' || !byteSize) {
    return '0B';
  }
  const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let index = 0;
  const srcSize = parseFloat(byteSize);
  index = Math.floor(Math.log(srcSize) / Math.log(1024));
  let size = srcSize / Math.pow(1024, index);
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
Date.prototype.format = (fmt, hasWeek = false) => {
  const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const o = {
    'M+': this.getMonth() + 1,
    'D+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    // 季度
    'q+': Math.floor((this.getMonth() + 3) / 3),
    // 毫秒
    S: this.getMilliseconds()
  };
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  }

  return fmt + (hasWeek ? '&nbsp;&nbsp;&nbsp;&nbsp;' + weekday[this.getDay()] : '');
};

/**
 * 日期格式化
 * @param {Date|number|string} val - Date实例或者是时间戳
 * @param {string} [type='YYYY-MM-DD hh:mm:ss'] - 日期格式
 * @param {number} [granularity=1] 分粒度 默认为1，若为10可能显示为 10:10 10:20等
 * @return {string} 格式化后的时间
 */
const formatDate = (val, type = 'YYYY-MM-DD hh:mm:ss', granularity = 1) => {
  const date = val instanceof Date ? val : new Date(/^[0-9]*$/g.test(val) ? val * 1 : Date.now());
  const YYYY = date.getFullYear() + '';
  const m = date.getMonth() + 1;
  const MM = m > 9 ? m + '' : '0' + m;
  const d = date.getDate();
  const DD = d > 9 ? d + '' : '0' + d;
  const h = date.getHours();
  const hh = h > 9 ? h + '' : '0' + h;
  const $m = Math.ceil(date.getMinutes() / granularity) * granularity;
  const mm = $m > 9 ? $m + '' : '0' + $m;
  const s = date.getSeconds();
  const ss = s > 9 ? s + '' : '0' + s;
  const obj = {
    YYYY,
    MM,
    DD,
    hh,
    mm,
    ss
  };

  return type.replace(/(YYYY)|(MM)|(DD)|(hh)|(mm)|(ss)/g, (key) => obj[key]);
};

/**
 * 数组转为字符串的展示
 * @param {Array} arr - 数组
 * @param {string} [sep=','] - 分隔符
 * @param {string} [emptyVal=''] - 数组为空时默认显示
 * @return {string} 转换后的字符串
 */
const arrayToString = (arr, sep = ',', emptyVal = '') => {
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
const setObjectKeyIsBooleanValue = (obj, keys, val) => {
  if (Array.isArray(keys)) {
    for (const name of keys) {
      obj[name] = val;
    }
  } else {
    obj[keys] = val;
  }
};

/**
 * 将对象中的属性值置空 （属性值目前只考虑 字符串、数组、对象）
 * @param {Object} obj - 需要处理的对象
 * @param {Object} opt - 额外的重置默认值
 */
const resetObject = (obj, opt = {}) => {
  for (const key in obj) {
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
const setObject = (target, source, isExtend = false) => {
  if (!target) return false;
  if (isExtend) return Object.assign(target, source);
  for (const key in target) {
    target[key] = source[key] === undefined ? target[key] : source[key];
  }
  return target;
};

/**
 * 判断对象是否为空对象
 * @param {Object} obj - 传入对象
 * @return {boolean} 返回对象是否为空对象
 */
const isEmptyObject = obj => {
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
const trimObject = (obj) => {
  const res = {};
  for (const name in obj) {
    res[name] = obj[name].trim();
  }
  return res;
};

/**
 * 用千分位表示数字 以','隔开
 * @param {number|string} x - 待转换的值
 * @return {string} 返回千分位表示的数字
 */
const numberWithCommas = (x) => {
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
const numberFixed = (val, fixedLen = 2, isCeil = true) => {
  if (isCeil) return parseFloat(val).toFixed(fixedLen);
  let str = val + '';
  const index = str.lastIndexOf('.') + 1;
  // 小数部分的长度
  const fractionalPartLen = str.length - index;
  if (index > 0) str = str.substring(0, index + fixedLen);
  if (fractionalPartLen < fixedLen) {
    str += '0'.repeat(fixedLen - fractionalPartLen);
  }
  return str;
};

/* 获取字符串长度 */
let getStringLength = (str) => {
  let num = 0;
  for (let it of str) {
    num += (/^[\u4e00-\u9fa5]+$/.test(it)) ? 2 : ['【', '】', '，', '：'].includes(it) ? 2 : 1;
  }
  return num;
};

/* 获取数据类型 , null 、undefined无constructor*/
let getDataType = (data, type) => {
	return data ? data.constructor === type : typeof data === type;
}

/**
 * 判断输入的密码格式是否正确（密码为8到20位的大小写字母、数字和特殊字符混合）
 * @param {string} pwd - 待判断密码
 * @param {boolean} [isMustSpecialChar = true] - 是否必须包含特殊字符
 * @return {boolean}
 */
const isValidPassword = (pwd, isMustSpecialChar = true) => {
  let count = 0;
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
const isPhone = (phone) => {
  const reg = /^1[3|4|5|8][0-9]\d{8}$/;
  return reg.test(phone);
};

/**
 * @feature 判断输入的邮箱（email）格式是否正确
 * @param {string} 123@qq.com
 * @return {boolean}
 */
const isEmail = str => {
  // eslint-disable-next-line
  // const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  // const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(str);
};

/**
 * 判断输入的字符串是否全英文
 * @param {string} str - 待判断的字符串
 * @return {boolean}
 */
let isEnglish = function (str) {
  return /[\u4e00-\u9fa5]/g.test(str);
};

/* 判断是否是正确的IP格式 192.136.23.6 */
let isIp = function (str) {
  let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return reg.test(str);
};

export {
	getModules
}

export default {
	formatTime,
	formatLocation,
	dateUtils,
	formatByteSize,
	formatDate,
	arrayToString,
	setObjectKeyIsBooleanValue,
	resetObject,
	setObject,
	isEmptyObject,
	trimObject,
	numberWithCommas,
	numberFixed,
	getStringLength,
	getDataType,
	isValidPassword,
	isPhone,
	isEmail,
	isEnglish,
	isIp
}
