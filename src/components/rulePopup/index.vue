<template>
	<view class="rulePopup_content" v-if="showRulePopup">
		<image class="ruleImage" src="../../static/images/bg_rulePopup.png" @error="imageError"></image>
		<view class="ruleimage-content">
			<image src="../../static/images/title_rule.png" class="title"></image>
			<view class="line m-t-10"></view>
			<view class="text">
				<scroll-view scroll-y style="max-height: 755rpx;">
					<text>
						{{ content }}
					</text>
				</scroll-view>
			</view>
			<view class="btn-group">
				<view class="flex-row flex-mc">
					<image src="../../static/images/close.png" @click="btnCloseOp()" style="width: 57rpx;height: 57rpx" class="m-t-60"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				showRulePopup: false
			}
		},
		methods: {
			show(content) {
				this.content=content;
				this.showRulePopup = true
			},
			btnCloseOp: function(){
				this.showRulePopup = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.rulePopup_content {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		background-color: rgb(0, 0, 0,0.85);
	}
	.ruleImage {
	  position: absolute;
	  left: 0%;
	  top: 50%;
		transform: translateY(-50%);
	  display: block;
		width: 100%;
		height: 1000rpx;
	  z-index: 0;
	}
	.ruleimage-content{
		position: absolute;
		left: 0%;
		top: 50%;
		transform: translateY(-50%);
		position: relative;
		width: 100%;
		height: 1000rpx;
		.title {
			position: absolute;
			top: 8%;
			left: 50%;
			transform: translate(-50%,0);
			width: 176rpx;
			height: 30rpx;
		}
		.line {
			position: absolute;
			top: 13%;
			left: 50%;
			transform: translate(-50%,0);
			width: 517rpx;
			height: 3rpx;
			background: linear-gradient(90deg, #d2f39600 -2.54%, #8ADA6E 50.55%, #d2f39500 102.54%);
		}
		.text {
			position: absolute;
			top: 16%;
			left: 50%;
			transform: translate(-50%,0);
			color: #009a0f;
			font-size: 24rpx;
			font-weight: 400;
			width: 80%;
			height: 500rpx;
		}
		.btn-group {
			position: absolute;
			bottom: -5%;
			left: 50%;
			transform: translate(-50%,0);
		}
	}	
</style>