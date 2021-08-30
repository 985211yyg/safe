<template>
	<view class="five-radio-box" :style="{style}">
		<view :class="['five-radio',isSelect ? 'active':'']" @tap="change">
			<image v-if="isSelect" src="../../static/five/gou.png"></image>
		</view>
		<view class="slot-title" :style="{marginLeft:marginLeft,color:color,'font-size':fsize}">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default{
		name:"five-radio",
		props:{
			isChecked:{
				type:Boolean,
				default:false
			},
			style:{
				type:String,
				default:""
			},
			item:{
				type:Object,
				default:()=>{}
			},
			marginLeft:{
				type:String,
				default:"15rpx"
			},
			color:{
				type:String,
				default:"#414043"
			},
			fsize:{
				type:String,
				default:"30rpx"
			}
		},
		data(){
			return{
				isSelect:false
			}
		},
		created() {
			this.isSelect = this.isChecked
		},
		watch:{
			item(val){
				console.log(val)
				this.isSelect = val.isChecked
			}
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
	.five-radio-box{
		@include flex-style(row,nowrap,flex-start,center);
	}
	.five-radio{
		@include boxsizing;
		width: 34rpx;
		height: 34rpx;
		border-radius: 50%;
		border: 1px solid #B0B4BA;
	}
	.five-radio.active{
		border:0;
		image{
			width: 34rpx;
			height: 34rpx;
		}
	}
	.slot-title{
		font-family: Source Han Sans CN;
	}
</style>
