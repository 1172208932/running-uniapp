import { Toast } from 'vant'
import store from '@/store'

let config = {
	baseUrl:process.env.VUE_APP_BASE_API,
	// 默认的请求头
	header: {
		"Content-Type": "application/json",
		"tenant-id":"1"
	},
	method: 'POST',
}

function request(api, method,data, header,isGetTonken,iscztv) {
	// var globalData = getApp().globalData; // 如果正在进行登陆，就将非登陆请求放在队列中等待登陆完毕后进行调用
	// if (!isGetTonken && globalData.isLanding) {
	// 	globalData.requestQueue.push({api:{dev:api},data:data,method:method,header:header,isGetTonken:isGetTonken});
	// 	return;
	// }
	if (uni.getStorageSync('token')) {
		header.Authorization = 'Bearer ' + uni.getStorageSync('token');
	}
	return new Promise((resolve, reject) => {
		let url;
		if(iscztv){
			url = 'http://212.129.221.185' + api
		}else{
			url = config.baseUrl + api
		}
		uni.request({
			url,
			data: data || {},
			method: method,
			header: Object.assign({}, config.header, header),
			success: (res) => {
				if (res.statusCode == 200 && res.data.code == 0) {
					resolve(res.data);
				} else if (res.data.code == 700 && res.data.msg) {
					Toast(res.data.msg || '网络错误,请稍后重试!');
				} else if (res.data.code == 401) {
					store.dispatch("Login").then((res)=>{
						Toast('网络繁忙!');
					}).catch(()=>{
						uni.reLaunch({
							url:"/pages/services/index"
						})
					})
				} else {
					Toast(res.data.msg || '网络错误,请稍后重试!');
					// reject(res);
				}
			},
			fail: (err) => {
				Toast('网络错误,请稍后重试!');
				reject(err.errMsg);
			}
		})
	})
}


export const http = (api, method = 'POST', data = {}, header = {},isGetTonken=false) => {
	return request(api.dev, method,data, header,isGetTonken,api?.iscztv);
}

const $request = {
	baseUrl: config.baseUrl
}

const install = Vue => {
	Vue.prototype.$request = $request
}

export default {
	install,
	config
}