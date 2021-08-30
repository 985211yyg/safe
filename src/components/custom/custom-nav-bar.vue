<template>
	<view style="position: relative;">
		<view :class="[fixed?'nav-bar-fixed':'nav-bar-auto']" :style="{background:background,borderBottom:border?borderBottom:'none'}">
			<custom-status-bar v-if="statusBar"></custom-status-bar>
			<view class="bar-box nav-bar-box-center">
				<view class="center-width center-left" v-if="backIconShow" @tap="backEvent">
					<image class="back-img" :src="backIcon"></image>
				</view>
				<text class="center-width center-title" :style="{color:color,'font-size':tfsize,'font-weight':tfweight}">{{title}}</text>
				<text class="center-width" style="opacity: 0;"></text>
			</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-nav-bar",
		props:{
			backIconShow: { //返回按钮显示隐藏
				type: [Boolean, String],
				default: true
			},
			bgimg:{
				type: String,
				default: ""
			},
			title: {
				type: String,
				default: ""
			},
			backIcon:{//返回按钮图标黑色
				type: String,
				default: "../../static/five/back.png"
			},
			fixed: {//是否固定定位
				type: [Boolean, String],
				default: true
			},
			border: {//是否有底部边框
				type: [Boolean, String],
				default: false
			},
			color: {//字体颜色
				type: String,
				default: "#000000"
			},
			background: {//整个导航栏背景设置
				type: String,
				default: "#fff"
			},
			statusBar: {//是否需要去除状态栏的高度
				type: [Boolean, String],
				default: true
			},
			borderBottom: {//底部边框样式
				type: String,
				default: "1px solid #ededed"
			},
			tfweight:{//标题字体粗细
				type: String,
				default: "bold"
			},
			tfsize:{//标题字体大小
				type: String,
				default: "36rpx"
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			backEvent(){
				this.$navigateBack()
				this.$emit("backEvent")
			}
		}
	}
</script>

<style lang="scss" scoped>
	$font-title-size: 16px;
	.back-img{
		width: 18px;
		height: 22px;
	}
	.nav-bar-auto{
		width: 100%;
	}
	.nav-bar-fixed{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
	}
	.nav-bar-fixed,
	.nav-bar-auto{
		.bar-box{
			@include flex-style(row,nowrap,flex-start,center);
			@include boxsizing;
			padding: 0 8px;
			height: 44px;
			line-height: 44px;
		}
		.nav-bar-box-left{
			// text{
			// 	margin-left: 10px;
			// }
		}
		.nav-bar-box-center{
			.center-width{
				width: 30%;
			}
			.center-title{
				width: 40%;
				text-align: center;
				font-family: PingFang SC;
			}
			.center-left{
				@include flex-style(row,nowrap,flex-start,center);
				// text{
				// 	margin-left: 10px;
				// }
			}
		}
	}
</style>
