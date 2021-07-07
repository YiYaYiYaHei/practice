<template>
	<view class="base-list-container full pr">
		<template v-if="loadMoreData.otherStatus !== 'error'">
			<!-- 列表内容 -->
			<slot></slot>
		</template>
		
		<template v-if="!loadMoreData.otherStatus">
			<!-- 加载更多 -->
			<uni-load-more :status="loadMoreData.status"
			               :iconSize="loadMoreData.iconSize"
										 :showIcon="loadMoreData.showIcon"
										 :iconType="loadMoreData.iconType"
										 :color="loadMoreData.color"
										 :contentText="loadMoreData.contentText"></uni-load-more>
		</template>
		<template v-else>
			<!-- 列表接口请求失败 -->
			<template v-if="loadMoreData.otherStatus === 'error'">
				<view class="load-more">
					<image src="/static/images/common/error.png" mode="aspectFit" class="empty-img"></image>
					<view @click="$emit('requestErrorReflash')" :style="{color: loadMoreData.color}" class="wfull text-center load-more-error">
						出错啦，点击我
						<text data-status-text="primary">刷新</text>
						哦~
					</view>
				</view>
			</template>
			<template v-else-if="loadMoreData.otherStatus === 'empty'">
				<!-- 列表接口数据为空 -->
				<view class="load-more">
					<image src="/static/images/common/no-data.png" mode="aspectFit" class="empty-img"></image>
					<text :style="{color: loadMoreData.color}" class="dinlineb wfull text-center load-more-empty">{{ emptyText }}</text>
				</view>
			</template>
		</template>
	</view>
</template>

<script>
/**
 * @description 列表上拉加载
 * @param {String} loadMoreData - 加载更多的参数
 * @param {String} emptyText - 列表数据为空时的提示文字
 * @example  <comp-list :listData="listData" :loadMoreData="loadMoreData" @requestErrorReflash="getList"></comp-list>
 * 使用说明:
 * 一、上拉加载
 * 1. 可以设置页面上拉触底事件触发时距页面底部距离： pages.json -> onReachBottomDistance（默认50px）
 * 2. 添加页面生命周期onReachBottom并手动调用this.reachBottomEvt();，在onLoad生命周期中，为this.requestListParams参数赋值并调用this.getList()
 * 二、下拉刷新
 * 1. 设置允许下拉刷新：pages.json -> "enablePullDownRefresh": true
 * 2. 添加页面生命周期onPullDownRefresh并手动调用this.refreshList('pullDownRefresh');
 */
	export default {
		props: {
			loadMoreData: {
				type: Object,
				default: () => {
					return {
						iconSize: 24,
						status: 'more',
						showIcon: true,
						iconType: 'auto',
						color: '#777777',
						contentText: {
							contentdown: "上拉显示更多",
							contentrefresh: "正在加载...",
							contentnomore: "没有更多数据了"
						},
						otherStatus: '',    // 其他状态：当otherStatus有值时，表示接口请求失败otherStatus=error/数据为空otherStatus=empty
					}
				}
			},
			emptyText: {
				type: String,
				default: '暂无内容哦~'
			},
		},
		data() {
			return {}
		},
		created() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.load-more-error,
	.load-more-empty {
		padding: 30rpx 0;
	}
	.load-more {
		@include pos(50%, null, null, 50%);
		transform: translate(-50%, -50%);
	}
	.empty-img {
		display: block;
		width: 450rpx;
		height: 200rpx;
		margin: 0 auto;
	}
</style>
