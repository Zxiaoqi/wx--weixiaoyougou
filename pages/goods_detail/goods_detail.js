// pages/goods_detail/goods_detail.js
const app = getApp()
Page({
  goodsObj: {},
	data: {
		goods_id: 0,
		goodsDetail: {
			pics: []
		},
		isCollect: false,
		iconShoucang: "icon-shoucang2",
		color:""
	},
	getGoodsDetail() {
		app
			.axios({
				url: "/goods/detail",
				data: {
					goods_id: this.data.goods_id
				}
			})
			.then(res => {
				// console.log(res);
				const { message, meta } = res;
        const { system } = wx.getSystemInfoSync();
        // console.log(wx.getSystemInfoSync());
				if (system.toLowerCase().indexOf("ios") > -1) {
					message.goods_introduce = message.goods_introduce.replace(
						/\?.+?webp/g,
						""
					);
        }
				if (meta.status === 200) {
					this.setData({
						goodsDetail: message
					});
				}
			});
	},
	onLoad(options) {
		const { goods_id } = options;
		// console.log(goods_id);
		if (goods_id) {
			this.setData({
				goods_id
			});
		}
		this.getGoodsDetail();
	},
	onShow() { 
		let collects = wx.getStorageSync('collects') || []
		let index = collects.findIndex(item => item.goods_id == this.data.goods_id)
		if (index > -1) { 
			this.setData({
				isCollect: true,
				iconShoucang: "icon-shoucang1",
				color: "red"
			});
		}
	},
	//图片预览
	previewImage(e) {
		// console.log(e);
		const { img } = e.currentTarget.dataset;
		const pics = this.data.goodsDetail.pics.map(item => {
			if (item.pics_big) {
				return item.pics_big;
			}
		});
		wx.previewImage({
			current: img,
			urls: pics
		});
	},
	processData() { 
		const {
			goods_id,
			goods_name,
			goods_big_logo,
			goods_price
		} = this.data.goodsDetail;
		const goods = wx.getStorageSync("goods") || [];
		const index = goods.findIndex(v => v.goods_id === goods_id);
		this.goodsObj = {
			goods_id,
			goods_name,
			goods_big_logo,
			goods_price,
			isSelect: true,
			number: 1
		};
		return {
			goods,
			index
		}
	},
	//加入购物车
	addCart() {
		const { goods,index} = this.processData()
		if (index === -1) {
			goods.unshift(this.goodsObj);
			wx.showToast({
				title: "已加入购物车",
				mask: true
			})
		} else { 
			goods[index].number++;
			wx.showToast({
				title: "商品数量增加",
				mask: true
			});
    	}
    	wx.setStorageSync("goods", goods);
	},
	//立即购买
	toBuy() {
		const { goods, index } = this.processData();
		if (index === -1) { 
			goods.unshift(this.goodsObj);
		}
		wx.setStorageSync("goods", goods);
		wx.switchTab({
			url: "/pages/cart/cart"
		});
	},
	//to购物车
	tocart() {
		wx.switchTab({
			url: "/pages/cart/cart"
		});
	},
	//收藏改变
	changeCollect(e) {
		let { goods } = e.currentTarget.dataset;
		let collects = wx.getStorageSync("collects") || [];
		if (!this.data.isCollect) {
			this.setData({
				isCollect: true,
				iconShoucang: "icon-shoucang1",
				color:"red"
			});
			collects.unshift({
				goods_id: goods.goods_id,
				goods_name: goods.goods_name,
				goods_big_logo: goods.goods_big_logo,
				goods_price: goods.goods_price
			});
			wx.setStorageSync("collects", collects);
		} else {
			this.setData({
				isCollect: false,
				iconShoucang: "icon-shoucang2",
				color:"#000"
			});
			collects = collects.filter(val => {
				if (goods.goods_id != val.goods_id) {
					return val;
				}
			});
			// console.log(goodArr);
			wx.setStorageSync("collects", collects);
		}
	}
});