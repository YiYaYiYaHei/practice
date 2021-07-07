/*********************************************************************
 * uni-app原生方法
 *********************************************************************/
 import Tool from './tools.js';
 
/** 
 * @description 消息提示框
 * @param {Object} obj - showToast配置项
 * @param {Function} successCb - showToast调用成功的回调函数
 * @param {Function} errorCb - showToast调用失败的回调函数
 */
const showToast = (obj = {}, successCb, errorCb) => {
	const title = obj.title || 'title不存在',                       // 提示的内容，长度与 icon 取值有关。
	      icon = obj.icon || 'none',                               // success: 显示成功图标，此时 title 文本最多显示 7 个汉字长度(默认值)   loading: 显示加载图标，此时 title 文本最多显示 7 个汉字长度。 none: 不显示图标，此时 title 文本在小程序最多可显示两行，App仅支持单行显示。
				image = obj.image || '',                                 // 自定义图标的本地路径
				mask = obj.mask || false,                                // 是否显示透明蒙层，防止触摸穿透，默认：false
				duration = obj.duration || 1500,                         // 提示的延迟时间，单位毫秒，默认：1500
				position = obj.position || 'center';                     // 值为top、center、bottom;纯文本轻提示显示位置，填写有效值后只有 title 属性生效， 
	uni.showToast({
	    title,
			icon,
			image,
			mask,
	    duration: 2000,
			position,
			success: function() {
				(typeof successCb === 'function') && successCb();
			},
			fail: function(err) {
				console.log('showToast接口异常，请联系管理员!', err);
				(typeof errorCb === 'function') && errorCb();
			},
	});
};

/** 
 * @description 显示 loading 提示框, 需主动调用 uni.hideLoading 才能关闭提示框。
 * @param {Object} obj - showLoading配置项
 * @param {Function} successCb - showLoading调用成功的回调函数
 * @param {Function} errorCb - showLoading调用失败的回调函数
 */
const showLoading = (obj = {}, successCb, errorCb) => {
	const title = obj.title || '加载中',                              // 提示的文字内容，显示在loading的下方
	      mask = obj.mask || true;                                   // 是否显示透明蒙层，防止触摸穿透
	uni.showLoading({
	  title: '加载中',
		mask,
		success: function() {
			(typeof successCb === 'function') && successCb();
		},
		fail: function(err) {
			console.log('showLoading接口异常，请联系管理员!', err);
			showToast({title: 'showLoading接口异常，请联系管理员!'});
			(typeof errorCb === 'function') && errorCb();
		},
	});
};

/** 
 * @description 显示模态弹窗(alert、confirm)--根据端的不同，确认和取消按钮存在位置差异
 * @param {Object} obj - showModal配置项
 * @param {Function} successCb - showModal调用成功的回调函数(“确定”按钮 返回 “确定”, “取消”按钮 返回 “取消”)
 * @param {Function} errorCb - showModal调用失败的回调函数
 */
const showModal = (obj = {}, successCb, errorCb) => {
	const title = obj.hasOwnProperty('title') ? obj.title : '提示',                                  // 提示的标题
	      content = obj.content || '内容',                              // 提示的内容
				showCancel = obj.hasOwnProperty('showCancel') ? obj.showCancel : true,                          // 是否显示取消按钮
				cancelText = obj.cancelText || '取消',                        // 取消按钮的文字，最多 4 个字符
				cancelColor = obj.cancelColor || '#000000',                   // 取消按钮的文字颜色
				confirmText = obj.confirmText || '确定',                      // 确定按钮的文字，最多 4 个字符
				confirmColor = obj.confirmColor || '#3CC51F';                 // 确定按钮的文字颜色
	uni.showModal({
		title,
		content,
		showCancel,
		cancelText,
		cancelColor,
		confirmText,
		confirmColor,
		success: function (res) {
			if (res.confirm) {
				// 用户点击确定
				(typeof successCb === 'function') && successCb('确定');
			} else if (res.cancel) {
				// 用户点击取消
				(typeof successCb === 'function') && successCb('取消');
			}
		},
		fail: function(err) {
			console.log('showModel接口异常，请联系管理员!', err);
			showToast({title: 'showModal接口异常，请联系管理员!'});
			(typeof errorCb === 'function') && errorCb();
		}
	});
};

/** 
 * @description 从底部向上弹出操作菜单
 * @param {Object} obj - showActionSheet配置项
 * @param {Function} successCb - showActionSheet调用成功的回调函数
 * @param {Function} errorCb - showActionSheet调用失败的回调函数
 */
const showActionSheet = (obj = {}, successCb, errorCb) => {
	const itemList = obj.itemList || [],                           // 按钮的文字数组Array<String>
	      itemColor = obj.itemColor || '#000000',                  // 按钮的文字颜色
				popover = obj.popover || {};                             // 大屏设备弹出原生选择按钮框的指示区域，默认居中显示(仅APP有效)
	uni.showActionSheet({
		itemList,
		itemColor,
		popover,
		success: function (res) {
			// {Number} res.tapIndex--用户点击的按钮，从上到下的顺序，从0开始
			(typeof successCb === 'function') && successCb(res.tapIndex);
		},
		fail: function(err) {
			console.log('showActionSheet接口异常，请联系管理员!', err);
			showToast({title: 'showActionSheet接口异常，请联系管理员!'});
			(typeof errorCb === 'function') && errorCb();
		},
	});
};

/** 
 * @description 路由跳转--在onLoad生命周期中可以获取参数(不能跳转到tabBar)
 * @param {Object} obj - navigateTo配置项
 * @param {Object} events - 页面间通信接口，用于监听被打开页面发送到当前页面的数据。2.8.9+ 开始支持。--跳转后的页面发数据给跳转前的页面
 * @param {Function} successCb - navigateTo调用成功的回调函数
 * @param {Function} errorCb - navigateTo调用失败的回调函数
 */
const navigateTo = (obj = {}, events = {}, successCb, errorCb) => {
	if (!obj.url) {
		showToast({title: 'url不存在'});
		return;
	}
	let _url = obj.url;
	// 拼接参数: /pages/index/index?a=1&b=2
	if (!!obj.params) {
		let str = '';
		for (let key in obj.params) {
			str += `${key}=${obj.params[key]}&`;
		}
		_url = `${_url}?${str.slice(0, str.length - 1)}`;
	}
	const url = _url,                                         // 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数
	      animationType = obj.animationType || 'pop-in',      // 窗口显示的动画效果
				animationDuration = obj.animationDuration || 300;   // 窗口动画持续时间，单位为 ms
	uni.navigateTo({
	    url,
			animationType,
			animationDuration,
			events,   // 跳转后的页面发数据给跳转前的页面
			success: function(res) {
				// 跳转成功后,可以获取上一页面通过eventChannel传送到当前页面的数据
				// url有长度限制，数据过长时，在successCb中调用 res.eventChannel.emit('事件名称', 参数) 来发送数据; 下一个页面使用this.getOpenerEventChannel().on监听
				(typeof successCb === 'function') && successCb(res);
			},
			fail: function(err) {
				console.log('navigateTo接口异常，请联系管理员!', err);
				showToast({title: 'navigateTo接口异常，请联系管理员!'});
				(typeof errorCb === 'function') && errorCb();
			},
	});
};

/** 
 * @description 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
 * @param {Object} obj - navigateBack配置项
 */
const navigateBack = (obj = {}) => {
	const delta = obj.delta || 1,                               // 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
				animationType = obj.animationType || 'pop-out',       // 窗口关闭的动画效果
				animationDuration = obj.animationDuration || 300;     // 窗口关闭动画的持续时间，单位为 ms
	uni.navigateBack({
	   delta,
		 animationType,
		 animationDuration
	});
}

/** 
 * @description 从本地相册选择图片或使用相机拍照
 * @param {Object} obj - 上传文件配置项
 * @param {Function} successCb - 上传图片成功的回调函数
 * @param {Function} errorCb - 上传图片失败的回调函数
 */
const chooseImage = (obj = {}, successCb, errorCb) => {
	const count = obj.count || 1,                                   // 最多可以选择的图片张数
	      sizeType = obj.sizeType || ['original', 'compressed'],    // original 原图，compressed 压缩图，默认二者都有
				sourceType = obj.sourceType || ['album', 'camera'];       // album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
	uni.chooseImage({
	    count,
	    sizeType,
	    sourceType,
	    success: function(res) {
				// 返回的tempFilePaths,可以使用image的src属性,将图片展示出来
				(typeof successCb === 'function') &&  successCb(res);
	    },
			fail: function(err) {
				console.log('chooseImage接口异常，请联系管理员!', err);
				showToast({title: 'chooseImage接口异常，请联系管理员!'});
				(typeof errorCb === 'function') &&  errorCb();
			}
	});
};

/** 
 * @description 保存文件到本地
 * @param {Object} tempFilePath - 需要保存的文件的临时路径
 * @param {Function} successCb - 文件保存成功的回调函数
 * @param {Function} errorCb - 文件保存失败的回调函数
 */
const saveFile = (tempFilePath, successCb, errorCb) => {
	if (!tempFilePath) showToast({title: '文件的临时路径不存在'});
	uni.saveFile({
		tempFilePath: tempFilePath,
		success: function(res) {
			// 返回文件的保存路径
			console.log("savePath:", res.savedFilePath, res);
			(typeof successCb === 'function') && successCb(res.savedFilePath);
		},
		error: function(err) {
			console.log('saveFile接口异常，请联系管理员!', err);
			showToast({title: 'saveFile接口异常，请联系管理员!'});
			(typeof errorCb === 'function') && errorCb();
		}
	});
}

/** 
 * @description 获取节点基本信息(uni-app不能对节点进行增删改查操作，目前只能获取到位置信息，子组件的节点需要通过refs来调用getDom方法)
 * @param {Object} _this - 组件this
 * @param {Function} className - 选择器：.box，  #box，  .box>a，   .box a，  .box>>>a，.box,a
 * @param {Function} isAll - 是否选择获取所有节点
 * @example let result = await this.$refs.baseHeaderLayout.getDom('#baseContentScrollBox', false);
 */
const getDom = (_this, className, isAll = true) => {
	const query = uni.createSelectorQuery().in(_this);
	return new Promise((resolve, reject) => {
		const dom = isAll ? query.selectAll(className) : query.select(className);
		dom.boundingClientRect(function(res){
			if ((Tool.getDataType(res, Array) && res.length) || Tool.getDataType(res, Object)) {
				resolve({status: 'success', data: res});
			} else {
				showToast({title: `未获取到${className}节点信息`});
				resolve({status: 'error', message: `未获取到${className}节点信息`});
			}
		}).exec();
	});
}

/** 
 * @description 带过期时间的存储（无法自动删除，需手动调用判断）
 * @param {String} key - 存储key（只传key时，表示判断是否过期）
 * @param {String} value - 存储value
 * @param {Number} seconds - 过期时间（单位秒）
 */
const setStorage = (key, value, seconds) => {
	if (!key) {
		showToast({title: 'key不存在!'});
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
		uni.setStorageSync(key, `${value}|${expire}`);
	}
}

/** 
 * @description 预览图片
 * @param {Object} obj - previewImage配置项
 * @param {Function} successCb - errorCb接口调用成功的回调函数
 * @param {Function} errorCb - errorCb接口调用失败的回调函数
 * @param {Boolean} isCustomizeLong - 是否自定义长按事件(使用plus.nativeUI.previewImage可以实现自定义长按事件，仅限APP)
 */
const previewImage = (obj = {}, successCb, errorCb, isCustomizeLong = false) => {
	if (!obj.hasOwnProperty('current')) {
		showToast({title: 'current不存在!'});
		return;
	}
	if (!obj.urls) {
		showToast({title: 'urls不存在!'});
		return;
	}
	if (obj.urls.constructor !== Array) {
		showToast({title: 'urls类型为数组!'});
		return;
	}
	const current = obj.current,                                    // current 为当前显示图片的链接/索引值，不填或填写的值无效则为 urls 的第一张
	      urls = obj.urls,                                          // 需要预览的图片链接列表
				indicator = obj.indicator || 'none',                      // 图片指示器样式，可取值："default" - 底部圆点指示器； "number" - 顶部数字指示器； "none" - 不显示指示器。
				loop = obj.loop || false,                                 // 是否可循环预览，默认值为 false
				longPressActions = obj.longPressActions || {};            // 长按图片显示操作菜单
	if (!isCustomizeLong) {
		uni.previewImage({
			current,
			urls,
			indicator,
			loop,
			// longPressActions：长按图片显示操作菜单，如不填默认为保存相册(实践证明，微信小程序不管有没有longPressActions参数，都有长按功能)
			longPressActions: {
				itemList: ['发送给朋友', '保存图片', '收藏'],  // 实践证明，itemList参数没啥用，微信小程序有自己的想法，不管你改不改，它都坚定自个儿~
				success: function(data) {
					console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				},
				fail: function(err) {
					console.log(err.errMsg);
				}
			},
			success: function() {
				(typeof successCb === 'function') && successCb();
			},
			error: function(err) {
				console.log('previewImage接口异常:', err);
				showToast({title: 'previewImage接口异常，请联系管理员!'});
				(typeof errorCb === 'function') && errorCb();
			}
		});
	} else {
		// 小程序及 H5 等平台是没有 HTML5+ 扩展规范的，使用plus会报plus未定义
		// #ifdef APP-PLUS
		plus.nativeUI.previewImage(urls, {
			current,
			indicator,
			loop,
			onLongPress: function(e){	// 预览界面长按显示ActionSheet
				console.log('onLongPress: '+JSON.stringify(e));
				var bts=[{title:"警告",style:"destructive"},{title:"按钮1"},{title:"按钮2"},{title:"按钮3"}];
				plus.nativeUI.actionSheet({title:"ActionSheet标题",cancel:"取消",buttons:bts},
					function(e){
						console.log( "选择了\""+((e.index>0)?bts[e.index-1].title:"取消")+"\"");
					}
				);
			}
		});
		// #endif
	}
}

/** 
 * @description 模拟a标签的锚点链接
 * @param {String} className - css选择器：.box，  #box，  .box>a，   .box a，  .box>>>a，.box,a
 * @param {String|Object} pDom - 父节点css选择器 | 父节点位置信息
 */
const jumpId = (className, pDom) => {
	uni.createSelectorQuery().select(className).boundingClientRect((res) => {
		let scrollTop = res.top;
		let flag = true;
		if (typeof pDom === 'object') {
			flag = true;
			scrollTop = res.top - pDom.top;
		} else if(typeof pDom === 'string') {
			flag = false;
			uni.createSelectorQuery().select(pDom).boundingClientRect(data => { // 父节点位置信息
				uni.pageScrollTo({
					duration: 100,                 //过渡时间
					scrollTop: res.top - data.top  //到达距离顶部的top值
				});
			}).exec();
		}
		if (flag) {
			uni.pageScrollTo({
				duration: 300,         //过渡时间
				scrollTop: scrollTop   //到达距离顶部的top值
	　　});
		}
	}).exec();
}

export default {
	showToast,
	showLoading,
	showModal,
	showActionSheet,
	navigateTo,
	navigateBack,
	chooseImage,
	saveFile,
	getDom,
	setStorage,
	previewImage,
	jumpId
}