module.exports = (params) => { 
    let token = wx.getStorageSync('token')
    if (params.url.indexOf('my') > -1) { 
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/auth'
            })
        }
    }

    return new Promise((resolve, reject) => { 
        wx.request({
            url: "https://api-hmugo-web.itheima.net/api/public/v1" + params.url,
            method: params.method || "GET",
            data: params.data || {},
            dataType: params.dataType || 'json',
            header: {
                Authorization:token || ''
            },
            success: (res) => { 
                resolve(res.data)
            },
            fail: (res) => { 
                reject(res)
            }
		});
    })
}