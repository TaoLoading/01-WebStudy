/*
 * 不借助任何第三方库，去搭建Node原生服务器
 * */

// 1.引入Node内置的http模块
let http = require('http')

// 引入一个内置模块，用于解析key=value&key=value.....这种形式的字符串为js中的对象
/*
备注：
  （1）key=value&key=value.....的编码形式：urlencoded编码形式。
  （2）请求地址里携带urlencoded编码形式的参数，叫做：查询字符串参数(query参数)。如name=zhangsan&age=18
* */
// 引入的qs是一个对象，该对象身上有着很多有用的方法，最具代表性的：parse()
let qs = require('querystring')

// 2.创造一个“服务员” ---- 创建服务对象
let server = http.createServer(function (request, response) {
	//让服务员开始干活，获取客人点的菜单
	/*
	 * (1)request:请求对象，里面包含着客户端给服务器的“东西”
	 * (2)response：响应对象，里面包含着服务器要返回给客户端的“东西”
	 * 当接收到请求时自动调用内置回调函数，将请求内容赋值给request，将空容器赋值给response
	 * */
	// 获取客户端携带过来的urlencoded编码形式的参数(name=zhangsan&age=18)
	let params = request.url.split('?')[1] // 加spilt()是为了去除url中的'/?'符号
	// 将获取到的参数解析为js对象
	let objParams = qs.parse(params)
	// console.log(objParams)
	let { name, age } = objParams

	// 设置请求头，设置文件的类型和编码
	response.setHeader('content-type', 'text/html;charset=utf-8')
	// 返回内容
	response.end(`<h1>你好${name},你的年龄是${age}</h1>`)
})

// 3.指定服务器运行的端口号 --- 绑定端口监听
server.listen(3000, function (err) {
	if (!err) console.log('服务器启动成功了')
	else console.log(err)
})
