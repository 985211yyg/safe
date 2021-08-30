<template>
	<view>
		<custom-nav-bar title="个人二维码"></custom-nav-bar>
		<view class="root-content">
			<image class="bg-img" src="../../../static/register/bg-code-show@2x.png" mode="scaleToFill"></image>
			<view class="register_content">
				<view class="register_content_avatar"></view>
				<view class="register_content_card">
					<view class="register_content_name">yyg</view>
					<view class="register_content_conpany">智能交通分公司</view>
					<image class="register_content_qr" src="../../../static/five/code.png"></image>
					<view class="register_content_bottom_action">
						<view class="register_content_bottom_action_other" @click="report4Other()">代他人填报</view>
						<view class="register_content_bottom_action_divider"></view>
						<view class="register_content_bottom_action_mine" @click="go2MineInfo()">我的个人信息</view>
					</view>
				</view>
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
	.root-content {
		display: flex;
		position: relative;
		overflow: hidden;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;

		.bg-img {
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			position: absolute;
			width: 100vw;
			height: 100vh;
		}

		.register_content {
			width: 100%;
			height: 100%;
			padding-top: 224rpx;
			display: flex;
			justify-content: center;

			.register_content_avatar {
				width: 150rpx;
				height: 150rpx;
				margin-top: 125rpx;
				border: 6px solid #FFFFFF;
				border-radius: 100rpx;
				position: absolute;
				background-color: white;
				z-index: 500;
				background-image: url(../../../static/announement/icon-notice-train.png);
			}

			.register_content_card {
				margin-top: 224rpx;
				background-color: white;
				position: absolute;
				width: 550rpx;
				background: white;
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
	}
</style>
