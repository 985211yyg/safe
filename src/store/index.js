import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user.js"
import registerBean from "./modules/register_baen.js"
import PageData from "./modules/page_data.js"

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		user,
		registerBean,
		PageData
	}
})

export default store
