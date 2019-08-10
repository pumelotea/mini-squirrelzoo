// pages/me/me.js
const app = getApp()
import Api from '../../apis/http.api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImg: '/images/logo.png',
    nickName:'松鼠乐园',
    readCount: 0,
    starCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
    })

    Api.getMyUserInfo().then(res=>{
      let r = res.data
      if (r.code === '0'){
        this.setData({
          headImg: r.data.avatar,
          nickName: r.data.display_name,
          readCount: app.getReadCount(),
          starCount: app.getStarCount()
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      readCount: app.getReadCount(),
      starCount: app.getStarCount()
    })
    Api.getMyUserInfo().then(res => {
      let r = res.data
      if (r.code === '0') {
        this.setData({
          headImg: r.data.avatar,
          nickName: r.data.display_name,
        })
      }
    })
  },  

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})