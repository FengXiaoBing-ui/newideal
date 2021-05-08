<template>
	<view>
		<swiper class="swiper" circular :indicator-dots="indicatorDots" autoplay="true" :interval="interval" :duration="duration">
			<swiper-item style="height: 376rpx;" v-for="(item,index) in banners" :key="index" @click="bannerjump(item.status,item.id,item.type)">
				<image style="width: 100%;height: 376rpx;" mode="aspectFill" :src="item.scroll_icon"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import api from '../api/api.js'
	export default {
		name:"banners",
		props:{
			banners: {
				type:Array
			},
			direct: {
				type:Boolean
			}
		},
		data() {
			return {
				title: '首页',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
			};
		},
		created() {
		},
		methods:{
			bannerjump(status,id,type){
				if(status==1){
					if(this.direct){
						uni.navigateTo({
							url:"../activitydetail/activitydetail?anid="+id,
							fail(err) {
								console.log(err)
							}
						})
					}else{
						switch(type){
							case 1: 
							uni.navigateTo({
								url:"../children/activitydetail/activitydetail?anid="+id,
								fail(err) {
									console.log(err)
								}
							})
							break;
							case 2: uni.navigateTo({
								url:"../children/videodetail/videodetail?maid="+id,
								fail(err) {
									console.log(err)
								}
							})
							break;
							case 3: uni.navigateTo({
								url:"../pages/children/activitydetail/answerdetail/answerdetail?maid="+id,
								fail(err) {
									console.log(err)
								}
							})
							case 4: uni.navigateTo({
								url:"../pages/children/activitydetail/answerdetail/answerdetail?maid="+id,
								fail(err) {
									console.log(err)
								}
							})
							case 5:uni.navigateTo({
								url:"../pages/children/activitydetail/answerdetail/answerdetail?maid="+id,
								fail(err) {
									console.log(err)
								}
							})
							case 6: uni.navigateTo({
								url:"../pages/orderdeatil/orderdeatil?srid="+id,
								fail(err) {
									console.log(err)
								}
							})
							case 7: uni.navigateTo({
								url:"../pages/children/studentdetail/studentdetail?stid="+id,
								fail(err) {
									console.log(err)
								}
							})
						}
					}
					
				}
			}
		}
	}
</script>

<style lang="less" scoped>
wx-swiper{
		height: 376rpx;
	}
	wx-swiper .wx-swiper-dot{
	  width: 28rpx;
	  height: 6rpx;
	  border-radius: 5rpx;
	  background: #FFFFFF;
	  opacity: 0.33;
	}
	
	wx-swiper .wx-swiper-dot-active{
		background: #FFFFFF;
		opacity: 1;
	}
</style>
