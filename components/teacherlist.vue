<template>
	<view class="courselist">
		<view class="courselist_box" v-for="(item,index) in video" :key="index" @click="jump(item.srid?item.srid:item.maid)">
			<view class="img">
				<image :src="datacourse?item.video_icon:item.video_icon" mode="aspectFit"></image>
				<view class="classTime" v-if="!notime">
					{{ datacourse?`浏览${item.watch_number}`:item.video_time?item.video_time:'23:46' }}
				</view>
			</view>
			
			<text class="title">{{ item.title }}</text>
			<view class="teach">
				<text>{{ datacourse?'':item.teachername }} {{ item.subject?item.subject:item.subjectname }}</text>
			</view>
			<view class="grade">
				<text>{{ item.gids?item.gids:item.subjectname }}</text>
				<view class="btn" v-if="istype">
					预约
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../api/api.js';
	export default {
		name:"teacherlist",
		props:{
			videodetail: {
				type:Boolean
			},
			notime: {
				type:Boolean
			},
			video: {
				type:Array
			},
			istype: {
				type:Boolean
			},
			path: {
				type:String
			},
			datacourse: {
				type:Boolean
			}
		},
		data() {
			return {
				banners: [
					"../static/img/teacher1.png",
					"../static/img/teacher2.png",
					"../static/img/teacher3.png",
					"../static/img/teacher4.png",
				]
			};
		},
		methods:{
			jump(id){
				if(this.istype){
					uni.navigateTo({
						url:"../orderdeatil/orderdeatil?srid="+id,
						fail(err) {
							console.log(err)
						}
					})
					return false
				}
				if(this.datacourse){
					uni.navigateTo({
						url: "../activitydetail/answerdetail/answerdetail?maid="+id,
						fail(err) {
							console.log(err)
						}
					})
					return false
				}
				if(this.videodetail){
					uni.navigateTo({
						url:"../children/videodetail/videodetail?maid="+id,
						fail(err) {
							console.log(err)
						}
					})
					return false
				}
				uni.navigateTo({
					url:this.path+'?maid='+id,
					fail(err) {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style lang="less">
.courselist{
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 0 36rpx 20rpx 36rpx;
			box-sizing: border-box;
			text-align: start;
			.courselist_box{
				width: 328rpx;
				box-shadow: 0px 6rpx 12rpx #F9FBFC;
				margin: 20rpx 0;
				.title{
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 48rpx;
					color: #00152A;
				}
				text{
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: #B9C0C9;
					padding-left: 20rpx;
					box-sizing: border-box;
				}
				.img{
					position: relative;
					-webkit-border-top-left-radius: 16rpx;
					-webkit-border-top-right-radius: 16rpx; 
					height: 246rpx;
					image{
						width: 100%;
						-webkit-border-top-left-radius: 16rpx;
						  -webkit-border-top-right-radius: 16rpx; 
					}
					.img_text{
						width: 100%;
						text-align: center;
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						top: 52rpx;
						text{
							display: block;
							width: 100%;
							&:nth-child(1){
								font-size: 36rpx;
								font-family: Source Han Serif CN;
								font-weight: 600;
								line-height: 52rpx;
								color: #022345;
							}
							&:nth-child(2){
								margin-top: 8rpx;
								font-size: 28rpx;
								font-family: Source Han Serif CN;
								font-weight: 600;
								line-height: 40rpx;
								color: #022345;
							}
						}
					}
					.classTime{
						position: absolute;
						padding: 0 10rpx;
						height: 36rpx;
						background: linear-gradient(135deg, #0E2A47 0%, #0E2A47 100%);
						border-radius: 4rpx 0px 0px 0px;
						bottom: 0;
						right: 0;
						opacity: 0.4;
						font-size: 20rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 36rpx;
						text-align: center;
						color: #F9FBFC;
					}
					image{
						width:328rpx;
						height: 246rpx;
						-webkit-border-top-left-radius: 16rpx;
						  -webkit-border-top-right-radius: 16rpx; 
					}
				}
				.grade{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.btn{
						text-align: center;
						width: 88rpx;
						height: 44rpx;
						background: #6593B7;
						opacity: 1;
						border-radius: 8rpx;
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 44rpx;
						color: #F9FBFC
					}
				}
			}
		}
</style>
