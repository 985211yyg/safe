<template>
	<view class="sign-person-item" :style="{border:border,background:background,marginTop:marginTop}">
		<text v-if="isText">{{name}}</text>
		<image v-else :src="src"></image>
	</view>
</template>
<script>
	export default{
		name:"five-sign-person-item",
		props:{
			name:{
				type:String,
				default:""
			},
			isText:{
				type:[String,Boolean],
				default:false
			},
			src:{
				type:String,
				default:"../../static/five/img-state-checkedIn@2x.png"
			},
			marginTop:{
				type:String,
				default:"18rpx"
			},
			border:{
				type:String,
				default:"1px solid #F0F0F0"
			},
			background:{
				type:String,
				default:"#fff"
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sign-person-item{
		height: 61rpx;
		border: 1px solid #F0F0F0;
		border-radius: 4rpx;
		@include flex-style(row,nowrap,center,center);
		text{
			font-size: 30rpx;
			font-family: $font_family;
			color: $val_color;
		}
		image{
			width: 80%;
			height: 40rpx;
			line-height: 40rpx;
		}
	}
</style>
