import config from '../utils/config.js'
var domain = config.getDomain;
var pageCount = config.getPageCount;
var categoriesID = config.getCategoriesID;
var indexListType = config.getIndexListType;
var HOST_URI = 'https://' + domain + '/wp-json/wp/v2/';
var HOST_URI_SQUIRREL = 'https://' + domain + '/wp-json/squirrel/v1/';
var wxRequest = require('../utils/wxRequest.js')
const app = getApp()
module.exports={
  pageCount: pageCount,
  //获取首页滑动文章
  getSwiperPosts () {
    var url = HOST_URI_SQUIRREL;
    url += 'post/banners';
    return wxRequest.get(url);
  },
  //获取文章列表
  /**
   * obj:{
   *  page
   *  categories
   *  search
   * }
   */
  getPosts (obj) {
    var url = HOST_URI + 'posts?per_page=' + pageCount + '&orderby=date&order=desc&page=' + obj.page;
    if (obj.categories != 0) {
      url += '&categories=' + obj.categories;
    }
    else {
      if (indexListType != 'all') {
        url += '&categories=' + indexListType;
      }
    }

    if (obj.search != '') {
      url += '&search=' + encodeURIComponent(obj.search);
    }
    return wxRequest.get(url);
  },
  //获取分类列表
  getCategories: function () {
    var url = '';
    if (categoriesID == 'all') {
      url = HOST_URI + 'categories?per_page=100&orderby=count&order=desc';
    } else {
      url = HOST_URI + 'categories?include=' + categoriesID + '&orderby=count&order=desc';
    }
    return wxRequest.get(url);
  },
  //获取热点文章
  getTopHotPosts(flag) {
    var url = HOST_URI_SQUIRREL;
    if (flag == 0) {
      url += "post/praisethisyear"
    } else if (flag == 1) {
      url += "post/pageviewsthisyear"
    } else if (flag == 2) {
      url += "post/likethisyear"
    } else if (flag == 3) {
      url += "post/hotpostthisyear"
    }
    return wxRequest.get(url);
  },
  //获取用户openid
  getOpenId(data) {
    var url = HOST_URI_SQUIRREL;
    url += "auth/openid";
    return wxRequest.post(url, data);
  },
  // 获取内容页数据
  getPostById(id) {
    return wxRequest.get(HOST_URI + 'posts/' + id);
  },
  //获取作者信息
  getAuthorById(id){
    return wxRequest.get(HOST_URI_SQUIRREL + 'auth/user_info_by_id?id=' + id);
  },
  //点赞
  postLike(postid) {
    var url = HOST_URI_SQUIRREL;
    url += "post/like";
    return wxRequest.post(url,{
      openid: app.globalData.openid,
      postid: postid
    });
  },
  //判断当前用户是否点赞
  postIsLike(postid) {
    var url = HOST_URI_SQUIRREL;
    url += "post/islike";
    return wxRequest.post(url, {
      openid: app.globalData.openid,
      postid: postid
    });
  },
  //获取文章评论及其回复
  getCommentsReplay (postId, limit, page) {
    var url = HOST_URI_SQUIRREL;
    url += 'comment/getcomments?postid=' + postId + '&limit=' + limit + '&page=' + page + '&order=desc';
    return wxRequest.get(url);
  },
  //发表评论
  postWeixinComment (data) {
    var url = HOST_URI_SQUIRREL;
    return wxRequest.post(url + 'comment/add',data);
  }, 
  getMailCode(email){
    var url = HOST_URI_SQUIRREL+'auth/mail_code';
    return wxRequest.post(url, {
      openid: app.globalData.openid,
      email: email
    });
  },
  bindMail(email,mailCode){
    var url = HOST_URI_SQUIRREL + 'auth/bind_mail';
    return wxRequest.post(url, {
      openid: app.globalData.openid,
      email: email,
      mail_code: mailCode
    });
  },
  getPasswordMailCode(){
    var url = HOST_URI_SQUIRREL + 'auth/password_mail_code';
    return wxRequest.post(url, {
      openid: app.globalData.openid
    });
  },
  changePassword(newPassword, mailCode){
    var url = HOST_URI_SQUIRREL + 'auth/password';
    return wxRequest.post(url, {
      openid: app.globalData.openid,
      mail_code: mailCode,
      new_password: newPassword
    });
  },
  getMyUserInfo(){
    var url = HOST_URI_SQUIRREL + 'auth/user_info';
    return wxRequest.get(url, {
      openid: app.globalData.openid
    });
  },
  updateNick(nick){
    var url = HOST_URI_SQUIRREL + 'auth/user_info';
    return wxRequest.post(url, {
      openid: app.globalData.openid,
      display_name:nick
    });
  },
  uploadAvatar(){
    return HOST_URI_SQUIRREL + 'auth/user_avatar';
  }
}