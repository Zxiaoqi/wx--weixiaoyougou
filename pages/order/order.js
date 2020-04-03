// pages/order/order.js
const app = getApp()
const { formatTime } = require("../../utils/util");
Page({
  data: {
    tabs: ['全部', '待付款', '待发货'],
    activeIndex: 0,
    orders:[]
  },
  onLoad(options) {
    if (options.index) { 
      this.setData({
        activeIndex:+options.index
      })
    }
    let index = this.data.activeIndex + 1;
    this.getOrderData(index);
  },
  //改变index
  changeIndex(e) { 
    // console.log(e);
    const { index } = e.detail
    this.getOrderData(index+1)
    
  },
  //获取order数据
  getOrderData(index=1) { 
    app.axios({
      url: "/my/orders/all",
      data: {
        type:index
      }
    }).then(res => { 
      // console.log(res);
      const { message, meta } = res
      if (meta.status === 200) {
        let orders=message.orders.map(item => { 
          item.formatTime = formatTime(new Date(item.create_time * 1000));
          return item
        })
        // console.log(orders);
        this.setData({
          orders
        })
      }
    })
  }
})