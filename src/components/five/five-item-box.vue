<template>
	<view class="five-item-box" @tap="itemBoxEvent" :style="{background:background,'border-radius':bdradius,padding:padding,marginTop:marginTop,marginBottom:marginBottom}">
		<slot></slot>
	</view>
</template>

<script>
	export default{
		name:"five-item-box",
		props:{
			background:{
				type:String,
				default:"#fff"
			},
			bdradius:{
				type:String,
				default:"10px"
			},
			padding:{
				type:String,
				default:"0"
			},
			marginTop:{
				type:String,
				default:"0"
			},
			marginBottom:{
				type:String,
				default:"0"
			}
		},
		methods:{
			itemBoxEvent(){
				this.$emit("itemBoxEvent")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.five-item-box{
		// border: 1px solid red;
	}
</style>
