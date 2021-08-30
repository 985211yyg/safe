<template>
	<view class="worker-item">
		<view class="top">
			<image class="avatar" :src="$baseUrl+ workInfo.face_image_file"></image>
			<view class="content">
				<view class="info">
					<view class="name">{{workInfo.user_name}}</view>
					<view class="tag in">
						{{ workInfo.on_job_state | filterJobState }}
					</view>
				</view>
				<view class="item">
					<image src="../../static/worker/icon-workType@2x.png"
						style="margin-right: 11rpx;width: 30rpx;height: 30rpx;"></image>
					<view>{{ workInfo.user_type | filterType}}</view>
				</view>
				<view class="item">
					<image src="../../static/worker/icon-telephone@2x.png"
						style="margin-right: 11rpx;width: 30rpx;height: 30rpx;"></image>
					<view>{{ workInfo.mobile_phone }}</view>
				</view>
				<view class="item">
					<image src="../../static/worker/icon-company@2x.png"
						style="margin-right: 11rpx;width: 30rpx;height: 30rpx;"></image>
					<view>{{ workInfo.company_name }}</view>
				</view>

			</view>
			<view class="more" @click="onMoreClick">
				<image src="../../static/worker/btn-more-default@2x.png" style="width: 50rpx;height: 50rpx;">
				</image>
			</view>

		</view>
		<view class="bottom" v-if="workInfo.is_block || workInfo.user_identity === 1">
			<u-checkbox-group size="26" active-color="#46B180">
				<u-checkbox label-size="28" shape="circle" v-model="item.checked" v-for="(item, index) in list"
					:key="index" :name="item.name">{{item.name}}</u-checkbox>
			</u-checkbox-group>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			workInfo: {
				type: Object,
				default: null
			}
		},
		created() {
			console.log(this.workInfo)
		},
		mounted() {
			if (this.workInfo.is_block === 1) {
				this.list[1].checked = true
			}
			if (this.workInfo.user_identity === 1) {

			}
			this.list[0].checked = true
		},
		data() {
			return {
				list: [{
						name: '班组长',
						checked: false,
					},
					{
						name: '黑名单',
						checked: false
					},
				],
				value: 'orange',
			};
		},
		methods: {
			onMoreClick() {
				this.$emit("onMoreClick", this.workInfo.user_id)
			}
		},
		filters: {
			filterType(val) {
				if (val === 1) {
					return '普工'
				} else if (val === 2) {
					return '临时工'
				} else if (val === 3) {
					return '其他'
				} else {
					return '特种作业人员'
				}
			},
			filterJobState(val) {
				if (val === 1) {
					return '在岗'
				} else if (val) {
					return '离岗'
				} else {
					return '撤岗'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.worker-item {
		background-color: white;
		margin: 24rpx 24rpx 0 24rpx;
		padding: 24rpx;
		border-radius: 10rpx;

		.top {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;

			.avatar {
				width: 150rpx;
				height: 200rpx;
				border-radius: 10rpx;
				color: #007AFF;
			}

			.content {
				margin-left: 30rpx;
				width: 300rpx;
				display: flex;
				flex-grow: 1;
				flex-direction: column;

				.info {
					align-items: center;
					display: flex;
					flex-wrap: wrap;
					flex-direction: row;

					.name {
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #000000;
					}

					.tag {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 62rpx;
						margin-left: 16rpx;
						height: 32rpx;
						border-radius: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						line-height: 32rpx;
						text-align: cent;
					}

					.tag.in {
						color: #FFFFFF;
						font-size: 18rpx;
						background-color: #46B180;
					}

					.tag.out {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 62rpx;
						margin-left: 16rpx;
						height: 32rpx;
						border-radius: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
						font-size: 18rpx;
						background-color: #FDA002;
					}

					.tag.go {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 62rpx;
						margin-left: 16rpx;
						height: 32rpx;
						border-radius: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
						font-size: 18rpx;
						background-color: #F96C5E;
					}

					.tag.tag.black {
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 0 15rpx;
						margin-left: 16rpx;
						height: 32rpx;
						border-radius: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #6E90C9;
						border: 1px #6E90C9 solid;
						font-size: 18rpx;
					}

					.tag.illegal {
						display: flex;
						align-items: center;
						justify-content: center;
						margin-left: 16rpx;
						padding: 0 15rpx;
						height: 32rpx;
						border-radius: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
						font-size: 18rpx;
						background-color: #F96C5E;
						border: #F96C5E 1rpx;
					}


				}

				.item {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					margin-top: 19rpx;



					view {
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #7D7B89;
						font-size: 22rpx
					}
				}

			}

			.more {}
		}
	}

	.bottom {
		padding-top: 10rpx;
	}
</style>
