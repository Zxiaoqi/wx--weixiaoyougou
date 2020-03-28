// pages/goods_list/goods_list.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    query: 'TCL',
    cid:'10',
    pagenum: 1,
    pagesize: 10,
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
      // console.log(res);
      const { message, meta } = res
      if (meta.status === 200) { 
        this.setData({
          goodData:message.goods
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
    if (query && cid) { 
      this.setData({
          query,
          cid
      });
    }
    this.getGoodsList()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
    if (this.data.pagenum != 1) { 
			this.setData({
				pagenum: this.data.pagenum - 1
			});
		  this.getGoodsList();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.setData({
			pagenum:this.data.pagenum+1
		});
    this.getGoodsList()
  },
})