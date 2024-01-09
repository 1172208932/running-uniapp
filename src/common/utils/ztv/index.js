import config from "@/common/http/request";
const cztvApi = new CztvApi();


const iosScheme = {
  protocol: "ChinaBlueTV",
  host: "CallingAppFlag",
};
const androidScheme = {
  protocol: "chinablue",
  host: "cztvrouter",
};

let callLib = "";
let isInit = 0;
let isInitWxTag = false;

const innerH5Url =
  process.env.NODE_ENV === "production"
    ? "https://zmtv.cztv.com/rmst/#/pages/main/loading" + getQueryParam()
    : "http://212.129.221.185:8081/#/pages/main/loading" + getQueryParam();

export const shareH5Url =
  process.env.NODE_ENV === "production"
    ? "https://zmtv.cztv.com/rmst/#/pages/services/index"
    : "http://212.129.221.185:8081/#/pages/services/index";

export const shareH5UrlPid =
  process.env.NODE_ENV === "production"
    ? "https://zmtv.cztv.com/rmst/#/pages/services/index"+getShareData()
    : "http://212.129.221.185:8081/#/pages/services/index"+getShareData();

const showInnerH5Bar = false;

export function getQueryParam() {
  let url = window.location.href;
  if (url.indexOf("?") == -1) return "";
  return url.substring(url.lastIndexOf("?"));
}
function getShareData() {
  let time=Date.now()
  // uni.getStorageSync("userId")
  // getApp().globalData.userId
  let id=getApp().globalData?.userId
  if(id){
    return '?pid='+id+"&createTime="+time
  }else{
    return ''
  }
}

const userAgent = window.navigator.userAgent || "";
const options = {
  scheme: /iphone|ipad|ipod/i.test(userAgent) ? iosScheme : androidScheme,
  intent: {
    package: "com.chinablue.tv",
    scheme: "chinablue",
  },
  universal: {
    host: "zmtv.cztv.com/ap/download/index.shtml",
  },
  appstore: "https://itunes.apple.com/cn/app/zhong-guo-lantv/id988616225?mt=8",
  yingyongbao: "https://a.app.qq.com/o/simple.jsp?pkgname=com.chinablue.tv", // https://sj.qq.com/search?q=z视介，这个地址能搜到才能用
  fallback: "https://zmtv.cztv.com/ap/download/index.shtml",
  timeout: 2000,
};

export const initCallapp = () => {
  isInit = 1;
  callLib = "";
  options.universal = {
    host: "mhudong.cztv.com/download/index.html",
  };
  callLib = new CallApp(options);
};

export const initDefaultShare=()=>{
  const shareData = {
    url: shareH5Url, //分享的网址链接
    title: '《奔跑吧生态篇》互动游戏“生态合伙人”来啦！', //分享的标题
    content: '上Z视介边看边玩，更有签名照、节目录制门票等你拿！', // 分享的文字
    img: 'http://z-rm-a.oss-cn-hangzhou.aliyuncs.com/shareLogo.jpg', // 分享的图片Url
  }
  changeShareData(shareData)
}

export const callToRoute = (route) => {
  // console.log('toRoute:', route)
  // if (!route) {
  //   console.log('route有误')
  //   return
  // }
  initCallapp();
  callLib.open({
    param: {
      route: encodeURIComponent(
        `chinablue://cztvrouter/business/h5?path=${encodeURIComponent(
          innerH5Url
        )}&displayBar=${showInnerH5Bar}}`
      ),
    },
    path: "",
    callback: function () {
      console.log("唤端失败的处理");
    },
  });
};

export const doClose = () => {
  cztvApi.close();
};

export const doLogin = (callback) => {
  cztvApi.login((res) => {
    console.log("新蓝网用户登录:", res);
    if (res.code === 200) {
      callback(res);
    }
  });
};

export const doAuth = (callback) => {
  cztvApi.userInfo((res) => {
    console.log("新蓝网用户信息回调:", res);
    callback(res);
  });
};

export const doTask = (params, callback) => {
  cztvApi.zgltvDoTask(params, (res) => {
    console.log("新蓝网任务回调", res);
    callback(res);
  });
};

export const doShare = (params, callback) => {
  console.log(params);
  const shareData = {
    url: params.url, //分享的网址链接
    title: params.title, //分享的标题
    content: params.content, // 分享的文字
    img: params.img, // 分享的图片Url
  };
  cztvApi.share(shareData, (res) => {
    console.log("新蓝网分享回调", res);
    callback(res);
    // res.code === 200 分享成功
  });
};
export const doShareNoUI = (params, callback) => {
  // type: 分享类型（'img':海报, 'url': 网页）
  // platform: 分享平台（"QQ"、"QZone"、"SinaWeibo"、"Wechat"、"WechatMoments"、"copy"）
  // url ：海报地址或网页分享地址
  // title：网页分享标题
  // content：网页分享简介
  // thumbImg：缩略图地址
  const shareData = {
    url: params.url, //分享的网址链接
    title: params.title, //分享的标题
    content: params.content, // 分享的文字
    img: params.img, // 分享的图片Url
  };
  cztvApi.shareNoUi(shareData, (res) => {
    console.log("新蓝网分享回调:", res);
    callback(res);
  });
};

export const changeShareData = (shareData) => {
  // const shareData = {
  //   url: 'https://mhudong.cztv.com/download/index.html',
  //   title: "test1", //分享的标题
  //   content: "test111111", // 分享的文字
  //   img: "https://ohudong.cztv.com/1/263405/images/icon-share.png", // 分享的图片Url
  // }
  cztvApi.changeShareInfo(shareData);
};

export const openShareMenu = (flag) => {
  cztvApi.showShareButton(flag);
};

const isAndroid = navigator.userAgent.match(/android/i);

const routeArray = {
  cztvRouterToVod: "chinablue://cztvrouter/feed/vod?pageId=${pageId}",
  cztvRouterToShorts: "chinablue://cztvrouter/feed/shorts?pageId=${pageId}",
  cztvRouterToActivityLive:
    "chinablue://cztvrouter/feed/live_activity?pageId=${pageId}",
  cztvRouterToLiveTV: "chinablue://cztvrouter/feed/live_tv?pageId=${pageId}",
  cztvRouterToPhotoArticle:
    "chinablue://cztvrouter/ugc/photo_article?article_ids=${article_ids}",
  cztvRouterToMusicDetail:
    "chinablue://cztvrouter/ugc/music_detail?article_ids=${article_ids}",
  cztvRouterToUGCUserCenter:
    "chinablue://cztvrouter/ugc/user_center?uid=${user_center}",
  cztvRouterToPostDynamic: "chinablue://cztvrouter/ugc/post_dynamic",
  cztvRouterToPostVideo: "chinablue://cztvrouter/ugc/post_video",
  cztvRouterToTopic: "chinablue://cztvrouter/ugc/topic?topicId=1",
  cztvRouterToSubject:
    "chinablue://cztvrouter/business/subject?pageId=${pageId}",
  cztvRouterToBuyVip: "chinablue://cztvrouter/business/vip",
  cztvRouterToScore: "chinablue://cztvrouter/business/score",
  cztvRouterToTribe: "chinablue://cztvrouter/business/tribe",
  cztvRouterToKTV:
    "chinablue://cztvrouter/business/ktv?sessionId=S10006c20e58e03085b1b8fdeed7d4cfe7017",
  cztvRouterToWXMiniApp:
    "chinablue://cztvrouter/wx/miniapp?userName=gh_d43f693ca31f&path=page%2Fanimation%2Findex&miniProgramType=0",
  cztvRouterToZMGMiniApp:
    "chinablue://cztvrouter/zmg/miniapp?appId=tmfxh199azoygu0u30",
  cztvRouterToAlbum:
    "chinablue://cztvrouter/business/album?pageId=161&title=&shareImage=&shareDesc=",
  cztvRouterToThirdApp: isAndroid
    ? "chinablue://cztvrouter/thirdapp?path=bluenews-open%3A%2F%2F%3Ftype%3D3%26id%3D3"
    : "chinablue://cztvrouter/thirdapp?path=blueNews%3A%2F%2Fbluenewsopen%3Ftarget%3D1",
  cztvRouterToBaiduAvatar:
    "chinablue://cztvrouter/component/baidu_avatar?key_url=https%3A%2F%2Fzavatar.cztv.com",
  cztvRouterToComplaint: "chinablue://cztvrouter/mine/user_complaint",
};
export const doRoute = (params, callback) => {
  if (!params.targetType) {
    return;
  }
  if (params.targetType == 1) {
    //页面
    params.route = `chinablue://cztvrouter/feed/vod?pageId=${params.targetValue}`;
  } else if (params.targetType == 2) {
    //小程序
    params.route = `chinablue://cztvrouter/zmg/miniapp?appId=${
      params.targetConfig
    }&path=${encodeURIComponent(params.targetValue)}`;
  }else if(params.targetType == 4) {
    //ugc话题
    params.route = `chinablue://cztvrouter/ugc/topic?topicId=${params.targetValue}`;
  }
  if (!params.route) {
    return;
  }
  cztvApi.route(params.route, (res) => {
    console.log("新蓝网路由跳转", res);
    callback(res);
  });
};

export const doSaveImage = (url) => {
  console.log("新蓝网保存图片");
  cztvApi.saveImg(url);
};

export const notifyActivity = (data) => {
  // 埋点上报start
  window.collectEvent("activity_page_display", {
    // 活动页面曝光
    activity_id: data.id, // 活动id
    activity_type: "h5", // 活动类型
    activity_name: data.title, // 活动名称
    activity_url: shareH5Url, // 活动链接
    activity_page_name: data.title, // 活动页面名称
  });
  // 埋点上报end
};
export const notifyClick = (data) => {
  // 埋点上报start
  window.collectEvent("activity_page_display", {
    // 活动页面曝光
    activity_id: "", // 活动id
    activity_type: "h5", // 活动类型
    activity_name: "", // 活动名称
    activity_url: "", // 活动链接
    activity_page_name: "", // 活动页面名称
    activity_button_name: "", // 点击按钮名称
  });
  // 埋点上报end
};
