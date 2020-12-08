const express = require('express')

const app = express()

app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.send('ok')
})

// 原生ja发送get请求
app.get('/ajax_get', (req, res) => {
	console.log(req.query)
	res.send('发出了get请求')
})

// 原生ja发送post请求
app.post('/ajax_post', (req, res) => {
	console.log(req.body)
	res.send('发出了post请求')
})

// 发送验证码
app.get('/get_code', (req, res) => {
	console.log('服务器被请求发送验证码')
	setTimeout(() => {
		let autoCode = Math.floor(Math.random() * 8999 + 1000)
		console.log(autoCode)
		res.send(autoCode.toString())
	}, 3000)
})

// jsonp技术
app.get('/jsonp', (req, res) => {
	let arr = [2, 3, 4, 5, 6]
	res.send(`demo(${JSON.stringify(arr)})`)
})

app.listen(3000, (err) => {
	if (err) {
		console.log(err)
	} else {
		console.log('服务器启动成功')
	}
})
