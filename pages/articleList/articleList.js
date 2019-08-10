// pages/articleList/articleList.js
import Api from '../../apis/http.api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postsList:[],
    searchKey:'',
    isLastPage: false,
    page: 1,
    categories: 0,
    headImg:''
  },
  searchKey(e){
    this.setData({
      searchKey:e.detail.value
    })
  },
  search(){
    this.setData({
      page: 1
    })
    this.getPosts()
  },
  gotoDetail(event) {
    wx.navigateTo({
      url: "/pages/article/article?id=" + event.currentTarget.dataset.aid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let title = "文章列表"
    this.setData({
      headImg: app.globalData.headImg
    })
    if (options['categoryid']!==undefined){
      title = options.categoryname
      this.setData({
        categories: options.categoryid
      })
    }

    if (options['searchKey'] !== undefined) {
      this.setData({
        searchKey: options.searchKey
      })
    }

    wx.setNavigationBarTitle({
      title: title
    })

    this.getPosts()

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getPosts(call) {
    Api.getPosts({
      page: this.data.page,
      categories: this.data.categories,
      search: this.data.searchKey
    }).then(res => {

      if (res.statusCode === 200) {
        let data = res.data

        this.setData({
          isLastPage: data.length < Api.pageCount
        });
        //去除p标签
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].excerpt.rendered = res.data[i].excerpt.rendered.replace('<p>', '').replace('</p>', '')
        }
        //合并数组
        let tmp = []
        if (this.data.page === 1) {
          tmp = res.data
        } else {
          tmp = this.data.postsList
          tmp = [...tmp, ...res.data]
        }

        this.setData({
          postsList: tmp
        })
      } else if (res.statusCode === 400) {
        if (res.data.code === 'rest_post_invalid_page_number') {
          this.setData({
            isLastPage: true
          });
        }
      }

      if (call) {
        call(res.statusCode === 200)
      }
    })
  },
  onPullDownRefresh: function () {
    this.setData({
      page: 1
    })
    this.getPosts(status => {
      if (status) {
        wx.stopPullDownRefresh()
      } else {
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isLastPage){
      return
    }
    this.setData({
      page: this.data.page + 1
    })
    this.getPosts()
  },
})