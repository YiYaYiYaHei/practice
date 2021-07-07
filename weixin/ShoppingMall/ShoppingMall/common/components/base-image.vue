<template>
	<view class="base-image-container full pr">
		<!-- 图片加载失败 -->
		<image v-if="loadedError" class="wfull base-image-error" :src="loadErrorImg" :mode="mode" lazy-load></image>
		
		<image class="wfull base-image" 
		       :class="{'loaded-error': loadedError}" 
					 :src="imgSrc" 
					 :mode="mode" 
					 lazy-load 
					 @load="onImageLoad" 
					 @error="onImageError"
					 @click="$emit('imgClickEvt', imgSrc)"></image>
	</view>
</template>

<script>
	/**
	 * @description 自定义图片组件，优化加载出错
	 * @param {String} mode - 图片裁剪、缩放的模式
	 * @param {String} imgSrc - 图片地址
	 * @param {String} loadErrorImg - 图片加载失败地址（加载失败/imgSrc为空时展示）
	 * @example  <base-image :key="item" :imgSrc="item" mode="widthFix"></base-image>
	 */
  export default {
		props: {
			mode: {
				type: String,
				default: 'aspectFit'
			},
			imgSrc: {
				type: String,
				default: ''
			},
			loadErrorImg: {
				type: String,
				default: '/static/images/common/image_error.jpg'
			}
		},
    data() {
      return {
				loadedError: false, // 判断图片是否加载失败
			}
    },
		watch: {
			imgSrc: function() {
				this.initPage();
			}
		},
    methods: {
			initPage() {
				if (!!this.imgSrc) {
					this.loadedError = false;
				} else {
					this.loadedError = true;
					this.$uniTools.showToast({title: 'imgSrc不存在'});
				}
			},
			//监听image加载完成
			onImageLoad() {
				this.loadedError = false;
			},
			//监听image加载失败
			onImageError() {
				this.loadedError = true;
			},
		},
		created() {
			this.initPage();
		}
  }
</script>

<style lang="scss" scoped>
	.base-image-container {
		background-color: $uni-bg-color-grey;
	}
	.base-image {
		background: $uni-bg-color-grey url("../../static/images/common/image.jpg") center center/ 32px 32px no-repeat;
		overflow: hidden;
		@include transition;
		opacity: 1;
		&.loaded-error {
			opacity: 0;
		}
	}
	.base-image-error {
		@include pos(50%, null, null, 50%);
		transform: translate(-50%, -50%);
		width: 32px;
		height: 32px;
		background-color: $uni-bg-color-grey;
	}
</style>
