function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function obj2uri(obj) {
  return Object.keys(obj).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
  }).join('&');
}

function getStrLength(str){
    return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
}


function getDateDiff(dateStr) {    
    var publishTime = Date.parse(dateStr.replace(/-/gi, "/"))/ 1000,
        d_seconds,
        d_minutes,
        d_hours,
        d_days,
        timeNow = parseInt(new Date().getTime() / 1000),
        d,
        date = new Date(publishTime * 1000),
        Y = date.getFullYear(),
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
    //小于10的在前面补0
    if (M < 10) {
        M = '0' + M;
    }
    if (D < 10) {
        D = '0' + D;
    }
    if (H < 10) {
        H = '0' + H;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }

    d = timeNow - publishTime;
    d_days = parseInt(d / 86400);
    d_hours = parseInt(d / 3600);
    d_minutes = parseInt(d / 60);
    d_seconds = parseInt(d);

    if (d_days > 0 && d_days < 3) {
        return d_days + '天前';
    } else if (d_days <= 0 && d_hours > 0) {
        return d_hours + '小时前';
    } else if (d_hours <= 0 && d_minutes > 0) {
        return d_minutes + '分钟前';
    } else if (d_seconds < 60) {
        if (d_seconds <= 0) {
            return '刚刚发表';
        } else {
            return d_seconds + '秒前';
        }
    } else if (d_days >= 3 && d_days < 30) {
        return M + '月' + D +'日';
    } else if (d_days >= 30) {
        return Y + '年' + M + '月' + D + '日';
    }
}

function getDateOut(dateStr) {
    var publishTime = Date.parse(dateStr.replace(/-/gi, "/")) / 1000; 
    var timeNow = parseInt(new Date().getTime() / 1000);
    var result=false;
    var d = timeNow - publishTime;
    var d_days = parseInt(d / 86400);
    if (d_days > 7) {
        result=true;
    }
    return result;
}

function cutstr(str, len,flag) {
        var str_length = 0;
        var str_len = 0;
        var str_cut = new String();
        var str_len = str.length;
        for (var i = 0; i < str_len; i++) {
            var a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4  
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
              if (flag == 0){
                str_cut = str_cut.concat("...");

              }              
                
                return str_cut;
            }
           
        }
        //如果给定字符串小于指定长度，则返回源字符串；  
        if (str_length < len) {
            return str;
        }
    }

  function removeHTML (s) {
    var str=s.replace(/<\/?.+?>/g,"");    
    str = str.replace(/[\r\n]/g, ""); //去掉回车换行    
    return str.replace(/ /g,"");
    str = str.replace('&hellip', '');//去掉生成海报多余的&字符
    str = str.replace('&8211', '');//去掉生成海报多余的&字符
  }

  function formatDateTime(s)
  {
    //var str = s.replace("t", " ");
    return s.replace("T", " ");

  }
  var compare = function (prop) {
    return function (obj1, obj2) {
      var val1 = obj1[prop];
      var val2 = obj2[prop]; if (val1 > val2) {
        return -1;
      } else if (val1 < val2) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  /* 
 * 判断图片类型 
 */  
function checkImgType(filePath){  
  if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(filePath)) {
       return false;
  }
  else{
    return true;
  }   
}

// 是否为空对象
function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}

function CheckImgExists(imgurl) {
  var ImgObj = new Image(); //判断图片是否存在  
  ImgObj.src = imgurl;
  //没有图片，则返回-1  
  if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
    return true;
  } else {
    return false;
  }
}

function GetUrlFileName(url,domain) {    
    var filename = url.substring(url.lastIndexOf("/") + 1);
    if (filename == domain || filename =='')
    {
        filename="index";
    }
    else
    {
        filename = filename.substring(0, filename.lastIndexOf("."));
    }
    
    return filename;
}


function json2Form(json) {
    var str = [];
    for (var p in json) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");
}

function getymd(dateStr, type) {
    dateStr = dateStr.replace("T", " ");
    var date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    var mm = date.getMonth() + 1;
    //月
    var dd = date.getDate();
    //日
    var yy = date.getFullYear();
    //年
    if (type == "d") {
        return dd;
    } else if (type == "md") {
        return mm + "-" + dd;
    } else if (type == "ymd") {
        return yy + "-" + mm + "-" + dd;
    }
}

//绘制文字：文章题目、摘要、扫码阅读
function drawTitleExcerpt(context, title, excerpt) {

    context.setFillStyle("#000000");
    context.setTextAlign('left');

    if (getStrLength(title) <= 14) {
        //14字以内绘制成一行，美观一点
        context.setFontSize(40);
        context.fillText(title, 40, 460);
    }
    else {
        //题目字数很多的，只绘制前36个字（如果题目字数在15到18个字则也是一行，不怎么好看）
        context.setFontSize(30);
        context.fillText(title.substring(0, 19), 40, 460);
        context.fillText(title.substring(19, 36), 40, 510);
    }

    context.setFontSize(24);
    context.setTextAlign('left');
    context.setGlobalAlpha(0.7);
    
    for (var i = 0; i <= 50; i += 20) {
        //摘要只绘制前50个字，这里是用截取字符串
        if (getStrLength(excerpt)>50)
        {
            if ( i == 40) {
                context.fillText(excerpt.substring(i, i + 20) + "...", 40, 570 + i * 2);

            }
            else {
                context.fillText(excerpt.substring(i, i + 20), 40, 570 + i * 2);
            }

        }
        else
        {
            context.fillText(excerpt.substring(i, i + 20), 40, 570 + i * 2);
        }
        
        


    }

    context.stroke();
    context.save();
}

/**
 * 给的文件资源是否小于LimitSize （M）, 小于走lessCallBack， 大于走moreCallBack
 */
function imageSizeIsLessLimitSize(imagePath, limitSize, lessCallBack, moreCallBack) {
  wx.getFileInfo({
    filePath: imagePath,
    success(res) {
      console.log("压缩前图片大小:", res.size / 1024, 'kb');
      if (res.size > 1024 * 1024 * limitSize) {
        moreCallBack();
      } else {
        lessCallBack();
      }
    }
  })
}

// 主调用方法

/**
 * 获取小于限制大小的Image, limitSize默认为1M，递归调用。
 */
function getLessLimitSizeImage(canvasId, imagePath, limitSize = 1, drawWidth, callBack) {
  console.log(getApp().globalData.systemInfo);
  imageSizeIsLessLimitSize(imagePath, limitSize,
    (lessRes) => {
      callBack(imagePath);
    },
    (moreRes) => {
      wx.getImageInfo({
        src: imagePath,
        success: function (imageInfo) {
          var maxSide = Math.max(imageInfo.width, imageInfo.height);
          //画板的宽高默认是windowWidth
          var windowW = drawWidth;
          var scale = 1;
          if (maxSide > windowW) {
            scale = windowW / maxSide;
          }
          var imageW = Math.floor(imageInfo.width * scale);
          var imageH = Math.floor(imageInfo.height * scale);
          console.log('调用压缩', imageW, imageH);
          getCanvasImage(canvasId, imagePath, imageW, imageH,
            (pressImgPath) => {
              getLessLimitSizeImage(canvasId, pressImgPath, limitSize, drawWidth * 0.7, callBack);
            }
          );
        }
      })
    }
  )
}

/**
 * 获取画布图片 
 */
function getCanvasImage(canvasId, imagePath, imageW, imageH, getImgsuccess) {
  const ctx = wx.createCanvasContext(canvasId);
  ctx.drawImage(imagePath, 0, 0, imageW, imageH);
  ctx.draw(false, () => {
    wx.canvasToTempFilePath({
      canvasId: canvasId,
      x: 0,
      y: 0,
      width: imageW,
      height: imageH,
      quality: 1,
      success(res) {
        getImgsuccess(res.tempFilePath);
      }
    });
  });
}



module.exports = {
  formatTime: formatTime,
  getDateDiff: getDateDiff,
  cutstr:cutstr,
  removeHTML:removeHTML,
  formatDateTime: formatDateTime,
  compare: compare,
  checkImgType: checkImgType,
  isEmptyObject: isEmptyObject,
  CheckImgExists: CheckImgExists,
  GetUrlFileName: GetUrlFileName,
  json2Form: json2Form,
  getymd: getymd,
  getDateOut:getDateOut,
  drawTitleExcerpt: drawTitleExcerpt,
  getStrLength: getStrLength,
  getLessLimitSizeImage: getLessLimitSizeImage,
}

