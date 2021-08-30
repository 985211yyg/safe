<template>
	<view class="register_content">
		<u-navbar title="个人信息" :title-bold="true" title-color="#000"></u-navbar>
		</custom-nav-bar>
		<custom-status-bar :topSpace="84"></custom-status-bar>
		<view class="register_content_avatar"></view>
		<view class="register_content_card">
			<view class="register_content_name">徐建江</view>
			<view class="register_content_conpany">智能交通分公司</view>
			<image class="register_content_qr" src="/static/five/code.png"></image>
			<view class="register_content_bottom_action">
				<view class="register_content_bottom_action_other" @click="report4Other()">代他人填报</view>
				<view class="register_content_bottom_action_divider"></view>
				<view class="register_content_bottom_action_mine" @click="go2MineInfo()">我的个人信息</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			report4Other() {
				uni.navigateTo({
					url: "../../record_info/base_info"
				})


			},

			go2MineInfo() {

			}



		}
	}
</script>

<style lang="scss">
	.register_content {
		background-color: #F5F5F5;
		height: 100vh;
		width: 100vw;
		//图片
		// background-image: url('/static/five/code.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		//组件居中
		display: flex;
		justify-content: center;

		.register_content_avatar {
			width: 150rpx;
			height: 150rpx;
			margin-top: 240rpx;
			border: 6px solid #FFFFFF;
			border-radius: 100rpx;
			position: absolute;
			background-color: red;
			z-index: 500;
		}

		.register_content_card {
			margin-top: 324rpx;
			background-color: red;
			position: absolute;
			width: 550rpx;
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: top;
			align-items: center;
			border-radius: 8rpx;



			.register_content_name {
				margin-top: 70rpx;
				margin-bottom: 33rpx;
				font-size: 43rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #000000;

			}


			.register_content_conpany {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #7D7B89;

			}


			.register_content_qr {
				width: 356rpx;
				height: 356rpx;
				margin: 60rpx 0;
			}

			.register_content_bottom_action {
				display: flex;
				flex-direction: row;
				justify-content: center;
				margin-bottom: 57rpx;
				align-items: center;

				.register_content_bottom_action_other {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #46B180;
				}

				.register_content_bottom_action_divider {
					height: 23rpx;
					width: 2rpx;
					margin: 0 33rpx;
					background: #CCCCCC;


				}

				.register_content_bottom_action_mine {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #46B180;
				}
			}

		}

	}
</style>
