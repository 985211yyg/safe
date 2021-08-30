<template>
	<view class="upload-img-list">
		<scroll-view class="sign-phone-list" scroll-x="true" :scroll-with-animation="true">
			<view class="phone-list-item-box" v-for="(item,index) in 10" :key="index">
				<view class="phone-list-item">
					<text v-if="hasClose" @tap="delImg(item)">×</text>
					<image src="../../static/five/bg-signin@2x.png" mode="aspectFill"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				hasClose: true
			}
		},
		methods:{
			delImg (item) {
				console.log(item)
			}
		}
	}
</script>

<style lang="scss">
	.upload-img-list {
		
		.sign-phone-list{
			height: 157rpx;
			@include boxsizing;
			white-space: nowrap; 
			.phone-list-item-box{
				height: 157rpx;
				width: 148rpx;
				position: relative;
				overflow: visible;
				display: inline-block;
				@include boxsizing;
				margin-right: 23rpx;
				&:last-child{
					margin-right:0;
				}
				.phone-list-item{
					margin-top: 17rpx;
					display: inline-block;
					width: 148rpx;
					height: 144rpx;
					border-radius: 10rpx;
					overflow: hidden;
					@include boxsizing;
					text{
						display: inline-block;
						position: absolute;
						z-index: 40;
						top: 2rpx;
						right:0rpx;
						width: 32rpx;
						height: 32rpx;
						font-size: 12px;
						line-height: 32rpx;
						text-align: center;
						border-radius: 50%;
						background-color: #F96C5E;
						color: #fff;
					}
					image{
						width: 100%;
					}
				}
			}
		}
		}
	}
</style>
