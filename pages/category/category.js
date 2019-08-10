// pages/category/category.js
import Api from '../../apis/http.api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    gridCol: 3,
  },
  goToArticleList(event) {
    let cid = event.currentTarget.dataset.cid
    let cname = event.currentTarget.dataset.name
    wx.navigateTo({//保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的
      url: "/pages/articleList/articleList?categoryid=" + cid + "&categoryname=" + cname
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategories()
    wx.setNavigationBarTitle({
      title: '分类专题'
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
    this.getCategories(() => {
      wx.stopPullDownRefresh()
    })
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
  getCategories(call) {
    Api.getCategories().then(res => {
      if (res.statusCode === 200) {
        this.setData({
          list: res.data
        })
      }
      if (call) {
        call()
      }
      // console.log(this.data.list)
    })
  }
})