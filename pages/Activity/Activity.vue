<template>
	<view class="content">
		<view class="content_wrap" >
			<view v-for="item in activitylist" :key="item.anid" @click="jump(item.anid)">
				<image :src="item.icon" mode="aspectFill"></image>
				<view class="text">
					<text> {{ item.title }} </text>
					<text>活动时间：{{ item.activity_time }}</text>
				</view>
			</view>
			<text v-if="flag">没有更多了...</text>
		</view>
		<tui-tabbar></tui-tabbar>
	</view>
</template>

<script>
	import api from '../../api/api.js'
import { mapState } from 'vuex';
export default {
	data() {
		return {
			title: '活动预告',
			activitylist: [],
			count: 0,
			limit: 4,
			flag: false
		};
	},
	created() {
		this.activity(this.limit)
	},
	onLoad() {
		uni.hideTabBar();
	},
	onReachBottom() {
		uni.showLoading({
			title:"加载中..."
		})
		if(this.count<=this.limit){
			this.flag = true
			uni.hideLoading()
		}else{
			this.limit+=4
			this.activity(this.limit);
		}
	},
	methods: {
		jump(anid){
			uni.navigateTo({
				url:"../children/activitydetail/activitydetail?anid="+anid
			})
		},
		activity(limit){
			api.postapi('/Activity/sel_activity',{limit:limit}).then(res => {
				const activitylist = res.data.data
				uni.hideLoading()
				this.count = res.data.count
				this.activitylist = activitylist
				this.flag = false
			})
		}
	}
};
</script>

<style lang="less" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.content_wrap{
		width: 100%;
		padding-bottom: 200rpx;
		text-align: center;
		image{
			width: 678rpx;
			height: 280rpx;
			margin-top: 20rpx;
			border-radius: 16rpx;
		}
		.text{
			padding: 0 40rpx;
			box-sizing: border-box;
			text-align: start;
			text{
				display: block;
				&:nth-child(1){
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 54rpx;
					color: #00152A;
				}
				&:nth-child(2){
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 48rpx;
					color: #B9C0C9;
				}
			}
		}
	}
}
</style>
