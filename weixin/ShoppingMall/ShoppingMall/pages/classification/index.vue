<template>
	<base-header-layout title="分类" :hasDrawer="true">
		<view class="classification-index-container full">
			<view class="classification-index-tab-box">
				<base-tab v-model="activeType" :options="tabList" tabPos="column" valueKey="classificationId" label="classificationName"></base-tab>
			</view>
			
			<scroll-view scroll-y class="hfull scroll-view">
				<view class="classification-index-content-box wfull" v-for="item, i in classificationList" :key="item.label">
					<view class="title">{{item.label}}</view>
					<view class="content">
						<view class="content-item" v-for="it, j in item.value" :key="it.subClassificationId" @click="jumpPage('/pages/goods/list', {type: it.smallClassificationName})">
							<view class="image">
								<base-image :imgSrc="it.smallClassificationImg"></base-image>
							</view>
							<view class="title ellipsis">{{it.smallClassificationName}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</base-header-layout>
</template>

<script>
	import common from '@/mixins/common.js';
	export default {
		mixins: [common],
		data() {
			return {
				activeType: '',
				tabList: [],
				classificationList: []
			}
		},
		onLoad(params) {
			// 页面加载--获取路由参数
			this.getTablList();
		},
		onPullDownRefresh() {
			// 监听用户下拉动作，一般用于下拉刷新
		},
		onReachBottom() {
			// 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。
		},
		watch: {
			activeType: function(newVal) {
				newVal && this.getClassification();
			}
		},
		methods: {
			// 获取分类tab
			async getTablList() {
				let result = await this.$apis.login.classificationGetClassList();
				if (result.status === 200) {
					this.tabList = result.data || [];
					this.activeType = this.tabList.length ? this.tabList[0].classificationId : '';
					this.activeType && this.getClassification();
				} else {
					this.$uniTools.showToast({title: result.message});
				}
			},
			// 获取分类列表
			async getClassification() {
				let result = await this.$apis.login.classificationGetList({classificationId: this.activeType});
				if (result.status === 200) {
					this.classificationList = result.data;
				} else {
					this.$uniTools.showToast({title: result.message});
				}
			}
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
						.base-tab-item-text {
							color: $uni-color-success;
						}
					}
				}
			}
		}
	}
	.scroll-view {
		width: 70%;
		height: 100%;
		.classification-index-content-box {
			.title {
				@include line-height(72rpx);
				font-size: 14px;
				color: #8E8E8E;
			}
			.content {
				padding: 30rpx 30rpx 10rpx 30rpx;
				border: 1px solid #F2F2F2;
				border-radius: 5px 0 0 5px;
				.content-item {
					display: inline-block;
					vertical-align: middle;
					margin: 0 20rpx 20rpx 0;
					.image {
						width: 120rpx;
						height: 120rpx;
					}
					.title {
						width: 120rpx;
						text-align: center;
						color: $uni-text-color;
						@include line-height(52rpx);
					}
				}
			}
			&:nth-last-of-type(1) {
				margin-bottom: 20rpx;
			}
		}
	}
</style>
