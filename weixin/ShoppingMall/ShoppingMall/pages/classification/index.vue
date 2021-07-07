<template>
	<base-header-layout title="分类">
		<view class="classification-index-container full">
			<view class="classification-index-tab-box">
				<base-tab v-model="activeType" :options="tabList" tabPos="column"></base-tab>
			</view>
			
			<view class="classification-index-content-box"></view>
		</view>
	</base-header-layout>
</template>

<script>
	export default {
		data() {
			return {
				activeType: '热搜推荐',
				tabList: ['热搜推荐', '食品酒水', '生鲜果蔬','热搜推荐', '食品酒水', '生鲜果蔬','热搜推荐', '食品酒水', '生鲜果蔬','热搜推荐', '食品酒水', '生鲜果蔬','热搜推荐', '食品酒水', '生鲜果蔬','热搜推荐', '食品酒水', '生鲜果蔬' ]
			}
		},
		onLoad(params) {
			// 页面加载--获取路由参数
		},
		onPullDownRefresh() {
			// 监听用户下拉动作，一般用于下拉刷新
		},
		onReachBottom() {
			// 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.classification-index-container {
		@include flex;
		.classification-index-tab-box {
			width: calc(30% - 30rpx);
			height: 100%;
			margin-right: 30rpx;
			/deep/.base-tab-container {
				background-color: #F2F2F2;
				.base-tab-item {
					&.active {
						background-color: white;
					}
				}
			}
		}
		.classification-index-content-box {
			width: 70%;
			height: 100%;
		}
	}
</style>
