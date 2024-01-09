import Vue from "vue";
import Vuex from "vuex";
import { loginApi, userInfoApi, loginZTVApi } from "@/common/http/api/login";
import { doAuth } from "@/common/utils/ztv";
import { http } from "@/common/http/request.js";
Vue.use(Vuex); // vue的插件机制

// Vuex.Store 构造器选项
const store = new Vuex.Store({
  // 为了不和页面或组件的data中的造成混淆，state中的变量前面建议加上$符号
  state: {
    $token: "",
    // 用户信息
    $userInfo: {},
    $userId: {},
    $dictDatas: {},
  },
  getters: {
    token() {
      return uni.getStorageSync("token");
    },
    userInfo() {
      return uni.getStorageSync("userInfo");
    },
    userId() {
      return uni.getStorageSync("userId");
    },
  },
  mutations: {
    token: (state, data) => {
      uni.setStorageSync("token", data);
      state.$token = data;
    },
    userInfo: (state, data) => {
      uni.setStorageSync("userInfo", data);
      state.$userInfo = data;
    },
    userId: (state, data) => {
      uni.setStorageSync("userId", data);
      state.$userId = data;
    },
  },
  actions: {
    // 登录
    Login({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === "production") {
          doAuth((res) => {
            if (res) {
              const data = JSON.parse(res);
              let query = getApp().globalData.query;
              var params = {
                nickname: data.nickName,
                avatar: data.avatarUrl,
                targetUserId: data.userId,
                point: data.points,
                sessionId: data.sessionId
              };
              // if (data.created_at&&data.created_at.length>10) {
              //   params.createdAt = Date.parse(new Date(data.created_at));
              //   params.ff=11
              //   loginZTVApi(params)
              //     .then((result) => {
              //       commit("userId", result.data.userId);
              //       commit("token", result.data.accessToken);
              //       getApp().globalData.userId = result.data.userId;
              //       dispatch("GetInfo");
              //       resolve();
              //     })
              //     .catch((error) => {
              //       reject(error);
              //     });
              // } else {
                params.ff=22
                uni.request({
                  url: 'https://zuser.cztv.com/api/uc/getUserInfoBySessionId/' + data.sessionId, //仅为示例，并非真实接口地址。
                  success: (res) => {
                    if (res.data.code == "200") {
                      let createTime = res.data.data.createdTime
                      createTime = createTime.replace(/-/g,':').replace(' ',':');
                      createTime = createTime.split(':');
                      params.createdAt = new Date(createTime[0],(createTime[1]-1),createTime[2],createTime[3],createTime[4],createTime[5]).getTime();
                      loginZTVApi(params)
                        .then((result) => {
                          commit("userId", result.data.userId);
                          commit("token", result.data.accessToken);
                          getApp().globalData.userId = result.data.userId;
                          dispatch("GetInfo");
                          resolve();
                        })
                        .catch((error) => {
                          reject(error);
                        });
                    }
                  }
                });
              // }
              // if (query && query.createTime && query.pid) {
              //   if (regTimestamp > query.createTime) {
              //     params.pid = query.pid;
              //   }
              // }
            } else {
              reject();
            }
          });
        } else {
          loginApi({
            mobile: "13333333333",
          }).then((result) => {
            if (result.data) {
              commit("userId", result.data.userId);
              commit("token", result.data.accessToken);
              getApp().globalData.userId = result.data.userId;
              dispatch("GetInfo");
              resolve();
            }
            reject();
          });
        }
      });
    },
    TestLogin({ commit, dispatch }, testData) {
      return new Promise((resolve, reject) => {
        commit("userId", testData.userId);
        commit("token", testData.token);
        dispatch("GetInfo");
        resolve();
      });
    },
    // 获取用户信息
    GetInfo({ commit, state, getters }) {
      return new Promise((resolve, reject) => {
        userInfoApi()
          .then((res) => {
            // 没有 data 数据，赋予个默认值
            if (!res) {
              res = {
                data: {
                  nickname: "",
                  avatar: "",
                  mobile: "",
                },
              };
            }; // 读取 data 数据
            const user = res.data
            getApp().globalData.userInfo = res.data;
            commit("userInfo", user);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    },
  },
});

export default store;
