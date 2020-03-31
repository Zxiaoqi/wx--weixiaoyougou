// pages/pay/pay.js
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
	/**
	 * 生命周期函数--监听页面加载
	 */
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
	toPay() {},
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
              console.log(userAddress);
              
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