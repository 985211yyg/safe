<template>
	<view>
		<view class="my-header-box">
			<view class="header-left">
				<view class="header-img">
					<image class="header-pic" src="../../static/mine/icon-mine-enterprise@2x.png" mode="widthFix">
					</image>
				</view>
				<view class="header-name">
					{{ cooperationUnitArr.company_name || '云南昆远睿方科技有限公司' }}
				</view>
			</view>
			<view class="header-edit">
				<text>编辑资料</text>
				<image src="../../static/mine/toicon.png"></image>
			</view>
		</view>
		<view class="header-personal">
			<view>
				<image src="../../static/mine/icon-mine-name@2x.png" mode="widthFix"></image>
				<text>{{ cooperationUnitArr.contacts || '川建国'}}</text>
			</view>
			<view>
				<image src="../../static/worker/icon-telephone@2x.png" mode="widthFix"></image>
				<text>{{cooperationUnitArr.contact_phone || '150125810214'}}</text>
			</view>
			<view></view>
		</view>
		<view class="heade-company-id">
			<image src="../../static/mine/icon-mine-socialID@2x.png"></image>
			<text>{{ cooperationUnitArr.uniform_social_credit_code || '915301005971461404'}}</text>
		</view>
		<view class="header-address">
			<image src="../../static/mine/icon-mine-address@2x.png"></image>
			<text>{{ cooperationUnitArr.address  || '云南省昆明市官渡区石家巷9号交科院2号楼'}}</text>
		</view>

		<view class="action-box">
			<view class="action-title">
				企业资料
			</view>
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
			<button class="login-out-btn" type="button" @click="onQuit">退出登录</button>
		</view>
		<u-modal v-model="showQuit" :content="content" confirm-text="退出" cancel-tex="点错了" @confirm="quit()"></u-modal>
	</view>
</template>

<script>
	import { getStorage } from '../../common/utils.js'
	export default {
		created () {
			this.cooperationUnitArr = getStorage("unitInfo")
		},
		data() {
			return {
				showQuit: false,
				content: '确定退出应用？',
				//个人资料action
				personalArr: [{
						leftImg: "../../static/mine/icon-mine-license@2x.png",
						leftTitle: "营业执照",
						num: "2",
						rightText: "",
						rightDate: "",
						rightBtn1: "",
						rightBtn2: "",
						showIcon: true
					},
					{
						leftImg: "../../static/mine/icon-mine-safety @2x.png",
						leftTitle: "安全生产许可证",
						num: "2",
						rightText: "",
						rightDate: "",
						rightBtn1: "",
						rightBtn2: "",
						showIcon: true
					},
					{
						leftImg: "../../static/mine/icon-mine-construction@2x.png",
						leftTitle: "施工资质",
						num: "2",
						rightText: "",
						rightDate: "",
						rightBtn1: "",
						rightBtn2: "即将到期",
						showIcon: true
					},
					{
						leftImg: "../../static/mine/icon-mine-qualifications@2x.png",
						leftTitle: "其他资质",
						num: "2",
						rightText: "未上传",
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
				cooperationUnitArr: null
			};
		},
		onLoad() {

		},
		methods: {
			viewIllegal() {
				this.$navigateTo("../illegal_record/illegal-list")
			},
			onQuit(){
			this.showQuit=true;	
			},
			quit() {
				this.showQuit=false;	
				this.$reLogin
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
			width: 60rpx;
			height: 60rpx;
			margin-right: 11rpx;

			.header-pic {
				width: 100%;
				height: 100%;
			}

		}

		.header-name {
			display: flex;
			align-items: center;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: bold;
			text-overflow: ellipsis;
			color: #000000;

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

	.header-personal {
		display: flex;
		justify-content: space-around;
		margin-left: 43rpx;
		margin-top: 15rpx;

		>view {
			display: flex;
			flex-grow: 1;
			align-items: center;
			justify-content: flex-start;

			image {
				width: 30rpx;
				height: 30rpx;
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



	.heade-company-id {
		display: flex;
		align-items: center;
		margin-left: 43rpx;
		margin-top: 29rpx;

		image {
			width: 26rpx;
			height: 26rpx;
			margin-right: 10rpx;
		}

		text {
			font-size: 22rpx;
			font-family: Avanti;
			font-weight: bold;
			color: #7D7B89;
		}
	}

	.header-address {
		display: flex;
		align-items: center;
		margin-left: 43rpx;
		margin-top: 29rpx;

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
