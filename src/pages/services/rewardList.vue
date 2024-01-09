<template>
	<view class="container">
		<ua-navbar></ua-navbar>
		<view class="empty" v-if="$utils.isEmpty(list)">
			<image src="../../static/images/empty.png" class="empty-icon"></image>
			<text class="desc m-t-50">当前暂未获得任何奖品</text>
		</view>
		<view v-else class="m-t-10v p-30">
			<view  v-for="(item,index) in list" :key="index" class="reward-list">
				<view class="flex-column">
					<view class="flex-row flex-a-i-c flex-j-c-b">
						<view class="flex-row flex-a-i-c">
							<image :src="item.gift.pic" class="img"></image>
							<text class="name m-l-15">{{item.gift.name}}</text>
						</view>
						<view class="flex-row flex-j-c-b">
							<view class="e-btn flex-row flex-mc" v-if="isExpired(item.expireDate)">
								<text class="btn-text">已过期</text>
							</view>
							<view class="btn flex-row flex-mc" v-else @click="handleView(item.id)">
								<text class="btn-text">查看</text>
							</view>
						</view>
					</view>
					<view class="time" v-if="item.type === 2">有效期至：{{$utils.formatTime1(item.expireDate)}}，请在有效期内完善收货地址</view>
					<view class="time" v-if="item.type === 1">虚拟奖品将在用户填写信息后发放，请及时填写领取信息</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getGiftList } from "@/common/http/api/member.js"
	export default {
		data() {
			return {
				list: [],
				routeId: undefined,
			}
		},
		onLoad(e) {
			const routeId = e.routeId
			if (typeof routeId !== 'undefined') {
				this.routeId = routeId
				this.getData()
			}
		},
		methods: {
			getData() {
				var params = {
					routeId: this.routeId
				}
				getGiftList(params).then(res => {
					this.list = res.data.filter(item => item.gift !== null)
					console.log("奖励",this.list)
				})
			},
			handleView(id) {
				uni.navigateTo({
				  url: '/pages/services/rewardDetail?id='+ id
				});
			},
			isExpired(expirationDay) {
				const expirationDate = new Date(expirationDay);
				const currentDate = new Date()
				return expirationDate < currentDate
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
	.m-t-10v {
		width: 100%;
		margin-top: 10vh;
	}
	.empty {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.empty-icon {
			width: 166.67rpx;
			height: 166.67rpx;
		}
		.desc {
			font-size: 30rpx;
			font-weight: 600;
			opacity: 0.5;
			color: #FFFFFF;
		}
	}
	.reward-list {
		padding: 20rpx 30rpx;
		border-radius: 30rpx;
		background: #F6FFF1;
		margin-bottom: 30rpx;
		.img {
			width: 182rpx;
			height: 126rpx;
			border-radius: 30rpx;
		}
		.name {
			font-size: 36rpx;
			font-weight: 500;
		}
		.time {
			color: #919191;
			font-size: 20rpx;
			margin-top: 20rpx;
		}
		.btn {
			width: 150rpx;
			height: 70rpx;
			flex-shrink: 0;
			border-radius: 50rpx;
			background: linear-gradient(0deg, #045BC7 -191.43%, #3A92FF 114.29%);
			box-shadow: 0 1rpx 5rpx 0 #00000033;
		}
		.e-btn {
			width: 150rpx;
			height: 70rpx;
			flex-shrink: 0;
			border-radius: 50rpx;
			background: linear-gradient(180deg, #93AAC7 0%, #A7BBD3 100%);
			box-shadow: 0 1rpx 5rpx 0 #00000033;
		}
		.btn-text {
			color: #ffffff;
			font-size: 32rpx;
			font-weight: 500;
		}
	}
</style>