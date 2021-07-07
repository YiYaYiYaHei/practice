<template>
	<label @click="clickRadio">
		<radio :checked="checkedValue" :disabled="disabled" :color="color"  :style="'transform:scale(' + scale + ')'" />
		<text>{{text}}</text>
	</label>
</template>

<script>
/**
 * @description 单选按钮
 * @param {String} text - 展示文本
 * @param {Boolean} value - 值 required(v-model)
 * @param {Boolean} disabled - 是否禁用
 * @param {String} color - 选中的颜色
 * @param {String | Number} scale - 单选按钮缩放大小 0.1-1
 * @example  <base-form-radio v-model="rememberPwd" text="30天内免登录"></base-form-radio>
 */
export default {
	props: {
		text: {
			type: String,
			default: ''
		},
		value: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		color: {
			type: String,
			default: '#0793dc'
		},
		scale: {
			type: [Number, String],
			default: '0.7'
		}
	},
	data() {
		return {
			checkedValue: this.value,  // this.value获取的是v-model的值
		}
	},
	methods: {
		clickRadio() {
			this.checkedValue = this.disabled ? this.checkedValue : !this.checkedValue;
			this.$emit('input', this.checkedValue);
		}
	}
}
</script>

<style lang="scss" scoped>
</style>
