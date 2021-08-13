let express = require('express')

let app = express()
//用于解析post请求请求体参数---参数的编码类型必须为：
app.use(express.urlencoded({ extended: true }))

//暴露静态资源
app.use(express.static(__dirname + '/public'))

app.get('/ajax_get', function (req, res) {
	console.log('有人发了get请求给我')
	console.log(req.query)
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.send('你发来的是get请求，我收到了')
})

app.post('/ajax_post', function (req, res) {
	console.log('有人发了post请求给我')
	console.log(req.body)
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.send('你发来的是post请求，我收到了')
})

app.listen(3000, function (err) {
	if (err) console.log(err)
	else {
		console.log('【练习封装原生Ajax的服务器启动成功！】')
	}
})
