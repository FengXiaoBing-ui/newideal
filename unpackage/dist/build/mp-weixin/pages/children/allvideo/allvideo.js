(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/children/allvideo/allvideo"],{"85a3":function(i,t,s){"use strict";var a;s.d(t,"b",(function(){return n})),s.d(t,"c",(function(){return o})),s.d(t,"a",(function(){return a}));var n=function(){var i=this,t=i.$createElement;i._self._c},o=[]},a568:function(i,t,s){"use strict";s.r(t);var a=s("ebf2"),n=s.n(a);for(var o in a)"default"!==o&&function(i){s.d(t,i,(function(){return a[i]}))}(o);t["default"]=n.a},a99b:function(i,t,s){},c991:function(i,t,s){"use strict";var a=s("a99b"),n=s.n(a);n.a},ead7:function(i,t,s){"use strict";s.r(t);var a=s("85a3"),n=s("a568");for(var o in n)"default"!==o&&function(i){s.d(t,i,(function(){return n[i]}))}(o);s("c991");var e,d=s("f0c5"),h=Object(d["a"])(n["default"],a["b"],a["c"],!1,null,"6277e9a2",null,!1,a["a"],e);t["default"]=h.exports},ebf2:function(i,t,s){"use strict";(function(i){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){s.e("components/serch").then(function(){return resolve(s("7256"))}.bind(null,s)).catch(s.oe)},n=function(){s.e("components/screen").then(function(){return resolve(s("0aa7"))}.bind(null,s)).catch(s.oe)},o=function(){Promise.all([s.e("common/vendor"),s.e("components/teacherlist")]).then(function(){return resolve(s("c8db"))}.bind(null,s)).catch(s.oe)},e={components:{serch:a,screen:n,teacherlist:o},data:function(){return{video:[],parms:"",shaixuanlimit:6,count:0,alldata:!0,show:!1,keyword:"",nodata:!1}},created:function(){i.showLoading({title:"加载中..."}),this.allvideo()},watch:{keyword:function(){""==this.keyword&&""==this.parms&&this.allvideo()}},onReachBottom:function(){this.alldata?this.count<=this.shaixuanlimit?(this.show=!0,i.hideLoading()):(i.showLoading({title:"加载中..."}),this.show=!1,this.shaixuanlimit+=6,this.bottomload(this.shaixuanlimit)):this.count<=this.shaixuanlimit?(this.show=!0,i.hideLoading()):(i.showLoading({title:"加载中..."}),this.show=!1,this.shaixuanlimit+=6,""==this.keyword?this.parms.gid?this.parms.sid?this.shaixuan({type:1,sid:this.parms.sid,gid:this.parms.gid,limit:this.shaixuanlimit}):this.shaixuan({type:1,gid:this.parms.gid,limit:this.shaixuanlimit}):this.shaixuan({type:1,sid:this.parms.sid,limit:this.shaixuanlimit}):this.parms.gid?this.parms.sid?this.shaixuan({type:1,sid:this.parms.sid,gid:this.parms.gid,limit:this.shaixuanlimit,keyword:this.keyword}):this.shaixuan({type:1,gid:this.parms.gid,limit:this.shaixuanlimit,keyword:this.keyword}):this.shaixuan({type:1,sid:this.parms.sid,limit:this.shaixuanlimit,keyword:this.keyword}))},methods:{sercher:function(i){this.keyword=i},serchdata:function(){this.shaixuanlimit=6,""==this.keyword?""==this.parms?this.video=[]:this.parms.gid?this.parms.sid?this.shaixuan({type:1,sid:this.parms.sid,gid:this.parms.gid,limit:6}):this.shaixuan({type:1,gid:this.parms.gid,limit:6}):this.shaixuan({type:1,sid:this.parms.sid,limit:6}):""==this.parms?this.shaixuan({type:1,keyword:this.keyword,limit:6}):this.parms.gid?this.parms.sid?this.shaixuan({type:1,sid:this.parms.sid,gid:this.parms.gid,limit:6,keyword:this.keyword}):this.shaixuan({type:1,gid:this.parms.gid,limit:6,keyword:this.keyword}):this.shaixuan({type:1,sid:this.parms.sid,limit:6,keyword:this.keyword})},shaixuan:function(t){var s=this;this.$axios.postapi("/Onlineroom/sel_online",t).then((function(t){if(console.log(t),0==t.data.code)return s.nodata=!0,s.show=!1,!1;s.nodata=!1,s.video=t.data.data,s.count=t.data.count,i.hideLoading()}))},bottomload:function(t){var s=this;""==this.keyword?this.$axios.postapi("/Onlineroom/sel_online",{type:1,limit:t}).then((function(t){if(0==t.data.code)return s.nodata=!0,s.show=!1,!1;s.nodata=!1,s.video=t.data.data,s.count=t.data.count,i.hideLoading()})):this.$axios.postapi("/Onlineroom/sel_online",{type:1,limit:t,keyword:this.keyword}).then((function(t){if(0==t.data.code)return s.nodata=!0,!1;s.nodata=!1,s.video=t.data.data,s.count=t.data.count,i.hideLoading()}))},allvideo:function(){var t=this;this.parms="",this.alldata=!0,""==this.keyword?this.$axios.postapi("/Onlineroom/sel_online",{type:1,limit:6}).then((function(s){if(0==s.data.code)return t.nodata=!0,t.show=!1,!1;t.nodata=!1,i.hideLoading(),t.video=s.data.data,t.count=s.data.count,i.hideLoading()})):this.$axios.postapi("/Onlineroom/sel_online",{type:1,limit:6,keyword:this.keyword}).then((function(s){if(0==s.data.code)return t.nodata=!0,t.show=!1,!1;t.nodata=!1,i.hideLoading(),t.video=s.data.data,t.count=s.data.count,i.hideLoading()}))},gradeactive:function(i){console.log(2143,i),this.alldata=!1,this.parms=i,this.shaixuanlimit=6,""!=this.keyword?this.parms.gid?this.parms.sid?this.shaixuan({type:1,sid:this.parms.sid,gid:this.parms.gid,limit:6,keyword:this.keyword}):this.shaixuan({type:1,gid:this.parms.gid,limit:6,keyword:this.keyword}):this.shaixuan({type:1,sid:this.parms.sid,limit:6,keyword:this.keyword}):this.parms.gid?this.parms.sid?this.shaixuan({type:1,sid:this.parms.sid,gid:this.parms.gid,limit:6}):this.shaixuan({type:1,gid:this.parms.gid,limit:6}):this.shaixuan({type:1,sid:this.parms.sid,limit:6})}}};t.default=e}).call(this,s("543d")["default"])},f4bf:function(i,t,s){"use strict";(function(i){s("c240");a(s("66fd"));var t=a(s("ead7"));function a(i){return i&&i.__esModule?i:{default:i}}i(t.default)}).call(this,s("543d")["createPage"])}},[["f4bf","common/runtime","common/vendor"]]]);