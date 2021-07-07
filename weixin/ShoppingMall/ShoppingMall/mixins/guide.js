/*********************************************************************
 * 混入-新手引导页
 *********************************************************************/
export default {
	data() {
		return {
			explainList: [],
			currentStep: 0,
			guideNodeId: 0
		}
	},
	computed: {},
	methods: {
		/**
		 * @description 根据id，获取节点位置信息
		 * @return {Array} [{bottom: 0, height: 0, id: '节点id', left: 0, message: '提示内容', right: 0, tooltipPos: '提示的位置top、left、right、bottom', top: 0, width: 0}]  
		 */
		async getExplainList(list = this.list) {
			let temp = [];
			for(let item of list) {
				let pos = await this.getDom(item.id, false);
				if (pos.status === 'success') {
					temp.push(Object.assign(item, pos.data));
				}
			}
			this.explainList = temp;
			console.log(this.explainList)
		},
		// 关闭新手引导界面
		closeGuide() {
			this.guideNodeId = 0;
			this.currentStep = 0;
		},
		// 上一步/下一步
		operatorStepEvt(type) {
			if (type === 'prev') {
				this.currentStep--;
			} else if (type === 'next') {
				this.currentStep++;
			}
		}
	}
}
