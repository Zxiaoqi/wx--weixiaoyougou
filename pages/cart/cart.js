// pages/cart/cart.js
Page({
	data: {
		goods: [],
		selectAll: false,
		totalPrice: 0,
		totalNumber: 0,
		isdisbled: true,
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
			if (item.isSelect) {
				this.setData({
					isdisbled: false
				});
			} else { 
				this.setData({
					isdisbled: true
				});
			}
			return item.isSelect === true;
		});
		flag = arr.length === goods.length;
		if (arr.length == 0) flag = false;
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
		if (num > 1) {
			this.data.goods[index].number--;
		} else {
			wx.showModal({
				title: "提示",
				content: "是否删除商品",
				showCancel: true,
				cancelText: "取消",
				confirmText: "确定",
				confirmColor: "#0051ff",
				success: res => {
					if (res.confirm) {
						this.data.goods.splice(index, 1);
						wx.setStorageSync("goods", this.data.goods);
						this.onShow();
					}
				}
			});
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
	},
	toPay() {
		const index = this.data.goods.findIndex(item => (item.isSelect === true ))
		// console.log(index);
		if (index !== -1) { 
			wx.navigateTo({
				url: "/pages/pay/pay"
			});
		}
	}
});