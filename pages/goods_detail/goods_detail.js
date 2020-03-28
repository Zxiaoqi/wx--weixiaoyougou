// pages/goods_detail/goods_detail.js
const app = getApp()
Page({
  data: {
    goods_id: 0,
    goodsDetail: {
      pics:[]
    }
  },
  getGoodsDetail() { 
    app.axios({
      url: "/goods/detail",
      data: {
        goods_id:this.data.goods_id
      }
    }).then(res => { 
      console.log(res);
      const { message, meta } = res
      if (meta.status === 200) { 
        this.setData({
          goodsDetail:message
        })
      }
    })
  },
  onLoad(options) {
    const { goods_id } = options
    // console.log(goods_id);
    if (goods_id) { 
      this.setData({
				goods_id
      });
    }
    this.getGoodsDetail()
  },
  //图片预览
  previewImage(e) { 
    // console.log(e);
    const { img } = e.currentTarget.dataset
    const pics = this.data.goodsDetail.pics.map(item => {
      if (item.pics_big) { 
        return item.pics_big
      }
    })
    wx.previewImage({
			current: img,
			urls: pics
		});
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {

  },
  //用户点击右上角分享
  onShareAppMessage: function () {

  }
})