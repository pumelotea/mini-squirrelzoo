//配置域名,域名只修改此处。
//如果wordpress没有安装在网站根目录请加上目录路径,例如："www.cxcat.com/blog"
var DOMAIN = "www.squirrelzoo.com";
var MINAPPTYPE = "1";//小程序的类型，如果是企业小程序请填：0 ，如果是个人小程序请填：1
var WEBSITENAME = "松鼠乐园"; //网站名称
var ABOUTID = 1136; //wordpress网站"页面"的id,注意这个"页面"是wordpress的"页面"，不是"文章"
var PAGECOUNT = '10'; //每页文章数目
var CATEGORIESID = 'all'  //专题页显示全部的分类
//var CATEGORIESID = '1,1059,98,416,189,374,6,463';//指定专题页显示的分类的id
var INDEXLISTTYPE = "all" //首页显示所有分类
//var INDEXLISTTYPE ="1" //指定首页显示分类的id
var PAYTEMPPLATEID = 'hzKpxuPF2rw7O-qTElkeoE0lMwr0O4t9PJkLyt6v8rk';//赞赏消息模版id
var REPLAYTEMPPLATEID = 'IiAVoBWP34u1uwt801rI_Crgen7Xl2lvAGP67ofJLo8';//回复评论消息模版id

//设置downloadFile合法域名,不带https ,在中括号([])里增加域名，格式：{id=**,domain:'www.**.com'}，用英文逗号分隔。
//此处设置的域名和小程序与小程序后台设置的downloadFile合法域名要一致。
var DOWNLOADFILEDOMAIN = [
  { id: 1, domain: 'umi.pumelo.io' },
  { id: 2, domain: 'umi.pumelo.io' },
  { id: 3, domain: 'www.squirrelzoo.com' }
]
//首页图标导航
//参数说明：'name'为名称，'image'为图标路径，'url'为跳转的页面，'redirecttype'为跳转的类型，apppage为本小程序的页面，miniapp为其他微信小程序,webpage为web-view的页面
//'appid' 当redirecttype为miniapp时，这个值为其他微信小程序的appid，如果redirecttype为apppage，webpage时，这个值设置为空。
//'extraData'当redirecttype为miniapp时，这个值为提交到其他微信小程序的参数，如果redirecttype为apppage，webpage时，这个值设置为空。
var INDEXNAV = [
  { id: '1', name: '微店', image: '../../images/shop.png', url: 'pages/shelf/shelf', redirecttype: 'miniapp', appid: 'wx55ea6098e41af5c4', extraData: '' },
  { id: '2', name: '排行', image: '../../images/ranking.png', url: '../hot/hot', redirecttype: 'apppage', appid: '', extraData: '' },
  { id: '3', name: '教程', image: '../../images/app.png', url: '../list/list?categoryID=98', redirecttype: 'apppage', appid: '', extraData: '' },
]

export default {
  getDomain: DOMAIN,
  getWebsiteName: WEBSITENAME,
  getPayTemplateId: PAYTEMPPLATEID,
  getPageCount: PAGECOUNT,
  getCategoriesID: CATEGORIESID,
  getIndexNav: INDEXNAV,
  getReplayTemplateId: REPLAYTEMPPLATEID,
  getMinAppType: MINAPPTYPE,
  getIndexListType: INDEXLISTTYPE,
  getDownloadFileDomain: DOWNLOADFILEDOMAIN
}