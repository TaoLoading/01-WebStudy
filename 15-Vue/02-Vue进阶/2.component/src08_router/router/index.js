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
import MessageDetail from '../pages/MessageDetail.vue'

// 声明使用vue插件
Vue.use(VueRouter)

// 向外暴露路由器对象
export default new VueRouter({
	// mode: 'hash',
	mode: 'history',

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
					children: [
						{
							// 命名路由
							name: 'detail',
							// 由于最后一个是文章的代号，是动态的，故应该是一个可变参数，此处使用的是params参数，采用':xxx'的形式
							path: '/home/message/detail/:mid',
							component: MessageDetail,

							// 将参数映射为组件属性并传递给路由组件，此处即将mid映射为组件属性
							// props: true, // 只映射params参数
							props: (route) => ({
								mid: route.params.mid,
								title: route.query.title,
							}),
						},
					],
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
