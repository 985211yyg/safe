<template>
	<view>
		<view class="ddh-loading-txt">{{title}}</view>
	</view>
</template>

<script>
	export default {
		name:"custom-loading",
		props:{
			title:String
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.ddh-loading-txt{
		width: 100%;
		text-align: center;
		color:#888;
		font-size: $font_14;
		font-weight: bold;
		margin-top: 40rpx;
		padding-bottom: 60rpx;
	}
</style>
