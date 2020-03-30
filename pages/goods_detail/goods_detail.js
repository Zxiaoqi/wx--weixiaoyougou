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
      // console.log(res);
      const { message, meta } = res
      const { system } = wx.getSystemInfoSync()
      if (system.toLowerCase().indexOf('ios') > -1) { 
        message.goods_introduce =
          message.goods_introduce.replace(/\?.+?webp/g,"");
      }
      // console.log(message);
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
  //加入购物车
  addCart(e) { 
    // console.log(e);
    const { goods } = e.currentTarget.dataset
    let goodArr = []
    goodArr.push({
			goods_id: goods.goods_id,
      goods_big_logo: goods.goods_big_logo,
      goods_price: goods.goods_price
		}); 
    wx.setStorageSync('goods',goodArr)
  },
  //立即购买
  toBuy(e) { 
    // console.log(e);
    const { goods } = e.currentTarget.dataset;
    app.axios({
			url: "/my/orders/create",
			data: {
				goods_id: goods.goods_id
			}
    }).then(res => { 
      console.log(res);
    })
  },
  //to购物车
  tocart() { 
    wx.switchTab({
			url: "/pages/cart/cart"
		});
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {

  },
  //用户点击右上角分享
  onShareAppMessage: function () {

  }
})