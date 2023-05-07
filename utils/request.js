import { baseUrl } from '../config/index.js'
 
module.exports = {
/*
 * url:请求的接口地址
 * methodType:请求方式
 * data: 要传递的参数
*/
  request : function(url, methodType, data){
    let fullUrl = `${baseUrl}${url}`
    // let token = wx.getStorageSync('token') ? wx.getStorageSync('token')  : ''
    // wx.showLoading({ title: "加载中"  });
    return new Promise((resolve,reject)=>{
      wx.request({
        url: fullUrl,
        method: methodType ||　'POST',
        data,
        header: {
          'content-type': 'application/json', // 默认值
          // 'x-api-key': token,
        },
        success: (res) => {
          // 200访问成功  400失败   401未登录
          if (res.data.code == 200) {
            resolve(res.data)
          } else if (res.data.code === 400){
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
            resolve(res.data)
          } else {
            resolve(res.data)
          }
        },
        fail: () => {
          wx.showToast({
            title: '接口请求错误',
            icon:'none'
          })
          reject('接口请求错误')
        },
        complete: () => {
          setTimeout(() => {
            wx.hideLoading()
          }, 100)
        }
      })
    })
  }
}