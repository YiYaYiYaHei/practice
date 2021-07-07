<template>
	<view class="full vertical-m">
		<!-- 导航栏占位 -->
		<!-- <view class="uni-custom"></view> -->
		
		<image class="start-bg-img full" src="/static/images/user/start.gif" mode="center"></image>
	</view>
</template>

<script>
	import user from '../../mixins/user.js';
	export default {
		mixins: [user],
		data() {
			return {}
		},
		onLoad(params) {
			// 页面加载--版本更新监听
			this.updateApp(this.initUserInfo); 
		},
		methods: {
			// 初始化用户信息
			async initUserInfo() {
				// 如果有tonken,则更新用户信息
				if (this.token) {
					// 调用更新token接口,若有用户权限操作，更新完跳转至对应页面即可
					let loginInfo = JSON.parse(uni.getStorageSync('login_info') || '{}');
					if (!loginInfo.openId) {
						uni.reLaunch({
							url: '/pages/login/login'
						});
						return;
					}
					let result = await this.$apis.login.refreshToken({openId: loginInfo.openId});
					if (result.status === 200) {
						uni.setStorageSync('current_login_user_token', result.data.token);
						// 若有用户权限操作，存储完跳转至对应页面即可;
						uni.switchTab({
							url: '/pages/home/index'
						});
					} else {
						this.$uniTools.showToast({title: result.message});
					}
				} else {
					// reLaunch--关闭所有页面，打开到应用内的某个页面。
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.start-bg-img {
		@include pos(0, null, null, 0);
	}
</style>
