<template>
	<view class="five-sign-page">
		<custom-nav-bar title="安全检查"></custom-nav-bar>
		<custom-status-bar :topSpace="44"></custom-status-bar>
		<five-item-box padding="50rpx 28rpx">
			<view class="log-title" @tap="checkPersonalLog">
				<text>参检人员日志</text>
				<view class="log-p">
					<image v-for="(item,index) in 3" src="../../static/announement/icon-notice-reward@2x.png" :key="index"></image>
				</view>
				<image src="../../static/mine/toicon.png"></image>
			</view>
		</five-item-box>
		<five-item-box padding="11rpx 21rpx 33rpx" marginTop="25rpx">
			<view>
				<view class="sign-project-item sign-addr-item sign-phone-item">
					<text>签到人员</text>
					<text></text>
				</view>
				<view class="sign-person-list">
					<five-sign-person-item style="width: 22%;" v-for="(item,index) in 4" :key="index"></five-sign-person-item>
				</view>
			</view>
		</five-item-box>
		<five-item-box padding="11rpx 21rpx 21rpx" marginTop="25rpx">
			<view>
				<view class="sign-project-item">
					<text>单位名称</text>
					<!-- <text>楚姚高速隧道机电项目</text> -->
					<input type="text" placeholder="楚姚高速隧道机电项目" placeholder-style="color:#C4C4C4"/>
				</view>
				<view class="sign-project-item">
					<text>开始时间</text>
					<text class="time-color">2021-04-12  12:00:00</text>
				</view>
				<view class="sign-project-item">
					<text>检查编号</text>
					<!-- <text>YL20154878</text> -->
					<input type="text" placeholder="YL20154878" placeholder-style="color:#C4C4C4"/>
				</view>
				<view class="sign-project-item">
					<text>检查类型</text>
					<!-- <text>专项检查</text> -->
					<input type="text" placeholder="专项检查" placeholder-style="color:#C4C4C4"/>
				</view>
				<view class="sign-project-item">
					<text>检查标题</text>
					<!-- <text>消防安全专项检查</text> -->
					<input type="text" placeholder="消防安全专项检查" placeholder-style="color:#C4C4C4"/>
				</view>
				<view class="sign-project-item sign-addr-item">
					<text>检查内容</text>
					<text></text>
				</view>
				<view class="sign-procedure-box">
					<textarea placeholder="请输入检查内容" placeholder-style="color:#C4C4C4"/>
				</view>
			</view>
		</five-item-box>
		<five-item-box padding="11rpx 21rpx 28rpx" marginTop="25rpx">
			<view>
				<view class="sign-project-item sign-train-item">
					<text>受检单位</text>
					<picker :range="tranTypeArr" range-key="name" @change="selectTrainType">
						<view>{{currentTrainType}}</view>
					</picker>
					<image class="margin-right" src="../../static/mine/actionicon.png"></image>
				</view>
				<view class="sign-project-item">
					<text>检查区域</text>
					<input type="text" v-model="WorkAddr" placeholder="请输入" placeholder-style="color:#C4C4C4"/>
				</view>
			</view>
		</five-item-box>
		<five-item-box padding="0 21rpx" marginTop="25rpx">
			<view class="sign-project-item" style="justify-content: space-between;">
				<text>有无问题</text>
				<switch style="transform:scale(0.6);" color="#46B180" checked="true" @change="getIsProblem" />
			</view>
		</five-item-box>
		<five-item-box padding="0 21rpx" marginTop="25rpx">
			<view>
				<view class="sign-project-item">
					<text style="width: 100%;">存在的问题或安全隐患</text>
					<text></text>
				</view>
				<view class="sign-procedure-box">
					<textarea placeholder="请输入存在的问题或安全隐患" placeholder-style="color:#C4C4C4"/>
				</view>
				<view class="sign-project-item">
					<text style="width: 100%;">对安全隐患采取的措施</text>
					<text></text>
				</view>
				<view class="sign-procedure-box">
					<textarea placeholder="请输入对安全隐患采取的措施" placeholder-style="color:#C4C4C4"/>
				</view>
			</view>
		</five-item-box>
		<five-img-list title="现场影像资料"></five-img-list>
		<button class="sign-btn">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				WorkAddr:"",
				yes:true,
				no:false,
				tranTypeArr:[{name:"岗前五分钟",id:"1"}],
				currentTrainType:"岗前五分钟"
			}
		},
		onLoad() {
			
		},
		methods: {
			checkPersonalLog(){
				this.$navigateTo("./safety-personal-log")
			},
			selectTrainType(e){
				const {target:{value}} = e
				this.currentTrainType = this.tranTypeArr[tranTypeArr].name
			},
			getIsProblem(){}
		}
	}
</script>

<style lang="scss" scoped>
	.five-sign-page{
		@include boxsizing;
		background-color: #F5F6F9;
		padding:24rpx 24rpx 60rpx;
		.log-title{
			@include flex-style(row,nowrap,space-between,center);
			@include boxsizing;
			text{
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #414043;
			}
			.log-p{
				flex:1;
				@include flex-style(row,nowrap,flex-end,center);
				margin-right:20rpx;
				image{
					width:54rpx;
					height:54rpx;
				}
			}
			>image{
				width:18px;
				height:20px;
			}
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
				&:last-child{
					font-size: $label_size;
					font-family: $font_family;
					font-weight: 500;
					color: $val_color;
				}
			}
			.time-color{
				font-family:$font_family_time;
			}
			.letter-style{
				letter-spacing: 4rpx;
			}
			.project-radio{
				@include flex-style(row,nowrap,flex-start,center);
			}
			text.add-work-icon{
				width: 34rpx;
				height: 34rpx;
				text-align: center;
				line-height: 31rpx;
				color: #fff;
				background-color: #46B180;
				border-radius: 4px;
			}
			&:last-child{
				@include border-after(#fff);
			}
		}
		.sign-person-list{
			@include boxsizing;
			@include flex-style(row,wrap,space-between,center);
			padding: 0 14rpx 0;
			margin-top: -8rpx;
		}
		.sign-train-item{
			justify-content: space-between;
			picker{
				flex:1;
			}
			image{
				width:7px;
				height: 11px;
				margin-left: -18rpx;
				margin-right:12rpx;
				position:relative;
				z-index:0;
			}
		}
		.sign-addr-item{
			justify-content: space-between;
			input{
				flex: 1;
				font-size: 30rpx;
				font-family: $font_family;
				font-weight: 500;
				color: $val_color;
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
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: $val_color;
			@include boxsizing;
			padding: 34rpx 27rpx;
			textarea{
				height:120rpx;
			}
		}
		.procedure-line{
			width: 100%;
			padding-bottom: 22rpx;
			@include border-after(#F1F1F1);
		}
		.sign-danger-box{
			margin-top: 36rpx;
			.sign-danger-title{
				padding-left: 15rpx;
				height: 29rpx;
				line-height: 29rpx;
				font-size: $label_size;
				font-family: $font_family;
				font-weight: 500;
				color: #7D7B89;
			}
			.sign-danger-item{
				margin-top: 16rpx;
				@include flex-style(row,wrap,space-between,center);
			}
		}
		.sign-content{
			margin-top: 36rpx;
			.sign-danger-title{
				padding-left: 15rpx;
				margin-bottom: 36rpx;
				height: 29rpx;
				line-height: 29rpx;
				font-size: $label_size;
				font-family: $font_family;
				font-weight: 500;
				color: #7D7B89;
			}
		}
	}
</style>
