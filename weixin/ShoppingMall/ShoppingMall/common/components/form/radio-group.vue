<template>
	<view class="base-form-radio-group-container">
		<text class="base-form-radio-group-title dinlineb wfull" v-if="!!title">{{title}}</text>
		
		<template v-if="isObject">
			<!-- 对象形式 -->
			<radio-group class="base-form-radio-group-box">
				<label class="radio-box uni-list-cell-pd" v-for="(item, index) in options" :key="item[valueKey]" @click="getItem(item)">
					<view><radio :value="item[valueKey]" :checked="item[valueKey] === newVal"  :style="'transform:scale(' + scale + ')'" :disabled="item.disabled"/></view>
					<view class="label">{{ item[label] }}</view>
				</label>
			</radio-group>
		</template>
		
		<template v-else>
			<!-- 字符串形式 -->
			<radio-group class="base-form-radio-group-box">
				<label class="radio-box uni-list-cell-pd" v-for="(item, index) in options" :key="item" @click="getItem(item)">
					<view><radio :value="item" :checked="item === newVal"  :style="'transform:scale(' + scale + ')'" :disabled="item.disabled"/></view>
					<view class="label">{{ item }}</view>
				</label>
			</radio-group>
		</template>
		
	</view>
</template>

<script>
/**
 * @description 单选按钮组
 * @param {String} valueKey - radio的value值（默认为对象属性的value）
 * @param {String} label - 文本展示（默认为对象属性的label）
 * @param {Array | String} options - 单选按钮选项列表，可为对象数组/字符串数组：['111', '222', '333'] 或 [{label: '111', value: '1'}]
 * @param {String} title - 标题
 * @param {String} value - 值 required(v-model)
 * @param {String | Number} scale - 单选按钮缩放大小 0.1-1
 * @example  <base-form-radio-group v-model="addressData.data" :options="addressList"></base-form-radio-group>
 */
export default {
	props: {
		valueKey: {
			type: String,
			default: 'value'
		},
		label: {
			type: String,
			default: 'label'
		},
		options: {
			type: Array,
			default: () => []
		},
		title: {
			type: String,
			default: ''
		},
		value: {
			type: [Number, String, Boolean],
			default: ''
		},
		scale: {
			type: [Number, String],
			default: '0.7'
		}
	},
	computed: {
		isObject: function() {
			return !!this.options.length ? typeof this.options[0] === 'object' : false;
		}
	},
	data() {
		return {
			newVal: this.value
		}
	},
	methods: {
		getItem(item) {
			this.newVal = item.disabled ? this.newVal : this.isObject ? item[this.valueKey] : item;
			this.$emit('input', this.newVal);
		}
	}
};
</script>

<style lang="scss" scoped>
	.base-form-radio-group-title {
		font-size: $uni-font-size-sm;
		color: $uni-text-color-black;
		font-weight: 600;
	}
	.radio-box {
		@include border(bottom, 1px, $uni-bg-color-grey);
		@include flex(row, null, center);
		&:nth-last-of-type(1) {
			border-bottom: none;
		}
		.label {
			width: calc(100% -60rpx);
			word-wrap: break-word;
			font-size: $uni-font-size-sm;
		}
	}
</style>
