<template>
  <view class="bookPopup_content" v-if="showPopup">
		<view class="content">
			<view class="frame">
				<view class="pic-box">
					<image :src="data.pic" class="img" >
				</view>
			</view>
			<image
			  class="bookImage"
			  src="../../static/images/bg_book.png"
			></image>
			<view class="text-box">
				<view class="name">{{data.name}}</view>
				<scroll-view scroll-y style="max-height: 260rpx;">
					<view class="remark">{{data.remark}}</view>
				</scroll-view>
			</view>
			<view class="book-b">
				<view class="btn-group m-t-20">
					<view class="flex-row flex-mc">
						<image
							src="../../static/images/btn_schhrhb.png"
							@click="btnCreate()"
							style="width: 320rpx; height: 109rpx"
						></image>
					</view>
				</view>
				<view class="btn-close">
				  <image
				    src="../../static/images/close.png"
				    @click="btnCloseOp()"
				    style="width: 57rpx; height: 57rpx"
				    class="m-t-60"
				  ></image>
				</view>
			</view>
		</view>
  </view>
</template>

<script>
export default {
  props: {
		
  },
  data() {
    return {
      data: {},
      showPopup: false,
    };
  },
  methods: {
    show(params) {
      this.data = params.data;
      this.showPopup = true;
    },
		btnCreate() {
			this.showPopup = false;
			this.$emit('showCallUp',this.data)
		},
    btnCloseOp: function () {
     this.showPopup = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.bookPopup_content {
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgb(0, 0, 0, 0.85);
}
.content {
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	position: relative;
	width: 706.66rpx;
	height: 723rpx;
}
.frame {
	position: absolute;
	left: 7%;
	top: 8%;
	width: 100%;
}
.pic-box {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 592rpx;
	height: 490rpx;
	background: #FFEA00;
	border-radius: 50rpx;
	.img {
		width: 572rpx;
		height: 460rpx;
		border-radius: 50rpx;
	}
}
.bookImage {
  position: absolute;
  left: 0;
  top: 50%;
	transform: translate(0, -50%);
  display: block;
  width: 707rpx;
  height: 763rpx;
  z-index: 0;
}
.text-box {
	position: absolute;
	left: 0;
	top: 50%;
	padding: 0 12%;
	.name {
		height: 60rpx;
		color: #009a0f;
		font-size: 36rpx;
		font-weight: 600;
	}
	.remark {
		color: #3c8800;
		font-size: 24rpx;
		font-weight: 400;
	}
}
.book-b {
	position: absolute;
	bottom: -20%;
	left: 50%;
	transform: translate(-50%, 0);
}
.btn-group {
	display: flex;
	justify-content: center;
}
.btn-close {
	position: absolute;
	left: calc(50% - 28rpx);
}
</style>
