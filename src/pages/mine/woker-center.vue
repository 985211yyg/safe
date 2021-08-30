<template>
	<view>
		<view class="my-header-box">
			<view class="header-left">
				<view class="header-img">
					<image class="header-pic" src="../../static/five/code.png" mode="widthFix"></image>
					<image class="header-sex" src="../../static/mine/icon-male@2x.png" mode="widthFix"></image>
				</view>
				<view class="header-name">
					<view class="name-item">
						<text>{{ userInfo.user_name }}</text>
						<text>{{ userType }}</text>
					</view>
					<view class="age-item">
						<text>{{ userInfo.age ? userInfo.age: 20}}</text>
						<text></text>
						<text>{{ userInfo.mobile_phone ? userInfo.mobile_phone : 17695510310 }}</text>
					</view>
				</view>
			</view>
			<view class="header-edit" @click="tapEditInfo">
				<text>编辑资料</text>
				<image src="../../static/mine/toicon.png"></image>
			</view>
		</view>
		<view class="header-address">
			<image src="../../static/mine/icon-mine-address@2x.png"></image>
			<text>{{ userInfo.address ? userInfo.address: '昆明市官渡区小板桥' }}</text>
		</view>
		<view class="header-com-pro">
			<view>
				<image src="../../static/mine/icon-mine-company@2x.png"></image>
				<text>{{ userInfo.company_name ? userInfo.company_name: '智能交通分公司'}}</text>
			</view>
			<view style="margin-left: 40rpx;">
				<image src="../../static/mine/icon-mine-project@2x.png" mode=""></image>
				<text>{{ userInfo.project_name ? userInfo.project_name: '楚姚高速隧道机电项目'}}</text>
			</view>
		</view>
		<view class="frequency-statistics">
			<image class="fs-bg" src="../../static/mine/bg-mine-statistics@2x.png"></image>
			<view class="fs-number">
				<view>
					<text>23</text>
					<text>施工天数</text>
				</view>
				<view>
					<text>0</text>
					<text>参培次数</text>
				</view>
				<view @tap="viewIllegal">
					<text>158</text>
					<view class="sj-icon">
						<text>违规次数</text>
						<image src="../../static/mine/sjicon.png"></image>
					</view>
				</view>
				<view>
					<text>2</text>
					<view class="sj-icon">
						<text>参与项目</text>
						<image src="../../static/mine/sjicon.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="person-info">
			<view>
				<image src="../../static/mine/icon-mine-years@2x.png"></image>
				<text>{{ userInfo.year_work ? userInfo.year_work : 100}}年工龄</text>
			</view>
			<view>
				<image src="../../static/mine/icon-mine-workerType@2x.png"></image>
				<text>{{ userType }}</text>
			</view>
			<view>
				<image src="../../static/mine/icon-mine-insurance@2x.png"></image>
				<text>{{ userInfo.is_insured === 1 ? '已参保': '未参保'}}</text>
			</view>
			<view>
				<image src="../../static/mine/icon-mine-medicalHistory@2x.png"></image>
				<text>无病史</text>
			</view>
		</view>
		<view class="action-box">
			<view class="action-title">
				个人资料
			</view>
			<view class="action-item-box">
				<view class="action-item" v-for="(item,index) in personalArr" :key="index"
					@click="tapInfoitem(index, item)">
					<view class="action-item-left">
						<image :src="item.leftImg"></image>
						<text>{{item.leftTitle}}</text>
						<text>{{item.num}}</text>
					</view>
					<view class="action-item-right">
						<text class="text" v-if="item.rightText">{{item.rightText}}</text>
						<text class="date" v-if="item.rightDate">{{item.rightDate}}</text>
						<text class="btn1" v-if="item.rightBtn1">{{item.rightBtn1}}</text>
						<text class="btn2" v-if="item.rightBtn2">{{item.rightBtn2}}</text>
						<image :style="{opacity:!item.showIcon ? 0:1}" src="../../static/mine/actionicon.png"></image>
					</view>
				</view>
			</view>
			<button class="login-out-btn" type="button" @click="lginOut">退出登录</button>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex";
	import { getStorage } from '../../common/utils.js'
	export default {
		created() {
			this.userInfo = getStorage('userInfo')
			console.log(this.userInfo)
		},
		data() {
			return {
				userInfo: {},
				infoTitle: '',
				fileList: [],
				//个人资料action
				personalArr: [{
						leftImg: "../../static/mine/icon-mine-injury-insurance@2x.png",
						leftTitle: "工伤保险",
						num: "2",
						rightText: "",
						rightDate: "",
						rightBtn1: "",
						rightBtn2: "",
						showIcon: true
					},
					{
						leftImg: "../../static/mine/icon-mine-skill@2x.png",
						leftTitle: "技能证书",
						num: "2",
						rightText: "",
						rightDate: "",
						rightBtn1: "",
						rightBtn2: "",
						showIcon: true
					},
					{
						leftImg: "../../static/mine/icon-mine-contract@2x.png",
						leftTitle: "劳动合同",
						num: "2",
						rightText: "",
						rightDate: "",
						rightBtn1: "",
						rightBtn2: "",
						showIcon: true
					},
					{
						leftImg: "../../static/mine/icon-mine-examination@2x.png",
						leftTitle: "体检报告",
						num: "2",
						rightText: "未上传",
						rightDate: "",
						rightBtn1: "",
						rightBtn2: "",
						showIcon: true
					},
				],
				//班组长个人资料action
				foremanArr: [{}],
				//领导总包项目部人员个人资料
				leaderArr: [

				],
				//协作单位资料
				cooperationUnitArr: [

				]
			};
		},
		computed: {
			...mapState([
				'user'
			]),
			userType () {
				if (this.userInfo.user_type === null) {
					return '普工'
				} else {
					let type = ['普工', '特种工', '其他', '临时作业人员']
					return type[this.userInfo.user_type + 1]
				}
			}
		},
		mounted() {
			// this.userInfo = this.user.userInfo
			//工伤保险
			this.personalArr[0].rightText = this.userInfo.insurance == null ? "未上传" : ''
			//技能证书
			this.personalArr[1].rightText = this.userInfo.skill_file == null ? "未上传" : ''
			//劳动合同
			this.personalArr[2].rightText = this.userInfo.labor_contract == null ? "未上传" : ''
			//劳动合同
			this.personalArr[3].rightText = this.userInfo.medical_report == null ? "未上传" : ''

		},
		onLoad() {

		},
		methods: {
			viewIllegal() {
				this.$navigateTo("../illegal_record/illegal-list")
			},
			tapEditInfo () {
				let title = '编辑资料'
				this.$navigateTo(`/pageA/updateInfo?title=${title}`)
			},
			tapInfoitem(index, item) {
				let title = '个人资料'
				this.$navigateTo(`/pageA/updateInfo?title=${title}`)
			},
			lginOut() {


			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-header-box {
		@include flex-style(row, nowrap, space-between, center);
		@include boxsizing;

		.header-left {
			margin-left: 37rpx;
			@include flex-style(row, nowrap, flex-start, center);
		}

		.header-img {
			width: 140rpx;
			height: 140rpx;
			border: 4px solid #FFFFFF;
			border-radius: 50%;
			box-shadow: 0px 8rpx 16rpx 0px rgba(0, 0, 0, 0.16);
			position: relative;

			.header-pic {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}

			.header-sex {
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				z-index: 99;
				bottom: -10rpx;
				right: -20rpx;
			}
		}

		.header-name {
			margin-left: 33rpx;

			.name-item {
				display: flex;
				align-items: center;

				text {
					&:first-child {
						font-size: 45rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #000000;
						margin-right: 19rpx;
					}

					&:last-child {
						width: 65rpx;
						height: 33rpx;
						line-height: 33rpx;
						text-align: center;
						background: #01B0FD;
						border-radius: 16rpx;
						color: #fff;
						font-size: 18rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
					}
				}
			}

			.age-item {
				margin-top: 27rpx;
				@include boxsizing;
				@include flex-style(row, nowrap, flex-start, center);

				text {
					color: #7D7B89;
					font-size: 22rpx;
					font-family: Avanti;
					font-weight: bold;

					&:nth-child(2) {
						width: 2px;
						height: 17rpx;
						background: #B0B4BA;
						margin-left: 20rpx;
						margin-right: 24rpx;
					}
				}
			}
		}

		.header-edit {
			margin-right: 46rpx;
			display: flex;
			align-items: center;

			text {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #B0B4BA;
				margin-right: 10rpx;
			}

			image {
				width: 15px;
				height: 15px;
			}
		}
	}

	.header-address {
		display: flex;
		align-items: center;
		margin-left: 47rpx;
		margin-top: 50rpx;

		image {
			width: 26rpx;
			height: 26rpx;
			margin-right: 10rpx;
		}

		text {
			font-size: 22rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #7D7B89;
		}
	}

	.header-com-pro {
		display: flex;
		align-items: center;
		margin-left: 47rpx;
		margin-top: 30rpx;

		>view {
			display: flex;
			align-items: center;

			image {
				width: 26rpx;
				height: 26rpx;
				margin-right: 10rpx;
			}

			text {
				font-size: 22rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #7D7B89;
			}
		}
	}

	.frequency-statistics {
		margin: 58rpx 37rpx;
		height: 152rpx;
		background: #46B180;
		box-shadow: -2rpx 3rpx 22rpx 0px rgba(42, 55, 49, 0.12);
		border-radius: 16rpx;
		position: relative;

		.fs-bg {
			position: absolute;
			z-index: 4;
			left: 0;
			right: 0;
			top: 0;
			height: 100%;
		}

		.fs-number {
			position: absolute;
			z-index: 99;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			padding: 20rpx 20rpx 2rpx;
			@include boxsizing;
			@include flex-style(row, nowrap, space-between, center);

			>view {
				@include flex-style(column, nowrap, center, center);

				>text {
					&:first-child {
						font-size: 46rpx;
						font-family: DINPro;
						font-weight: bold;
						color: #FFFFFF;
					}

					&:last-child {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
					}
				}

				.sj-icon {
					@include flex-style(row, nowrap, center, center);

					text {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
					}

					image {
						width: 16rpx;
						height: 24rpx;
						margin-left: 10rpx;
					}
				}
			}
		}
	}

	.person-info {
		@include flex-style(row, nowrap, space-between, center);
		margin: 0 48rpx;

		>view {
			display: flex;
			align-items: center;
			height: 26rpx;
			line-height: 26rpx;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}

			text {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #7D7B89;
			}
		}
	}

	.action-box {
		margin-top: 60rpx;
		padding: 40rpx 47rpx 0;
		border-top: 24rpx solid #F5F6F7;

		.action-title {
			@include boxsizing;
			font-size: 38rpx;
			font-family: PingFang SC;
			font-weight: bold;
			padding-bottom: 34rpx;
			padding-left: 10rpx;
			border-bottom: 1px solid #F1F1F1;
			color: #000000;
		}

		.action-item {
			@include flex-style(row, nowrap, space-between, center);
			@include boxsizing;
			padding: 30rpx 10rpx 30rpx 22rpx;
			border-bottom: 1px solid #F1F1F1;

			// @include border-after(#F1F1F1);
			.action-item-left {
				@include flex-style(row, nowrap, flex-start, center);

				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 22rpx;
				}

				text {
					&:nth-child(2) {
						margin-right: 28rpx;
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: #414043;
					}

					&:nth-child(3) {
						font-size: 28rpx;
						font-family: Avanti;
						font-weight: bold;
						color: #9E9DA4;
					}
				}
			}

			.action-item-right {
				@include flex-style(row, nowrap, flex-emd, center);

				image {
					width: 14rpx;
					height: 22rpx;
				}

				.text {
					font-size: 21rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #C5C8D2;
					margin-right: 30rpx;
				}

				.date {
					font-size: 28rpx;
					font-family: Avanti;
					font-weight: bold;
					color: #9E9DA4;
					margin-right: 17rpx;
				}

				.btn1 {
					background: rgba(70, 177, 128, .2);
					border-radius: 16px;
					padding: 7rpx 14rpx;
					font-size: 21rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #46B180;
					margin-right: 14rpx;
				}

				.btn2 {
					background: rgba(249, 108, 94, .2);
					border-radius: 16px;
					padding: 7rpx 14rpx;
					font-size: 21rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #F96C5E;
					margin-right: 14rpx;
				}
			}
		}

		.login-out-btn {
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background: #FFFFFF;
			border: 1px solid #F0F0F0;
			border-radius: 8px;
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #414043;
			margin-top: 42rpx;
			margin-bottom: 28rpx;

			&::after {
				height: 0;
				border: 0;
			}
		}
	}
</style>
