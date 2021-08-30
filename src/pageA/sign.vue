<template>
    <view class="content">
    		<custom-nav-bar :fixed="false"></custom-nav-bar>
    		<view class="box">
				<view class="left">
					<image src="../static/register/confirm.png" style="width: 90rpx;height: 576rpx;" @click="overSign()"></image>
				</view>
    					
    			<view class="middle">
    				<canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)' @touchend='end'
    					    @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
    				</canvas>
    			</view>
				
				<view class="right">
					<image src="../static/register/notice.png" style="width: 100rpx;height: 576rpx;"></image>
				</view>
    		</view>
    	</view>
</template>

<script>
    var content = null;
    var touchs = [];
    var canvasw = 0;
    var canvash = 0;
    var _that;
    //获取系统信息
    uni.getSystemInfo({
        success: function(res) {
            canvasw = res.windowWidth;
            canvash = res.windowHeight;
        },
    })
    export default {
        data() {
            return {
				confirmText: ['确','认','提','交'],
				signText: ['手','写','签','名'],
				noticeText:['请','在','下','面','输','入','手','写','签','名',',','以','确','保','信','息','真','实','性'],
                isEnd: false // 是否签名
            }
        },

        methods: {
            overSign () {
                if (this.isEnd) {
                    uni.canvasToTempFilePath({
                        canvasId: 'firstCanvas',
                        success: (res) => {
                            // 打印图片路径
                            // console.log(res)
							let signPath = ''
							uni.uploadFile({
								url: this.$baseUrl + "/uploadfile", 
								filePath: res.tempFilePath,
								name: "file",
								success: uploadFileRes => {
									let data = JSON.parse(uploadFileRes.data)
									const {
										records: [{
											path
										}]
									} = data
									signPath = path
								}
							})
							// 获取签名图片id
							// new this.$Api().request('sign', 'POST', res.tempFilePath).then(res => {
							// 	console.log(res)
							// })
							_that.$store.commit('setSignInfo', signPath)
							let params = {
								..._that.$store.state.registerBean.baseInfo,
							    ..._that.$store.state.registerBean.workInfo,
								..._that.$store.state.registerBean.materialinfo,
								..._that.$store.state.registerBean.singInfo
							}
							params.nucleic_testing_time = '2021-08-04T12:42:49.851Z'
							new _that.$Api().request("register", "POST", params, false).then(result => {
								//存储登录信息
								console.log(result)
								_that.$showToast('注册成功,请直接登录!')
								// uni.navigateTo({
								// 	url: '/pageA/sign'
								// })
							})
                        }
                    })
                } else {
                    uni.showToast({
                        title: '请先完成签名',
                        icon: "none",
                        duration: 1500,
                        mask: true
                    })
                }

            },

            // 画布的触摸移动开始手势响应
            start: function(event) {
                // console.log(event)
                console.log("触摸开始" + event.changedTouches[0].x)
                console.log("触摸开始" + event.changedTouches[0].y)
                //获取触摸开始的 x,y
                let point = {
                    x: event.changedTouches[0].x,
                    y: event.changedTouches[0].y
                }
                // console.log(point)
                touchs.push(point);

            },
            // 画布的触摸移动手势响应
            move: function(e) {
                let point = {
                    x: e.touches[0].x,
                    y: e.touches[0].y
                }
                // console.log(point)
                touchs.push(point)
                if (touchs.length >= 2) {
                    this.draw(touchs)
                }
            },

            // 画布的触摸移动结束手势响应
            end: function(e) {
                console.log("触摸结束" + e)
                // 设置为已经签名
                this.isEnd = true
                // 清空轨迹数组
                for (let i = 0; i < touchs.length; i++) {
                    touchs.pop()
                }

            },

            // 画布的触摸取消响应
            cancel: function(e) {
                console.log("触摸取消" + e)
            },

            // 画布的长按手势响应
            tap: function(e) {
                console.log("长按手势" + e)
            },

            error: function(e) {
                console.log("画布触摸错误" + e)
            },

            //绘制
            draw: function(touchs) {
                let point1 = touchs[0]
                let point2 = touchs[1]
                touchs.shift()
                content.moveTo(point1.x, point1.y)
                content.lineTo(point2.x, point2.y)
                content.stroke()
                content.draw(true)
            },
            //清除操作
            clearClick: function() {
                // 设置为未签名
                this.isEnd = false
                //清除画布
                content.clearRect(0, 0, canvasw, canvash)
                content.draw(true)
            },
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function(options) {
            _that = this
            //获得Canvas的上下文
            content = wx.createCanvasContext('firstCanvas')
            //设置线的颜色
            content.setStrokeStyle("#000")
            //设置线的宽度
            content.setLineWidth(5)
            //设置线两端端点样式更加圆润
            content.setLineCap('round')
            //设置两条线连接处更加圆润
            content.setLineJoin('round')
        },

    }
</script>

<style lang="scss">
	page {
		background-color: rgba(0,0,0,.5);
	}
	
	.content {
		.box {
			height: 1120rpx;
			margin: 48rpx 24rpx;
			background-color: #fff;
			display: flex;
			flex-direction: row;
			border-radius: 10rpx;
			
			.left {
				margin: 0 24rpx;
				display: flex;
				align-items: center;
			}
			
			.middle {
				margin-top: 43rpx;
				width: 430rpx;
				height: 979rpx;
				background: #F5F6F7;
				border-radius: 10rpx;
				.firstCanvas {
					height: 100%;
					width: 100%;
				}
			}
			
			.right {
				padding-top: 20rpx;
				padding-left: 20rpx;
			}
		}
	}
</style>
