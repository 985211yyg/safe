<template>
	<view :style="{ height: statusBarHeight+topSpace+'px'}" class="uni-status-bar">
		<slot />
	</view>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	export default {
		name: 'custom-status-bar',
		props:{
			topSpace:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				statusBarHeight: statusBarHeight
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-status-bar {
		// width: 750rpx;
		height: 20px;
		// height: var(--status-bar-height);
	}
</style>
