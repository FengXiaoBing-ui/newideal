<template>
	<view>
		<view class="serch_box" @click="serch">
			<input :style="inputtrue?'pointer-events: none;':''" type="text" placeholder="请输入搜索关键词" confirm-type="search" @confirm="serchdata" @input="changes" />
			<view @click="serchdata">
				<image src="../static/img/shaixuan.png" />
				<text>筛选</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"serch",
		props:{
			chirden: {
				type:Boolean
			},
			inputtrue: {
				type:Boolean
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			serchdata(){
				this.$emit('serchdata')
			},
			changes(e){
				this.$emit('sercher',e.detail.value)
			},
			serch(){
				if(this.chirden){
					uni.navigateTo({
						url:"../serch/serch"
					})
				}
			},
			
		}
	}
</script>

<style lang="less">
.serch_box {
			width: 100%;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			text-align: start;
			margin: 20rpx 0;
			input {
				width: 75%;
				height: 60rpx;
				background: #f7f7f7;
				border-radius: 16rpx;
				padding-left: 70rpx;
				box-sizing: border-box;
				position: relative;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 48rpx;
				color: #6593B7;
				&::before {
					content: '';
					position: absolute;
					top: 50%;
					left: 20rpx;
					transform: translateY(-50%);
					display: inline-block;
					width: 32rpx;
					height: 32rpx;
					background-image: url(../static/img/search.png);
					background-size: 100% 100%;
				}
			}
			input::-webkit-input-placeholder {
				font-size: 14rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 24rpx;
				color: #b9c0c9 !important;
			}
			view {
				width: 15%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 48rpx;
					color: #00152a;
				}
				image {
					width: 16px;
					height: 16px;
				}
			}
		}
</style>
