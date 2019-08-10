//index.js
//获取应用实例
const app = getApp()
import Api from '../../apis/http.api.js'
Page({
  data: {
    cardCur: 0,
    swiperList: [],
    postsList: [],
    isLastPage: false,
    page: 1,
    vertical: true,
    search: '',
    categories: 0,
    searchKey: '',
    headImg:''
  },
  searchKey(e) {
    this.setData({
      searchKey: e.detail.value
    })
  },
  search() {
    wx.navigateTo({//保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的
      url: "/pages/articleList/articleList?searchKey=" + this.data.searchKey
    })
  },
  gotoDetail(event){
    wx.navigateTo({
      url: "/pages/article/article?id=" + event.currentTarget.dataset.aid
    })
  },
  getPosts(call) {
    Api.getPosts({
      page: this.data.page,
      categories: this.data.categories,
      search: this.data.search
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
      } else if (res.statusCode === 400){
        if (res.data.code ==='rest_post_invalid_page_number'){
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
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
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
    if (this.data.isLastPage) {
      return
    }
    this.setData({
      page: this.data.page + 1
    })
    this.getPosts()
  },
  onLoad: function () {
    Api.getSwiperPosts().then(res => {
      let posts = res.data.posts
      this.setData({
        swiperList: posts,
        headImg: app.globalData.headImg
      })
    })
    this.getPosts()
    wx.setNavigationBarTitle({
      title: '松鼠乐园'
    })
  }
})
