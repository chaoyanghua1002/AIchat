// pages/chat/index.js
import api from '../../api/index'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'',
    defaultList: [
      {
        state: 1, //1客服  2学生
        text: '您好，我是小福，有任何问题，都可以问我哟~'
      },
      {
        state: 1, //1客服  2学生
        text: `小福无所不能，我可以：\n
        1.撰写作文、论文、小说、剧本等，润色和修改已有文案；\n
        2.翻译中英文文档和文字;\n
        3.我可以作为您的倾诉对象和聆听者,为您解忧和讲故事；\n
        4.我可以扮演面试官、书籍人物等各种角色,模拟真实场景让您练习;\n
        5.除上述功能外,我还可以根据您的具体需求提供定制化服务。\n
        您可以尽量详细地描述需求,我会根据描述提供最匹配和精确的解决方案，您可以这样问我：\n
        例1:写一篇《XXX》读后感，\n
        例2:写一篇五一出游的英语作文，关于我和爸妈去桂林游玩\n
        例3:写一个能火的短视频剧本\n
        例4:给我讲一下泰坦尼克号这部电影\n
        例5:js电话号码正则表达式\n
        例6:你现在是面试官，开始和我对话..`
      },
    ],
    historyObj: {
      state: '',
      text: ''
    },
    talkList: [],
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
    let list = app.globalData.userInfo.history || [];
    let talkList = [];
    list.forEach(v => {
      if (v.state) {
        let obj = {
          state: 2, //1客服  2客户
          text: v.state
        };
        talkList.push(obj)
      };
      if (v.text) {
        let obj = {
          state: 1, //1客服  2客户
          text: v.text
        };
        talkList.push(obj)
      };
    })
    if (talkList.length === 0) {
      talkList = this.data.defaultList
    }
    this.setData({talkList})
    this.scrollBottom();
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
  async sendInfo() {    //点击发送按钮
    if (!this.data.text || !this.data.text.trim()) {
      wx.showToast({
        title: '请输入文字',
        icon: 'error',
        duration: 2000
      })
      return
    }
    let list = this.data.talkList; /* 3 先拿到聊天记录*/
    let obj = {
      state: 2, //1客服  2学生
      text: this.data.text   /*4 输入框数据组装成聊天记录的数据结构 */
    };
    list.push(obj);  /*5 插入到聊天记录里 */
    this.setData({  /*赋值方法*/
      talkList: list,   /*6全部 聊天记录渲染到页面上 */
      historyObj: {
        state: this.data.text,
        text: ''
      }
    })
    this.scrollBottom()
    await this.repeatInfo();
    let arr = app.globalData.userInfo.history;
    arr = [...arr, {...this.data.historyObj}];
    app.globalData.userInfo.history = arr;
    console.log(7777, app.globalData.userInfo.history);
    this.setData({  /*赋值方法*/
      text : '',        /*7 清空输入框 */
      historyObj: {
        state: '',
        text: ''
      }
    })
  },
  async repeatInfo(){   /*自动回复*/
    if (!this.data.text) {
      wx.showToast({
        title: '未获取到文本',
        icon: 'error',
        duration: 2000
      })
      return
    }
    wx.showLoading({
      title: '正在组织语言',
      mask: true
    });
    let param = {
      open_id: app.globalData.userInfo.openid,
      vx_msg: this.data.text
    }
    let res = await api.aichat(param);
    if (res.code === 200) {
      let reply = res.data.hf
      let obj = {
        state: 1, //1客服  2学生
        text: reply || '不好意思，您的问题无法回答'  
      };
      let list = this.data.talkList;
      let historyObj = this.data.historyObj;
      historyObj.text = reply
      list.push(obj);
      this.setData({  /*赋值方法渲染到页面上*/
        talkList: list,
        historyObj
      })
      wx.hideLoading()
      this.scrollBottom();
    }
  },
  // 页面滚动到底部
  scrollBottom() {
    wx.createSelectorQuery().select('#chat-box').boundingClientRect(res => {
      wx.pageScrollTo({
        scrollTop: res.height + 30,
        duration: 300
      })
    }).exec()/*异步操作 */
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