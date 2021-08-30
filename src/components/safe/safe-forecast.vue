<template>
	<view class="safe">
		<view class="list" v-for="(safe, index) in safeList" :key="index">
			<view class="name">
				<image src="../../static/safe/icon-pdf.png" class="file-type" v-if="safe.type === 0"></image>
				<image src="../../static/safe/icon-word.png"class="file-type" v-else></image>
				{{ safe.name }}
			</view>
			<view class="project">
				<image src="../../static/five/icon-belong-project@2x.png" class="icon"></image>
				<text class="text">项目</text>
				{{ safe.project }}
			</view>
			<view class="address">
				<image src="../../static/five/icon-address@2x.png" class="icon"></image>
				<text class="text">地址</text>
				{{ safe.address }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				safeList: [
					{ name: '复杂地质隧道工程施工风险方案', project: '宾南项目高速隧道机电项目', address: '宾南项目新民村隧道工程', type: 0 },
					{ name: '复杂地质隧道工程施工风险方案', project: '宾南项目高速隧道机电项目', address: '宾南项目新民村隧道工程', type: 1 },
					{ name: '复杂地质隧道工程施工风险方案', project: '宾南项目高速隧道机电项目', address: '宾南项目新民村隧道工程', type: 0  },
					{ name: '复杂地质隧道工程施工风险方案', project: '宾南项目高速隧道机电项目', address: '宾南项目新民村隧道工程', type: 1  },
					{ name: '复杂地质隧道工程施工风险方案', project: '宾南项目高速隧道机电项目', address: '宾南项目新民村隧道工程', type: 0  },
					{ name: '复杂地质隧道工程施工风险方案', project: '宾南项目高速隧道机电项目', address: '宾南项目新民村隧道工程', type: 1  },
					{ name: '复杂地质隧道工程施工风险方案', project: '宾南项目高速隧道机电项目', address: '宾南项目新民村隧道工程', type: 0 }
				]
			}
		}
	}
</script>

<style lang="scss">
	.safe {
		.list {
			margin: 24rpx;
			height: 225rpx;
			background-color: #FFF;
			border-radius: 10rpx;
			padding: 24rpx;
			
			.name {
				@include flex-style(row,nowrap,flex-start,center)
				height: 75rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #414043;
				
				.file-type {
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
				}
			}
			
			.project {
				@include flex-style(row,nowrap,flex-cent,center)
			}
			
			.project, .address {
				height: 75rpx;
				font-size: 22rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #414043;
				
				.icon {
					width: 23rpx;
					height: 21rpx;
				}
				
				.text {
					margin: 0 10rpx;
				}
			}
		}
	}
</style>
