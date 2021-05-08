<template>
	<view class="allvideo">
		<view class="allvideo_wrap">
			<serch @sercher="sercher" @serchdata="serchdata"></serch>
			<screen @all="allvideo" @gradeactive="gradeactive"></screen>
			<teacherlist v-if="!nodata" :video="video" path="../videodetail/videodetail"></teacherlist>
			<text class="nodata" v-if="nodata">暂无数据...</text>
			<text v-if="show">—— 我是有底线的 ——</text>
		</view>
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
				video: [],
				parms: "",
				shaixuanlimit: 6,
				count: 0,
				alldata: true,
				show: false,
				keyword: "",
				nodata: false
			};
		},
		created() {
			uni.showLoading({
				title:"加载中..."
			})
			this.allvideo()
		},
		watch:{
			keyword:function(){
				if(this.keyword==""&&this.parms==""){
					this.allvideo()
				}
			}
		},
		onReachBottom() {
			if(this.alldata){
				if(this.count<=this.shaixuanlimit){
					this.show = true
					uni.hideLoading()
				}else{
					uni.showLoading({
						title:"加载中..."
					})
					this.show = false
					this.shaixuanlimit+=6
					this.bottomload(this.shaixuanlimit)
				}
			}else{
				if(this.count<=this.shaixuanlimit){
					this.show = true
					uni.hideLoading()
				}else{
					uni.showLoading({
						title:"加载中..."
					})
					this.show = false
					this.shaixuanlimit+=6
					if(this.keyword==""){
						if(!this.parms.gid){
							this.shaixuan({type:1,sid: this.parms.sid,limit:this.shaixuanlimit})
						}else if(!this.parms.sid){
							this.shaixuan({type:1,gid: this.parms.gid,limit:this.shaixuanlimit})
						}else{
							this.shaixuan({type:1,sid: this.parms.sid,gid:this.parms.gid,limit:this.shaixuanlimit})
						}
					}else{
						if(!this.parms.gid){
							this.shaixuan({type:1,sid: this.parms.sid,limit:this.shaixuanlimit,keyword:this.keyword})
						}else if(!this.parms.sid){
							this.shaixuan({type:1,gid: this.parms.gid,limit:this.shaixuanlimit,keyword:this.keyword})
						}else{
							this.shaixuan({type:1,sid: this.parms.sid,gid:this.parms.gid,limit:this.shaixuanlimit,keyword:this.keyword})
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
							this.shaixuan({type:1,sid: this.parms.sid,limit:6})
						}else if(!this.parms.sid){
							this.shaixuan({type:1,gid: this.parms.gid,limit:6})
						}else{
							this.shaixuan({type:1,sid: this.parms.sid,gid:this.parms.gid,limit:6})
						}
					}
				}else{
					if(this.parms==""){
						this.shaixuan({type:1,keyword:this.keyword,limit:6})
					}else{
						if(!this.parms.gid){
							this.shaixuan({type:1,sid: this.parms.sid,limit:6,keyword:this.keyword})
						}else if(!this.parms.sid){
							this.shaixuan({type:1,gid: this.parms.gid,limit:6,keyword:this.keyword})
						}else{
							this.shaixuan({type:1,sid: this.parms.sid,gid:this.parms.gid,limit:6,keyword:this.keyword})
						}
					}
				}
			},
			shaixuan(parm){
				this.$axios.postapi('/Onlineroom/sel_online',parm).then(res => {
					console.log(res)
					if(res.data.code==0){
						this.nodata = true
						this.show = false
						return false
					}
					this.nodata = false
					this.video = res.data.data
					this.count = res.data.count
					uni.hideLoading()
				})
			},
			bottomload(limit){
				if(this.keyword==""){
					this.$axios.postapi('/Onlineroom/sel_online',{type:1,limit:limit}).then(res => {
						if(res.data.code==0){
							this.nodata = true
							this.show = false
							return false
						}
						this.nodata = false
						this.video = res.data.data
						this.count = res.data.count
						uni.hideLoading()
					})
				}else{
					this.$axios.postapi('/Onlineroom/sel_online',{type:1,limit:limit,keyword:this.keyword}).then(res => {
						if(res.data.code==0){
							this.nodata = true
							return false
						}
						this.nodata = false
						this.video = res.data.data
						this.count = res.data.count
						uni.hideLoading()
					})
				}
				
			},
			allvideo(){
				this.parms = ''
				this.alldata = true
				if(this.keyword==""){
					this.$axios.postapi('/Onlineroom/sel_online',{type:1,limit:6}).then(res => {
						if(res.data.code==0){
							this.nodata = true
							this.show = false
							return false
						}
						this.nodata = false
						uni.hideLoading()
						this.video = res.data.data
						this.count = res.data.count
						uni.hideLoading()
					})
				}else{
					this.$axios.postapi('/Onlineroom/sel_online',{type:1,limit:6,keyword:this.keyword}).then(res => {
						if(res.data.code==0){
							this.nodata = true
							this.show = false
							return false
						}
						this.nodata = false
						uni.hideLoading()
						this.video = res.data.data
						this.count = res.data.count
						uni.hideLoading()
					})
				}
				
			},
			gradeactive(v){
				console.log(2143,v)
				this.alldata = false
				this.parms = v
				this.shaixuanlimit = 6
				if(this.keyword!=""){
					if(!this.parms.gid){
						this.shaixuan({type:1,sid: this.parms.sid,limit:6,keyword: this.keyword})
					}else if(!this.parms.sid){
						this.shaixuan({type:1,gid: this.parms.gid,limit:6,keyword: this.keyword})
					}else{
						this.shaixuan({type:1,sid: this.parms.sid,gid:this.parms.gid,limit:6,keyword: this.keyword})
					}
				}else{
					if(!this.parms.gid){
						this.shaixuan({type:1,sid: this.parms.sid,limit:6})
					}else if(!this.parms.sid){
						this.shaixuan({type:1,gid: this.parms.gid,limit:6})
					}else{
						this.shaixuan({type:1,sid: this.parms.sid,gid:this.parms.gid,limit:6})
					}
				}
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.allvideo{
		display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.allvideo_wrap{
				width: 100%;
				padding-bottom: 200rpx;
				text-align: center;
				.nodata{
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
				}
				}
	}

</style>
