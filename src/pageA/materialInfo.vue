<template>
	<view>
		<custom-nav-bar title="信息录入"></custom-nav-bar>
		<custom-status-bar :topSpace="44"></custom-status-bar>
		<view class="info_box">
			<view class="step-box">
				<enter-step :step="2"></enter-step>
			</view>
			<view>
				<view class="base_info">
					<text class="info_title">个人材料填写</text>
					<text class="info_notice">请认真填写以下信息，并保证信息的有效性和真实性。</text>
				</view>
				<view class="upload-box" v-for="(item, index) in uploadArray" :key="item.id">
					<enter-file :title="item.name" @uploadPic="val => {uploadPic(val, index)}"></enter-file>
				</view>
			</view>
		</view>

		<view class="form">
			<view class="form-first form-item">
				<view class="name">疫苗接种是否完成</view>
				<view class="content">
					<u-radio-group @change="ChangeFinshed">
						<u-radio active-color="#46B180" v-for="(item, index) in radioList" :key="index"
							:name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<enter-file title="健康码截图" @uploadPic="val => {uploadPic(val, 4)}"></enter-file>
			<view class="form-third form-item">
				<text class="name">最近核酸检测</text>
				<view class="content time" @click="timeShow = true">
					{{ form.nucleic_testing_time }}
				</view>
				<u-picker v-model="timeShow" mode="time" :params="params" @confirm="confirmTime"></u-picker>
				<view class="icon">
					<image src="../static/five/icon-calendar@2x.png" class="image"></image>
				</view>
			</view>
			<view class="form-four form-item">
				<view class="name">核酸检测结果</view>
				<view class="content">
					<u-radio-group @change="ChangeResult">
						<u-radio active-color="#46B180" v-for="(item, index) in resultList" :key="index"
							:name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
			</view>
		</view>

		<view class="next-box">
			<view class="next" @click="submit">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uploadArray: [{name: '工伤保险',id: 1},{name: '技能证书',id: 2},{name: '劳动合同',id: 3},{name: '体检报告',id: 4}, {name: '身份证照', id: 5}],
				radioList: [{name: '是',disabled: false},{name: '否',disabled: false}],
				resultList: [{name: '阴性',disabled: false},{name: '阳性',disabled: false}],
				timeShow: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false,
				},
				form: {
					insurance: null, //保险资料
					skill_file: null, //技能证书
					labor_contract: null, //劳动合同
					medical_report: null, //体检报告
					vaccination_status: null, //疫苗状态 0否 1是
					health_code_file: null, //健康码
					nucleic_testing_time: "请选择时间", //疫苗接种时间
					nucleic_testing_result: null, //"检测结果 0阳性 1阴性"
				}
			}
		},
		methods: {
			confirmTime(time) {
				const { year, month, day} = time
				this.form.nucleic_testing_time = `${year}-${month}-${day}`
			},
			uploadPic (val, type) {
				if (type === 0) { //工伤
					this.form.insurance = val.join(',')
				} else if (type === 1) { //证书
					this.form.skill_file = val.join(',')
				} else if (type === 2) { // 合同
					this.form.labor_contract = val.join(',')
				} else if (type === 3) { // 报告
					this.form.medical_report = val.join(',')
				} else {
					this.form.health_code_file = val.join(',')
				}
			},
			submit() {
				this.$store.commit('setMateralInfo', this.form)
				uni.navigateTo({
					url: '/pageA/sign'
				})
			},
			ChangeFinshed(val) {
				if (val === '是') {
					this.form.vaccination_status = 1
				} else {
					this.form.vaccination_status = 0
				}
			},
			ChangeResult (val) {
				if (val === '阴性') {
					this.form.nucleic_testing_result = 1
				} else {
					this.form.nucleic_testing_result = 0
				}
			}
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

			.step-box {
				padding: 24rpx 24rpx 0 24rpx;
			}

			.base_info {
				padding: 0 24rpx 0 24rpx;
				margin: 20rpx 5rpx;

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

		.upload-box {
			border-bottom: 1px solid #F5F6F9;

			.top {
				@include flex-style(row, nowrap, space-between, center) .img {
					width: 38rpx;
				}
			}

			.bottom {
				padding-top: 20rpx;
				@include flex-style(row, wrap, flex-start, center);
				align-content: flex-start;

				.img {
					margin: 10rpx 15rpx 10rpx 0;
				}
			}
		}

		.upload-box:last-child {
			border-bottom: none;
		}

		.form {
			margin: 24rpx;
			background: #FFFFFF;
			border-radius: 10rpx;

			.form-item:nth-child(4) {
				border-bottom: none
			}

			.form-item {
				height: 106rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #F1F1F1;
				@include flex-style(row, nowrap, flex-start, center);
				padding: 0 24rpx;

				.name {
					width: 40%;
					font-size: 30rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #7D7B89;
				}

				.content {
					width: 40%;
					@include flex-style(row, nowrap, flex-start, center);
				}

				.time {
					font-size: 30rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #C4C4C4;
				}

				.icon {
					width: 20%;
					@include flex-style(row, nowrap, flex-end, center);

					.image {
						width: 38rpx;
						height: 30rpx;
					}
				}
			}
		}

		.next-box {
			height: 120rpx;
			margin: 0 24rpx;

			.next {
				@include flex-style(column, nowrap, center, center) height: 90rpx;
				background: #46B180;
				border-radius: 8rpx;
				font-size: 36rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
	}
</style>
