<template>
	<view>
		<custom-nav-bar title="岗前五分钟">
			<five-time-search @selectTime="getSelectTimeSearch"></five-time-search>
		</custom-nav-bar>
		<custom-status-bar :topSpace="106"></custom-status-bar>
		<view class="change-tab-bar">
			<button :class="[currentIndex==index ? 'active':'']" type="button" v-for="(item,index) in tabList"
				:key="index" @tap="changeTab(item,index)">{{item.name}}</button>
		</view>
		<view class="left-right-space">
			<five-item-box padding="25rpx 33rpx 37rpx" marginTop="26rpx" v-for="(item,index) in 10" :key="index"
				@tap="ToDetail(item)">
				<view>
					<view class="company-name">
						<image v-if="tabType==1" src="../../static/five/cpmpany.png"></image>
						<image v-if="tabType==2" src="../../static/five/icon-construction-item@2x.png"></image>
						<text>智能交通分公司</text>
					</view>
					<view class="complate-process">
						<cmd-progress width="64" stroke-width="10" stroke-color="#46B180" gap-position="right"
							type="circle" :percent="75"></cmd-progress>
						<view class="complate-process-item">
							<view class="item-top">
								<text></text>
								<text>已上报</text>
							</view>
							<text class="item-bottom">120</text>
						</view>
						<view class="complate-process-item">
							<view class="item-top">
								<text class="bg1"></text>
								<text>已上报</text>
							</view>
							<text class="item-bottom">120</text>
						</view>
						<view class="complate-process-item">
							<view class="item-top">
								<text class="bg2"></text>
								<text>已上报</text>
							</view>
							<text class="item-bottom">120</text>
						</view>
					</view>
					<view class="project-person-warn" v-if="tabType==2">
						<view class="person-warn-item">
							<image src="../../static/five/shuren.png" mode="aspectFit"></image>
							<text>班组</text>
							<text>4</text>
						</view>
						<view class="person-warn-item">
							<image src="../../static/five/icon-workerNum@2x.png" mode="aspectFit"></image>
							<text>人员</text>
							<text>4</text>
						</view>
						<view class="person-warn-item">
							<image src="../../static/five/icon-risk-source@2x.png" mode="aspectFit"></image>
							<text>风险</text>
							<text>4</text>
						</view>
					</view>
				</view>
			</five-item-box>
		</view>
		<custom-loading :title="loadingText"></custom-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				page: 1,
				pageSize: 6,
				loadingText: "正在加载数据···",
				tabList: [{
					name: "按公司",
					id: 1
				}, {
					name: "按项目",
					id: 2
				}],
				tabType: 1
			};
		},
		onLoad() {

		},
		onReachBottom: function() {
			this.getCompanyProjectList()
		},
		onPullDownRefresh: function() {
			this.refreshList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			refreshList() {
				this.page = 1;
				this.loadingText = "上拉加载更多..."
				this.listData = []; //清空数据
				this.getCompanyProjectList()
			},
			getSelectTimeSearch(e) {},
			changeTab(item, index) {
				this.currentIndex = index
				this.tabType = item.id
			},
			getCompanyProjectList() {},
			ToDetail(item) {
				this.$navigateTo(`./five-company-project-detail?item=${JSON.stringify(item)}&type=${this.tabType}`)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F6F9;
	}

	.change-tab-bar {
		@include boxsizing;
		@include flex-style(row, nowrap, center, center);
		margin-top: 25rpx;

		button {
			width: 216rpx;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			border: 1px solid #46B180;
			background: rgba(70, 177, 128, 0.1);
			margin: 0;
			padding: 0;
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #46B180;

			&:first-child {
				border-radius: 35px 0 0 35px;
				border-right: 0;
			}

			&:last-child {
				border-radius: 0 35px 35px 0;
				border-left: 0;
			}

			&.active {
				background-color: #46B180;
				border: 0;
				font-size: 30rpx;
				color: #FFFFFF;
			}

			&::before {
				height: 0;
				border: 0;
			}

			&::after {
				height: 0;
				border: 0;
			}
		}
	}

	.company-name {
		@include flex-style(row, nowrap, flex-start, center);
		margin-bottom: 38rpx;

		image {
			width: 44rpx;
			height: 44rpx;
		}

		text {
			font-size: 32rpx;
			font-family: $font_family;
			font-weight: 500;
			color: $val_color;
			margin-left: 22rpx;
		}
	}

	.complate-process {
		@include flex-style(row, nowrap, space-between, center);

		.complate-process-item {
			@include flex-style(column, nowrap, center, center);

			.item-top {
				@include flex-style(row, nowrap, flex-start, center);
				height: 22rpx;
				line-height: 22rpx;

				text {
					&:first-child {
						width: 12rpx;
						height: 12rpx;
						border-radius: 50%;
						background-color: #46B180;
						margin-right: 11rpx;
					}

					&:last-child {
						font-size: 22rpx;
						font-family: $font_family;
						font-weight: 400;
						color: #7D7B89;
					}
				}

				.bg1 {
					background-color: #F96C5E;
				}

				.bg2 {
					background-color: #FDA002;
				}
			}

			.item-bottom {
				height: 32rpx;
				line-height: 32rpx;
				font-size: 32rpx;
				font-family: Avanti;
				font-weight: bold;
				color: $val_color;
				margin-top: 21rpx;
			}
		}
	}

	.project-person-warn {
		@include flex-style(row, nowrap, space-between, center);
		margin-top: 45rpx;

		.person-warn-item {
			@include flex-style(row, nowrap, space-between, center);
			height: 22rpx;
			line-height: 22rpx;

			image {
				width: 22rpx;
				height: 22rpx;
				margin-right: 10rpx;
			}

			text {
				font-size: 22rpx;

				&:nth-child(2) {
					font-family: $font_family;
					font-weight: 400;
					color: #7D7B89;
					margin-right: 13rpx;
				}

				&:nth-child(3) {
					font-family: Avanti;
					font-weight: bold;
					color: #7D7B89;
				}
			}
		}
	}
</style>
