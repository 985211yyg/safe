<template>
	<view>
		<custom-nav-bar title="通知公告">
			<view class="selected-box">
				<view class="time-left" @click="timeShow = true">
					<view class="left-icon">
						<image src="../static/five/icon-calendar@2x.png" class="time-img"></image>
					</view>
					<view class="content">
						{{ screening.time }}
					</view>
					<u-picker v-model="timeShow" mode="time" :params="params" @confirm="confirmTime"></u-picker>
				</view>
				<view class="type-right" @click="typeShow = true">
					<view class="content">
						{{ screening.type }}
					</view>
					<view class="right-icon">
						<image src="../static/mine/actionicon.png" class="time-img"></image>
					</view>
					<u-picker v-model="typeShow" mode="selector" :range="selector" @confirm="confirmType"></u-picker>
				</view>
			</view>
		</custom-nav-bar>
		
		<custom-status-bar :topSpace="105"></custom-status-bar>
		
		<view class="list">
			<view class="list-item" v-for="item in 10" :key="item" @click="tapViewDetail">
				<view class="title">
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
						<view class="dot"></view>
					</view>
				</view>
				<view class="text">
					有一条新的安全知识学习，请尽快学习！
				</view>
				<view class="from">
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
		</view>
		
		<custom-loading title="没有更多了"></custom-loading>
	</view>
</template>

<script>
	import { getStorage } from '../common/utils.js'
	export default {
		created () {
			this.getNoticeList()
			let userInfo = getStorage('userInfo')
			console.log(userInfo)
		},
		data() {
			return {
				timeShow:false,
				typeShow:false,
				params: {
					year: true,
					month: true,
					day: true
				},
				selector: ['安全知识学习', '岗前五分钟提醒', '安全处罚通知', '奖励通知'],
				screening: {
					time: '选择时间',
					type: '选择分类'
				},
				params: {
					current: 1,
					pageSize: 10
				}
			}
		},
		methods:{
			getNoticeList () {
				new this.$Api().request('notice', 'GET' ,{ page: this.params.current, size: this.params.pageSize, userid: getStorage('userInfo').user_id}).then(res => {
					console.log(res)
				})
			},
			confirmTime (time) {
				const { year, month, day } = time
				this.screening.time = `${year}-${month}-${day}`
			},
			confirmType (type) {
				this.screening.type = this.selector[type]
			},
			tapViewDetail () {
				uni.navigateTo({
					url: '/pageA/announcementDetail'
				})
			}
		},
		onReachBottom() {
			this.params.current++
			this.params.pageSize += 10
			console.log(this.params)
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5;
		
		.selected-box {
			height: 106rpx;
			padding: 18rpx 24rpx;
			@include flex-style(row,nowrap,space-between,center)
			
			.time-left {
				height: 70rpx;
				width: 342rpx;
				border: 1px solid #F1F1F1;
				border-radius: 10rpx;
				@include flex-style(row,nowrap,center,center)
				
				.left-icon {
					height: 100%;
					width: 84rpx;
					background:#F5F5F5;
					@include flex-style(row,nowrap,center,center)
					
					.time-img {
						width: 36rpx;
						height: 36rpx;
					}
				}
				
				.content {
					width: 258rpx;
					@include flex-style(row,nowrap,center,center);
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #7D7B89;
				}
			}
			
			.type-right {
				height: 70rpx;
				width: 342rpx;
				border: 1px solid #F1F1F1;
				border-radius: 10rpx;
				@include flex-style(row,nowrap,center,center)
				
				.content {
					width: 258rpx;
					@include flex-style(row,nowrap,center,center);
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #7D7B89;
				}
				
				.right-icon {
					height: 100%;
					width: 84rpx;
					@include flex-style(row,nowrap,center,center)
					
					.time-img {
						width: 12rpx;
						height: 18rpx;
					}
				}
			}
		}
		
		.list {
			margin: 24rpx;
			
			.list-item {
				height: 272rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				margin-bottom: 24rpx;
				padding: 0 25rpx;
				
				.title {
					height: 120rpx;
					@include flex-style(row,nowrap,flex-start,center)
					
					.item-icon {
						width:64rpx;
						height: 64rpx;
					}
					
					.title-name {
						flex: 16;
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
						flex: 4;
						@include flex-style(row,nowrap,flex-end,center)
						
						.dot {
							width: 14rpx;
							height: 14rpx;
							background: #F96C5E;
							border-radius: 50%;
						}
					}
				}
				
				.text {
					height: 77rpx;
					box-sizing: border-box;
					border-bottom: 1px solid #F5F5F5;
					@include flex-style(row,nowrap,flex-start,center);
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #7D7B89;
				}
				
				.from {
					height: 75rpx;
					@include flex-style(row,nowrap,space-between,center)
					
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
		}
	}
</style>
