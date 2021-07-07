/*********************************************************************
 * 绘制弧形文字
 * 使用: <view class="swiper-item hfull dinlineb" v-for="(item, i) in listFinallyShow" :key="i">
					<text class="label dinlineb" v-for="it in item" :key="it.label" :style="it.style">{{it.label}}</text>
				</view>
 this.arcText = new Arctext({
			radius: uni.getSystemInfoSync().windowWidth * 2,
			data: this.dealListShow(),
			textWidth: uni.getSystemInfoSync().windowWidth <= 320 ? 9 : 12
		})
	this.listFinallyShow = this.arcText.getList();
 *********************************************************************/

class Arctext {
	/** 
	 * @params [Object]  options - 配置参数 (defaults的默认参数都可以传进来)
	 * @params [Array]   options.data - 原始数据   [{label: '展示的文字'}]
	 * @params [Number]  options.textWidth - 文字的宽度
	 * @return [{data: {}, label: '', style: ''}]
	 */
	constructor(options) {
		if (!options.data) {
			uni.showToast({title: 'data参数不存在', icon: 'none'});
			return;
		}
	  var defaults = {
	   	radius: 0,        // radius:弯曲度数，最小的值是文字长度，如果设置为-1，则显示直线。
	   	dir: 1,           // dir:默认1 (1：向下弯曲 非1（-1,0,2等）：向上弯曲 )
	   	rotate: true,     // rotate:默认true，为false则不旋转文字
			textWidth: 9,     // 文字的宽度
			list: [],         // 带平移角度的一维数组
			finallyList: []   // 带平移角度的二维数组
	   }
	   this.options = Object.assign({}, defaults, options);
	   this.dir = this.options.dir;
	   this.rotate = this.options.rotate;
		 this.radius = this.options.radius;
		 this.dtArc = null;
		 this.dtWord = null;
		 this.render();
	}
	
	render() {
		if (this.options.data.length) {
			const length = this.options.data.length;
			let dtWord = 0;
			for (let i = 0; i < length; i++) {
				const item = this.options.data[i].label;
				const len = item.length;
				for (let j = 0; j < len; j++) {
					const it = item[j];
					dtWord += this.options.textWidth;
					this.options.list.push({
						label: it,
						data: {
							center: (dtWord - this.options.textWidth) / 2
						}
					});
				}
			}
			const centerWord = dtWord / 2;
			if (this.radius < centerWord) this.radius = centerWord;
			const dtArcBase = dtWord;
			const angle = 2 * Math.asin(dtArcBase / (2 * this.radius)); // Math.asin 返回值-PI/2 到 PI/2
			this.dtArc = this.radius * angle;
			this.dtWord = dtWord;
			
			this.calcLetters();
			this.rotateWord(this.options.animation);
		}
	}
	
	// 计算文本平移、旋转的数值
	calcLetters() {
		let {radius, dtWord, dtArc, rotate, dir} = this;
		let iteratorX = 0;
		const length = this.options.list.length;
		for (let i = 0; i < length; i++) {
			const item = this.options.list[i];
			let dtArcLetter = (this.options.textWidth / dtWord) * dtArc,
			    beta = dtArcLetter / radius,
			    h = radius * (Math.cos(beta / 2)),
			    alpha = Math.acos((dtWord / 2 - iteratorX) / radius),
			    theta = alpha + beta / 2,
			    x = Math.cos(theta) * h,
			    y = Math.sin(theta) * h,
			    xpos = iteratorX + Math.abs(dtWord / 2 - x - iteratorX),
			    xval = 0 | xpos - item.data.center,
			    yval = 0 | radius - y,
			    angle = (rotate) ? 0 | - Math.asin(x / radius) * (180 / Math.PI) : 0; //在角度和弧度之间转换
			iteratorX = 2 * xpos - iteratorX;
			item.data = Object.assign(item.data, {
				x: xval,
				y: (dir === 1) ? yval : -yval,
				a: (dir === 1) ? angle : -angle
			});
		}
	}
	
	rotateWord(animation) {
		// 设置文本的偏移量
		let {radius} = this;
		const length = this.options.list.length;
		for (let i = 0; i < length; i++) {
			const item = this.options.list[i];
			const transformation = (radius === -1) ? 'none' : `translate(${item.data.x}px, ${item.data.y}px) rotate(${item.data.a}deg)`,
				    transition = (animation) ? `all ${animation.speed || 0}ms ${animation.easing ||'linear'}` :'none';
			item.style = `transition: ${transition}; transform: ${transformation}`;
		}
		
		// 处理成二维数组
		const list = [];
		let start = 0, end = 0;
		for (let i = 0; i < this.options.data.length; i++) {
			const item = this.options.data[i].label;
			start = end;
			end = start + item.length;
			list.push(this.options.list.slice(start, end));
		}
		this.options.finallyList = list;
	}
	
	// 重新设置data
	setData(list) {
		this.options.data = list;
		this.options.list = [];
		this.options.finallyList = [];
	}
	
	// 获取最终结果
	getList() {
		return this.options.finallyList;
	}
}

export default Arctext;
