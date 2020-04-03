// pages/auth/auth.js
const app = getApp()
Page({
  data: {

  },
  getUserInfo(e) {
    // console.log(e);
    const { encryptedData,rawData, userInfo, iv, signature } = e.detail;
    wx.login().then(res => {
      // console.log(res);
      const { code } = res
      app.axios({
        url: "/users/wxlogin",
        method:'POST',
				data: {
					encryptedData,
					rawData,
					iv,
					signature,
					code
				}
      }).then(res => { 
        // console.log(res);
        const { token } = res.message
        if (token) {
          wx.setStorageSync('token', token)
          wx.setStorageSync("userInfo", userInfo);
          this.triggerEvent('getUserInfo',userInfo)
          // wx.navigateBack()
        } else { 
          wx.showToast({
            title:'授权失败'
          })
        }
      })
    });
  }
})