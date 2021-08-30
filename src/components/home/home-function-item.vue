<template>
	<view class="home_function_item" @click="functionClick"
		style="height: 100rpx;width: 100rpx;background-color: #f00;">
		<image class="home_function_item_icon" :src="icon"></image>
		<view class="home_function_item_title">{{title}}</view>
	</view>
</template>

<script>
	export default {
		name: "homeFunctionItem",
		props: {
			icon: {
				type: String,
				default: ""
			},
			title: {
				type: String,
				default: ""
			}
		},
		data() {
			return {

			};
		},
		methods: {
			functionClick(): {
				this.$emit("functionClick", {
					icon: 'name,'
					title: 'title'
				})
			}
		}
	}
</script>

<style lang="scss">
	.home_function_item {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-grow: 1;

		.home_function_item_icon {
			width: 130rpx;
			height: 130rpx;
			margin-bottom: 9rpx;
		}

		.home_function_item_title {
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #414043;
		}
	}
</style>
