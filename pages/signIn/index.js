// pages/signIn/index.js
import Toast from '@vant/weapp/toast/toast';
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

  },
  // 点击注册按钮
  signIn() {
    console.log(this.data.phone);
    let state = this.checkPhone(this.data.phone);
    if (state) { //手机号正确

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