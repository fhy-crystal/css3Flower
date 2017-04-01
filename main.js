~(function(doc) {
	function fallingLeaves(id, num) {
		this.body = doc.body;
		this.support = false;
		this.container = id ? doc.getElementById(id) : this.body;
		this.num = num ? num : 5;
		this.init();
	}
	fallingLeaves.prototype = {
		// 初始化
		init: function() {
			this.isSupport(); // 是否支持动画
			if (this.support != false) {
				for (var i = 0; i < this.num; i++) {
					this.container.appendChild(this.createLeaf()); // 绘制落叶
				}
			}
		},
		// 判断是否支持
		isSupport: function() {
			var domPrefixer = 'Webkit/Moz/O/ms/a'.split('/');
			for (var i = 0; i < domPrefixer.length; i++) {
				if (this.container.style[domPrefixer[i] + 'AnimationName'] !== undefined) {
					this.support = domPrefixer[i];
					break;
				}
				if (domPrefixer[i] == 'a') {
					if (this.container.style.AnimationName !== undefined) {
						this.support = domPrefixer[i];
						break;
					}
				}
			}
		},

		// 生成一个low~high之间的随机整数
		randomInt: function(low, high) {
			return low + Math.floor(Math.random() * (high - low));
		},

		// 生成一个low~high之间的随机小数
		randomFloat: function(low, high) {
			return low + Math.random() * (high - low);
		},

		pixelValue: function(value) {
			return value + 'px';
		},

		durationValue: function(value) {
			return value + 's';
		},

		createLeaf: function() {
			var self = this,
				leafDiv = doc.createElement('div'),
				leafImg = doc.createElement('img'),
				AnimationName = (Math.random() < 0.5) ? 'imgRotate' : 'spinImgRotate';
				fadeAndDropDuration = self.durationValue(self.randomFloat(5, 11));
				spinDuration = self.durationValue(self.randomFloat(4, 8));
				leafDelay = self.durationValue(self.randomFloat(0, 5));

			leafDiv.className = 'leaf';
			leafImg.src = "http://sandbox.runjs.cn/uploads/rs/475/ao7egt7f/" + self.randomInt(1, self.num) + '.png';
			leafDiv.style.top = self.pixelValue(10);
			leafDiv.style.right = self.pixelValue(self.randomInt(0, 50));
			if (self.container.style[self.support + 'AnimationName'] !== undefined) {
				leafImg.style[self.support + 'AnimationName'] = AnimationName;
				leafImg.style[self.support + 'AnimationDuration'] = spinDuration;
				leafDiv.style[self.support + 'AnimationName'] = 'fade, drop';
				leafDiv.style[self.support + 'AnimationDelay'] = leafDelay + ',' + leafDelay;
				leafDiv.style[self.support + 'AnimationDuration'] = fadeAndDropDuration + ',' + fadeAndDropDuration;
			}
			if (self.support == 'a') {
				leafImg.style.animationName = AnimationName;
				leafImg.style.animationDuration = spinDuration;
				leafDiv.style.animationName = 'fade, drop';
				leafDiv.style.animationDelay = leafDelay + ',' + leafDelay;
				leafDiv.style.animationDuration = fadeAndDropDuration + ',' + fadeAndDropDuration;
			}
			leafDiv.appendChild(leafImg);
			return leafDiv;
		}
	}
	new fallingLeaves('content');
})(document);