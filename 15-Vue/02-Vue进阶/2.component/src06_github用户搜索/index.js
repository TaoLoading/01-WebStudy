// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入vue-resource
import VueResource from 'vue-resource'

Vue.config.productionTip = false

// 声明使用vue插件
// 所有的组件对象都有了一个$http属性，是一个对象
Vue.use(VueResource)

new Vue({
	el: '#root',
	render: (h) => h(App),
	beforeCreate() {
		// 将当前vm对象作为事件总线挂载到vue的原型对象上
		Vue.prototype.$eventBus = this
	},
})
