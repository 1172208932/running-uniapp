<template>
	<view class="container">
		<ua-navbar :isBack="false" :isClose="true"></ua-navbar>
		<view class="p-lr-30 p-b-30">
			<view class="flex-row flex-a-i-c flex-a-i-st m-t-20">
				<image src="../../static/images/zlogo_loading.png" class="zlogo p-r-40"></image>
				<image src="../../static/images/R_icon.png" class="r-icon"></image>
			</view>
			<view class="flex-column flex-mc m-t-80">
				<image src="../../static/images/title_loading.png" class="title"></image>
				<image src="../../static/images/title_choose.png" class="subtitle m-t-30"></image>
				<text class="text fs-24 m-t-20">排行前15的合伙人将获得《奔跑吧》节目组官方正版惊喜福利</text>			
			</view>
			<view class="flex-column">
				<view class="flex-row m-t-30 flex-mc">
					<view class="choose-box m-r-20" v-for="item in data.partnerList.slice(0,3)" :key="item.id" @click="selectPartner(item.id)">
						<image class="profile" :src="item.avatar"></image>
						<text class="name">{{item.name}}</text>
					</view>
				</view>
				<view class="flex-row m-t-30 flex-mc">
					<view class="choose-box m-r-20" v-for="item in data.partnerList.slice(3, 6)" :key="item.id" @click="selectPartner(item.id)">
						<image class="profile" :src="item.avatar"></image>
						<text class="name">{{item.name}}</text>
					</view>
				</view>
				<view class="flex-row flex-j-c-c m-t-30 ">
					<view class="choose-box m-r-30" v-for="item in data.partnerList.slice(6, 8)" :key="item.id" @click="selectPartner(item.id)">
						<image class="profile" :src="item.avatar"></image>
						<text class="name">{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="flex-row flex-mc m-t-50" @click="handleChoose">
				<image src="../../static/images/btn_choose.png" class="btn"></image>
			</view>
		</view>
	</view>
</template>

<script>
import { getRoute } from '@/common/http/api/route.js'
import { startExplore } from '@/common/http/api/member.js'
import { Toast } from 'vant'
	export default {
		data() {
			return {
				data: {},
				partnerId: undefined,
			}
		},
		onLoad(e) {
			let data = decodeURIComponent(e.data)
			if(typeof data !== 'undefined') {
				this.data = JSON.parse(data)
			}
		},
		onShow() {
			
		},
		mounted() {
		},
		methods: {
			jump() {
				uni.navigateTo({
				  url: '/pages/services/route'
				});
			},
			selectPartner(id) {
				this.partnerId = id
			},
			jump() {
				uni.navigateTo({
				  url: '/pages/services/route?data='+ encodeURIComponent(JSON.stringify(this.data))
				});
			},
			handleChoose() {
				if (this.partnerId) {
					const params = { routeId: this.data.id, partnerId: this.partnerId,memberId:this.data.member.id}
					startExplore(params).then(response => {
						console.log('开启探索')
					}).finally(e =>{
						getRoute({id: this.data.id}).then(response=> {
							this.data = response.data
						}).finally(e => {
							this.jump()
						})
					})
				}else {
					Toast('选择你的生态召集人！');
				}
			}
 		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: url(@/static/images/bg_choose.png) center/cover no-repeat fixed;
	}
	.zlogo {
		width: 200rpx;
		height: 47rpx;
	}
	.r-icon {
		width: 160.81rpx;
		height: 67.49rpx;
	}
	.text {
		font-family: PingFang HK;
		color: #FFFFFF;
	}
	.title {
		width: 481rpx;
		height: 204.94rpx;
	}
	.subtitle{
		width: 521rpx;
		height: 46rpx;
	}
	.choose-box {
		position: relative;
		width: 180rpx;
		height: 215rpx;
		flex-shrink: 0;
		border-radius: 20rpx;
		background: #F1F8EC;
		box-shadow: 0 6rpx 8rpx 0 #1a338d40;
		overflow: hidden; /* 隐藏超出部分 */
		.profile {
			position: absolute;
			width: 180rpx;
			height: 160rpx;
		}
		.name {
			 position: absolute;
			 bottom: 10rpx;
			 left: 50%;
			 transform: translateX(-50%);
			 color: #000000;
			 font-family: PingFang SC;
			 font-size: 24rpx;
			 font-style: normal;
			 font-weight: 600;
			 line-height: normal;
		}
	}
	.choose-box:hover {
	  background: #FFE501; /* 在鼠标悬停时改变背景颜色 */
	}
	.btn {
		width: 350rpx;
		height: 91rpx;
	}
</style>