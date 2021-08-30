<template>
	<view>
		<five-item-box padding="31rpx 25rpx" :marginTop="marginTop" :marginBottom="marginBottom">
			<view class="five-history-item">
				<image class="right-status" src="../../static/five/icon-dial@2x.png"></image>
				<!-- <image src="../../static/five/img-state-notReported@2x.png"></image> -->
				<view class="history-item-title">
					<image src="../../static/five/img-state-checkedIn@2x.png"></image>
					<text>楚姚高速隧道机电项目</text>
				</view>
				<view class="history-item">
					<image src="../../static/five/icon-train-time@2x.png"></image>
					<text>交底时间</text>
					<text class="time">2021-04-12  09:00:30</text>
				</view>
				<view class="history-item top-space">
					<image src="../../static/five/icon-belong-project@2x.png"></image>
					<text>所属项目</text>
					<text>楚姚高速隧道机电项目</text>
				</view>
				<view class="history-item top-space">
					<image src="../../static/five/icon-address@2x.png"></image>
					<text>施工地点</text>
					<text>楚姚高速隧道机电项目</text>
				</view>
				<view class="porc-bottom-item top-space">
					<view class="porc-item">
						<image src="../../static/five/icon-workerNum@2x.png"></image>
						<text>施工人数</text>
						<text>20</text>
						<text>个</text>
					</view>
					<view class="porc-item">
						<image src="../../static/five/icon-procedure@2x.png"></image>
						<text>作业工序</text>
						<text>20</text>
						<text>个</text>
					</view>
					<view class="porc-item">
						<image src="/static/cooperation%20unit/icon-risk.png"></image>
						<text>风险源</text>
						<text>20</text>
						<text>个</text>
					</view>
				</view>
			</view>
		</five-item-box>
	</view>
</template>

<script>
	export default{
		name:"five-porc-item",
		props:{
			marginTop:{
				type:String,
				default:"23rpx"
			},
			marginBottom:{
				type:String,
				default:"0"
			}
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.five-history-item{
		position: relative;
		.right-status{
			position: absolute;
			z-index: 99;
			right: 0;
			top: -4rpx;
			width: 46rpx;
			height: 46rpx;
		}
		.history-item-title{
			@include flex-style(row,nowrap,flex-style,center);
			margin-bottom: 35rpx;
			image{
				width: 77rpx;
				height: 31rpx;
			}
			text{
				font-size: 32rpx;
				font-family: $font_family;
				font-weight: 500;
				color: $val_color;
				margin-left: 16rpx;
				height: 30rpx;
				line-height: 30rpx;
			}
		}
		.history-item{
			@include flex-style(row,nowrap,flex-style,center);
			@include boxsizing;
			image{
				width: 30rpx;
				height: 30rpx;
			}
			text{
				height: 22rpx;
				line-height: 22rpx;
				font-size: 22rpx;
				font-weight: 400;
				font-family: $font_family;
				&:nth-child(2){
					color: #7D7B89;
					margin-left: 7rpx;
				}
				&:nth-child(3){
					color: $val_color;
					margin-left: 25rpx;
				}
				&.time{
					font-size: 26rpx;
					font-family: Avanti;
					font-weight: bold;
					color: #7D7B89;
				}
			}
		}
		.top-space{
			margin-top: 27rpx;
		}
		.porc-bottom-item{
			@include flex-style(row,nowrap,space-between,center)
			.porc-item{
				@include flex-style(row,nowrap,flex-start,center);
				image{
					width: 30rpx;
					height: 30rpx;
				}
				text{
					font-size: 22rpx;
					font-weight: 400;
					color: $val_color;
					&:nth-child(2){
						font-family: $font_family;
						color: #7D7B89;
						margin-left: 7rpx;
					}
					&:nth-child(3){
						font-family: Avanti;
						font-weight: bold;
						margin-left: 25rpx;
					}
					&:nth-child(4){
						font-family: $font_family;
						margin-left: 6rpx;
					}
				}
			}
		}
	}
</style>
