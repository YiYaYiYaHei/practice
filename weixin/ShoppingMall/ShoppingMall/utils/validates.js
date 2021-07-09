/*********************************************************************
 * 自定义表单校验规则--异步校验
 * @param {Object} rule - 当前校验字段在 rules 中所对应的校验规则
 * @param {string} value - 当前校验字段的值
 * @param {Object} data - 所有校验字段的字段和值的对象
 * @param {Function} callback - 回调函数
 *********************************************************************/
import Tools from '@/utils/tools.js';
import Apis from '@/apis/login.js';

/**
 * @description 密码验证方法
 * @param {Object} rule - 当前校验字段在 rules 中所对应的校验规则
 * @param {string} rule.passwordType - 密码类型，一般是中文
 * @param {string} [rule.newPassword] - 新密码，一般确认密码才需要这个参数
 * @param {boolean} rule.required - 表示该密码是否必填
 */
const password = (rule, value, data, callback) => {
	console.log("密码校验:", rule)
  return new Promise((resolve, reject) => {
		// 密码不需要验证
		if (!rule.required) resolve();
		const newPassword = data.newPassword;
		const type = rule.passwordType = '密码';
		const ERROR_MSG = {
		  EMPTY: `请输入${type}`,
		  ILLEGAL: `${type}为8~20位大小写英文字母和数字（特殊字符可选）混合`,
		  NOT_REPEAT: '确认密码和新密码不同',
		  NOT_SAME: '两次输入密码不同'
		};
		if (!value) {
		  reject(new Error(ERROR_MSG.EMPTY));
		} else if (!Tools.isValidPassword(value, false)) {
		  reject(new Error(ERROR_MSG.ILLEGAL));
		} else if (type === '确认密码' && value !== newPassword) {
		  reject(new Error(ERROR_MSG.NOT_REPEAT));
		} else if (type === '重复密码' && value !== newPassword) {
		  reject(new Error(ERROR_MSG.NOT_SAME));
		} else {
		  resolve();
		}
	})
};

const userName = (rule, value, data, callback) => {
	return new Promise(async (resolve, reject) => {
		if (rule.required && !value) {
		  reject(new Error('请输入用户名'));
		} else if (value.trim() && !rule.isEdit) {
		  const result = await Apis.systemManage.checkUser(value);
		  if (!!result && result.status === 200 && result.data) {
		    reject(new Error('该用户名已存在'));
		  }
		}
		resolve();
	})
};

const phone = (rule, value, data, callback) => {
	return new Promise((resolve, reject) => {
		if (rule.required && !value) {
			reject(new Error('请输入手机号'));
		} else if (value && !Tools.isPhone(value)) {
		  reject(new Error('手机号格式有误'));
		} else {
		  resolve();
		}
	})
}

const ip = (rule, value, data, callback) => {
	return new Promise((resolve, reject) => {
		if (rule.required && !value) {
			reject(new Error('请输入IP'));
		} else if (value && !Tools.isIp(value)) {
		  reject(new Error('IP格式有误'));
		} else {
		  resolve();
		}
	})
}


export default {
  password,
  userName,
	phone,
	ip
};
