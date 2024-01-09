<template>
	<view class="prizaepopup_content">
		<image class="prizaeimage" :src="prizaeBg" @error="imageError"></image>
		<view class="prizaeimage-content">
			<view :style="titleStyle">
				{{prizeInfos.prize.piece.name}}
			</view>
			<view :style="[imageViewStyle]">
				<image :style="[imageStyle]" :src="prizeInfos.prize.piece.img" v-show="imageShow"></image>
				<video :style="[imageStyle]" 
					:src="prizeInfos.prize.piece.video" 
					v-show="videoShow"
					:poster="prizeInfos.prize.piece.img"
				>
				</video>
				<!-- <image src="../../static/images/btn_play.png" class="play_icon"	v-show="videoShow" @click="watchVideo(prizeInfos.prize.piece.video)"></image> -->
			</view>
			<scroll-view scroll-y style="max-height: 240rpx;">
				<view :style="[prizeDesViewStyle]">
					<text :style="[prizeDesStyle]">{{prizeInfos.prize.piece.content}}</text>
				</view>
			</scroll-view>
			<view :style="[btnViewStyle]">
				<image :src="btnImage" v-show="btnCloseShow" @click="btnOp()" style="width: 300rpx;height: 89rpx"></image>
				<image src="../../static/images/close.png" v-show="btnCloseShow" @click="btnCloseOp()" style="width: 57rpx;height: 57rpx" class="m-t-60"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"prizePopup",
		props:{
			prizaeBg: {
				type: String,
				default: '../../static/images/pop_s.png',
			},
			prizeInfoData: {
				type: Object,
				required: true
			},
			btnImage: {
				type: String,
				default: function(){
					return '../../static/images/btn_sjxs.png'
				}
			},
			btnCloseShow: {
				type: Boolean,
				default: function(){
					return true;
				}
			},
			imageShow: {
				type: Boolean,
				default: function(){
					return false;
				}
			},
			videoShow: {
				type: Boolean,
				default: function(){
					return false;
				}
			},
			btnShow: {
				type: Boolean,
				default: function(){
					return true;
				}
			},
			titleStyle: {
				type: Object,
				default: function(){
					return {
						'margin-left': '90rpx',
						'display': 'flex',
						'font-size': '40rpx',
						'font-weight': '600',
						'color': '#009A0F',
						'font-family': 'PingFang SC',
					}
				}
			},
			imageStyle: {  
				type: Object,
				default: function(){
					return {
						'width': '568rpx',
						'height': '393rpx',
						'border-radius': '50rpx',
						'border': '8rpx solid #FCFF67'
					}
				}
			},
			imageViewStyle: {
				type: Object,
				default: function(){
					return {
						'height': '393rpx',
						'display': 'flex',
						'align-items': 'center',
						'justify-content': 'center',
						'margin-top': '20rpx',
						'margin-right': '20rpx',
						'position': 'relative'
					}
				}
			},
			prizeDesStyle: {
				default: function(){
					return {
						'font-size': '24rpx',
						'padding-top': '10rpx',
						'color': '#3C8800',
					}
				}
			},
			prizeDesViewStyle: {
				type: Object,
				default: function(){
					return {
						'display': 'flex',
						'align-items': 'center',
						'justify-content': 'center',
						'padding': '20rpx 100rpx',
						// 'height': '240rpx',
					}
				}
			},
			btnViewStyle: {
				type: Object,
				default: function(){
					return {
						'height': '350rpx',
						'display': 'flex',
						'flex-direction': 'column',
						'align-items': 'center',
						'justify-content': 'center',
					}
				}
			}
		},
		created() {
			// console.log(JSON.stringify(this.prizeInfos))
		},
		watch: {
			prizeInfoData: 'onDataChange'
		},
		data() {
			return {
				prizeInfos: this.prizeInfoData,
			};
		},
		methods: {
			onDataChange: function(newData, oldData = []){
				// console.log(JSON.stringify(newData))
				this.prizeInfos = newData;
				// console.log(JSON.stringify(this.prizeInfos))
			},
			imageError: function(e) {
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
			},
			btnCloseOp: function(){
				this.$emit("clickClose");
			},
			btnOp: function(){
				this.$emit("clickDk",{"id": this.prizeInfos.id});
			},
			watchVideo: function(video){
				console.log('点击播放键')
				window.location.href = video
			},
		}
	}
</script>

<style>
	.prizaeimage {
	  position: absolute;
	  left: 0;
	  top: 15%;
	  display: block;
		width: 100%;
		height: 871.51rpx;
	  z-index: 0;
	}
	.prizaeimage-content{
		/* text-align: center; */
		height: 70%;
		width: 100%;
		top: 22%;
		position: relative;
	}
	.play_icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 96.33rpx;
		height: 96.33rpx;
		/* z-index: 999 !important; */
	}
	.prizaepopup_overlay {
		position: fixed;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100%;
		background-color: black;
		z-index: 1001;
		-moz-opacity: 0.8;
		opacity: .80;
		/* filter: alpha(opacity=88); */
	}
	
	.prizaepopup_content {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		overflow: auto;
		background-color: rgb(0, 0, 0,0.85);
	}
	
	.prizaepopup_title {
		width: 16px;
		height: 16px;
		text-align: center;
		font-size: 13px;
		color: #7c7c7c;
		border: 1px solid;
		border-radius: 100%;
		float: right;
		/* padding-top: 2px; */
	}
		 
	.prizaepopup_textarea_item {
		/* padding-top: 5rpx; */
		height: 100%;
		width: 100%;
		background-color: #ffffff;
		margin-top: 20rpx;
		/* margin-left: 20rpx; */
		padding-top: 20px;
	}
		 
	.prizaepopup_textarea {
		width: 410rpx;
		font-size: 26rpx;
		margin-left: 20rpx;
	}
		 
	.prizaepopup_button {
		color: #000000;
	}
</style>