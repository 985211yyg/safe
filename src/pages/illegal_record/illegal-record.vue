<template>
	<view class="five-sign-page">
		<custom-nav-bar title="岗前五分钟"></custom-nav-bar>
		<custom-status-bar :topSpace="44"></custom-status-bar>
		<five-item-box padding="11rpx 24rpx">
			<view>
				<view class="sign-project-item">
					<text>记录时间</text>
					<uni-datetime-picker :border="false"></uni-datetime-picker>
				</view>
				<view class="sign-project-item">
					<text>违规人员</text>
					<input type="text" v-model="name" placeholder="请输入姓名" placeholder-class="pstyle"/>
				</view>
				<view class="sign-project-item sign-addr-item">
					<text>施工地点</text>
					<input type="text" v-model="WorkAddr" placeholder="自动定位或手动输入" placeholder-class="pstyle"/>
					<image style="width: 36rpx;height: 40rpx;" class="margin-right" src="../../static/five/icon-addr.png" @tap="getWorkAddr"></image>
				</view>
				<view class="sign-project-item sign-addr-item">
					<text>所属单位</text>
					<picker @change="bindPickerChange" :value="cpindex" :range="companyArr" range-key="name">
						<input type="text" :value="ownercp" placeholder="请选择" disabled placeholder-class="pstyle"/>
					</picker>
					<image style="width: 13rpx;height: 20rpx;" class="margin-right" src="../../static/mine/actionicon.png"></image>
				</view>
			</view>
		</five-item-box>
		<five-item-box padding="11rpx 24rpx 28rpx" marginTop="25rpx">
			<view>
				<view class="sign-project-item sign-addr-item">
					<text>违规描述</text>
				</view>
				<view class="sign-procedure-box">
					 <textarea v-model="reviewVal" maxlength="-1" placeholder="请输入违规行为描述" placeholder-class="pstyle"/>
				</view>
				<view class="procedure-line"></view>
				<view class="sign-phone-item">
					<text>违规照片</text>
					<image class="margin-right" src="../../static/five/upload.png"></image>
				</view>
				<scroll-view class="sign-phone-list" scroll-x="true" :scroll-with-animation="true">
					<view class="phone-list-item-box" v-for="(item,index) in 10" :key="index">
						<view class="phone-list-item">
							<text @tap="delImg(item)">×</text>
							<image src="../../static/five/bg-signin@2x.png" mode="aspectFill"></image>
						</view>
					</view>
				</scroll-view>
			</view>
		</five-item-box>
		<button class="sign-btn">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				WorkAddr:"",
				yes:true,
				no:false,
				name:"",
				cpindex:0,
				ownercp:"",
				companyArr:[
					{name:"单位1单位单位单位单位单位单位单位单位单位单位",id:1},
					{name:"单位2",id:2},
					{name:"单位3",id:3},
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			isYes(e){
				this.yes = true
				this.no = false
			},
			isNo(e){
				this.yes = false
				this.no = true
			},
			getWorkAddr(){
				uni.chooseLocation({
				    success:(res)=>{
						this.WorkAddr = res.address
				        // console.log('位置名称：' + res.name);
				        // console.log('详细地址：' + res.address);
				        // console.log('纬度：' + res.latitude);
				        // console.log('经度：' + res.longitude);
				    }
				});
			},
			bindPickerChange(e){
				this.cpindex = e.target.value
				this.ownercp=this.companyArr[this.cpindex].name
			},
			delImg(item){
				// this.imgArr
				this.$emit("delImg",this.imgArr)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.five-sign-page{
		@include boxsizing;
		background-color: #F5F6F9;
		padding:24rpx 24rpx 60rpx;
		.pstyle{
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #C4C4C4;
		}
		.sign-project-item{
			@include flex-style(row,nowrap,flex-start,center);
			padding-top: 30rpx;
			padding-bottom: 30rpx;
			padding-left: 15rpx;
			@include border-after(#F1F1F1);
			text{
				height:$label_size;
				line-height: $label_size;
				&:first-child{
					width: 120rpx;
					@include boxsizing;
					color: $label_color;
					font-size: $label_size;
					font-family: $font_family;
					font-weight: 500;
					margin-right: 107rpx;
				}
			}
			input{
				font-size: $label_size;
				font-family: $font_family;
				font-weight: 500;
				color: $val_color;
			}
			&:last-child{
				@include border-after(#fff);
			}
		}
		.sign-addr-item{
			justify-content: space-between;
			>input{
				flex: 1;
				font-size: 30rpx;
				font-family: $font_family;
				font-weight: 500;
				color: $val_color;
			}
			picker{
				flex: 1;
				position: relative;
				z-index: 9;
				margin-right: -12rpx;
				input{
					padding-right: 20rpx;
				}
			}
			image{
				width:36rpx;
				height: 36rpx;
			}
			.margin-right{
				margin-right: 9rpx;
			}
		}
		.sign-btn{
			height: 90rpx;
			background: #46B180;
			border-radius: 8rpx;
			margin-top: 28rpx;
			font-size: 36rpx;
			font-family:$font_family;
			font-weight: bold;
			color: #FFFFFF;
			&::after{
				border: 0;
			}
		}
		.sign-procedure-box{
			background: #F5F6F7;
			border-radius: 10rpx;
			@include boxsizing;
			padding: 34rpx 27rpx;
			textarea{
				height: 144rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: $val_color;
			}
		}
		.procedure-line{
			width: 100%;
			padding-bottom: 22rpx;
			@include border-after(#F1F1F1);
		}
		.sign-phone-item{
			@include flex-style(row,nowrap,space-between,center);
			padding-top: 30rpx;
			padding-bottom: 30rpx;
			padding-left: 15rpx;
			text{
				height:$label_size;
				line-height: $label_size;
				width: 156rpx;
				font-size: $label_size;
				font-family: $font_family;
				font-weight: 500;
				color: #7D7B89;
			}
			image{
				width: 38rpx;
				height: 30rpx;
			}
			.margin-right{
				margin-right: 9rpx;
			}
		}
		.sign-phone-list{
			height: 157rpx;
			@include boxsizing;
			white-space: nowrap; 
			.phone-list-item-box{
				height: 157rpx;
				width: 147rpx;
				position: relative;
				overflow: visible;
				display: inline-block;
				@include boxsizing;
				margin-right: 23rpx;
				&:last-child{
					margin-right:0;
				}
				.phone-list-item{
					margin-top: 17rpx;
					display: inline-block;
					width: 147rpx;
					height: 144rpx;
					border-radius: 10rpx;
					overflow: hidden;
					@include boxsizing;
					text{
						display: inline-block;
						position: absolute;
						z-index: 40;
						top: 2rpx;
						right:0rpx;
						width: 32rpx;
						height: 32rpx;
						font-size: 12px;
						line-height: 32rpx;
						text-align: center;
						border-radius: 50%;
						background-color: #F96C5E;
						color: #fff;
					}
					image{
						width: 100%;
					}
				}
			}
		}
	}
</style>
