<template>
  <view class="container">
		<ua-navbar :isBack="false" :isClose="true"></ua-navbar>
    <view class="flex-row flex-a-i-c flex-a-i-st">
      <image
        src="../../static/images/zlogo_loading.png"
        class="zlogo p-r-40"
      ></image>
      <image src="../../static/images/logo_route.png" class="icon"></image>
    </view>
    <view class="flex-column flex-mc m-t-x1">
      <image
        src="../../static/images/title_loading.png"
        class="title-logo"
      ></image>
      <view class="progress-bar flex-row flex-a-i-c m-t-x0">
        <view class="progress" :style="{ width: progress + '%' }">
          <image
            src="../../static/images/R.png"
            class="R-icon"
            :style="{ left: progress - 8 + '%' }"
          ></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { notifyActivity, doAuth } from "@/common/utils/ztv";
import { getRouteLast } from "@/common/http/api/route.js";
export default {
  data() {
    return {
      progress: 0,
      isPlaying: false,
      isCompleted: false,
      data: {}
    };
  },
  onLoad(e) {
	},
  onShow() {},
  mounted() {
    this.start();
  },
  methods: {
    start() {
      this.isPlaying = true;
      this.animateProgress(90)
        .then(() => {
          // 先执行动画，再请求接口
          if (!this.isCompleted) {
            getRouteLast().then((response) => {
              // 请求成功，执行后续动画，并做跳转逻辑
              this.animateProgress(100).then(() => {
                this.finish(response.data);
              });
              notifyActivity(response.data);
            });
          }
        })
        .catch((error) => {
          console.error("Progress error", error);
        });
    },
    animateProgress(target) {
      return new Promise((resolve, reject) => {
        let start = this.progress;
        const end = target;
        const duration = (target - start) * 15;

        const doAnimation = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          this.progress = start + (end - start) * progress;

          if (progress === 1) {
            resolve();
          } else if (this.isCompleted) {
            resolve();
          } else {
            requestAnimationFrame(doAnimation);
          }
        };
        const startTime = Date.now();
        requestAnimationFrame(doAnimation);
      });
    },
    finish(data) {
      this.isCompleted = true;
      this.progress = 100;
      if (process.env.NODE_ENV === "production") {
        doAuth((res) => {
          if (!res) {
            //app未登录
            uni.clearStorageSync();
            uni.redirectTo({
              url: "/pages/services/index",
            });
          }
        });
      }
      if (data.memberPartner) {
        uni.redirectTo({
          url:
            "/pages/services/route?data=" +
            encodeURIComponent(JSON.stringify(data))
        });
      } else {
        uni.redirectTo({
          url:
            "/pages/services/choose?data=" +
            encodeURIComponent(JSON.stringify(data))
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url(@/static/images/bg_loading.png) center/cover no-repeat fixed;
  padding: 80rpx 30rpx 30rpx 30rpx;
}
.zlogo {
  width: 200rpx;
  height: 47rpx;
}
.icon {
  width: 160.81rpx;
  height: 67.49rpx;
}
.title-logo {
  width: 600.03rpx;
  height: 255.65rpx;
  flex-shrink: 0;
}
.progress-bar {
  position: relative;
  width: 566rpx;
  height: 39rpx;
  padding: 0 10rpx;
  flex-shrink: 0;
  border-radius: 25rpx;
  background: #fff;
  .progress {
    height: 27.3rpx;
    flex-shrink: 0;
    border-radius: 25rpx;
    background: linear-gradient(180deg, #fcff66 -40%, #fcb500 120%);
  }
  .R-icon {
    position: absolute;
    top: -20%;
    width: 104rpx;
    height: 61.66rpx;
  }
}
</style>
