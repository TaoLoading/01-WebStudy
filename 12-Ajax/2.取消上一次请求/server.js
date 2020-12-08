let express = require('express')

let app = express()
//用于解析post请求请求体参数---参数的编码类型必须为：
app.use(express.urlencoded({ extended: true }))

//暴露静态资源
app.use(express.static(__dirname + '/public'))

//返回验证码的路由，每当有人请求该路由，该路由就会返回一个1000 - 9999的随机数
app.get('/get_code', function (req, res) {
	console.log('有人找我要验证码了')
	setTimeout(() => {
		let authCode = Math.floor(Math.random() * 8999 + 1000)
		console.log(authCode)
		res.send(authCode.toString())
	}, 4000)
})

app.listen(3000, function (err) {
	if (err) console.log(err)
	else {
		console.log('【练习取消上一次请求服务器启动成功！】')
		console.log(
			'【点击这里去练习吧：http://localhost:3000/verifiCode.html】'
		)
	}
})
