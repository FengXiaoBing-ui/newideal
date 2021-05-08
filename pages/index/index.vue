<template>
	<view class="home">
		<view class="home_wrap">
			<serch chirden="true" inputtrue="true"></serch>
			<banner :banners="banners"></banner>
			<tagtitle tagdata='活动名称' :link="link1"></tagtitle>
			<jing-swiper :activity="activity"></jing-swiper>
			<tagtitle tagdata='知识点精讲' :link="link2"></tagtitle>
			<teacherlist videodetail="true" :video="video"></teacherlist>
			<image @click="imgjump(2)" style="width: 90%;height:136rpx;margin: 20rpx 0;" src="../../static/img/5.png" mode=""></image>
			<image @click="imgjumpto" style="width: 90%;height:136rpx;margin: 20rpx 0;" src="../../static/img/1.png" mode=""></image>
			<tagtitle tagdata='学员风采' :link="link3"></tagtitle>
			<view class="studentlist">
				<view class="studentlist_box" @click="jump(item.stid)" v-for="item in student" :key="item.stid">
					<image :src="item.stu_icon" mode="aspectFit"></image>
					<view class="studentlist_box_right">
						<text class="title">{{ item.stu_name }}</text>
						<view class="grade">
							<text>{{ item.gradename }}</text>
							<text>{{ item.classname }}</text>
						</view>
						<text>推荐理由：{{ item.recommand }}</text>
					</view>
				</view>
			</view>
			<view class="bot_footer">
				<view></view>
				<view></view>
				<text>新理想教育</text>
				<view></view>
				<view></view>
			</view>
			
		</view>
		<tui-tabbar></tui-tabbar>
	</view>
</template>

<script>
import serch from '../../components/serch.vue';
import teacherlist from '../../components/teacherlist.vue';
import tagtitle from '../../components/tagtitle.vue';
import banner from '../../components/banner.vue';
import api from '../../api/api.js';
import { mapState } from 'vuex';
export default {
	components: {
		banner,
		tagtitle,
		teacherlist,
		serch
	},
	data() {
		return {
			student: [],
			video: [],
			activity: [],
			title: '首页',
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			banners: [],
			link1: {
				title: "全部活动",
				path: "../Activity/Activity",
				switchTab: true,
				index: 0
			},
			link2: {
				title: "全部视频",
				path: "../children/allvideo/allvideo"
			},
			link3: {
				title: "全部学员",
				path: "../studentStyle/studentStyle",
				switchTab: true,
				index: 4
			},
			
		};
	},
	created() {
		this.studentlist();
		if(uni.getStorageSync('openid')){
			
		}else{
			this.openid();
		}
		this.videolist();
		this.activitylist();
		this.studentserch();
		this.gradeserch();
		this.banner();
		
	},
	onLoad() {
		uni.hideTabBar();
	},
	methods: {
		imgjump(id){
			uni.navigateTo({
				url:"../children/allsubject/allsubject?type="+id
			})
		},
		imgjumpto(){
			uni.navigateTo({
				url:"../children/answer/answer?type=3"
			})
		},
		banner(){
			this.$axios.postapi('/Index/sel_scroll_imgs').then(res => {
				this.banners = res.data.data
			})
		},
		jump(stid){
			uni.navigateTo({
				url:"../children/studentdetail/studentdetail?stid="+stid
			})
		},
		studentlist(){
			this.$axios.postapi('/Index/sel_student_limit',{limit:4}).then(res => {
				this.student = res.data.data
			})
		},
		videolist(){
			this.$axios.postapi('/Index/sel_intensive_video',{limit:4}).then(res => {
				this.video = res.data.data
			})
		},
		activitylist(){
			this.$axios.postapi('/Index/sel_activity_limit',{limit:4}).then(res => {
				this.activity = res.data.data
			})
		},
		studentserch(){
			this.$axios.postapi('/Activity/sel_subject').then(res => {
				this.$store.commit('student',res.data.data)
			})
		},
		gradeserch(){
			this.$axios.postapi('/Activity/sel_grade').then(res => {
				this.$store.commit('grade',res.data.data)
			})
		},
		openid(){
			wx.login({
				success:(res => {
					api.getapi('/User/get_user_openid?code='+res.code).then((res,err) => {
						uni.setStorage({
							key:'openid',
							data:res.data.openid
						})
					})
				})
			})
		},
	}
};
</script>

<style scoped lang="less">
.home {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.home_wrap {
		width: 100%;
		padding-bottom: 200rpx;
		text-align: center;
		.studentlist {
			width: 100%;
			padding: 0 40rpx;
			box-sizing: border-box;
			.studentlist_box {
				display: flex;
				align-items: center;
				text-align: start;
				margin: 40rpx 0;
				image {
					width: 222rpx;
					height: 222rpx;
					border-radius: 16rpx;
				}
				.studentlist_box_right {
					padding-left: 20rpx;
					box-sizing: border-box;
					.title {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 500;
						line-height: 42rpx;
						color: #00152a;
					}
					text {
						font-size: 24rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 42rpx;
						color: #00152a;
					}
					.grade {
						text {
							font-size: 24rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							line-height: 42rpx;
							color: #b9c0c9;
						}
					}
				}
			}
		}
		.bot_footer{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 40rpx;
			color: #0E2A47;
			text{
				margin: 0 4rpx;
			}
			view{
				width: 16rpx;
				height: 3rpx;
				background: #0E2A47;
				margin: 0 4rpx;
				&:nth-child(1){
					width: 8rpx;
				}
				&:nth-child(5){
					width: 8rpx;
				}
			}
		}
	}
}
</style>
