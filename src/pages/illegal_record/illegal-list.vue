<template>
	<view>
		<custom-nav-bar title="违规记录"></custom-nav-bar>
		<custom-status-bar :topSpace="44"></custom-status-bar>
		<view>
			<five-item-box marginTop="24rpx" marginBottom="0" padding="32rpx 27rpx 0" v-for="(item,index) in 10" :key="index">
				<view class="illegal-item">
					<view class="flex-style item-time">
						<view>
							<text class="label">违规时间</text>
							<text class="val">2021-06-12</text>
						</view>
						<view>
							<text class="label">记录人员</text>
							<text class="val">张江</text>
						</view>
					</view>
					<view class="flex-style">
						<text class="label">记录地点</text>
						<text class="val">云南省昆明市官渡区石家巷9号交科院2号楼</text>
					</view>
					<view class="flex-style">
						<text class="label">记录地点</text>
						<text class="val">
							在施工区域内未佩戴安全帽，并且高风险作业施工防护不足，严重规范安全规范条例。
						</text>
					</view>
					<view class="flex-style item-img">
						<text class="label">记录地点</text>
						<scroll-view class="sign-phone-list" scroll-x="true" :scroll-with-animation="true">
							<view class="phone-list-item-box" v-for="(item,index) in 10" :key="index">
								<view class="phone-list-item">
									<image src="../../static/five/bg-signin@2x.png" mode="aspectFill"></image>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</five-item-box>
			<custom-loading :title="loadingText"></custom-loading>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				pageSize:6,
				listData:[],
				loadingText:"正在加载数据···"
			};
		},
		onReachBottom: function() {
			this.getIllegalList()
		},
		onPullDownRefresh: function() {
			this.refreshList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods:{
			refreshList() {
				this.page = 1;
				this.loadingText = "上拉加载更多..."
				this.listData = [];//清空数据
				this.getIllegalList()
			},
			getIllegalList(){}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F6F9;
		padding: 0 24rpx;
		@include boxsizing;
	}
	.illegal-item{
		.flex-style{
			@include flex-style(row,nowrap,space-between,flex-start);
			@include boxsizing;
			margin-bottom: 48rpx;
			.label{
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #7D7B89;
				margin-right: 33rpx;
			}
			.val{
				flex: 1;
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #414043;
			}
		}
		.item-time{
			>view{
				@include boxsizing;
				@include flex-style(row,nowrap,space-between,center);
				&:last-child{
					justify-content: flex-end;
				}
			}
		}
		.item-img{
			margin-top: -28rpx;
			flex-direction: column;
			justify-content: flex-start;
			padding-bottom: 28rpx;
			margin-bottom: 0;
			.sign-phone-list{
				height: 170rpx;
				@include boxsizing;
				white-space: nowrap; 
				.phone-list-item-box{
					height: 160rpx;
					width: 147rpx;
					position: relative;
					overflow: visible;
					display: inline-block;
					@include boxsizing;
					margin-right: 23rpx;
					&:last-child{
						margin-right:0;
					}
					.phone-list-item{
						margin-top: 20rpx;
						display: inline-block;
						width: 147rpx;
						height: 144rpx;
						border-radius: 10rpx;
						overflow: hidden;
						@include boxsizing;
						image{
							width: 100%;
						}
					}
				}
			}
		}
	}
</style>
