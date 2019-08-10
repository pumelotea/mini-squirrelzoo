// pages/hot/hot.js
import Api from '../../apis/http.api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 1,
    scrollLeft: 0,
    hotList: [[], [], [], []],
    authorMap: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTopHotPosts(1)
    this.getTopHotPosts(2)
    this.getTopHotPosts(3)
    wx.setNavigationBarTitle({
      title: '热榜'
    })
  },
  gotoDetail(event) {
    wx.navigateTo({
      url: "/pages/article/article?id=" + event.currentTarget.dataset.aid
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
    this.getTopHotPosts(1)
    this.getTopHotPosts(2)
    this.getTopHotPosts(3)
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

  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  getTopHotPosts(id) {
    Api.getTopHotPosts(id).then(res => {
      if (res.statusCode === 200) {
        let tmp = this.data.hotList
        tmp[id] = res.data
        this.setData({
          hotList: tmp
        })

      }
      wx.stopPullDownRefresh()
    })
  },
  getAuthorById(id) {
    Api.getAuthorById(id).then(res => {
      let data = res.data
      console.log(res)
      if (res.statusCode == 200) {
        this.setData({
          author: data.name,
          authorImg: data.avatar_urls['96']
        })
      }
    })
  },
})