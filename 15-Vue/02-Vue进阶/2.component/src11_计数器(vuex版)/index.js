import Vue from 'vue'
import App from './App'
import store from './store'

new Vue({
	el: '#root',
	render: (h) => h(App),

	// 配置vuex的核心对象store
	// 所有组件都可以通过$store来访问store对象
	store,
})
