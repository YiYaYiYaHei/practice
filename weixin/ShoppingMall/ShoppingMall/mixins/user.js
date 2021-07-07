/*********************************************************************
 * 混入-用户-公共方法
 *********************************************************************/
 
import {mapState, mapGetters} from 'vuex';
export default {
	data() {
		return {}
	},
	computed: {
		...mapState({
			openid: state => state.userInfo.openid,
			sessionKey: state => state.userInfo.sessionKey
		}),
		...mapGetters({
			token: 'getToken'
		})
	},
	methods: {
		// 判断APP版本是否过旧--小程序强制更新
		updateApp(cb) {
			// uni.canIUse: 判断应用的 API，回调，参数，组件等是否在当前版本可用。
			if (uni.canIUse('getUpdateManager')) {
				const updateManager = uni.getUpdateManager();
				
				// 请求完新版本信息的回调,无新版本，直接进入
				updateManager.onCheckForUpdate(function(res) {
					if (!res.hasUpdate) {
						cb(); // 刷新token，并进行相应的跳转
					}
				});
				
				const successCb = (res) => {
					// 成功的回调
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
					cb(); // 刷新token，并进行相应的跳转
				};
				
				// 当新版本下载完成，会进行回调
				updateManager.onUpdateReady(uRes => {
					this.$uniTools.showModel({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？'
					}, successCb, () => cb());
				});
			} else {
				cb();
			}
		}
	}
}
