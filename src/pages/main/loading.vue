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
        <!-- <div
          class="drop-zone"
          @touchmove.prevent="handleTouchMove"
          @touchend.prevent="handleTouchEnd"
        >
          放置目标区域
        </div>
        <div
          class="draggable-item"
          ref="draggableItem"
          @touchstart="handleTouchStart"
        >
          可拖拽的内容
        </div> -->

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
import draggable from 'vuedraggable';

export default {
  components:{
    draggable
  },
  data() {
    return {
      progress: 0,
      isPlaying: false,
      isCompleted: false,
      data: {},
      draggedItems:['Item 1', 'Item 2', 'Item 3'],
      isDragging: false,
      startX: 0,
      startY: 0,
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
              // this.animateProgress(100).then(() => {
              //   this.finish(response.data);
              // });
              // notifyActivity(response.data);
            });
          }
        })
        .catch((error) => {
          console.error("Progress error", error);
        });
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
      document.body.style.overflow = 'hidden';
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

      // 在这里可以根据实际需求判断拖拽到的位置
      const dropZone = document.querySelector(".drop-zone");
      const isDroppedToTarget = rect.left > dropZone.offsetLeft &&
                                rect.right < dropZone.offsetLeft + dropZone.offsetWidth &&
                                rect.top > dropZone.offsetTop &&
                                rect.bottom < dropZone.offsetTop + dropZone.offsetHeight;

      console.log(isDroppedToTarget,'isDroppedToTarget')
      if (isDroppedToTarget) {
        console.log("拖拽到目标区域");
        // 执行相应的逻辑
      }

      // 重置拖拽元素的位置
      this.$refs.draggableItem.style.transform = "translate(0, 0)";
      document.body.style.overflow = '';
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

.drag-box{
  width: 500rpx;
  height: 500rpx;
  overflow: hidden;
}
.draggable-item{
  width: 100rpx;
  height: 100rpx;
  background-color: #fcb500;
}
.drop-zone{
  width: 400rpx;
  height: 400rpx;
  background-color: red;
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
