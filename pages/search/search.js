// pages/search/search.js
const app = getApp()
Page({
  data: {
    query: '电视',
    searchData:[]
  },
  onChange(e) { 
    // console.log(e);
    const { value } = e.detail
    this.setData({
      query: value
    })
  },
  onSearch(e) { 
    // console.log(e);
    const { value } = e.detail;
		// this.setData({
		// 	query: value
    // });
    // if (!value) { 
    //   wx.showToast({
    //     title: '请输入内容',
    //     icon:'none'
    //   })
    //   return false;
    // }
    app.axios({
      url: "/goods/qsearch",
      data: {
        query:this.data.query
      }
    }).then(res => { 
      console.log(res);
      const { message, meta } = res
      if (meta.status === 200) { 
        this.setData({
          searchData:message
        })
      }
    })
  },
  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {

  }
})