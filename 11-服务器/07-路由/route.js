let express = require('express')

let app = express()

//request和response都有什么API？
/*
	1.request对象：
			request.query	获取查询字符串参数（query参数），拿到的是一个对象
					注：get请求会将输入的字符串自动拼到地址栏中形成查询字符串参数，故能直接拿到。post不能自动拼则拿不到，除非手动添加到地址栏中，但一般不用
			request.params 获取get请求参数路由的参数，拿到的是一个对象
					注：联想美团商家
			request.body	获取post请求体参数，拿到的是一个对象（不可以直接用，要借助一个中间件）
			request.get(xxxx)	获取请求头中指定key对应的value。
					注：拿到的即报文中的请求头中key对应的value。拿Referer时注意Referer是“站在哪里发送”，故当虽直接在地址栏中输入url也是属于get请求，但没有“站在哪里发送”，故拿到的是undefined
	2.response对象：
			response.send()	给浏览器做出一个响应
					注：多次send会报错，因为每次express中每次send都会设置一个响应头，而响应头不能设置多次
			response.end()	给浏览器做出一个响应（不会自动追加响应头）
			response.download()	告诉浏览器下载一个文件，可以传递相对路径
			response.sendFile()	给浏览器发送一个文件
					注：必须传递绝对路径，可以采取__dirname
			response.redirect()	重定向到一个新的地址（url）
			response.set(key,value)	自定义响应头内容
					注：由于是设置响应头，故与send配合使用时要放在send的前面
			response.get(key)	获取响应头指定key对应的value
					注：由于要获取响应头中的内容，故与send配合使用时要放在send的后面。
							部分响应头里的内容拿不到
			response.status(code)	设置响应状态码，一般由浏览器自动追加
 */

//1.过滤掉非法请求、带有攻击性的请求
//2.在匹配路由之前批量处理request
//3.防盗链

//根路由
app.get('/', function (request, response) {
	//.log(request.query)
	//console.log(request.get('Host'))
	//console.log(request.get('Referer'))
	response.send('250') //send方法里不能传入纯数字，express会当成状态码
})

//根路由
app.post('/', function (request, response) {
	console.log(request.body)
	response.send('我是根路由返回的数据--post')
})

//一级路由
app.get('/demo', function (request, response) {
	/*
	 * 什么叫做服务器给浏览器响应了？
	 *   1.服务器给浏览器一段文字
	 *   2.服务器给了浏览器一个图片
	 *   3.服务器给了浏览器一个视频
	 *   4.服务器告诉浏览器下载一个文件
	 *   5.服务器告诉浏览器重定向
	 *   备注：多个响应以response.send为主
	 * */
	//response.download('./public/vue.png')
	//response.sendFile(__dirname+'/public/demo.zip') // __dirname指当前文件所在文件夹的目录
	//response.redirect('https://www.baidu.com')
	//response.redirect('/demo/test')
	//response.set('demo','0719')
	//response.status(200)
	response.send('我是demo路由返回的数据')
	//console.log(response.get('demo'));
	//response.send('等等我还有点东西') //会抛一个异常，不能send两次。因为每次express中每次send都会设置一个响应头，而响应头不能设置多次
})

//二级路由
app.get('/demo/test', function (request, response) {
	response.send('我是demo/test路由返回的数据')
})

//参数路由---可以动态接收参数
app.get('/meishi/:id', function (request, response) {
	// console.log(request.params)
	let { id } = request.params // 对拿到的进行解构赋值
	response.send(`我是变化为${id}的商家`) // 输出拿到的对象
})

app.listen(3000, function (err) {
	if (!err) console.log('ok')
	else console.log(err)
})
