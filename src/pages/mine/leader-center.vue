<template>
	<view>
		<view class="my-header-box">
			<view class="header-img">
				<image class="header-pic" src="../../static/five/code.png" mode="widthFix"></image>
				<image class="header-sex" src="../../static/mine/icon-male@2x.png" mode="widthFix"></image>
			</view>
			<view class="header-info">
				<view class="name-item">
					<text>徐建江</text>
					<text>普工</text>
				</view>
				<view class="header-com-pro">
					<view>
						<image src="../../static/mine/icon-mine-company@2x.png"></image>
						<text>智能交通分公司</text>
					</view>
					<view>
						<image src="../../static/mine/icon-mine-project@2x.png" mode=""></image>
						<text>安全管理部</text>
					</view>
					<view></view>
				</view>
			</view>

		</view>

		<view class="frequency-statistics">
			<view>
				<text class="safe-count">158</text>
				<text class="title">已参与安全检查</text>
			</view>
			<view class="divider">
				<view style="width: 1px;height: 65rpx;background: #F1F1F1;"></view>
			</view>
			<view>
				<text class="project-count">158</text>
				<text class="title">已参与工程项目</text>
			</view>

		</view>

		<view class="action-box">

			<view class="action-item-box">
				<view class="action-item" v-for="(item,index) in personalArr" :key="index">
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
			<button class="login-out-btn" type="button">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//个人资料action
				personalArr: [{
						leftImg: "../../static/mine/icon-mine-share@2x.png",
						leftTitle: "分享",
						num: "2",
						rightText: "",
						rightDate: "",
						rightBtn1: "",
						rightBtn2: "",
						showIcon: true
					},
					{
						leftImg: "../../static/mine/icon-mine-opinion@2x.png",
						leftTitle: "反馈意见",
						num: "2",
						rightText: "",
						rightDate: "",
						rightBtn1: "",
						rightBtn2: "",
						showIcon: true
					},
					{
						leftImg: "../../static/mine/icon-mine-edition@2x.png",
						leftTitle: "版本日志",
						num: "2",
						rightText: "",
						rightDate: "",
						rightBtn1: "",
						rightBtn2: "V1.0.1",
						showIcon: false
					},
					{
						leftImg: "../../static/mine/icon-mine-update@2x.png",
						leftTitle: "检查更新",
						num: "2",
						rightText: "",
						rightDate: "",
						rightBtn1: "",
						rightBtn2: "",
						showIcon: true
					},
					// {leftImg:"../../static/mine/icon-mine-examination@2x.png",leftTitle:"体检报告",num:"2",rightText:"",rightDate:"2021-06-05",rightBtn1:"的都是",rightBtn2:"",showIcon:false},
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
		onLoad() {

		},
		methods: {
			viewIllegal() {
				this.$navigateTo("../illegal_record/illegal-list")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-header-box {
		@include flex-style(row, nowrap, flex-start, center);
		@include boxsizing;

		.header-img {
			margin-left: 37rpx;
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

		.header-info {
			flex-grow: 1;
			border: red;
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

			.header-com-pro {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				margin-top: 30rpx;

				>view {
					display: flex;
					flex-grow: 1;
					align-items: center;

					image {
						width: 26rpx;
						height: 26rpx;
						margin-right: 9rpx;
					}

					text {
						text-overflow: ellipsis;
						font-size: 22rpx;
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: #7D7B89;
					}
				}
			}


		}

	}



	.frequency-statistics {
		margin: 49rpx 0;
		@include flex-style(row, nowrap, space-between, center);

		view {
			flex-grow: 2;
			@include flex-style(column, nowrap, center, center);



			.safe-count {
				font-size: 48rpx;
				font-family: DINPro;
				font-weight: bold;
				color: #01B0FD;
				line-height: 50rpx;
			}

			.project-count {
				font-size: 48rpx;
				font-family: DINPro;
				font-weight: bold;
				color: #9781EC;
				line-height: 50rpx;
			}

			.title {
				margin-top: 23rpx;
				font-size: 25rpx;
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
