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
		const cate = wx.getStorageSync('cate')
		if (!cate) {
			this.getCateList()
		} else { 
			// console.log(cate);
			const { time, data } = cate
			let saveTime = Date.now() - time
			if (saveTime >= 300000) {
				wx.removeStorageSync('cate')
				this.getCateList()
			} else { 
				cateData = data;
				const categorylist = data.map(item => {
					return {
						cat_id: item.cat_id,
						cat_name: item.cat_name
					};
				});
				const cateChild = cateData[0].children;
				this.setData({
					categorylist,
					cateChild
				});
			}
		}
	},
	getCateList() { 
		app.axios({
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
			wx.setStorageSync('cate', {time:Date.now(),data:message})
		});
	}
});