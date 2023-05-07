// pages/chat/index.js
import api from '../../api/index'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'',
    talkList: [
      {
        state: 1, //1客服  2学生
        text: '你好，我是小福，您可以向我提问任何问题'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (!app.globalData.userInfo.hasRegist) {
      wx.redirectTo({
        url: '/pages/signIn/index'
      })
    }
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
    this.getList();
  },
  // 查询聊天记录
  async getList() {
    let param = {
      open_id: app.globalData.userInfo.openid
    };
    let res = await api.aichat(param);
    console.log(1111, res);
  },
  getInputInfo(res) {
    const str=res.detail.value /*1 拿到输入框数据 */
    this.setData({  /*赋值方法*/
      text: str       /* 2 赋值到data里面的text里*/
    })
  },
  async sendInfo(){    //点击发送按钮
    if (!this.data.text || !this.data.text.trim()) {
      wx.showToast({
        title: '请输入文字',
        icon: 'error',
        duration: 2000
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    });
    let param = {
      open_id: app.globalData.userInfo.openid,
      vx_msg: this.data.text
    }
    let res = await api.aichat(param);
    let list = this.data.talkList; /* 3 先拿到聊天记录*/
    let obj = {
      state: 2, //1客服  2学生
      text: this.data.text   /*4 输入框数据组装成聊天记录的数据结构 */
    };
    list.push(obj);  /*5 插入到聊天记录里 */
    this.setData({  /*赋值方法*/
      talkList: list   /*6全部 聊天记录渲染到页面上 */
    })
    this.setData({  /*赋值方法*/
      text : ''        /*7 清空输入框 */
    })
    this.repeatInfo()
    wx.createSelectorQuery().select('#chat-box').boundingClientRect(res => {
      wx.pageScrollTo({
        scrollTop: res.height + 30,
        duration: 300
      })
    }).exec()/*异步操作 */
  },
  repeatInfo(){   /*自动回复*/
    let obj = {
      state: 1, //1客服  2学生
      text: '不好意思，您的问题无法回答'  
    };
    let list = this.data.talkList;
    list.push(obj);
    this.setData({  /*赋值方法渲染到页面上*/
      talkList: list   
    })
    setTimeout(function () {   //对完接口去掉延时，只留wx.hideLoading()
      wx.hideLoading()
    }, 2000)
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