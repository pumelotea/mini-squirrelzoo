//app.js
const ReadRecord = 'ReadRecord'
const MaxRecordLength = 1000
const StarRecord = 'StarRecord'
const MaxStarLength = 200
const Towxml = require('/towxml/main');
const DefaultCoverImg ='/images/logo.png'
App({
  towxml: new Towxml(),
  globalData: {
    nickName:'',
    headImg:'',
    openid: '',
  },
  onLaunch: function() {
    
  },
  //阅读记录
  //article={id,title,excerpt,post_full_image,category_name}
  saveReadRecord(article){
    let res = wx.getStorageSync(ReadRecord)
    if (res == ''){
      res = []
    }
    if (res.length >= MaxRecordLength){
      res.pop()
    }
    res.unshift(article)
    wx.setStorageSync(ReadRecord, res)
  },
  getReadRecordList(){
    let res = wx.getStorageSync(ReadRecord)
    return res == '' ? []:res
  },
  getReadCount(){
    return this.getReadRecordList().length
  },
  //收藏
  starArticle(article){
    let res = wx.getStorageSync(StarRecord)
    if (res == '') {
      res = []
    }
    if (res.length >= MaxStarLength) {
      res.pop()
    }
    //判断是否存在
    let filters = res.filter(e => e.id == article.id)
    if (filters.length>0){
      return false
    }
    res.unshift(article)
    wx.setStorageSync(StarRecord, res)
    return true
  },
  //
  getStarArticleList(){
    let res = wx.getStorageSync(StarRecord)
    return res == '' ? [] : res
  },
  getStarCount(){
    return this.getStarArticleList().length
  },
  
  isStar(id){
    let filters = this.getStarArticleList().filter(e => e.id == id)
    return filters.length > 0
  },
  removeStar(id){
    if (!this.isStar(id)){
      return false
    }
    let filters = this.getStarArticleList().filter(e => e.id != id)
    wx.setStorageSync(StarRecord, filters)
    return true
  },
  cleanReadRecord() {
    wx.setStorageSync(ReadRecord, [])
  },
  cleanStarRecord() {
    wx.setStorageSync(StarRecord, [])
  },
})