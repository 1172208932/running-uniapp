<template>
  <view id="indexBox"   class="container-box" v-if="!isZtv&&!parentMember">
    <view class="tip-cover" v-if="isWB">
     <text>点击右上角...>在默认浏览器中打开 ↗</text>
    </view>
    <!-- <view class="header flex-row flex-j-c-b flex-a-i-c">
      <image
        src="../../static/images/zlogo_index.png"
        class="zlogo-s p-l-25"
      ></image>
      <view class="p-r-25">
        <view class="d-btn-s flex-row flex-a-i-c flex-j-c-c" @click="jump">
          <text class="d-btn-text">打开APP
            <wx-open-launch-app v-if="isWx" appid="wx329392544913ec90" :extinfo="extinfo" style="
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              width: 100%;
              height: 100%;
            " @error="handleErrorFn" @launch="handleLaunchFn">
              <component :is="'script'" type="text/wxtag-template">
                <component :is="'style'">
                  .btn {width: 140px; height: 58px;}
                </component>
                <div class="btn"></div>
              </component>
            </wx-open-launch-app>
          </text>
        </view>
      </view>
    </view> -->
		<!-- <view class="flex-column flex-mc m-t-x1">
			<image src="../../static/images/title_loading.png" class="title"></image>
			<view class="line m-t-30 m-b-20"></view>
			<image src="../../static/images/title_index.png" class="subTitle"></image>
		</view> -->
    <view class="page1" v-if="showPage1">
      <view class="progress">{{ progress }} %</view>
    </view>
    <div ref="scrollbox" class="page2">
      <div v-if="!showOverBox" class="drop-box">
        <div
          ref="draggabTarget"
          class="drop-zone"
          @touchmove.prevent="handleTouchMove"
          @touchend.prevent="handleTouchEnd"
        >
        </div>
        <div class="drop-item" ref="draggableItem" @touchstart="handleTouchStart"></div>
      </div>
      <div v-else class="drop-box2"></div>

    </div>
    <view class="page3"></view>

		<!-- <view class="flex-column flex-mc">
			<view class="logo">
			  <image src="../../static/images/zlogo_index.png" class="zlogo"></image>
			</view>
			<view class="d-btn flex-row flex-a-i-c flex-j-c-c" @click="jump">
        <text class="d-btn-text">打开APP 一起探索节目同款路线
          <wx-open-launch-app v-if="isWx" appid="wx329392544913ec90" :extinfo="extinfo" style="
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              width: 100%;
              height: 100%;
            " @error="handleErrorFn" @launch="handleLaunchFn">
              <component :is="'script'" type="text/wxtag-template">
                <component :is="'style'">
                  .btn {width: 140px; height: 58px;}
                </component>
                <div class="btn"></div>
              </component>
            </wx-open-launch-app>

        </text>
			</view>
		</view> -->
  </view>
  <view class="container" v-else-if="parentMember">
    <view class="tip-cover" v-if="isWB">
     <text>点击右上角...>在默认浏览器中打开 ↗</text>
    </view>
    <view class="header flex-row flex-j-c-b flex-a-i-c m-b-50" v-if="!isZtv">
      <image
        src="../../static/images/zlogo_index.png"
        class="zlogo-s p-l-25"
      ></image>
      <view class="p-r-25">
        <view class="d-btn-s flex-row flex-a-i-c flex-j-c-c" @click="jump">
          <text class="d-btn-text">打开APP
            <wx-open-launch-app v-if="isWx" appid="wx329392544913ec90" :extinfo="extinfo" style="
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              width: 100%;
              height: 100%;
            " @error="handleErrorFn" @launch="handleLaunchFn">
              <component :is="'script'" type="text/wxtag-template">
                <component :is="'style'">
                  .btn {width: 140px; height: 58px;}
                </component>
                <div class="btn"></div>
              </component>
            </wx-open-launch-app>
          </text>
        </view>
      </view>
    </view>
		<view class="m-l-30">
			<image src="../../static/images/logo_route.png" class="gmlogo">
		</view>
		<view class="flex-column flex-mc m-t-x0">
			<view class="profile-circle">
				<image :src="parentMember.avatar" class="profile"></image>
			</view>
			<view class="nickname m-t-20">{{parentMember.nickname}}</view>
			<view class="line m-t-30 m-b-30"></view>
			<image src="../../static/images/title1_index.png" class="shareTitle"></image>
		</view>
		<view class="flex-column flex-mc">
			<view class="logo">
			  <image src="../../static/images/zlogo_index.png" class="zlogo"></image>
			</view>
			<view class="d-btn flex-row flex-a-i-c flex-j-c-c" @click="login">
			  <text class="d-btn-text fs-28">助力生态合伙人
          <wx-open-launch-app  v-if="isWx" appid="wx329392544913ec90" :extinfo="extinfo" style="
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              width: 100%;
              height: 100%;
            " @error="handleErrorFn" @launch="handleLaunchFn">
              <component :is="'script'" type="text/wxtag-template">
                <component :is="'style'">
                  .btn {width: 140px; height: 58px;}
                </component>
                <div class="btn"></div>
              </component>
            </wx-open-launch-app>
        </text>
			</view>
		</view>
  </view>
  <view class="container unlogin flex-column flex-a-i-c flex-j-c-c" v-else>
    <image src="../../static/images/unlogin.png" class="unlogin-logo"></image>
    <view class="m-t-40">登录后才能参加活动哦</view>
    <view class="d-btn flex-row flex-a-i-c flex-j-c-c" @click="login">
      <text class="d-btn-text fs-28">立即登录</text>
    </view>
  </view>
</template>

<script>
import {
  doLogin,
  doAuth,
  callToRoute,
  initDefaultShare,
} from "@/common/utils/ztv";
import { getParentMember } from "@/common/http/api/member.js";
import { getQueryParam } from "@/common//utils/ztv/index.js"
import jWeixin from "weixin-js-sdk";

export default {
  data() {
    return {
      isDragging: false,
      startX: 0,
      startY: 0,
      progress:0,
      showPage1:true,
      showOverBox:false,
      isZtv: navigator.userAgent.match(/chinabluetv/i),
      isWx:navigator.userAgent.match(/micromessenger/i),
      isWB:navigator.userAgent.match(/WeiBo/i),
      query: undefined,
      parentMember: undefined,
      extinfo:JSON.stringify({ route: encodeURIComponent(`chinablue://cztvrouter/business/h5?path=${encodeURIComponent(
        'https://zmtv.cztv.com/rmst/#/pages/main/loading'+ getQueryParam()
      )}&displayBar=false`) })
    };
  },
  onLoad(e) {
    document.body.style.overflow = 'hidden';
    // setTimeout(() => {
    //   this.$refs.scrollbox.scrollIntoView({ behavior: 'smooth' });
    // }, 3000);
    this.initWx();
    initDefaultShare();
    this.query = getApp().globalData.query;
    if (this.query && this.query.pid) {
      getParentMember({ pid: this.query.pid }).then((res) => {
        this.parentMember = res.data;
      });
    }
    this.beginProgress()
  },
  onShow() {},
  methods: {
    beginProgress(){
      this.progress += 10
      setTimeout(()=>{
        if(this.progress == 20){
          this.$refs.scrollbox.scrollIntoView({ behavior: 'smooth' });
          setTimeout(()=>{
            this.showPage1 = false
          },1000)
        }else{
          this.beginProgress() 
        }
      },1000)
    },
    handleTouchStart(event) {
      // 记录初始触摸位置
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;

      // 标记拖拽开始
      this.isDragging = true;

      // 添加移动和结束事件监听器
      window.addEventListener("touchmove", this.handleTouchMove);
      window.addEventListener("touchend", this.handleTouchEnd);
    },
    handleTouchMove(event) {
      if (!this.isDragging) return;

      // 计算移动的距离
      const deltaX = event.touches[0].clientX - this.startX;
      const deltaY = event.touches[0].clientY - this.startY;

      // 移动拖拽的元素
      this.$refs.draggableItem.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    },
    handleTouchEnd() {
      if (!this.isDragging) return;

      // 标记拖拽结束
      this.isDragging = false;

      // 移除移动和结束事件监听器
      window.removeEventListener("touchmove", this.handleTouchMove);
      window.removeEventListener("touchend", this.handleTouchEnd);

      // 获取拖拽的元素的位置
      const rect = this.$refs.draggableItem.getBoundingClientRect();
      const rectTarget = this.$refs.draggabTarget.getBoundingClientRect();

      const isDroppedToTarget = rect.right >= rectTarget.right - 10 && rect.right <= rectTarget.right + 10 && 
      rect.bottom >= rectTarget.bottom - 10 && rect.bottom <= rectTarget.bottom + 10

      if (isDroppedToTarget) {
        console.log("拖拽到目标区域");
        document.body.style.overflow = '';
        this.showOverBox = true
        // 执行相应的逻辑
      }else{
        this.$refs.draggableItem.style.transform = "translate(0, 0)";
      }

      // 重置拖拽元素的位置
    },
    jump() {
     // 微信环境调用 utils/weixin.js 注入后使用<wx-open-launch-app></wx-open-launch-app>打开
      if (!this.isWx) {
        callToRoute();
      }
    },
    handleErrorFn(){
      window.location.href = 'https://zmtv.cztv.com/ap/download/index.shtml'
    },
    handleLaunchFn(){

    },
    login() {
      if (!this.isZtv) {
        this.jump();
        return;
      }
      if (process.env.NODE_ENV === "production") {
        doAuth((res) => {
          if (res) {
            uni.navigateTo({
              url: "/pages/main/loading",
            });
          } else {
            doLogin((res) => {
              this.$store.dispatch("Login").then((res) => {
                uni.navigateTo({
                  url: "/pages/main/loading",
                });
              });
            });
          }
        });
      } else {
        uni.navigateTo({
          url: "/pages/main/loading",
        });
      }
    },
    initWx() {
      //获取当前url然后传递给后台获取授权和签名信息
      uni.request({
        url:
          "https://zlive.cztv.com/api/v2/iblue/weixin/share?channel_id=1&callback=?&url=" +
          location.href.split("#")[0],
        header: {
          "custom-header": "hello", //自定义请求头信息
        },
        success: (res) => {
          if (res.data.code == 200) {
            //注入config权限配置
            const { appId, timestamp, nonceStr, signature } = res.data.data;
            jWeixin.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
            jWeixin.error(function (res) {
              // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
            });
            jWeixin.ready(function () {
              let urlParams=getQueryParam();
              let title="《奔跑吧生态篇》互动游戏“生态合伙人”来啦！"
              let subTitle="上Z视介边看边玩，更有签名照、节目录制门票等你拿！"
              if(urlParams.indexOf('pid=')!=-1){
                title="快来跟我一起成为《奔跑吧》的“生态合伙人”吧！"
                subTitle="真的“态”好玩了！更有签名照、节目录制门票等你拿！"
              }
              jWeixin.updateAppMessageShareData({
                //分享给朋友
                title: title,
                desc: subTitle,
                imgUrl:
                  "http://z-rm-a.oss-cn-hangzhou.aliyuncs.com/shareLogo.jpg",
                link: "https://zmtv.cztv.com/rmst/#/pages/services/index"+urlParams, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                success: function () {
                  // 用户确认分享后执行的回调函数
                },
              });
              jWeixin.updateTimelineShareData({
                //分享到朋友圈
                title: title,
                desc: subTitle,
                imgUrl:
                  "http://z-rm-a.oss-cn-hangzhou.aliyuncs.com/shareLogo.jpg",
                link: "https://zmtv.cztv.com/rmst/#/pages/services/index"+urlParams, // 分享链接，
                success: function () {
                  // 用户确认分享后执行的回调函数
                },
              });
            });
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  // align-items: center;
  background: url(@/static/images/bg_index.png) center/cover no-repeat fixed;
  background-position: center top 20rpx;
  // padding: 0 30rpx;
  &.unlogin {
    background: #fff;
  }
}
.container-box{
  width: 100vw;
  position: relative;
  .page1{
    background: url(@/static/loading/loading.png) no-repeat;
    background-size: 750rpx 1624rpx;
    width: 750rpx;
    height: 1624rpx;
    position: relative;

    .progress{
      position: absolute;
      top: 40%;
      width: 100vw;
      text-align: center;
      color: #ffffff;
      font-size: 24rpx;
    }
  }
  .page2{
    background: url(@/static/loading/page1.png) no-repeat;
    background-size: 750rpx 1624rpx;
    width: 750rpx;
    height: 1624rpx;
    position: relative;
    .drop-box2{
      background: url(@/static/loading/drop-box2.png) no-repeat;
      background-size: 519rpx 524rpx;
      width: 519rpx;
      height: 524rpx;
      position: absolute;
      left: 50%;
      top: 20%;
      transform: translateX(-50%);
    }
    .drop-box{
      background: url(@/static/loading/drop-box.png) no-repeat;
      background-size: 519rpx 524rpx;
      width: 519rpx;
      height: 524rpx;
      position: absolute;
      left: 50%;
      top: 20%;
      transform: translateX(-50%);
      .drop-item{
        background: url(@/static/loading/drop-item.png) no-repeat;
        background-size: 240rpx 272rpx;
        width: 240rpx;
        height: 272rpx;
        position: absolute;
        right: -60rpx;
        bottom: -60rpx;
      }
      .drop-zone{
        width: 240rpx;
        height: 272rpx;
        position: absolute;
        right: 30rpx;
        bottom: 40rpx;
      }
    }
  }
  .page3{
    background: url(@/static/loading/page2.png) no-repeat;
    background-size: 750rpx 1836rpx;
    width: 750rpx;
    height: 1836rpx;
  }
}
.tip-cover{
    position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		overflow: auto;
		background-color: rgb(0, 0, 0,0.7);
    text{
      width: 100%;
      color:#fff;
      font-size: 24rpx;
      margin-top: 80rpx;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
}
.header {
  width: 750rpx;
  height: 90rpx;
  background: #2b2b32;
  .zlogo-s {
    width: 160rpx;
    height: 53rpx;
  }
}

.title {
  width: 465rpx;
  height: 209rpx;
}

.subTitle {
  width: 567rpx;
  height: 103rpx;
}

.line {
  width: 756rpx;
  height: 3rpx;
  background: linear-gradient(
    90deg,
    #ffe50000 9.26%,
    #ffefa6 50.55%,
    #ffe50100 91.01%
  );
}
.gmlogo {
  width: 218rpx;
  height: 92rpx;
}
.profile-circle {
  width: 129.88rpx;
  height: 129.88rpx;
  border-radius: 50%;
  border: 5rpx solid #d3df50;
  .profile {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.shareTitle {
  width: 624rpx;
  height: 78rpx;
}
.nickname {
  color: #fff;
  font-size: 20rpx;
  font-weight: 500;
}

.logo {
  position: fixed;
  bottom: 15vh;
  .zlogo {
    width: 192rpx;
    height: 63rpx;
  }
}

.d-btn {
  position: fixed;
  bottom: 6vh;
  width: 640rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  background: linear-gradient(90deg, #75bff9, #2558f6);
}
.d-btn-text {
  font-weight: 500;
  color: #ffffff;
}

.d-btn-s {
  width: 120rpx;
  height: 50rpx;
  line-height: 50rpx;
  border-radius: 25rpx;
  background: linear-gradient(90deg, #75bff9, #2558f6);
  padding: 0 10rpx;
}

.unlogin-logo {
  width: 451rpx;
  height: 361rpx;
}
</style>
