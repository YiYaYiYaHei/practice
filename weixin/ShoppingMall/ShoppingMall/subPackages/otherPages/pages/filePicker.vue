<template>
	<view class="full">
		<uni-file-picker 
		    v-model="imageValue" 
		    fileMediatype="image" 
		    mode="grid" 
		    @select="select" 
		    @progress="progress" 
		    @success="success" 
		    @fail="fail"/>
		<!-- 我也不知为啥，使用了v-model="imageValue" ，上传多张图片的时候，显示的图片一模一样，只能通过事件手动去添加已上传的图片
		由于没有设置云服务，所以无法获取上传进度 -->
		<uni-file-picker limit="9" 
		                 title="最多选择9张图片"
										 @select="select"
										 @progress="progress" 
										 @success="success" 
										 @fail="fail"
										 @delete="deleteEvt"></uni-file-picker>
		<button type="primary" size="mini" @click="saveEvt">保存9张图片</button>
		
		<!-- 拿不到视频的地址--没啥用 -->
		<uni-file-picker limit="9"
		                 file-mediatype="video"
										 @select="select"
										 @progress="progress" 
										 @success="e => success(e, 'video')" 
										 @fail="fail"
										 @delete="e => deleteEvt(e, 'video')"></uni-file-picker>
		<button type="primary" size="mini" @click="saveEvt">保存视频</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [],
				imageList: [],
				videoList: []
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
			// 获取上传状态
			select(e){
				console.log('选择文件：',e)
			},
			// 获取上传进度
			progress(e){
				console.log('上传进度：',e)
			},

			// 上传成功
			success(e, type){
				console.log('上传成功', e);
				for (let i = 0; i < e.tempFiles.length; i++) {
					if (type === 'video') {
						
					} else {
						this.imageList.push(e.tempFiles[i]);
					}
				}
				
			},
			// 上传失败
			fail(e){
				console.log('上传失败：',e)
			},
			// 删除
			deleteEvt(e, type) {
				console.log("删除", e);
				if (type === 'video') {
					
				} else {
					let index = this.imageList.findIndex(it => it.image.location === e.tempFile.image.location);
					(index > -1) &&( this.imageList.splice(index, 1));
				}
			},
			async saveEvt() {
				for (let i = 0; i < this.imageList.length; i++) {
					let result = await this.$apis.login.fileUpload({filePath: this.imageList[i].image.location, haha: 123});
					console.log(result);
					if (result.status === 200) {
						this.$uniTools.showToast({title: '文件上传成功'});
					} else {
						this.$uniTools.showToast({title: result.message});
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
