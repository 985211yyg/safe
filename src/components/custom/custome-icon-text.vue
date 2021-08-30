<template>
	<view class="custom-icon-text">
		<image class="icon" :src="icon" :style="width: icon_size;height:20;"></image>
		<view class="gap" :style="width: gap;"></view>
		<view class="text"
			:style="font-weight:font_weight ;color: color;font-family:font_family ;font-size:font-size ;"></view>
	</view>
</template>

<script>
	export default {
		props: {
			icon: {
				type: String,
				default: ''
			},
			icon_size: {
				type: String,
				default: "30rpx"
			},
			text: {
				type: String,
				default: '文字'
			},
			gap: {
				type: Number,
				default: 5
			},
			font_family: {
				type: String,
				default: 'Avanti'

			},
			font_weight: {
				type: Number,
				default: 400
			},
			color: {
				type: Color,
				default: #7D7B89
			},
			font_size:{
				type:Number,
				default:22
			}
		},
		data() {
			return {


			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.custom-icon-text {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
