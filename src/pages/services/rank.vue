<template>
	<view class="container">
		<ua-navbar class="w-col-12 p-l-30"></ua-navbar>
		<view class="p-relative">
			<image class="rank-t" src="../../static/images/t_rank.png"></image>
			<image class="title" src="../../static/images/title_rank.png"></image>
			<view class="subtitle">
				<scroll-view scroll-y style="max-height: 200rpx;">
					<text >
						{{ rule }}
					</text>
				</scroll-view>
			</view>
		</view>
		<view class="m-t-n55 p-l-15 p-relative">
			<image class="rank-m" src="../../static/images/b_rank.png"></image>
			<view class="flex-column">
				<view class="table">
					<view class="table-header">
						<view>
							<text class="des m-r-50">排名</text>
							<text class="des">昵称</text>
						</view>
						<text class="des">线索数量</text>
					</view>
					<scroll-view scroll-y style="max-height: 800rpx;" v-if="list.length>0">
						<view style="margin-bottom: 200rpx;">
							<view class="rank-list flex-row flex-a-i-c flex-j-c-b" v-for="(person,index) in list" :key="index">
								<view class="flex-row flex-mc">
									<image src="../../static/images/first.png" style="width: 54rpx;height: 50.33rpx;" v-if="index === 0"></image>
									<image src="../../static/images/second.png" style="width: 54rpx;height: 50.33rpx;" v-else-if="index === 1"></image>
									<image src="../../static/images/third.png" style="width: 54rpx;height: 50.33rpx;" v-else-if="index === 2"></image>
									<view class="index" style="width: 54rpx;height: 50.33rpx;" v-else>{{index+1}}</view>
									<view class="profile-group">
										<view class="flex-row">
											<view class="profile-circle w m-l-20">
												<image :src="person.memberUser.avatar||defaultAvatar" @error="imageErrorPerson(index)" class="profile"></image>
											</view>
											<view class="profile-circle b">
												<image class="profile" :src="person.partner.avatar"></image>
											</view>
										</view>
									</view>
									<view class="flex-column w-200 m-l-40">
										<text class="userName">{{person.memberUser.nickname}}</text>
										<text class="des">已打卡{{person.spotCount}}个生态地</text>
									</view>
								</view>
								<view class="flex-row flex-a-i-c">
									<image src="../../static/images/Vector_green.png" class="debris"></image>
									<text class="number">{{person.pieceCount || 0}}</text>
								</view>
							</view>
						</view>

					</scroll-view>
				</view>
			</view>
		</view>
		<view class="rank-b" v-if="list.length>0">
			<view class="personalInfo flex-row flex-a-i-c flex-j-c-b">
				<view class="flex-row flex-mc">
					<text class="ranking">{{getNumber()}}</text>
					<view class="profile-circle m-l-20">
						<image :src="me.memberUser.avatar||defaultAvatar" @error="imageErrorMe" class="profile"></image>
					</view>
					<view class="flex-column m-l-30">
						<text class="userName">{{me.memberUser.nickname}}</text>
						<text class="des" v-if="getNumber()==1">恭喜！您是第1名</text>
						<text class="des" v-else-if="getNumber()<=20">距上1名还差{{list[getNumber()-2].pieceCount - me.pieceCount}}碎片</text>
						<text class="des" v-else-if="getNumber()=='20+'">距前20名还差{{list[list.length-1].pieceCount - me.pieceCount}}碎片</text>
					</view>
				</view>
				<view class="flex-row flex-a-i-c">
					<image src="../../static/images/Vector_blue.png" class="debris"></image>
						<text class="number">{{me.pieceCount}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getRankList } from "@/common/http/api/member.js"
	export default {
		data() {
			return {
				list: [],
				me: {},
				rule:"",
				defaultAvatar:'http://oss.cztv.com/ucc/20210120/f8d13c8caa4742e5b35578f80a2fd5e1.png'
			}
		},
		onLoad(e) {
			const routeId = e.routeId
			this.rule = JSON.parse(decodeURIComponent(e.rule))
			if (typeof routeId !== 'undefined') {
				this.getData(routeId)
			}
		},
		methods: {
			getData(routeId) {
				var params = {
					routeId: routeId
				}
				getRankList(params).then(res => {
					this.list = res.data.list;
					this.me = res.data.me
					console.log("排名情况",this.list)
				})
			},
			getNumber() {
				const index = this.list.findIndex(item => item.memberUser.id === this.me.memberUser.id);
				if (index==-1) {
					return '20+'
				}else {
					return index + 1
				}
			},
			imageErrorMe(){
				this.me.memberUser.avatar=this.defaultAvatar
			},
			imageErrorPerson(index){
				this.list[index].memberUser.avatar=this.defaultAvatar
			} 
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		min-height: 100vh;
		display: flex;
		position: fixed;
		top: 0;
		flex-direction: column;
		align-items: center;
		background: url(@/static/images/bg_choose.png) center/cover no-repeat fixed;
	}
	.rank-t {
		width: 727rpx;
		height: 360rpx;
	}
	.title {
		position: absolute;
		top: 0;
		left:50%;
		transform: translateX(-50%);
		width: 413rpx;
		height: 89rpx;
	}
	.subtitle {
		position: absolute;
		left: 51%;
		transform: translate(-50%, -50%);
		top: 50%;
		width: 510rpx;
		height: 210rpx;
		color: #3c8800;
		font-family: PingFang SC;
		font-size: 30rpx;
	}
	.rank-m {
		width: 683rpx;
		height: 61vh;
	}
	.table {
		position: absolute;
		left: 0;
		top: 0;
		.table-header {
			position: relative;
			width: 95vw;
			display: flex;
			justify-content: space-between;
			padding: 50rpx 50rpx 20rpx 50rpx;
		}
		.table-header::after {
		  content: "";
		  position: absolute;
		  bottom: 0;
		  left: -40%;
			transform: translateX(50%); /* 水平居中 */
		  width: 90%;
		  height: 1px;
		  background-color: #93C969;
		}
		.des {
			color: #76ae00;
			font-size: 24rpx;
			font-weight: 400;
		}
		.rank-list {
			padding: 30rpx 50rpx 20rpx 50rpx;
			font-family: PingFang SC;
			.index {
				color: #2a5f00;
				font-size: 32rpx;
				text-align: center;
				line-height: 50.33rpx;
			}
			.userName {
				color: #2a5f00;
				font-size: 30rpx;
				font-weight: 600;
			}
			.profile-group {
				position: relative;
			}
			.profile-circle {
				border-radius: 50%;
				box-shadow: 0 4rpx 2rpx 0 rgba(0, 0, 0, .3);
				&.w {
					width: 93rpx;
					height: 93rpx;
					border: 4rpx solid #FFF;
				}
				&.b {
					width: 54rpx;
					height: 54rpx;
					position: relative;
					position: absolute;
					border: 4rpx solid #6AF6FF;
					top: 50%;
					left: 50%;
					transform: translate(46%, 3%);
					z-index: 1;
				}
				.profile {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.debris {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
			.number {
				color: #51b800;
				font-size: 30rpx;
				width: 60rpx;
			}
		}
	}
	.rank-b {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 160rpx;
		flex-shrink: 0;
		border-radius: 50rpx 50rpx 0 0;
		background: linear-gradient(180deg, #67B6FF -28.4%, #045CC7 79.49%);
		box-shadow: 0 -9rpx 21rpx 0 #8a001f6f;
		.personalInfo {
			padding: 30rpx 50rpx;
			.ranking {
				font-size: 32rpx;
				color: #FFF;
			}
			.userName {
				color: #FFF;
				margin-bottom: 10rpx;
				font-size: 30rpx;
			}
			.des {
				color: #FFF;
				font-size: 24rpx;
				font-weight: 400;
			}
			.profile-circle {
				width: 93rpx;
				height: 93rpx;
				border-radius: 50%;
				padding: 2rpx;
				border: 2rpx solid #FFF;
				box-shadow: 0 4rpx 2rpx 0 rgba(0, 0, 0, .3);
				.profile {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.debris {
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
			.number {
				color: #99EDFF;
				font-size: 30rpx;
			}
		}
	}
	
</style>