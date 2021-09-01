import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router'

new Vue({
	el: '#root',
	render: (h) => h(App),
	// 注册路由器
	// 所有的组件都会有一个$route参数和$router参数
	router,
})
