// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入css
import './base.css'

Vue.config.productionTip = false

new Vue({
	el: '#root',
	render: (h) => h(App),
	beforeCreate() {
		// 在vue原型对象上挂载一个$globalEventBus对象属性
		// 在beforeCreate()中声明是为了在尽量早的时间保存当前vm
		// 加'$'是遵循vue的语法规范
		Vue.prototype.$globalEventBus = this
	},
})
