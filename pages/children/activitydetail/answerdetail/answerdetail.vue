<template>
	<view class="answerdetail">
		<view class="header_title">
			<text>{{ textdetail.title }}</text>
			<text>{{ textdetail.createTime }}</text>
		</view>
		<rich-text :nodes="textdetail.remark"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maid: "",
				textdetail: {}
			};
		},
		onLoad(option) {
			this.maid = option.maid
			this.answer()
		},
		methods:{
			answer(){
				this.$axios.postapi('/Onlineroom/sel_multiple_detail',{maid: this.maid}).then(res => {
					console.log(res)
					this.textdetail = res.data.data
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.answerdetail{
	width: 100%;
	padding: 40rpx;
	box-sizing: border-box;
	.content{
		padding: 40rpx 0;
		text{
			font-size: 24rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 48rpx;
			color: #0E2A47;
		}
	}
	.header_title{
		padding-bottom: 10rpx;
		border-bottom: 2rpx solid #E8ECEF;
		text{
			&:nth-child(1){
				font-size: 36rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 62rpx;
				color: #0E2A47;
				display: block;
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
</style>
