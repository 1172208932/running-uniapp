<template>
	<view class="container">
		<ua-navbar></ua-navbar>
		<view class="flex-row flex-wp flex-j-c-b m-t-13v p-lr-30">
			<view class="choose-box m-b-30" v-for="item in list" :key="item.id" @click="showBook(item)">
				<view class="header flex-row flex-a-i-c flex-j-c-b" >
					<view class="status m-l-20" v-if="item.memberPrizeList.length !==4">未打卡</view>
					<view v-else></view>
					<view class="mark flex-row flex-mc">
						<image class="img" src="../../static/images/vector_orange.png"></image>
						<text class="mark-text m-l-10" v-if="item.memberPrizeList.length !==4">{{item.memberPrizeList.length}}/4</text>
						<text class="mark-text m-l-10" v-else>{{item.memberAllPrizeList.length > 99 ? "99+" : item.memberAllPrizeList.length}}</text>
					</view>
				</view>
				<image class="profile" :src="item.pic" v-if="item.memberPrizeList.length !==4"></image>
				<image class="profile-d" :src="item.pic" v-else></image>
				<view class="name">{{item.name}}</view>
			</view>
		</view>
		<book-popup ref="bookPop" @showCallUp="showCallUp"></book-popup>
		<callUp-popup ref="callUpPop"></callUp-popup>
	</view>
</template>

<script>
	import { getbookList } from "@/common/http/api/route.js"
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad(e) {
			const routeId = e.routeId
			if (typeof routeId !== 'undefined') {
				this.getData(routeId)
			}
		},
		onShow() {
			
		},
		methods: {
			showBook(item) {
				this.$refs.bookPop.show({data:item})
			},
			showCallUp(item){
				this.$refs.callUpPop.show({data:item})
			},
			getData(routeId) {
				var params = {
					routeId: routeId
				}
				getbookList(params).then(res => {
					this.list = res.data;
					console.log("图鉴列表",this.list)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: url(@/static/images/bg_reward.png) center/cover no-repeat fixed;
		font-family: PingFang SC;
	}
	.m-t-13v {
		width: 100%;
		margin-top: 13vh;
	}
	.choose-box {
		position: relative;
		width: 327rpx;
		height: 396rpx;
		border-radius: 30rpx;
		overflow: hidden;
		.header {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			width: 100%;
			.status {
				color: #cbcbcb;
				font-size: 24rpx;
				font-weight: 500;
			}
			.mark {
				width: 138rpx;
				height: 57rpx;
				border-radius: 8rpx 30rpx 8rpx 30rpx;//左上、右上、右下、左下
				background: #FFE501;
				.img {
					width: 37rpx;
					height: 37rpx;
				}
				.mark-text {
					color: #2b83ef;
					 font-size: 24rpx;
					 font-weight: 500;
				}
			}
		}
		.profile {
			width: 327rpx;
			height: 329rpx;
		}
		.profile::before {
		  content: "";
		  position: absolute;
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
		  background-color: rgba(0, 0, 0, 0.6);
			z-index: 2;
		}
		.profile::after {
		  content: "";
		  position: absolute;
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
		  background-image: url("../../static/images/frame_b_handbook.png");
		  background-size: cover;
		  background-position: center;
		  z-index: 1;
		}
		.profile-d {
			width: 327rpx;
			height: 329rpx;
		}
		.profile-d::after {
		  content: "";
		  position: absolute;
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
		  background-image: url("../../static/images/frame_b_handbook.png");
		  background-size: cover;
		  background-position: center;
		  z-index: 1;
		}
		.name {
			width: 327rpx;
			height: 71rpx;
			line-height: 67rpx;
			border-radius: 0 0 20rpx 20rpx;
			background: #045CC7;
			box-shadow: 0 6rpx 8rpx 0 #00000040;
			position: absolute;
			bottom: 0;
			left: 0;
			color: #FFF;
			font-size: 32rpx;
			font-weight: 600;
			text-align: center;
		}
	}
</style>