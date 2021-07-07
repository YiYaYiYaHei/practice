<template>
	<view class="full vertical-m">
		<image src="/static/images/user/login.jpeg" class="login-bg-img full" mode="aspectFill"></image>
		
		<!-- 导航栏占位 -->
		<!-- <view class="uni-custom"></view> -->
		
		<view class="uni-custom-content">
			<button class="btn-large" data-status-box="success" open-type="getUserInfo" @getuserinfo="getUserInfo">
				<view>微信登录</view>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',   // 微信临时登录凭证
				userInfo: {},   // 微信用户基本信息
			}
		},
		onLoad(params) {
			/**
			 * 获取微信临时登录凭证-需要将code传递给后端,从而获取到用户唯一标识openid(用户的openid是通过用户使用wx.login发送到服务器端，再从服务器端发送wx服务器拿到openid) 和 sessionKey
			 * 由于在回调中调用uni.login,可能会刷新登录态,即此时服务器端使用code获取到的sessionKey不是加密时使用的sessionKey,导致解密失败
			 * 因此建议先提前获取code 或者 使用checkSession进行登录验证,避免login刷新登录态
			 */
			const _this = this;
			uni.login({
				provider: 'weixin',
				success: function (loginRes) {
					if (loginRes.errMsg == "login:ok") {
						_this.code = loginRes.code;
					} else {
						_this.$uniTools.showToast({title: '系统异常，请联系管理员!'});
					}
				}
			})
		},
		methods: {
			// 微信授权登录
			getUserInfo(e) {
				const _this = this;
				const getSetting = this.getSetting();
				getSetting.then((isUserAuth) => {
					if (isUserAuth) {
						// 获取用户信息--用户未授权时调用，会直接执行fail
						uni.getUserInfo({
							provider: 'weixin',
							success: (infoRes) => {
								_this.userInfo = infoRes.userInfo;
								_this.loginEvt();
							},
							fail: () => {
								_this.$uniTools.showToast({title:"获取用户信息失败"});
							}
						});
					} else {
						_this.$uniTools.showToast({
							title: '授权失败，请确认授权已开启',
							mask: true
						});
					}
				});
			},
			// 获取用户的当前设置
			getSetting() {
				return new Promise((resolve, reject) => {
					uni.getSetting({
						success: function(res) {
							if (res.authSetting['scope.userInfo']) {
								resolve(true);
							} else {
								resolve(false);
							}
						},
						fail: () => {
							this.$uniTools.showToast({title: 'getSetting接口异常，请联系管理员!'});
						}
					});
				}).catch((e) => {
					console.log('getSetting接口异常:', e);
				});
			},
			// 执行登录操作,获取openid 和 sessionKey
			async loginEvt() {
				let result = await this.$apis.login.login({code: this.code, userInfo: this.userInfo});
				if (result.status === 200) {
					uni.setStorageSync('current_login_user_token', result.data.token);
					uni.setStorageSync('login_info', JSON.stringify({code: this.code, ...result.data}));
					this.$store.dispatch('setUserInfo', result.data);
					// 若有用户权限操作，存储完跳转至对应页面即可;
					uni.switchTab({
						url: '/pages/home/index'
					});
				} else {
					this.$uniTools.showToast({title: result.message});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-bg {
		background: url('~@/static/images/user/login.jpeg') center center / 100% 100% no-repeat;
		// background-size: cover;
	}
	.login-bg-img {
		@include pos(0, null, null, 0);
	}
	.btn-large {
		@include pos(null, null, 200rpx, 50%);
		transform: translateX(-50%);
		>view {
			font-size: $uni-font-size-lg;
			@include line-height(80rpx);
			&:before {
				content: '';
				width: 32rpx;
				height: 32rpx;
				background: url('~@/static/images/user/weixin.png') center center / 100% 100% no-repeat;
				@include pos(50%, null, null, 180rpx);
				transform: translateY(-50%);
			}
		}
	}
</style>
