<template>
	<view class="allsubject">
		<view class="allsubject_wrap">
			<serch @sercher="sercher" @serchdata="serchdata"></serch>
			<screen @all="allsub" @gradeactive="gradeactive"></screen>
			<teacherlist v-if="!isshow" :video="allsubject" datacourse="true"></teacherlist>
			<text v-if="isshow">暂无数据...</text>
		</view>
		<text style="padding-bottom: 50rpx;" v-if="flag">—— 我是有底线的 ——</text>
	</view>
</template>

<script>
	import serch from '../../../components/serch.vue';
	import screen from '../../../components/screen.vue';
	import teacherlist from '../../../components/teacherlist.vue'
	export default {
		components:{
			serch,
			screen,
			teacherlist
		},
		data() {
			return {
			allsubject: [],
			option: "",
			isshow: false,
			parms: "",
			shaixuanlimit: 6,
			count: 0,
			alldata: true,
			flag: false,
			keyword: ""
			};
		},
		onLoad(option) {
			this.option = option
			uni.setNavigationBarTitle({
			　　title:option.title
			})
			uni.showLoading({
				title:"加载中..."
			})
			this.allsub()
		},
		watch:{
			keyword:function(){
				if(this.keyword==""&&this.parms==""){
					this.allsub()
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
						this.video = []
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
			shaixuan(parm){
				this.$axios.postapi('/Onlineroom/sel_online',parm).then(res => {
					console.log(res)
					if(res.data.code==0){
						this.isshow = true
						this.flag = false
						return false
					}
					this.isshow = false
					this.allsubject = res.data.data
					this.count = res.data.count
					uni.hideLoading()
				})
			},
			bottomload(limit){
				if(this.keyword==""){
					this.$axios.postapi('/Onlineroom/sel_online',{type:this.option.type,limit:limit}).then(res => {
						if(res.data.code==0){
							this.isshow = true
							this.flag = false
							return false
						}
						this.isshow = false
						this.allsubject = res.data.data
						this.count = res.data.count
						uni.hideLoading()
					})
				}else{
					this.$axios.postapi('/Onlineroom/sel_online',{type:this.option.type,limit:limit,keyword:this.keyword}).then(res => {
						if(res.data.code==0){
							this.isshow = true
							this.flag = false
							return false
						}
						this.isshow = false
						this.allsubject = res.data.data
						this.count = res.data.count
						uni.hideLoading()
					})
				}
				
			},
			allsub(){
				if(this.keyword==""){
					this.$axios.postapi('/Onlineroom/sel_online',{type:this.option.type,limit:6}).then( res => {
						uni.hideLoading()
						console.log(res)
						this.alldata = true
						if(res.data.code==0){
							this.isshow = true
							this.flag = false
							return false
						}
						this.isshow = false
						this.allsubject = res.data.data
						this.count = res.data.count
					})
				}else{
					this.$axios.postapi('/Onlineroom/sel_online',{type:this.option.type,limit:6,keyword:this.keyword}).then( res => {
						uni.hideLoading()
						console.log(res)
						this.alldata = true
						if(res.data.code==0){
							this.isshow = true
							this.flag = false
							return false
						}
						this.isshow = false
						this.allsubject = res.data.data
						this.count = res.data.count
					})
				}
				
			},
			gradeactive(v){
				console.log(v)
				this.alldata = false
				this.parms = v
				this.shaixuanlimit = 6
				if(this.keyword==""){
					if(!this.parms.gid){
						this.shaixuan({type:this.option.type,sid: this.parms.sid,limit:6})
					}else if(!this.parms.sid){
						this.shaixuan({type:this.option.type,gid: this.parms.gid,limit:6})
					}else{
						this.shaixuan({type:this.option.type,sid: this.parms.sid,gid:this.parms.gid,limit:6})
					}
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
		}
	}
</script>

<style lang="less" scoped>
	.allsubject{
		display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.allsubject_wrap{
				width: 100%;
				text-align: center;
					text{
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%,-50%);
					}
				}
	}

</style>
