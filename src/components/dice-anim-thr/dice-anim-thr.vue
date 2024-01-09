<template>
	<view class="container">
		<lottie :options="defaultOptions" v-on:animCreated="createLottie"/>
	</view>
</template>

<script>
	import * as animationData from '@/static/lottie/dice3/data.json'
	// 获取静态资源 
	animationData.assets.forEach((item) => {
	  item.u = ''
	  if (item.w && item.h) {
	    item.p = require(`@/static/lottie/dice3/images/${item.p}`)
	  }
	});
	export default {
		data() {
			return {
				defaultOptions: {
					animationData:animationData.default,
					loop: false,
					autoplay: true,
				},
				anim : {}
			}
		},
		onLoad(e) {
			
		},
		mounted() {
			this.anim.addEventListener('complete', () => {
				setTimeout(() => {
					this.anim.destroy();
				}, 500);
			});
		},
		beforeDestroy() {
			this.anim.destroy()//销毁动画
		},
		methods: {
			//创建lottie实例
			createLottie(anim, index) {
				this.anim = anim;
			},
		}
	}
</script>

<style lang="scss" scoped>
	
</style>