import {
	http
} from '@/common/http/request.js'

/**
 * 开启探索
 * @param data
 */
const startExplore = (data) => {
  return http({
    dev:'/app-api/member/game-route/start',
  },'post', data)
}

/**
 * 探索奖励
 * @param data
 */
const rollReward = (data) => {
  return http({
    dev:'/app-api/member/game-prize/roll',
  },'post', data)
}

/**
 * 激活探索奖励
 * @param data
 */
const activeReward = (data) => {
  return http({
    dev:'/app-api/member/game-prize/active',
  },'get', data)
}

/**
 * 获得路线下用户所有碎片
 * @param data
 */
const getDebrisList = (data) => {
  return http({
    dev:'/app-api/member/game-prize/listPieceByRoute',
  },'get', data)
}

/**
 * 获得路线下用户所有探索奖励
 * @param data
 */
const getList = (data) => {
  return http({
    dev:'/app-api/member/game-prize/listByRoute',
  },'get', data)
}

/**
 * 获得用户合伙人绑定关系
 * @param data
 */
const getPartner = (data) => {
  return http({
    dev:'/app-api/member/game-partner/get',
  },'get', data)
}

/**
 * 更新用户合伙人绑定
 * @param data
 */
const updatePartner = (data) => {
  return http({
    dev:'/app-api/member/game-partner/update',
  },'put', data)
}

/**
 * 排名
 * @param data
 */
const getRankList = (data) => {
  return http({
    dev:'/app-api/member/game-route/rank',
  },'get', data)
}

/**
 * 获得用户礼品列表
 * @param data
 */
const getGiftList = (data) => {
  return http({
    dev:'/app-api/member/game-gift/list',
  },'get', data)
}

/**
 * 获得用户礼品详情
 * @param data
 */
const getGiftDetail = (data) => {
  return http({
    dev:'/app-api/member/game-gift/get',
  },'get', data)
}

/**
 * 用户礼品抽奖
 * @param data
 */
const drawGift = (data) => {
  return http({
    dev:'/app-api/member/game-gift/draw',
  },'post', data)
}

/**
 * 实物礼品表单提交
 * @param data
 */
const createEntity = (data) => {
  return http({
    dev:'/app-api/member/game-gift/form/entity',
  },'post', data)
}

/**
 * 虚拟礼品表单提交
 * @param data
 */
const createUnreal = (data) => {
  return http({
    dev:'/app-api/member/game-gift/form/unreal',
  },'post', data)
}

/**
 * 任务完成
 * @param data
 */
const taskFinish = (data) => {
  return http({
    dev:'/app-api/member/game-task/finish',
  },'post', data)
}

/**
 * 用户地标碎片搜集情况
 * @param data
 */
const listPieceBySpot = (data) => {
  return http({
    dev:'/app-api/member/game-prize/listPieceBySpot',
  },'get', data)
}

/**
 * 抽中第四张碎片
 * @param data
 */
const pieceCompleted = (data) => {
  return http({
    dev:'/app-api/member/game-spot/get',
  },'get', data)
}

/**
 * 邀请人信息
 * @param data
 */
const getParentMember = (data) => {
  return http({
    dev:'/app-api/member/user/parent',
  },'get', data)
}

/**
 * 被邀请人助力确认
 * @param data
 */
const getNotify = (data) => {
  return http({
    dev:'/app-api/member/user/parent/notify',
  },'post', data)
}

/**
 * 邀请记录
 * @param data
 */
const getInviteList = (data) => {
  return http({
    dev:'/app-api/member/game-route/invite/list',
  },'get', data)
}

//获取未读邀请成功通知
const unreadInviteList = () => {
  return http({
    dev:'/app-api/member/game-notify/invite/unread/list',
  },'get')
}

const inviteRead = () => {
  return http({
    dev:'/app-api/member/game-notify/invite/read',
  },'post')
}

export {
	startExplore,
	rollReward,
	activeReward,
	getPartner,
	updatePartner,
	getDebrisList,
	getRankList,
	getGiftList,
	getGiftDetail,
	drawGift,
	createEntity,
	createUnreal,
  taskFinish,
	listPieceBySpot,
	pieceCompleted,
  getParentMember,
	getNotify,
	getInviteList,
  unreadInviteList,
  inviteRead
};
