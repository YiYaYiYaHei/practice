<template>
	<view class="home-block-container wfull">
		<view class="home-block-title-box dinlineb fs-lg" @click="$emit('headerClick')">
			<text class="home-block-title" data-status-text="success">{{title}}</text>
			<slot name="header"></slot>
		</view>
		
		<view class="home-block-content">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {}
		},
		onLoad(params) {
			// 页面加载--获取路由参数
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.home-block-title-box {
		@include line-height(36rpx);
		@include flex(row, null, center);
		border-left: 10rpx solid $uni-color-success;
		padding-left: 20rpx;
		margin-bottom: 30rpx;
	}
	.home-block-title {
		margin-right: 50rpx;
	}
</style>
