import {
	http
} from '@/common/http/request.js'

/**
 * 获得当期路线详情
 * @param data
 */
const getRouteLast = (data) => {
  return http({
    dev:'/app-api/game/route/last',
  },'get', data)
}

/**
 * 获得路线详情
 * @param data
 */
const getRoute = (data) => {
  return http({
    dev:'/app-api/game/route/get',
  },'get', data)
}
getRoute

/**
 * 获得路线任务列表
 * @param data
 */
const getRouteTask = (data) => {
  return http({
    dev:'/app-api/game/route-task/listByRoute',
  },'get', data)
}

/**
 * 图鉴
 * @param data
 */
const getbookList = (data) => {
  return http({
    dev:'/app-api/game/route-spot/book',
  },'get', data)
}

/**
 * 获得路线分页
 * @param data
 */
const getRouteList = (data) => {
  return http({
    dev:'/app-api/game/route/page',
  },'get', data)
}

export {
	getRouteLast,
	getRouteTask,
	getRoute,
	getbookList,
	getRouteList
};