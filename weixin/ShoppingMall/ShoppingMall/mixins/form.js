/*********************************************************************
 * 混入-表单方法
 *********************************************************************/
 
export default {
	data() {
		return {
			
		}
	},
	computed: {},
	methods: {
		/**
		 * @description 表单验证
		 */
		submitForm(successCb, formName = 'form') {
			this.$refs[formName].validate().then(res => {
				if (typeof successCb === 'function') successCb();
			}).catch(err => {
				return false;
			});
		},
		/**
		 * @description 部分表单校验
		 * @param {String|Array} validateField  - 只校验传入 name 表单域的值
		 */
		formValidate(validateField, successCb, formName = 'form') {
			this.$refs[formName].validateField(validateField).then((res)=>{
			  if (typeof successCb === 'function') successCb();
			}).catch((err)=>{
			  return false;
			})
		},
		/** 
		 * @description 移除表单校验结果
		 * @param {String|Array} validateField - 为空，默认移除所有
		 * @param {Object} formRule - 表单校验规则
		 * 移除后，需要调用setTimeout,重新设置校验规则setRules
		 */
		clearValidate(formRule, validateField, formName = 'form') {
			validateField ? this.$refs[formName].clearValidate(validateField) : this.$refs[formName].clearValidate();
			setTimeout(() => {
				this.$refs[formName].setRules(formRule);
			})
		}
	}
}
