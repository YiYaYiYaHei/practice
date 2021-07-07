/*********************************************************************
 * 混入-列表方法
 * 上拉加载，需设置requestListParams参数，onLoad生命周期中需要手动调用getList，调用getList方法前需设置请求地址和参数
 * 需在onReachBottom生命周期，调用reachBottomEvt方法
 *********************************************************************/
 
 export default {
	data() {
		return {
			// 分页参数
			pagingData: {
				size: 10,     // 每页展示的条数
				current: 1,   // 当前页
				total: 0      // 总数
			},
			// 列表数据
			listData: [],
			// 列表接口请求参数
			requestListParams: {
				url: '',
				params: null
			},
			// 加载更多参数
			loadMoreData: {
				iconSize: 24,
				status: 'more',
				showIcon: true,
				iconType: 'auto',
				color: '#777777',
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				otherStatus: '', // 其他状态：当otherStatus有值时，表示接口请求失败otherStatus=error/数据为空otherStatus=empty
			}
		}
	},
	methods: {
		// 页面滚动到底部的事件--在onReachBottom生命周期调用
		reachBottomEvt() {
			this.pagingData.current++;
			this.getList();
		},
		// 获取分页参数
		getPageParams() {
			return {
				pageCurrent: this.pagingData.current,
				pageSize: this.pagingData.size,
			}
		},
		// getList请求前，需判断是否最后一页
		isLoadMore() {
			return (this.pagingData.current - 1) * this.pagingData.size >= this.pagingData.total;
		},
		// 获取列表数据--调用getList方法前需设置请求地址(requestListParams.url)和参数(requestListParams.params 对分页参数已做自动添加)
		async getList(callback) {
			// 若为最后一页,则不发请求
			if (!!this.listData.length && this.isLoadMore()) {
				this.loadMoreData.status = 'noMore';
				return;
			}
			this.requestListParams.params = this.requestListParams.params ? Object.assign(this.requestListParams.params, {...this.getPageParams()}) : {...this.getPageParams()};
			this.loadMoreData.status = 'loading';
			let result = await this.$apis.login[this.requestListParams.url](this.requestListParams.params);
			this.loadMoreData.status = 'more';
			if (result.status === 200) {
				this.listData = this.listData.concat((result.data || {row: []}).row);
				this.pagingData.total = (result.data || {total: []}).total;
				
				// 设置加载更多的状态--防止上拉过快，最后一页“加载更多”的提示语不正确(解决滑到最后一页的时候，没有触发onReachBottom，需要手动下滑在上拉的问题)
				this.loadMoreData.status = this.pagingData.current === Math.ceil(this.pagingData.total / this.pagingData.size) ? 'noMore' : 'more';
				this.loadMoreData.otherStatus = this.pagingData.total ? '' : 'empty';
			} else {
				this.loadMoreData.otherStatus = 'error';
				this.$uniTools.showToast({title: result.message});
			}
			callback && callback();
		},
		// 按条件搜索时调用, type=pullDownRefresh表示下拉刷新操作
		refreshList(type) {
			this.pagingData.current = 1;
			this.pagingData.total = 0;
			this.listData = [];
			setTimeout(() => {
				(type === 'pullDownRefresh') && this.getList(() => uni.stopPullDownRefresh());
				(type !== 'pullDownRefresh') && this.getList();
			}, 800);
		}
	}
 }