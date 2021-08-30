<template>
	<view>
		<custom-nav-bar title="待审核工人">
			<!-- <five-person-search @search="searchSignPerson"></five-person-search> -->
		</custom-nav-bar>
		<custom-status-bar :topSpace="34"></custom-status-bar>
		<view class="person-list-box">
			<five-item-box padding="33rpx 26rpx">
				<view class="exam-worker">
					<five-radio @change="selectAllPerson">全选</five-radio>
					<view class="exam-status">
						<text>通过</text>
						<text>不通过</text>
					</view>
				</view>
			</five-item-box>
			<five-item-box padding="32rpx 24rpx" marginTop="24rpx">
				<view>
					<view class="person-classify-title">
						普工
					</view>
					<view class="person-item" v-for="(item,index) in 4" :key="index">
						<five-radio marginLeft="27rpx">
							<view class="person-info">
								<view class="person-header">
									<image src="../../static/five/add.png" mode="aspectFit"></image>
								</view>
								<text>上三</text>
							</view>
						</five-radio>
					</view>
				</view>
			</five-item-box>
			<five-item-box padding="32rpx 24rpx" marginTop="24rpx">
				<view>
					<view class="person-classify-title">
						特种工
					</view>
					<view class="person-item" v-for="(item,index) in 4" :key="index">
						<five-radio marginLeft="27rpx">
							<view class="person-info">
								<view class="person-header">
									<image src="../../static/five/add.png" mode="aspectFit"></image>
								</view>
								<text>上三</text>
							</view>
						</five-radio>
					</view>
				</view>
			</five-item-box>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			searchSignPerson(e){
				
			},
			selectAllPerson(){
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F6F9;
	}
	.person-list-box{
		@include boxsizing;
		padding: 24rpx 24rpx 80rpx;
		.exam-worker{
			@include flex-style(row,nowrap,space-between,center);
			.exam-status{
				text{
					text-align: center;
					display: inline-block;
					width: 125rpx;
					height: 45rpx;
					line-height: 45rpx;
					background: #FFFFFF;
					border: 1px solid #46B180;
					border-radius: 8px;
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #46B180;
					&:last-child{
						margin-left: 20rpx;
						border-color: #F96C5E;
						color: #F96C5E;
					}
				}
			}
		}
	}
	.person-classify-title{
		font-size: 34rpx;
		font-family: $font_family;
		font-weight: 500;
		color: #000000;
		padding-bottom: 27rpx;
		padding-left: 7rpx;
		margin-bottom: 9rpx;
		@include boxsizing;
		@include border-after(#F1F1F1);
	}
	.person-item{
		@include boxsizing;
		@include border-after(#F1F1F1);
		padding: 20rpx 0;
		.person-info{
			@include flex-style(row,nowrap,flex-start,center);
			.person-header{
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 27rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			text{
				@include default-font-style;
			}
		}
	}
</style>
