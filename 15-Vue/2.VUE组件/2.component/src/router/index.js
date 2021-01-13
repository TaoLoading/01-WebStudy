/* 
定义路由器对象
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'

// 声明使用vue插件
Vue.use(VueRouter)

// 向外暴露路由器对象
export default new VueRouter({
	// 应用中所有路由
	routes: [
		// 注册About路由
		{
			path: '/about',
			component: About,
		},
		// 注册Home路由
		{
			path: '/home',
			component: Home,
			// 注册子路由(News和Message)
			children: [
				{
					// 路径写法一，写出详细路径
					path: '/home/news',
					component: News,
				},
				{
					// 路径写法二，不加'/'，则会自动在当前父路径下查找改路径
					path: 'message',
					component: Message,
				},
				// 默认跳转路由
				{
					// 路径写法三，什么都不写，则会自动跳转到当前父路径
					path: '',
					redirect: '/home/news',
				},
			],
		},
		// 默认跳转路由
		{
			path: '/',
			redirect: '/about',
		},
	],
})
