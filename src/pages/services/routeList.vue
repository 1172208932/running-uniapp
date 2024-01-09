<template>
	<view class="container">
		<ua-navbar></ua-navbar>
		<view>
			<view class="content">
				<view class="content-inner" v-for="item in list" :key="item.id" @click="selectRoute(item)">
					<view class="title m-l-20">{{item.title}}</view>
					<view class="progress flex-row flex-a-i-c float-r m-t-n10">
						<text class="fw-5 fs-20 m-lr-15" style="color: #FFF;">探索进度</text>
						<view class="cust-progress">
							<van-progress
								stroke-width="16"
								:percentage="getPercent(item)"
								:show-pivot="false"
								color="linear-gradient(to right, #FFEA00, #FFB800)"
								track-color="#A5D58C"
							/>
						</view>
					</view>
					<scroll-view scroll-x>
						<view class="flex-row m-t-30">
							<view class="choose-box m-r-20" v-for="spot in item.spotsList" :key="spot.id">
								<image class="profile" :src="spot.pic"></image>
								<view class="name">{{spot.name}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>		
	</view>
</template>

<script>
	import { getRouteList } from "@/common/http/api/route.js"
	import { Toast } from 'vant'
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad(e) {
			this.loadData(1);
		},
		onShow() {
			
		},
		methods: {
			loadData(current) {
				var params = {
					pageNo: current,
					pageSize: 6,
				}
				getRouteList(params).then(res => {
					this.list = res.data.list;
					console.log(this.list,'list')
				})
			},
			getPercent(item) {
				return item.memberPieceList.length / (item.spotsList.length * 4) * 100
			},
			selectRoute(item) {
				Toast.loading({
					duration: 0, 
					message: '路线切换中...',
				})
				setTimeout(()=>{
					if (item.memberPartner) {
						uni.navigateTo({
							url: '/pages/services/route?data='+ encodeURIComponent(JSON.stringify(item)),
							success: function() {
								Toast.clear();
							}
						})
					}else {
						uni.navigateTo({
							url: '/pages/services/choose?data='+ encodeURIComponent(JSON.stringify(item)),
							success: function() {
								Toast.clear();
							}
						})
					}
				},1000)
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
		// padding: 30rpx;
		font-family: PingFang SC;
	}
	.content {
		width: 100%;
		// position: absolute;
		// top: 23%;
		// left: 0;
		margin-top: 80rpx;
		.content-inner {
			box-sizing: border-box;
			width: 100%;
			height: 393rpx;
			padding: 20rpx 40rpx;
			background: url(@/static/images/underframe.png) center/contain no-repeat;
			margin-top: 30rpx;
			.title {
				 color: #009a0f;
				 font-size: 32rpx;
				 font-weight: 600;
			}
			.progress {
				width: 292rpx;
				height: 38rpx;
				border-radius: 35.5rpx;
				border: 2rpx solid #FFF;
				background: #76D942;
				box-shadow: 0 1rpx 5rpx 0 #BACAB1;
				.cust-progress {
					width: 150rpx;
					height: 16rpx;
					border-radius: 30rpx;
					border: 2rpx solid #FFF;
					overflow: hidden;
				}
			}
			.choose-box {
				position: relative;
				width: 180rpx;
				height: 215rpx;
				.profile {
					width: 180rpx;
					height: 160rpx;
					border-radius: 20rpx 20rpx 0 0;
				}
				.name {
					 width: 180rpx;
					 height: 57rpx;
					 line-height: 57rpx;
					 border-radius: 0 0 20rpx 20rpx;
					 background: #2B83EF;
					 box-shadow: 0 6rpx 8rpx 0 #00000040;
					 position: absolute;
					 bottom: 0;
					 left: 0;
					 color: #FFF;
					 font-size: 22rpx;
					 font-weight: 600;
					 text-align: center;
				}
			}
		}
	}

</style>