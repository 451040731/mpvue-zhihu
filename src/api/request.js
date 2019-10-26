/**
 * flyio.js
 */
import Vue from 'vue'
import Fly from 'flyio/dist/npm/wx'
var fly = new Fly()

fly.config.baseURL = 'https://news-at.zhihu.com/api/'
fly.config.timeout = 10000

Vue.prototype.$http = fly

fly.interceptors.request.use((request) => {
  wx.showLoading({ title: '加载中..' })
  wx.showNavigationBarLoading({
    success: ()=>{
      setTimeout(()=>{
        wx.hideNavigationBarLoading()
      },500)
    }
  })
  return request
})

fly.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideNavigationBarLoading()
    wx.showToast({
      title: err.message,
      icon: 'none',
      duration:1000
    })
    return promise.resolve()
  }
)

export default fly
