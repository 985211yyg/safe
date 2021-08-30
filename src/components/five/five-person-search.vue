<template>
	<view class="history-time-box">
		<view class="history-time-chose">
			<view class="icon-box" @tap="searchEvent">
				<image src="../../static/five/icon-search@2x.png"></image>
			</view>
			<input type="text" v-model="inputVal" :placeholder="placeholder" placeholder-class="pstyle"/>
		</view>
	</view>
</template>

<script>
	export default{
		name:"five-person-search",
		props:{
			placeholder:{
				type:String,
				default:"请输入工人姓名"
			}
		},
		data(){
			return{
				inputVal:""
			}
		},
		methods:{
			searchEvent(e){
				this.$emit("search",this.inputVal)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.history-time-box{
		@include boxsizing;
		padding:24rpx 18rpx;
		background-color: #fff;
		width: 100%;
		// position: absolute;
		// z-index: 999;
		// top: 0;
		// left: 0;
		// right: 0;
	}
	.pstyle{
		font-size: 30rpx;
		font-family:$font_family;
		font-weight: 500;
		color: #C4C4C4;
	}
	.history-time-chose{
		@include flex-style(row,nowrap,flex-start,center);
		border: 1px solid #F1F1F1;
		.icon-box{
			width: 83rpx;
			height: 70rpx;
			@include flex-style(row,nowrap,center,center);
			background-color: #F8F9FA;
			image{
				width: 40rpx;
				height: 40rpx;
			}
		}
		input{
			font-size: 30rpx;
			font-family:$font_family;
			font-weight: 500;
			color: #7D7B89;
			margin-left: 26rpx;
		}
	}
</style>
