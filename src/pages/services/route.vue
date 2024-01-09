<template>
	<view class="container" :style="{ 'background': 'url(' + data.pic + ') center/cover no-repeat fixed' }">
		<img :src="currentImage"  class="fullScreen" @click="handleNavigation" v-if="showImage">
		<ua-navbar :isShare="true" :isBack="false" :isClose="true"></ua-navbar>
		<view class="flex-row flex-j-c-b flex-a-i-c m-t-20 m-l-30 z-index-1">
			<image src="../../static/images/logo_route.png" class="logo"></image>
			<view class="flex-column">
				<image src="../../static/images/reward.png" mode="aspectFit" class="icon" @click="jump('rewardList')"></image>
				<image src="../../static/images/handbook.png" mode="aspectFit" class="icon" @click="jump('handbook')"></image>
			</view>
		</view>
		<view class="flex-row m-t-30 m-l-15 z-index-1" >
			<image src="../../static/images/btn_rule.png" mode="aspectFit" style="width: 77rpx;height: 77rpx" @click="showRulePop"></image>
		</view>
		<view class="riverBank">
			<riverBank-anim ref="riverBankAnim" @changeLoad="changeLoad"></riverBank-anim>
		</view>
		<view class="dice">
			<dice-anim-one v-if="step === 1" ref="dice1Anim"></dice-anim-one>
			<dice-anim-two v-if="step === 2" ref="dice2Anim"></dice-anim-two>
			<dice-anim-thr v-if="step === 3" ref="dice3Anim"></dice-anim-thr>
		</view>
		<view class="taskbar">
			<view class="operationTab">
				<view class="flex-row flex-j-c-b">
					<view class="feedback flex-row flex-mc" @click="jump('feedback')">
						<image src="../../static/images/icon_yjfk.png" class="feedback-icon"></image>
						<view class="feedback-text">意见反馈</view>
					</view>
					<image v-if="data.status === 1" src="../../static/images/icon_task.png" class="task_icon" @click="handleTaskshow"></image>
				</view>
			</view>
			<image src="../../static/images/taskbar.png" class="bg"></image>
			<image src="../../static/images/ship.png" class="ship"></image>
			<image src="../../static/images/line.png" class="line"></image>
			<view class="profile-group">
				<view class="flex-row">
					<view class="profile-circle w">
						<image :src="data.member.avatar||defaultAvatar" @error="imageErrorMe" class="profile"></image>
					</view>
					<view class="profile-circle b" @click="handleUpdate">
						<image :src="data.partnerList.filter(item => item.id === data.memberPartner.partnerId)[0].avatar" class="profile"></image>
						<image src="../../static/images/edit.png" class="edit"></image>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="content-inner">
					<view class="title">{{data.title}}</view>
					<view class="flex-row flex-j-c-b flex-a-i-e">
						<view class="desc">打卡所有地标抽跑男周边</view>
						<view class="progress flex-row flex-a-i-c">
							<image src="../../static/images/Vector.png" style="width: 40rpx;height: 40rpx;" class="m-l-20 m-r-10"></image>
							<text class="fw-5 m-r-10 fs-24" style="color: #FFF;">当前进度</text>
							<view class="cust-progress">
								<van-progress
									stroke-width="16"
								  :percentage="percent"
									:show-pivot="false"
									color="linear-gradient(to right, #FFEA00, #FFB800)"
									track-color="#A5D58C"
								/>
							</view>
						</view>
					</view>
					<view class="flex-row m-t-20">
						<scroll-view scroll-x>
							<view class="flex-row">
								<view v-for="item in data.spotsList" :key="item.id" class="m-r-30">
									<van-badge :content="getContent(item.id)" :color="getContent(item.id) == '4/4'?'#FFEA00':'#247BE8'">
										<view class="choose-box" :style="{ backgroundColor: getContent(item.id) == '4/4' ? '#FFE501' : '#F1F8EC' }">
											<image :class="{'profile-d': getContent(item.id) == '4/4', 'profile': getContent(item.id) !== '4/4' }" :src="item.pic"></image>
											<text class="name">{{item.name}}</text>
										</view>
									</van-badge>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="flex-row flex-j-c-a flex-a-i-e m-t-30">
						<view class="flex-column flex-a-i-c" @click="jump('routeList')">
							<image src="../../static/images/route_icon.png" class="b-icon"></image>
							<image src="../../static/images/route.png" class="t-icon m-t-5"></image>
						</view>
						<!-- <view class="flex-column flex-a-i-c" @click="jump('handbook')">
							<image src="../../static/images/handbook_icon.png" class="b-icon"></image>
							<image src="../../static/images/handbook_route.png" class="t-icon m-t-5"></image>
						</view> -->
						<view class="btn-group" v-if="data.status === 2">
							<image src="../../static/images/btn_bqhdyjs.png" style="width: 350rpx;height: 91rpx;"></image>
						</view>
						<view class="btn-group" v-else-if="data.status === 3">
							<image src="../../static/images/btn_bqhdwks.png" style="width: 350rpx;height: 91rpx;"></image>
						</view>
						<view class="btn-group" @click="handleLookfor" v-else-if="data.memberRoute.status === 0 || data.memberRoute.status === 2 ">
							<view v-if="!loading">
								<image src="../../static/images/btn.png" style="width: 350rpx;height: 105rpx;"></image>
								<image src="../../static/images/btnText_route.png" class="btnText"></image>
								<image src="../../static/images/Arrow.png" class="arrow"></image>
								<view class="count">剩余寻找次数:<text :style="'color:' + (data.member.times === 0 ? 'red' : '#87BDFF')">{{data.member.times}}</text></view>
							</view>
							<view v-else>
								<image src="../../static/images/btn.png" style="width: 340rpx;height: 105rpx;"></image>
								<text class="loadText">寻找中...</text>
							</view>
						</view>
						<view class="btn-group" @click="handleUnlock" v-else-if="data.memberRoute.status === 1">
							<image src="../../static/images/btn_cpnzb.png" style="width: 350rpx;height: 91rpx;"></image>
						</view>
						<view class="flex-column flex-a-i-c" @click="jump('rank')">
							<image src="../../static/images/rank_icon.png" class="b-icon"></image>
							<image src="../../static/images/rank.png" class="r-icon m-t-5"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<xsb-debrisPopup 
			v-if="showPopup && prizeInfoData"
			@clickClose="closePopup" 
			:debrisInfoData="debrisInfoData"
			:lineBg="lineBg"
			:rewardImageStyle="rewardImageStyle"
			:btnImage="btnImage"
			:flashImage="flashImage"
			@clickOn="handleDrawgift"
			:listShow="listShow"
			:debrisList="debrisList"
			@clickUp="handlePieceCompleted"
		>
		</xsb-debrisPopup>
		
		<xsb-prizePopup 
			v-if="showPrizePopup && prizeInfoData" 
			@clickClose="closePrizePopup"
			:prizeInfoData="prizeInfoData"
			@clickDk="clickDk"
			:imageShow="imageShow"
			:videoShow="videoShow"
		>
		</xsb-prizePopup>
		
		<choose-popup
			@refresh="refreshPartnerList"
			@clickQrxg="clickQrxg"
			ref="choosePop"
		>
		</choose-popup>
		
		<taskPopup ref="taskPop"></taskPopup>
		
		<rule-popup ref="rulePop"></rule-popup>
		
		<help-popup ref="helpPop" 
			v-if="showHelpPopup && parentMember"
			@clickOp="handleNewuser"
			:parentMember="parentMember"
			:firstShow="firstShow"
			:secondShow="secondShow"
			@clickClose="closeHelpPopup"
			@handleNotify="handleNotify"
		>
		</help-popup>
		
		<index-popup ref="indexPop"></index-popup>
		
	</view>
</template>

<script>
	import riverBankAnim from "@/components/riverBank-anim/riverBank-anim"
	import diceAnimOne from "@/components/dice-anim-one/dice-anim-one.vue"
	import diceAnimTwo from "@/components/dice-anim-two/dice-anim-two.vue"
	import diceAnimThr from "@/components/dice-anim-thr/dice-anim-thr.vue"
	import taskPopup from "@/pages/services/task.vue"
	import { rollReward, activeReward, updatePartner, drawGift, listPieceBySpot, pieceCompleted, getNotify, getParentMember } from "@/common/http/api/member.js"
	import { getRoute } from "@/common/http/api/route.js"
	import { unreadInviteList, inviteRead} from "@/common/http/api/route.js"
	import { Toast } from 'vant'
	export default {
		components: {riverBankAnim, diceAnimOne, diceAnimTwo, diceAnimThr, taskPopup},
		data() {
			return {
				data: {},
				step: undefined,
				loading: false,
				isFirstRoll: true,
				startFrames: 0,
				endFrames: 0,
				showPrizePopup: false,
				prizeInfoData: {},
				imageShow: false,
				videoShow: false,
				debrisInfoData: {},
				showPopup: false,
				lineBg: '',
				rewardImageStyle: {},
				btnImage:'',
				listShow: false,
				debrisList: [],
				parentMember: undefined,
				showHelpPopup: false,
				firstShow: false,
				secondShow: false,
				defaultAvatar:'http://oss.cztv.com/ucc/20210120/f8d13c8caa4742e5b35578f80a2fd5e1.png',
				images: [
					"navigation_01.png",
					"navigation_02.png",
					"navigation_03.png"
				],
				currentIndex: 0,
				showImage: false
			}
		},
		onLoad(e) {
			let data = decodeURIComponent(e.data)
			if(typeof data !== 'undefined') {
				this.data = JSON.parse(data)
				console.log('route里的data:', this.data)
			}
			this.query=getApp().globalData.query
			if(this.query&&this.query.pid){
			  getParentMember({pid:this.query.pid}).then(res=>{
			    this.parentMember=res.data
					this.firstShow = true
					this.$nextTick(() => {
						this.showHelpPopup = true;
					})
			  })
			}
		},
		onShow(){
			uni.$on('refreshTimes', data => {
				getRoute({id: this.data.id}).then(response => {
					this.data = response.data
					console.log('任务弹窗关闭时更新time')
				})
			})
		},
		computed: {
			percent() {
				return this.data.memberPieceList.length / (this.data.spotsList.length * 4) * 100
			},
			currentImage() {
				return require(`@/static/images/${this.images[this.currentIndex]}`);
			}
		},
		mounted() {
			var firstLogin = uni.getStorageSync('firstLogin');
			if (firstLogin !== '1') {
				this.showImage = true
			}
		},
		methods: {
			handleNavigation() {
				if (this.currentIndex === this.images.length - 1) {
					this.showImage = false;  // 点击到最后一张图片时，关闭显示
					this.$refs.indexPop.show()
				} else {
					this.currentIndex++;
				}
			},
			getUnreadInviteList(){
				unreadInviteList().then(res=>{
					//未读邀请成功消息
					
				})
			},
			handleLookfor() {
				if(this.loading) {
					return Toast('太快啦，请勿频繁操作～');
				}
				if(this.data.member.times === 0) {
					return this.$refs.taskPop.showPopup({routeId: this.data.id,memberId:this.data.member.id}) //探索次数为0时出现任务弹窗
				}
				const totalFrames = 40 // 动画的总帧数
				const moveFrames = 10 // 抛一点移动的帧数
				const playAnimation = () => {
					this.loading = true
					this.isPoint = 0
					this.step = Math.floor(Math.random() * 3) + 1
					if (this.isFirstRoll) {
						this.endFrames = moveFrames * this.step
						console.log('第一次roll')
					}else {
						if (this.endFrames < totalFrames) {
							// 如果结束帧数小于总帧数，继续播放动画
							this.startFrames = this.endFrames;
							this.endFrames = moveFrames * this.step + this.startFrames // 计算结束帧数
							console.log('结束帧数小于总帧数')
							if (this.endFrames > totalFrames) {
								console.log('加完之后超出动画总帧数')
							  this.endFrames = totalFrames
							}
						}else {
							this.startFrames = 0; // 重置起始帧数为 0
							this.endFrames = moveFrames * this.step
							console.log('结束帧数大于总帧数，重置起始值')
						}
					}
					if (this.endFrames === totalFrames) {
						this.isPoint = 1 //到达打卡点
					}
					console.log('步数', this.step);
					console.log('起始帧数', this.startFrames);
					console.log('结束帧数', this.endFrames);
					console.log('是否到达打卡点（0否/1是）', this.isPoint);
					if (this.isFirstRoll) {
						this.isFirstRoll = false;
					}
					setTimeout(() => {
						console.log('延迟1.5s河岸动画启动')
						if (this.$refs.riverBankAnim) {
							this.$refs.riverBankAnim.playSegmentsLottie([this.startFrames,this.endFrames],true)
							this.step = undefined
						}
					}, 1500)
					const params = {
						routeId: this.data.id,
						isPoint: this.isPoint,
						step:this.step,
						memberId:this.data.member.id
					}
					rollReward(params).then(response => {
						if (response.data) {
							this.reward = response.data
						}
					})
				}
				playAnimation()
			},
			handleUnlock() {
				this.flashImage = '../../static/images/flash_b.png'
				this.lineBg = '../../static/images/bg_line_b.png'
				this.btnImage = '../../static/images/btn_cqfl.png'
				this.debrisInfoData ={
					'piece': {
						'name': `成功解锁${this.data.title}路线`,
						'pic': '../../static/images/b_present.png',
						'tip': '抽取你的专属福利吧'
					}
				}
				this.rewardImageStyle = {
					'position': 'absolute',
					'top': '45%',
					'left': '47%',
					'transform': 'translate(-50%,-50%)',
					'width': '325.17rpx',
					'height': '347rpx',
				}
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPopup = true;
					}, 100);
				})
			},
			handleDrawgift() {
				this.showPopup = false;
				const params = {
					routeId: this.data.id,
					memberId:this.data.member.id
				}
				drawGift(params).then(res => {
					console.log('抽取大奖')
					if (res.data.gift) {
						this.flashImage = '../../static/images/flash_b.png'
						this.lineBg = '../../static/images/bg_line_b.png'
						this.rewardImageStyle = {
							'width': '215.31rpx',
							'height': '279.58rpx',
							'position': 'absolute',
							'top': '50%',
							'left': '50%',
							'transform': 'translate(-50%,-50%)',
						}
						this.debrisInfoData = {
							'piece': res.data.gift
						}
						this.btnImage = '../../static/images/btn_wzdl.png'
						this.$nextTick(() => {
							this.showPopup = true;
						})
					}else {
						Toast('很遗憾！大奖与您擦肩而过')
					}
				})
			},
			changeLoad() {
				this.loading = false
				if (this.reward.type === 1) { //1碎片
					if(this.reward.prize.piece.type === 1) { //图文
						this.imageShow = true
						this.videoShow = false
						this.prizeInfoData = this.reward
						this.$nextTick(() => {
							setTimeout(() => {
								this.showPrizePopup = true;
							}, 500);
						})
					}else if (this.reward.prize.piece.type === 2) { //视频
						this.imageShow = false
						this.videoShow = true
						this.prizeInfoData = this.reward
						this.$nextTick(() => {
							setTimeout(() => {
								this.showPrizePopup = true;
							}, 500);
						})
					}else if (this.reward.prize.piece.type === 3) { //任务

						
					}else if (this.reward.prize.piece.type === 4) { //碎片奖励
						listPieceBySpot({ spotId: this.reward.spotId}).then(res => {
							console.log('用户地标碎片搜集情况')
							this.debrisList = res.data
						})
						this.listShow = true
						this.flashImage = '../../static/images/flash_b.png'
						this.lineBg = '../../static/images/bg_line_b.png'
						this.rewardImageStyle = {
							'width': '300rpx',
							'height': '300rpx',
							'position': 'absolute',
							'top': '50%',
							'left': '50%',
							'transform': 'translate(-50%,-50%)',
						}
						this.debrisInfoData = this.reward.prize
						this.btnImage = '../../static/images/btn_jxts.png'
						this.$nextTick(() => {
							setTimeout(() => {
								this.showPopup = true;
							}, 500);
						})
					}
				}else if(this.reward.type === 2) { //2 道具
					this.listShow = false
					this.flashImage = '../../static/images/flash_b.png'
					this.lineBg = '../../static/images/bg_line_b.png'
					this.debrisInfoData ={
						'piece': {
							'name': '恭喜获得',
							'tip': '额外一次探索机会',
							'pic': '../../static/images/b_map.png'
						}
					}
					this.rewardImageStyle = {
						'position': 'absolute',
						'top': '45%',
						'left': '50%',
						'transform': 'translate(-50%,-50%)',
						'width': '366rpx',
						'height': '270rpx',
					}
					this.btnImage = '../../static/images/btn_wzdl.png'
					this.$nextTick(() => {
						setTimeout(() => {
							this.showPopup = true;
						}, 500);
					})
				}else if (this.reward.type === null) { // 空
					this.listShow = false
					this.flashImage = '../../static/images/flash_w.png'
					this.lineBg = '../../static/images/bg_line_w.png'
					this.debrisInfoData ={
						'piece': {
							'name': '本次打卡未获得任何线索',
							'pic': '../../static/images/b_box.png'
						}
					}
					this.rewardImageStyle = {
						'position': 'absolute',
						'top': '50%',
						'left': '50%',
						'transform': 'translate(-50%,-50%)',
						'width': '311rpx',
						'height': '300rpx',
					}
					this.btnImage = '../../static/images/btn_wzdl.png'
					this.$nextTick(() => {
						setTimeout(() => {
							this.showPopup = true;
						}, 500);
					})
				}
			},
			jump(target){
				if (target === 'rank' || target === 'handbook' || target === 'rewardList') {
					uni.navigateTo({
						url: `/pages/services/${target}?routeId=`+ this.data.id+'&rule='+encodeURIComponent(JSON.stringify(this.data.rankRule)),
					})
				}else if (target === 'feedback'){
					window.location.href = 'https://forms.ebdan.net/ls/t9l58DKL?bt=yxy&eip=true'
				}else {
					uni.navigateTo({
						url: `/pages/services/${target}`
					})
				}
			},
			refreshData() {
				getRoute({id: this.data.id}).then(response => {
					this.data = response.data
					console.log('更新data')
				})
			},
			handleTaskshow() {
				this.$refs.taskPop.showPopup({routeId: this.data.id,memberId:this.data.member.id})
			},
			closePopup(){
				this.showPopup = false
				this.listShow = false
				this.reward = {}
				this.refreshData()
			},
			closePrizePopup() {
				this.showPrizePopup = false
				this.imageShow = false
				this.videoShow = false
				this.reward = {}
				this.refreshData()
			},
			closeHelpPopup() {
				this.showHelpPopup = false
				this.firstShow = false
				this.secondShow = false
			},
			handleNotify() {
				let globalData=getApp().globalData
				let userInfo=globalData.userInfo
				let userId=globalData.userId
				let query=globalData.query
				if (userInfo.pidNotify != 1 ) {
					this.showHelpPopup = false;
					let params={
						pid:query.pid,
						memberId:userId,
						createTime:query.createTime
					}
					getNotify(params).then(res => {
						this.firstShow = false
						this.secondShow = true
						this.$nextTick(() => {
							setTimeout(() => {
								this.showHelpPopup = true;
							}, 100);
						})
					})
				}else if(userInfo.pid && userInfo.pidNotify == 1){
					this.showHelpPopup = false;
					Toast('您已为其他好友助力');
				}else if(userId == query.pid) {
					this.showHelpPopup = false;
					Toast('自己不能给自己助力');
				}else {
					this.showHelpPopup = false;
					Toast('仅Z视介新用户可助力好友');
				}
			},
			clickDk(params) {
				activeReward(params).then(response => {
					this.showPrizePopup = false;
				}).finally(e => {
					listPieceBySpot({ spotId: this.reward.spotId}).then(res => {
						console.log('用户地标碎片搜集情况')
						this.debrisList = res.data
					})
					this.listShow = true
					this.flashImage = '../../static/images/flash_b.png'
					this.lineBg = '../../static/images/bg_line_b.png'
					this.rewardImageStyle = {
						'width': '300rpx',
						'height': '300rpx',
						'position': 'absolute',
						'top': '50%',
						'left': '50%',
						'transform': 'translate(-50%,-50%)',
					}
					this.debrisInfoData = this.reward.prize
					this.btnImage = '../../static/images/btn_jxts.png'
					this.$nextTick(() => {
						setTimeout(() => {
							this.showPopup = true;
						}, 100);
					})
				})
			},
			handleUpdate() {
				this.$refs.choosePop.show({data:this.data.partnerList})
			},
			clickQrxg(id) {
				let params = {
					partnerId:id,
					id: this.data.memberPartner.id
				}
				updatePartner(params).then(response => {
					if (response.data) {
						Toast.success('更改成功');
					}
				}).finally(e => {
					this.refreshData()
				})
			},
			getContent(id) {
				 return this.data.memberPieceList.filter(item => item.spotId === id).length + '/4'
			},
			handlePieceCompleted(data) {
				this.closePopup()
				let isFirstCompleted = data.isFirstCompleted;
				let params = {
					spotId: data.spotId
				}
				if (isFirstCompleted) {
					pieceCompleted(params).then(res => {
						const SpotName = res.data.spot.name
						const SpotPic = res.data.spot.pic
						console.log('四张都第一次完成')
						this.listShow = true
						this.flashImage = '../../static/images/flash_b.png'
						this.lineBg = '../../static/images/bg_line_b.png'
						this.rewardImageStyle = {
							'width': '667rpx',
							'height': '500rpx',
							'border-radius': '50rpx',
							'border': '4rpx solid #FCFF67',
							'position': 'absolute',
							'top': '50%',
							'left': '50%',
							'transform': 'translate(-50%,-50%)'
						}
						this.debrisInfoData = {
							'piece' : {
								'name' : '恭喜成功获得',
								'tip': `${SpotName} 所有碎片`,
								'pic': SpotPic
							}
						}
						this.btnImage = '../../static/images/btn_wcdk.png'
						this.$nextTick(() => {
							setTimeout(() => {
								this.showPopup = true;
							}, 100);
						})
					})
				}
			},
			showRulePop() {
				if(this.data&&this.data.rule){
					this.$refs.rulePop.show(this.data.rule)
				}else{
					return Toast('本游戏暂无规则');
				}
			},
			imageErrorMe(){
				this.data.member.avatar=this.defaultAvatar
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		min-height: 70vh;
		display: flex;
		flex-direction: column;
	}
	.fullScreen {
		width: 100%;
		position: fixed;
		bottom:0;
		z-index: 4 !important;
	}
	.logo {
		width: 190rpx;
		height: 90rpx;
	}
	.icon {
		width: 120rpx;
		height: 72rpx;
	}
	.riverBank {
		position: fixed;
		top: 15%;
		left: 0;
		transform: translateY(-50%);
		width: 100%;
		height: 570.76rpx;
	}
	.dice {
		position: fixed;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 750rpx;
		height: 570.76rpx;
	}
	.taskbar {
		position: relative;
		position: fixed;
		bottom: -10rpx;
		.bg {
			height: 560rpx;
			width: 100vw;
		}
		.operationTab {
			width: 100%;
			position: absolute;
			top: -10%;
			left: 0;
			.task_icon {
				width: 137rpx;
				height: 71rpx;
			}
			.feedback {
				width: 153.13rpx;
				height: 54rpx;
				border-radius: 0 30rpx 30rpx 0;
				background-color: rgba(255, 255, 255, 0.4);
				.feedback-icon {
					width: 22.58rpx;
					height: 24.33rpx;
				}
				.feedback-text {
					margin-left: 10rpx;
					color: #FFF;
					font-size: 20rpx;
					font-weight: 600;
				}
			}
		}
		.ship {
			position: absolute;
			bottom: 50%;
			left: 53%;
			transform: translate(-50%,-50%);
			width: 161.71rpx;
			height: 228rpx;
			z-index: -1;
		}
		.line {
			position: absolute;
			top: -10%;
			left: 50%;
			transform: translate(20%,0);
			width: 74rpx;
			height: 64.25rpx;
		}
		.profile-group {
			position: relative;
			position: absolute;
			top: -18%;
			left: 50%;
			transform: translate(0,-50%);
			.profile-circle {
				width: 67.17rpx;
				height: 67.17rpx;
				border-radius: 50%;
				box-shadow: 0 2.89rpx 1.44rpx 0 #00000033;
				&.w {
					z-index: 1;
					border: 4rpx solid #FFF;
				}
				&.b {
					position: relative;
					position: absolute;
					border: 4rpx solid #6AF6FF;
					top: 0;
					left: 50%;
					transform: translate(20%, 0);
				}
				.profile {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
				.edit {
					position: absolute;
					right: 0;
					bottom: 0;
					width: 20rpx;
					height: 20rpx;
				}
			}
		}
		.content {
			width: 100vw;
			height: 599rpx;
			position: absolute;
			top: 0;
			left: 0;
			.content-inner {
				padding: 30rpx;
				.title {
					margin-left: 50rpx;
					color: #5da600;
					font-family: PingFang SC;
					font-size: 36rpx;
					font-weight: 500;
				}
				.desc {
					color: #00bf2a;
					font-family: PingFang SC;
					font-size: 24rpx;
					font-weight: 500;
				}
				.b-icon {
					width: 77rpx;
					height: 77rpx;
				}
				.t-icon {
					width: 50rpx;
					height: 20rpx;
				}
				.r-icon {
					width: 80rpx;
					height: 20rpx;
				}
				.progress {
					width: 341rpx;
					height: 60rpx;
					flex-shrink: 0;
					border-radius: 35.5rpx;
					border: 2rpx solid #FFF;
					background: #76D942;
					box-shadow: 0 2rpx 6rpx 0 #62AC3A;
					.cust-progress {
						width: 140rpx;
						height: 30rpx;
						border-radius: 30rpx;
						border: 1px solid #FFF;
						overflow: hidden;
					}
				}
				.btn-group {
					position: relative;
					width: 350rpx;
					height: 100rpx;
					.btnText {
						position: absolute;
						left: 30%;
						top: 30%;
						transform: translateY(-50%);
						width: 133rpx;
						height: 25rpx;
					}
					.count {
						position: absolute;
						left: 30%;
						top: 65%;
						transform: translateY(-50%);
						font-size: 20rpx;
						color: #87BDFF;
					}
					.loadText {
						position: absolute;
						font-style: italic;
						font-weight: 600;
						left: 50%;
						top: 40%;
						transform: translate(-50%,-50%);
						font-size: 32rpx;
						color: #ffffff;
					}
					.arrow {
						position: absolute;
						right: 12%;
						top: 45%;
						transform: translateY(-50%);
						width: 27rpx;
						height: 23rpx;
					}
				}
			}
			.choose-box {
				position: relative;
				width: 180rpx;
				height: 215rpx;
				border-radius: 20rpx;
				box-shadow: 0 6rpx 8rpx 0 rgba(0,0,0,.4);
				overflow: hidden; /* 隐藏超出部分 */
				.profile {
					position: absolute;
					width: 180rpx;
					height: 160rpx;
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
				  background-image: url("../../static/images/frame_b_route.png");
				  background-size: cover;
				  background-position: center;
				  z-index: 1;
				}
				.profile-d {
					width: 180rpx;
					height: 160rpx;
				}
				.profile-d::after {
				  content: "";
				  position: absolute;
				  top: 0;
				  left: 0;
				  width: 100%;
				  height: 100%;
				  background-image: url("../../static/images/frame_b_route.png");
				  background-size: cover;
				  background-position: center;
				  z-index: 1;
				}
				.name {
					 width: 180rpx;
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
		}
	}
	::v-deep
	.van-badge {
	  min-width: 72rpx;
		border: 4rpx solid #FFF;
		top: 12px;
		right: 20px;
		color: #000000;
		z-index: 3;
	}
</style>