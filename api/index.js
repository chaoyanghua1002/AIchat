import { request } from '../utils/request'
module.exports = {
  // 注册
  register: (data) => {
    return request('/register', 'POST', data)
  },
  // 登录接口
  signin: (data) => {
    return request('/signin', 'POST', data)
  },
  // 回复
  aichat: (data) => {
    return request('/aichat', 'POST', data)
  },
  // 获取聊天记录
  getAichatList: (data) => {
    return request('/aichat', 'GET', data)
  },
  // 获取openid
  getOpenid: (code) => {
    let appSecret = '8b366e21b788a7f641750b1a07abfb6d';
    let appid = 'wx8097ec1a926c86ab';
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
    return new Promise((resolve,reject)=>{
      wx.request({
        url,
        success:(res)=>{
          resolve(res)
          // userInfo.openid=res.data.openid
          // //获取到你的openid
          // console.log(userInfo.openid);
        },
        fail: (err) => {
          console.log(777, err)
        }
      })
    })
  }
}