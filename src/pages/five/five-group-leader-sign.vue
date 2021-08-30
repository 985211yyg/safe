<template>
	<view>
		<custom-nav-bar title="开始签到"></custom-nav-bar>
		<custom-status-bar :topSpace="44"></custom-status-bar>
		<view class="top-code-box">
			<image class="bg-img" src="../../static/five/bg-signin@2x.png"></image>
			<view class="code-img-box">
				<view class="code-img">
					<image src="../../static/five/code.png"></image>
				</view>
				<text>使用微信扫一扫或小程序扫一扫功能扫码签到</text>
			</view>
		</view>
		<view class="action-item-box">
			<button type="button" @tap="personList">
				<image src="../../static/five/icon-manual@2x.png"></image>
				<text>手动添加</text>
			</button>
			<!-- <button type="button">
				<image src="../../static/five/icon-recognition@2x.png"></image>
				<text>人脸识别</text>
			</button> -->
		</view>
		<view class="has-sign-title">
			已签到人员 
		</view>
		<scroll-view scroll-y="true" class="has-sign-list" :show-scrollbar="false">
			<view class="sign-list-box">
				<five-sign-person-item name="张三" style="width: 22%;" v-for="(item,index) in 12" :key="index"></five-sign-person-item>
			</view>
		</scroll-view>
		<five-img-list :imgList="imgList" @uploadImg="uploadImg" @delImg="delImg"></five-img-list>
		<view class="sign-btn-box">
			<button type="button" @tap="temporarySave">暂存</button>
			<button type="button" @tap="report">上报</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	import {formatDate} from "../../common/formatdate.js"
	export default {
		data() {
			return {
				imgList:[],
				signList:[],
				formParams:{}
			};
		},
		computed:{
			...mapState({
				userInfo:state => state.user.userInfo
			})
		},
		onLoad() {
			this.checkHasSign()
		},
		methods:{
			personList(){
				this.$navigateTo("./five-chose-sign-person")
			},
			async getSignList(id){
				const res = await new this.$Api('query').request("signDetail","get",{
					business_id:id,
					type:"Five"
				},true)
				const {data} = res
				this.signList = data
			},
			//检查今日是否已上报、签到、开工1_未上报，2_已上报，3_未施工
			async checkHasSign(){
				const res =await new this.$Api().request("se_records","",{
					company_id: this.userInfo.company_id,
					project_id: this.userInfo.project_id,
					construction_time: formatDate("yyyy-MM-dd",new Date()),
				},true)
				const {count,list,list:[{construction_state,before_imgs,construction_info_id}]} = res
				const [obj] = list
				this.formParams = obj
				this.getSignList(construction_info_id)
			},
			uploadImg(e){
				this.imgList = e
				this.$uploadImg("/uploadfile",(res)=>{
					const {records:[{path}]} = res
					this.imgList.push(path)
					this.formParams.after_imgs = this.imgList.toString()
				})
			},
			delImg(e){
				this.imgList = e
				this.formParams.after_imgs = this.imgList.toString()
			},
			async temporarySave(){
				this.formParams.construction_state = 1
				const res = await new this.$Api().request("addOrUpdate","PUT",this.formParams,true);
				this.$showToast("已暂存")
			},
			async report(){
				this.formParams.construction_state = 2
				const res = await new this.$Api().request("addOrUpdate","PUT",this.formParams,true);
			}
		}
	}
</script>

<style lang="scss">
	.top-code-box{
		height: 454rpx;
		position: relative;
		.bg-img{
			width: 100%;
			height: 100%;
		}
		.code-img-box{
			position: absolute;
			z-index:12;
			left: 0;
			right: 0;
			top: 42rpx;
			@include flex-style(column,nowrap,center,center);
			.code-img{
				width: 292rpx;
				height: 292rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			text{
				margin-top: 26rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
	}
	.action-item-box{
		padding: 26rpx 48rpx 0;
		@include boxsizing;
		@include flex-style(row,nowrap,space-between,center);
		button{
			width: 304rpx;
			height: 96rpx;
			@include flex-style(row,nowrap,center,center);
			image{
				width: 40rpx;
				height: 40rpx;
			}
			text{
				font-size: 28rpx;
				font-family:$font_family;
				font-weight: 500;
				color: #3C3C40;
				margin-left: 11rpx;
			}
		}
	}
	.has-sign-title{
		font-size: 38rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #000000;
		height: 38rpx;
		line-height: 38rpx;
		margin-top: 58rpx;
		margin-left: 40rpx;
	}
	.has-sign-list{
		height: 320rpx;
		@include boxsizing;
		padding: 0 24rpx;
		margin-top: 24rpx;
		.sign-list-box{
			@include boxsizing;
			@include flex-style(row,wrap,space-between,center);
			padding: 0 24rpx 0;
			height: 320rpx;
			background-color: #F5F6F7;
			border-radius: 10rpx;
		}
	}
	.sign-btn-box{
		@include boxsizing;
		@include flex-style(row,wrap,space-between,center);
		padding: 47rpx 24rpx 80rpx;
		button{
			@include boxsizing;
			width: 340rpx;
			height: 90rpx;
			background: rgba(70, 177, 128, 0.1);
			border: 1px solid #46B180;
			border-radius: 8rpx;
			&:first-child{
				color: #46B180;
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
