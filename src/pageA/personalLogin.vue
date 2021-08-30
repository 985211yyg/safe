<template>
	<view class="personal-login-page">
		<custom-nav-bar :fixed="false"></custom-nav-bar>
		<view class="type">账号登录</view>
		<view class="login">
			<u-field v-model="account" placeholder="请输入登录账号" label="|" label-width="100" focus
				:field-style="fieldStyle">
				<template #icon>
					<image src="../static/five/icon-workerNum@2x.png" class="icon"></image>
				</template>
			</u-field>
			<u-field v-model="code" placeholder="请输入登录密码" label="|" label-width="100" :field-style="fieldStyle">
				<template #icon>
					<image src="../static/login/icon-password.png" class="icon"></image>
				</template>
			</u-field>

			<view class="login-btn-box">
				<view class="login-btn" v-for="type in loginType" :key="type.id" @click="login(type.id)">
					{{ type.type }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				fieldStyle: {
					fontSize: '30rpx',
					fontFamily: ' Source Han Sans CN',
					fontWeight: '500',
					color: '#3D403F'
				},
				loginType: [{
						type: '登录',
						id: 100
					},
					{
						type: '微信登录',
						id: 200
					},
				],
				code: "",
				account: ""
			}
		},
		methods: {
			login(type) {
				uni.showLoading({
					title: "登录中...",
				})
				if (type === 100) {
					this.accountLogin()
				} else {
					this.wxLogin()
				}
			},
			accountLogin() {
				if (this.code === '' || this.account === '') {
					this.$showToast('请输入正确的账号或密码')
					return
				} else {
					new this.$Api().request('userType', 'POST', {
						phone: this.account,
						password: this.code
					}).then(res => { 
						// type = 0 无用户 1 普通用户 2 公司内部用户
						this.$store.commit('user_setType', res)
						if (res.type === 1) {
							//普通用户
							new this.$Api().request('login', 'POST', {
								"login_account": this.account,
								"password": this.code
							}).then(userInfo => {
								this.$store.commit("user_setUserInfo", userInfo)
								this.$store.commit("user_setLogin", true)
								//获取用户菜单权限
								new this.$Api('query').request("workerAuthList", "POST", {
									"role_type": userInfo.user_type
								}).then(authlist => {
									//存储权限
									this.$store.commit("user_setAuthList", authlist)
									uni.showToast({
										title: "登录成功!",
										icon: "success"
									})
									uni.navigateTo({
										url: '../pages/login_register/main_tab'
									})
								})

							})
						} else if (res.type === 2) {
							//公司内部用户
							new this.$Api().request('leaderLogin', 'POST', {
								"login_account": this.account,
								"password": this.code
							}).then(userInfo => {
								this.$store.commit("user_setUserInfo", userInfo)
								this.$store.commit("user_setLogin", true)
								//获取用户菜单权限
								new this.$Api('query').request("leaderAuthList", "POST", {
									"org_type": userInfo.user_type
								}).then(authlist => {
									//存储权限
									this.$store.commit("user_setAuthList", authlist)
									uni.showToast({
										title: "登录成功!",
										icon: "success"
									})
									uni.navigateTo({
										url: '../pages/login_register/main_tab'
									})
								})
							})


						} else {
							this.$showToast('用户不存在')
						}
					})
				}
			},
			wxLogin() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log(res)
						uni.request({
							url: this.$baseUrl + '/api/vi/web/wechat/getWxacode',
							data: {
								code: res.code
							},
							header: {
								'content-type': 'application/json'
							},
							success: (res) => {
								uni.hideLoading()
								console.log(res.data)
								// res.data[0] open_id
								// res.data[1] UnionID
							}
						})
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFF;

		.u-filed,
		.u-filed-inner,
		.u-label,
		.u-label-text {
			color: #F1F1F1;
			height: 32rpx;
			width: 2rpx;
			justify-content: center;
			align-items: center;
		}

		.type {
			margin: 42rpx 48rpx;
			font-size: 60rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #3D403F;
		}

		.login {
			margin: 42rpx;

			.icon {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}

			.login-btn-box {
				margin: 50rpx;
				@include flex-style(column, nowrap, center, center);

				.login-btn {
					height: 100rpx;
					width: 650rpx;
					background: #46B180;
					box-shadow: -4rx 5rpx 19rpx 0rpx rgba(70, 177, 128, 0.19);
					border-radius: 50rpx;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 34rpx;
				}
			}
		}

	}
</style>
