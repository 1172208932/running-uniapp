<template>
	<view class="choosePopup_content" v-if="showChoosePopup">
		<image class="chooseImage" src="../../static/images/bg_choosePopup.png" @error="imageError"></image>
		<view class="chooseimage-content">
			<image class="title" src="../../static/images/title_choosePopup.png"></image>
			<view class="line m-t-10"></view>
			<view class="flex-column choose-list">
				<view class="flex-column flex-mc">
					<view class="flex-row m-t-30">
						<view class="choose-box m-r-20" v-for="item in data.slice(0, 3)" :key="item.id" @click="selectPartner(item.id)">
							<image class="profile" :src="item.avatar"></image>
							<text class="name">{{item.name}}</text>
						</view>
					</view>
					<view class="flex-row flex-mc m-t-30">
						<view class="choose-box m-r-20" v-for="item in data.slice(3, 6)" :key="item.id" @click="selectPartner(item.id)">
							<image class="profile" :src="item.avatar"></image>
							<text class="name">{{item.name}}</text>
						</view>
					</view>
					<view class="flex-row flex-j-c-c m-t-30">
						<view class="choose-box m-r-30" v-for="item in data.slice(6, 8)" :key="item.id" @click="selectPartner(item.id)">
							<image class="profile" :src="item.avatar"></image>
							<text class="name">{{item.name}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="btn-group">
				<view class="flex-column flex-mc">
					<image src="../../static/images/btn_qdxg.png" @click="btnOp()" style="width: 300rpx;height: 89rpx"></image>
					<image src="../../static/images/close.png" @click="btnCloseOp()" style="width: 57rpx;height: 57rpx" class="m-t-40"></image>
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
				partnerId: undefined,
				showChoosePopup: false
			}
		},
		methods: {
			show(params) {
				this.data = params.data
				this.showChoosePopup = true
			},
			selectPartner(id) {
				this.partnerId = id
			},
			btnCloseOp: function(needFresh){
				this.partnerId = undefined
				this.showChoosePopup = false
			},
			btnOp: function(){
				this.$emit("clickQrxg", this.partnerId);
				this.btnCloseOp()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.choosePopup_content {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		background-color: rgb(0, 0, 0,0.85);
	}
	.chooseImage {
	  position: absolute;
	  left: 2%;
	  top: 50%;
		transform: translateY(-50%);
	  display: block;
		width: 100%;
		height: 65vh;
	  z-index: 0;
	}
	.chooseimage-content{
		height: 60%;
		width: 100%;
		top: 20%;
		position: relative;
		.title {
			position: absolute;
			top: 5%;
			left: 50%;
			transform: translate(-50%,0);
			width: 394rpx;
			height: 35rpx;
		}
		.line {
			position: absolute;
			top: 10%;
			left: 50%;
			transform: translate(-50%,0);
			width: 517rpx;
			height: 3rpx;
			background: linear-gradient(90deg, #d2f39600 -2.54%, #8ADA6E 50.55%, #d2f39500 102.54%);
		}
		.btn-group {
			position: absolute;
			top: 97%;
			height: 400rpx;
			left: 50%;
			transform: translate(-50%,0);
			height: 400rpx;
		}
		.choose-list {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			width: 100%;
		}
	}
	.choose-box {
		position: relative;
		width: 160rpx;
		height: 190rpx;
		flex-shrink: 0;
		border-radius: 20rpx;
		background: #F1F8EC;
		box-shadow: 0 6rpx 8rpx 0 #1a338d40;
		overflow: hidden; /* 隐藏超出部分 */
		.profile {
			position: absolute;
			width: 160rpx;
			height: 145rpx;
			border-radius: 20rpx 20rpx 0 0;
		}
		.name {
			 width: 150rpx;
			 position: absolute;
			 bottom: 10rpx;
			 left: 50%;
			 transform: translateX(-50%);
			 color: #000000;
			 font-family: PingFang SC;
			 font-size: 24rpx;
			 font-weight: 600;
			 text-align: center;
		}
	}
	.choose-box:hover {
	  background: #FFE501; /* 在鼠标悬停时改变背景颜色 */
	}
</style>