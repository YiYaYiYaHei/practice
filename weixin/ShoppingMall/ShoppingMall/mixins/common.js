/*********************************************************************
 * 混入-其他公共方法
 *********************************************************************/
 
export default {
	data() {
		return {
			
		}
	},
	computed: {},
	methods: {
		// 获取节点尺寸信息
		async getDom(className, isAll = true) {
			const result = await this.$uniTools.getDom(this, className, isAll);
			return result;
		},
		// 获取时间戳
		getTimeStamp() {
			return +new Date();
		},
		// 页面跳转
		jumpPage(url, params) {
			this.$uniTools.navigateTo({url, params});
		}
	}
}
