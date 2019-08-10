// pages/updateNick/updateNick.js
import Api from '../../apis/http.api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nick:''
  },
  newNick(e){
    this.setData({
      nick:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '昵称修改'
    })
    this.setData({
      nick: options.nick
    })
  },
  updateNick(){
    if (this.data.nick === '') {
      wx.showToast({
        title: '昵称不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    Api.updateNick(this.data.nick).then(res=>{
      if(res.data.code=='0'){
        wx.navigateBack()
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
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