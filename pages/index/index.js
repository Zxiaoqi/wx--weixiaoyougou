//index.js
//获取应用实例
const app = getApp()
Page({
	data: {
		swiperlist: [],
		catitemslist:[]
	},
	onLoad() {
		// this.animate('#container', [
		//   { opacity: 0.0, rotate: 90 },
		//   { opacity: 0.5, rotate: 45},
		//   { opacity: 1.0, rotate: 0 },
		//   ], 5000, function () {
		//     this.clearAnimation('#container', { opacity: true, rotate: true }, function () {
		//       console.log("清除了#container上的opacity和rotate属性")
		//     })
		// }.bind(this))
		app.axios({
				url: "/home/swiperdata"
			}).then(res => {
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
    app.axios({
				url: "/home/catitems"
			})
			.then(res => {
        console.log(res);
        const { message, meta } = res
        if (meta.status === 200) { 
          this.setData({
            catitemslist:message
          })
        }
		});
	}
});
