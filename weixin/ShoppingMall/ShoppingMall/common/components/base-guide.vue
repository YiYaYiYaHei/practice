<template>
	<view class="base-guide-container" v-show="!!nodeId">
		<!-- 说明内容区域 -->
		<view class="base-guide-box" 
		     :style="{'width': explainItem.width+'px', 'height': explainItem.height+'px', 'top': explainItem.top+'px', 'left': explainItem.left+'px'}"></view>
		
		<!-- tooltips/slot -->
		<template v-if="explainItem.tooltipPos === 'left'">
			<view class="base-guide-tooltips-box base-guide-tooltips--left"
			      :style="{'top': (explainItem.height/2 + explainItem.top)+'px', 'right': (clientWidth - explainItem.left + 20)+'px'}"
						style="transform: translateY(-50%);">
				<view v-if="explainItem.message" class="base-guide-tooltips">
					<text class="base-guide-tooltips-text">{{explainItem.message}}</text>
				</view>
				<slot v-else></slot>
			</view>
		</template>
		
		<template v-if="explainItem.tooltipPos === 'right'">
			<view class="base-guide-tooltips-box base-guide-tooltips--right"
			      :style="{'top': (explainItem.height/2 + explainItem.top)+'px', 'left': (explainItem.right + 20)+'px'}"
						style="transform: translateY(-50%);">
				<view v-if="explainItem.message" class="base-guide-tooltips">
					<text class="base-guide-tooltips-text">{{explainItem.message}}</text>
				</view>
				<slot v-else></slot>
			</view>
		</template>
		
		<template v-if="explainItem.tooltipPos === 'top'">
			<view class="base-guide-tooltips-box"
						:class="{'base-guide-tooltips--top': (explainItem.top - 20) > 0, 'base-guide-tooltips--bottom': (explainItem.top - 20) < 0}"
			      :style="{'top': (explainItem.top - 20) < 0 ? (explainItem.bottom + 20)+'px' : (explainItem.top - 20)+'px', 'left': (explainItem.left + explainItem.width/2)+'px'}"
						style="transform: translate(-50%, -100%)">
				<view v-if="explainItem.message" class="base-guide-tooltips">
					<text class="base-guide-tooltips-text">{{explainItem.message}}</text>
				</view>
				<slot v-else></slot>
			</view>
		</template>
		
		<template v-if="explainItem.tooltipPos === 'bottom'">
			<view class="base-guide-tooltips-box"
			      :class="{'base-guide-tooltips--top': (explainItem.bottom + 20) > clientHeight, 'base-guide-tooltips--bottom': (explainItem.bottom + 20) < clientHeight}"
			      :style="{'top': (explainItem.bottom + 20) > clientHeight ? (explainItem.top - 20)+'px' : (explainItem.bottom + 20)+'px', 'left': (explainItem.left + explainItem.width/2)+'px'}"
			      style="transform: translateX(-50%)">
				<view v-if="explainItem.message" class="base-guide-tooltips">
					<text class="base-guide-tooltips-text">{{explainItem.message}}</text>
				</view>
				<slot v-else></slot>
			</view>
		</template>
		
		<!-- 底部按钮 -->
		<view class="base-guide-footer-box">
			<button class="btn" plain v-if="currentStep !== (stepTotal - 1)" @click="stepEvt('jump')">跳过</button>
			<button class="btn" plain v-if="currentStep > 0" @click="stepEvt('prev')">上一步</button>
			<button class="btn" plain v-if="currentStep >= 0 && currentStep < (stepTotal - 1)" @click="stepEvt('next')">下一步</button>
			<button class="btn" plain v-if="currentStep === (stepTotal - 1)" @click="stepEvt('close')">关闭</button>
		</view>
	</view>
</template>

<script>
	/**
	 * @description 新手引导页, 当message值为空时，可自定义引导内容
	 * @param {Array} explainList - 新手引导列表 [{bottom: 0, height: 0, id: '节点id', left: 0, message: '提示内容', right: 0, tooltipPos: '提示的位置top、left、right、bottom', top: 0, width: 0}]  
	 * @param {Number} currentStep - 当前步数
	 * @param {Number} nodeId - 时间戳，是否展示引导页
	 * @example <base-guide :explainList="explainList" 
													 :currentStep="currentStep" 
													 :nodeId="guideNodeId"
													 @closeGuide="closeGuide"
													 @operatorStepEvt="operatorStepEvt">
								<view v-if="explainList[currentStep].tooltipPos === 'left'">left</view>
								<view v-if="explainList[currentStep].tooltipPos === 'right'">right</view>
							</base-guide>
	 */
	export default {
		props: {
			explainList: {
				type: Array,
				default: () => []
			},
			currentStep: {
				type: Number,
				default: 0
			},
			nodeId: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				clientWidth: 0,
				clientHeight: 0
			}
		},
		watch: {
		},
		computed: {
			// 总步数
			stepTotal: function() {
				return this.explainList.length;
			},
			// 当前引导项
			explainItem: function() {
				return this.explainList[this.currentStep];
			}
		},
		methods: {
			// 上一步/下一步/跳过/关闭操作
			stepEvt(type) {
				switch(type) {
					case 'jump':
					case 'close':
					  this.$emit('closeGuide');
						break;
					case 'prev':
					case 'next':
					  this.$emit('operatorStepEvt', type);
						break;
				}
			}
		},
		created() {
			// 获取可视区域宽
			this.clientWidth = uni.getSystemInfoSync().windowWidth;
			this.clientHeight = uni.getSystemInfoSync().windowHeight;
		}
	}
</script>

<style lang="scss" scoped>
	.base-guide-container {
		@include pos(0, 0, 0, 0, fixed);
		z-index: 999;
	}
	.base-guide-box {
		@include pos(0, null, null, 0);
		box-shadow: 0 0 0 3000px rgba(0, 0, 0, 0.5);
		border-radius: 10px;
	}
	.base-guide-tooltips-box {
		position: absolute;
		color: white;
		.base-guide-tooltips {
			background: rgba(0, 0, 0, 0.5);
			border-radius: 10rpx;
			padding: 6rpx 14rpx;
			font-size: 0;
			>.base-guide-tooltips-text {
				display: inline-block;
				max-width: 200px;
				max-height: 200px;
				overflow: auto;
				font-size: 24rpx;
			}
			&::after {
				content: '';
				position: absolute;
			}
		}
		&.base-guide-tooltips--left>.base-guide-tooltips::after{
			@include triangle(6px, right, rgba(0, 0, 0, 0.5));
			top: 50%;
			right: -12px;
			transform: translateY(-50%);
		}
		&.base-guide-tooltips--right>.base-guide-tooltips::after{
			@include triangle(6px, left, rgba(0, 0, 0, 0.5));
			top: 50%;
			left: -12px;
			transform: translateY(-50%);
		}
		&.base-guide-tooltips--top>.base-guide-tooltips::after{
			@include triangle(6px, bottom, rgba(0, 0, 0, 0.5));
			bottom: -12px;
			left: 50%;
			transform: translateX(-50%);
		}
		&.base-guide-tooltips--bottom>.base-guide-tooltips::after{
			@include triangle(6px, top, rgba(0, 0, 0, 0.5));
			top: -12px;
			left: 50%;
			transform: translateX(-50%);
		}
	}
	
	.base-guide-footer-box {
		width: 100%;
		@include flex(row, space-around, center);
		@include pos(null, null, 50rpx, 0);
		.btn {
			padding: 16rpx;
			font-size: 24rpx;
			line-height: 32rpx;
			background-color: white;
		}
	}
</style>
