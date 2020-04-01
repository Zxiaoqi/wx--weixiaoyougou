// pages/user/user.js
Page({
	data: {
		navigateTitle: [
			{
				icon: "icon-daifukuan",
				title: "待付款"
			},
			{
				icon: "icon-daishouhuo1",
				title: "待收货"
			},
			{
				icon: "icon-tuikuan",
				title: "退款/退货"
			},
			{
				icon: "icon-74wodedingdan",
				title: "我的订单"
			}
		]
	},
	onLoad: function(options) {},
  onShow: function () { },
  //to普通页
  onTap(e) { 
    console.log(e);
    
  }
});