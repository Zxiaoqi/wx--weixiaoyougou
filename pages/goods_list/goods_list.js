// pages/goods_list/goods_list.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    query: '',
    cid:null,
    pagenum: 2,
    pagesize: 5,
    goodData:[]
  },
  getGoodsList() { 
    app.axios({
			url: "/goods/search",
      data: {
        query: this.data.query,
        cid: this.data.cid,
        pagenum: this.data.pagenum,
        pagesize:this.data.pagesize
      }
    }).then(res => { 
      console.log(res);
      const { message, meta } = res
      if (meta.status === 200) { 
        this.setData({
          goodData:message
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   *///页面初始化 options为页面跳转所带来的参数
  onLoad: function (options) {
    // console.log(options);
    const { query, cid } = options
    this.setData({
        query,
        cid
		});
    this.getGoodsList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    wx.onstopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})