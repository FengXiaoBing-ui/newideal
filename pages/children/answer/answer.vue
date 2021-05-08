<template>
	<view class="answer">
		<serch @sercher="sercher" @serchdata="serchdata"></serch>
		<screen @all="onesubject" @gradeactive="gradeactive"></screen>
		<view class="answer_list" v-for="(item,index) in subject" :key="index" @click="jump(item.maid)">
			<text> {{item.title}} </text>
		</view>
		<text v-if="flag">—— 我是有底线的 ——</text>
		<text class="nodata" v-if="isshow">暂无数据...</text>
	</view>
</template>

<script>
import serch from '../../../components/serch.vue';
import screen from '../../../components/screen.vue'
	export default {
		components:{
			serch,
			screen
		},
		data() {
			return {
				subject: [],
				parms: "",
				shaixuanlimit: 10,
				count: 0,
				alldata: true,
				flag: false,
				option: "",
				isshow: false,
				keyword: ""
			};
		},
		onLoad(option) {
			this.option = option
			this.onesubject()
		},
		created() {
			
		},
		watch:{
			keyword:function(){
				if(this.keyword==""&&this.parms==""){
					this.onesubject()
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
					this.shaixuanlimit+=10
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
					this.shaixuanlimit+=10
					if(this.keyword==""){
						if(!this.parms.gid){
							this.shaixuan({type:this.option.type,sid: this.parms.sid,limit:this.shaixuanlimit})
						}else if(!this.parms.sid){
							this.shaixuan({type:this.option.type,gid: this.parms.gid,limit:this.shaixuanlimit})
						}else{
							this.shaixuan({type:this.option.type,sid: this.parms.sid,gid:this.parms.gid,limit:this.shaixuanlimit})
						}
					}else{
						if(!this.parms.gid){
							this.shaixuan({type:this.option.type,sid: this.parms.sid,limit:this.shaixuanlimit,keyword:this.keyword})
						}else if(!this.parms.sid){
							this.shaixuan({type:this.option.type,gid: this.parms.gid,limit:this.shaixuanlimit,keyword:this.keyword})
						}else{
							this.shaixuan({type:this.option.type,sid: this.parms.sid,gid:this.parms.gid,limit:this.shaixuanlimit,keyword:this.keyword})
						}
					}
					
				}
			}
		},
		methods:{
			sercher(v){
				this.keyword = v
			},
			serchdata(){
				this.shaixuanlimit = 6
				if(this.keyword==""){
					if(this.parms==""){
						this.subject = []
					}else{
						if(!this.parms.gid){
							this.shaixuan({type:this.option.type,sid: this.parms.sid,limit:6})
						}else if(!this.parms.sid){
							this.shaixuan({type:this.option.type,gid: this.parms.gid,limit:6})
						}else{
							this.shaixuan({type:this.option.type,sid: this.parms.sid,gid:this.parms.gid,limit:6})
						}
					}
				}else{
					if(this.parms==""){
						this.shaixuan({type:this.option.type,keyword:this.keyword,limit:6})
					}else{
						if(!this.parms.gid){
							this.shaixuan({type:this.option.type,sid: this.parms.sid,limit:6,keyword:this.keyword})
						}else if(!this.parms.sid){
							this.shaixuan({type:this.option.type,gid: this.parms.gid,limit:6,keyword:this.keyword})
						}else{
							this.shaixuan({type:this.option.type,sid: this.parms.sid,gid:this.parms.gid,limit:6,keyword:this.keyword})
						}
					}
				}
			},
			jump(maid){
				uni.navigateTo({
					url:"../activitydetail/answerdetail/answerdetail?maid="+maid
				})
			},
			shaixuan(parm){
				this.$axios.postapi('/Onlineroom/sel_online',parm).then(res => {
					uni.hideLoading()
					if(res.data.code==0){
						this.isshow = true
						this.flag = false
						this.subject = []
						return false
					}
					this.isshow = false
					this.subject = res.data.data
					this.count = res.data.count
					
				})
			},
			bottomload(limit){
				if(this.keyword==""){
					this.$axios.postapi('/Onlineroom/sel_online',{type:this.option.type,limit:limit}).then(res => {
						uni.hideLoading()
						if(res.data.code==0){
							this.isshow = true
							this.flag = false
							this.subject = []
							return false
						}
						this.isshow = false
						this.subject = res.data.data
						this.count = res.data.count
						
					})
				}else{
					this.$axios.postapi('/Onlineroom/sel_online',{type:this.option.type,limit:limit,keyword:this.keyword}).then(res => {
						uni.hideLoading()
						if(res.data.code==0){
							this.isshow = true
							this.flag = false
							this.subject = []
							return false
						}
						this.isshow = false
						this.subject = res.data.data
						this.count = res.data.count
						
					})
				}
				
			},
			onesubject(type){
				this.alldata = true
				if(this.keyword==""){
					this.$axios.postapi('/Onlineroom/sel_online',{
						type:this.option.type,
						limit:10
					}).then(res => {
						uni.hideLoading()
						if(res.data.code==0){
							this.isshow = true
							this.flag = false
							this.subject = []
							return false
						}
						this.isshow = false
						this.subject = res.data.data
						this.count = res.data.count
					})
				}else{
					this.$axios.postapi('/Onlineroom/sel_online',{
						type:this.option.type,
						limit:10,
						keyword:this.keyword
					}).then(res => {
						uni.hideLoading()
						if(res.data.code==0){
							this.isshow = true
							this.flag = false
							this.subject = []
							return false
						}
						this.isshow = false
						this.subject = res.data.data
						this.count = res.data.count
					})
				}
				
			},
			gradeactive(v){
				console.log(v)
				this.alldata = false
				this.parms = v
				this.shaixuanlimit = 10
				if(this.keyword==""){
					if(!this.parms.gid){
						this.shaixuan({type:this.option.type,sid: this.parms.sid,limit:10})
					}else if(!this.parms.sid){
						this.shaixuan({type:this.option.type,gid: this.parms.gid,limit:10})
					}else{
						this.shaixuan({type:this.option.type,sid: this.parms.sid,gid:this.parms.gid,limit:10})
					}
				}else{
					if(!this.parms.gid){
						this.shaixuan({type:this.option.type,sid: this.parms.sid,limit:10,keyword:this.keyword})
					}else if(!this.parms.sid){
						this.shaixuan({type:this.option.type,gid: this.parms.gid,limit:10,keyword:this.keyword})
					}else{
						this.shaixuan({type:this.option.type,sid: this.parms.sid,gid:this.parms.gid,limit:10,keyword:this.keyword})
					}
				}
				
			}
		}
	}
</script>

<style lang="less" scoped>
.answer{
	width: 100%;
	padding-bottom: 100rpx;
	text-align: center;
	.nodata{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.answer_list{
		text-align: start;
		padding: 40rpx 0;
		margin: 0 36rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid #F7F7F7;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		line-height: 48rpx;
		color: #00152A;
	}
}
</style>
