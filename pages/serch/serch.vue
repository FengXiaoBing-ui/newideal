<template>
	<view class="serch">
		<view class="serchwrap">
			<view class="serch_box">
				<input type="text" placeholder="请输入搜索关键词" confirm-type="search" @confirm="serchdata" v-model="keyword" />
				<view @click="serchdata">
					<image src="../../static/img/shaixuan.png" />
					<text>筛选</text>
				</view>
			</view>
			<view class="tag">
				<text @click="activetype(item.name, index)" :class="{ active: item.active == 'active' }" v-for="(item, index) in typelabel" :key="index">{{ item.name }}</text>
			</view>
		</view>
		<text style="position: absolute;top: 30%;left: 50%;transform: translateX(-50%);" v-if="nodata">未搜索到相关内容</text>
		<view class="listbot" v-if="isshow">
			<view class="courselist">
				<view class="courselist_box" v-for="(item, index) in video" :key="index" @click="videojump(item.maid)" >
					<view class="img">
						<image :src="item.video_icon" mode="aspectFill"></image>
						<view class="classTime">23:46</view>
					</view>

					<text class="title">{{ item.title }}</text>
					<view class="teach">
						<text>{{ item.teachername }} {{ item.subject ? item.subject : item.subjectname }}</text>
					</view>
					<view class="grade">
						<text>{{ item.gids ? item.gids : item.subjectname }}</text>
					</view>
				</view>
			</view>
			<view class="studentlist">
				<view class="courselist_box" v-for="(item, index) in student" :key="index" @click="studentjump(item.stid)">
					<view class="img"><image :src="item.stu_icon" mode="aspectFill"></image></view>

					<text class="title">{{ item.stu_name }}</text>
					<view class="teach">
						<text>{{ item.gradename }} | {{ item.classname }}</text>
					</view>
					<view class="grade">
						<text>推荐理由：{{ item.recommand }}</text>
					</view>
				</view>
			</view>
			<view class="courselist">
				<view class="courselist_box" v-for="(item, index) in ointment" :key="index" @click="ointmentjump(item.srid)">
					<view class="img"><image :src="item.video_icon" mode="aspectFill"></image></view>

					<text class="title">{{ item.title }}</text>
					<view class="teach">
						<text>{{ item.teachername }} {{ item.subject ? item.subject : item.subjectname }}</text>
					</view>
					<view class="grade">
						<text>{{ item.gids ? item.gids : item.subjectname }}</text>
						<view class="btn">预约</view>
					</view>
				</view>
			</view>
			<view class="courselist">
				<view class="courselist_box" v-for="(item, index) in allsubject" :key="index" @click="allsubjectjump()">
					<view class="img">
						<image :src="item.video_icon" mode="aspectFill"></image>
						<view class="classTime" v-if="!notime">浏览{{ item.watch_number }}</view>
					</view>

					<text class="title">{{ item.title }}</text>
					<view class="teach">
						<text>{{ item.subject ? item.subject : item.subjectname }}</text>
					</view>
					<view class="grade">
						<text>{{ item.gids ? item.gids : item.subjectname }}</text>
					</view>
				</view>
			</view>
			<view class="content_wrap">
				<view v-for="item in activitylist" :key="item.anid" @click="activitylistjump(item.anid)">
					<image :src="item.icon" mode="aspectFill"></image>
					<view class="text">
						<text>{{ item.title }}</text>
						<text>活动时间：{{ item.activity_time }}</text>
					</view>
				</view>
			</view>
			<view class="subjectlist">
				<text v-for="item in subject" :key="item.maid" @click="subjectjump(item.maid,0)">{{ item.title }}</text>
				<text v-for="item in question_rank" :key="item.maid" @click="subjectjump(item.maid,3)">{{ item.title }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			typelabel: [
				{ name: '视频', active: '' },
				{ name: '学员', active: '' },
				{ name: '题库', active: '' },
				{ name: '活动', active: '' },
				{ name: '一题多解', active: '' },
				{ name: '历年试卷', active: '' },
				{ name: '预约试听', active: '' }
			],
			flag: true,
			video: [],
			student: [],
			ointment: [],
			allsubject: [],
			activitylist: [],
			subject: [],
			question_rank: [],
			keyword: "",
			index: undefined,
			isshow: false,
			nodata: false
			
		};
	},
	created() {
	},
	watch:{
	},
	methods: {
		serchdata(){
			if(this.index==undefined){
				this.serch({keyword: this.keyword})
			}else{
				this.serch({keyword: this.keyword,index:this.index})
			}
		},
		serch(parm){
			if(this.keyword!=""){
				this.$axios.postapi('/Search/search_by_keywords',parm).then(res => {
					if(res.data.code==0){
						this.isshow = false
						this.nodata = true
						return false
					}
					if(res.data.code==1){
						if(this.index==undefined){
							this.nodata = false
							this.isshow = true
							this.video = res.data.data.video
							this.student = res.data.data.style_student
							this.ointment = res.data.data.st_records
							this.allsubject = res.data.data.question_rank
							this.activitylist = res.data.data.activity
							this.subject = res.data.data.mutiple
							this.question_rank = res.data.data.history_test
							const leng = res.data.data
							if(leng.video.length==0&&leng.style_student.length==0&&leng.st_records.length==0&&leng.activity.length==0&&leng.mutiple.length==0&&leng.history_test.length==0){
								this.isshow = false
								this.nodata = true
								return false
							}else{
								this.isshow = true
								this.nodata = false
							}
						}
					}
					this.isshow = true
					this.nodata = false
					if(this.index==0){
						this.video = res.data.data
						this.student = []
						this.allsubject = []
						this.activitylist = []
						this.subject = []
						this.question_rank = []
						this.ointment = []
						this.$forceUpdate()
						return false
					}
					if(this.index==1){
						this.student = res.data.data
						this.video = []
						this.allsubject = []
						this.activitylist = []
						this.subject = []
						this.question_rank = []
						this.ointment = []
						this.$forceUpdate()
						return false
					}
					if(this.index==2){
						this.allsubject = res.data.data
						this.student = []
						this.video = []
						this.activitylist = []
						this.subject = []
						this.question_rank = []
						this.ointment = []
						this.$forceUpdate()
						return false
					}
					if(this.index==3){
						this.activitylist = res.data.data
						this.student = []
						this.video = []
						this.allsubject = []
						this.subject = []
						this.question_rank = []
						this.ointment = []
						this.$forceUpdate()
						return false
					}
					if(this.index==4){
						this.subject = res.data.data
						this.student = []
						this.video = []
						this.allsubject = []
						this.activitylist = []
						this.question_rank = []
						this.ointment = []
						this.$forceUpdate()
						return false
					}
					if(this.index==5){
						this.question_rank = res.data.data
						this.student = []
						this.video = []
						this.allsubject = []
						this.activitylist = []
						this.subject = []
						this.ointment = []
						this.$forceUpdate()
						return false
					}
					if(this.index==6){
						this.ointment = res.data.data
						this.student = []
						this.video = []
						this.allsubject = []
						this.activitylist = []
						this.subject = []
						this.question_rank = []
						this.$forceUpdate()
						return false
					}
				})
			} else{
				uni.showToast({
					title:"请输入关键字",
					icon:"none"
				})
			}
			
		},
		activetype(item, index) {
			if (this.typelabel[index].active == '') {
				for(let i = 0; i < this.typelabel.length;i ++){
					this.typelabel[i].active = '';
				}
				this.typelabel[index].active = 'active';
				this.index = index
				if(this.keyword!=""){
					this.serch({keyword: this.keyword,index:this.index})
				}
			} else {
				this.typelabel[index].active = '';
				this.index = undefined
				if(this.keyword!=""){
					this.serch({keyword: this.keyword})
				}
			}
		},
		videojump(maid){
			uni.navigateTo({
				url:"../children/videodetail/videodetail?maid="+maid
			})
		},
		studentjump(stid){
			uni.navigateTo({
				url:"../children/studentdetail/studentdetail?stid="+stid
			})
		},
		ointmentjump(srid){
			uni.navigateTo({
				url:"../orderdeatil/orderdeatil?srid="+srid
			})
		},
		allsubjectjump(maid){
			uni.navigateTo({
				url:"../children/activitydetail/answerdetail/answerdetail?maid="+maid
			})
		},
		activitylistjump(anid){
			uni.navigateTo({
				url:"../children/activitydetail/activitydetail?anid="+anid
			})
		},
		subjectjump(maid,type){
			uni.navigateTo({
				url:"../children/activitydetail/answerdetail/answerdetail?maid="+maid+'&type='+type
			})
		}
	}
};
</script>

<style lang="less">
.serch {
	text-align: center;
	.serchwrap {
		padding: 0 38rpx;
		box-sizing: border-box;
		.serch_box {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			text-align: start;
			margin: 20rpx 0;
			input {
				width: 80%;
				height: 60rpx;
				background: #f7f7f7;
				border-radius: 16rpx;
				padding-left: 70rpx;
				box-sizing: border-box;
				position: relative;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 48rpx;
				color: #6593b7;
				&::before {
					content: '';
					position: absolute;
					top: 50%;
					left: 20rpx;
					transform: translateY(-50%);
					display: inline-block;
					width: 32rpx;
					height: 32rpx;
					background-image: url(../../static/img/search.png);
					background-size: 100% 100%;
				}
			}
			input::-webkit-input-placeholder {
				font-size: 14rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 24rpx;
				color: #b9c0c9 !important;
			}
			view {
				width: 15%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 48rpx;
					color: #00152a;
				}
				image {
					width: 16px;
					height: 16px;
				}
			}
		}
	}
	.tag {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		.active {
			background: #6593b7;
			border: 2rpx solid rgba(0, 0, 0, 0);
			color: #f9fbfc;
		}
		text {
			padding: 0 16rpx;
			box-sizing: border-box;
			height: 44rpx;
			border: 2rpx solid #e8ecef;
			border-radius: 8rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #6593b7;
			margin-right: 30rpx;
			margin-top: 40rpx;
		}
	}

	.listbot {
		.courselist {
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 0 38rpx 0 38rpx;
			box-sizing: border-box;
			text-align: start;
			.courselist_box {
				width: 328rpx;
				box-shadow: 0px 6rpx 12rpx #f9fbfc;
				margin: 20rpx 0;
				.title {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 48rpx;
					color: #00152a;
				}
				text {
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: #b9c0c9;
					padding-left: 20rpx;
					box-sizing: border-box;
				}
				.img {
					position: relative;
					-webkit-border-top-left-radius: 16rpx;
					-webkit-border-top-right-radius: 16rpx;
					height: 246rpx;
					image {
						width: 100%;
						-webkit-border-top-left-radius: 16rpx;
						-webkit-border-top-right-radius: 16rpx;
					}
					.img_text {
						width: 100%;
						text-align: center;
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						top: 52rpx;
						text {
							display: block;
							width: 100%;
							&:nth-child(1) {
								font-size: 36rpx;
								font-family: Source Han Serif CN;
								font-weight: 600;
								line-height: 52rpx;
								color: #022345;
							}
							&:nth-child(2) {
								margin-top: 8rpx;
								font-size: 28rpx;
								font-family: Source Han Serif CN;
								font-weight: 600;
								line-height: 40rpx;
								color: #022345;
							}
						}
					}
					.classTime {
						position: absolute;
						padding: 0 10rpx;
						height: 36rpx;
						background: linear-gradient(135deg, #0e2a47 0%, #0e2a47 100%);
						border-radius: 4rpx 0px 0px 0px;
						bottom: 0;
						right: 0;
						opacity: 0.4;
						font-size: 20rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 36rpx;
						text-align: center;
						color: #f9fbfc;
					}
					image {
						width: 328rpx;
						height: 246rpx;
						-webkit-border-top-left-radius: 16rpx;
						-webkit-border-top-right-radius: 16rpx;
					}
				}
				.grade {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.btn {
						text-align: center;
						width: 88rpx;
						height: 44rpx;
						background: #6593b7;
						opacity: 1;
						border-radius: 8rpx;
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 44rpx;
						color: #f9fbfc;
					}
				}
			}
		}
		.studentlist {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 38rpx 0 38rpx;
			box-sizing: border-box;
			text-align: start;
			.courselist_box {
				box-shadow: 0px 6rpx 12rpx #f9fbfc;
				margin: 20rpx 0;
				&:nth-child(2n) {
				}
				.img {
					width: 328rpx;
					background: rgba(0, 0, 0, 0);
					border-radius: 16rpx;
					overflow: hidden;
					image {
						width: 328rpx;
						height: 328rpx;
					}
				}
				.title {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 48rpx;
					color: #00152a;
				}
				text {
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: #b9c0c9;
				}
				.grade {
					text {
						font-size: 24rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						color: #0e2a47;
					}
				}
			}
		}
		.content_wrap {
			width: 100%;
			text-align: center;
			view {
				image {
					width: 678rpx;
					height: 280rpx;
					margin-top: 20rpx;
					border-radius: 16rpx;
				}
			}
		
			.text {
				padding: 0 40rpx;
				box-sizing: border-box;
				text-align: start;
				text {
					display: block;
					&:nth-child(1) {
						font-size: 32rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 54rpx;
						color: #00152a;
					}
					&:nth-child(2) {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 48rpx;
						color: #b9c0c9;
					}
				}
			}
		}
		.subjectlist{
			width: 100%;
			padding: 0 40rpx;
			box-sizing: border-box;
			margin-top: 40rpx;
			text{
				margin-bottom: 20rpx;
				text-align: start;
				display: block;
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 48rpx;
				color: #0E2A47;
			}
		}
	}
	
}
</style>
