<template>
	<view class="five-sign-page">
		<custom-nav-bar :title="title"></custom-nav-bar>
		<custom-status-bar :topSpace="44"></custom-status-bar>
		<five-item-box padding="11rpx 21rpx">
			<view>
				<view class="sign-project-item">
					<text>项目名称</text>
					<text>楚姚高速隧道机电项目</text>
				</view>
				<view class="sign-project-item">
					<text>交底时间</text>
					<text class="time-color">2021-04-12  12:00:00</text>
				</view>
				<view class="sign-project-item">
					<text class="letter-style">交&nbsp;底&nbsp;人</text>
					<text>徐建江</text>
				</view>
				<view class="sign-project-item" v-if="type">
					<text>是否施工</text>
					<text>是</text>
				</view>
			</view>
		</five-item-box>
		<five-item-box padding="11rpx 21rpx 28rpx" marginTop="25rpx">
			<view>
				<view class="sign-project-item sign-addr-item">
					<text>施工地点</text>
					<input type="text" disabled :value="WorkAddr"/>
				</view>
				<view class="sign-project-item sign-addr-item">
					<text>作业工序</text>
					<text></text>
					<!-- <image class="margin-right" src="../../static/five/add.png"></image> -->
				</view>
				<view class="sign-procedure-box">
					1、预埋安装件；2、混凝土浇筑；3、基础拆模 及养生；
				</view>
				<view class="procedure-line"></view>
				<view class="sign-danger-box">
					<view class="sign-danger-title">风险源</view>
					<view class="sign-danger-item">
						<five-danger-item style="width: 32%;"></five-danger-item>
						<five-danger-item style="width: 32%;"></five-danger-item>
						<five-danger-item style="width: 32%;"></five-danger-item>
						<five-danger-item style="width: 32%;"></five-danger-item>
						<five-danger-item style="width: 32%;"></five-danger-item>
						<five-danger-item style="width: 32%;"></five-danger-item>
					</view>
				</view>
				<view class="procedure-line"></view>
				<view class="sign-content">
					<view class="sign-danger-title">交底内容</view>
					<view class="sign-procedure-box">
						1、按要求发放劳动防护用品； 2、开展安全教育和培训、安全技术交底工作、发现问题及时督促整改。
					</view>
				</view>
			</view>
		</five-item-box>
		<five-img-list :isUpload="false" :hasClose="false" v-if="type"></five-img-list>
		<five-item-box padding="11rpx 21rpx 33rpx" marginTop="25rpx" v-if="type">
			<view>
				<view class="sign-project-item sign-addr-item sign-phone-item">
					<text>签到人员</text>
					<text></text>
				</view>
				<view class="sign-person-list">
					<five-sign-person-item style="width: 22%;" v-for="(item,index) in 12" :key="index"></five-sign-person-item>
				</view>
			</view>
		</five-item-box>
		<five-img-list :isUpload="false" :hasClose="false" title="交底后照片" v-if="type"></five-img-list>
		<five-item-box padding="11rpx 21rpx 33rpx" marginTop="25rpx" v-if="showtype==3">
			<view>
				<view class="sign-project-item sign-addr-item sign-phone-item">
					<text>审核说明</text>
					<text></text>
				</view>
				<view class="review-input-box">
					 <textarea v-model="reviewVal" maxlength="-1" placeholder="请对岗前五分钟审核结果进行说明" />
				</view>
			</view>
		</five-item-box>
		<view class="sign-btn-box" v-if="showtype==3">
			<button type="button">驳回重报</button>
			<button type="button">审核通过</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				WorkAddr:"萨达所大所大所大",
				type:true,
				showtype:0,
				reviewVal:"",
				title:" "
			}
		},
		onLoad(e) {
			this.showtype = e.type
			if(e.type==3){
				this.title = "待审核"
			}
			if(e.type && e.type==1){
				this.type = false
			}
		},
		methods: {
	
		}
	}
</script>

<style lang="scss" scoped>
	.five-sign-page{
		@include boxsizing;
		background-color: #F5F6F9;
		padding:24rpx 24rpx 60rpx;
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
		.sign-addr-item{
			justify-content: space-between;
			input{
				flex: 1;
				font-size: 30rpx;
				font-family: $font_family;
				font-weight: 500;
				color: $val_color;
			}
			.margin-right{
				margin-right: 9rpx;
			}
		}
		.sign-person-list{
			@include boxsizing;
			@include flex-style(row,wrap,space-between,center);
			padding: 0 14rpx 0;
			margin-top: -8rpx;
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
	.review-input-box{
		height: 144rpx;
		background: #F5F6F7;
		border-radius: 10px;
		textarea{
			height: 144rpx;
			padding: 23rpx 30rpx;
		}
	}
	.sign-btn-box{
		@include boxsizing;
		@include flex-style(row,wrap,space-between,center);
		padding:24rpx 0 80rpx;
		button{
			@include boxsizing;
			width:342rpx;
			height: 90rpx;
			background: rgba(70, 177, 128, 0.1);
			border: 1px solid #46B180;
			border-radius: 8rpx;
			&:first-child{
				color: #46B180;
				margin-right: 15rpx;
			}
			&:last-child{
				background-color: #46B180;
				color: #fff;
				border: 0;
				&::after{
					height: 0;
					border: 0;
				}
			}
		}
	}
</style>
