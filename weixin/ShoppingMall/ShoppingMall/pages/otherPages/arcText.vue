<template>
	<view class="full">
		<view class="uni-padding-wrap pd0">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :circular="true" @change="swiperChange">
						<swiper-item><view class="swiper-item uni-bg-red hfull">新鲜事</view></swiper-item>
						<swiper-item><view class="swiper-item uni-bg-green hfull">放映室</view></swiper-item>
						<swiper-item><view class="swiper-item uni-bg-blue hfull">话梅商店</view></swiper-item>
						<swiper-item><view class="swiper-item uni-bg-blue hfull">线下门店</view></swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<view class="arcTexts">
			<text class="dinlineb" v-for="(item, i) in arcTextTest.data" :key="i" style="font-size: 22rpx;">
				<text class="dinlineb" v-for="it in item" :key="it.label" :style="it.style">{{it.label}}</text>
			</text>
		</view>
		
		<view class="bottom-container wfull fs-sm" :animation="animationData">
			<view class="swiper-item hfull dinlineb" v-for="(item, i) in listFinallyShow" :key="i">
				<text class="label dinlineb" v-for="it in item" :key="it.label" :style="it.style">{{it.label}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import Arctext from '../../plugins/arctext.js';
	export default {
		data() {
			return { 
				list: [
					{label: '话梅商店'},
					{label: '线下门店'},
					{label: '新鲜事'},
					{label: '放映室'}
				],
				listShow: [],
				listFinallyShow: [{label: '占位'}],
				listNum: 0,
				arcText: null,
				animationRun: null,
				animationData: null,
				swiperId: 0,
				arcTextTest: {  // 弧形文字示例
					obj: null,
					data: []
				},  
			};
		},
		watch: {
			swiperId: function(newVal, oldVal) {
				if (newVal > oldVal) {
					this.arcTextAnimation('left');
				} else {
					this.arcTextAnimation('right');
				}
			}
		},
		onLoad(params) {
			// 页面加载--获取路由参数
			this.listShow = JSON.parse(JSON.stringify(this.list));
		},
		onShow() {
			// 获取可视区域宽度,计算展示的listShow
			this.calcusList();
			
			// 绘制弧形文字示例
			this.drawArcTextTest();
		},
		methods: {
			// 计算可以放多少项
			async calcusList() {
				let clientWidth = uni.getSystemInfoSync().windowWidth;
				let result = await this.$uniTools.getDom(this, '.bottom-container>.swiper-item', false);
				if (result.status === 'success') {
					// 72为一个.bottom-container>.swiper-item的宽度,由于获取不到,所以写死了
					this.listNum = Math.floor(clientWidth / 72) - this.list.length;
					this.getArcText();
				}
			},
			// 处理显示的数组 -- 除最后一项，其余的label都要加|
			dealListShow() {
				let _list = JSON.parse(JSON.stringify(this.list));
				let finallyList = [];
				for(let i = 0; i < this.listNum; i++) {
					_list.push(this.list[i]);
				}
				for (let i = 0; i < _list.length; i++) {
					finallyList.push({
						label: i === _list.length - 1 ? ' ' + _list[i].label : ' ' + _list[i].label + ' |'
					})
				}
				return finallyList;
			},
			// 获取带弧度的文字
			getArcText() {
				let clientWidth = uni.getSystemInfoSync().windowWidth;
				this.arcText = new Arctext({
						radius: clientWidth * 2,
						data: this.dealListShow(),
						textWidth: clientWidth <= 320 ? 9 : 12
					})
				this.listFinallyShow = this.arcText.getList();
			},
			// 轮播图滑动的时候
			swiperChange(event) {
				this.swiperId = event.detail.current;
			},
			// 变更数组 - 第一项和最后一项一致 - type为left：取头部，插入到尾部；type为right：取尾部，插入到头部
			arcTextAnimation(type) {
				let list = this.list;
				let item = type === 'left' ? this.list.shift() : this.list.pop();
				type === 'left' ? this.list.push(item) : this.list.unshift(item);
				if (this.arcText) {
					this.arcText.setData(this.dealListShow());
					this.arcText.render();
					this.listFinallyShow = this.arcText.getList();
				}
				//创建动画
				if (!this.animationRun) {
					this.animationRun = uni.createAnimation({
						duration: 2000,
						timingFunction: 'ease'
					});
				}
				let translateX = type === 'left' ? '30px' : '-30px';
				this.animationRun.translateX(translateX).step();
				this.animationData = this.animationRun.export();
				setTimeout(() => {
					this.animationRun.translateX('0px').step();
					this.animationData = this.animationRun.export();
				}, 200);
			},
			// 绘制弧形文字示例
			drawArcTextTest() {
				this.arcTextTest.obj = new Arctext({
					radius: 100,
					data: this.list
					});
				this.arcTextTest.data = this.arcTextTest.obj.getList();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.bottom-container {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100px;
	}
	.label {
		font-size: 22rpx;
	}
</style>
