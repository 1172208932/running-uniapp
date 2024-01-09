<template>
	<view class="debrispopup_content">
		<view class="debrisimage-content">
			<view class="p-relative box">
				<view class="flex-column flex-a-i-c flex-j-c-c">
					<image :src="flashImage" class="flashImage"></image>
					<text class="titleStyle">{{debrisInfos.piece.name}}</text>
					<view :style="[subTitleViewStyle]" v-show="debrisInfos.piece.tip">
						<text :style="subTitleStyle">{{debrisInfos.piece.tip}}</text>
					</view>
					<view class="p-relative">
						<image :src="lineBg" class="lineimage" @error="imageError"></image>
						<image :src="debrisInfos.piece.pic" :style="rewardImageStyle" @error="imageError"></image>
					</view>
					<view class="debris-list flex-column" v-show="listShow">
						<view class="line m-b-20"></view>
						<view class="flex-row flex-j-c-c flex-a-i-c">
							<view v-for="(item,index) in debrisListInfos" :key="index" class="m-r-30">
								<van-badge :content="item.existCount" color="#6A7A8D" v-if="item.existCount === 0">
									<image class="debris gray" :src="item.pic"></image>
								</van-badge>
								<van-badge :content="item.existCount" color="#FFB300" v-else>
									<image class="debris" :src="item.pic"></image>
								</van-badge>
							</view>
						</view>
						<view class="line m-t-20"></view>
					</view>
					<view v-if="btnImage == '../../static/images/btn_cqfl.png'">
						<image :src="btnImage" v-show="btnCloseShow" @click="btnOn()" style="width: 300rpx;height: 89rpx"></image>
					</view>
					<view v-else-if="btnImage == '../../static/images/btn_jxts.png'">
						<image :src="btnImage" v-show="btnCloseShow" @click="btnUp()" style="width: 300rpx;height: 89rpx"></image>
					</view>
					<view v-else>
						<image :src="btnImage" v-show="btnCloseShow" @click="btnOp()" style="width: 300rpx;height: 89rpx"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"debrisPopup",
		props:{
			debrisInfoData: {
				type: Object
			},
			debrisList: {
				type: Array
			},
			lineBg: {
				type: String
			},
			subTitleViewStyle: {
				type: Object,
				default: function(){
					return {
						'margin-top': '40rpx',
						'padding': '5rpx 20rpx',
						'border-radius': '22.5rpx',
						'background': 'linear-gradient(90deg, #0042A5 -4.43%, #0455b200 81.75%)',
						'background-position': '50% 50%'
					}
				}
			},
			subTitleStyle: {
				default: function(){
					return {
						'font-size': '30rpx',
						'color': '#FFF',
						'font-family': 'PingFang SC'
					}
				}
			},
			flashImage: {
				type: String
			},
			rewardImageStyle: {
				default: function(){
					return {
						'position': 'absolute',
						'top': '45%',
						'left': '50%',
						'transform': 'translate(-50%,-50%)',
						'width': '311rpx',
						'height': '300rpx',
					}
				}
			},
			btnImage: {
				type: String,
				default: function(){
					return '../../static/images/btn_wzdl.png'
				}
			},
			btnCloseShow: {
				type: Boolean,
				default: function(){
					return true;
				}
			},
			listShow: {
				type: Boolean,
				default: function(){
					return false
				}
			},
		},
		watch: {
			debrisInfoData: 'onDataChange',
			debrisList:'onListChange'
		},
		data() {
			return {
				debrisInfos: this.debrisInfoData,
				debrisListInfos: this.debrisList,
				// isFirstCompleted:false
			}
		},
		methods: {
			onDataChange: function(newData, oldData = []){
				this.debrisInfos = newData;
			},
			onListChange: function(newData, oldData = []){
				this.debrisListInfos = newData;
			},
			imageError: function(e) {
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
			},
			btnOp: function(){
				this.$emit("clickClose");
			},
			btnOn: function(){
				this.$emit("clickOn");
			},
			btnUp: function(){
				let isFirstCompleted=false;
				let isCompleted = this.debrisListInfos.every(item => item.existCount !== 0);
				console.log(this.debrisInfos);
				console.log(this.debrisListInfos)
				if(isCompleted&&this.debrisListInfos.some(item => item.existCount === 1)){
					this.debrisListInfos.forEach(x=>{
						if(x.existCount===1&&x.id==this.debrisInfos.id){
							isFirstCompleted=true
						}
					})
				}
				// if (!isFirstCompleted && isCompleted) {
					// isFirstCompleted = true;
					// uni.setStorageSync('isFirstCompleted', this.isFirstCompleted);
					// console.log('第一次完成',isFirstCompleted)
				// }else if (isFirstCompleted && isCompleted) {
					// isFirstCompleted = false;
					// console.log('不是第一次完成',isFirstCompleted)
				// }
				let data = {
					isFirstCompleted: isFirstCompleted,
					spotId: this.debrisInfos.spotId
				};
				this.$emit("clickUp",data);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.debrispopup_content {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		overflow: auto;
		background-color: rgb(0, 0, 0,0.9);
	}
	.debrisimage-content{
		height: 70%;
		width: 100%;
		top: 50%;
		transform: translate(0,-50%);
		position: relative;
	}
	.box {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.flashImage {
		position: absolute;
		top:0;
		left:50%;
		transform: translateX(-50%);
		width: 379rpx;
		height: 95rpx;
	}
	.lineimage {
		z-index: 0;
		width: 592rpx;
		height: 592rpx;
	}
	.titleStyle {
		display: flex;
		justify-content: center;
		font-size: 40rpx;
		font-weight: 600;
		color: #FFF;
		font-family: PingFang SC;
	}
	.debris-list {
		width: 100%;
		height: 200rpx;
		.line {
			width: 703rpx;
			height: 3rpx;
			background: linear-gradient(90deg, #ffe50000 9.26%, #BB8738 50.55%, #ffe50100 91.01%);
		}
		.debris {
			width: 128rpx;
			height: 128rpx;
		}
		.debris.gray {
		  filter: grayscale(100%);
		}
	}
	::v-deep
	.van-badge {
		min-width: 30.49rpx !important;
		color: #FFF !important;
		right: 20rpx !important;
		font-size: 20rpx !important;
		border: none !important;
	}
</style>