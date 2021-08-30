<template>
	<view style="padding: 0 24rpx 120rpx;">
		<custom-nav-bar background="#fff" title="安全检查">
			<safe-check-top-bar :tabBarArr="tabBarArr" @switch="getSelect"></safe-check-top-bar>
		</custom-nav-bar>
		<custom-status-bar :topSpace="104"></custom-status-bar>
		<view class="safe-check-current-item" v-for="(item,index) in 10" @tap="toPersonalTask(item)" :key="index">
			<view class="name">
				<image src="../../static/five/img-state-pass@2x.png"></image>
				<text>消防安全专项检查</text>
			</view>
			<view class="item">
				<view class="item-style">
					<image src="../../static/announement/icon-deadline.png"></image>
					<text>开始时间</text>
					<text>2021-07-24</text>
				</view>
				<view class="item-style">
					<image src="../../static/safe/icon-number@2x.png"></image>
					<text>检查编号</text>
					<text>2021-07-24</text>
				</view>
			</view>
			<view class="company item-style">
				<image src="../../static/five/icon-belong-project@2x.png"></image>
				<text>检查编号</text>
				<text>2021-07-24</text>
			</view>
			<view class="btn">
				<text @tap="workerSign">人员签字</text>
				<text @tap="overThisCkeck">结束本次检查</text>
			</view>
		</view>
		<!-- <custom-loading></custom-loading> -->
		<view class="add-check" @tap="createBigTask">+</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				current:0,
				tabBarArr:[
					{name:"进行中",id:1},
					{name:"待下发",id:2},
					{name:"待整改",id:3},
					{name:"待验收",id:4},
					{name:"已完成",id:5},
				]
			}
		},
		onLoad() {
			
		},
		methods:{
			getSelect(e){
				console.log(e.id)
			},
			createBigTask(){
				this.$navigateTo("./safety-create-big-task")
			},
			toPersonalTask(){
				this.$navigateTo("./safety-create-personal-task")
			},
			workerSign(){
				this.$navigateTo("../../pageA/sign")
			},
			overThisCkeck(){},
		}
	}
</script>

<style lang="scss">
	page{
		background:#F5F6F9;
	}
	.safe-check-current-item{
		background: #FFFFFF;
		border-radius: 10px;
		// @include flex-style(row,nowrap,space-between,center);
		@include boxsizing;
		padding:36rpx 30rpx 30rpx;
		margin-bottom:24rpx;
		.name{
			@include flex-style(row,nowrap,flex-start,center);
			@include boxsizing;
			image{
				width:77rpx;
				height:31rpx;
				margin-right:17rpx;
			}
			text{
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #414043;
			}
		}
		.item-style{
			@include flex-style(row,nowrap,flex-start,center);
			@include boxsizing;
			image{
				width:30rpx;
				height:30rpx;
				margin-right:8rpx;
			}
			text{
				&:nth-child(2){
					font-size: 22rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #7D7B89;
					margin-right:23rpx;
				}
				&:nth-child(3){
					font-size: 22rpx;
					font-family: Avanti;
					font-weight: bold;
					color: #414043;
				}
			}
		}
		.item{
			margin-top:46rpx;
			@include flex-style(row,nowrap,space-between,center);
			@include boxsizing;
		}
		.company{
			margin-top:33rpx;
		}
		.btn{
			@include flex-style(row,nowrap,flex-end,center);
			@include boxsizing;
			margin-top:30rpx;
			text{
				font-size: 20rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				border-radius: 24rpx;
				height:48rpx;
				line-height:2.1;
				padding:0 22rpx;
				&:nth-child(1){
					color: #46B180;
					border: 1px solid #46B180;
				}
				&:nth-child(2){
					color: #FDA002;
					border: 1px solid #FDA002;
					margin-left:19rpx;
				}
			}
		}
	}
	.add-check{
		position:fixed;
		z-index:999;
		right:45rpx;
		bottom:125rpx;
		width:104rpx;
		height:104rpx;
		background: #46B180;
		box-shadow: 0px 6px 20px 0px rgba(70, 177, 128, 0.24);
		border-radius: 50%;
		font-size:40px;
		color:#fff;
		// @include flex-style(row,nowrap,center,center);
		text-align:center;
		line-height:1.2;
		font-weight:bold;
	}
</style>
