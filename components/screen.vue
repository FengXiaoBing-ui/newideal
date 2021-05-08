<template>
	<view>
		<view class="screen">
			<view :class="Highlight" @click="all">全部</view>
			<view class="section" @click="sectionscreen">
				<text>{{section}}</text>
				<image src="../static/img/down_gray.png" mode=""></image>
			</view>
			<view class="subject" @click="subjectscreen" v-if="!classname">
				<text>{{ subject }}</text>
				<image src="../static/img/down_gray.png" mode=""></image>
			</view>
			<view v-if="classname"></view>
		</view>
		<uni-popup ref="gradepopup" type="bottom">
			<view class="botactive">
				<view class="header">
					<text @click="cancel">取消</text>
					<text>请选择年级</text>
					<text @click="gradesure">完成</text>
				</view>
				<picker-view class="picker-view" @change="gradescrollfn" >
					<picker-view-column class="column">
					                <view  class="item" v-for="(item,index) in list" :key="index">{{item.gradename}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</uni-popup>
		<uni-popup ref="popup" type="bottom">
			<view class="botactive">
				<view class="header">
					<text @click="cancel">取消</text>
					<text>请选择学科</text>
					<text @click="sure">完成</text>
				</view>
				<picker-view class="picker-view" @change="scrollfn" >
					<picker-view-column class="column">
									<view  class="item" v-for="(item,index) in listto" :key="index">{{item.subjectname}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
import LbPicker from '@/components/lb-picker'
export default {
	name: 'screen',
	props:{
		classname: {
			type:Boolean
		},
		classflag: {
			type:Boolean
		}
	},
	components:{
		LbPicker
	},
	data() {
		return {
			Highlight: "Highlight",
			msg: "",
			meesage: "",
			section: "学段",
			subject: "学科",
			myclassname:"班级",
			classmsg: "",
			gid: "",
			sid: "",
			cid: "",
			list: this.$store.state.gradeserch,
			listto: this.$store.state.studentserch,
			accc: "accctt",
			falg: false,
			myclassindex: 0,
			myclassleave: [],
			num: 0
		};
	},
	onHide() {
		console.log("ok")
	},
	watch:{
		section:function(){
			if(this.section!="学段"){
				this.Highlight = ''
			}else{
				this.Highlight = 'Highlight'
			}
		},
		subject: function(){
			if(this.subject!="学科"){
				this.Highlight = ''
			}else{
				this.Highlight = 'Highlight'
			}
		},
		myclassname:function(){
			if(this.myclassname!="班级"){
				this.Highlight = ''
			}else{
				this.classflag = false
				this.Highlight = 'Highlight'
			}
		},
		myclassleave: function(){
			if(this.classflag==true){
				this.myclassname = this.myclassleave[this.myclassindex].classname
				this.cid = this.myclassleave[this.myclassindex].cid
			}
		},
	},
	created() {
		this.$forceUpdate()
		this.myclass()
	},
	methods: {
		myclass(){
			this.$axios.postapi('/Student/sel_classes').then(res => {
				console.log(9999,res)
				this.myclassleave = res.data.data
			})
		},
		all(){
			this.Highlight = 'Highlight'
			this.section = '学段'
			this.subject = '学科'
			this.myclassname = '班级'
			this.gid = ''
			this.sid = ''
			this.cid = ''
			this.$emit('all')
		},
		sectionscreen() {
			this.falg = true
			this.$refs.gradepopup.open();
		},
		subjectscreen(){
			this.falg = false
			this.$refs.popup.open();
		},
		gradescrollfn(e){
			this.msg = this.list[e.detail.value[0]]
		},
		scrollfn(e){
			this.meesage = this.listto[e.detail.value[0]]
		},
		classnamescrollfn(e){
			this.myclassindex = e.detail.value[0]
			this.classmsg = this.myclassleave[e.detail.value[0]]
		},
		myclassnamescreen(){
			this.$refs.classnamepopup.open();
		},
		classnamesure(){
			if(this.classmsg!=""){
				this.myclassname = this.classmsg.classname
				this.cid = this.classmsg.cid
			}
			if(this.classmsg==""){
				this.myclassname = this.myclassleave[this.myclassindex].classname
				this.cid = this.myclassleave[this.myclassindex].cid
			}
			if(this.gid==""){
				let ids = {
					cid:this.cid
				}
				this.$emit('gradeactive',ids)
			}else{
				let ids = {
					gid:this.gid,
					cid:this.cid
				}
				this.$emit('gradeactive',ids)
			}
			this.$refs.classnamepopup.close()
		},
		gradesure(){
			if(this.msg!=""){
				this.section = this.msg.gradename
				this.gid = this.msg.gid
			}
			if(this.msg==""){
				this.section = this.list[0].gradename
				this.gid = this.list[0].gid
			}
			if(this.classname){
				if(this.cid==""){
					this.$axios.postapi('/Student/sel_class',{gid:this.gid}).then(res => {
						this.myclassleave = res.data.data
					})
					
					let ids = {
						gid:this.gid
					}
					this.$emit('gradeactive',ids)
				}else{
					this.$axios.postapi('/Student/sel_class',{gid:this.gid}).then(res => {
						this.myclassleave = res.data.data
					})
					setTimeout(() => {
						let ids = {
							gid:this.gid,
							cid:this.cid
						}
						this.$emit('gradeactive',ids)
					},1000)
					
				}
			}else{
				if(this.sid==""){
					let ids = {
						gid:this.gid
					}
					this.$emit('gradeactive',ids)
				}else{
					let ids = {
						gid:this.gid,
						sid:this.sid
					}
					this.$emit('gradeactive',ids)
				}
			}
			
			
			this.$refs.gradepopup.close();
		},
		sure(){
				if(this.meesage!=""){
					this.subject = this.meesage.subjectname
					this.sid = this.meesage.sid
				}
				if(this.meesage==""){
					this.subject = this.listto[0].subjectname
					this.sid = this.listto[0].sid
				}
				if(this.gid==""){
					let ids = {
						sid:this.sid
					}
					this.$emit('gradeactive',ids)
				}else{
					let ids = {
						gid:this.gid,
						sid:this.sid
					}
					this.$emit('gradeactive',ids)
				}
			this.$refs.popup.close();
			
		},
		cancel(){
			this.$refs.popup.close();
		}
	}
};
</script>

<style lang="less" scoped>
	.botactive{
		width: 100%;
		height: 248rpx;
		background: #FFFFFF;
		
		z-index: 999;
		position: relative;
		.header{
			border-radius: 16rpx 16rpx 0px 0px;
			background: #FFFFFF;
			position: absolute;
			bottom: 248rpx;
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
			height: 248rpx;
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

.screen {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 100rpx;
	box-sizing: border-box;
	box-shadow: 0px 6rpx 12rpx #F9FBFC;
	.Highlight{
		color: #6593B7;
	}
	image {
		margin-left: 10rpx;
		width: 32rpx;
		height: 32rpx;
	}
	.section,
	.subject {
		display: flex;
		align-items: center;
	}
}
</style>
