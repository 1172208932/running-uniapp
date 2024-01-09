<template>
	<view class="container">
		<ua-navbar></ua-navbar>
		<view class="flex-row flex-a-i-c content-t h-156 m-t-20" v-if="item && item.gift">
			<image :src="item.gift.pic" class="image"></image>
			<text class="fs-36 m-l-30">{{item.gift.name}}</text>
		</view>
		<view class="content-t m-t-30" v-if="item.type == 2">
			<van-form @submit="onEntitySubmit" ref="entityForm">
			  <van-field
			    v-model="entityForm.contacts"
			    name="收件人姓名"
			    label="收件人姓名"
			    placeholder="请填写真实姓名"
			    :rules="[{ required: true, message: '请填写收件人姓名' }]"
			  />
			  <van-field
			    v-model="entityForm.contactPhone"
			    name="手机号码"
			    label="手机号码"
			    placeholder="11位手机号"
			    :rules="[
						{ required: true, message: '请填写手机号码' },
						{ validator, message: '请填写正确的手机号码' }
					]"
			  />
				<van-field
				  readonly
				  clickable
				  name="area"
				  :value="area"
				  label="地区"
				  placeholder="点击选择省市区"
				  @click="showArea = true"
				/>
				<van-field
				  v-model="detail"
				  name="收货地址"
				  label="收货地址"
					placeholder="街道门牌信息（仅限浙江省内收获地址）"
				  :rules="[{ required: true, message: '请填写详细地址' }]"
				/>
				<van-field
				  v-model="entityForm.contactZip"
				  name="邮政编码"
				  label="邮政编码"
					placeholder="邮政编码"
				  :rules="[{ required: true, message: '请填写邮政编码' }]"
				/>
			  <view class="flex-row flex-mc m-t-80">
			    <view class="s-btn flex-row flex-mc" @click="submit('entityForm')" v-if="item.status === 0">
						<text class="submitText">提交</text>
					</view>
					<view class="a-btn flex-row flex-mc" v-if="item.status === 1">
						<text class="submitText">已提交</text>
					</view>
			  </view>
				<view class="flex-row flex-mc m-t-80">
					<text class="cancelText" @click="handleCancel">取消</text>
				</view>
			</van-form>
		</view>
		<view v-if="item.type == 1">
			<view class="content-t m-t-30">
				<van-form @submit="onUnrealSubmit" ref="unrealForm">
				  <van-field
				    v-model="unrealForm.contacts"
				    name="姓名"
				    label="姓名"
				    placeholder="请填写真实姓名"
				    :rules="[{ required: true, message: '请填写姓名' }]"
				  />
				  <van-field
				    v-model="unrealForm.contactPhone"
				    name="手机号码"
				    label="手机号码"
				    placeholder="11位手机号"
				    :rules="[
							{ required: true, message: '请填写手机号码' },
							{ validator, message: '请填写正确的手机号码' }
						]"
				  />
					<van-field
					  v-model="unrealForm.account"
					  name="支付宝账号"
					  label="支付宝账号"
					  :rules="[{ required: true, message: '请填写支付宝账号' }]"
					/>
				  <view class="flex-row flex-mc m-t-80">
				    <view class="s-btn flex-row flex-mc" @click="submit('unrealForm')" v-if="item.status === 0">
							<text class="submitText">提交</text>
						</view>
						<view class="a-btn flex-row flex-mc" v-if="item.status === 1">
							<text class="submitText">已提交</text>
						</view>
				  </view>
				</van-form>
			</view>
			<view class="content-t m-t-30">
				<text class="fs-24 fw-3">
					1.用户抽中虚拟奖品（Z视介会员卡），请到奖品页面填写及授权信息（Z视介昵称）、手机号码（真实）、Z视介用户ID（UID）等信息并提交用于领奖，填写错误视为弃奖。请于活动结束前进行兑奖，逾期作废！
					2、会员权益发放时间暂定活动结束后一个月内进行发放，请及时关注活动规则页面
				</text>
			</view>
			<view class="flex-row flex-mc fs-24 gray m-t-30">请仔细核对提交信息，如有疑问，请联系商家客服</view>
		</view>
		
		<van-popup v-model="showArea" position="bottom">
		  <van-area
				value="330000"
		    :area-list="areaList"
		    @confirm="onConfirm"
		    @cancel="showArea = false"
		  />
		</van-popup>
		
	</view>
</template>

<script>
	import { createEntity,createUnreal, getGiftDetail } from "@/common/http/api/member.js"
	import { getTreeList } from "@/common/http/api/system.js"
	import { Toast } from 'vant'
	export default {
		data() {
			return {
				item: {},
				id: '',
				entityForm: {
					contacts: '',
					contactPhone: '',
					contactAddress: '',
					contactZip: ''
				},
				unrealForm: {
					contacts: '',
					contactPhone: '',
					account: ''
				},
				showArea: false,
				areaList: {
					province_list: {},
					city_list: {},
					county_list: {}
				},
				area: '',
				detail: ''
			}
		},
		onLoad(e) {
			let id = e.id
			if(typeof id !== 'undefined') {
				this.id = id
				this.getData(id)
			}
		},
		created() {
			getTreeList().then(res => {
				const object = res.data.filter(item => item.id == '330000')[0]
				const { id, name, children } = object
				this.areaList.province_list = {
					[id]: name
				}
				children.forEach(city => {
					this.areaList.city_list[city.id] = city.name;
					if (city.children) {
						city.children.forEach(county => {
							this.areaList.county_list[county.id] = county.name;
						});
					}
				});
			})
		},
		onShow() {
			
		},
		methods: {
			onEntitySubmit(values) {
				this.entityForm.contactAddress = this.area + ' ' +this.detail
				createEntity(this.entityForm).then(res => {
					Toast.success('提交成功');
				}).finally( e => {
					uni.navigateTo({
						url: '/pages/services/rewardList?routeId=' + this.item.routeId
					})
				})
			},
			onUnrealSubmit(values) {
				createUnreal(this.unrealForm).then(res => {
					Toast.success('提交成功');
				}).finally( e => {
					uni.navigateTo({
						url: '/pages/services/rewardList?routeId=' + this.item.routeId
					})
				})
			},
			getData(id) {
				const params = { id: id }
				getGiftDetail(params).then(res => {
					this.item = res.data
					console.log(this.item,"看看item")
					if (res.data.type === 2) { //实物
						this.entityForm = res.data
						if (this.entityForm.contactAddress) {
							const array = this.entityForm.contactAddress.split(' ')
							this.area = array.slice(0, 3).join(' ')
							this.detail = array.slice(3).join(' ')
							console.log('value',this.value,'detail',this.detail)
						}
					}else if (res.data.type === 1) { //虚拟
						this.unrealForm = res.data
						console.log('虚拟',this.unrealForm)
					}
				})
			},
			validator(val) {
			  return /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(val);
			},
			submit(form) {
				if (form === 'entityForm') {
					this.$refs.entityForm.submit();
				}else if (form === 'unrealForm') {
					this.$refs.unrealForm.submit();
				}
			},
			onConfirm(values) {
				this.area = values.filter((item) => !!item).map((item) => item.name).join(' ');
				this.showArea = false;
			},
			handleCancel() {
				uni.navigateTo({
					url: '/pages/services/rewardList?routeId=' + this.item.routeId
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
		font-family: PingFang SC;
		background-color: #F4F4F4;
	}
	.content-t {
		padding: 30rpx 60rpx;
		background: #FFF;
		&.h-156 {
			height: 156rpx;
		}
		.image {
			width: 75rpx;
			height: 87.13rpx;
		}
		.cancelText {
			color: #929292;
			font-size: 32rpx;
			font-weight: 500;
			text-align: center;
		}
		.submitText {
			color: #ffffff;
			font-size: 32rpx;
			font-weight: 500;
		}
		.s-btn {
			width: 399rpx;
			height: 73rpx;
			border-radius: 50rpx;
			background: linear-gradient(0deg, #045BC7 -276.71%, #3A92FF 126.03%);
			box-shadow: 0 1rpx 5rpx 0 #00000033;
		}
		.a-btn {
			width: 399rpx;
			height: 73rpx;
			flex-shrink: 0;
			border-radius: 50rpx;
			background: linear-gradient(180deg, #93AAC7 0%, #A7BBD3 100%);
			box-shadow: 0 1rpx 5rpx 0 #00000033;
		}
	}
	.gray {
		color: #b6b6b6;
	}
</style>