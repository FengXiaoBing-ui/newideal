<template>
	<view class="wrap">
		<view class="Allactivities">
			<view class="Allactivities_left">
				<text>{{ tagdata }}</text>
				<text>Upcoming events</text>
			</view>
			<view class="Allactivities_right" @click="Jump(link.path)">{{ link.title }}</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
export default {
	name: 'mintitle',
	props:{
		tagdata: {
			type: String
		},
		link: {
			type: Object
		}
	},
	data() {
		return {};
	},
	methods:{
		...mapMutations(['changeTabBar']),
		Jump(path){
			if(this.link.switchTab){
				this.changeTabBar({
					index: this.link.index
				})
				uni.switchTab({
					url:path
				})
				return false
			}
			uni.navigateTo({
				url:path,
				fail(err) {
					console.log(err)
				}
			})
		}
	}
};
</script>

<style lang="less">
.Allactivities {
	text-align: start;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 40rpx 60rpx;
	.Allactivities_left {
		text {
			display: block;
			&:nth-child(1) {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 48rpx;
				color: #00152a;
			}
			&:nth-child(2) {
				font-size: 20rpx;
				font-family: Roboto;
				font-weight: 400;
				line-height: 26rpx;
				color: #c4d3df;
			}
		}
	}
	.Allactivities_right {
		position: relative;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		line-height: 42rpx;
		color: #6593b7;
		&::before {
			content: '';
			display: inline-block;
			width: 44rpx;
			height: 4rpx;
			background: #c4d3df;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: -60rpx;
		}
		&::after {
			content: '';
			display: inline-block;
			width: 16rpx;
			height: 30rpx;
			background-image: url(../static/img/right.png);
			background-size: 100% 100%;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: -30rpx;
		}
	}
}
</style>
