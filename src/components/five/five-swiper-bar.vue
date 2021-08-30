<template>
	<view class="five-swiper-bar">
		<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" :scroll-with-animation="true">
			<view :class="[currentIndex==index ? 'active':'']" v-for="(item,index) in item" :key="index" @tap="barTapEvent(item,index)">{{item[keys]}}</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		name:"five-swiper-bar",
		props:{
			item:{
				type:Array,
				default:()=>{
					return [{name:"通信系统",id:1},{name:"啥事",id:1},{name:"萨达",id:1}]
				}
			},
			keys:{
				type:String,
				default:"name"
			}
			
		},
		data(){
			return{
				currentIndex:0,
			}
		},
		created() {
			this.isSelect = this.isChecked
		},
		methods:{
			scroll(e) {},
			barTapEvent(item,index){
				this.currentIndex = index
				this.$emit("changeBar",item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.five-swiper-bar{
		background-color: #fff;
		.scroll-view_H{
			white-space: nowrap; 
			border: 1px solid #F0F0F0;
			height: 100rpx;
			// @include boxsizing;
			view{
				@include boxsizing;
				display: inline-block;
				min-width: 166rpx;
				padding:0 6px;
				height: 100rpx;
				line-height: 100rpx;
				background: #FFFFFF;
				border-right: 1px solid #F0F0F0;
				text-align: center;
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #414043;
				&.active{
					color: #46B180;
					border-bottom: 4rpx solid #46B180;
				}
			}
		}
	}
</style>
