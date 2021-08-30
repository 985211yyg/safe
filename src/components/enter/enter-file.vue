<template>
	<five-item-box padding="11rpx 21rpx 33rpx" :marginTop="marginTop">
		<view>
			<view class="sign-phone-item">
				<text class="title">{{title}}</text>
				<image v-if="isUpload" class="margin-right" src="../../static/five/upload.png" @click="uploadPic">
				</image>
			</view>
			<scroll-view class="sign-phone-list" scroll-x="true" :scroll-with-animation="true" v-if="imgArr.length">
				<view class="phone-list-item-box" v-for="(item,index) in imgArr" :key="index">
					<view class="phone-list-item">
						<text class="del" v-if="hasClose" @tap="delImg(index)">×</text>
						<image :src="getImgPath(item)" mode="widthFix" class="img" @click="tapImg(item)"></image>
					</view>
				</view>
			</scroll-view>
		</view>
	</five-item-box>
</template>

<script>
	export default {
		name: "five-img-list",
		props: {
			title: {
				type: String,
				default: ""
			},
			isUpload: {
				type: [String, Boolean],
				default: true
			},
			hasClose: {
				type: [String, Boolean],
				default: true
			},
			imgList: {
				type: Array,
				default: () => []
			},
			marginTop: {
				type: String,
				default: "25rpx"
			}
		},
		data() {
			return {
				imgArr: this.imgList,
			}
		},
		created () {
			console.log(this.$baseUrl)
		},
		watch: {
			imgList(val) {
				this.imgArr = val
			}
		},
		methods: {
			delImg(index) {
				this.imgArr.splice(index, 1)
				this.$emit("uploadPic", this.imgArr)
			},
			tapImg (imgList) {
				uni.previewImage({
				    urls: [this.$baseUrl+ imgList]
				})
			},
			uploadPic() {
				this.$uploadImg("/uploadfile", (res) => {
					const {
						records: [{
							path
						}]
					} = res
					this.imgArr.push(path)
					this.$emit("uploadPic", this.imgArr)
				}, () => {
					this.$showToast("上传失败")
				})
			},
			getImgPath (path) {
				if (path.includes('http')) {
					return path
				} else {
					return this.$baseUrl + path
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sign-phone-item {
		@include flex-style(row, nowrap, space-between, center);
		padding: 20rpx 0;

		text {
			height: $label_size;
			line-height: $label_size;
			width: 156rpx;
			font-size: $label_size;
			font-family: $font_family;
			font-weight: 500;
			color: $val_color;
		}

		.title {
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #7D7B89;
		}

		image {
			width: 38rpx;
			height: 30rpx;
		}

		.margin-right {
			margin-right: 9rpx;
		}
	}

	.sign-phone-list {
		height: 157rpx;
		@include boxsizing;
		white-space: nowrap;

		.phone-list-item-box {
			height: 157rpx;
			width: 148rpx;
			position: relative;
			overflow: visible;
			display: inline-block;
			@include boxsizing;
			margin-right: 23rpx;

			&:last-child {
				margin-right: 0;
			}

			.phone-list-item {
				margin-top: 17rpx;
				display: inline-block;
				width: 148rpx;
				height: 144rpx;
				border-radius: 10rpx;
				overflow: hidden;
				@include boxsizing;

				.del {
					display: inline-block;
					position: absolute;
					z-index: 40;
					top: 2rpx;
					right: -8rpx;
					width: 32rpx;
					height: 32rpx;
					font-size: 12px;
					line-height: 32rpx;
					text-align: center;
					border-radius: 50%;
					background-color: #F96C5E;
					color: #fff;
				}

				.img {
					width: 100%;
				}
			}
		}
	}
</style>
