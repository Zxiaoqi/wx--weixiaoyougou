// pages/category/category.js
const app = getApp();
let cateData;
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		activeIndex: 0,
		categorylist: [],
		cateChild: [],
		scrolltop:0
	},
	//左边导航条
	changeIndex(e) {
		// console.log(e.currentTarget);
		const { index } = e.currentTarget.dataset;
		this.setData({
			activeIndex: index,
			cateChild: cateData[index].children,
			scrolltop:0
		});
	},
	// 生命周期函数--监听页面加载
	onLoad() {
		app
			.axios({
				url: "/categories"
			})
			.then(res => {
				// console.log(res);
				const { message, meta } = res;
				cateData = message;
				// console.log(cateData);

				const categorylist = message.map(item => {
					return {
						cat_id: item.cat_id,
						cat_name: item.cat_name
					};
				});
				const cateChild = cateData[0].children;
				// console.log(cateChild);
				if (meta.status === 200) {
					this.setData({
						categorylist,
						cateChild
					});
				}
			});
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {}
});