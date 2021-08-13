import Vue from 'vue'
import App from './App'
// 按需引入mint-ui
import { Button } from 'mint-ui'

// 注册全局组件
Vue.component(Button.name, Button) // Button.name为mt-button

new Vue({
	el: '#root',
	render: (h) => h(App),
})
