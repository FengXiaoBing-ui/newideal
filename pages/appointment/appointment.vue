<template>
	<view class="content">
		<view class="content_wrap">
			<view class="header_img">
				<image src="../../static/img/yuyue_bg.png" mode=""></image>
				<text class="title">按科目和班型直接预约试听</text>
				<view class="header_btn" @click="jump">
					<text>直接预约</text>
					<image src="../../static/img/right_long.png" mode=""></image>
				</view>
			</view>
			<view class="midicon">
				<text>选择教师预约</text>
				<image style="width: 248rpx; height: 20rpx;" src="../../static/img/fenge.png" mode=""></image>
			</view>
			<serch @sercher="sercher" @serchdata="serchdata"></serch>
			<screen @all="yuyue" @gradeactive="gradeactive"></screen>
			<teacherlist v-if="!nodata" :video="ointment" notime="true" istype="true"></teacherlist>
			<text v-if="isflag">—— 我是有底线的 ——</text>
			<text class="nodata" v-if="nodata">暂无数据...</text>
		</view>
		<tui-tabbar></tui-tabbar>
	</view>
</template>

<script>
	import screen from '../../components/screen.vue'
import serch from '../../components/serch.vue';
import teacherlist from '../../components/teacherlist.vue';
import { mapState } from 'vuex';
export default {
	components: {
		serch,
		teacherlist,
		screen
	},
	data() {
		return {
			title: '试听预约',
			isshow: false,
			show: false,
			ointment: [],
			parms: "",
			shaixuanlimit: 6,
			count: 0,
			alldata: true,
			isflag: false,
			keyword: "",
			nodata: false
		};
	},
	watch:{
		keyword:function(){
			if(this.keyword==""){
				if(this.parms==""){
					this.yuyue()
				}
			}
		}
	},
	onReachBottom() {
		if(this.alldata){
			if(this.count<=this.shaixuanlimit){
				this.isflag = true
				uni.hideLoading()
			}else{
				uni.showLoading({
					title:"加载中..."
				})
				this.shaixuanlimit+=6
				this.isflag = false
				this.bottomload(this.shaixuanlimit)
			}
		}else{
			if(this.count<=this.shaixuanlimit){
				this.isflag = true
				uni.hideLoading()
			}else{
				uni.showLoading({
					title:"加载中..."
				})
				this.isflag = false
				this.shaixuanlimit+=6
				if(this.keyword==""){
					if(!this.parms.gid){
						this.shaixuan({sid: this.parms.sid,limit:this.shaixuanlimit})
					}else if(!this.parms.sid){
						this.shaixuan({gid: this.parms.gid,limit:this.shaixuanlimit})
					}else{
						this.shaixuan({sid: this.parms.sid,gid:this.parms.gid,limit:this.shaixuanlimit})
					}
				}else{
					if(!this.parms.gid){
						this.shaixuan({sid: this.parms.sid,limit:this.shaixuanlimit,keyword:this.keyword})
					}else if(!this.parms.sid){
						this.shaixuan({gid: this.parms.gid,limit:this.shaixuanlimit,keyword:this.keyword})
					}else{
						this.shaixuan({sid: this.parms.sid,gid:this.parms.gid,limit:this.shaixuanlimit,keyword:this.keyword})
					}
				}
				
			}
		}
	},
	onLoad() {
		uni.hideTabBar();
	},
	created() {
		this.yuyue()
	},
	methods: {
		sercher(v){
			this.keyword = v
		},
		serchdata(){
			this.shaixuanlimit = 6
			if(this.keyword==""){
				if(this.parms==""){
					this.video = []
				}else{
					if(!this.parms.gid){
						this.shaixuan({sid: this.parms.sid,limit:6})
					}else if(!this.parms.sid){
						this.shaixuan({gid: this.parms.gid,limit:6})
					}else{
						this.shaixuan({sid: this.parms.sid,gid:this.parms.gid,limit:6})
					}
				}
			}else{
				if(this.parms==""){
					this.shaixuan({keyword:this.keyword,limit:6})
				}else{
					if(!this.parms.gid){
						this.shaixuan({sid: this.parms.sid,limit:6,keyword:this.keyword})
					}else if(!this.parms.sid){
						this.shaixuan({gid: this.parms.gid,limit:6,keyword:this.keyword})
					}else{
						this.shaixuan({sid: this.parms.sid,gid:this.parms.gid,limit:6,keyword:this.keyword})
					}
				}
			}
		},
		jump(){
			uni.navigateTo({
				url:'../children/direct/direct'
			})
		},
		shaixuan(parm){
			this.$axios.postapi('/Addition/sel_st_records',parm).then(res => {
				if(res.data.code==0){
					this.nodata = true
					this.isflag = false
					return false
				}
				this.nodata = false
				this.ointment = res.data.data
				this.count = res.data.count
				uni.hideLoading()
			})
		},
		bottomload(limit){
			if(this.keyword==""){
				this.$axios.postapi('/Addition/sel_st_records',{limit:limit}).then(res => {
					if(res.data.code==0){
						this.nodata = true
						this.isflag = false
						return false
					}
					this.nodata = false
					this.ointment = res.data.data
					this.count = res.data.count
					uni.hideLoading()
				})
			}else{
				this.$axios.postapi('/Addition/sel_st_records',{limit:limit,keyword:this.keyword}).then(res => {
					if(res.data.code==0){
						this.nodata = true
						this.isflag = false
						return false
					}
					this.nodata = false
					this.ointment = res.data.data
					this.count = res.data.count
					uni.hideLoading()
				})
			}
			
		},
		yuyue(num){
			this.alldata = true
			if(this.keyword==""){
				this.$axios.postapi('/Addition/sel_st_records',{limit:6}).then(res => {
					if(res.data.code==0){
						this.nodata = true
						this.isflag = false
						return false
					}
					this.nodata = false
					uni.hideLoading()
					this.ointment = res.data.data
					this.count = res.data.count
				})
			}else{
				this.$axios.postapi('/Addition/sel_st_records',{limit:6,keyword:this.keyword}).then(res => {
					if(res.data.code==0){
						this.nodata = true
						this.isflag = false
						return false
					}
					this.nodata = false
					uni.hideLoading()
					this.ointment = res.data.data
					this.count = res.data.count
				})
			}
			
		},
		sectionscreen(){
			this.isshow = !this.isshow
			this.show = false
		},
		subjectscreen(){
			this.show = !this.show
			this.isshow = false
		},
		gradeactive(v){
			this.alldata = false
			this.parms = v
			this.shaixuanlimit = 6
			if(this.keyword==""){
				if(!this.parms.gid){
					this.shaixuan({sid: this.parms.sid,limit:6})
				}else if(!this.parms.sid){
					this.shaixuan({gid: this.parms.gid,limit:6})
				}else{
					this.shaixuan({sid: this.parms.sid,gid:this.parms.gid,limit:6})
				}
			}else{
				if(!this.parms.gid){
					this.shaixuan({sid: this.parms.sid,limit:6,keyword:this.keyword})
				}else if(!this.parms.sid){
					this.shaixuan({gid: this.parms.gid,limit:6,keyword:this.keyword})
				}else{
					this.shaixuan({sid: this.parms.sid,gid:this.parms.gid,limit:6,keyword:this.keyword})
				}
			}
			
		}
	}
};
</script>

<style scoped lang="less">
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.content_wrap {
		width: 100%;
		padding-bottom: 200rpx;
		text-align: center;
		.nodata{
			position: absolute;
			left: 50%;
			top: 60%;
			transform: translate(-50%,-50%);
		}
		.midicon{
			text{
				display: block;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 48rpx;
				color: #819AB4;
				letter-spacing: 2rpx;
			}
		}
		.header_img {
			position: relative;
			image {
				width: 678rpx;
				height: 280rpx;
			}
			.title {
				position: absolute;
				left: 50%;
				top: 62rpx;
				transform: translateX(-50%);
				letter-spacing: 4rpx;
				width: 100%;
				font-size: 36rpx;
				font-family: Source Han Serif CN;
				font-weight: 500;
				line-height: 52rpx;
				color: #0e2a47;
			}
			.header_btn {
				width: 256rpx;
				height: 64rpx;
				background: #0e2a47;
				opacity: 0.8;
				border-radius: 8rpx;
				position: absolute;
				left: 50%;
				bottom: 62rpx;
				transform: translateX(-50%);
				display: flex;
				align-items: center;
				justify-content: center;
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 28rpx;
					color: #f9fbfc;
					margin-right: 5rpx;
				}
				image {
					margin-left: 5rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
	}
}
</style>
