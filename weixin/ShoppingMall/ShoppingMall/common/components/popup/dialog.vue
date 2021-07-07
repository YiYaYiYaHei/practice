<template>
	<uni-popup ref="popup" 
	           :type="type" 
						 :background-color="bgColor" 
						 :animation="animation" 
						 :mask-click="maskClick"
						 :safe-area="safeArea"
						 class="popup-dialog-container pr"
						 :data-dialog-pos="type">
		<view class="popup-dialog-content-container">
			<text class="dblock title" v-if="!!title">{{title}}</text>
			<template v-if="showClose">
				<uni-icons type="close" class="close-icon" @click="close"></uni-icons>
			</template>
			<slot></slot>
		</view>
		
		<template v-if="footerType === 'default'">
			<view class="popup-dialog-footer-container">
				<button type="default" class="base-dialog-footer-btn" @click="$emit('cancelEvt')">取消</button>
				<button type="default" class="base-dialog-footer-btn" @click="$emit('confirmEvt')">确定</button>
			</view>
		</template>
		<template v-else>
			<slot name="footer"></slot>
		</template>
	</uni-popup>
</template>

<script>
	/**
	 * @description dialog弹框
	 * @param {Number} nodeId - 时间戳（控制dialog弹框显示和隐藏）
	 * @param {String} type - 消息提示主题success/warn/error/info
	 * @param {String} footerType - 弹框底部类型default：使用底部按钮布局；custom:自定义布局
	 * @param {String} bgColor - 主窗口背景色
	 * @param {Boolean} animation - 是否开启动画
	 * @param {Boolean} maskClick - 蒙版点击是否关闭弹窗
	 * @param {Boolean} safeArea - 是否适配底部安全区
	 * @param {Boolean} showClose - 右上角是否展示关闭按钮
	 * @example  <base-popup-dialog :nodeId="familyListData.nodeId" 
	 * 															footerType="custom"
																	type="bottom"
																	:maskClick="true"
																	:showClose="true"
																  class="see-dialog-container"></base-popup-dialog>
	 */
	import common from './common.js';
  export default {
		mixins: [common],
		props: {
			type: {
				type: String,
				default: 'center'
			},
			footerType: {
				type: String,
				default: 'default'
			},
			bgColor: {
				type: String,
				default: 'none'
			},
			animation: {
				type: Boolean,
				default: true
			},
			maskClick: {
				type: Boolean,
				default: false
			},
			safeArea: {
				type: Boolean,
				default: true
			},
			showClose: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			}
		},
    data() {
      return {}
    },
    methods: {},
		created() {}
  }
</script>

<style lang="scss" scoped>
	/deep/.uni-popup .uni-popup__wrapper {
		font-size: $uni-font-size-base;
		background: white!important;
	}
	.popup-dialog-container {
		&[data-dialog-pos='center'] {
			/deep/.uni-popup .uni-popup__wrapper {
				width: 70%!important;
				max-height: 400rpx!important;
				border-radius: 20rpx;
				box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
			}
		}
		&[data-dialog-pos='bottom'] {
			/deep/.uni-popup .uni-popup__wrapper {
				width: 100%!important;
				max-height: 60%!important;
				border-radius: 20rpx 20rpx 0 0;
			}
		}
	}
	
	.popup-dialog-content-container {
		position: relative;
		width: 100%;
		padding: 40rpx 30rpx 110rpx;
		.title {
			margin-top: -10px;
			@include line-height(50rpx);
			text-align: center;
			font-size: $uni-font-size-base;
			font-weight: 600;
			color: $uni-text-color-black;
		}
		.close-icon {
			position: absolute;
			top: 20rpx;
			right: 30rpx;
			z-index: 3;
		}
	}
	/deep/.popup-dialog-footer-container {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 80rpx;
		@include flex(row, null, center);
		.base-dialog-footer-btn {
			width: 50%;
			height: 100%;
			background-color: transparent;
			font-size: $uni-font-size-base;
			border-radius: 0;
			&:after {
				border: none;
				border-top: 1px solid $uni-border-color;
				border-radius: 0;
			}
			&:nth-of-type(1) {
				&::after {
					border-right: 1px solid $uni-border-color;
				}
			}
		}
	}
</style>
