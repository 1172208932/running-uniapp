import Vue from 'vue'
import App from './App'

import store from './store'

import VConsole from 'vconsole'
// const vConsole = new VConsole()

Vue.config.productionTip = false

App.mpType = 'app'

import Request from '@/common/http/request.js'
Vue.use(Request);

import Utils from '@/common/utils/utils.js'
Vue.use(Utils);

import { globalMixin } from "@/common/utils/mixin.js"
Vue.mixin(globalMixin)

import Vant from 'vant';
Vue.use(Vant);

//全局组件

Vue.prototype.$store = store

import xsbprizePopup from './components/xsb-prizePopup/xsb-prizePopup.vue';
Vue.component('xsb-prizePopup',xsbprizePopup);

import xsbdebrisPopup from './components/xsb-debrisPopup/xsb-debrisPopup.vue';
Vue.component('xsb-debrisPopup',xsbdebrisPopup);

import bookPopup from './components/bookPopup/index.vue';
Vue.component('bookPopup',bookPopup);

import callUpPopup from './components/callUpPopup/index.vue';
Vue.component('callUpPopup',callUpPopup);

import rulePopup from './components/rulePopup/index.vue';
Vue.component('rulePopup',rulePopup);

import helpPopup from './components/helpPopup/helpPopup.vue';
Vue.component('helpPopup',helpPopup);

import choosePopup from './components/choosePopup/choosePopup.vue';
Vue.component('choosePopup',choosePopup);

import invitePopup from './components/invitePopup/invitePopup.vue';
Vue.component('invitePopup',invitePopup);

import indexPopup from './components/indexPopup/indexPopup.vue';
Vue.component('indexPopup',indexPopup);

import uanavbar from './components/ua-navbar/ua-navbar.vue';
Vue.component('uanavbar',uanavbar);

import lottie from 'vue-lottie';
Vue.component('lottie', lottie)

const app = new Vue({
	store,
  ...App
})
app.$mount()
