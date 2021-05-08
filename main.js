import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import tuiTabbar from 'components/tabbar.vue'
import api from 'api/api.js'

Vue.component("tui-tabbar",tuiTabbar)
Vue.prototype.$axios = api
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
