// pages/cart/cart.js
Page({
	data: {
		goods: [],
		selectAll: false,
		totalPrice: 0,
		totalNumber: 0
	},

	onShow() {
		const goods = wx.getStorageSync("goods") || [];
		this.setData({
			goods
		});
		let arr,
			price = 0,
			num = 0,
			flag;
		arr = goods.filter(item => {
			price += item.goods_price * item.number;
			num += item.number;
			return item.isSelect === true;
		});
		flag = arr.length === goods.length;
		// console.log(this.data.selectAll);
		this.setData({
			selectAll: flag,
			totalPrice: price,
			totalNumber: num
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
		let num = this.data.goods[index].number;
		if (num > 0) {
			this.data.goods[index].number--;
		}
		wx.setStorageSync("goods", this.data.goods);
		this.onShow();
	},
	handleSelectAll() { 
		if (!this.data.selectAll) {
			this.setData({
				selectAll: true
			});
		} else { 
			this.setData({
				selectAll: false
			});
		}
		this.data.goods.map(item => {
			item.isSelect = this.data.selectAll;
		});
		wx.setStorageSync("goods", this.data.goods);
		this.onShow();
	}
});