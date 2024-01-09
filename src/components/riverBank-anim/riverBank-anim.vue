<template>
	<view class="container">
		<lottie :options="defaultOptions" v-on:animCreated="createLottie"/>
	</view>
</template>

<script>
	import * as animationData from '@/static/lottie/riverBank/data.json'
	// 获取静态资源 
	animationData.assets.forEach((item) => {
	  item.u = ''
	  if (item.w && item.h) {
	    item.p = require(`@/static/lottie/riverBank/images/${item.p}`)
	  }
	});
	export default {
		data() {
			return {
				defaultOptions: { 
					animationData:animationData.default,
					loop: false,
					autoplay: false
				},
				anim : {}
			}
		},
		onLoad(e) {
		},

		onShow() {
			
		},
		mounted() {
			this.anim.addEventListener('complete', () => {
				this.$emit('changeLoad',false)
			});
		},
		methods: {
			//创建lottie实例
			createLottie(anim, index) {
				this.anim = anim;
			},
			//销毁动画
			destroyLottie() {
				this.anim.destroy()
			},
			//动画播放片段
			playSegmentsLottie(arr,forceFlag) {
				//播放片段，arr可以包含两个数字或者两个数字组成的数组
				//forceFlag表示是否立即强制播放该片段，如果是false则需等前一个动画结束后开始播放，如果是true，则立即开始播放
				this.anim.playSegments(arr,forceFlag)
			},
		}
	}
</script>

<style lang="scss" scoped>
	
</style>