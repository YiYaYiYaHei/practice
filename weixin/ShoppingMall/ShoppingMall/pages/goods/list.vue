<template>
	<view class="goods-list-container full">
		<base-list :loadMoreData="loadMoreData"
							 @requestErrorReflash="getList">
			<uni-list>
				<uni-list-item v-for="(item, i) in listData" 
				               :key="i"
											 class="list-item-box box-sizing"
											 :to="`/pages/goods/detail?goodsId=${item.goodId}`">
					<template slot="header">
						<image class="list-item-header" :src="item.goodsImgUrl"></image>
					</template>
					<template slot="body">
						<view class="list-item-body">
							<text class="list-item-body-title dblock">{{item.goodsDescription}}</text>
							<view class="list-item-body-note">
								<text data-status-text="error" class="ellipsis dinlineb">￥{{item.goodsPrice}}</text>
								<text data-status-text="disabled" class="ellipsis fs-sm dinlineb">￥{{item.goodsOriginPrice}}</text>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</base-list>
	</view>
</template>

<script>
	import list from '../../mixins/list.js'
	
	export default {
		mixins: [list],
		data() {
			return {}
		},
		onLoad(params) {
			// 页面加载--获取路由参数
			const navigationBarTitleText = params.type;
			uni.setNavigationBarTitle({
					title: navigationBarTitleText
			});
			this.requestListParams.url = 'homeGetGoodsList';
			this.getList();
		},
		onPullDownRefresh() {
			// 监听用户下拉动作，一般用于下拉刷新
			this.refreshList('pullDownRefresh');
		},
		onReachBottom() {
			// 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。
			this.reachBottomEvt();
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.uni-list {
		background: $uni-bg-color-hover;
		&:after {
			height: 0;
		}
	}
	/deep/.uni-list-item {
		width: 100%;
		height: 100%;
	}
	/deep/.border--left.uni-list--border {
		display: none;
	}
	/deep/.uni-list--border-bottom {
		height: 0;
	}
	/deep/.uni-list-item__container {
		padding: 0;
		padding-left: 0;
	}
	.list-item-box {
		width: 100%;
		height: 210rpx;
		padding: 20rpx 30rpx;
		margin: 10rpx 0;
		@include flex(row, justify-between, center);
		background-color: white;
		.list-item-header {
			width: 170rpx;
			height: 170rpx;
		}
		.list-item-body {
			width: 100%;
			height: 170rpx;
			padding-left: 20rpx;
			@include flex(column, space-between, null);
			.list-item-body-title {
				width: 100%;
				height: 50%;
				@include text-ellipsis(2);
			}
			.list-item-body-note {
				>text {
					&:nth-of-type(1) {
						margin-right: 20rpx;
					}
					&:nth-of-type(2) {
						text-decoration: line-through;
					}
				}
			}
		}
	}
</style>
