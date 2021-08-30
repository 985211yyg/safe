<template>
	<view class="worker_manager_page">
		<custom-nav-bar title="工人管理" :fixed="false"></custom-nav-bar>
		<view class="worker-exam" @tap="examWorkerList">
			<text>待审核工人</text>
			<view>
				<text>{{ this.checkUserCount.length }}</text>
				<image src="../../static/mine/actionicon.png"></image>
			</view>
		</view>
		<view class="search" style="background-color: white;padding: 19rpx 25rpx;">
			<u-search placeholder="请输入工人姓名" v-model="keyword" shape="square" :clearabled="true" :show-action='false'
				bg-color="#FFF" border-color="#F1F1F1" placeholder-color="#C4C4C4" search-icon-color="#C4C4C4">
			</u-search>
		</view>
		<view class="content">
			<worker-item v-on:onMoreClick="onMoreClick" v-for="(item,index) in worklist" :key="index" :workInfo="item" ></worker-item>
		</view>
		<u-picker v-model="workerSettingShow" mode="selector" :range="range" @cancel="cancel" @confirm="confirm">
		</u-picker>
	</view>
</template>

<script>
	import workerItem from './worker-item.vue';
	import { getStorage } from '../../common/utils.js'
	export default {
		components: {
			workerItem
		},
		created () {
			this.getWorklist()
		},
		data() {
			return {
				keyword: "",
				workerSettingShow: false,
				range: ["设为班组长", "设为工人", "设为黑名单"],
				worklist: [],
				UserId: '',
				checkUserCount: []
			};
		},
		methods: {
			getWorklist () {
				new this.$Api().request('workerList', 'POST', {
					project_id: getStorage('userInfo').project_id,
					company_id: getStorage('userInfo').company_id,
					user_type: 2,
					org_type: 1
				}).then(res => {
					this.worklist = res
					this.worklist.forEach(ele => {
						if (ele.check_status === 1) {
							this.checkUserCount.push(ele)
						}
					})
					console.log(this.checkUserCount)
				})
			},
			examWorkerList(){
				this.$navigateTo("worker-exam")
			},
			onMoreClick(UserId) {
				this.UserId = UserId
				this.workerSettingShow = true
			},
			cancel() {
				this.workerSettingShow = false
			},
			confirm(val) {
				if (val[0] !== 2) {
					new this.$Api().request('setWokerRole','POST', {
						user_id: this.UserId,
						user_identity: val[0] + 1
					}).then(res => {
						this.$showToast('设置成功')
						this.getWorklist()
						this.workerSettingShow = false
					})
				} else {
					new this.$Api().request('setBlockUser','POST', {
						user_id: this.UserId,
						is_block: 1
					}).then(res => {
						this.$showToast('设置成功')
						this.getWorklist()
						this.workerSettingShow = false
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F6F9;

		.worker_manager_page {
			.worker-exam{
				@include flex-style(row,nowrap,space-between,center);
				@include boxsizing;
				@include border-before;
				padding: 35rpx 52rpx 38rpx 49rpx;
				font-size: 34rpx;
				font-weight: bold;
				background-color: #fff;
				margin-bottom: 24rpx;
				>text{
					font-family: PingFang SC;
					color: #000000;
				}
				view{
					@include flex-style(row,nowrap,flex-end,center);
					text{
						font-family: Avanti;
						color: #F96C5E;
					}
					image{
						width:12rpx;
						height: 18rpx;
						margin-left: 18rpx;
					}
				}
			}
			.content {
				width: 100%;
				display: flex;
				flex-direction: column;
			}
		}
	}
</style>
