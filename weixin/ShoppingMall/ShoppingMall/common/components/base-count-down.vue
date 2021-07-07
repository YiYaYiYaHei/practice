<template>
	<view class="dinlineb h-i fs0 base-count-down-container">
		<text v-if="title" class="fs-base base-count-down-title">{{title}}</text>
		<uni-countdown class="dinlineb fs-base"
									 :day="day" 
		               :hour="hour" 
									 :minute="minute" 
									 :second="second" 
									 :backgroundColor="bgColor"
									 :color="color"
									 :splitorColor="splitorColor"
									 :showDay="showDay"
									 :showColon="showColon"
									 :start="start"
									 @timeup="$emit('timeup')"></uni-countdown>
	</view>
</template>

<script>
/**
 * @description 倒计时 -- 天：时：分：秒   或   时：分：秒
 * @param {String} title - 左侧标题
 * @param {String} bgColor - 背景色
 * @param {String} color - 文字颜色
 * @param {String} splitorColor - 分割符号颜色
 * @param {Boolean} showDay - 是否显示天数
 * @param {Boolean} showColon - 是否以冒号为分隔符
 * @param {Boolean} start - 是否初始化组件后就开始倒计时
 * @param {String} targetDate - 目标时间  2021-06-20 16:00:00
 * @example  <base-count-down title="12点场" bgColor="#12A550" color="#fff" splitorColor="#12A550" :showDay="false" targetDate="2021-06-18 00:00:00"></base-count-down>
 */
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			bgColor: {
				type: String,
				default: '#FFFFFF'
			},
			color: {
				type: String,
				default: '#000000'
			},
			splitorColor: {
				type: String,
				default: '#000000'
			},
			showDay: {
				type: Boolean,
				default: true
			},
			showColon: {
				type: Boolean,
				default: true
			},
			start: {
				type: Boolean,
				default: true
			},
			targetDate: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				timeType: [],
				day: 0,
				hour: 0,
				minute: 0,
				second: 0
			}
		},
		watch: {
			targetDate: function(newVal) {
				newVal && this.initPage();
			}
		},
		created() {
			this.targetDate && this.initPage();
		},
		methods: {
			initPage() {
				this.timeType = this.showDay ? ['day', 'hour', 'minute', 'second'] : [null, 'hour', 'minute', 'second'];
				// 获取目标时间与当前时间的时间差数组
				const list = this.$tools.dateUtils.humanize(this.targetDate, null, 'array');
				// [day, hour, minute, second]
				const timeList = list ? list.slice(2) : [0, 0, 0, 0];
				for (let [i, item] of new Map(this.timeType.map((item, index) => [index,item]))) {
					this[item] = timeList[i] * 1;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.base-count-down-title {
		vertical-align: top;
		margin-right: 16rpx;
		color: #999;
	}
	/deep/.uni-countdown {
		font-size: 28rpx;
		padding: 0!important;
	}
	/deep/.uni-countdown,
	/deep/.uni-countdown__number {
		height: 36rpx!important;
		line-height: 36rpx!important;
	}
	/deep/.uni-countdown__number {
		margin: 0 5rpx!important;
		font-size: inherit!important;
		border-radius: 5px;
	}
	/deep/.uni-countdown__splitor {
		padding: 0 5rpx!important;
		line-height: inherit!important;
		font-size: inherit!important;
	}
</style>
