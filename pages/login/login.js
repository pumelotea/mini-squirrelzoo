// pages/login/login.js
let app = getApp();
import Api from '../../apis/http.api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAuthBtn:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



    wx.setNavigationBarColor({

      frontColor: "#ffffff",
      backgroundColor: '#f37b1d'

      // animation: { // 可选项

      //   duration: 100,

      //   timingFunc: 'easeIn'
      // }

    })
    console.log('尝试自动登录')
    let that = this
    wx.login({
      success:function(loginres){
        if (loginres.errMsg==='login:ok'){
          // 查看是否授权
          wx.getSetting({
            success: function (settingres) {
              if (settingres.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function (userinfores) {
                    console.log(userinfores)
                    console.log(userinfores.userInfo)
                    let params = {
                      js_code: loginres.code,
                      encrypted_data: userinfores.encryptedData,
                      iv: userinfores.iv,
                      avatar_url: userinfores.userInfo.avatarUrl,
                      nickname: userinfores.userInfo.nickName
                    }
                    Api.getOpenId(params).then(openidres=>{
                      if (openidres.data.code=="0"){
                        console.log(openidres.data)
                        that.saveUserInfo(openidres.data.data.openid, 
                        userinfores.userInfo.nickName, 
                        userinfores.userInfo.avatarUrl)
                      }
                    })
                  }
                })
              }else{
                that.setData({
                  showAuthBtn:true
                })
              }
            }
          })
        }
      }
    })
    
  },
  bindGetUserInfo: function (e) {
    console.log('用户点击登录')
    let userinfores = e.detail
    let that = this
    //获取用户信息成功
    if (userinfores.errMsg === 'getUserInfo:ok'){
      wx.login({
        success: function (loginres) {
          if (loginres.errMsg === 'login:ok') {
            let params = {
              js_code: loginres.code,
              encrypted_data: userinfores.encryptedData,
              iv: userinfores.iv,
              avatar_url: userinfores.userInfo.avatarUrl,
              nickname: userinfores.userInfo.nickName
            }
            Api.getOpenId(params).then(openidres => {
              if (openidres.data.code == "0") {
                console.log(openidres.data)
                // this.saveUserInfo(openidres.data.openid,)
                that.saveUserInfo(openidres.data.data.openid,
                userinfores.userInfo.nickName,
                userinfores.userInfo.avatarUrl)
              }
            })
          }
        }
      })
    }else{

    }
  },
  //保存用户信息，跳转到首页
  saveUserInfo(openid, nickName,headImg){
    app.globalData.openid = openid
    app.globalData.nickName = nickName
    app.globalData.headImg = headImg
    console.log('进入首页')
    wx.switchTab({
      url: "/pages/index/index"
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