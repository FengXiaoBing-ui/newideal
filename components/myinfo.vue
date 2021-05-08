<template>
	<view class="form">
		<text class="title"> {{title}} </text>
		<view class="inputcontent">
			<text>姓名</text>
			<input type="text" placeholder="请填写您或者听课人的姓名" placeholder-class="input-placeholder" @input="username" />
		</view>
		<view class="phone">
			<text>电话</text>
			<input maxlength="11" type="number" style="font-size: 28rpx;" class="phoneinfo" placeholder="请输入电话" placeholder-class="input-placeholder" @input="myphone" >
		</view>
		<view class="activegrade">
			<text>选择年级</text>
			<view class="active" @click="activeclass">
				<text>{{ordermsg}}</text>
				<image src="../../../static/img/down_blue.png" mode=""></image>
			</view>
		</view>
		<view class="activegrade" v-if="order">
			<text>选择课程</text>
			<view class="active" @click="orderclass">
				<text>{{msg}}</text>
				<image src="../../../static/img/down_blue.png" mode=""></image>
			</view>
		</view>
		<uni-popup ref="orderpopup" type="bottom">
			<view class="botactive">
				<view class="header">
					<text @click="cancel">取消</text>
					<text>请选择课程</text>
					<text @click="sure">完成</text>
				</view>
				<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
				            <picker-view-column>
				                <view class="item" style="line-height: 100rpx;" v-for="(item,index) in years" :key="index">{{item}}年</view>
				            </picker-view-column>
				            <picker-view-column>
				                <view class="item" style="line-height: 100rpx;" v-for="(item,index) in months" :key="index">{{item}}月</view>
				            </picker-view-column>
				            <picker-view-column>
				                <view class="item" style="line-height: 100rpx;" v-for="(item,index) in days" :key="index">{{item}}日</view>
				            </picker-view-column>
				        </picker-view>
			</view>
		</uni-popup>
		<uni-popup ref="popup" type="bottom">
			<view class="botactive">
				<view class="header">
					<text @click="cancel">取消</text>
					<text>请选择年级</text>
					<text @click="ordersure">完成</text>
				</view>
				<picker-view class="picker-view" @change="scrollfn">
					<picker-view-column class="column">
					       <view class="item" v-for="(item,index) in orderlist" :key="index">{{item.gradename}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import api from '../api/api.js'
	export default {
		name:"myinfo",
		props:{
			title: {
				type: String
			},
			order: {
				type:Boolean
			}
		},
		data() {
			const date = new Date()
            const years = []
            const year = date.getFullYear()
            const months = []
            const month = date.getMonth() + 1
            const days = []
            const day = date.getDate()
            for (let i = 1990; i <= date.getFullYear(); i++) {
                years.push(i)
            }
            for (let i = 1; i <= 12; i++) {
                months.push(i)
            }
            for (let i = 1; i <= 31; i++) {
                days.push(i)
            }
			return {
                years,
                year,
                months,
                month,
                days,
                day,
                value: [9999, month - 1, day - 1],
                visible: true,
                indicatorStyle: `height: 50px;`,
				list: this.$store.state.studentserch,
				orderlist: this.$store.state.gradeserch ,
				ordermsg: "请选择听课年级",
				msg: "请选择课程",
				meesage: "",
				ordermeesage: "",
				timestamp: ""
			};
		},
		created() {
		},
		methods:{
			bindChange: function (e) {
                const val = e.detail.value
                this.year = this.years[val[0]]
                this.month = parseInt(this.months[val[1]])<10?('0'+this.months[val[1]]):this.months[val[1]]
                this.day = this.days[val[2]]<10?'0'+this.days[val[2]]:this.days[val[2]]
				let nowday = (this.years[val[0]]+'/'+this.month+'/'+this.day+' ')
				this.timestamp = new Date(nowday).getTime()/1000
				this.meesage = nowday+this.getWeek(new Date(nowday))
            },
			getWeek(date) {
			     var week;     
			     if(date.getDay() == 0) week = "星期日"     
			     if(date.getDay() == 1) week = "星期一"     
			     if(date.getDay() == 2) week = "星期二"     
			     if(date.getDay() == 3) week = "星期三"     
			     if(date.getDay() == 4) week = "星期四"     
			     if(date.getDay() == 5) week = "星期五"     
			     if(date.getDay() == 6) week = "星期六"     
			     return week;
			  },
			myphone($event){
				this.$emit('myphone',$event.target.value)
			},
			username($event){
				this.$emit('user',$event.target.value)
			},
			scrollfn(e){
				this.ordermeesage = this.orderlist[e.detail.value[0]].gradename
			},
			activeclass(){
				this.$refs.popup.open();
			},
			orderclass(){
				this.$refs.orderpopup.open();
			},
			ordersure(){
				this.ordermsg = this.ordermeesage
				if(this.ordermeesage==""){
					this.ordermsg = this.orderlist[0].gradename
				}
				this.$emit('curriculum',this.ordermsg)
				this.$refs.popup.close()
			},
			sure(){
				this.msg = this.meesage
				if(this.meesage==""){
					var date = new Date();
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					if (month < 10) {
					    month = "0" + month;
					}
					if (day < 10) {
					    day = "0" + day;
					}
					var nowDate = year + "/" + month + "/" + day+' ';
					this.timestamp = new Date().getTime()
					this.msg = nowDate+this.getWeek(date)
				}
				this.$emit('grade',this.timestamp)
				this.$refs.orderpopup.close();
			},
			cancel(){
				this.$refs.popup.close()
				this.$refs.orderpopup.close();
			}
		}
	}
</script>

<style lang="less" scoped>
.form {
			margin-top: 40rpx;
			border-bottom: 2rpx solid #e8ecef;
			.input-placeholder {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 48rpx;
				color: #b9c0c9;
			}
			.title {
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 54rpx;
				color: #00152a;
			}
			.inputcontent {
				margin: 60rpx 0;
				display: flex;
				align-items: center;
				input {
					width: 70%;
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #00152a;
				}
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #00152a;
					letter-spacing: 50rpx;
				}
				.input-placeholder {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 48rpx;
					color: #b9c0c9;
				}
			}
			.phone {
				display: flex;
				align-items: center;
				margin: 60rpx 0;
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 48rpx;
					color: #00152a;
					&:nth-child(1) {
						letter-spacing: 50rpx;
					}
				}
				.phoneinfo {
					display: inline-block;
					width: 70%;
				}
			}
			.activegrade {
				margin: 60rpx 0 40rpx 0;
				display: flex;
				align-items: center;
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 48rpx;
					color: #00152a;
				}
				.active {
					width: 70%;
					margin-left: 50rpx;
					display: flex;
					align-items: center;
					image {
						margin-left: 20rpx;
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
			.picker-view {
				width: 750rpx;
				height: 248rpx;
				picker-view-column{
					text-align: center;
				}
				.column{
					.item {
						height: 90rpx;
						align-items: center;
						justify-content: center;
						text-align: center;
					}
				}
				
			}
			.botactive{
				width: 100%;
				height: 344rpx;
				background: #FFFFFF;
				
				z-index: 999;
				position: relative;
				.header{
					border-radius: 16rpx 16rpx 0px 0px;
					background: #FFFFFF;
					position: absolute;
					bottom: 344rpx;
					width: 100%;
					height: 88rpx;
					padding: 0 40rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					text{
							font-size: 28rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							line-height: 48px;
						&:nth-child(1){
							color: #B9C0C9;
						}
						&:nth-child(2){
							color: #00152A;
						}
						&:nth-child(3){
							font-weight: 500;
							color: #6593B7
						}
					}
				}
				.picker-view {
					width: 750rpx;
					height: 344rpx;
					.column{
						.item {
							height: 90rpx;
							align-items: center;
							justify-content: center;
							text-align: center;
						}
					}
					
				}
				
			}
		}
</style>
