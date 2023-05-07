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
    wx.showLoading({ title: "加载中"  });
    let res = await api.signin({code});
    wx.hideLoading()
    if (res && res.code === 200) {
      this.globalData.userInfo.hasRegist = true;
      this.globalData.userInfo.history = res.data.user_history;
    } else {
      this.globalData.userInfo.hasRegist = false;
    }
    if (res && res.data && res.data.open_id) {
      this.globalData.userInfo.openid = res.data.open_id;
    } else {
      wx.showToast({
        title: '未获取到openid',
        icon:'none'
      })
    }
  },
  globalData: {
    userInfo: {
      history: [],
      hasRegist: false, //是否注册了
      openid: ''
    }
  }
})
