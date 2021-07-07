<template>
	<view class="base-progress-bar__outer">
		<view class="base-progress-bar__inner" :style="{'width': percentage + 'px', 'background': bgColor}"></view>
		<text class="base-progress-bar__text">{{showText === '' ? percentage + '%' : showText}}</text>
	</view>
</template>

<script>
/**
 * @description 进度条
 * @param {Number} percentage - 百分比
 * @param {String} bgColor - 背景色
 * @param {String} showText - 文字内容
 * @example  <base-progress :percentage="30" showText="10人成团"></base-progress>
 */
	export default {
		props: {
			percentage: {
				type: Number,
				default: 0
			},
			bgColor: {
				type: String,
				default: '#12A550'
			},
			showText: {
				type: String,
				default: ''
			},
		}
	}
</script>

<style lang="scss" scoped>
	.base-progress-bar__outer {
		position: relative;
		width: 100%;
		height: 32rpx;
		background: #7AD5B5;
		border-radius: 8px;
		margin: 10rpx 0;;
	}
	.base-progress-bar__inner {
		width: 50%;
		height: 100%;
		border-radius: 8px;
	}
	.base-progress-bar__text {
		@include pos(50%, null, null, 50%);
		transform: translate(-50%, -50%);
		color: white;
		font-size: 20rpx;
	}
</style>
