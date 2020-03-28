// pages/goods_list/goods_list.js
const app = getApp()
let total = 0;
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		tabs: ["综合", "销量", "价格"],
		params: {
			query: "",
			cid: "",
			pagenum: 1,
			pagesize: 10
		},
		goodData: [],
		showBack:false
	},
	getGoodsList() {
		app
			.axios({
				url: "/goods/search",
				data: this.data.params
			})
			.then(res => {
				// console.log(res);
				const { message, meta } = res;
				total = message.total;
				if (meta.status === 200) {
					this.setData({
						goodData: [...this.data.goodData, ...message.goods]
					});
					wx.stopPullDownRefresh();
				}
			});
	}, //页面初始化 options为页面跳转所带来的参数
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// console.log(options);
		const { query, cid } = options;
		if (query && cid) {
			this.setData({
				query,
				cid
			});
		}
		this.getGoodsList();
	},
	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {
		// console.log(this.data);
		this.data.params.pagenum = 1;
		this.setData({
			goodData: []
		});
		this.getGoodsList();
	},
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {
		if (this.data.goodData.length == total) {
			wx.showToast({
				title: "已经到底了",
				duration: 1500
			});
		} else {
			this.data.params.pagenum++;
			this.getGoodsList();
		}
	},
	onPageScroll(e) { 
		// console.log(e);
		if (e.scrollTop > 100) { 
			this.setData({
				showBack:true
			});
		}
	}
});