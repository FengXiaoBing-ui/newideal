<template>
	<view class="orderdeatil">
		<image class="header" :src="activtylist.icon" mode="aspectFill"></image>
		<view class="labeltitle">
			<text>{{ activtylist.title }}</text>
			<text>活动时间：{{ activtylist.activity_time }}</text>
		</view>
		<view class="orderdeatil_wrap">
			<rich-text style="width: 100%" :nodes="activtylist.remark"></rich-text>

			<myinfo @user="user" @myphone="myphone" @curriculum="curriculum" title="活动预约"></myinfo>
			<botfooter title="预约活动" @sactivty="sactivty"></botfooter>
		</view>
	</view>
</template>

<script>
import myinfo from '../../../components/myinfo.vue';
import botfooter from '../../../components/bot_footer.vue';
import api from '../../../api/api.js';
export default {
	components: {
		botfooter,
		myinfo
	},
	data() {
		return {
			activtylist: {},
			username: '',
			phone: '',
			gradename: '',
			anid: '',
			title: '首页',
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			banners: ['../../../static/img/banner1.png', '../../../static/img/banner2.png', '../../../static/img/banner3.png']
		};
	},
	onLoad(option) {
		uni.showLoading({
			title:"加载中..."
		})
		api.postapi('/Activity/sel_activity_detail', { anid: parseInt(option.anid) }).then(res => {
			uni.hideLoading()
			this.anid = res.data.data.anid;
			this.activtylist = res.data.data;
			console.log(res);
		});
	},
	methods: {
		//表单提交
		sactivty() {
			if (this.username == '') {
				uni.showToast({
					title: '请输入姓名',
					icon: 'none'
				});
				return false;
			}
			if (this.phone == '') {
				uni.showToast({
					title: '请输入电话',
					icon: 'none'
				});
				return false;
			}
			if (this.gradename == '') {
				uni.showToast({
					title: '请选择年级',
					icon: 'none'
				});
				return false;
			}
			if (!/^1[3|4|5|7|8]\d{9}$/.test(this.phone)) {
				uni.showToast({
					title: '电话号码格式错误',
					icon: 'none'
				});
				return false;
			}
			let nearray = [];
			nearray['gradename'] = this.gradename;
			nearray['anid'] = this.anid;
			nearray['username'] = this.username;
			nearray['userphone'] = this.phone;
			nearray['openid'] = uni.getStorageSync('openid')
			nearray = JSON.stringify(nearray);
			api.postapi('/Activity/booking_activity', {
				data: nearray
			}).then(res => {
				if (res.data.code == 0) {
					uni.showToast({
						title: '预约成功'
					});
					setTimeout(() => {
						uni.switchTab({
							url: '../../Activity/Activity'
						});
					}, 500);
				}
			});
		},
		//获取姓名
		user(v) {
			this.username = v;
		},
		//获取电话
		myphone(v) {
			this.phone = v;
		},
		//获取年级
		curriculum(v) {
			this.gradename = v;
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
