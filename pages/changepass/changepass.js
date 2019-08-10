// pages/changePass/changepass.js
import Api from '../../apis/http.api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newPassword:'',
    mailCode:''
  },
  newPassword(e){
    this.setData({
      newPassword:e.detail.value
    })
  },
  mailCode(e){
    this.setData({
      mailCode: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '修改密码'
    })
  },
  getPasswordMailCode(){
    Api.getPasswordMailCode().then(res=>{
      if(res.data.code === '0'){
        wx.showToast({
          title: '获取成功',
          icon: 'success',
          duration: 2000
        })
      }else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  
  changePassword(){
  
    if (this.data.mailCode===''){
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (this.data.newPassword === '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    Api.changePassword(this.data.newPassword,this.data.mailCode).then(res=>{
      if(res.data.code == '0'){
        wx.navigateBack()
      }else {
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