import Vue from 'vue'
import App from './App'
import store from './store'
import {
	reLogin,
	showToast,
	showModal,
	showLoading,
	navigateTo,
	redirectTo,
	reLaunch,
	switchTab,
	navigateBack,
	choseImg,
	uploadFile,
	uploadImg
} from "common/utils.js"
import {
	httpRequest,
	upload,
	baseUrl
} from "common/server.js"
import {Api} from "common/api.js"

import uView from "uview-ui"
Vue.use(uView)

Vue.prototype.$request = httpRequest
Vue.prototype.$Api = Api
Vue.prototype.$baseUrl = baseUrl
Vue.prototype.$reLogin = reLogin
Vue.prototype.$showToast = showToast
Vue.prototype.$showModal = showModal
Vue.prototype.$showLoading = showLoading
Vue.prototype.$navigateTo = navigateTo
Vue.prototype.$redirectTo = redirectTo
Vue.prototype.$reLaunch = reLaunch
Vue.prototype.$switchTab = switchTab
Vue.prototype.$navigateBack = navigateBack
Vue.prototype.$choseImg = choseImg
Vue.prototype.$upload = upload
Vue.prototype.$uploadFile = uploadFile
Vue.prototype.$uploadImg = uploadImg

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
