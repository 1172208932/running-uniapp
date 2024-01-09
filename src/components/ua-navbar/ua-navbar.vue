<!-- 顶部导航栏 -->
<template>
	<view class="flex-row flex-j-c-b m-t-x0 m-lr-30" style="z-index: 1">
		<image src="../../static/images/back_icon.png" class="icon" @click="onBack" v-if="isBack"></image>
		<image src="../../static/images/back_icon.png" class="icon" @click="onClose" v-if="isClose"></image>
		<image src="../../static/images/share_icon.png" class="icon" @click="onShare" v-if="isShare" ></image>
  </view>
</template>

<script>
import { doShare, shareH5Url, doClose } from "@/common/utils/ztv";
export default {
  props: {
     isShare: { type: [Boolean, String], default: false },
		 isBack: { type: [Boolean, String], default: true },
		 isClose: { type: [Boolean, String], default: false },
  },
  data() {
    return {
      url: shareH5Url,
    };
  },
  created() {
   
  },
  computed: {
   
  },
  methods: {
		onBack() {
			uni.navigateBack({
				delta: 1,
			});
		},
		onShare() {
			const shareData = {
			  url: this.url, //分享的网址链接
			  title: '《奔跑吧生态篇》互动游戏“生态合伙人”来啦！', //分享的标题
			  content: '上Z视介边看边玩，更有签名照、节目录制门票等你拿！', // 分享的文字
			  img: 'http://z-rm-a.oss-cn-hangzhou.aliyuncs.com/shareLogo.jpg', // 分享的图片Url
			}
			doShare(shareData)
		},
		onClose() {
			doClose().then( res => {
				console.log('调用关闭，doClose',res)
			})
		}
  },
};
</script>

<style lang="scss" scoped>
.icon {
	width: 61rpx;
	height: 61rpx;
}
</style>
