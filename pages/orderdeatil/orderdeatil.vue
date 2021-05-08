<template>
	<view class="orderdeatil">
		<image class="header" :src="teacher.st_img" mode=""></image>
		<view class="labeltitle">
			<text>{{ teacher.title }}</text>
			<text>{{ teacher.teachername }} {{ teacher.subjectname }}</text>
			<text>{{ teacher.gids }}</text>
		</view>
		<view class="orderdeatil_wrap">
			<rich-text :nodes="teacher.remark"></rich-text>
			<swiper class="orderdeatil_swiper" circular :indicator-dots="indicatorDots" autoplay="true" :interval="interval" :duration="duration">
				<swiper-item style="height: 376rpx;" v-for="(item, index) in teacher.st_imgs" :key="index"><image style="width: 100%;height: 376rpx;" :src="item"></image></swiper-item>
			</swiper>
			<myinfo @myphone="myphone" @user="user" @curriculum="curriculum"  @grade="grade" title="预约试听" order="true"></myinfo>
			<botfooter @sactivty="sactivty" title="预约试听"></botfooter>
		</view>
	</view>
</template>

<script>
	import myinfo from '../../components/myinfo.vue'
	import botfooter from '../../components/bot_footer.vue'
export default {
	components:{
		botfooter,
		myinfo
	},
	data() {
		return {
			teacher: {},
			title: '首页',
			srid: "",
			username: "",
			phone: "",
			class_time: "",
			subjectname: "",
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			banners: ['../../static/img/banner1.png', '../../static/img/banner2.png', '../../static/img/banner3.png']
		};
	},
	created() {
		uni.showLoading({
			title:"加载中..."
		})
	},
	onLoad(option) {
		this.srid = option.srid;
		this.teachdetail(this.srid)
	},
	methods:{
		teachdetail(srid){
			this.$axios.postapi('/Addition/sel_st_byid',{
				srid:srid
			}).then(res => {
				uni.hideLoading()
				this.teacher = res.data.data
			})
		},
		myphone(v){
			this.phone = v
		},
		user(v){
			this.username = v
		},
		grade(v){
			this.class_time = v
		},
		curriculum(v){
			this.subjectname = v
		},
		sactivty(){
			if (this.username == '') {
				uni.showToast({
					title: '请输入姓名',
					icon: 'none'
				});
				return false;
			}
			if (this.phone == '') {
				uni.showToast({
					title: '请输入电话',
					icon: 'none'
				});
				return false;
			}
			if (this.subjectname == '') {
				uni.showToast({
					title: '请选择年级',
					icon: 'none'
				});
				return false;
			}
			if (this.class_time == '') {
				uni.showToast({
					title: '请选择课程',
					icon: 'none'
				});
				return false;
			}
			if (!/^1[3|4|5|7|8]\d{9}$/.test(this.phone)) {
				uni.showToast({
					title: '电话号码格式错误',
					icon: 'none'
				});
				return false;
			}
			let arr = {};
			arr["srid"] = this.srid
			arr["username"] = this.username
			arr["userphone"] = this.phone
			arr["class_time"] = this.class_time
			arr["subjectname"] = this.subjectname
			arr["openid"] = uni.getStorageSync('openid')
			arr = JSON.stringify(arr)
			this.$axios.postapi('/Addition/submit_order_by_teacher',{
				data:arr
			}).then(res => {
				if(res.data.code==0){
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
					setTimeout(() => {
						uni.switchTab({
							url:"../appointment/appointment",
						})
					},500)
				}
				if(res.data.code==1){
					uni.showToast({
						title:"报名成功"
					})
					setTimeout(() => {
						uni.switchTab({
							url:"../appointment/appointment",
						})
					},500)
				}
			})
		}
	}
};
</script>

<style lang="less" scoped>
.orderdeatil {
	.header {
		width: 100%;
		height: 420rpx;
	}
	.labeltitle {
		box-shadow: 0px 3px 6px #f9fbfc;
		padding: 40rpx 36rpx;
		box-sizing: border-box;
		text {
			display: block;
			font-size: 24rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 48rpx;
			color: #b9c0c9;
			&:nth-child(1) {
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 54rpx;
				color: #00152a;
			}
		}
	}
	.orderdeatil_wrap {
		width: 100%;
		padding: 0 36rpx;
		box-sizing: border-box;
		.contenttext {
			.min_title {
				display: block;
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 54rpx;
				color: #00152a;
			}
			.content {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 48rpx;
				color: #0e2a47;
				text-indent: 2em;
				margin-bottom: 40rpx;
			}
		}
		.contentbot {
			padding: 40rpx 0;
			box-sizing: border-box;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 48rpx;
			color: #0e2a47;
			border-bottom: 2rpx solid #e8ecef;
		}
		
	}
}
</style>
