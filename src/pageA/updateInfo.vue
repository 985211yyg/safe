<template>
	<view>
		<custom-nav-bar title="个人资料"></custom-nav-bar>
		<custom-status-bar :topSpace="44"></custom-status-bar>
		<view class="edit-info edit">
			<view class="item">
				<view class="name">头像</view>
				<view class="action"><u-avatar :src="baseUrl + info.avatar" @click="updateAvatar"></u-avatar></view>
			</view>
			<view class="item">
			   <view class="name">姓名(昵称)</view>
				<view class="action">
					<u-input v-model="info.name" input-align="right" :clearable="false" placeholder="请输入姓名"/>
				</view>
			</view>
			<view class="item">
			   <view class="name">性别</view>
				<view class="action" @click="show.sex = true" style="height: 42rpx;">{{ info.sex | filterSex }}</view>
			</view>
			<view class="item">
			   <view class="name">家庭住址</view>
				<view class="action">
					<u-input v-model="info.address" input-align="right" :clearable="false" placeholder="请输入家庭住址"/>
				</view>
			</view>
			<view class="item">
			   <view class="name">手机号</view>
				<view class="action">
					<u-input v-model="info.phone" input-align="right" :clearable="false" placeholder="请输入手机号" @blur="checkPhone"/>
				</view>
			</view>
			<view class="item">
			   <view class="name">所属工种</view>
				<view class="action" @click="show.type = true" style="height: 42rpx;">{{ info.type | filterUserType }}</view>
			</view>
			<!-- <view class="item">
			   <view class="name">是否参保</view>
				<view class="action" @click="show.insured = true" style="height: 42rpx;">{{ info.insured }}</view>
			</view> -->
			<view class="item">
			   <view class="name">所属项目</view>
				<view class="action" @click="show.project = true">{{ info.project }}</view>
			</view>
			<view class="item">
			   <view class="name">所属单位</view>
				<view class="action" @click="show.company = true">{{ info.company }}</view>
			</view>
			<view class="item">
			   <view class="name">工作工龄</view>
				<view class="action">
				  <u-input v-model="info.jobLong" input-align="right" :clearable="false" placeholder="请输入工作工龄"/>
				</view>
			</view>
			<view class="item">
			   <view class="name">年龄</view>
				<view class="action">
					<u-input v-model="info.age" input-align="right" :clearable="false" placeholder="请输入年龄"/>
				</view>
			</view>
		</view>
		
		<view class="edit-img edit" v-if="true">
			<view style="border-bottom: 1px solid #F1F1F1;" v-for="edit in editImgArray" :key="edit.id">
				<enter-file style="padding:10rpx 0 32rpx 0;" @uploadPic="val => { uploadPic(val, edit.id)}"
				 :title="edit.name" :imgList="edit.imgList"></enter-file>
			</view>
		</view>
		
		<u-modal v-model="show.sex" :show-title="false" :show-confirm-button="false" mask-close-able>
			<view style="margin:24rpx;">
				<u-radio-group v-model="info.sex" :wrap="true" active-color="#46B180" @change="show.sex = false">
					<u-radio
						v-for="(item, index) in [{sex: '男', type: 1 },{sex: '女', type: 2 }]" :key="index" 
						:name="item.sex"
						size="100"
						>
							{{item.sex}}
					</u-radio>
				</u-radio-group>
			</view>
		</u-modal>
		
		<u-modal v-model="show.type" :show-title="false" :show-confirm-button="false" mask-close-able>
			<view style="margin:24rpx;">
				<u-radio-group v-model="info.type" :wrap="true" active-color="#46B180" @change="changeUserType">
					<u-radio 
						v-for="(item, index) in userTypeArray" :key="index" 
						:name="item.type"
						>
							{{ item.type }}
					</u-radio>
				</u-radio-group>
			</view>
		</u-modal>
		
		<!-- <u-modal v-model="show.insured" :show-title="false" :show-confirm-button="false" mask-close-able>
			<view style="margin:24rpx;">
				<u-radio-group v-model="info.insured" :wrap="true" active-color="#46B180" @change="show.insured = false">
					<u-radio 
						v-for="(item, index) in [{type: '是', id: 1 },{type: '否', id: 2 }]" :key="index" 
						:name="item.type"
						:value="item.id"
						>
							{{ item.type }}
					</u-radio>
				</u-radio-group>
			</view>
		</u-modal> -->
		
		
		<u-select v-model="show.project" :list="projectList" value-name="project_type_id" label-name="project_type_name" 
		 @confirm="confirmProject" @cancel="show.project = false"></u-select>
		<u-select v-model="show.company" :list="companyList" value-name="enterprise_type_id" label-name="enterprise_name"
		 @confirm="confirmUnit" @cancel="show.company = false">
		 </u-select>
		 
		<view class="out">
			<view class="login-out" @click="updateInfo">保存</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import { checkMobile, getStorage } from '../common/utils.js'
	export default {
		created () {
			new this.$Api().request("projectList", "GET").then(result => {
				this.projectList = result
			})
			new this.$Api().request("companyList", "GET").then(result => {
				this.companyList = result
			})
			let userInfo = getStorage('userInfo')
			console.log(userInfo)
			this.info.avatar = userInfo.face_image_file
			this.info.project = userInfo.project_name
			this.info.project_id = userInfo.project_id
			this.info.name = userInfo.user_name
			this.info.sex = userInfo.sex_id
			this.info.type = userInfo.user_type
			// this.info.insured = userInfo.is_insured
			this.info.phone = userInfo.mobile_phone
			this.info.address = userInfo.address
			this.info.company = userInfo.company_name
			this.info.company_id = userInfo.company_id
			this.info.jobLong = userInfo.year_work
			this.info.age = userInfo.age
			this.user_id = userInfo.user_id
			this.editImgArray[0].imgList = userInfo.insurance.split(',')
			this.editImgArray[1].imgList = userInfo.skill_file.split(',')
			this.editImgArray[2].imgList = userInfo.labor_contract.split(',')
			this.editImgArray[3].imgList = userInfo.medical_report.split(',')
		},
		data() {
			return {
				baseUrl: 'http://118.31.43.86:8080',
				user_id: '',
				editImgArray: [{name: '工伤保险',id: 1,imgList: [] },{name: '技能证书',id: 2, imgList: []},{name: '劳动合同',id: 3, imgList: []},
				               {name: '体检报告',id: 4, imgList: []}],
				userTypeArray: [{type: '普工', id: 1 },{type: '临时工', id: 2 },{type: '特种工', id: 3 },{type: '其他', id: 4 }],
				projectList: [],
				companyList: [],
				info:{
					avatar: '',
					name: '',
					sex: '',
					address: '',
					phone: '',
					type: '',
					insured: '',
					project: '',
					project_id: '',
					company: '',
					company_id: '',
					jobLong: '',
					age: '',
				},
				show: {
					sex: false,
					type: false,
					insured: false,
					project: false,
					company: false
				}
			}
		},
		methods: {
			checkPhone (e) {
				let checkResult = checkMobile(this.info.phone)
				if (!checkResult) {
					this.info.phone = '',
					this.$showToast('手机号格式不正确')
				}
			},
			confirmProject (val) {
				this.info.project = val[0].label
				this.info.project_id = val[0].value
				this.show.project = false
			},
			confirmUnit (val) {
				this.info.company = val[0].label
				this.info.company_id = val[0].value
				this.show.company = false
			},
			changeUserType (val) {
				this.userTypeArray.forEach(ele => {
					if (ele.type === val) {
						this.info.type = ele.id
					}
				})
				this.show.type = false
			},
			updateAvatar () {
				console.log(this.info.avatar)
				uni.showActionSheet({
					itemList: ['预览', '更换头像'],
					success: res => {
						if(res.tapIndex === 0) {
							uni.previewImage({
							    urls: [ this.$baseUrl +  this.info.avatar]
							})
						} else {
							this.$uploadImg("/uploadfile", (res) => {
								const {records: [{path}]} = res
								this.info.avatar = path
							})
						}
					}
				})
			},
			uploadPic (file,index) {
				console.log(file)
				this.editImgArray.forEach(item => {
					if(item.id === index) {
						item.imgList = file
					}
				})
			},
			updateInfo () {
				let params = {
					mobile_phone: this.info.phone,
					user_id: this.user_id,
					sex_id: this.info.sex === '男' ? 1 : 0,
					// idcard_no: "string",
					address: this.info.address,
					user_type: this.info.type,
					// user_identity: 0,
					// birthday: "string",
					labor_contract: this.editImgArray[2].imgList.join(','),
					insurance: this.editImgArray[0].imgList.join(','),
					safety_train: "string",
					medical_report: this.editImgArray[3].imgList.join(','),
					// head_portrait_file: "string",
					// open_id: "string",
					// sign_file_id: "string",
					year_work: this.info.jobLong,
					age: this.info.age,
					is_proxy_fill: 0,
					skill_file: this.editImgArray[1].imgList.join(','),
					face_image_file: this.info.avatar,
					// health_code_file: "string",
					// nucleic_testing_result: 0,
					// nucleic_testing_time: "2021-08-15T15:04:25.261Z",
					// check_status: 0,
					// check_reason: "string",
					// is_del: 0
				}
				console.log(params)
				new this.$Api().request('updateInfo', 'post', params, false).then(res => {
					this.$store.commit("user_setUserInfo", res)
					// console.log(res)
				})
			}
		},
		filters:{
			filterUserType (val) {
				val = Number(val)
				if (val === 1) {
					return '普工'
				} else if (val === 2) {
					return '临时工'
				} else if (val === 3) {
					return '其他'
				} else {
					return '特种工'
				}
			},
			filterSex (val) {
				if (val === 0) {
					return '女'
				} else {
					return '男'
				}
			}
		}
	}
</script>

<style lang="scss">
	.edit {
		margin: 24rpx;
		
		.item {
			margin: 0 24rpx;
			height: 100rpx;
			@include flex-style(row,nowrap,space-between,center);
			border-bottom: 1px solid #F1F1F1;
			
			.name {
				flex: 4;
				font-size: 15px;
				font-family: "Source Han Sans CN";
				font-weight: 500;
				color: rgb(125, 123, 137);
			}
			
			.action {
				flex: 8;
				display: flex;
				justify-content: flex-end;
			}
		}
	}
	
	.out {
		@include flex-style(row,nowrap,center,center);
		
		.login-out {
			height: 45px;
			line-height: 45px;
			text-align: center;
			background: #FFFFFF;
			border: 1px solid #F0F0F0;
			border-radius: 8px;
			font-size: 15px;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #414043;
			margin-top: 21px;
			margin-bottom: 14px;
			width: 80%;
		}
	}
	
	.five-item-box {
			// padding: 0 16px !important;
	}
</style>
