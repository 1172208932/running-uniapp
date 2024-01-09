import jWeixin from 'weixin-js-sdk'

export default {
    /* 判断是否在微信中 */
    isWechat: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/micromessenger/i) == 'micromessenger') {
            //console.log('是微信客户端')  
            return true;
        } else {
            //console.log('不是微信客户端')  
            return false;
        }
    },
    /* 获取sdk初始化配置 */
    initJssdk: async function (callback) {
        //获取当前url然后传递给后台获取授权和签名信息  
        uni.request({
            url: 'https://zlive.cztv.com/api/v2/iblue/weixin/share?channel_id=1&callback=?&url=' + location.href.split("#")[0],
            header: {
                'custom-header': 'hello' //自定义请求头信息
            },
            success: (res) => {
                if (res.code == 200) {
                    //注入config权限配置  
                    const { appId, timestamp, nonceStr, signature } = res.data;
                    jWeixin.config({
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        // beta: true, // 文档没有这个参数，这个参数需设为true，才能调用那些微信还没有正式开放的新接口比如wx.invoke
                        appId: appId, // 必填，公众号的唯一标识
                        timestamp: timestamp, // 必填，生成签名的时间戳
                        nonceStr: nonceStr, // 必填，生成签名的随机串
                        signature: signature, // 必填，签名
                        jsApiList: [
                            "updateTimelineShareData",
                            "updateAppMessageShareData",
                        ],
                        openTagList: ["wx-open-launch-app"],
                    });
                    if (callback) {
                        callback(res.content);
                    }
                }
            }
        });
    },
    //自定义分享  这里我统一调用了分享到朋友和朋友圈，可以自行定义
    share: function (callback) {
        if (!this.isWechat()) {
            //console.log('不是微信客户端')  
            return;
        }
        this.initJssdk(function (res) {
            jWeixin.ready(function () {
                jWeixin.updateAppMessageShareData({ //分享给朋友
                    title: '《奔跑吧生态篇》互动游戏“生态合伙人”来啦！',
                    desc: '上Z视介边看边玩，更有签名照、节目录制门票等你拿！',
                    imgUrl: 'http://z-rm-a.oss-cn-hangzhou.aliyuncs.com/shareLogo.jpg',
                    link: 'https://zmtv.cztv.com/rmst/#/pages/services/index', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        callback(res);
                    }
                });
                jWeixin.updateTimelineShareData({ //分享到朋友圈
                    title: '《奔跑吧生态篇》互动游戏“生态合伙人”来啦！',
                    desc: '上Z视介边看边玩，更有签名照、节目录制门票等你拿！',
                    imgUrl: 'http://z-rm-a.oss-cn-hangzhou.aliyuncs.com/shareLogo.jpg',
                    link: 'https://zmtv.cztv.com/rmst/#/pages/services/index', // 分享链接，
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        callback(res);
                    }
                });
            });
        })
    }
}
