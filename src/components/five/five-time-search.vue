<template>
	<view class="history-time-box">
		<view class="history-time-chose">
			<picker class="icon-box" mode="date" :value="viewDate" :start="startDate" :end="endDate" @change="bindDateChange">
				<image src="../../static/five/icon-calendar@2x.png"></image>
			</picker>
			<text>{{viewDate}}</text>
		</view>
	</view>
</template>

<script>
	import {getDate} from "../../common/utils.js"
	export default{
		name:"five-time-search",
		props:{
			
		},
		computed: {
			startDate() {
				return getDate('start');
			},
			endDate() {
				return getDate('end');
			}
		},
		data(){
			return{
				viewDate:getDate()
			}
		},
		methods:{
			bindDateChange(e){
				this.viewDate = e.target.value
				this.$emit("selectTime",this.viewDate)
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
		text{
			font-size: 30rpx;
			font-family: Avanti;
			font-weight: bold;
			color: #7D7B89;
			margin-left: 26rpx;
		}
	}
</style>
