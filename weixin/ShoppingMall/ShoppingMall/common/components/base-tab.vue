<template>
	<view class="base-tab-container full" :data-tab-pos="tabPos">
		<template v-if="isObject">
			<scroll-view class="full scroll-view" :scroll-x="tabPos==='row'" :scroll-y="tabPos==='column'">
				<view>
					<view class="base-tab-item"
					      v-for="item, i in options"
								:key="item[valueKey]"
								@click="changeTab(item)"
								:class="{'active': activeKey === item[valueKey]}">
						<text class="base-tab-item-text dinlineb wfull">{{item[label]}}</text>
					</view>
				</view>
			</scroll-view>
		</template>
		
		<template v-else>
			<scroll-view class="full scroll-view" :scroll-x="tabPos==='row'" :scroll-y="tabPos==='column'">
				<view class="scroll-view-box">
					<view class="base-tab-item"
					      v-for="item, i in options"
								:key="item"
								@click="changeTab(item)"
								:class="{'active': activeKey === item}">
						<text class="base-tab-item-text dinlineb wfull">{{item}}</text>
					</view>
				</view>
			</scroll-view>
		</template>
	</view>
</template>

<script>
/**
 * @description tab切换（横向排列、纵向排列）
 * @param {String} valueKey - tab的value值（默认为对象属性的value）
 * @param {String} label - 文本展示（默认为对象属性的label）
 * @param {String} value - 值 required(v-model)
 * @param {Array | String} options - tab选项列表，可为对象数组/字符串数组：['111', '222', '333'] 或 [{label: '111', value: '1'}]
 * @param {String} tabPos - tab的排列方式: row、column
 * @example  <base-tab :options="tabList" v-model="activeKey" v-show="showTabList" @changeTab="changeTab"></base-tab>
 */
	export default {
		props: {
			valueKey: {
				type: String,
				default: 'value'
			},
			label: {
				type: String,
				default: 'label'
			},
			value: {
				type: String,
				default: ''
			},
			options: {
				type: Array,
				default: () => []
			},
			tabPos: {
				type: String,
				default: 'row'
			}
		},
		data() {
			return {
				activeKey: this.value
			}
		},
		computed: {
			isObject: function() {
				return !!this.options.length ? typeof this.options[0] === 'object' : false;
			}
		},
		watch: {
			value: function(newVal) {
				this.activeKey = newVal;
			}
		},
		methods: {
			changeTab(item) {
				this.activeKey = this.isObject ? item[this.valueKey] : item;
				this.$emit('input', this.activeKey);
				// 不想使用watch监听时,可以使用自定义事件changeTab
				this.$emit('changeTab', this.activeKey);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.base-tab-container {
		background-color: $uni-bg-color;
		.base-tab-item {
			font-size: $uni-font-size-smm;
			color: $uni-text-color-black;
			&.active {
				font-weight: 600;
			}
		}
		.scroll-view {
			box-sizing: border-box;
		}
		&[data-tab-pos="row"] {
			padding: 0 30rpx;
			.scroll-view {
				position: relative;
				padding: 11rpx 0rpx;
				@include line-height(72rpx);
				.scroll-view-box {
					min-width: 100%;
					height: 100%;
					@include line-height(50rpx);
					@include flex(row, space-around, null);
					@include pos(0, null, null, 0);
				}
			}
			.base-tab-item {
				padding: 0 10rpx;
				margin: 0 20rpx;
				text-align: center;
				flex-shrink: 0;
				min-width: 50px;
				&:first-of-type {
					margin-left: 0;
				}
				&.active {
					.base-tab-item-text {
						@include border(bottom, 2px, null, bottom);
					}
				}
			}
		}
		&[data-tab-pos="column"] {
			text-align: center;
			.base-tab-item {
				@include line-height(72rpx);
				.base-tab-item-text {
					@include line-height(32rpx);
				}
				&.active {
					.base-tab-item-text {
						@include border(left, 10rpx, $uni-color-success);
					}
				}
			}
		}
	}
</style>
