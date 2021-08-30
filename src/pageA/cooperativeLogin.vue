<template>
	<view>
		<custom-nav-bar :fixed="false"></custom-nav-bar>
		<view class="type">协作单位登录</view>
		<view class="login">
			<u-field v-model="login.unit" placeholder="请选择协作单位" label="|" label-width="100" focus
				:field-style="fieldStyle" @click="show = true" :clearable="false">
				<template #icon>
					<image src="../static/login/icon-company.png" class="icon"></image>
				</template>
				<template #right>
					<image src="../static/mine/actionicon.png" style="width: 14rpx;height: 23rpx;"></image>
				</template>
			</u-field>
			<u-field v-model="login.account" placeholder="请输入登录账号" label="|" label-width="100" :field-style="fieldStyle"
				:clearable="false">
				<template #icon>
					<image src="../static/login/icon-credit.png" class="icon"></image>
				</template>
			</u-field>
			<u-field v-model="login.password" placeholder="请输入密码" label="|" label-width="100" :field-style="fieldStyle"
				:clearable="false">
				<template #icon>
					<image src="../static/login/icon-password.png" class="icon"></image>
				</template>
			</u-field>

			<view class="login-btn-box">
				<view class="login-btn" @click="tapLogin()">登录</view>
			</view>

			<u-picker v-model="show" mode="selector" :range="selector" @confirm="confirm"></u-picker>
		</view>
	</view>
</template>

<script>
	import { setStorage } from '../common/utils.js'
	export default {
		created () {
			new this.$Api().request("companyList", "POST").then(result => {
				this.list = result
				result.forEach(ele => {
					this.selector.push(ele.company_name)
				})
			})
		},
		data() { 
			return {
				list: [],
				login: {
					unit: '',
					account: '',
					password: ''
				},
				fieldStyle: {
					fontSize: '30rpx',
					fontFamily: ' Source Han Sans CN',
					fontWeight: '500',
					color: '#3D403F'
				},
				show: false,
				selector: [],
			}
		},
		methods: {
			confirm(unit) {
				console.log(this.list[unit])
				this.login.unit = this.list[unit].company_name
				this.login.account = this.list[unit].uniform_social_credit_code
				this.login.password = this.list[unit].password
				this.show = false
			},
			tapLogin() {
				uni.showLoading({
					title: "登录中...",
				})

				setTimeout(() => {
					uni.hideLoading();
					new this.$Api().request("unitLogin", "POST", {
						code: this.login.account,
						password: this.login.password
					}).then(result => {
						setStorage("unitInfo", result)
					})
					this.$store.commit("user_setType", { type :3})
					this.$store.commit("user_setLogin",true)
					uni.showToast({
						title: "登录成功!",
						icon: "success"
					});
					uni.navigateTo({
						url: '../pages/login_register/main_tab'
					})
				}, 1000)
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
