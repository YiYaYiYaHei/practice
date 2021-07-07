<template>
	<uni-popup ref="popup" type="message">
		<template v-if="!hasSlot">
			<uni-popup-message :type="type"
			                   :message="message" 
												 :duration="duration"></uni-popup-message>
		</template>
		
	   <template v-else>
			 <uni-popup-message :type="type"
			 										:duration="duration">
				<!-- 使用插槽，message会失效 -->
				<slot></slot>
			 </uni-popup-message>
		 </template>
	</uni-popup>
</template>

<script>
	/**
	 * @description message框
	 * @param {Number} nodeId - 时间戳（控制message框显示和隐藏）
	 * @param {String} type - 消息提示主题success/warn/error/info
	 * @param {String} message - 消息提示文字
	 * @param {Boolean} hasSlot - 是否使用uni-popup-message的默认插槽
	 * @param {Number} duration - 消息显示时间，超过显示时间组件自动关闭，设置为0 将不会关闭，需手动调用 close 方法关闭
	 * @example  <base-popup-message :nodeId="familyListData.nodeId"></base-popup-message>
	 */
	import common from './common.js';
  export default {
		mixins: [common],
		props: {
			type: {
				type: String,
				default: 'success'
			},
			message: {
				type: String,
				default: '成功'
			},
			hasSlot: {
				type: Boolean,
				default: false
			},
			duration: {
				type: Number,
				default: 3000
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
</style>
