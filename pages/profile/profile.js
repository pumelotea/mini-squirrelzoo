// pages/profile/profile.js
import Api from '../../apis/http.api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    nickName: '',
    userId: '',
    email: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的信息'
    })
    this.getMyUserInfo()
    
  },
  getMyUserInfo(){
    let that = this
    Api.getMyUserInfo().then(res => {
      let r = res.data
      if (r.code === '0') {
        that.setData({
          avatar: r.data.avatar,
          nickName: r.data.display_name,
          userId: r.data.user_login,
          email: r.data.user_email === '' ? '暂未绑定' : r.data.user_email,
        })
      }
    })
  },
  upload() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]

        wx.redirectTo({
          url: `/pages/upload/upload?src=${src}`
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
    this.getMyUserInfo()
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