<template>
	<view class="content">
		<view class="content_wrap">
			<serch @sercher="sercher" @serchdata="serchdata"></serch>
			<screen @all="studentlist" @gradeactive="gradeactive" classname="true" :myclassleave="myclassleave" :classflag="classflag"></screen>
			<text class="nodata" v-if="isshow">暂无数据...</text>
			<view v-if="!isshow" class="courselist">
				<view class="courselist_box" @click="jump(item.stid)" v-for="(item,index) in student" :key="index">
					<view class="img">
						<image :src="item.stu_icon" mode="aspectFit"></image>
					</view>
					
					<text class="title">{{ item.stu_name }}</text>
					<view class="teach">
						<text>{{ item.gradename }} | {{ item.classname }}</text>
					</view>
					<view class="grade">
						<text>推荐理由：{{ item.recommand }}</text>
					</view>
				</view>
			</view>
			<text v-if="flag">—— 我是有底线的 ——</text>
		</view>
		<tui-tabbar></tui-tabbar>
	</view>
</template>

<script>
	import api from '../../api/api.js'
	import screen from '../../components/screen.vue'
import serch from '../../components/serch.vue';
import { mapState } from 'vuex';
export default {
	components: {
		serch,
		screen
	},
	data() {
		return {
			title: '学员风采',
			student: [],
			isshow: false,
			parms: "",
			shaixuanlimit: 6,
			count: 0,
			alldata: true,
			flag: false,
			keyword: "",
			myclassleave: [],
			classflag: false
		};
	},
	created() {
		uni.showLoading({
			title:"加载中..."
		})
		this.studentlist();
	},
	onLoad() {
		uni.hideTabBar();
		
	},
	watch:{
		keyword: function(){
			if(this.keyword==""){
				if(this.parms == ""){
					this.studentlist()
				}
			}
		}
	},
	onReachBottom() {
		if(this.alldata){
			if(this.count<=this.shaixuanlimit){
				this.flag = true
				uni.hideLoading()
			}else{
				uni.showLoading({
					title:"加载中..."
				})
				this.flag = false
				this.shaixuanlimit+=6
				this.bottomload(this.shaixuanlimit)
			}
		}else{
			if(this.count<=this.shaixuanlimit){
				this.flag = true
				uni.hideLoading()
			}else{
				uni.showLoading({
					title:"加载中..."
				})
				this.flag = false
				this.shaixuanlimit+=6
				if(this.keyword==""){
					if(!this.parms.gid){
						this.shaixuan({cid: this.parms.cid,limit:this.shaixuanlimit})
					}else if(!this.parms.cid){
						this.shaixuan({gid: this.parms.gid,limit:this.shaixuanlimit})
					}else{
						this.shaixuan({cid: this.parms.cid,gid:this.parms.gid,limit:this.shaixuanlimit})
					}
				}else{
					if(!this.parms.gid){
						this.shaixuan({cid: this.parms.cid,limit:this.shaixuanlimit,keyword:this.keyword})
					}else if(!this.parms.cid){
						this.shaixuan({gid: this.parms.gid,limit:this.shaixuanlimit,keyword:this.keyword})
					}else{
						this.shaixuan({cid: this.parms.cid,gid:this.parms.gid,limit:this.shaixuanlimit,keyword:this.keyword})
					}
				}
				
			}
		}
	},
	methods: {
		sercher(v){
			this.keyword = v
		},
		serchdata(){
			this.shaixuanlimit = 6
			if(this.keyword==""){
				if(this.parms==""){
					this.video = []
				}else{
					if(!this.parms.gid){
						this.shaixuan({cid: this.parms.cid,limit:6})
					}else if(!this.parms.cid){
						this.shaixuan({gid: this.parms.gid,limit:6})
					}else{
						this.shaixuan({cid: this.parms.cid,gid:this.parms.gid,limit:6})
					}
				}
			}else{
				if(this.parms==""){
					this.shaixuan({keyword:this.keyword,limit:6})
				}else{
					if(!this.parms.gid){
						this.shaixuan({cid: this.parms.cid,limit:6,keyword:this.keyword})
					}else if(!this.parms.cid){
						this.shaixuan({gid: this.parms.gid,limit:6,keyword:this.keyword})
					}else{
						this.shaixuan({cid: this.parms.cid,gid:this.parms.gid,limit:6,keyword:this.keyword})
					}
				}
			}
		},
		jump(stid){
			uni.navigateTo({
				url:"../children/studentdetail/studentdetail?stid="+ stid
			})
		},
		shaixuan(parm){
			this.$axios.postapi('/Student/sel_sudents',parm).then(res => {
				if(res.data.code==0){
					this.isshow = true
					this.flag = false
					return false
				}
				this.isshow = false
				this.student = res.data.data
				this.count = res.data.count
				uni.hideLoading()
			})
		},
		bottomload(limit){
			if(this.keyword==""){
				this.$axios.postapi('/Student/sel_sudents',{limit:limit}).then(res => {
					if(res.data.code==0){
						this.isshow = true
						this.flag = false
						return false
					}
					this.isshow = false
					this.student = res.data.data
					this.count = res.data.count
					uni.hideLoading()
				})
			}else{
				this.$axios.postapi('/Student/sel_sudents',{limit:limit,keyword:this.keyword}).then(res => {
					if(res.data.code==0){
						this.isshow = true
						this.flag = false
						return false
					}
					this.isshow = false
					this.student = res.data.data
					this.count = res.data.count
					uni.hideLoading()
				})
			}
			
		},
		gradeactive(v){
			this.alldata = false
			this.parms = v
			this.shaixuanlimit = 6
			
			if(!this.parms.gid){
				this.classflag = true
				this.shaixuan({cid: this.parms.cid,limit:6})
			}else if(!this.parms.cid){
				this.shaixuan({gid: this.parms.gid,limit:6})
			}else{
				this.classflag = true
				this.shaixuan({cid: this.parms.cid,gid:this.parms.gid,limit:6})
			}
		},
		studentlist(){
			this.alldata = true
			this.classflag = false
			if(this.keyword==""){
				api.postapi('/Student/sel_sudents',{
					limit: 6,
					page: 1
				}).then(res => {
					uni.hideLoading()
					if(res.data.code==0){
						this.isshow = true
						this.flag = false
						return false
					}
					this.isshow = false
					const studentlist = res.data.data
					this.count = res.data.count
					this.student = studentlist
				})
			}else{
				api.postapi('/Student/sel_sudents',{
					limit: 6,
					keyword:this.keyword
				}).then(res => {
					uni.hideLoading()
					if(res.data.code==0){
						this.isshow = true
						this.flag = false
						return false
					}
					this.isshow = false
					const studentlist = res.data.data
					this.count = res.data.count
					this.student = studentlist
				})
			}
			
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
		.nodata{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
		}
		.courselist{
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					padding: 0 36rpx 20rpx 36rpx;
					box-sizing: border-box;
					text-align: start;
					.courselist_box{
						box-shadow: 0px 6rpx 12rpx #F9FBFC;
						margin: 20rpx 0;
						&:nth-child(2n){
							margin-left: 11px;
						}
						.img{
							width: 328rpx;
							background: rgba(0, 0, 0, 0);
							border-radius: 16rpx;
							overflow: hidden;
							image{
								width: 328rpx;
								height: 328rpx;
							}
						}
						.title{
							font-size: 28rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							line-height: 48rpx;
							color: #00152A;
						}
						text{
							font-size: 24rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							line-height: 40rpx;
							color: #B9C0C9;
							
						}
						.grade{
							text{
								display: inline-block;
								width: 328rpx;
								font-size: 24rpx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								line-height: 40rpx;
								color: #0E2A47;
								text-overflow: ellipsis;
								overflow: hidden;
								white-space: nowrap;
							}
							
						}
					}
				}
	}
}
</style>
