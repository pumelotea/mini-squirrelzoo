// pages/article/article.js
import Api from '../../apis/http.api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleId: '',
    title: '',
    artcle: null,
    author: '',
    authorImg: '',
    like: false,
    star: false,
    headImg: '',
    commentPage: 1,
    commentList: [],
    comment: '',
    commentPid: '0',
    placeHolder: '发表评论',
    insertData: null,
    articleWxml: {}
  },
  getPostById(id) {
    Api.getPostById(id).then(res => {
      if (res.statusCode === 200) {
        let data = res.data
        wx.setNavigationBarTitle({
          title: data.title.rendered
        })
        this.setData({
          title: data.title.rendered,
          artcle: data
        })
        let renserdata = app.towxml.toJson(
          data.content.rendered, // `markdown`或`html`文本内容
          'html', // `markdown`或`html`
          this // 当前页面的`this`（2.1.0或以上的版本该参数不可省略）
        );

        //设置文档显示主题，默认'light'
        renserdata.theme = 'light';

        //设置数据
        this.setData({
          articleWxml: renserdata
        });
        this.getAuthorById(data.author)
        this.postIsLike()
        this.getCommentsReplay()
        app.saveReadRecord({
          id: id,
          title: data.title.rendered,
          excerpt: data.excerpt.rendered.replace('<p>', '').replace('</p>', ''),
          post_full_image: data.post_full_image,
          category_name: data.category_name
        })
      }
    })
  },
  getAuthorById(id) {
    Api.getAuthorById(id).then(res => {
      let data = res.data
      // console.log(res)
      if (res.statusCode == 200) {
        this.setData({
          author: data.data.display_name,
          authorImg: data.data.avatar
        })
      }
    })
  },
  postIsLike() {
    Api.postIsLike(this.data.articleId).then(res => {
      this.setData({
        like: res.data.status === '200'
      })
    })
  },
  postLike() {
    if (this.data.like) {
      return
    }
    Api.postLike(this.data.articleId).then(res => {
      this.setData({
        like: res.data.status === '200'
      })
    })
  },
  //收藏
  starArticle() {
    if (this.data.star) {
      let r = app.removeStar(this.data.articleId)
      if (r) {
        this.setData({
          star: false
        })
      }
      return
    }
    let res = app.starArticle({
      id: this.data.articleId,
      title: this.data.artcle.title.rendered,
      excerpt: this.data.artcle.excerpt.rendered.replace('<p>', '').replace('</p>', ''),
      post_full_image: this.data.artcle.post_full_image,
      category_name: this.data.artcle.category_name
    })
    if (res) {
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 2000
      })
      this.setData({
        star: true
      })
    } else {
      wx.showToast({
        title: '已经收藏',
        icon: 'none',
        duration: 2000
      })
    }
  },
  getCommentsReplay() {
    Api.getCommentsReplay(this.data.articleId,
        50, this.data.commentPage)
      .then(res => {
        if (res.data.status === "200") {
          this.setData({
            commentList: res.data.data
          })
        }
      })
  },
  //选择回复对象
  chooseReplyFor(e) {
    if (e.currentTarget.dataset.id == -1) {
      return
    }

    this.setData({
      commentPid: e.currentTarget.dataset.id
    })
    if (e.currentTarget.dataset.id == 0) {
      this.setData({
        placeHolder: '发表评论'
      })
    } else {
      this.setData({
        placeHolder: '回复 ' + e.currentTarget.dataset.name + ':'
      })
    }
  },
  //获取输入的评论
  commentValue(e) {
    this.setData({
      comment: e.detail.value
    })
  },
  postWeixinComment() {
    if (this.data.comment.trim() === '') {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let data = {
      post: this.data.articleId,
      author_name: app.globalData.nickName,
      author_email: app.globalData.openid + '@wx.com',
      content: this.data.comment,
      author_url: app.globalData.headImg,
      parent: this.data.commentPid,
      openid: app.globalData.openid,
      userid: '',
      formId: 'the formId is a mock one'
    };
    Api.postWeixinComment(data).then(res => {
      if (res.data.status === "200") {
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 2000
        })
        this.getCommentsReplay()
        this.setData({
          comment: '',
          commentPid: '0',
          placeHolder: '发表评论',
        })
      } else {
        //提示发布失败
        wx.showToast({
          title: '评论失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      articleId: options.id,
      headImg: app.globalData.headImg,
      star: app.isStar(options.id)
    })
    this.getPostById(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  __bind_touchmove(e){

  },
  __bind_touchstart(e){

  },
  __bind_touchend(e){

  },
  __bind_tap(e){
    let el = e.target.dataset._el
    if (el.tag === 'navigator'){
      let data = el.attr.href
      wx.getClipboardData({
        success(res) {
          if (res.data !== data){
            wx.setClipboardData({
              data: data,
              success(res) {
                wx.showToast({
                  title: '链接复制成功',
                  //icon: 'success',
                  image: '../../images/link.png',
                  duration: 2000
                })
              }
            })
          }
        }
      })
    }
  }
})