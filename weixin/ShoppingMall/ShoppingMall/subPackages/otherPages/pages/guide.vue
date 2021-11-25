<template>
	<view class="guide-container full">
		<view class="wfull img-box">
			<image class="img" src="/static/images/common/error.png" id="testid1"></image>
		</view>
		<view class="text-area dinlineb" id="testid2">
			<text class="title">Hello，world</text>
		</view>
		<view id="testid3">最近太热啦</view>
		<view id="testid4"><button @click="guideNodeId = getTimeStamp()">开始新手教程</button></view>

		<!-- 新手引导 -->
		<base-guide :explainList="explainList" 
		            :currentStep="currentStep" 
								:nodeId="guideNodeId"
								@closeGuide="closeGuide"
								@operatorStepEvt="operatorStepEvt">
			<view v-if="explainList[currentStep].tooltipPos === 'left'">left</view>
			<view v-if="explainList[currentStep].tooltipPos === 'right'">right</view>
		</base-guide>
	</view>
</template>

<script>
	import common from '@/mixins/common.js';
	import guide from '@/mixins/guide.js';
	export default {
		mixins: [common, guide],
		data() {
			return {
				list: [{
					id: '#testid1',
					tooltipPos: 'left',
					message: '第一步'
				}, {
					id: '#testid2',
					tooltipPos: 'right',
					message: '第二步'
				}, {
					id: '#testid3',
					tooltipPos: 'top',
					message: '第三步'
				}, {
					id: '#testid4',
					tooltipPos: 'bottom',
					message: '第四步'
				}],
				
			}
		},
		onLoad() {
			this.$nextTick(() => {
				this.getExplainList();
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.guide-container {
		padding: 30rpx;
		.img-box {
			text-align: center;
			.img {
				width: 50%;
				height: 400rpx;
			}
		}
	}
	.text-area {
		font-size: 38rpx;
		color: $uni-color-primary;
		margin-bottom: 40rpx;
	}
	#testid3 {
		font-size: 28rpx;
		margin-bottom: 40rpx;
	}
</style>