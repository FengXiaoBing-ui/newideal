<template>
	<view class="content">
		<view class="content_wrap">
			<serch chirden="true" inputtrue="true"></serch>
			<tagtitle tagdata="知识点精讲" :link="link1"></tagtitle>
			<teacherlist :video="video" videodetail="true"></teacherlist>
			<tagtitle tagdata="一题多解" :link="link2"></tagtitle>
			<view class="subjectlist">
				<text v-for="item in subject" :key="item.maid" @click="jump(item.maid)">{{ item.title }}</text>
			</view>
			<tagtitle tagdata="真题题库" :link="link3"></tagtitle>
			<view class="Questionbank">
				<view @click="jump(item.maid)" v-for="item in subjectlette" :style="{backgroundImage:'url('+ item.video_icon +')'}" :key="item.maid">
				</view>
			</view>
			<tagtitle tagdata="历年试卷" :link="link4"></tagtitle>
			<view class="subjectlist">
				<text @click="jump(item.maid)" v-for="item in testpaper" :key="item.maid">{{ item.subjectname }} | {{ item.title }}</text>
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
import tagtitle from '../../components/tagtitle.vue';
import teacherlist from '../../components/teacherlist.vue';
import { mapState } from 'vuex';
export default {
	components:{
		serch,
		tagtitle,
		teacherlist
	},
	data() {
		return {
			testpaper: [],
			video: [],
			subject: [],
			subjectlette: [],
			title: '资料库',
			link1: {
				title: "全部视频",
				path: "../children/allvideo/allvideo"
			},
			link2: {
				title: "更多题目",
				path: "../children/answer/answer?type=0"
			},
			link3: {
				title: "更多",
				path: "../children/allsubject/allsubject?title=真题题库&type=2"
			},
			link4: {
				title: "更多",
				path: "../children/answer/answer?type=3"
			},
		};
	},
	onLoad() {
		uni.hideTabBar();
		
	},
	created() {
		this.datavideo();
		this.onesubject();
		this.truesubjectletter();
		this.oldpaper()
	},
	methods: {
		jump(maid){
			uni.navigateTo({
				url:"../children/activitydetail/answerdetail/answerdetail?maid="+maid
			})
		},
		//一题多解
		onesubject(){
			this.$axios.postapi('/Onlineroom/sel_multiple_answer_limit',{limit:3}).then(res => {
				this.subject = res.data.data
			})
		},
		//真题部分题库
		truesubjectletter(){
			this.$axios.postapi('/onlineroom/sel_real_requestion_rank',{limit:3}).then(res => {
				this.subjectlette = res.data.data
			})
		},
		//知识点讲解视频
		datavideo(){
			this.$axios.postapi('/Index/sel_intensive_video',{limit:4}).then(res => {
				this.video = res.data.data
			})
		},
		oldpaper(){
			this.$axios.postapi('/Onlineroom/sel_history_exam',{limit:4}).then(res => {
				this.testpaper = res.data.data
			})
		}
	}
};
</script>

<style lang="less" scoped>
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.content_wrap{
			width: 100%;
			padding-bottom: 200rpx;
			text-align: center;
			.subjectlist{
				width: 100%;
				padding: 0 40rpx;
				box-sizing: border-box;
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
			.Questionbank{
				width: 100%;
				display: flex;
				padding: 0 36rpx;
				box-sizing: border-box;
				justify-content: space-between;
				align-items: center;
				view{
					width: 212rpx;
					height: 120rpx;
					background-size: 100% 100%;
					border-radius: 8px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
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
