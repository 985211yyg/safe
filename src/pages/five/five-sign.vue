<template>
	<view class="five-sign-page">
		<custom-nav-bar title="安全教育培训"></custom-nav-bar>
		<custom-status-bar :topSpace="44"></custom-status-bar>
		<five-item-box padding="11rpx 21rpx">
			<view>
				<view class="sign-project-item">
					<text>项目名称</text>
					<text>{{userInfo.project_name}}</text>
				</view>
				<view class="sign-project-item">
					<text>培训时间</text>
					<!-- <text class="time-color">2021-04-12  12:00:00</text> -->
					<uni-datetime-picker :border="false" v-model="formParams.construction_time"></uni-datetime-picker>
				</view>
				<view class="sign-project-item">
					<text class="letter-style">培&nbsp;训&nbsp;人</text>
					<text>{{formParams.create_user_name}}</text>
				</view>
				<view class="sign-project-item">
					<text>是否施工</text>
					<view class="project-radio">
						<five-radio :isChecked="yes" @change="isYes">是</five-radio>
						<five-radio :isChecked="no" style="margin-left: 68rpx;" @change="isNo">否</five-radio>
					</view>
				</view>
			</view>
		</five-item-box>
		<five-item-box padding="11rpx 21rpx 28rpx" marginTop="25rpx">
			<view>
				<view class="sign-project-item sign-train-item">
					<text>培训类型</text>
					<picker :range="tranTypeArr" range-key="name" @change="selectTrainType">
						<view>{{currentTrainType}}</view>
					</picker>
					<image class="margin-right" src="../../static/mine/actionicon.png"></image>
				</view>
				<view class="sign-project-item sign-addr-item">
					<text>施工地点</text>
					<input type="text" v-model="formParams.construction_address" placeholder="自动定位或手动输入" placeholder-style="color:#C4C4C4"/>
					<image style="width: 36rpx;height: 40rpx;" class="margin-right" src="../../static/five/icon-addr.png" @tap="getWorkAddr"></image>
				</view>
				<view class="sign-project-item sign-addr-item" @tap="addWorkProcedure">
					<text>作业工序</text>
					<image class="margin-right" src="../../static/five/add.png"></image>
				</view>
				<view class="sign-procedure-box">
					{{formParams.process_name}}
				</view>
				<view class="procedure-line"></view>
				<view class="sign-danger-box">
					<view class="sign-danger-title">风险源</view>
					<view class="sign-danger-item">
						<five-danger-item :level="item.code" :title="item.name" v-for="(item,index) in dangerInfoArr" style="width: 32%;" :key="index"></five-danger-item>
					</view>
				</view>
				<view class="procedure-line"></view>
				<view class="sign-content">
					<view class="sign-danger-title">交底内容</view>
					<textarea maxlength="-1" class="sign-procedure-box" v-model="formParams.consturction_content"/>
					<!-- <view class="sign-procedure-box">
						1、按要求发放劳动防护用品； 2、开展安全教育和培训、安全技术交底工作、发现问题及时督促整改。
					</view> -->
				</view>
			</view>
		</five-item-box>
		<five-img-list :imgList="imgList" @uploadImg="uploadImg" @delImg="delImg"></five-img-list>
		<button type="button" class="sign-btn" @tap="startSign">开始签到</button>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	import {formatDate} from "../../common/formatdate.js"
	import {arrayDuplication} from "../../common/utils.js"
	export default {
		data() {
			return {
				WorkAddr:"",
				yes:false,
				no:true,
				tranTypeArr:[{name:"岗前五分钟",id:"1"}],
				currentTrainType:"岗前五分钟",
				imgList:[],
				dangerInfoArr:[],
				formParams:{
					construction_time:formatDate("yyyy-MM-dd hh:mm:ss",new Date()),
					company_id :"", //'外包单位ID')
					company_name :"",//'外包单位名称')
					project_id : "",
					project_name : "",
					construction_state :3,//施工状态（1_未上报，2_已上报，3_未施工）')
					create_user_id:"",
					create_user_name : "",
					construction_address :"",//'施工地点'
					process_id:"", //'工序ID')
					risk_id:"", //风险ID')
					process_name:"", //工序内容')
					process_num:0,//'工序数量')
					risk_name:"",//'风险内容')
					risk_num :0,//'风险数量')
					consturction_content :"",//施工内容')
					consturction_content_num:0, //'施工内容数量')
					construction_content_id:"",//'施工内容ID')
					type:1,//1.岗前5分钟2.安全教育')
					before_imgs:"",
					after_imgs:"",
					// security_id = Column(String(36), comment='安全交底人ID')
					// security_name = Column(String(200), comment='安全交底人名称')
					// construction_user_num = Column(Integer, comment='施工人数')
					// longitude = Column(Numeric(18, 8), comment='经度')
					// latitude = Column(Numeric(18, 8), comment='纬度')
					// group_team_id = Column(String(36), comment='班组ID')
					// group_team_name = Column(String(200), comment='班组名称')
					// is_del = Column(Integer, comment='删除标识')
					// create_time = Column(String(300), comment='创建时间')
					// note = Column(String(1000), comment='备注')
					// consturction_content = Column(String(3000), comment='施工内容')
					// consturction_content_num = Column(Integer, comment='施工内容数量')
					
					// construction_content_id = Column(String(1000), comment='施工内容ID')
					
					// duty_id = Column(String(36), comment='项目负责人ID')
					// duty_name = Column(String(50), comment='项目负责人')
					// vehicle_num = Column(String(10), comment='施工车辆')
				}
			}
		},
		computed:{
			...mapState({
				userInfo:state => state.user.userInfo
			})
		},
		onLoad() {
			this.formParams.company_id = this.userInfo.company_id //'外包单位ID')
			this.formParams.company_name = this.userInfo.company_name//'外包单位名称')
			this.formParams.project_id = this.userInfo.project_id
			this.formParams.project_name = this.userInfo.project_name
			this.formParams.create_user_id = this.userInfo.user_id
			this.formParams.create_user_name = this.userInfo.user_name
			uni.$on("selectedProcess",(e)=>{
				let process_idArr = []
				let dangerArr = []
				let dangerNameArr = []
				let dangerIds = []
				let contentArr = []
				let contentIds = []
				let num = 0
				const [selectArr,selectContent,detailArr] = e
				selectArr.map(v=>{
					process_idArr.push(v.id)
				})
				this.formParams.process_name = selectContent
				this.formParams.process_id = process_idArr.toString()
				this.formParams.process_num = selectArr.length
				detailArr.map(v=>{
					if(v.info){
						num++
						const {info:{infos,id,risk_name,risk_code}} = v
						contentArr.push(num+"、"+infos)
						contentIds.push(id)
						dangerArr.push({code:risk_code,name:risk_name})
					}
				})
				this.formParams.consturction_content = contentArr.toString()
				this.formParams.consturction_content_num = contentArr.length
				this.formParams.construction_content_id = contentIds.toString()
				this.dangerInfoArr = arrayDuplication(dangerArr)
				this.dangerInfoArr.map(v=>{
					dangerNameArr.push(v.name)
					dangerIds.push(v.code)
				})
				this.formParams.risk_name = dangerNameArr.toString()
				this.formParams.risk_num = dangerNameArr.length
				this.formParams.risk_id = dangerIds.toString()
			})
		},
		methods: {
			isYes(e){
				this.yes = true
				this.no = false
			},
			isNo(e){
				this.yes = false
				this.no = true
			},
			selectTrainType(e){
				const {target:{value}} = e
				this.currentTrainType = this.tranTypeArr[tranTypeArr].name
			},
			getWorkAddr(){
				uni.chooseLocation({
				    success:(res)=>{
						this.formParams.construction_address = res.address
				        // console.log('纬度：' + res.latitude);
				        // console.log('经度：' + res.longitude);
				    }
				});
			},
			addWorkProcedure(){
				this.$navigateTo("five-Select-process")
			},
			uploadImg(e){
				this.imgList = e
				this.$uploadImg("/uploadfile",(res)=>{
					const {records:[{path}]} = res
					this.imgList.push(path)
					this.formParams.before_imgs = this.imgList.toString()
				})
			},
			delImg(e){
				this.imgList = e
				this.formParams.before_imgs = this.imgList.toString()
			},
			async startSign(){
				// console.log(this.formParams)
				const res = await new this.$Api().request("addOrUpdate","",this.formParams,true);
				this.$navigateTo("./five-group-leader-sign")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.five-sign-page{
		@include boxsizing;
		background-color: #F5F6F9;
		padding:24rpx 24rpx 60rpx;
		.sign-project-item{
			@include flex-style(row,nowrap,flex-start,center);
			padding-top: 30rpx;
			padding-bottom: 30rpx;
			padding-left: 15rpx;
			@include border-after(#F1F1F1);
			text{
				height:$label_size;
				line-height: $label_size;
				&:first-child{
					width: 120rpx;
					@include boxsizing;
					color: $label_color;
					font-size: $label_size;
					font-family: $font_family;
					font-weight: 500;
					margin-right: 107rpx;
				}
				&:last-child{
					font-size: $label_size;
					font-family: $font_family;
					font-weight: 500;
					color: $val_color;
				}
			}
			.time-color{
				font-family:$font_family_time;
			}
			.letter-style{
				letter-spacing: 4rpx;
			}
			.project-radio{
				@include flex-style(row,nowrap,flex-start,center);
			}
			text.add-work-icon{
				width: 34rpx;
				height: 34rpx;
				text-align: center;
				line-height: 31rpx;
				color: #fff;
				background-color: #46B180;
				border-radius: 4px;
			}
			&:last-child{
				@include border-after(#fff);
			}
		}
		.sign-train-item{
			justify-content: space-between;
			picker{
				flex:1;
			}
			image{
				width:7px;
				height: 11px;
				margin-left: -18rpx;
				margin-right:12rpx;
				position:relative;
				z-index:0;
			}
		}
		.sign-addr-item{
			justify-content: space-between;
			input{
				flex: 1;
				font-size: 30rpx;
				font-family: $font_family;
				font-weight: 500;
				color: $val_color;
			}
			image{
				width:36rpx;
				height: 36rpx;
			}
			.margin-right{
				margin-right: 9rpx;
			}
		}
		.sign-btn{
			height: 90rpx;
			background: #46B180;
			border-radius: 8rpx;
			margin-top: 28rpx;
			font-size: 36rpx;
			font-family:$font_family;
			font-weight: bold;
			color: #FFFFFF;
			&::after{
				border: 0;
			}
		}
		.sign-procedure-box{
			background: #F5F6F7;
			border-radius: 10rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: $val_color;
			@include boxsizing;
			padding: 34rpx 27rpx;
		}
		.procedure-line{
			width: 100%;
			padding-bottom: 22rpx;
			@include border-after(#F1F1F1);
		}
		.sign-danger-box{
			margin-top: 36rpx;
			.sign-danger-title{
				padding-left: 15rpx;
				height: 29rpx;
				line-height: 29rpx;
				font-size: $label_size;
				font-family: $font_family;
				font-weight: 500;
				color: #7D7B89;
			}
			.sign-danger-item{
				margin-top: 16rpx;
				@include flex-style(row,wrap,space-between,center);
			}
		}
		.sign-content{
			margin-top: 36rpx;
			.sign-danger-title{
				padding-left: 15rpx;
				margin-bottom: 36rpx;
				height: 29rpx;
				line-height: 29rpx;
				font-size: $label_size;
				font-family: $font_family;
				font-weight: 500;
				color: #7D7B89;
			}
			.sign-procedure-box{
				width:100%;
				height:200px;
			}
		}
	}
</style>
