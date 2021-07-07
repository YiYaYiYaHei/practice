<template>
	<view class="login-form-container full uni-padding-wrap">
		<uni-forms ref="form" v-model="formData" class="login-form full" label-width=0>
			<!-- 用户账号登录 -->
			<template v-if="formData.loginType === 'account_login'" name="password" >
				<uni-forms-item name="userName">
					<view class="login-form-item wfull">
						<uni-icons type="contact" class="login-form-item-icon"></uni-icons>
						<input v-model="formData.userName" 
								   type="text" 
									 placeholder="请输入用户名" 
									 class="uni-flex-item" 
									 @input="binddata('userName', $event.detail.value, 'form')"/>
					</view>
				</uni-forms-item>
				<uni-forms-item name="password">
					<view class="login-form-item wfull">
						<uni-icons type="locked" class="login-form-item-icon"></uni-icons>
						<input v-model="formData.password" 
						       type="text" 
									 :password="!showPwd" 
									 placeholder="请输入密码" 
									 class="uni-flex-item" 
									 @input="binddata('password', $event.detail.value, 'form')"/>
						<uni-icons type="eye" 
											 class="login-form-item-icon img-icon-eye" 
											 @click.native="this.showPwd = !this.showPwd"
											 :data-status-text="!!formData.password && showPwd ? '' : 'disabled'"></uni-icons>
					</view>
				</uni-forms-item>
			</template>
			
			<!-- 手机号验证码登录 -->
			<template v-else>
				<uni-forms-item name="phone">
					<view class="login-form-item wfull">
						<uni-icons type="phone" class="login-form-item-icon"></uni-icons>
						<input v-model="formData.phone" 
								   type="number" 
									 placeholder="请输入手机号" 
									 class="uni-flex-item" 
									 @input="binddata('phone', $event.detail.value, 'form')"/>
					</view>
				</uni-forms-item>
				<uni-forms-item name="verificationCode">
					<view class="login-form-item wfull">
						<input v-model="formData.verificationCode"
						       type="number" 
									 placeholder="请输入验证码" 
									 class="uni-flex-item" 
									 @input="binddata('verificationCode', $event.detail.value, 'form')"/>
						<text :data-status-text="verificationCodeData.codeBtnEnable ? 'disabled' : 'primary'" @click="formValidate(['phone'], sendVerificationCode)">{{verificationCodeData.codeTip}}</text>
					</view>
				</uni-forms-item>
			</template>
			
			<!-- 其他	-->
			<button type="primary"
			        @click="submitForm(loginEvt)" 
							class="wfull mgt50">登 录 必填校验</button>
			<button type="primary" 
			        @click="submitForm(loginEvt)" 
							class="wfull"
							:disabled="submitIsDisabled">登 录禁用</button>
			<view class="login-btn">
				<base-form-radio v-model="formData.rememberPwd" text="30天内免密登录"></base-form-radio>
				
				<view class="login-method" data-status-text="primary" @click="changeLoginType">
					<uni-icons :type="formData.loginType === 'account_login' ? 'locked' : 'phone'" class="login-method-icon"></uni-icons>
					{{ formData.loginType === 'account_login' ? '动态密码登录' : '账号密码登录' }}
				</view>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import form from '@/mixins/form.js';

	export default {
		mixins: [form],
		data() {
			return {
				showPwd: false,
				formData: {
					loginType: 'account_login',  // account_login账号密码  phone_login验证码
					userName: '',
					password: '',
					phone: '',
					verificationCode: '',  // 验证码
					rememberPwd: true    // 是否30天内免密登录
				},
				// 获取验证码
				verificationCodeData: {
					codeTip: '获取验证码',
					codeBtnEnable: false,  // 获取验证码按钮是否禁用
					timer: null,
					timeout: 60 // 验证码倒计时
				},
				formRule: {
					userName: {
						rules: [{ required: true, errorMessage: '请输入用户名'}]
					},
					password: {
						rules: [{ required: true, validateFunction: this.$validates.password, errorMessage: '请输入密码'}]
					},
					phone: {
						rules: [{ required: true, validateFunction: this.$validates.phone, errorMessage: '请输入手机号'}]
					},
					verificationCode: {
						rules: [{ required: true, errorMessage: '请输入验证码'}]
					}
				}
			};
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.formRule);
		},
		computed: {
			// 判断登录按钮是否禁用
			submitIsDisabled: function() {
				if (this.formData.loginType === 'account_login') {
					return !this.formData.userName || !this.formData.password;
				} else {
					return !this.formData.phone || !this.formData.verificationCode;
				}
			}
		},
		methods: {
			// 切换登录方式
			changeLoginType() {
				let loginType = this.formData.loginType === 'account_login' ? 'phone_login' : 'account_login';
				// 清除表单校验结果
				this.clearValidate(this.formRule);
				// 重置初始数据
				this.showPwd = false;
				this.formData = Object.assign(this.formData, this.$options.data().formData, {loginType: loginType});
				this.clearIntervalEvt();
			},
			// 登录提交
			async loginEvt() {
				let params = null;
				if (this.formData.loginType === 'phone_login') {
					// 手机号登录
					this.clearIntervalEvt();
					params = {
						phone: this.formData.phone,
						verificationCode: this.formData.verificationCode  // 固定验证码--0616
					};
				} else {
					// 账号登录
					params = {
						userName: this.formData.userName,
						password: this.formData.password
					};
				}
				let result = await this.$apis.login.loginPhone(params);
				if (result.status === 200) {
					if (this.formData.rememberPwd) {
						// 30天内免密登录
						this.$uniTools.setStorage('current_login_user_token', result.data.token, 3600 * 24 * 30);
						this.$store.dispatch('setUserInfo', result.data);
					} else {
						this.$store.dispatch('setUserInfo', result.data);
					}
					// 若有用户权限操作，存储完跳转至对应页面即可;
					uni.switchTab({
						url: '/pages/home/index'
					});
				} else {
					this.$uniTools.showToast({title: result.message});
				}
			},
			// 清除定时器事件
			clearIntervalEvt() {
				this.verificationCodeData.timer && clearInterval(this.verificationCodeData.timer);
				// 重置验证码数据
				this.verificationCodeData = Object.assign(this.verificationCodeData, this.$options.data().verificationCodeData);
			},
			// 获取手机号验证码
			sendVerificationCode() {
				if (this.verificationCodeData.codeBtnEnable) {
					return;
				}
				this.clearIntervalEvt();
				this.verificationCodeData.codeBtnEnable = true;
				this.verificationCodeData.codeTip = `${--this.verificationCodeData.timeout}s后重发`;
				this.verificationCodeData.timer = setInterval(() => {
					let timeout = this.verificationCodeData.timeout;
					timeout--;
					if (timeout < 1) {
						this.clearIntervalEvt();
						this.verificationCodeData.codeTip = '重新发送';
					} else {
						this.verificationCodeData.codeTip = `${timeout}s后重发`;
						this.verificationCodeData.timeout = timeout;
					}
				}, 1000);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.login-form-container {
		background-color: $uni-bg-color;
		.login-form {
			@include flex(column, center);
			.login-form-item {
				width: 100%;
				margin-bottom: 20rpx;
				@include flex(row, null, center);
				@include line-height(90rpx);
				@include border;
				/deep/.uni-forms-item__inner {
					padding-bottom: 0!important;
				}
				.login-form-item-icon {
					font-size: $uni-font-size-icon;
					margin-right: 20rpx;
					color: $uni-text-color-placeholder-light;
					&.img-icon-eye {
						width: 60rpx;
						margin-right: 0;
						color: $uni-color-primary;
					}
				}
			}
		}
	}
	.login-btn {
		@include flex(row, space-between, center);
	}
	button {
		height: 44px;
		@include statusBox($uni-color-primary);
		&[aria-disabled="true"] {
			background-color: $uni-color-primary-opcatity!important;
			border-color: $uni-color-primary-opcatity!important;
		}
	}
</style>
