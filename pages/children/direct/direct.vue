<template>
	<view class="direct">
		<banner :banners="bannerlist" direct="true"></banner>
		<view class="direct_wrap">
			<view class="myinfofather">
				<myinfo @curriculum="curriculum" @myphone="myphone" @user="user"></myinfo>
			</view>
			
			
			<view class="active_subject">
				<text class="title">请选择科目</text>
				<view class="active">
					
					<view class="active_box" @click="activesubject(index,item.subjectname)" v-for="(item,index) in subject" :key="index">
						<image :src="item.imgurl" mode=""></image>
						<text :class="item.active"> {{item.subjectname}} </text>
					</view>
				</view>
			</view>
			
			<view class="active_subject">
				<text class="title">请选择班型</text>
				<view class="active">
					
					<view class="active_box" @click="activeclass(index,item.csname)" v-for="(item,index) in Classtype" :key="index">
						<image :src="item.imgurl" mode=""></image>
						<text :class="item.active"> {{item.csname}} </text>
					</view>
				</view>
			</view>
			<botfooter @sactivty="sactivty" title="我要预约"></botfooter>
		</view>
	</view>
</template>

<script>
	import banner from '../../../components/banner.vue';
	import myinfo from '../../../components/myinfo.vue';
	import botfooter from '../../../components/bot_footer.vue'
	export default {
		components:{
			banner,
			myinfo,
			botfooter
		},
		data() {
			return {
				Classtype: [],
				subject: this.$store.state.studentserch,
				classname: [],
				subjectname: [],
				bannerlist: [],
				username: "",
				userphone: "",
				gradename: ""
				};
		},
		created() {
			uni.showLoading({
				title:"加载中..."
			})
			this.banner()
			this.class_settting()
			for (let s of this.subject) {
				s.imgurl = "../../../static/img/select_gray.png";
				s.active = ""
			}
		},
		methods:{
			banner(){
				this.$axios.postapi('/Addition/sel_st_scroll').then(res => {
					console.log(res)
					uni.hideLoading()
					this.bannerlist = res.data.data
				})
			},
			sactivty(){
				if (this.username == '') {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					});
					return false;
				}
				if (this.userphone == '') {
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
				if (!/^1[3|4|5|7|8]\d{9}$/.test(this.userphone)) {
					uni.showToast({
						title: '电话号码格式错误',
						icon: 'none'
					});
					return false;
				}
				for(let i = 0; i < this.subject.length;i++){
					if(this.subject[i].active=='activetext'){
						this.subjectname.push(this.subject[i].subjectname)
					}
				}
				for(let j = 0; j < this.Classtype.length;j++){
					if(this.Classtype[j].active=='activetext'){
						this.classname.push(this.Classtype[j].csname)
					}
				}
				if (this.subjectname.length ==0) {
					uni.showToast({
						title: '请选择科目',
						icon: 'none'
					});
					return false;
				}
				if (this.classname.length == 0) {
					uni.showToast({
						title: '请选择班型',
						icon: 'none'
					});
					return false;
				}
				this.classname = JSON.stringify(this.classname)
				this.classname = this.classname.replace(/\[|]|"/g,'');
				this.classname = this.classname.replace(/\,/g,'|');
				this.subjectname = JSON.stringify(this.subjectname)
				this.subjectname = this.subjectname.replace(/\[|]|"/g,'');
				this.subjectname = this.subjectname.replace(/\,/g,'|');
				var arr = {};
				arr["username"] = this.username
				arr["userphone"] = this.userphone
				arr["gradename"] = this.gradename
				arr["subjectname"] = this.subjectname
				arr["classname"] = this.classname
				arr["openid"] = uni.getStorageSync('openid')
				
				arr = JSON.stringify(arr)
				this.$axios.postapi('/Addition/submit_order',{data:arr}).then(res => {
					console.log(99,res)
					if(res.data.code==1){
						uni.showToast({
							title:"报名成功"
						})
						setTimeout(() => {
							uni.switchTab({
								url:"../../appointment/appointment",
							})
						},500)
					}
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
						setTimeout(() => {
							uni.switchTab({
								url:"../../appointment/appointment",
							})
						},500)
					}
				})
				this.classname = []
				this.subjectname = []
			},
			curriculum(v){
				this.gradename = v
			},
			user(v){
				this.username = v
			},
			myphone(v){
				this.userphone = v
			},
			class_settting(){
				
				this.$axios.postapi('/Addition/sel_class_settting').then(res => {
					console.log(res)
					this.Classtype = res.data.data
					for (let s of this.Classtype) {
						s.imgurl = "../../../static/img/select_gray.png";
						s.active = ""
					}
				})
			},
			activesubject(index,text){
				if(this.subject[index].imgurl == '../../../static/img/select_blue.png'){
					this.subject[index].imgurl = '../../../static/img/select_gray.png'
					this.subject[index].active = ''
				}else{
					this.subject[index].imgurl = '../../../static/img/select_blue.png'
					this.subject[index].active = 'activetext'
				}
				this.$forceUpdate()
			},
			activeclass(index,text){
				if(this.Classtype[index].imgurl == '../../../static/img/select_blue.png'){
					this.Classtype[index].imgurl = '../../../static/img/select_gray.png'
					this.Classtype[index].active = ''
				}else{
					this.Classtype[index].imgurl = '../../../static/img/select_blue.png'
					this.Classtype[index].active = 'activetext'
				}
				this.$forceUpdate()
			}
		}
	}
</script>

<style lang="less" scoped>
.direct{
	width: 100%;
	.direct_wrap{
		width: 100%;
		box-sizing: border-box;
		.myinfofather{
			padding: 0 40rpx;
			box-sizing: border-box;
		}
		.active_subject{
			padding: 40rpx;
			box-sizing: border-box;
			background: #F9FBFC;
			.title{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 48rpx;
				color: #00152A;
			}
			.active{
				margin-top: 40rpx;
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				.active_box{
					width: 33%;
					display: flex;
					align-items: center;
					margin: 20rpx 0;
					text{
						display: inline-block;
						margin-left: 20rpx;
						text-align: center;
					}
					.activetext{
						color: #6593B7;
					}
					image{
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
		}
		
	}
}
</style>
