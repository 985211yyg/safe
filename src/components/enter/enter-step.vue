<template>
	<view class="step">
		<view class="step-first" v-for="(item, index) in stepArray" :key="item.step">
			<image :src="item.url" class="img"></image>
			<view class="text">
				<view class="num" :class="item.status ? 'active-num':''">{{ index + 1}}</view>
				<view class="name" :class="item.status ? 'active-name':''">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			step: {
				type: Number,
				default: 0
			}
		},
		mounted () {
			if (this.step === 1) {
				this.stepArray[1].url = '../../static/entry_informatin/bg-step2-green@2x.png'
				this.stepArray[1].status = 1
			} else if (this.step === 2) {
				this.stepArray[1].url = '../../static/entry_informatin/bg-step2-green@2x.png'
				this.stepArray[1].status = 1
				this.stepArray[2].url = '../../static/entry_informatin/bg-step3-green@2x.png'
				this.stepArray[2].status = 1
			}
		},
		data () {
			return {
				stepArray: [
					{ url: '../../static/entry_informatin/bg-step1-green.png', step: 1 , name: '第一步', status: 1 }, // 第一步
					{ url: '../../static/entry_informatin/bg-step2-gray.png' ,step: 2,  name: '第二步', status: 0  }, // 第二步灰
					{ url: '../../static/entry_informatin/bg-step3-gray.png', step: 4,  name: '第三步', status: 0  }, //第三步灰
					// { url: '../../static/entry_informatin/bg-step2-green@2x.png', step: 3,  name: '第二步'  }, //第二步
					// { url: '../../static/entry_informatin/bg-step3-green@2x.png', step: 5,  name: '第三步' } // 第三步
				],
				contentArray: [
					{ number: 1, content: '第一步', id: 100 },
					{ number: 2, content: '第二步', id: 200 },
					{ number: 3, content: '第三步', id: 300 }
				]
			}
		}
	}
</script>

<style lang="scss">
	.step {
		position: relative;
		@include flex-style(row,nowrap,center,center)
		
		.step-first {
			position:relative;
			width: 238rpx;
			height: 58rpx;
			
			.img {
				width: 100%;
				height: 58rpx;
			}
			
			.text {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0%;
				@include flex-style(row,nowrap,center,center)
				
				.num {
					margin: 0 10rpx;
					width: 24rpx;
					height: 24rpx;
					@include flex-style(row,nowrap,center,center)
					border-radius: 50%;
					font-size: 18rpx;
					font-family: Avanti;
					font-weight: bold;
					color:#FFF;
					background: #B0B4BA;
					// background:#B0B4BA;
				}
				
				.active-num {
					background: #46B180;
				}
				
				
				.name {
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #B0B4BA;
				}
				
				.active-name {
					color: #46B180;
				}
				
			}
		}
	}
</style>
