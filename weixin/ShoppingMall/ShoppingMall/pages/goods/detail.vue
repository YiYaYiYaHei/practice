<template>
	<base-header-layout class="goods-detail-container" :hasDrawer="false" :hasSubHeader="true" ref="baseHeaderLayout">
		<template #header>
			<view class="goods-detail-header-box fs0" :style="{'line-height': capsuleSize.height + 'px'}">
				<view class="goods-detail-header capsule-black-box"
							:style="{top: (capsuleSize.top - 25) + 'px', left: capsuleSize.leftValue + 'px', 'width': capsuleSize.width + 'px', 'height': capsuleSize.height + 'px'}">
					<uni-icons type="arrowleft" class="icon-s header-icon" @click="$uniTools.navigateBack()"></uni-icons>
					<text class="capsule-split-line"></text>
					<uni-icons type="home-filled" class="icon-s header-icon" @click="jumpHome"></uni-icons>
				</view>
				<text class="fs-lg">商品详情</text>
			</view>
		</template>
		
		<!-- tab -->
		<template #subHeader>
			<base-tab :options="tabList" v-model="activeKey" v-show="showTabList" @changeTab="changeTab"></base-tab>
		</template>
		
		<scroll-view class="wfull" scroll-y="true" id="baseContentScrollBox" :style="{'margin-top': showTabList ? '72rpx' : '0'}">
			<view class="goods-swiper-box" id="goods">
				<!-- 轮播图 -->
				<view class="swiper">
					<swiper class="full"
					        :circular="true" 
									@change="(e) => this.swiperCurrent = e.detail.current">
						<swiper-item>
							<video :src="goodsDetailData.videoUrl" 
							       autoplay 
										 loop
										 class="full"
										 @error="this.$uniTools.showModal({content: '轮播视频播放失败'})"
										 play-btn-position="center"
										 enable-play-gesture></video>
						</swiper-item>
						<swiper-item v-for="(item, index) in goodsDetailData.bannerList" :key="index">
							<image :src="item" class="full" mode="aspectFit" @click="previewImg(index, goodsDetailData.bannerList)"></image>
						</swiper-item>
					</swiper>
					<view class="goods-swiper-index-box" v-if="swiperCurrent !== 0">
						<text>{{swiperCurrent}}</text>
						<text>/{{goodsDetailData.bannerList.length}}</text>
					</view>
				</view>
				
				<view class="box-radius goods-swiper-description-box">
					<view class="goods-price">
						<!-- 降价提醒/家庭清单/收藏 -->
						<view class="wfull price-box">
							<view data-status-text="error" class="price">
								<text class="fs-base">￥</text>
								<text>{{goodsDetailData.propertyData.priceInt}}</text>
								<text class="fs-base">.{{goodsDetailData.propertyData.priceFloat}}</text>
							</view>
							
							<view class="icons-box">
								<view @click="$uniTools.navigateTo({url: '/pages/goods/priceReduceRemind'})">
									<uni-icons type="sound" class="icon"></uni-icons>
									<text class="text">降价提醒</text>
								</view>
								<view @click="familyListFlagEvt">
									<uni-icons :type="familyListFlag ? 'flag-filled' : 'flag'" class="icon"></uni-icons>
									<text class="text">家庭清单</text>
								</view>
								<view @click="collecionFlagEvt">
									<uni-icons :type="collecionFlag ? 'heart-filled' : 'heart'" class="icon"></uni-icons>
									<text class="text">{{collecionFlag ? '已收藏' : '收藏'}}</text>
								</view>
							</view>
						</view>
						
						<!-- 查看 -->
						<view class="wfull volumn-box mgb20" @click="timeStampEvt(seeData)">
							<text class="return-volumn">满额返卷</text>
							<view class="see">
								查看
								<uni-icons type="forward" class="forward"></uni-icons>
							</view>
						</view>
						
						<view class="supermarket mgb20">
							<text class="tag-error">京东自营</text>
							一站式屯生活好物
						</view>
						<view class="self-support mgb20">
							<text class="tag-error">自营</text>
							Orange Desire菱格连衣裙女法式长款夏新款初恋甜美裙气质收腰
						</view>
					</view>
				</view>
				
				<!-- 已选/送至 -->
				<view class="box-radius goods-choose-box">
					<view class="choose-goods" @click="timeStampEvt(goodsPropertyData)">
						<text class="left dinlineb">已选</text>
						<text class="center dinlineb">{{userChooseData.color}}，{{userChooseData.size}}</text>
						<uni-icons type="more-filled" class="right dinlineb"></uni-icons>
					</view>
					<view class="choose-goods address-box" @click="timeStampEvt(addressData)">
						<text class="left dinlineb">送至</text>
						<text class="center dinlineb address">{{addressData.data}}</text>
						<uni-icons type="more-filled" class="right dinlineb"></uni-icons>
					</view>
					<view class="goods-express-box">
						<view class="goods-express">
							<view class="box">
								<uni-icons type="checkbox"></uni-icons>
								<text>品质保障</text>
							</view>
						</view>
						<uni-icons type="more-filled" class="right dinlineb"></uni-icons>
					</view>
				</view>
			</view>
			
			<!-- 详情 -->
			<view class="goods-detail-container" id="goodesDetail">
				<view class="goods-detail-title pd30"><text>详情</text></view>
				<!-- 规格参数开始 -->
				<view class="box">
					<view class="box-title pdlr30">
						<uni-icons type="shop" class="subtitle-icon"></uni-icons>
						<text class="subtitle">规格参数</text>
					</view>
					<view class="content-box">
						<view class="content-table transition" :style="{'max-height': expandFlag ? '1000rpx' : '200rpx'}">
							<template v-for="(value1, name1) in goodsDetailData.standardsParams">
								<template v-if="$tools.getDataType(value1, String)">
									<view class="table-row" :key="name1">
										<text class="table-column">{{name1}}</text>
										<text class="table-column">{{value1}}</text>
									</view>
								</template>
								<template v-else-if="$tools.getDataType(value1, Object)">
									<view class="table-row" :key="name1">
										<text class="table-column black-color">{{name1}}</text>
									</view>
									<view class="table-row" v-for="(value2, name2) in value1" :key="name2">
										<text class="table-column">{{name2}}</text>
										<text class="table-column">{{value2}}</text>
									</view>
								</template>
							</template>
						</view>
						<view class="goods-detail-bottom" @click="expandFlag = !expandFlag" data-status-text="primary">
							{{expandFlag ? '收起' : '展开'}}
							<uni-icons :type="expandFlag ? 'arrowup' : 'arrowdown'" class="icon"></uni-icons>
						</view>
					</view>
				</view>
				<!-- 规格参数结束 -->
				
				<!-- 商品介绍开始 -->
				<view class="box">
					<view class="box-title pdlr30 goods-introduce">
						<uni-icons type="map" class="subtitle-icon"></uni-icons>
						<text class="subtitle">商品介绍</text>
					</view>
					<view class="goods-introduct-images-box">
						<template v-for="item in goodsDetailData.goodsIntructImageList">
							<base-image :key="item" :imgSrc="item" mode="widthFix"></base-image>
						</template>
					</view>
				</view>
				<!-- 商品介绍结束 -->
			</view>
		</scroll-view>
		
		<!-- 家庭清单 -->
		<base-popup-dialog :nodeId="familyListData.nodeId"
		                   @cancelEvt="() => familyListData.nodeId = 0"
											 @confirmEvt="() => familyListData.nodeId = 0">
			<uni-icons type="checkbox" class="dinlineb wfull text-center" style="font-size: 50rpx; color: red;"></uni-icons>
			<text class="dinlineb wfull text-center">该商品已{{familyListFlag ? '加入' : '移出'}}家庭清单</text>
		</base-popup-dialog>
		
		<!-- 查看 -->
		<base-popup-dialog :nodeId="seeData.nodeId"
											 footerType="custom"
											 type="bottom"
											 :maskClick="true"
											 :showClose="true"
											 title="优惠"
											 class="see-dialog-container">
			<view class="descript-box">
				<text class="descript-box-title">优惠方案</text>
				<view class="descript-box-descript">
					<text class="tag">多买优惠</text>
					<text class="des">满2件，总价打8折；满3件，总价打7折</text>
				</view>
			</view>
			<view class="descript-box">
				<text class="descript-box-title tag">PLUS95折</text>
				<view class="descript-box-descript">
					<text class="des">可与PLUS价、满减、卷等优惠叠加使用</text>
				</view>
			</view>
		</base-popup-dialog>
		
		<!-- 商品属性、已选 -->
		<base-popup-dialog :nodeId="goodsPropertyData.nodeId"
											 footerType="custom"
											 type="bottom"
											 :maskClick="true"
											 :showClose="true"
											 class="goods-property-dialog-container">
			<scroll-view scroll-x="true">
				<view class="goods-property-title-box">
					<view class="img" @click="previewImg(0, goodsDetailData.propertyData.goodsImg)">
						<image :src="goodsDetailData.propertyData.goodsImg" mode="heightFix" class="full"></image>
					</view>
					<view class="descript-box">
						<view class="price">￥<text>{{goodsDetailData.propertyData.priceInt}}</text>.{{goodsDetailData.propertyData.priceFloat}}</view>
						<view class="descript">
							<text data-status-text="disabled">已选</text>
							{{userChooseData.color}}，{{userChooseData.size}}
						</view>
					</view>
				</view>
				<view class="property-box">
					<text class="dblock title">颜色</text>
					<view class="property-list">
						<text v-for="item, i in goodsDetailData.propertyData.color" 
						     :key="item" 
								 @click="userChooseData.color=item"
								 :class="{'active': userChooseData.color === item}">{{item}}</text>
					</view>
				</view>
				<view class="property-box">
					<text class="dblock title">尺寸</text>
					<view class="property-list">
						<text v-for="item, i in goodsDetailData.propertyData.size" 
						     :key="item" 
								 @click="userChooseData.size=item"
								 :class="{'active': userChooseData.size === item}">{{item}}</text>
					</view>
				</view>
				<view class="property-box num-box">
					<text class="dblock title">数量</text>
					<uni-number-box :min="0" v-model="userChooseData.num"></uni-number-box>
				</view>
			</scroll-view>
			
			<template #footer>
				<view class="popup-dialog-footer-container">
					<button type="default" class="base-dialog-footer-btn" data-status-box="warning" @click="shoppingCardEvt">加入购物车</button>
					<button type="default" class="base-dialog-footer-btn" data-status-box="error" @click="buyEvt">立即购买</button>
				</view>
			</template>
		</base-popup-dialog>
		
		<!-- 送至 -->
		<base-popup-dialog :nodeId="addressData.nodeId"
											 footerType="custom"
											 type="bottom"
											 :maskClick="true"
											 :showClose="true"
											 title="配送至"
											 class="see-dialog-container">
			<base-form-radio-group v-model="addressData.data" :options="addressList"></base-form-radio-group>
		</base-popup-dialog>
		
		
	</base-header-layout>
</template>

<script>
	export default {
		data() {
			return {
				capsuleSize: {},
				goodsId: null,
				tabList: ['商品', '详情'],
				showTabList: false,
				activeKey: '商品',
				swiperCurrent: 0,
				goodsDetailData: {
					videoUrl: '',   // 轮播视频路径
					bannerList: [], // 轮播图
					propertyData: { // 商品属性
						priceInt: 0,
						priceFloat: '00'
					}, 
					standardsParams: {},  // 规格参数
					goodsIntructImageList: [], // 商品介绍
				},
				collecionFlag: false,   // 是否收藏
				familyListFlag: false,  // 是否加入家庭清单
				familyListData: {
					nodeId: 0
				},
				seeData: {
					nodeId: 0
				},
				goodsPropertyData: {
					nodeId: 0
				},
				userChooseData: {
					color: '',
					size: '',
					num: 1
				},
				addressData: {
					nodeId: 0,
					data: '四川成都市武侯区红牌楼街道永顺南街10号名人风景'
				},
				addressList: ['四川成都市武侯区红牌楼街道永顺南街10号名人风景', '新疆乌鲁木齐市水磨沟区南湖南路街道长青二队', '四川成都市高新区中和镇祥龙三街'],
				expandFlag: false
			}
		},
		onLoad(params) {
			this.capsuleSize = uni.getMenuButtonBoundingClientRect();
			this.capsuleSize.leftValue = uni.getSystemInfoSync().windowWidth - this.capsuleSize.right;
			// 页面加载--获取路由参数
			this.goodsId = params.goodsId;
			this.getGoodsDetail();
		},
		async onPageScroll(params) {
			// 页面滚动时,控制tabList显示隐藏
			let result = await this.$uniTools.getDom(this, '#goods', false);
			if (result.status === 'success') {
				this.showTabList = params.scrollTop >= result.data.height;
				this.activeKey = this.showTabList ? '详情' : '商品';
			} else {
				this.$uniTools.showToast({title: result.message});
			}
		},
		watch: {
			'addressData.data': function(newVal, oldVal) {
				console.log('我便了：', newVal);
				if (!!newVal) {
					this.addressData.nodeId = 0;
				}
			}
		},
		methods: {
			changeTab() {
				const className = this.activeKey === '商品' ? '#goods' : '#goodesDetail';
				this.$uniTools.jumpId(className, '#baseContentScrollBox');
			},
			swiperChange(e) {
				this.swiperCurrent = e.detail.current;
			},
			jumpHome() {
				uni.switchTab({url: '/pages/home/index'});
			},
			async getGoodsDetail() {
				let result = await this.$apis.login.homeGetGoodsDeatil({goodsId: this.goodsId});
				if (result.status === 200) {
					this.goodsDetailData.videoUrl = 'https://cloud.video.taobao.com/play/u/746251873/p/1/e/6/t/1/311306325407.mp4';
					this.goodsDetailData.bannerList = [
						'https://img.alicdn.com/imgextra/https://img.alicdn.com/bao/uploaded/i4/746251873/O1CN017wvF001PhsWCXgZwv_!!746251873.jpg_430x430q90.jpg',
						'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/746251873/O1CN01mMYcUa1PhsVn50HMj_!!746251873.jpg_430x430q90.jpg',
						'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/746251873/O1CN01LO40ym1PhsVOczZa5_!!746251873.jpg_430x430q90.jpg',
						'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/746251873/O1CN01ZmeGXt1PhsVsM0UC1_!!746251873.jpg_430x430q90.jpg',
						'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/746251873/O1CN01qWCzIP1PhsVJtffsi_!!746251873.jpg_430x430q90.jpg'
					]
					// 商品属性
					this.goodsDetailData.propertyData = Object.assign(result.data, {
						goodsImg: 'https://img.alicdn.com/imgextra/i2/746251873/O1CN01uG6XLX1PhsVXQtD4x_!!746251873.jpg_430x430q90.jpg',
						color: ['蓝色', '绿色'],
						size: ['155/80A/S', '160/84A/M', '165/88A/L'],
						priceInt: (result.data.goodsPrice+'').split('.')[0],
						priceFloat: (result.data.goodsPrice+'').split('.')[1] || '00'
					});
					// 规格参数
					this.goodsDetailData.standardsParams = {
						'商品编号': '2009611',
						'主体': {
							'品牌名称': 'Orange Desire',
							'适用年龄': '25-29周岁',
							'尺码': '155/80A/S 160/84A/M 165/88A/L',
							'面料': '雪纺',
							'图案': '花色',
							'腰型': '高腰',
							'衣门襟': '套头',
							'袖型': '常规',
							'组合形式': '单件',
							'裙型': 'A字裙',
							'年份季节': '2021年夏季',
							'袖长': '短袖',
							'裙长': '中长裙'
						}
					},
					// 商品介绍
					this.goodsDetailData.goodsIntructImageList = [
						'https://img.alicdn.com/imgextra/i4/746251873/O1CN01Bkpx0y1PhsVV9IN4f_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i1/746251873/O1CN01ZBlUhi1PhsVr5mtaJ_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i2/746251873/O1CN01KMMiQw1PhsVYwkQZ2_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i2/746251873/O1CN01fp8BkH1PhsVmtXXFX_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i3/746251873/O1CN01Nz91YR1PhsVYwmRIZ_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i3/746251873/O1CN01y7exxV1PhsVY7fI2E_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i4/746251873/O1CN01H28JUN1PhsVYwmyYd_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i2/746251873/O1CN015qQJ1q1PhsVVw2hKf_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i4/746251873/O1CN01gAKl1t1PhsVo3Dpge_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i4/746251873/O1CN01x5cP1F1PhsVluVpb5_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i2/746251873/O1CN01aHjehF1PhsVXQxZXG_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i4/746251873/O1CN014ANNvE1PhsVqQ0iQl_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i4/746251873/O1CN01UekSk71PhsVVw4Vcz_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i4/746251873/O1CN0158ME4e1PhsVo3Eluy_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i2/746251873/O1CN01FaCxij1PhsVmtYfyb_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i4/746251873/O1CN01Zw1GAn1PhsVmdonvq_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i1/746251873/O1CN01fG9h1H1PhsVotCUQ4_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i3/746251873/O1CN01MbBjBk1PhsVpNDewL_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i4/746251873/O1CN01WfMTyF1PhsVo3Fue7_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i3/746251873/O1CN01GzDPrp1PhsVo3SbTt_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i1/746251873/O1CN010hrRQ31PhsVluV5tC_!!746251873.jpg',
						'https://img.alicdn.com/imgextra/i2/746251873/O1CN012iwLpR1PhsVmtZ0mw_!!746251873.jpg',
						'https://img.alicdn.com/tfs/TB1.CUdsY9YBuNjy0FgXXcxcXXa-1572-394.png'
					]
					this.userChooseData.color = this.goodsDetailData.propertyData.color[0] || '';
					this.userChooseData.size = this.goodsDetailData.propertyData.size[0] || '';
				} else {
					this.$uniTools.showToast({title: result.message});
				}
			},
			// 轮播图-图片预览
			previewImg(index, list) {
				if (list.constructor === String) list = [list];
				this.$uniTools.previewImage({
					current: index,
					urls: list,
					indicator: 'number',
					loop: true
				});
			},
			// 是否加入 家庭清单
			familyListFlagEvt() {
				this.familyListFlag = !this.familyListFlag;
				this.familyListData.nodeId = +new Date();
			},
			// 是否 收藏
			collecionFlagEvt() {
				this.collecionFlag = !this.collecionFlag;
				this.$uniTools.showToast({
					title: `${this.collecionFlag ? '' : '取消'}收藏成功`,
					icon: 'success'
				});
			},
			timeStampEvt(data) {
				data.nodeId = +new Date();
			},
			// 加入购物车
			shoppingCardEvt() {
				
			},
			// 立即购买
			buyEvt() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/styles/goodsDetail.scss';
</style>
