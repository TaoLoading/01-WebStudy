let express = require('express')

let app = express()
//用于解析post请求请求体参数---参数的编码类型必须为：
app.use(express.urlencoded({ extended: true }))

//暴露静态资源
app.use(express.static(__dirname + '/public'))

app.get('/ajax_get', function (req, res) {
	console.log('有人发了get请求给我')
	console.log(req.query)
	res.send('你发来的是get请求，我收到了??????')
})

app.get('/ajax_get_heima', function (req, res) {
	console.log('发送了get请求')
	res.send('Hello Ajax')
})

app.post('/ajax_post', function (req, res) {
	console.log('有人发了post请求给我')
	console.log(req.body)
	res.send('你发来的是post请求，我收到了')
})

app.listen(3000, function (err) {
	if (err) console.log(err)
	else {
		console.log('服务器已启动')
	}
})
