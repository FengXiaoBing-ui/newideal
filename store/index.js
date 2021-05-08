import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		tabBar: [
			{
				"pagePath": "/pages/Activity/Activity",
				"text": "活动预告",
				"selectedIconPath":"../static/img/hdyg_blue@3x.png",
				"iconPath":"../static/img/hdyg_gray@3x.png",
				"num": 0,
				"isDot": false,
				"verify": true
			},
			{
				"pagePath": "/pages/database/database",
				"text": "资料库",
				"selectedIconPath":"../static/img/tab_zlk_blue.png",
				"iconPath":"../static/img/tab_zlk_gray.png",
				"num": 0,
				"isDot": false,
				"verify": true
			},
			{
				"pagePath": "/pages/index/index",
				"text": "首页",
				"selectedIconPath":"../static/img/tab_home_logo.png",
				"iconPath":"../static/img/tab_home_logo.png",
				"hump": true,
				"verify": true
			},
			{
				"pagePath": "/pages/appointment/appointment",
				"text": "试听预约",
				"selectedIconPath":"../static/img/tab_styy_blue@.png",
				"iconPath":"../static/img/tab_styy_gray.png",
				"num": 0,
				"isDot": false,
				"verify": true
			},
			{
				"pagePath": "/pages/studentStyle/studentStyle",
				"text": "学员风采",
				"selectedIconPath":"../static/img/tab_xyfc_blue.png",
				"iconPath":"../static/img/tab_xyfc_gray.png",
				"num": 0,
				"isDot": true,
				"verify": true
			}
		],
		tabBarIndex: 2,
		studentserch: [],
		gradeserch: []
	},
	mutations: {
		changeTabBar(state, payload) {
			if (payload) {
				state.tabBarIndex = payload.index
			}
		},
		student(state,student){
			if (student) {
				state.studentserch = student
			}
		},
		grade(state,grade){
			state.gradeserch = grade
		}
	},
	actions: {

	}
})

export default store