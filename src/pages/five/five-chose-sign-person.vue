<template>
	<view>
		<custom-nav-bar title="请选择">
			<five-person-search @search="searchSignPerson"></five-person-search>
		</custom-nav-bar>
		<custom-status-bar :topSpace="106"></custom-status-bar>
		<view class="person-list-box">
			<five-item-box padding="33rpx 26rpx">
				<five-radio @change="selectAllPerson">全选</five-radio>
			</five-item-box>
			<five-item-box padding="32rpx 24rpx" marginTop="24rpx">
				<view>
					<!-- <view class="person-classify-title">
						普工
					</view> -->
					<view class="person-item" v-for="(item,index) in personList" :key="index">
						<five-radio marginLeft="27rpx">
							<view class="person-info">
								<view class="person-header">
									<image :src="baseUrl+item.face_image_file" mode="aspectFit"></image>
								</view>
								<text>{{item.user_name}}</text>
							</view>
						</five-radio>
					</view>
				</view>
			</five-item-box>
			<!-- <five-item-box padding="32rpx 24rpx" marginTop="24rpx">
				<view>
					<view class="person-classify-title">
						特种工
					</view>
					<view class="person-item" v-for="(item,index) in 4" :key="index">
						<five-radio marginLeft="27rpx">
							<view class="person-info">
								<view class="person-header">
									<image src="../../static/five/add.png" mode="aspectFit"></image>
								</view>
								<text>上三</text>
							</view>
						</five-radio>
					</view>
				</view>
			</five-item-box> -->
		</view>
	</view>
</template>
<!-- 1_普工，2_临时工，3_其他，4_特种作业人员 -->
<script>
	import {mapState} from "vuex"
	import {baseUrl} from "../../common/server.js"
	export default {
		data() {
			return {
				baseUrl:baseUrl,
				personList:[]
			};
		},
		computed:{
			...mapState({
				userInfo:state => state.user.userInfo,
				type:state => state.user.type,
			})
		},
		onLoad() {
			this.getSignPerson()
		},
		methods:{
			async getSignPerson(){
				const res= await new this.$Api().request("checkUser","",{
					company_id:this.userInfo.company_id,
					project_id:this.userInfo.project_id,
					user_type:this.type,
					org_type: 0,
					check_status: 2
				},true)
				this.personList = res
			},
			searchSignPerson(e){
				
			},
			selectAllPerson(){
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F6F9;
	}
	.person-list-box{
		@include boxsizing;
		padding: 24rpx 24rpx 80rpx;
	}
	.person-classify-title{
		font-size: 34rpx;
		font-family: $font_family;
		font-weight: 500;
		color: #000000;
		padding-bottom: 27rpx;
		padding-left: 7rpx;
		margin-bottom: 9rpx;
		@include boxsizing;
		@include border-after(#F1F1F1);
	}
	.person-item{
		@include boxsizing;
		@include border-after(#F1F1F1);
		padding: 20rpx 0;
		.person-info{
			@include flex-style(row,nowrap,flex-start,center);
			.person-header{
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 27rpx;
				image{
					max-width: 100%;
					max-height: 100%;
				}
			}
			text{
				@include default-font-style;
			}
		}
	}
</style>
