import {
	http
} from '@/common/http/request.js'

const getTreeList = (data) => {
	return http({
		dev: '/app-api/system/area/tree',
	}, 'get', data)
}

export {
	getTreeList
};
