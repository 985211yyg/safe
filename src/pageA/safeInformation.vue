<template>
	<view>
		<custom-nav-bar title="安全资料">
			<view class="tabbar-box">
				<view class="tabbar"
				 :class="currentTabbar === index ? 'active':'' "
				  v-for="(tab, index) in tabbar" :key="index" @click="tabbarClick(index)">
				  {{ tab.name }}
				 </view>
			</view>
		</custom-nav-bar>
		
		<custom-status-bar :topSpace="90"></custom-status-bar>
		
		<view class="staf-list">
			<safe-program v-if="currentTabbar === 0"></safe-program>
			<safe-forecast v-else-if="currentTabbar === 1"></safe-forecast>
			<safe-mechanism v-else></safe-mechanism>
		</view>
		
		<custom-loading title="没有更多了"></custom-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbar: [
					{ name: '重大专项方案', type: 1 },
					{ name: '地质超前预报', type: 2 },
					{ name: '双重预防机制', type: 3 }
				],
				currentTabbar: 0
			};
		},
		methods:{
			tabbarClick (current) {
				this.currentTabbar = current
			}
		},
		onReachBottom () {
			console.log('bottom')
			// ajax request
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F6F9;
		position: relative;
		
		.tabbar-box {
			height: 90rpx;
			border-top: 1px solid #F5F6F9;
			@include flex-style(row,nowrap,center,center)
			
			.tabbar {
				height:100%;
				flex:1;
				@include flex-style(row,nowrap,center,center);
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #AAAAAA;
			}
			
			.tabbar:nth-child(2) {
				border-left:1px solid #F5F6F9;
				border-right:1px solid #F5F6F9;
			}
			
			.active {
				border-bottom: 1px solid  #46B180;
				color: #46B180;
			}
		}
	}
</style>
