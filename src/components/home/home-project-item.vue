<template>
	<view class="home_projcet_item">
		<view class="home_projcet_item_title">
			<view class="tag">重要</view>
			<view class="name">楚姚高速隧道机电项目</view>
			<view style="flex-grow: 1;"></view>
			<u-icon name="arrow-right" color="#C8CBD4" size="20"></u-icon>
		</view>
		<view class="home_projcet_item_content">
			<view class="item group">
				<image src="../../static/home/icon-team@2x.png" style="width: 30rpx;height: 30rpx;margin-right: 6rpx;">
				</image>
				<view class="name">班组</view>
				<view class="content">4</view>
			</view>
			<view class="item member">
				<image src="../../static/home/icon-team@2x.png" style="width: 30rpx;height: 30rpx;margin-right: 6rpx;">
				</image>
				<view class="name">班组</view>
				<view class="content">4</view>
			</view>
			<view class="item risk">
				<image src="../../static/home/icon-team@2x.png" style="width: 30rpx;height: 30rpx;margin-right: 6rpx;">
				</image>
				<view class="name">班组</view>
				<view class="content">4</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "home-project-item",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.home_projcet_item {
		padding-top: 39rpx;
		padding-bottom: 26rpx;
		margin: 0 44rpx;
		display: flex;
		flex-direction: column;
		border-bottom: 1px #F5F6F9 solid;
		border-top: 1px #F5F6F9 solid;

		.home_projcet_item_title {
			width: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.tag {
				width: 60rpx;
				height: 30rpx;
				margin-right: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: red;
				font-size: 18rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #F96C5E;
				border-radius: 4px;
				background-color: #FEE9E7;
			}

			.name {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #414043;
			}
		}

		.home_projcet_item_content {
			display: flex;
			flex-direction: row;
			margin-top: 36rpx;
			padding: 0;
			justify-content: space-between;

			.item {
				flex-flow: 1;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;

				.name {
					font-size: 22rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #7D7B89;
					margin-right: 13rpx;
					line-height: 50px;
				}

				.content {
					font-size: 22rpx;
					font-family: Avanti;
					font-weight: bold;
					color: #7D7B89;
					line-height: 50px;
				}
			}
		}


	}
</style>
