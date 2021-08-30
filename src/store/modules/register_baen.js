const registerBena = {
	state: {
		baseInfo: {
			face_image_file: "",
			user_name: "",
			age: "",
			mobile_phone: "",
			address: "",
		},
		
		workInfo: {
			project_id: "",
			project_name: "",
			company_id: "",
			company_name: "",
			year_work: null,
			user_type: null, //用户类型（1_普工，2_临时工，3_其他，4_特种作业人员
			is_insured: null, //是否参保 1是0不是
			user_identity: null  //是否是班组长   1_班组长，2_工人）
		},
		materialinfo: {
			insurance: null, //保险资料
			skill_file: null, //技能证书
			labor_contract: null, //劳动合同
			medical_report: null, //体检报告
			vaccination_status: '', //疫苗状态 0否 1是
			health_code_file: null, //健康码
			nucleic_testing_time: "", //疫苗接种时间
			nucleic_testing_result: null, //"检测结果 0阳性 1阴性"
		},
		singInfo: {
			sign_file_id: null
		}
	},
	mutations: {
		setBaseInfo (state, payLoad) {
			state.baseInfo = payLoad
		},
		setWorkInfo (state, payload) {
			state.workInfo = payload
		},
		setMateralInfo (state, payload) {
			state.materialinfo = payload
		},
		setSignInfo (state, payLoad) {
			state.singInfo.sign_file_id = payLoad
		}
	}
}
export default registerBena
