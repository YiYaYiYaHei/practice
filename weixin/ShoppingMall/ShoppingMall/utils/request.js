/*********************************************************************
 * ajax使用的是luch-request---https://www.quanzhan.co/luch-request/guide/3.x
 *********************************************************************/

import Request from '@/plugins/luch-request/luch-request/index.js';
import * as UrlConfig from '@/apis/url.config.js';
import store from '@/store/index.js';
import uniTools from './uniTools.js';

const request = new Request();
const TIME_OUT = 20 * 1000;
const MESSAGE = {
	NETWORK_ERR: '哎哟,出问题啦,刷新界面试试！',
	PERMISSION_DENIED: '凭证失效，请重新登录',
	NETWORK_REFUSE: '服务器拒绝连接或连接超时'
}

// 请求拦截器
request.interceptors.request.use((config) => {
  return config;
}, config => {
  return Promise.reject(config)
});

// 响应拦截器
request.interceptors.response.use((response) => {
	// 去除response的data层 直接使用数据就可以res.xx即可
	return response.data;
}, (response) => {
  return Promise.reject(response)
});

// 获取请求地址
const getUrl = (url, urlPrefix = 'BASE_URL') => {
	return !!url ? `${UrlConfig[urlPrefix]}${url}` : '';
}

// 根据header里的contenteType转换请求参数
const transformRequestData = (requestConfig) => {
	let [contentType, requestData] = [requestConfig.contentType, requestConfig.params];
	if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
		// formData格式：key1=value1&key2=value2；uni-app不支持new FormData();
		let str = "";
		for (let key in requestData) {
			if (requestData.hasOwnProperty(key)) {
				str += `${key}=${requestData[key]}&`;
			}
		}
		return encodeURI(str.slice(0, str.length - 1));
	} else {
		// json字符串{key: value}
		return !!Object.keys(requestData).length ? JSON.stringify(requestData) : '';
	}
}

// 构建请求头
const buildReqHeader = (requestConfig) => {
	const token = 'FHJSHFJASKHFLA';
	requestConfig.contentType = requestConfig.contentType || "application/json;charset=utf-8";
	return {
		"Content-Type": requestConfig.contentType,
		"Authorization": token
	};
}

// 构建请求配置
const buildRequestConfig = (requestConfig) => {
	const config = {};
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

	// #ifdef APP-PLUS
	config.firstIpv4 = false; // DNS解析时优先使用ipv4 仅 App-Android 支持 (HBuilderX 2.8.0+)
	// #endif

	// 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
	config.custom = {}; // 可以加一些自定义参数，在拦截器等地方使用。

	// #ifdef APP-PLUS
	// 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
	config.sslVerify = true;
	// #endif

	// #ifdef H5
	// 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
	config.withCredentials = false;
	// #endif

	// requestTask: 返回当前请求的task, options。请勿在此处修改options。--可以中断请求
	if (requestConfig.isTask) {
		config.getTask = (task, options) => {
			requestConfig.taskCallBack && (typeof requestConfig.taskCallBack === 'function') && requestConfig.taskCallBack(task, options);
		};
	}

	return config;
}

// 发送请求
const sendRequest = async (requestConfig) => {
	const config = buildRequestConfig(requestConfig);
	requestConfig.showLoading = typeof requestConfig.showLoading === 'undefined' ? true : requestConfig.showLoading;
	if (requestConfig.showLoading) uniTools.showLoading();
	let result = await request.middleware(config).catch(e => {
		console.log("错误的请求:", e);
		const isTimeout = e.errMsg.indexOf('ECONNREFUSED') > -1 || e.errMsg.indexOf('TIMEOUT') > -1;
		return {
			message: isTimeout ? MESSAGE.NETWORK_REFUSE : MESSAGE.NETWORK_ERR,
			status: isTimeout ? 502 : 500
		}
	});
	if (requestConfig.showLoading) uni.hideLoading();
	if (!result) {
		return {
			message: MESSAGE.NETWORK_ERR,
			status: 500
		};
	}
	if (result.status === 401) {
		uniTools.showToast({title: MESSAGE.PERMISSION_DENIED}, () => {
			uni.clearStorageSync();
			store.commit('resetUserInfo');
			uniTools.navigateTo({url: '/pages/user/login'});
			return result;
		});
	}
	if (result.status >= 500 && result.status !== 502) result.message = result.message || MESSAGE.NETWORK_ERR;
	return result;
}

// 文件下载
const downLoadEvt = (requestConfig, successCb, errorCb) => {
	let url = /^(http|https):/g.test(requestConfig.url) ? requestConfig.url : getUrl(requestConfig.url, requestConfig.urlPrefix);
	if (!!Object.keys(requestConfig.params).length) {
		let str = '';
		for (let key in requestConfig.params) {
				str += `${key}=${requestConfig.params[key]}&`;
		}
		url = `${url}?${str.slice(0, str.length - 1)}`;
	}
	return uni.downloadFile({
		url: url,
		header: buildReqHeader(requestConfig),
		timeout: TIME_OUT,
		success: (res) => {
			typeof successCb === 'function' && successCb(Object.assign(res, {status: res.statusCode}));
		},
		fail: (err) => {
			typeof errorCb === 'function' && errorCb({
				message: MESSAGE.NETWORK_ERR,
				status: 500
			});
		}
	});
}

// 文件下载请求--根据successCb/errorCb判断是否有requestTask, 默认返回接口结果
const sendDownLoadReq = async (requestConfig) => {
	if (requestConfig.successCb || requestConfig.errorCb) {
		return downLoadEvt(requestConfig, requestConfig.successCb, requestConfig.errorCb);
	} else {
		const result = await new Promise((resolve, reject) => {
			downLoadEvt(requestConfig, resolve, reject);
		});
		return result;
	}
}

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
const get = (url, params = {}, config = {}) => sendRequest({method: 'GET', url: url, params: params, ...config});
const post = (url, params = {}, config = {}) => sendRequest({method: 'POST', url: url, params: params, ...config});
const del = (url, params = {}, config = {}) => sendRequest({method: 'DELETE', url: url, params: params, ...config});
const put = (url, params = {}, config = {}) => sendRequest({method: 'PUT', url: url, params: params, ...config});
// App支持多文件上传，微信小程序只支持单文件上传，传多个文件需要反复调用本API。所以跨端的写法就是循环调用本API。端的不同，请求参数也不同
const upload = (url, params = {}, config = {contentType: 'multipart/form-data'}) => sendRequest({method: 'UPLOAD', url: url, params: params, ...config});
const download = (url, params = {}, config = {}) => sendDownLoadReq({method: 'DOWNLOAD', url: url, params: params, ...config});

export {
	get,
	post,
	del,
	put,
	upload,
	download
};