// app.js
import api from './api/index'
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    let that = this;
    // 登录
    wx.login({
      success: async (res) => {
        if (res && res.code) {
          that.signin(res.code);
        }
      }
    })
  },
  async signin(code) {
    let res = await api.signin({code});
    if (res && res.code === 200) {
      this.globalData.userInfo.hasRegist = true;
    } else {
      this.globalData.userInfo.hasRegist = false;
    }
    if (res && res.data) {
      this.globalData.userInfo.openid = res.data;
    } else {
      wx.showToast({
        title: '未获取到openid',
        icon:'none'
      })
    }
  },
  globalData: {
    userInfo: {
      hasRegist: false, //是否注册了
      openid: ''
    }
  }
})
