let express = require('express')

let app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

app.get('/ajax_get', function (req, res) {
	console.log('有人发了get请求给我')
	console.log(req.query)
	res.send('你发来的get请求我收到了')
})

app.listen(3000, function (err) {
	if (err) console.log(err)
	else {
		console.log('练习原生js发送ajax服务器启动成功！')
		console.log('兄弟，别用编译器打开网页，会产生跨域问题！！！')
		console.log('点击这里去练习吧：http://localhost:3000/ajax_post.html')
		console.log('点击这里去练习吧：http://localhost:3000/ajax_post.html')
	}
})
