<template>
	<view class="risk_item">
		<view class="risk_level" :class="levelClass">{{realLevel}}</view>
		<view class="risk_name">{{name}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			level: {
				type: Number,
				default: 1
			},
			name: {
				type: String,
				default: "伤害等级"
			}
		},
		data() {
			return {
				realLevel: "Ⅰ",
				levelClass: ""
			};
		},

		mounted() {
			switch (this.level) {
				case 1:
					this.realLevel = "Ⅰ";
					this.levelClass = "risk-first"
					break;
				case 2:
					this.realLevel = "Ⅱ";
					this.levelClass = "risk-second"
					break;
				case 3:
					this.realLevel = "Ⅲ";
					this.levelClass = "risk-thrid"
					break;
				case 4:
					this.realLevel = "Ⅳ";
					this.levelClass = "risk-four"
					break;

			}
			// console.log(this.level)
			// console.log(this.levelClass)

		}
	}
</script>

<style lang="scss">
	.risk_item {
		display: inline-flex;
		align-items: center;
		margin-right: 40rpx;

		//一级
		.risk_level {
			width: 22rpx;
			height: 22rpx;
			border-radius: 20rpx;
			line-height: 22rpx;
			text-align: center;
			font-size: 12rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			margin-right: 6rpx;


		}

		.risk-first {

			background-color: #845ef7;
		}

		.risk-second {
			background-color: #FDD102;
		}

		.risk-thrid {
			background-color: #FE7A1B;
		}

		.risk-four {
			background-color: #FC4D3B;
		}



		.risk_name {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF
		}
	}
</style>
