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
  }
}