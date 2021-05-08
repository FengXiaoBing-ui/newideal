<template>
	<view class="orderdeatil">
		<image class="header" :src="student.stu_photo" mode="aspectFit"></image>
		<view class="labeltitle">
			<text>{{ student.stu_name }}</text>
			<text>{{ student.gradename }} | {{ student.classname }}</text>
		</view>
		<view class="orderdeatil_wrap">
			<rich-text :nodes="student.remark"></rich-text>
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			student: {},
			isshow: false,
			stid: "",
			title: '首页',
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			banners: ['../../../static/img/banner1.png', '../../../static/img/banner2.png', '../../../static/img/banner3.png']
		};
	},
	onLoad(option) {
		this.stid = option.stid
		this.studentdeatil()
	},
	created() {
		uni.showLoading({
			title:"加载中..."
		})
	},
	methods:{
		studentdeatil(){
			this.$axios.postapi('/Student/sel_student_detail',{
				stid: this.stid
			}).then(res => {
				console.log(res)
				uni.hideLoading()
				if(res.data.code==1){
					const student = res.data.data
					this.student = student
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
		.midimg{
			width: 100%;
			display: flex;
			justify-content: space-between;
			image{
				width: 318rpx;
				height: 246rpx;
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
