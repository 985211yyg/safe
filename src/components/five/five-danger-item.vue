<template>
	<view class="five-danger-item" :style="{marginTop:marginTop,marginBottom:marginBottom}">
		<text v-if="level==1" class="level level-1">Ⅰ</text>
		<text v-if="level==2" class="level level-2">Ⅱ</text>
		<text v-if="level==3" class="level level-3">Ⅲ</text>
		<text v-if="level==4" class="level level-4">Ⅳ</text>
		<text class="level-name">{{title}}</text>
	</view>
</template>

<script>
	export default{
		name:"five-danger-item",
		props:{
			item:{
				type:Object,
				default:()=>{}
			},
			title:{
				type:String,
				default:"危险源"
			},
			level:{
				type:Number,
				default:1
			},
			marginTop:{
				type:String,
				default:"20rpx"
			},
			marginBottom:{
				type:String,
				default:"0"
			}
		},
		data(){
			return{
			}
		},
		created() {
			this.isSelect = this.isChecked
		},
		methods:{
			change(){
				this.isSelect = !this.isSelect
				this.$emit("change",{item:this.item,value:this.isSelect})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.five-danger-item{
		height: 66rpx;
		@include boxsizing;
		padding: 18rpx 4rpx;
		background: #FFFFFF;
		border: 1px solid #F0F0F0;
		border-radius: 6px;
		@include flex-style(row,nowrap,center,center);
		.level{
			width: 22rpx;
			height: 22rpx;
			line-height: 22rpx;
			@include boxsizing;
			color: #fff;
			text-align: center;
			border-radius: 50%;
			font-size: 16rpx;
			font-family: PingFang SC;
		}
		.level-1{
			background: #01B0FD;
		}
		.level-2{
			background: #FDD102;
		}
		.level-3{
			background: #FC4D3B;
		}
		.level-4{
			background: #FE7A1B;
		}
		.level-name{
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #3C3C40;
			margin-left: 8rpx;
		}
	}
</style>
