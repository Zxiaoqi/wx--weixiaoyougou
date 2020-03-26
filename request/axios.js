module.exports = (params) => { 
    return new Promise((resolve, reject) => { 
        wx.request({
            url: "https://api-hmugo-web.itheima.net/api/public/v1" + params.url,
            method: params.method || "GET",
            data: params.data || {},
            dataType: params.dataType || 'json',
            success: (res) => { 
                resolve(res.data)
            },
            fail: (res) => { 
                reject(res)
            }
		});
    })
}