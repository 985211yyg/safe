<template>
	<view class="home">
		<custom-nav-bar title=" " :backIconShow="false"></custom-nav-bar>
		<view>
			<view class="home_display_board" style="padding: 0 24rpx;">
				<!-- 协作单位头部 -->
				<view class="display_board cooperation" v-if="userType==3">
					<view class="container">
						<view class="right_container">
							<view class="right_holder"></view>
							<image class="right_image" src="/static/home/img-home-banner-title.png" mode="widthFix">
							</image>
						</view>
						<view class="project" @click="onProjectSelected">
							<view style="padding-right: 16rpx">楚姚高速隧道机电项目</view>
							<u-icon name="arrow-down-fill" color="#FFF" size="16"></u-icon>
						</view>
						<view class="data_container">
							<view class="data">
								<view class="data_content">15</view>
								<view class="data_title">施工班组</view>
							</view>
							<view class="data">
								<view class="data_content">15</view>
								<view class="data_title">施工人数</view>
							</view>
							<view class="data">
								<view class="data_content">15</view>
								<view class="data_title">上报率</view>
							</view>
							<view class="data">
								<view class="data_content">15</view>
								<view class="data_title">参培率</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 工人头部 -->
				<view class="display_board  worker" v-if="userType==1">
					<view class="container">
						<view class="right_container">
							<view class="right_holder"></view>
							<image class="right_image" src="/static/home/img-home-banner-title.png" mode="widthFix">
							</image>
						</view>
						<view class="project" @click="onProjectSelected()">
							<image style="padding-right: 16rpx;width: 325rpx;height: 49rpx;"
								src="../../static/home/img-pre-job-training@2x.png">
							</image>
							<view class="tag_undo" v-if="true">
								未上报</view>
							<view class="tag_do" v-if="true">
								已上报</view>
						</view>
						<linear-gradient-divier></linear-gradient-divier>
						<view class="unreport_tips" v-if="false">今日岗前五分钟还未上报，请尽快上报!</view>
						<view class="risk_container">
							<view>
								<view class="title">
									今日作业风险
								</view>
							</view>

							<view class="risks">
								<risk-item :level="4" name="车辆伤害"></risk-item>
								<risk-item :level="1" name="触电伤害"></risk-item>
								<risk-item :level="3" name="高空坠楼"></risk-item>

							</view>

						</view>
					</view>
				</view>
				<!-- 通知 -->
				<view class="home_advice">
					<image class="home_advice_icon" src="/static/home/icon-advice.png"></image>
					<view class="home_advice_text">道路千万条，安全第一条！</view>
				</view>


			</view>
			<!-- 菜单功能 -->
			<view class="home_function">
				<view class="home_function_item" @click="functionClick(item)" v-for="item in personalMenuFunctions"
					:key="item.title">
					<image class="home_function_item_icon" :src="item.icon"></image>
					<view class="home_function_item_title">{{ item.title }}</view>
				</view>
			</view>
			<view class="home_divider"></view>
			<!-- 今日重点项目 -->
			<view class="home_today_project" style="padding: 43rpx; width: 100%" v-if="userType==3">
				<view class="home_today_project_titel">
					<image class="image" src="../../static/home/icon-focus-project@2x.png"></image>
					<view class="name">今日重点项目</view>
				</view>
			</view>
			<!-- 项目列表 -->
			<!-- <view class="home_today_project_list" v-if="userType==3"> -->
			<view class="home_today_project_list" v-if="true">
				<home-project-item></home-project-item>
				<home-project-item></home-project-item>
				<home-project-item></home-project-item>
				<home-project-item></home-project-item>
				<home-project-item></home-project-item>
				<home-project-item></home-project-item>
				<home-project-item></home-project-item>
				<home-project-item></home-project-item>
			</view>
			<u-picker mode="selector" v-model="showProjectPicker" :default-selector="[0]" :range="selector"
				@confirm="onProjectSure"></u-picker>
		</view>

	</view>

</template>

<script>
	import linearGradientDivier from "./widget/linear-gradient-devider";
	import riskItem from "./widget/risk-item";
	import {
		formatDate
	} from "../../common/formatdate.js"
	import {
		getStorage
	} from '../../common/utils.js'
	import {
		mapState
	} from 'vuex'
	export default {
		name: "home",
		components: {
			linearGradientDivier,
			riskItem
		},
		data() {
			return {
				userType: 0,
				showProjectPicker: false,
				signCount: 0,
				siginState: 0,
				isGetSignStatus: false,
				personalMenuFunctions: [],
				menuFunctions: [{
						icon: "/static/home/icon-home-education.png",
						url: "../five/five-sign",
						title: "安全教育",
						id: 1
					},
					{
						icon: "/static/home/icon-home-safeUpcoming.png",
						url: "../safe_data/safety-check-list",
						title: "安全检查",
						id: 2
					},
					{
						icon: "/static/home/icon-home-safeUpcoming.png",
						title: "安全待办",
						id: 3
					},
					{
						icon: "/static/home/icon-home-worker.png",
						url: "../worker_manager/worker-manager",
						title: "工人管理",
						id: 4
					},
					{
						icon: "/static/home/icon-home-notice.png",
						url: "/pageA/announcementList",
						title: "通知公告",
						id: 5
					},
					{
						icon: "/static/home/icon-home-violation@2x.png",
						url: "../illegal_record/illegal-record",
						title: "违规记录",
						id: 6
					},
					{
						icon: "/static/home/icon-home-register-code.png",
						url: "../illegal_record/illegal-record",
						title: "注册二维码",
						id: 7
					},
					{
						icon: "/static/home/icon-home-violation@2x.png",
						url: "../illegal_record/illegal-record",
						title: "个人二维码",
						id: 8
					},
					{
						icon: "/static/home/icon-home-historical@2x.png",
						url: "../illegal_record/illegal-record",
						title: "历史上报",
						id: 9
					},
					{
						icon: "/static/home/icon-home-historical@2x.png",
						url: "../illegal_record/illegal-record",
						title: "历史签到",
						id: 10
					},
					{
						icon: "/static/home/icon-home-safety-information@2x.png",
						url: "../illegal_record/illegal-record",
						title: "安全资料",
						id: 11
					}

				],
				selector: ["楚姚高速隧道机电项目", "楚姚高速隧道机电项目", "楚姚高速隧道机电项目", "楚姚高速隧道机电项目"]
			}
		},
		computed: {
			...mapState([
				'user'
			])
		},
		mounted() {
			this.userType = this.user.type.type;
			this.checkHasSign()
			//获取菜单
			var authlist = [...this.user.authList]
			authlist.forEach((item) => {
				var targetList = this.menuFunctions.filter(e => e.title === item.name)
				this.personalMenuFunctions.concat(targetList)
			})
			console.log(this.personalMenuFunctions)

		},
		methods: {
			//项目选择created
			onProjectSelected() {
				this.showProjectPicker = true;
			},
			onProjectSure(v) {
				console.log(v)

			},
			//检查今日是否已上报、签到、开工1_未上报，2_已上报，3_未施工
			async checkHasSign() {
				const {
					userInfo: {
						company_id,
						project_id
					}
				} = this.user
				const res = await new this.$Api().request("se_records", "", {
					company_id: company_id,
					project_id: project_id,
					construction_time: formatDate("yyyy-MM-dd", new Date()),
				}, true)
				const {
					count,
					list
				} = res
				this.signCount = count
				this.isGetSignStatus = true
				if (count > 0) {
					const {
						list: [{
							construction_state
						}]
					} = res
					this.siginState = construction_state
				}
			},
			functionClick(item) {
				if (item.id == 1 && !this.isGetSignStatus) return this.$showToast("正在获取上报数据！");
				if (item.id == 1 && this.signCount > 0 && this.siginState == 2) return this.$showToast("今日已上报！")
				if (item.id == 1 && this.signCount > 0) {
					return this.$navigateTo("../five/five-group-leader-sign")
				}
				this.$navigateTo(item.url)
			}

		}
	}
</script>

<style lang="scss">
	.home {
		display: flex;
		flex-direction: column;

		.header {
			height: 114rpx;
		}

		// 共同样式
		.display_board {
			height: 350rpx;
			background-image: url(../../static/home/bg-home-banner.png);
			background-repeat: no-repeat;
			background-position: center;
			background-size: 100% 100%;

			.container .right_container {
				width: 100%;
				display: flex;
				margin-top: 27rpx;
				flex-direction: row;

				.right_holder {
					flex-grow: 1;
				}

				.right_image {
					height: 34rpx;
					width: 213rpx;
					font-weight: 800;
					color: #ffffff;
					margin-right: 24rpx;
				}
			}
		}

		// 协作单位
		.display_board.cooperation .container {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;

			.project {
				display: flex;
				padding-top: 42rpx;
				padding-bottom: 69rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #ffffff;
				padding-left: 40rpx;
			}

			.data_container {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: flex-start;
				height: 100%;
				width: 100%;
				flex-grow: 1;

				.data {
					display: flex;
					flex-direction: column;
					flex-grow: 1;
					align-items: center;

					.data_content {
						font-size: 46rpx;
						font-family: DINPro;
						font-weight: bold;
						color: #ffffff;
					}

					.data_title {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #ffffff;
					}
				}
			}
		}


		// 工人
		.display_board.worker .container {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;

			.project {
				display: flex;
				padding-left: 40rpx;
				padding-top: 42rpx;

				.tag_undo {
					height: 42rpx;
					width: 102rpx;
					text-align: center;
					line-height: 42rpx;
					font-size: 18rpx;
					font-family: PingFang SC;
					font-weight: 800;
					color: #FE7A1B;
					border-radius: 30rpx;
					background-color: #FCF6F2;
				}

				.tag_do {
					height: 42rpx;
					width: 102rpx;
					text-align: center;
					line-height: 42rpx;
					font-size: 18rpx;
					font-family: PingFang SC;
					font-weight: 800;
					color: #46B180;
					border-radius: 30rpx;
					background-color: #EAFAED;
				}
			}

			.unreport_tips {
				font-size: 24rpx;
				margin-left: 37rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}

			.risk_container {
				margin-left: 24rpx;

				.title {
					width: 170rpx;
					border: 1rpx solid #FEA102;
					padding: 0 9rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 800;
					margin-bottom: 26rpx;
					color: #FEA102;
				}

				.risks {
					display: flex;
					flex-direction: row;
				}
			}
		}


		.home_function {
			display: flex;
			flex-flow: row wrap;

			.home_function_item {
				display: flex;
				margin-bottom: 27rpx;
				flex-direction: column;
				align-items: center;
				flex: 0 0 33%;

				.home_function_item_icon {
					width: 130rpx;
					height: 130rpx;
				}

				.home_function_item_title {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #414043;
					margin-bottom: 9rpx;
				}
			}
		}

		.home_advice {
			display: flex;
			align-items: center;
			height: 62rpx;
			background: #ffe37f28;
			margin: 34rpx 0;
			border-radius: 10px;

			.home_advice_icon {
				margin: 0 24rpx;
				width: 30rpx;
				height: 30rpx;
			}

			.home_advice_text {
				font-size: 18rpx;
				font-family: PingFang SC;
				color: #e37f28;
				padding-left: 12rpx;
				font-weight: 800;
			}
		}

		.home_divider {
			width: 100%;
			height: 24rpx;
			background: #f5f6f9;
		}

		.home_today_project_titel {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.name {
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #414043;
			}

			.image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 12rpx;
			}
		}

		.home_today_project_list {
			width: 100%;
			display: flex;
			flex-direction: column;
		}
	}
</style>
