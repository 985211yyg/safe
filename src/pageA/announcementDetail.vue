<template>
	<view>
		<custom-nav-bar title="通知公告" :border="border"></custom-nav-bar>
		<custom-status-bar :topSpace="44"></custom-status-bar>
		
		<view class="content">
			<view class="content-top">
				<view class="top-title">
					<image src="../static/announement/icon-notice-study.png" class="item-icon"></image>
					<view class="title-name">
						<view class="desc">
							安全知识学习
						</view>
						<view class="time">
							2021-04-12  09:30
						</view>
					</view>
					<view class="more">
						<view class="dot">
							<image src="../static/announement/icon-read.png" class="corect"></image>
							<text class="read">标记为已读</text>
						</view>
					</view>
				</view>
				<view class="top-from">
					<view class="from-left">
						<image src="../static/announement/icon-source.png" class="icon"></image>
						<text class="grap">来源</text>
						<text>张江</text>
					</view>
					<view class="from-right">
						<image src="../static/announement/icon-deadline.png" class="icon"></image>
						<text class="grap">截止日期</text>
						<text>2021-04-16</text>
					</view>
				</view>
			</view>
			<view class="content-bottom" v-html="content"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				border: true,
				content: `有一条新的安全知识学习，请尽快学习！有一条新的安全知识学习，请尽快学习！有一条新的安全知识学习，请尽快学习！有一条新的安全知识学习，
				          请尽快学习！有一条新的安全知识学习，请尽快学习！有一条新的安全知识学习，请尽快学习！有一条新的安全知识学习，请尽快学习！</br>
						  有一条新的安全知识学习，请尽快学习！有一条新的安全知识学习，请尽快学习！有一条新的安全知识学习，请尽快学习！有一条新的安全知识学习，
						  请尽快学习！有一条新的安全知识学习，请尽快学习！有一条新的安全知识学习，请尽快学习！有一条新的安全知识学习，请尽快学习！`
			};
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFF;
		
		.content {
			margin: 46rpx;
			
			.content-top {
				
				.top-title {
					height: 120rpx;
					@include flex-style(row,nowrap,flex-start,center)
						
					.item-icon {
						width:64rpx;
						height: 64rpx;
					}
						
					.title-name {
						flex: 14;
						padding-left: 20rpx;
							
						.desc {
							font-size: 30rpx;
							font-family: Source Han Sans CN;
							font-weight: 500;
							color: #414043;
						}
							
						.time {
							font-size: 16rpx;
							font-family: Avanti;
							font-weight: bold;
							color: #C5C8D2;
						}
					}
						
					.more {
						flex: 6;
						@include flex-style(row,nowrap,flex-end,center)
							
						.dot {
							width: 176Rpx;
							height: 60Rpx;
							background: #FFFFFF;
							border: 1px solid #F0F0F0;
							border-radius: 6rpx;
							@include flex-style(row,nowrap,center,center)
							
							.corect {
								width:30rpx;
								height:30rpx;
								margin-right:8rpx;
							}
							
							.read {
								font-size: 24rpx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #7D7B89;
							}
						}
						
					}
				}
				
				.top-from {
					height: 75rpx;
					@include flex-style(row,nowrap,space-between,center);
					border-bottom: 1px solid #F5F5F5;
					
					.from-left {
						@include flex-style(row,nowrap,center,center);
						font-size: 22rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #7D7B89;
						
						.icon {
							width:30rpx;
							height: 30rpx;
						}
						
						.grap {
							margin: 0 10rpx;
						}
					}
					
					.from-right {
						@include flex-style(row,nowrap,center,center);
						font-size: 22rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #7D7B89;
						
						.icon {
							width:30rpx;
							height: 30rpx;
						}
						
						.grap {
							margin: 0 10rpx;
						}
					}
				}
			}
			
			.content-bottom {
				margin-top: 46rpx;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #7D7B89;
			}
		}
	}
</style>
