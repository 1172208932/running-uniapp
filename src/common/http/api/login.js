import {
	http
} from '@/common/http/request.js'
//接口 dev测试服务器地址
const loginApi = (data) => {
	return http({
		dev: '/app-api/member/auth/test',
		prod: '',
	}, 'post',data,{},true)
}
const userInfoApi = (data) => {
	return http({
		dev: '/app-api/member/user/get',
		prod: '',
	}, 'get',data)
}

const loginZTVApi = (data) => {
	return http({
		dev: '/app-api/member/auth/ztv',
		prod: '',
	}, 'post',data,{},true)
}

export {loginApi ,userInfoApi,loginZTVApi};
