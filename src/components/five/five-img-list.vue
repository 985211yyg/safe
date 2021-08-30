<template>
	<five-item-box padding="11rpx 21rpx 33rpx" :marginTop="marginTop">
		<view>
			<view class="sign-phone-item" @tap="uploadImg">
				<text>{{title}}</text>
				<image v-if="isUpload" class="margin-right" src="../../static/five/upload.png"></image>
			</view>
			<scroll-view class="sign-phone-list" scroll-x="true" :scroll-with-animation="true">
				<view class="phone-list-item-box" v-for="(item,index) in imgArr" :key="index">
					<view class="phone-list-item">
						<text v-if="hasClose" @tap="delImg(item)">×</text>
						<image :src="baseUrl+item" mode="aspectFill"></image>
					</view>
				</view>
			</scroll-view>
		</view>
	</five-item-box>
</template>

<script>
	import {baseUrl} from "../../common/server.js"
	export default{
		name:"five-img-list",
		props:{
			title:{
				type:String,
				default:"交底前照片"
			},
			isUpload:{
				type:[String,Boolean],
				default:true
			},
			hasClose:{
				type:[String,Boolean],
				default:true
			},
			imgList:{
				type:Array,
				default:()=>{}
			},
			marginTop:{
				type:String,
				default:"25rpx"
			}
		},
		data(){
			return {
				imgArr:this.imgList,
				baseUrl:baseUrl
			}
		},
		watch:{
			imgList(val){
				console.log(val)
				this.imgArr = val
			}
		},
		methods:{
			uploadImg(){
				this.$emit("uploadImg",this.imgArr)
			},
			delImg(item){
				for(let i = 0;i<this.imgArr.length;i++){
					if(this.imgArr[i]== item){
						this.imgArr.splice(i,1);
						i-=1
					}
				}
				this.$emit("delImg",this.imgArr)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sign-phone-item{
		@include flex-style(row,nowrap,space-between,center);
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		padding-left: 15rpx;
		text{
			height:$label_size;
			line-height: $label_size;
			min-width: 156rpx;
			font-size: $label_size;
			font-family: $font_family;
			font-weight: 500;
			color: $val_color;
		}
		image{
			width: 38rpx;
			height: 30rpx;
		}
		.margin-right{
			margin-right: 9rpx;
		}
	}
	.sign-phone-list{
		height: 157rpx;
		@include boxsizing;
		white-space: nowrap; 
		.phone-list-item-box{
			height: 157rpx;
			width: 148rpx;
			position: relative;
			overflow: visible;
			display: inline-block;
			@include boxsizing;
			margin-right: 23rpx;
			&:last-child{
				margin-right:0;
			}
			.phone-list-item{
				margin-top: 17rpx;
				display: inline-block;
				width: 148rpx;
				height: 144rpx;
				border-radius: 10rpx;
				overflow: hidden;
				@include boxsizing;
				text{
					display: inline-block;
					position: absolute;
					z-index: 40;
					top: 2rpx;
					right:0rpx;
					width: 32rpx;
					height: 32rpx;
					font-size: 12px;
					line-height: 32rpx;
					text-align: center;
					border-radius: 50%;
					background-color: #F96C5E;
					color: #fff;
				}
				image{
					max-width: 100%;
					max-height:100%;
				}
			}
		}
	}
</style>
