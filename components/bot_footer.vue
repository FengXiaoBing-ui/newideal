<template>
	<view class="bot_footer">
		<text>请如实填写相关信息，填写完毕后点击下方按钮进行活动预约，届时会有相关工作人员联系您。</text>
		<button class="btn_subimt" type="default" @click="sumbit"> {{title}} </button>
	</view>
</template>

<script>
export default {
	name: 'bot_footer',
	props:{
		title: {
			type:String
		}
	},
	data() {
		return {};
	},
	methods:{
		sumbit(){
			this.$emit('sactivty')
		}
	}
};
</script>

<style lang="less" scoped>
.bot_footer {
	text {
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		line-height: 40rpx;
		color: #b9c0c9;
	}
	.btn_subimt {
		margin-top: 60rpx;
		width: 678rpx;
		height: 92rpx;
		background: #0e2a47;
		opacity: 1;
		border-radius: 8rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		line-height: 92rpx;
		color: #f9fbfc;
		margin-bottom: 40rpx;
	}
}
</style>
