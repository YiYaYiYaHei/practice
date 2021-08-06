/*********************************************************************
 * 混入-支付-公共方法
 *********************************************************************/
 
import {mapState, mapGetters} from 'vuex';
export default {
	data() {
		return {}
	},
	computed: {
		...mapState({
			openid: state => state.userInfo.openid,
			sessionKey: state => state.userInfo.sessionKey
		}),
		...mapGetters({
			token: 'getToken'
		})
	},
	methods: {
		
	}
}
