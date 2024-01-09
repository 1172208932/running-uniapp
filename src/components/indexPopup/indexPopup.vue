<template>
	<view class="indexPopup_content" v-if="showIndexPopup">
		<image
		  class="indexImage"
		  src="../../static/images/navigation_pop.png"
		></image>
		<view class="indeximage-content">
			<view class="btn-close">
				<view class="flex-column flex-mc">
				  <image
				    src="../../static/images/btn_sxgl.png"
				    @click="btnCloseOp()"
				    style="width: 234rpx; height: 72.6rpx"
				  ></image>
					<image
						class="m-t-30"
					  src="../../static/images/close.png"
					  @click="btnCloseOp()"
					  style="width: 57rpx; height: 57rpx"
					></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showIndexPopup: false
			}
		},
		onLoad(e) {
		},
		methods: {
			show() {
				this.showIndexPopup = true
			},
			btnCloseOp() {
				uni.setStorageSync('firstLogin', '1');
				this.showIndexPopup = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.indexPopup_content {
		left: 0;
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		background-color: rgb(0, 0, 0, 0.85);
	}
	.indexImage {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		display: block;
		width: 700rpx;
		height: 777rpx;
		z-index: 0;
	}
	.indeximage-content {
	  height: 777rpx;
	  top: 55%;
		transform: translate(0,-50%);
	  position: relative;
		.btn-close {
			position: absolute;
			left: 50%;
			bottom: -25%;
			transform: translate(-50%,-50%);
			display: block;
			z-index: 0;
		}
	}
</style>