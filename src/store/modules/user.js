import {
	setStorage,
	getStorage,
	setToken,
	getToken
} from "../../common/utils.js"
const user = {
	//用户信息
	// {
	//         "mobile_phone":"17695510310",
	//         "project_name":"交安项目",
	//         "labor_contract":"/uploadfiles/5835d722a3594a90b69f476645f305da_2021-08-29-12-31.png",
	//         "modify_user_id":null,
	//         "is_proxy_fill":0,
	//         "check_status":2,
	//         "sex_id":"0",
	//         "create_user_id":null,
	//         "insurance":"/uploadfiles/6f78931c02124985a66b8e4a233f776d_2021-08-29-12-31.png",
	//         "modify_user_name":null,
	//         "skill_file":"/uploadfiles/095d52d35945479da15e3979f2479f06_2021-08-29-12-31.png,/uploadfiles/f4f87a971782469eb0a4bd96d403da17_2021-08-29-12-31.png",
	//         "check_reason":null,
	//         "idcard_no":null,
	//         "create_user_name":null,
	//         "safety_train":"string",
	//         "on_job_state":null,
	//         "face_image_file":"/uploadfiles/ff775d7adf174d99bcc70c3eac4f711e_2021-08-29-12-31.png",
	//         "is_block":0,
	//         "user_id":"72af2e53-dd26-43d7-b99c-0b0b521913e6",
	//         "company_id":"7cb06f65-b57d-43fc-815c-e0de27a81cad",
	//         "device_id":null,
	//         "medical_report":"/uploadfiles/901ead3c8ec241f3a9e06547ff399d34_2021-08-29-12-32.png",
	//         "is_insured":null,
	//         "vaccination_status":null,
	//         "company_name":"云南省交通科学研究院有限公司",
	//         "user_type":2,   user_type用户类型（1_普工，2_临时工，3_其他，4_特种作业人员）
	//         "head_portrait_file":null,
	//         "is_del":0,
	//         "health_code_file":null,
	//         "login_account":"17695510310",
	//         "entry_time":null,
	//         "user_identity":3,  user_identity用户身份（1_班组长，2_工人）
	//         "open_id":null,
	//         "sign_file_id":null,
	//         "nucleic_testing_result":null,
	//         "user_name":"yyf",
	//         "project_id":"22b75674-55fd-4d26-92ac-2416dc0ab62e",
	//         "address":"昆明",
	//         "modify_time":null,
	//         "year_work":11,
	//         "nucleic_testing_time":null,
	//         "password":"123456",
	//         "birthday":null,
	//         "age":24
	//     }
	state: {
		isLogin: getStorage("isLogin") || false, // 是否登录
		userInfo: getStorage("userInfo") || {}, // 用户信息
		authList: getStorage("authList") || {}, // 用户权限

		tokenType: getStorage("tokenType") || "",
		token: getToken() || '', // token,
		type: getStorage("type") || 0 // type = 0 无用户 1 普通用户 2 公司内部用户  3合作单位（自定义的）
	},
	mutations: {
		user_setUserInfo(state, userInfo) {
			state.userInfo = userInfo
			setStorage("userInfo", userInfo)
		},
		user_setAuthList(state, authList) {
			state.authList = authList
			setStorage("authList", authList)
		},
		user_setToken(state, token) {
			state.token = token
			setToken(token)
		},
		user_setTokenType(state, tokenType) {
			state.tokenType = tokenType
			setStorage("tokenType", tokenType)
		},
		user_setLogin(state, isLogin) {
			state.isLogin = isLogin
			setStorage("isLogin", isLogin)
		},
		user_logout(state) {
			state.isLogin = false
			state.userInfo = {}
			state.token = ''
			setStorage("userInfo", {})
			setToken("")
			setStorage("isLogin", false)
		},
		user_setType(state, type) {
			state.type = type
			setStorage("type", type)
		},
	}
}

export default user
