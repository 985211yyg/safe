<template>
	<view>
		<custom-nav-bar title="历史签到">
			<five-time-search @selectTime="selectTime"></five-time-search>
		</custom-nav-bar>
		<custom-status-bar :topSpace="44"></custom-status-bar>
		<view class="history-list-item">
			<five-history-item v-for="(item,index) in listData" :hasRightIcon="false" :key="index" @viewDetail="viewDetail(item)"></five-history-item>
		</view>
		<custom-loading :title="loadingText"></custom-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				times:"",
				page:1,
				pageSize:6,
				listData:[{name:"",id:1},{name:"",id:1}],
				loadingText:"正在加载数据···"
			};
		},
		onReachBottom: function() {
			this.getHistoryReportList()
		},
		onPullDownRefresh: function() {
			this.refreshList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods:{
			refreshList() {
				this.page = 1;
				this.loadingText = "上拉加载更多..."
				this.listData = [];//清空数据
				this.getHistoryReportList()
			},
			selectTime(e){
				this.times = e
			},
			viewDetail(item){
				this.$navigateTo(`./five-history-detail?type=1&id=${item.id}`)
			},
			getHistoryReportList(){
				// if(res.code && res.code==200){
				// 	this.page++;
				// 	let listData = []
				// 	listData = res.data.records;
				// 	if (listData.length < this.pageSize)
				// 		this.loadingText = "没有更多数据了..."
				// 	if (listData.length > 0)
				// 		this.listData = this.listData.concat(listData);
				// }else{
				// 	this.loadingText = "没有更多数据了..."
				// 	this.$showToast(res.message)
				// }
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F6F9;
	}
	.history-list-item{
		padding: 124rpx 24rpx 0;
	}
</style>
