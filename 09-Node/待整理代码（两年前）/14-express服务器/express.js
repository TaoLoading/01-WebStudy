// 引入express
const express = require('express')

// 1.创建app服务对象
const app = express()
// 禁止服务器返回X-Powered-By
app.disable('x-powered-by')

// 2.配置路由 ------ 对请求的url进行分类，服务器根据分类决定交给谁去处理。
/*
  (1).在Node.js课程中，我们所有说的“路由”,默认都是指【后端路由】
  (2).路由可以理解为：一组一组key-value的组合，key:请求方式 + URI路径 ， value:回调函数
  (3).根据路由定义的顺序(写代码的顺序),依次定义好路由，随后放入一个类似数组的结构，当有请求时，依次取出匹配。若匹配成功，不再继续匹配了。
  (4).该URL:http://locahost:3000/meishi 中meishi，叫什么？ 1.URI名字 2.虚拟路径名字
*/
// 根路由
app.get('/', function (request, response) {
	/*
	 * 问题：得是什么样的请求，能交给这个回调函数处理？
	 *       1.符合设置请求方式，此处为GET
	 *       2.请求的URI必须为:“/”
	 * */
	console.log(request.query)
	console.log(request.url)
	response.send('ok')
})

// 一级路由
app.get('/meishi', function (request, response) {
	/*
	 * 问题：得是什么样的请求，能交给这个回调函数处理？
	 *       1.请求方式必须为GET
	 *       2.请求的URI必须为:“/meishi”
	 * */
	response.send('<h1>我是美食页面</h1>') // 与node原生服务器不同，express根据返回的值自动匹配字符类型，不用再加响应头
})

// 二级路由
app.get('/meishi/c17', function (request, response) {
	response.send('我是美食-火锅页面')
})

// 根路由
app.post('/', function (request, response) {
	response.send('你发的是post请求')
})

// 3.指定服务器运行的端口号(绑定端口监听)
app.listen(3000, function (err) {
	if (!err) console.log('服务器启动成功了')
	else console.log(err)
})
