<template>
	<view>
		<custom-nav-bar title="岗前五分钟">
			<view class="detail-top-bar" v-if="type==1">
				<view class="top-bar-left">
					<image src="../../static/five/cpmpany.png"></image>
					<!-- <image src="../../static/five/icon-construction-item@2x.png"></image> -->
					<text>智能交通分公司</text>
				</view>
				<text class="top-right-time">2021-04-12</text>
			</view>
			<view v-if="type==2">
				<view class="detail-top-bar-company">
					<text :class="[currentIndex==index ? 'active':'']" v-for="(item,index) in tabArr" :key="index" @tap="changeTab(item,index)">{{item.name}}</text>
				</view>
				<view v-if="subType==2" style="background-color: #F5F6F9;padding: 24rpx;">
					<five-item-box padding="26rpx 22rpx">
						<view class="subtype-area">
							<view class="subtype-item" v-for="(item,index) in subTabArr" @tap="selectSubCondition(item,index)" :key="index">
								<picker v-if="item.type=='date'" :class="[subCurrentIndex==index?'active':'']" mode="date" :value="subSelectObj.viewDate" :start="startDate" :end="endDate" @change="bindDateChange">
									<view>{{subSelectObj.viewDate.substring(0,subSelectObj.viewDate.length-3)}}</view>
								</picker>
								<picker v-else :class="[subCurrentIndex==index?'active':'']" @change="bindPickerChange($event,item)" :range="item.list" :range-key="item.rkeys">
									<view class="uni-input">{{item.title}}</view>
								</picker>
								<image v-if="subCurrentIndex==index" src="../../static/five/selected.png"></image>
								<image v-else src="../../static/five/noselect.png"></image>
							</view>
						</view>
					</five-item-box>
				</view>
			</view>
		</custom-nav-bar>
		<custom-status-bar :topSpace="44"></custom-status-bar>
		<view class="left-right-space" v-if="type==2 && subType==1">
			<five-item-box padding="26rpx 22rpx" marginTop="114rpx">
				<view class="number-area">
					<view class="number-item">
						<text>25</text>
						<text>待审核</text>
					</view>
					<view class="number-item">
						<text style="color: #46B180;">25</text>
						<text>已通过</text>
					</view>
					<view class="number-item">
						<text style="color:#F96C5E;">25</text>
						<text>未上报</text>
					</view>
					<view class="number-item">
						<text style="color:#F5981F;">25</text>
						<text>未施工</text>
					</view>
				</view>
			</five-item-box>
		</view>
		<view class="left-right-space" :style="{paddingTop:subType==2?'220rpx':'0'}">
			<five-porc-item v-for="(item,index) in 10" :key="index" @tap="toDetail(item)"></five-porc-item>
		</view>
	</view>
</template>

<script>
	import {getDate} from "../../common/utils.js"
	export default {
		data() {
			return {
				currentIndex:0,
				subCurrentIndex:0,
				type:1,//1按公司，2按项目
				subType:1,//1今日记录，2历史记录
				tabArr:[{name:"今日记录",id:1},{name:"历史记录",id:2}],
				subTabArr:[
					{title:"时间",props:"viewDate",type:"date",id:1},
					{title:"所属项目",props:"project",type:"default",id:2,rkeys:"name",list:[{name:"项目1",id:""},{name:"项目2",id:""},{name:"项目3",id:""}]},
					{title:"上报状态",props:"status",type:"default",id:3,rkeys:"name",list:[{name:"未上报",id:""},{name:"已上报",id:""},{name:"已审核",id:""}]}
				],
				subSelectObj:{
					viewDate:getDate(),
					project:"",
					status:""
				}
			};
		},
		computed: {
			startDate() {
				return getDate('start');
			},
			endDate() {
				return getDate('end');
			}
		},
		onLoad(e) {
			this.item = JSON.parse(e.item)
			this.type = e.type
		},
		methods:{
			changeTab(item,index){
				this.currentIndex = index
				this.subType = item.id
			},
			selectSubCondition(item,index){
				this.subCurrentIndex = index
			},
			bindDateChange(e){
				this.subSelectObj.viewDate = e.target.value
			},
			bindPickerChange(e,item){
				console.log(e)
				this.subSelectObj[item.props] = item.list[e.detail.value].name
				console.log(this.subSelectObj)
			},
			toDetail(item){
				this.$navigateTo("./five-history-detail?type=3")
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F6F9;
	}
	.detail-top-bar{
		@include flex-style(row,nowrap,space-between,center);
		@include boxsizing;
		background-color: #fff;
		padding: 24rpx 27rpx 32rpx;
		.top-bar-left{
			@include flex-style(row,nowrap,flex-start,center);
			image{
				width: 44rpx;
				height: 44rpx;
				margin-right: 18rpx;
			}
			text{
				@include default-font-style;
			}
		}
		.top-right-time{
			font-size: 28rpx;
			font-family: Avanti;
			font-weight: bold;
			color:$val_color;
		}
	}
	.detail-top-bar-company{
		@include flex-style(row,nowrap,space-between,center);
		background-color: #fff;
		padding-bottom: 1rpx;
		text{
			width: 50%;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			font-size: 34rpx;
			font-family:$font_family;
			font-weight: 500;
			color: #7D7B89;
			&.active{
				border-bottom: 1px solid #46B180;
				color: #46B180;
			}
		}
	}
	.number-area{
		@include flex-style(row,nowrap,space-between,center);
		.number-item{
			@include flex-style(column,nowrap,center,center);
			text{
				&:first-child{
					font-size: 38rpx;
					font-family: DIN;
					font-weight: 500;
					color: #458BFF;
				}
				&:last-child{
					margin-top: 12rpx;
					font-size: 28rpx;
					font-family: $font_family;
					font-weight: 500;
					color: #7D7B89;
				}
			}
		}
	}
	.subtype-area{
		@include flex-style(row,nowrap,space-between,center);
		.subtype-item{
			@include flex-style(row,nowrap,center,center);
			picker{
				font-size: 28rpx;
				font-family: $font_family;
				font-weight: 500;
				color: $val_color;
				margin-right: 10rpx;
				&.active{
					color: #46B180;
				}
			}
			image{
				width: 18rpx;
				height: 14rpx;
			}
		}
	}
</style>
