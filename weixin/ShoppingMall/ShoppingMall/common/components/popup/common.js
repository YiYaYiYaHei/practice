export default {
	props: {
		nodeId: {
			type: Number,
			default: 0
		}
	},
	watch: {
		nodeId: function(newVal) {
			if (!!newVal) {
				this.open();
			} else {
				this.close();
			}
		}
	},
	methods: {
		open() {
			this.$refs.popup.open();
		},
		close() {
			this.$refs.popup.close();
		},
	}
}