import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'

Vue.config.productionTip = false

new Vue({
	el: '#root',
	render: (h) => h(App),
	beforeCreate() {
		// 将当前vm对象作为事件总线挂载到vue的原型对象上
		Vue.prototype.$eventBus = this
	},
	store,
})
