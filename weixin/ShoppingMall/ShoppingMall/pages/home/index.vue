<template>
	<base-header-layout title="首页" :hasDrawer="true">
		<!-- 轮播图 -->
		<swiper class="swiper" :circular="true">
			<swiper-item>
				<video src="https://vd3.bdstatic.com/mda-mfgyux07gfwgbmd7/fhd/cae_h264_nowatermark/1623971837068239381/mda-mfgyux07gfwgbmd7.mp4?v_from_s=gz_haokan_4469&auth_key=1623982150-0-0-f86dbd9bad11cd3f527f2df0082fc085&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest=" 
				       autoplay 
							 loop
							 class="full"
							 @error="this.$uniTools.showModal({content: '轮播视频播放失败'})"
							 play-btn-position="center"
							 enable-play-gesture></video>
			</swiper-item>
			<swiper-item v-for="(item, index) in bannerList" :key="index">
				<image :src="item" class="full"></image>
			</swiper-item>
		</swiper>
		
		<view class="home-index-container wfull">
			<home-block title="限时好物" class="full" @headerClick="jumpPage('/pages/goods/list', {type: '限时好物'})">
				<template #header>
					<base-count-down title="12点场" 
					                 bgColor="#12A550" 
													 color="#fff" 
													 splitorColor="#12A550" 
													 :showDay="false" 
													 :targetDate="targetDate"></base-count-down>
				</template>
				
				<scroll-view scroll-x="true" class="home-index-card-container">
					<view class="home-index-card box-shadow dinlineb" 
					      v-for="item in limitList" 
								:key="item.goodId"
								@click="jumpPage('/pages/goods/detail', {goodsId: item.goodId})">
						<view class="goods-img">
							<image :src="item.goodsImgUrl" 
										 :lazy-load="true"
										 mode="widthFix"
										 class="full"></image>
						</view>
						<view class="goods-description">
							<text class="goods-description-title wfull fs-base ellipsis">{{item.goodsDescription}}</text>
							<view class="goods-description-price">
								<view class="price">
									<text class="fs-base" data-status-text="success">￥{{item.goodsPrice}}</text>
									<text class="fs-sm">￥{{item.goodsOriginPrice}}</text>
								</view>
								<image class="card-img" src="/static/images/home/card.png"></image>
							</view>
						</view>
					</view>
				</scroll-view>
			</home-block>
			
			<view class="barfaining-container">
				<view class="left">
					<view class="show-text dinlineb">
						<text>砍价0元购</text>
						<text>刀刀见效</text>
						<text>立即砍价 >></text>
					</view>
					<image src="/static/images/home/zero.png" class="show-image dinlineb" mode="heightFix"></image>
				</view>
				<view class="right">
					<view class="show-text dinlineb">
						<text>限时抢卷</text>
						<text>50元红包免费拿</text>
						<text>立即开抢 >></text>
					</view>
					<image src="/static/images/home/money.png" class="show-image dinlineb" mode="heightFix"></image>
				</view>
			</view>
			
			<home-block title="精品团购" class="full"  @headerClick="jumpPage('/pages/goods/list', {type: '精品团购'})">
				<template #header>
					<text data-status-text="disabled" class="fs-base">您的生活好帮手</text>
				</template>
				
				<scroll-view scroll-x="true" class="home-index-card-container">
					<view class="home-index-card box-shadow dinlineb" 
					      v-for="item in groupList" 
								:key="item.goodId"
								@click="jumpPage('/pages/goods/detail', {goodsId: item.goodId})">
						<view class="goods-img">
							<image :src="item.goodsImgUrl" 
										 :lazy-load="true"
										 mode="widthFix"
										 class="full"></image>
						</view>
						<view class="goods-description">
							<view class="goods-description-group-price">
								<text class="fs-base" data-status-text="success">￥{{item.goodsPrice}}</text>
								<text class="fs-sm text-right">￥{{item.goodsOriginPrice}}</text>
							</view>
							<base-progress :percentage="30" showText="10人成团"></base-progress>
							<view class="group-bottom">参团</view>
						</view>
					</view>
				</scroll-view>
			</home-block>
		</view>
	</base-header-layout>
</template>

<script>
	import common from '@/mixins/common.js';
	import HomeBlock from './comp/homeBlock.vue'
	export default {
		mixins: [common],
		components: {
			HomeBlock
		},
		data() {
			return {
				bannerList: [
					require('../../static/images/home/banner1.jpg'), 
					require('../../static/images/home/banner2.jpg'), 
					require('../../static/images/home/banner3.jpg'), 
					require('../../static/images/home/banner4.jpg')
				],
				targetDate: '',
				limitList: [],
				groupList: []
			}
		},
		onLoad(params) {
			// 页面加载--获取路由参数
			const date = new Date();
			const [YYYY, MM, DD] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
			this.targetDate = `${YYYY}-${MM}-${DD} 23:59:59`;
			
			this.getLimitList();
			this.getGroupList();
		},
		onPullDownRefresh() {
			// 监听用户下拉动作，一般用于下拉刷新
		},
		onReachBottom() {
			// 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。
		},
		methods: {
			// 获取限时抢购数据
			async getLimitList() {
				let result = await this.$apis.login.homeGetLimitList({});
				if (result.status === 200) {
					this.limitList = result.data || [];
				} else {
					this.$uniTools.showToast({title: result.message});
				}
			},
			// 获取精品团购列表数据
			async getGroupList() {
				let result = await this.$apis.login.homeGetGroupList({});
				if (result.status === 200) {
					this.groupList = result.data || [];
				} else {
					this.$uniTools.showToast({title: result.message});
				}
			},
			headerClick(type) {
				this.$uniTools.navigateTo({url: '/pages/goods/list', params: {type}});
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.home-block-container {
		padding: 30rpx 20rpx;
	}
	.home-index-card-container {
		width: 100%;
		height: 278rpx;
		@include flex(row, null, center, nowrap);
		white-space: nowrap;
		.home-index-card {
			width: calc(33.333% - 20rpx);
			height: 268rpx;
			background: $uni-bg-color;
			margin-right: 20rpx;
			margin-top: 5rpx;
			margin-bottom: 5rpx;
			&:nth-of-type(1) {
				margin-left: 5px;
			}
			.goods-img {
				width: 100%;
				height: 120rpx;
				overflow: hidden;
				margin-bottom: 10rpx;
			}
			.goods-description {
				position: relative;
				width: 100%;
				height: 138rpx;
				padding: 0 10rpx 10rpx;
				.goods-description-title {
					@include line-height(28rpx);
				}
				.goods-description-price {
					height: 110rpx;
					@include flex(row, space-between, center);
					.price {
						max-width: calc(100% - 56rpx);
						>text {
							display: block;
							@include text-ellipsis;
							&:nth-of-type(2) {
								color: $uni-text-color-grey;
								text-decoration: line-through;
							}
						}
					}
					.card-img {
						width: 56rpx;
						height: 56rpx;
					}
				}
			}
		}
	}
	
	.barfaining-container {
		width: 100%;
		height: 140rpx;
		@include flex(row, space-between, center);
		.left,
		.right {
			width: calc(50% - 20rpx);
			height: 100%;
			background: $uni-text-color-placeholder-light;
			padding: 15rpx 0 15rpx 30rpx;
			.show-text {
				width: 60%;
				height: 100%;
				>text {
					display: block;
					width: 100%;
					@include text-ellipsis;
					&:nth-of-type(1) {
						font-size: $uni-font-size-lgr;
						color: $uni-text-color;
					}
					&:nth-of-type(2) {
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
					}
					&:nth-of-type(3) {
						font-size: $uni-font-size-smm;
						color: $uni-color-success;
					}
				}
			}
			.show-image {
				width: 40%;
				height: 100rpx;
			}
		}
		.left {
			border-radius: 0 30px 30px 0;
		}
		.right {
			padding-left: 40rpx;
			border-radius: 30px 0 0 30px;
		}
	}
	
	.goods-description-group-price {
		>text {
			display: inline-block;
			vertical-align: middle;
			width: 50%;
			&:nth-of-type(2) {
				color: $uni-text-color-grey;
				text-decoration: line-through;
			}
		}
	}
	/deep/.base-progress-bar__outer {
		margin: 20rpx 0;
	}
	.group-bottom {
		@include pos(null, 0, 0, 0);
		width: 100%;
		text-align: center;
		background: $uni-color-success-opcatity;
		color: white;
		
	}
</style>
