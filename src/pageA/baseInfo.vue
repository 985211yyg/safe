<template>
	<view>
		<custom-nav-bar title="信息录入" :fixed="false"></custom-nav-bar>
		<view class="info_box">
			<enter-step :step="0"></enter-step>
			<view class="base_info">
				<text class="info_title">基本信息填写</text>
				<text class="info_notice">请认真填写以下信息，并保证信息的有效性和真实性。</text>
			</view>
			<u-form :model="form" ref="uForm" label-width="150" :label-style="labelStyle">
				<u-form-item label="正脸照片" style="position: relative;line-height: 80rpx;">
					<view class="face-img">
						<view style="flex-grow: 1;"></view>
						<image :src="UpLoadfaceImg" class="img" v-if="hasFaceImg" @click="tapImg(faceImg)"></image>
						<view class="plus-box" @click="chooseImg">
							<u-icon name="plus" size="25" color="#ccc"></u-icon>
						</view>
					</view>

				</u-form-item>
				<u-form-item label="工人姓名" prop="user_name" required>
					<u-input v-model="form.user_name" placeholder="请输入姓名" />
				</u-form-item>
				<u-form-item label="身份证号" prop="idcard_no" required>
					<u-input v-model="form.idcard_no" placeholder="请输入身份证号" />
				</u-form-item>
				<u-form-item label="工人年龄">
					<u-input v-model="form.age" placeholder="请输入年龄" />
				</u-form-item>
				<u-form-item label="手机号" prop="mobile_phone" required>
					<u-input v-model="form.mobile_phone" placeholder="请输入手机号" />
				</u-form-item>
				<u-form-item label="家庭住址">
					<u-input v-model="form.address" placeholder="请输入家庭住址" />
				</u-form-item>
				<u-form-item label="过往病史">
					<u-radio-group v-model="form.history">
						<u-radio active-color="#46B180" v-for="(item, index) in list" :key="index" :name="item.name"
							:disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="病史详情" :border-bottom="false">
					<u-input v-model="form.historyDetail" placeholder="请输入病史" />
				</u-form-item>
			</u-form>
		</view>

		<view class="next" @click="next">下一步</view>
	</view>
</template>

<script>
	import { checkMobile, checkIDCard } from '../common/utils.js'
	export default {
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		computed: {
			UpLoadfaceImg () {
				return this.$baseUrl + this.form.face_image_file 
			}
		},
		data() {
			return {
				labelStyle: {
					fontSize: '30rpx',
					fontFamily: 'Source Han Sans CN',
					fontWeight: '500',
					color: '#7D7B89'
				},
				list: [{
						name: '是',
						disabled: false
					},
					{
						name: '否',
						disabled: false
					},
				],
				hasFaceImg: false,
				form: {
					face_image_file: '',
					user_name: '',
					age: null,
					mobile_phone: '',
					address: '',
					idcard_no: '',
					// history: '',
					// historyDetail: ''
				},
				rules: {
					user_name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'change'
					}],
					mobile_phone: [
						{
						required: true,
						message: '请输入手机号',
						trigger: 'change'
					    },
						{
							validator: (rule, value, callback) => {
								return checkMobile(value)
							},
							message: '手机号码不正确',
							trigger: ['blur'],
						}
					],
					idcard_no: [
						{
						required: true,
						message: '请输入身份证号',
						trigger: 'change'
						},
						{
							validator: (rule, value, callback) => {
								return checkIDCard(value)
							},
							message: '身份证号码不正确',
							trigger: ['blur'],
						}
					]
				}
			}
		},
		methods: {
			chooseImg() {
				this.$uploadImg("/uploadfile",(res)=>{
					const {records:[{path}]} = res
					this.hasFaceImg = true;
					this.form.face_image_file = path
				},(err)=>{
					this.hasFaceImg = false;
				})
			},
			tapImg (url) {
				uni.showActionSheet({
					itemList:['重新上传'],
					success: (res) => {
						if (res.tapIndex === 0) {
							this.form.face_image_file = null
							this.faceImg = ''
							this.hasFaceImg = false
							this.chooseImg()
						}
					}
				})
			},
			next() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$store.commit('setBaseInfo', this.form)
						uni.navigateTo({
							url: '/pageA/workInfo',
						})
					} else {
						this.$showToast('请填写正确信息')
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F6F9;

		.info_box {
			border-radius: 10rpx;
			margin: 24rpx;
			background-color: #FFF;
			padding: 24rpx 24rpx 0 24rpx;

			.base_info {
				margin: 20rpx 0;

				@include flex-style(column, nowrap, flex-start, flex-start) .info_title {
					margin: 20rpx 0;
					font-size: 38rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #000000;
				}

				.info_notice {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #E37F28;
				}
			}
		}

		.next {
			@include flex-style(column, nowrap, center, center) height: 90rpx;
			margin: 24rpx;
			background: #46B180;
			border-radius: 8rpx;
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #FFFFFF;
		}
	}

	.face-img {
		@include flex-style(row, nowrap, center, center);

		.img {
			width: 104rpx;
			height: 104rpx;
			margin-right: 20rpx;
			border-radius: 10rpx;
			background: #ccc;
		}

		.plus-box {
			width: 104rpx;
			height: 104rpx;
			background: #F5F5F5;
			border-radius: 10rpx;
			@include flex-style(row, nowrap, center, center) right: 0;
			top: 20rpx;
		}
	}
</style>
