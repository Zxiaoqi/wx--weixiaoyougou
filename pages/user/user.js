// pages/user/user.js
Page({
	data: {
		navigateTitle: [
			{
				icon: "icon-daifukuan",
				title: "待付款",
				index:'1'
			},
			{
				icon: "icon-daishouhuo1",
				title: "待收货",
			},
			{
				icon: "icon-tuikuan",
				title: "退款/退货"
			},
			{
				icon: "icon-74wodedingdan",
				title: "我的订单",
				index:'0'
			}
		],
		collectTitle: ["商品收藏", "品牌收藏", "店铺收藏", "浏览足迹"],
		collectLength: 0,
		userInfo: {}
	},
	onLoad(options) {
		let collectLength = wx.getStorageSync("collects").length;
		this.setData({
			collectLength
		});
		let userInfo = wx.getStorageSync('userInfo') || {}
		if (userInfo.nickName) { 
			this.setData({
				userInfo
			})
		}
	},
	getUserInfo(e) { 
		// console.log(e);
		let userInfo = wx.getStorageSync("userInfo") || {};
		if (userInfo.nickName) {
			this.setData({
				userInfo
			});
		}
	},

	//to普通页
	onTap(e) {
		console.log(e);
	}
});