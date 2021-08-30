<template>
	<view class="main_tab">
		<custom-nav-bar :fixed="false" :backIconShow="false"></custom-nav-bar>
		<view class="main_tab_tabview">
			<home v-if="currentIndex==0"></home>
			<mine v-if="currentIndex==1"></mine>
		</view>
		<view class="main_tab_tabbar_container">
			<view class="main_tab_tabbar_home" :class="currentIndex==0 ? 'active': '' " @click="switchTabview(0)">
				<image
					:src="currentIndex==0?'/static/tabIcon/icon-home-select.png':'/static/tabIcon/icon-home-default.png'"
					style="width: 34rpx;height: 34rpx;padding-bottom: 11rpx;"></image>
				<view>首页</view>
			</view>
			<view>
				<image src="../../static/tabIcon/icon-scan.png" style="width: 65rpx;height: 65rpx;"></image>
			</view>
			<view class="main_tab_tabbar_mine" @click="
				switchTabview(1)">
				<image
					:src="currentIndex==1?'/static/tabIcon/icon-mine-select.png':'/static/tabIcon/icon-mine-default.png'"
					style="width: 34rpx;height: 34rpx;padding-bottom: 11rpx;"></image>
				<view>我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import home from "../home/home.vue"
	import mine from "../mine/mine.vue"
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
			home,
			mine
		},
		data() {
			return {
				paddingBottomHeight: 0, //苹果X以上手机底部适配高度
				currentIndex: 0,
				barHeight: 44,

			};
		},
		computed: {
			...mapState({
				isLogin:state => state.user.isLogin
			})
		},
		methods: {
			switchTabview(index) {
				this.currentIndex = index;
			},
			//获取系统状态栏高度
			getSystemStatusBarHeight: function() {
				// #ifdef APP-PLUS
				var height = plus.navigator.getStatusbarHeight();
				this.barHeight = height;
				// #endif
				// #ifdef H5
				this.barHeight = 0;
				// #endif
				console.log(this.barHeight)
			},


		},
		created() {
			this.getSystemStatusBarHeight();
			let that = this;
			uni.getSystemInfo({
				success: function(res) {
					let model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
					model.forEach(item => {
						//适配iphoneX���上的底部，给tabbar一定高度的padding-bottom
						if (res.model.indexOf(item) != -1 && res.model.indexOf('iPhone') != -1) {
							that.paddingBottomHeight = 40;
						}
					})
				}
			});
			if(!this.isLogin) return this.$navigateTo("./index")
		},
		onLoad() {}
	}
</script>

<style lang="scss">
	.main_tab {
		background-color: white;

		.main_tab_tabview {
			flex-grow: 1;
			background-color: white;
		}

		.main_tab_tabbar_container {
			width: 100vw;
			height: 114rpx;
			position: fixed;
			bottom: 0;
			-webkit-transform: translateZ(0);
			border-top: whitesmoke 2rpx solid;
			display: flex;
			flex-direction: row;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: white;

			.main_tab_tabbar_home {
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 22rpx;
				font-family: Source Han Sans CN;

				.mine_title {
					font-size: 22rpx;
					color: #414043;
					font-family: Source Han Sans CN;
				}

				.mine_title_active {
					font-size: 22rpx;
					font-weight: bold;
					color: #45BF93;
					font-family: Source Han Sans CN;
				}

			}

			.main_tab_tabbar_mine {
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 22rpx;
				font-family: Source Han Sans CN;

			}

		}
	}
</style>
