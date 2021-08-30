<template>
	<view>
		<custom-nav-bar title="作业工序"></custom-nav-bar>
		<custom-status-bar :topSpace="44"></custom-status-bar>
		<five-swiper-bar :item="firstProcessList" keys="title" @changeBar="getBarItem"></five-swiper-bar>
		<view class="select-process-box">
			<scroll-view scroll-y="true" class="process-left" :show-scrollbar="false">
				<view :class="[currentIndex == index ? 'active':'']" v-for="(item,index) in leftItem" :key="index" @tap="showRight(item,index)">{{item.title}}</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="process-right" :show-scrollbar="false">
				<view class="right-item" v-for="(item,index) in rightItem" :key="index">
					<five-radio marginLeft="23rpx" :item="item" :isChecked="item.isChecked" @change="getRightItem($event,item)">
						<text class="right-item-name">{{item.title}}</text>
					</five-radio>
				</view>
			</scroll-view>
		</view>
		<view style="padding:0 25rpx 40rpx;">
			<scroll-view scroll-y="true" class="has-select-process" :show-scrollbar="false">
				<view class="">
					您已选择工序：
				</view>
				<view>
					{{selectContent.replace(',',";")}}
				</view>
			</scroll-view>
			<button class="sign-btn" @tap="confirmSelectProcess">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex:0,
				firstProcessList:[],
				leftItem:[],
				rightItem:[],
				selectArr:[],
				selectContent:''
			};
		},
		onLoad() {
			this.getProcessList(0)
		},
		methods:{
			async getProcessList(code){
				this.$showLoading("正在获取工序数据")
				const res =await new this.$Api("query").request("processTree","get",{p_code:code},true);
				if(code==0){
					this.firstProcessList =await this.getProcessList(res[0].code)
					this.leftItem = await this.getProcessList(this.firstProcessList[0].code)
					this.rightItem = await this.getProcessList(this.leftItem[0].code)
					this.rightItem.map(v=>{
						v.isChecked = false
					})
					this.$forceUpdate()
					console.log(this.rightItem)
				}
				return res
			},
			async getTapBarList(code){
				this.getProcessList(code)
			},
			async getBarItem(e){
				const {code} = e
				this.currentIndex = 0
				this.leftItem = await this.getProcessList(code)
				this.rightItem = await this.getProcessList(this.leftItem[0].code)
				this.rightItem.map(v=>{
					v.isChecked = false
				})
				this.$forceUpdate()
			},
			async showRight(item,index){
				this.currentIndex = index
				const {code} = item
				this.rightItem = await this.getProcessList(code)
				this.rightItem.map(v=>{
					v.isChecked = false
				})
				this.$forceUpdate()
			},
			getRightItem(e,item){
				if(e.value){
					this.selectArr.push(item)
				}
				if(!e.value){
					for(let i = 0;i<this.selectArr.length;i++){
						if(this.selectArr[i].id == item.id){
							this.selectArr.splice(i,1);
							i-=1
						}
					}
				}
				let arr = []
				this.selectArr.map((v,index)=>{
					arr.push(index+1 +'、'+v.title)
				})
				this.selectContent = arr.toString()
			},
			confirmSelectProcess(){
				this.detailArr = []
				this.selectArr.map(async v=>{
					const res = await this.getDetail(v.code)
					this.detailArr = this.detailArr.concat(res)
					uni.$emit("selectedProcess",[this.selectArr,this.selectContent,this.detailArr])
				})
				setTimeout(()=>{
					this.$navigateBack()
				},1000)
			},
			async getDetail(code){
				const res =await new this.$Api("query").request("getConstructStandard","get",{code:code},true);
				return res
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F6F9;
	}
	.select-process-box{
		@include flex-style(row,nowrap,space-between,flex-start);
		padding: 24rpx;
		.process-left{
			@include boxsizing;
			width: 40%;
			min-height: 200px;
			max-height: 360px;
			view{
				@include boxsizing;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				height: 100rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #414043;
				padding: 22rpx 20rpx;
				border-bottom: 1px solid #fff;
			}
			view.active{
				color: #000;
				background-color: #fff;
			}
		}
		.process-right{
			@include boxsizing;
			flex: 1;
			min-height: 260px;
			max-height: 400px;
			background-color: #fff;
			padding-left: 50rpx;
			.right-item{
				padding:36rpx 0;
				.right-item-name{
					color: #7D7B89;
				}
			}
		}
	}
	.has-select-process{
		background-color: #fff;
		max-height: 300rpx;
		border-radius: 10rpx;
		@include boxsizing;
		view{
			&:first-child{
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #7D7B89;
				padding: 30rpx 30rpx 12rpx;
			}
			&:last-child{
				padding: 30rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #414043;
			}
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
</style>
