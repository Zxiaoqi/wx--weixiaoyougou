// pages/pay/pay.js
const app = getApp()
Page({
	data: {
		goods: [],
		totalPrice: 0,
		totalNumber: 0,
		userAddress: {
			userName: "",
			telNumber: "",
			detailAddress:''
		}
	},
	onLoad: function(options) {},
	onShow() {
		let price = 0,num = 0;
		let goods = wx.getStorageSync("goods") || [];
		let userAddress = wx.getStorageSync("userAddress") || {};
		this.setData({
			userAddress
		});
		goods = goods.filter(item => {
			if (item.isSelect) {
				price += item.goods_price * item.number;
				num += item.number;
			}
			return item.isSelect === true;
		});
		this.setData({
			goods,
			totalPrice: price,
			totalNumber: num
		});
	},
	//支付按钮
	toPay() {
		let token = wx.getStorageSync('token')
		if (!token) {
			wx.showToast({
				title: '请先登录',
				icon: 'none',
				duration: 300,
				success: res => { 
					wx.navigateTo({
						url: "/pages/auth/auth"
					})
				}
			})
		} else { 
			const order_price = this.data.totalPrice,
				consignee_addr = this.data.userAddress.detailAddress;
			const goods = this.data.goods.map(item => { 
				return {
					goods_id: item.goods_id,
					goods_number: item.number,
					goods_price:item.goods_price
				}
			})
			try {
				app.axios({
					url: "/my/orders/create",
					method:'POST',
					data: {
						order_price,
						consignee_addr,
						goods
					}
				}).then(res => { 
					// console.log(res);
					const { order_number } = res.message
					app.axios({
						url: "/my/orders/req_unifiedorder",
						method: "POST",
						data: {
							order_number
						}
					}).then(res => { 
						// console.log(res);
						const { pay } = res.message
						wx.requestPayment(pay);
						let timer=setInterval(() => {
							app.axios({
								url: "/my/orders/chkOrder",
								method: "POST",
								data: {
									order_number
								}
							}).then(res => {
								// console.log(res);
								const { message } = res
								if (message === '支付成功') { 
									clearInterval(timer)
									this.payOrderSuccess()
								}
							})
						}, 1000);
					})
				})

			} catch (error) {
				wx.showToast({
					title: '出现错误',
					icon:'none'
				})
			}
		}
	},
	payOrderSuccess() { 
		let cart = wx.getStorageSync('goods').filter(v => !v.isSelect)
		wx.setStorageSync('goods', cart)
		wx.redirectTo({
			url:'/pages/order/order'
		})
	},
	//获取获取用户授权设置
	getUserSetting() {
		wx.getSetting({
			success: res => {
				// console.log(res);
				const address = res.authSetting["scope.address"];
				if (address || address === undefined) {
					wx.chooseAddress({
						success: res => {
							console.log(res);
							const {
								provinceName,
								cityName,
								countyName,
								detailInfo,
								telNumber,
								userName
							} = res;
							const userAddress = {
								userName,
								telNumber,
								detailAddress: provinceName + cityName + countyName + detailInfo
							};
							this.setData({
								userAddress
              				});
            //   console.log(userAddress);
							wx.setStorageSync("userAddress", userAddress);
						}
					});
				} else {
					wx.openSetting();
				}
			}
		});
	}
});