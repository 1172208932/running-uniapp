<template>
	<view class="helpPopup_content">
		<image class="helpImage" src="../../static/images/bg_help.png" @error="imageError"></image>
		<view class="helpimage-content" v-show="firstShow">
			<image src="../../static/images/title_help.png" class="title"></image>
			<image src="../../static/images/line_help.png" class="line m-t-10"></image>
			<view class="content">
				<view class="flex-column flex-mc">
					<image :src="parentMember.avatar" class="profile">
					<view class="userName m-t-20">{{parentMember.nickname}}</view> 
					<view class="m-t-50">我在参与“奔跑吧生态合伙人”活动</view>
					<view>为我助力一起探索奔跑吧生态同款路线</view>
				</view>
			</view>
			<view class="btn" @click="btnWtzl()">
				<image src="../../static/images/btn_wtzl.png" style="width: 234rpx;height: 80rpx;"></image>
			</view>
			<view class="btn-group">
				<view class="flex-row flex-mc">
					<image src="../../static/images/close.png" @click="btnCloseOp()" style="width: 57rpx;height: 57rpx" class="m-t-60"></image>
				</view>
			</view>
		</view>
		
		<view class="helpimage-content" v-show="secondShow">
			<image src="../../static/images/title_help_s.png" class="title"></image>
			<image src="../../static/images/line_help.png" class="line m-t-10"></image>
			<view class="content">
				<view class="flex-column flex-mc">
					<image src="../../static/images/rocket_icon.png" class="rocket">
					<view class="m-t-40 fs-32">为好友助力成功</view>
					<view class="fs-32">一起探索路线获“专属周边”</view>
				</view>
			</view>
			<view class="btn" @click="btnMscy()">
				<image src="../../static/images/btn_mscy.png" style="width: 234rpx;height: 80rpx;"></image>
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
		props: {
			firstShow: {
				type: Boolean,
				default: function(){
					return false;
				}
			},
			secondShow: {
				type: Boolean,
				default: function(){
					return false;
				}
			},
			parentMember: {
				type: Object,
				required: true
			},
		},
		data() {
			return {
				showHelpPopup: false,
			}
		},
		methods: {
			show() {
				this.showHelpPopup = true
			},
			btnCloseOp: function(){
				this.$emit('clickClose')
			},
			btnWtzl: function(){
				this.$emit('handleNotify')
			},
			btnMscy: function(){
				this.$emit('clickClose')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.helpPopup_content {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		background-color: rgb(0, 0, 0,0.85);
	}
	.helpImage {
	  position: absolute;
	  left: 0%;
	  top: 50%;
		transform: translateY(-50%);
	  display: block;
		width: 100%;
		height: 682rpx;
	  z-index: 0;
	}
	.helpimage-content{
		position: absolute;
		left: 0%;
		top: 50%;
		transform: translateY(-50%);
		position: relative;
		width: 100%;
		height: 682rpx;
		.title {
			position: absolute;
			top: 16%;
			left: 50%;
			transform: translate(-50%,0);
			width: 517rpx;
			height: 77rpx;
		}
		.line {
			position: absolute;
			top: 30%;
			left: 50%;
			transform: translate(-50%,0);
			width: 520rpx;
			height: 4rpx;
		}
		.content {
			position: absolute;
			top: 35%;
			left: 50%;
			transform: translate(-50%,0);
			color: #009a0f;
			font-size: 24rpx;
			font-weight: 400;
			width: 80%;
			height: 500rpx;
			.profile {
				width: 93rpx;
				height: 93rpx;
				border-radius: 93rpx;
				box-shadow: 0 4rpx 2rpx 0 #00000033;
			}
			.userName {
				color: #009a0f;
				font-size: 30rpx;
				font-weight: 600;
			}
			.rocket {
				width: 115rpx;
				height: 115.41rpx;
			}
		}
		.btn {
			position: absolute;
			top: 80%;
			left: 50%;
			transform: translate(-50%,0);
		}
		.btn-group {
			position: absolute;
			bottom: -15%;
			left: 50%;
			transform: translate(-50%,0);
		}
	}	
</style>