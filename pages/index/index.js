//index.js
//获取应用实例
const app = getApp()
Page({
	data: {
		swiperlist: [],
		catitemslist: [],
		productlist: [],
		topfixed:100
	},
	onLoad() {
		app.axios({
				url: "/home/swiperdata"
		})
		.then(res => {
			// console.log(res);
			const { message, meta } = res;
			if (meta.status === 200) {
				this.setData({
					swiperlist: message
				});
			}
		});
		// wx.request({
		//   url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
		//   //使用箭头函数this指向实例，否则指向wx
		// 	success:(res)=>{
		//     console.log(this);
		// 	}
		// });
		app
		.axios({
			url: "/home/catitems"
		})
		.then(res => {
			// console.log(res);
			const { message, meta } = res;
			if (meta.status === 200) {
				this.setData({
					catitemslist: message
				});
			}
		});

		app
		.axios({
			url: "/home/floordata"
		})
		.then(res => {
			// console.log(res);
			const { message, meta } = res;
			if (meta.status === 200) {
				let data = message.map(item => {
					item.productleft = item.product_list.shift();
					return item;
				});
				// console.log(data);
				this.setData({
					productlist: data,
					topfixed:100
				});
			}
		});
	},
	//跳转列表页
	goToPagelist(e) {
		// console.log(e);
		const { type, url } = e.currentTarget.dataset;
		let src = url.replace("?", "/goods_list?");
		// let toUrl = src[0] + '/goods_list?' + src[1]
		if (type === "navigate") {
			wx.navigateTo({
				url: src
			});
		}
	},
	onPullDownRefresh() {
		this.setData({
			swiperlist: [],
			catitemslist: [],
			productlist: [],
			topfixed: 0
		});
		this.onLoad();
		wx.stopPullDownRefresh()
	}
});
