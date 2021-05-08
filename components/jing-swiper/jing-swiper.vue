<template>
	<view class="my-plan-style">
		<!-- 3D轮播 -->
		<view>
			<swiper class="imageContainer" indicator-dots="true" previous-margin="150rpx" next-margin="150rpx" circular  autoplay>
				<block v-for="(item,index) in activity" :key="index">
					<swiper-item class="swiperitem">
						<image @click="jump(item.anid)" class="itemImg" :class="currentIndex == index ? 'swiperactive': ''" :src="item.icon" lazy-load mode="aspectFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>
<script>
	import api from '../../api/api.js'
	export default {
		props:{
			activity: {
				type:Array
			}
		},
		data(){
			return {
				imgList: [
					"../../static/img/banner1.png","../../static/img/banner2.png","../../static/img/banner3.png"
				]
			}
		},
		methods:{
			jump(anid){
				uni.navigateTo({
					url:"../children/activitydetail/activitydetail?anid="+anid
				})
			},
			handleChange(e){
				
			}
		}
	}	
</script>
<style lang="scss" scoped>
	
	.imageContainer {
		width: 100%;
		/* height: 500rpx; */
		/* background: #000; */
		height: 270rpx;
		background-color: #fff;
	}
	
	.swiperitem {
		/* height: 500rpx; */
		height: 270rpx;
		box-sizing: border-box;
		position: relative;
		.swiperText {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			top: 56upx;
			left: 51upx;
			z-index: 998;
			width:162upx;
			height:163upx;
			background:rgba(255,255,255,1);
			border-radius:8upx;
			padding:10upx;
			.name {
				font-size:26upx;
				font-weight:500;
				color:rgba(253,57,91,1);
				line-height:37upx;
				margin-bottom: 10upx;
			}
			.zq,.cz {
				font-size:20upx;
				color:rgba(253,57,91,1);
				line-height:35upx;
			}
			.addNl {
				width:120upx;
				height:26upx;
				background:rgba(253,57,91,1);
				border-radius:13upx;
				font-size:20upx;
				font-weight:500;
				color:rgba(255,255,255,1);
				text-align: center;
				line-height: 26upx;
				margin-top: 10upx;
			}
			
		}
	}
	
	.itemImg {
		position: absolute;
		width: 90%;
		/* height: 380rpx; */
		height: 212rpx;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 15rpx;
		z-index: 5;
		top: 5%;
		box-shadow:0px 4upx 15upx 0px rgba(153,153,153,0.24);
	}
	
	.swiperactive {
		position: absolute;
		width: 90%;
		opacity: 1;
		z-index: 10;
		/* height: 430rpx; */
		height: 212rpx;
		top: 0%;
		transition: all .2s ease-in 0s;
	}
	
	.zhankai{
		text-align: center;
		.iconfont{
			margin-left: 10upx;
		}
	}
</style>