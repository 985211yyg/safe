<template>
	<view class="safe-top-tabbar">
		<text :class="[current==index?'active':'']" v-for="(item,index) in tabBarArr" @tap="changeTab(item,index)" :key="index">{{item.name}}</text>
	</view>
</template>

<script>
	export default{
		name:"safe-check-top-bar",
		props:{
			tabBarArr:{
				type:Array,
				default:()=>{}
			}
		},
		data(){
			return{
				current:0
			}
		},
		methods:{
			changeTab(item,index){
				this.current = index
				this.$emit("switch",item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.safe-top-tabbar{
		@include flex-style(row,nowrap,space-between,center);
		@include boxsizing;
		height:90rpx;
		line-height:90rpx;
		background:#fff;
		text{
			@include boxsizing;
			text-align:center;
			flex:1;
			padding:0;
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #AAAAAA;
			border: 1px solid #F1F1F1;
			&.active{
				border-bottom: 1px solid #46B180;
			}
			&:first-child{
				border-left:0;
			}
			&:last-child{
				border-right:0;
			}
		}
	}
</style>
