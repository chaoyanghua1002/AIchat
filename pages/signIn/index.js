// pages/signIn/index.js
import Toast from '@vant/weapp/toast/toast';
import api from '../../api/index'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // this.getToken();
    if (app.globalData.userInfo.hasRegist && app.globalData.userInfo.openid) {
      wx.navigateTo({
        url: '/pages/chat/index',
      })
    }
  },
  // 获取token
  getToken() {
    wx.login({
      //成功放回
      success:(res)=>{
        let code= res.code
        this.getOpenid(code);
      }
    })
  },
  // 获取openid
  async getOpenid(code) {
    let res = api.getOpenid(code);
    console.log(res);
  },
  // 点击注册按钮
  async signIn() {
    let state = this.checkPhone(this.data.phone);
    if (state) { //手机号正确
      let param = {
        user_phone: this.data.phone,
        open_id: app.globalData.userInfo.openid
      }
      let res = await api.register(param);
      if(res.code === 200) {
        app.globalData.userInfo.hasRegist = true;
        wx.navigateTo({
          url: '/pages/chat/index',
        })
      }
    } else { //手机号不正确
      Toast.fail('手机号格式不正确，请检查');
    }
  },
  // 校验手机号
  checkPhone(phone) {
    var reg = /^1[3456789]\d{9}$/;
    // 判断手机号是否正确
    if (reg.test(phone)) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})