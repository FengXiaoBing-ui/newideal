<template>
	<view class="orderdeatil">
		<video :src="video.video_url" controls></video>
		<view class="labeltitle">
			<text>{{ video.title }}</text>
			<text>张小泉 {{ video.subjectname }}</text>
			<text>{{ video.gids }}</text>
		</view>
		<view class="orderdeatil_wrap">
			<rich-text :nodes="video.remark"></rich-text>
			<view class="midimg">
				<image :src="video.video_icon" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '首页',
			video: {}
		};
	},
	onLoad(option) {
		uni.showLoading({
			title:"加载中..."
		})
		this.$axios.postapi('/Onlineroom/sel_multiple_detail',{maid: option.maid}).then(res => {
			console.log(123,res)
			uni.hideLoading()
			this.video = res.data.data
		})
	},
};
</script>

<style lang="less" scoped>
.orderdeatil {
	video {
		width: 100%;
		height: 420rpx;
	}
	.bofang{
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 160rpx;
		width: 84rpx;
		height: 84rpx;
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
		.midimg{
			margin: 40rpx 0;
			width: 100%;
			display: flex;
			justify-content: space-between;
			image{
				width: 100%;
				height: 280rpx;
				border-radius: 10rpx;
			}
		}
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
