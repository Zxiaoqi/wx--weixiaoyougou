// pages/cart/cart.js
Page({
	data: {
		goods: []
	},

	onShow() {
		const goods = wx.getStorageSync("goods") || [];
		this.setData({
			goods
		});
	},
	handleSelect(e) {
		const { isselect, index } = e.currentTarget.dataset;
		// console.log(isselect,index);
		if (!isselect) {
			this.data.goods[index].isSelect = true;
		} else {
			this.data.goods[index].isSelect = false;
		}
		// console.log(this.data.goods);
		wx.setStorageSync("goods", this.data.goods);
		this.onShow();
	},
	addNum(e) { 
		const { index } = e.currentTarget.dataset;
		
			this.data.goods[index].number++;
		wx.setStorageSync("goods", this.data.goods);
		this.onShow();
	},
	lessNum(e) { 
		const { index } = e.currentTarget.dataset;
		let num = this.data.goods[index].number
		if (num > 0) {
			this.data.goods[index].number--;
		}
		wx.setStorageSync("goods", this.data.goods);
		this.onShow();
	}
});