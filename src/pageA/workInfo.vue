<template>
	<view>
		<custom-nav-bar title="信息录入" :fixed="false"></custom-nav-bar>
		<view class="info_box">
			<enter-step :step="1"></enter-step>
			<view>
				<view class="base_info">
					<text class="info_title">工作信息填写</text>
					<text class="info_notice">请认真填写以下信息，并保证信息的有效性和真实性。</text>
				</view>
				<u-form :model="form" ref="uForm" label-width="150" :label-style="labelStyle">
					<u-form-item label="所属项目" prop="project_name" required>
						<u-input v-model="form.project_name" @click="onProjcetSelect" placeholder="请选择所属项目" />
						<template #right>
							<view class="right-icon">
								<image src="../static/mine/actionicon.png" class="arrow"></image>
							</view>
						</template>
					</u-form-item>
					<u-form-item label="所属单位" prop="company_name" required>
						<u-input v-model="form.company_name" @click="onCompanySelect" placeholder="请选择所属单位" />
						<template #right>
							<view class="right-icon">
								<image src="../static/mine/actionicon.png" class="arrow"></image>
							</view>
						</template>
					</u-form-item>
					<u-form-item label="工作工龄">
						<u-input v-model="form.year_work" placeholder="请输入工作工龄" />
					</u-form-item>
					<u-form-item label="所属工种" :border-bottom="false">
					</u-form-item>
					<view class="job-type">
						<view class="type" :class="index === activeJobType ? 'active-type':''"
							v-for="(type, index) in jobType" :key="index" @click="changeJobType(index, type)">
							{{ type.type }}
							<u-icon name="checkbox-mark" size="16" color="#fff" class="active-icon"
								v-if="index === activeJobType"></u-icon>
						</view>
					</view>
					<u-form-item label="是否参保">
						<u-radio-group v-model="form.is_insured">
							<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name"
								:disabled="item.disabled" active-color="#46B180">
								{{ item.name }}
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="班组长" :border-bottom="false">
						<u-radio-group v-model="form.user_identity">
							<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name"
								:disabled="item.disabled" active-color="#46B180">
								{{ item.name }}
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</u-form>
			</view>
		</view>

		<view class="next" @click="next">下一步</view>

		<u-select v-model="showProjectPciker" :list="projectList" value-name="project_type_id"
			label-name="project_type_name" @confirm="onProjectConfirm" @cancel="showProjectPciker = false">
		</u-select>
		<u-select v-model="showCompanyPciker" :list="companyList" value-name="enterprise_type_id"
			label-name="enterprise_name" @confirm="onCompanyConfirm" @cancel="showCompanyPciker = false">
		</u-select>
	</view>
</template>

<script>
	export default {
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		data() {
			return {
				labelStyle: {
					fontSize: '30rpx',
					fontFamily: 'Source Han Sans CN',
					fontWeight: '500',
					color: '#7D7B89'
				},
				radioList: [{
						name: '是',
						disabled: false
					},
					{
						name: '否',
						disabled: false
					}
				],
				form: {
					project_name: '',
					project_id: '',
					company_name: '',
					company_id: '',
					year_work: null,
					user_type: 0,
					is_insured: '',
					user_identity: ''
				},
				rules: {
					project_name: [{
						required: true,
						message: '请填写所属项目名称',
						trigger: ['change']
					}, ],
					company_name: [{
						required: true,
						message: '请填写所属单位名称',
						trigger: ['change']
					}, ]
				},
				selector: ['云南', '昆明', '曲靖'],
				jobType: [{ type: '普工', id: 1 }, { type: '临时工', id: 2 } ,{ type: '其他', id: 3 },{ type: '特种工', id: 4 }],
				activeJobType: 0,
				projectList: [],
				companyList: [],
				showProjectPciker: false,
				showCompanyPciker: false,
			}
		},
		methods: {
			changeJobType(index, type) {
				this.activeJobType = index
				this.form.user_type = type.id
			},
			next() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.form.is_insured = this.form.is_insured === '是' ? 1 : 0
						this.form.user_identity = this.form.user_identity === '是' ? 1: 0
						this.$store.commit('setWorkInfo', this.form)
						uni.navigateTo({
							url: '/pageA/materialInfo'
						})
					} else {
						this.$showToast('请填写正确信息')
					}
				})
			},
			onProjcetSelect() {
				uni.showLoading({
					title: "获取数据中..."
				})
				new this.$Api().request("projectList", "POST").then(result => {
					this.projectList = result;
					this.showProjectPciker = true
				})
			},
			onCompanySelect() {
				uni.showLoading({
					title: "获取数据中..."
				})
				new this.$Api().request("companyList", "POST").then(result => {
					this.companyList = result
					this.showCompanyPciker = true
				})
			},
			//项目
			onProjectConfirm(v) {
				this.showProjectPciker = false
				this.form.project_name = v[0].label
				this.form.project_id = v[0].value
			},
			//公司
			onCompanyConfirm(v) {
				this.showCompanyPciker = false
				this.form.company_name = v[0].label
				this.form.company_id = v[0].value
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

	.right-icon {

		.arrow {
			width: 12rpx;
			height: 18rpx;
		}
	}

	.job-type {
		@include flex-style(row, nowrap, space-between, center);
		border-bottom: 1px solid #F1F1F1;
		padding-bottom: 40rpx;

		.type {
			width: 148rpx;
			height: 66rpx;
			border-radius: 10rpx;
			border: 1px solid #F0F0F0;
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #3C3C40;
			@include flex-style(row, nowrap, center, center);
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.active-icon {
			position: absolute;
			bottom: 0;
			right: 0;
			width: 22rpx;
			height: 19rpx;
			background: #46B180;
			border-radius: 6rpx;
		}

		.active-type {
			border: 1px solid #46B180;
			background: rgba(70, 177, 128, 0.1);
			color: #46B180;
		}
	}
</style>
