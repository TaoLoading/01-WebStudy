// 本代码是基于Node平台使用express框架操作cookie

let express = require('express')
let cookieParser = require('cookie-parser')

let app = express()
app.use(cookieParser())

// demo路由不对cookie进行任何操作
app.get('/demo', function (req, res) {
	res.send('我是demo路由给你的反馈，我没有对cookie进行任何的操作')
})

// 会话cookie，关闭浏览器即立刻消失
// demo1路由，负责给客户端“种”下一个会话cookie
app.get('/demo1', function (req, res) {
	// express中给客户端“种”cookie不需要任何的库
	let obj = { school: 'atguigu', subject: 'qianduan' }
	res.cookie('peiqi', JSON.stringify(obj)) // 给客户端种下一个会话cookie
	res.send(
		'我是demo1路由给你的反馈，我给你种下了一个【会话cookie】，你赶紧去浏览器里看看！'
	)
})

// demo2路由，负责给客户端“种”下一个持久化cookie
app.get('/demo2', function (req, res) {
	let obj = { school: 'atguigu2', subject: 'qianduan2' }
	res.cookie('peiqi', JSON.stringify(obj), {
		maxAge: 1000 * 60 * 60 * 24 * 30,
	}) // 给客户端种下一个持久化cookie
	res.send(
		'我是demo2路由给你的反馈，我给你种下了一个【持久化cookie】，你赶紧去浏览器里看看！'
	)
})

// demo3路由，负责读取客户端所携带过来的cookie
app.get('/demo3', function (req, res) {
	// express中读取客户端携带过来的cookie要借助一个中间件，名为：cookie-parser
	console.log(req.cookies)
	const { peiqi } = req.cookies
	let a = JSON.parse(peiqi)
	console.log(a.school)
	res.send('我是demo3路由,我读取了你携带过来的cookie，你去服务器控制台看看吧')
})

// demo4路由，负责告诉客户端删除一个cokkie
app.get('/demo4', function (req, res) {
	// res.cookie('peiqi','',{maxAge:0}) // 删除方法一
	res.clearCookie('peiqi') // 删除方法二
	res.send('兄台，我删除了你所保存的key为peiqi的那个cookie')
})

app.listen(3000, function (err) {
	if (err) console.log(err)
	else console.log('演示cokkie服务器启动成功了')
})
