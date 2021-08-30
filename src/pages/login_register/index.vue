<template>
	<view class="index">
		<custom-nav-bar :fixed="false" :backIconShow="false"></custom-nav-bar>
		<u-modal class="index_dialog" v-model="show" :show-cancel-button="true" :content="dialogContent"
			:title-style="{color: '#46B180'}" confirm-color="#46B180" confirm-text="去填报" @confirm="confirm"
			@cancel="cancel" cancel-text="取消"></u-modal>
		<image class="logo" src="/static/index/img-login.png"></image>
		<view class="index_options">
			<view class="index_btn" v-for="btn in btnOptions" :key="btn.id" @click="tapBtnLink(btn)">
				{{ btn.text }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		created() {
			// console.log(Object.keys(this.$store.state.user.userInfo).length)
			// 判断当前用户是否已注册
		},
		data() {
			return {
				show: false,
				dialogContent: "您还没有填报个人信息！",
				btnOptions: [{
						text: '个人信息填报与展示',
						id: 1,
						path: '/pageA/baseInfo'
					},
					{
						text: '个人登录',
						id: 2,
						path: '/pageA/personalLogin'
					},
					{
						text: '协作单位登录',
						id: 3,
						path: '/pageA/cooperativeLogin'
					},
				]
			}
		},
		methods: {
			tapBtnLink(link) {
				uni.navigateTo({
					url: link.path
				})
			},
			confirm() {
				console.log('confirm')
				this.show = false
				uni.navigateTo({
					url: "/pageA/baseInfo"
				})

			},
			cancel() {
				this.show = false

			}
		}
	}
</script>

<style lang="scss">
	.index {
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #FFFFFF;

		.logo {
			width: 100%;
			height: 624rpx;
		}

		.index_options {
			width: 100%;

			@include flex-style(column, nowrap, center, center) .index_btn {
				width: 600rpx;
				height: 90rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: linear-gradient(90deg, #46B180, #5ED0B4);
				box-shadow: 0 0 34rpx 0 rgba(52, 136, 99, 0.2);
				border-radius: 45rpx;
				margin-top: 50rpx;
			}

			.index_btn:first-child {
				margin-top: 105rpx;
			}
		}
	}
</style>
