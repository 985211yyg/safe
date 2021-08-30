/** 
 * api接口统一调用
 * @param type    传参方式body,query,path，默认body传参
 * @param name    api接口名字，对应类属性
 * @param method  HTTP请求方法GET,POST,PUT,DELETE
 * @param params  请求参数，类型Object,若type为path,则类型为Array,如["q","是"]
 * @param token   登录验证，类型Boolean,默认false
 * 调用new Api(type).request(name,method,params,token)
 */


import {
	httpRequest,
	upload
} from "./server.js"
export class Api {
	constructor(type = 'body') {
		this.type = type //传参方式body,query,path
		this.token = false
		this.params = {}
		this.method = "POST"

		//登录注册
		this.login = "/api/ww/miniapp/company_user/login" // 施工用户登录
		this.leaderLogin = "/api/ww/miniapp/company_leader/login"
		this.register = "/api/ww/miniapp/company_user/register"
		this.update = "/api​/ww​/miniapp​/company_user​/update"
		this.getInfo = "/api​/ww​/miniapp​/company_user​/info"
		this.changePass = "/api​/ww​/miniapp​/company_user​/changePass"
		this.userType = "/api/ww/miniapp/user/login"
		this.sign = "/api/vi/miniprogram/sign/add"
		//领导

		this.leaderLogin = "/api/ww/miniapp/company_leader/login" // 领带登录
		this.leaderUpdate = "/api/ww/miniapp/company_leader/update" // 领带更新信息
		this.leaderInfo = "/api/ww/miniapp/company_leader/info" // 领导信息

		//用户权限
		this.workerAuthList = "/api/ww/miniapp/auth/roleAuthList" // 工人权限
		this.leaderAuthList = "/api/ww/miniapp/auth/orgAuthList" // 领导权限

		//安全教育（岗前五分钟）
		this.addOrUpdate = "/api/ww/miniapp/safety_education" //添加安全教育记录，body,post ,PUT为更新
		this.se_records = "/api/ww/miniapp/safety_education/postPage" //分页获取安全教育记录，body,post
		this.workerSignList = "/api​/ww​/miniapp​/safety_education​/workerSignList" //工人签到历史记录 query ,get
		this.companySignList = "​/api​/ww​/miniapp​/safety_education​/companySignList" //协作单位签到历史记录query，get​		
		this.projectSignList = "​/api​/ww​/miniapp​/safety_education​/projectSignList" //项目组单位签到历史记录query ,get
		this.processTree = "/api/ww/miniapp/safety_education/processList" //工序 query,get 
		this.getConstructStandard = "/api/ww/miniapp/safety_education/getConstructStandard" //工序信息query ,get
		this.getProjects = "/api​/ww​/miniapp​/safety_education​/getProjects" //项目列表get
		this.getCompanys = "​/api​/ww​/miniapp​/safety_education​/getCompanys" //协作单位列表get
		this.getCompanyUsers = "​/api/ww/miniapp/safety_education/getCompanyUsers" //协作单位人员列表query ,get
		// this.signDetail = "​/api​/ww​/miniapp​/safety_education​/signDetail"//签到详情query ,post
		// this.sign = "​/api​/ww​/miniapp​/safety_education​/sign" //签到query ,po/api/ww/miniapp/safety_education/getCompanyUsersst

		//签名
		this.signDetail = "/api/ww/miniapp/user_sign/signDetail" //获取签名列表query ，get
		this.updateSign = "/api/ww/miniapp/user_sign" //更新签名body ，put
		this.addSign = "/api/ww/miniapp/user_sign" //添加签名body ，post

		//工人管理
		this.workerList = "/api/ww/miniapp/company_user/list"
		this.setWokerRole = "/api/ww/miniapp/company_user/groupLeaer" //设置班组长（1 班组长 2 工人）
		this.setBlockUser = "/api/ww/miniapp/company_user/blockUser" // 设置黑名单（1 是 0 否）
		this.checkUser = "/api/ww/miniapp/company_user/list"

		//通知公告
		this.notice = "/api/vi/miniprogram/notice/getList"

		//个人角色中心

		//文件上传
		this.uploadFile = "/uploadfile"

		//公司及项目
		this.companyList = "/api/ww/miniapp/company/list"
		// this.companyList = "/api/vi/miniprogram/system/enterprise"
		// this.projectList = "/api/vi/miniprogram/system/project"
		this.projectList = "/api/ww/miniapp/project/list"
		this.unitLogin = "/api/ww/miniapp/company/login" //协作单位登录

		// 施工人员更新个人资料
		this.updateInfo = "/api/ww/miniapp/company_user/update"

		// 获取微信code
		this.getWxCode = "/api/vi/web/wechat/getWxacode"
	}

	async request(name, method, params, token) {
		let res
		if (this.type == 'body') {
			res = await httpRequest(method || this.method, this[name], params || this.params, token || this.token);
		}
		if (this.type == 'query') {
			let url = this[name] + "?"
			const paramsArr = Object.entries(params || this.params)
			paramsArr.map(v => {
				url += (v[0] + "=" + v[1] + "&")
			})
			res = await httpRequest(method || this.method, url.substring(0, url.length - 1), this.params, token ||
				this.token);
		}
		if (this.type == 'path') {
			const param = params || []
			let url = this[name] + "/"
			param.map(v => {
				url += (v + "/")
			})
			res = await httpRequest(method || this.method, url.substring(0, url.length - 1), this.params, token ||
				this.token);
		}

		if (this.type == 'multipart') {
			res = await upload(this.uploadFile, params.filePath, params.fileType, token || this.token);
		}
		return res
	}

}
