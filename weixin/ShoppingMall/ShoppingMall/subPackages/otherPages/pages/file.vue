<template>
	<view class="full">
		<button type="primary" size="mini" @click="$uniTools.chooseImage({}, uploadImage)">图片上传</button>
		
		<button type="primary" size="mini" @click="downLoadFile">文件下载</button>
		
		<button type="primary" size="mini"  @click="$uniTools.chooseImage({}, showImage)">展示图片</button>
		<image :src="imgUrl"></image>
		
		<button type="primary" size="mini" @click="getList">获取列表--task,</button>
		<button type="primary" size="mini" @click="getList2">获取列表</button>
		<button type="primary" size="mini">uni-file-picker使用</button>
		
		<image src="https://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fyouimg1.c-ctrip.com%252Ftarget%252Ftg%252F004%252F531%252F381%252F4339f96900344574a0c8ca272a7b8f27.jpg%26refer%3Dhttp%253A%252F%252Fyouimg1.c-ctrip.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1625019895%26t%3D2ba3e20422a6d7134ff445705a3018eb&thumburl=https%3A%2F%2Fss1.bdstatic.com%2F70cFuXSh_Q1YnxGkpoWK1HF6hhy%2Fit%2Fu%3D3206689113%2C2237998950%26fm%3D26%26gp%3D0.jpg"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: ''
			}
		},
		onLoad(params) {
			// 页面加载--获取路由参数
		},
		onPullDownRefresh() {
			// 监听用户下拉动作，一般用于下拉刷新
		},
		onReachBottom() {
			// 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。
		},
		methods: {
			taskCallBack(task, options) {
				console.log("getTask:", task, options);
				task.abort();
			},
			async getList() {
				let result = await this.$apis.login.getList({}, this.taskCallBack);
			},
			async getList2() {
				let result = await this.$apis.login.getList({});
			},
			showImage(files) {
				this.imgUrl = files.tempFilePaths[0];
			},
			async uploadImage(files) {
				for (let i = 0; i < files.tempFiles.length; i++) {
					let result = await this.$apis.login.fileUpload({filePath: files.tempFiles[i].path, haha: 123});
					if (result.status === 200) {
						this.$uniTools.showToast({title: '文件上传成功'});
					} else {
						this.$uniTools.showToast({title: result.message});
					}
				}
			},
			successCb(res) {
				console.log("成功", res);
			},
			// 文件下载
			async downLoadFile() {
				let result = await this.$apis.login.fileDownLoad({name: 'CeY8ZqU0b3fd75d651a7b045fac0a9e757ea43877c48918.jpg'});
				console.log(result);
				if (result.status === 200) {
					this.$uniTools.saveFile(result.tempFilePath);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
