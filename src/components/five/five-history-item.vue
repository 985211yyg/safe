<template>
	<view>
		<five-item-box padding="31rpx 25rpx" :marginTop="marginTop" :marginBottom="marginBottom" @tap="boxTapEvent">
			<view class="five-history-item">
				<image v-if="hasRightIcon" class="right-status" :src="rightIcon"></image>
				<view class="history-item-title">
					<image :src="leftIcon"></image>
					<text>楚姚高速隧道机电项目</text>
				</view>
				<view class="history-item">
					<image src="../../static/five/icon-train-time@2x.png"></image>
					<text class="time">2021-04-12  09:00:30</text>
				</view>
				<view class="history-item top-space">
					<image src="../../static/five/icon-address@2x.png"></image>
					<text>楚姚高速隧道机电项目</text>
				</view>
			</view>
		</five-item-box>
	</view>
</template>

<script>
	export default{
		name:"five-history-item",
		props:{
			marginTop:{
				type:String,
				default:"23rpx"
			},
			marginBottom:{
				type:String,
				default:"0"
			},
			hasRightIcon:{
				type:Boolean,
				default:true
			},
			item:{
				type:Object,
				default:()=>{}
			},
			leftIcon:{
				type:String,
				default:"../../static/five/img-state-checkedIn@2x.png"
			},
			rightIcon:{
				type:String,
				default:"../../static/five/img-notPass@2x.png"
			}
		},
		methods:{
			boxTapEvent(){
				this.$emit("viewDetail")
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
			right: -25rpx;
			top: -31rpx;
			width: 113rpx;
			height: 113rpx;
		}
		.history-item-title{
			@include flex-style(row,nowrap,flex-style,center);
			margin-bottom: 53rpx;
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
			padding-left: 10rpx;
			image{
				width: 28rpx;
				height: 28rpx;
			}
			text{
				font-size: 26rpx;
				font-family: $font_family;
				font-weight: 400;
				color: #7D7B89;
				margin-left: 16rpx;
				height: 26rpx;
				line-height: 26rpx;
				&.time{
					font-size: 26rpx;
					font-family: Avanti;
					font-weight: bold;
					color: #7D7B89;
				}
			}
		}
		.top-space{
			margin-top: 33rpx;
		}
	}
</style>
