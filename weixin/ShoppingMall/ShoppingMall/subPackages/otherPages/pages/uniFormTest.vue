<template>
	<view class="full">
		<view class="pd20">
			<text class="uni-h4">表单校验</text>
			<uni-forms ref="form" :value="formData" :rules="rules">
				<uni-forms-item label="姓名" name="name" required>
					<uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名"/>
				</uni-forms-item>
				<uni-forms-item label="邮箱" name="email">
					<input class="input" v-model="formData.email" type="text" placeholder="请输入用户名" @input="binddata('email', $event.detail.value, 'form')" />
				</uni-forms-item>
				<button @click="submit">表单验证</button>
			</uni-forms>
			
			<uni-forms ref="form1" v-model="formData1" label-align="right">
				<uni-forms-item label="IP" name="IP" required>
					<uni-easyinput type="text" v-model="formData1.IP" placeholder="请输入IP"/>
				</uni-forms-item>
				<button @click="submit1">自定义校验规则验证</button>
				<button @click="$refs.form1.resetFields()">表单重置</button>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					name: 'LiMing',
					email: 'dcloud@email.com'
				},
				rules: {
					name: {
						rules: [
							{ required: true, errorMessage: '请输入姓名' }, 
							{ minLength: 3, maxLength: 5, errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符' },
						]
					},
					email: {
						rules: [{ required: true, format: 'email', errorMessage: '请输入正确的邮箱地址' }]
					}
				},
				formData1: {
					IP: ''
				},
				rules1: {
					IP: {
						rules: [{required: true, validateFunction: this.$validates.ip, errorMessage: '请输入IP'}]
					}
				}
			};
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form1.setRules(this.rules1);
		},
		methods: {
			// 触发提交表单
			submit() {
				this.$refs.form.submit().then(res => {
					console.log('表单数据信息：', res);
				}).catch(err => {
					console.log('表单错误信息：', err);
				});
			},
			submit1() {
				this.$refs.form1.submit().then(res => {
					console.log('表单数据信息1：', res);
				}).catch(err => {
					console.log('表单错误信息1：', err);
				});
			}
		}
	};
</script>

<style lang="scss" scoped></style>
