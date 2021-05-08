const httpurl = "https://xlxjy.welamp.cn/index.php/api"
export default{
	getapi(url,parmes){
		return new Promise((resolve,reject) => {
			uni.request({
				url: `${httpurl}${url}`,
				method: "GET",
				data: parmes,
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				success(res){
					resolve(res)
				},
				fail(err){
					reject(err)
				}
			})
		})
	},
	postapi(url,parmes){
		return new Promise((resolve,reject) => {
			uni.request({
				url: `${httpurl}${url}`,
				method: "POST",
				data: parmes,
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				success(res){
					resolve(res)
				},
				fail(err){
					reject(err)
				}
			})
		})
	}
}