//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  handlemyevent(e,b){
    console.log(e,b);
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.animate('#container', [
      { opacity: 0.0, rotate: 90, backgroundColor: '#FF0000' },
      { opacity: 0.5, rotate: 45, backgroundColor: '#00FF00'},
      { opacity: 1.0, rotate: 0, backgroundColor: '#FF0000' },
      ], 5000, function () {
        this.clearAnimation('#container', { opacity: true, rotate: true }, function () {
          console.log("清除了#container上的opacity和rotate属性")
        })
    }.bind(this))
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
