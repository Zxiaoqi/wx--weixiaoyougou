// pages/collect/collect.js
Page({
	data: {
		tabs: ["商品收藏", "品牌收藏", "店铺收藏", "浏览足迹"],
		collects: []
	},
	onLoad(options) {
		// console.log(options);
	},
	onShow() {
		const collects = wx.getStorageSync("collects") || [];
		this.setData({
			collects
		});
	},
  changeIndex(e) {
    // console.log(e);
    const { index } = e.detail
  }
});