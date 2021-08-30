//组件图片地址
// const baseCImgUrl = "../static/img" //发布的时候改为线上地址
//页面图片地址
// const basePImgUrl = "../../static/img" //发布的时候改为线上地址
//组件图片地址
// const baseCImgUrl = "" //发布的时候改为线上地址
//页面图片地址
// const basePImgUrl = "" //发布的时候改为线上地址

// api地址
let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
	baseUrl = "http://118.31.43.86:8080"
}
if (process.env.NODE_ENV === 'production') {
	baseUrl = ''
}

export {baseUrl};
import {
	getToken,
	getStorage,
	showToast
} from "./utils.js"

//请求封装
export const httpRequest = (method, url, data, isToken) => {
	let token = "",
		tokenType = ""
	if (isToken) {
		token = getToken()
		tokenType = getStorage("tokenType")
	}
	let isLocal = url.search("http");
	let httpDefaultOpts = {
		url: isLocal == -1 ? baseUrl + url : url,
		data: data,
		method: method,
		xhrFields: {
			withCredentials: true
		},
		header: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		dataType: 'json',
	}
	if (isToken && token) httpDefaultOpts.header.Authorization = tokenType + " " + token
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				uni.hideLoading()
				//此处可根据接口具体返回的格式进行一些统一处理
				let resp = res[1]['data'];
				if (resp.code && resp.code == 200) {
					console.log("网络请求success:" + httpDefaultOpts.url);
					if (resp.data) {
						resolve(resp.data);
					}
					if (resp.result) {
						resolve(resp.result);
					}
				} else {
					showToast(resp.message)
					console.log("网络请求fialed:" + httpDefaultOpts.url);
				}
			}
		).catch(
			(response) => {
				reject(response);
				//若有token，可在此处理token过期的相关操作
			}
		)
	})
	return promise
};

//单文件上传
export const upload = (url, filePath, fileType, isToken) => {
	let token = "",
		tokenType = ""
	if (isToken) {
		token = getToken()
		tokenType = getStorage("tokenType")
	}
	let isLocal = url.search("http");
	let httpDefaultOpts = {
		method: 'POST',
		url: (isLocal == -1 ? baseUrl + url : url) + "?fileType=" + fileType,
		data: [filePath],
		xhrFields: {
			withCredentials: true
		},
		header: {
			'Content-Type': 'multipart/form-data'
		},
		dataType: 'json',
	}
	if (isToken && token) httpDefaultOpts.header.Authorization = tokenType + " " + token

	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				//此处可根据接口具体返回的格式进行一些统一处理
				let resp = res[1]['data'];
				if (resp.code && resp.code == 200) {
					resolve(resp.data);
				} else {
					uni.hideLoading()
					showToast(resp.message)
				}
			}
		).catch(
			(response) => {
				reject(response);
				//若有token，可在此处理token过期的相关操作
			}
		)
	})
	return promise
};
