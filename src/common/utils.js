import {baseUrl} from "./server.js"

//存store
export const setStorage = function(item, data) {
	if(!item) return;
	let obj = data
	if (typeof data !== 'string') obj = JSON.stringify(data)
	uni.setStorageSync(item, data)
}

//取store
export const getStorage = function(item) {
	if(!item) return;
	return uni.getStorageSync(item)
}

// 存token
export const setToken = function(token) {
	setStorage("token",token)
}

// 取token
export const getToken = function() {
	return getStorage("token")
}

 // function doSome({a,b=2,c}){//可选参数
 //    console.log(a,b,c)
 //    }
 //    doSome({a:5,c:22})

/* 退出到登录页面重新登录 */
export const reLogin = ()=> {
	setTimeout(()=> {
		navigateTo('/pages/login/login')
	}, 500);
}

export const navigateTo = function(url, animationType, animationDuration, success, fail, complete) {
	uni.navigateTo({
		url: url,
		animationType: animationType || 'pop-in',
		animationDuration: animationDuration || 300,
		success: success,
		fail: fail,
		complete: complete
	})
}

export const redirectTo = function(url, success, fail, complete) {
	uni.redirectTo({
		url: url,
		success: success,
		fail: fail,
		complete: complete
	})
}

export const reLaunch = function(url, success, fail, complete) {
	uni.reLaunch({
		url: url,
		success: success,
		fail: fail,
		complete: complete
	})
}

export const switchTab = function(url, success, fail, complete) {
	uni.switchTab({
		url: url,
		success: success,
		fail: fail,
		complete: complete
	})
}

export const navigateBack = function(delta, animationType, animationDuration, success, fail, complete) {
	uni.navigateBack({
		delta: delta
	})
}

export const showLoading = (title)=>{
	uni.showLoading({
	    title: title
	});
}

export const showToast = (title, iconType = 0, duration) => {
	uni.showToast({
		title: title,
		icon: iconType == 1 ? "success" : "none",
		duration: duration ? duration : 2000
	});
}

export const showModal = async (title,content,showCancel,confirm,cancel) => {
	let res =await uni.showModal({
	    title: title,
	    content: content,
		showCancel:showCancel,
	});
	if(res[1].confirm){
		confirm()
	}
	if(res[1].cancel){
		cancel()
	}
}

//判断是否是iphoneX
export const isIPhoneX = () => {
   let screenHeight = uni.getSystemInfoSync().screenHeight
   let bottom = uni.getSystemInfoSync().safeArea.bottom
   return screenHeight !== bottom
}

//选择或者拍摄照片
export const choseImg = (callback,err,sizeType=['copressed'],num = 1) => {
	uni.chooseImage({
		count: num,
		sizeType: sizeType,
		success:(res)=>{
			const imgFiles = res.tempFilePaths[0]
			if(callback){
				callback(imgFiles)
			}
		},
		fail:(err)=>{
			if(err){
				err(err)
			}
		}
	})
}

//上传文件
export const uploadFile = (file,url,callback,err) => {
	showLoading("正在上传...")
	uni.uploadFile({
		url: baseUrl+url,
		filePath: file,
		name: 'file',
		success(res) {
			let ret = JSON.parse(res.data)
			showToast(ret.message)
			uni.hideLoading()
			if(callback){
				callback(ret)
			}
		},
		fail(err){
			uni.hideLoading()
			showToast(err)
			if(err){
				err(err)
			}
		}
	});
}


//上传图片
export const uploadImg = (url,callback,err,sizeType=['copressed'],num = 1) => {
	let thiz = this
	uni.chooseImage({
		count: num,
		sizeType: sizeType,
		success:(res)=>{
			var imgFiles = res.tempFilePaths[0]
			showLoading("正在上传...")
			uni.uploadFile({
				url: baseUrl+url,
				filePath: imgFiles,
				name: 'file',
				success(res) {
					uni.hideLoading()
					let ret = JSON.parse(res.data)
					if (ret.message && ret.message !== '') {
						showToast(ret.message)
					}
					if(callback){
						callback(ret)
					}
				},
				fail(err){
					uni.hideLoading()
					showToast(err)
					if(err){
						err(err)
					}
				}
			});
			// onProgressUpdate 上传对象更新的方法
			// uper.onProgressUpdate(function(res) {
			// 	// thiz.percent = res.progress
			// })
		}
	})
}

//验证手机号码
export const checkMobile = (phone)=>{
	let exp = /^1[3456789]\d{9}$/
	return exp.test(phone)
}

//验证身份证号
export const checkIDCard =(id)=>{
     // 1 "验证通过!", 0 //校验不通过
	var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
	//号码规则校验
	if(!format.test(id)){
		return false
	}
	//区位码校验
	//出生年月日校验   前正则限制起始年份为1900;
	var year = id.substr(6,4),//身份证年
		month = id.substr(10,2),//身份证月
		date = id.substr(12,2),//身份证日
		time = Date.parse(month+'-'+date+'-'+year),//身份证日期时间戳date
		now_time = Date.parse(new Date()),//当前时间戳
		dates = (new Date(year,month,0)).getDate();//身份证当月天数
	if(time>now_time||date>dates){
		return false
	}
	//校验码判断
	var c = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);   //系数
	var b = new Array('1','0','X','9','8','7','6','5','4','3','2');  //校验码对照表
	var id_array = id.split("");
	var sum = 0;
	for(var k=0;k<17;k++){
		sum+=parseInt(id_array[k])*parseInt(c[k]);
	}
	if(id_array[17].toUpperCase() != b[sum%11].toUpperCase()){
		return false
	}
	return true
}

//验证邮编
export const checkPostcode  = (postcode )=>{
	let exp = /^[0-9]{6}$/
	return exp.test(postcode )
}

//格式化富文本内容
export const formatRichText = (html)=> {
	if(!html){return}
	let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
		match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
		match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
		match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
		return match;
	});
	newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
		match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
		return match;
	});
	newContent = newContent.replace(/<br[^>]*\/>/gi, '');
	newContent = newContent.replace(/\<img/gi,
		'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
	return newContent;
}

//倒计时
export const cutTime = (time,name)=>{
	let nowtime = new Date(),  //获取当前时间
		endtime = new Date(time);  //定义结束时间
	if(endtime<nowtime) return "0天00:00:00";
	let hours,minutes,seconds
	let lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
		leftd = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
		lefth = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
		leftm = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
		lefts = Math.floor(lefttime/1000%60);  //计算秒数
		hours = lefth<10 ? '0'+lefth:lefth
		minutes = leftm<10 ? '0'+leftm:leftm
		seconds = lefts<10 ? '0'+lefts:lefts
	if(leftd == 0 && lefth == 0 && leftm == 0 && lefts==0){
		clearInterval(name)
	}
	return leftd + "天" + hours + ":" + minutes + ":" + seconds;  //返回倒计时的字符串
}


//获取时间
export const getDate = (type) => {
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;;
	day = day > 9 ? day : '0' + day;
	return `${year}-${month}-${day}`;
}

//四舍五入保留两位小数
export const keepTwoDecimalFull=(num, p)=> {
    let result = parseFloat(num);
    if (isNaN(result)) {
        alert('传递参数错误，请检查！');
        return false;
    }
    let multiplicator = Math.pow(10, p);
    result = Math.round(num * multiplicator) / multiplicator;
    let s_x = result.toString();
    let pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + p) {
        s_x += '0';
    }
    return s_x;
}

//验证是否为大于0的正整数
export const isNumber = (value) =>{         
     var patrn = /^[1-9]\d*$/;
      if (patrn.exec(value) == null || value == "") {
         return false
     } else {
         return true
     }
 }

// 微信授权
export const getProvider = (callback,title="正在拉取授权···")=>{
	showLoading(title)
	uni.getProvider({
		service: 'oauth',
		success: (pres) => {
			if (~pres.provider.indexOf('weixin')) {
				uni.login({
					provider: 'weixin',
					success: (lres) => {
						uni.getUserInfo({
							provider: 'weixin',
							success: async (info) => { //这里请求接口
								uni.hideLoading()
								if(callback){
									callback(info,lres,pres)
								}
							},
							fail: () => {
								uni.hideLoading()
								this.$showToast("微信登录授权失败")
							}
						})
					},
					fail: () => {
						uni.hideLoading()
						this.$showToast("微信登录授权失败")
					}
				})
			} else {
				uni.hideLoading()
				this.$showToast("请先安装微信或升级版本")
			}
		}
	});
}

//小程序支付
export const miniPay = async (param,callback)=>{
	const payResult = await uni.requestPayment({
		provider:param.provider || 'wxpay',
		timeStamp:param.timeStamp,
		nonceStr: param.nonceStr,
		package:param.packagevalue,
		signType:param.signType,
		paySign: param.paySign
	});
	try {
		if (payResult[1].errMsg == 'requestPayment:ok') {
			showToast('支付成功');
			if(callback){
				callback()
			}else{
				setTimeout(()=>{
					this.$navigateBack()
				},500)
			}
			return;
		}
		showToast(payResult[1].errMsg);
	} catch (e) {
		showToast("支付失败！")
	}
}

/** 
* js数组排序 支持数字和字符串
* @param params
* @param arrObj   obj     必填  数组对象
* @param keyName  string  必填  要排序的属性名称
* @param type     int     选填  默认type:0 正顺  type:1反顺
*/
export const arrItemSort = (arrObj,keyName,type)=>{
  //这里如果 直接等于arrObj，相当于只是对对象的引用，改变排序会同时影响原有对象的排序，而通过arrObj.slice(0)，
  //表示把对象复制给另一个对象，两者间互不影响 
  var tempArrObj = arrObj.slice(0);
  var compare = function (keyName,type) {
      return function (obj1, obj2) {
          var val1 = obj1[keyName];
          var val2 = obj2[keyName];
          if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
              val1 = Number(val1);
              val2 = Number(val2);
              }
              //如果值为空的，放在最后       
              if (val1 == null && val2 == null) {
              return 0;
          } else if (val1 == null && val2!= null ) {
              return (type==1 ? -1 : 1);
          } else if (val2 == null && val1!= null ) {
              return (type==1 ? 1 : -1);
          }            
              //排序
          if (val1 < val2) {
              return (type==1 ? 1 : -1);
          } else if (val1 > val2) {
              return (type==1 ? -1 : 1);;
          } else {
              return 0;
          }            
      } 
  }
  return tempArrObj.sort(compare(keyName,type));
}

/**
* 自定义函数名：PrefixZero ,前置位补0
* @param num： 被操作数
* @param n： 固定的总位数
*/
export const prefixZero = (num, n ,str=0) => {
    return (Array(n).join(str) + num).slice(-n);
}

/**
* 自定义函数名：addDate ,指定日期进行天数的加减
* @param date： 指定日期
* @param days： 加减天数，正为加负为减
*/
export const addDate = (date, days)=>{
    let d = new Date(date);
    d.setDate(d.getDate() + days);
    let m = d.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let dd = d.getDate();
    dd = dd < 10 ? '0' + dd : dd;
    return d.getFullYear() + '-' + m + '-' + dd;
}

/**
 * 对象数组去重
 * @param arr 要去重的数组
 */
export const arrayDuplication =(arr)=>{
	const hash = {};
	const newArray = arr.reduce((item, next)=>{
		hash[next.code] ? '' : hash[next.code] = true && item.push(next);
		return item;
	},[])
	return newArray
}