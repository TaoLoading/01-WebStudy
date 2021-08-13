let express = require('express')

let app = express()
app.use(express.static(__dirname + '/public'))

app.get('/test', function (req, res) {
	let { callback } = req.query
	console.log(callback)
	let personArr = [
		{ name: 'peiqi', age: 12 },
		{ name: 'suxi', age: 16 },
	]
	res.send(`${callback}(${JSON.stringify(personArr)})`)
})

app.listen(3000, function (err) {
	if (err) console.log(err)
	else {
		console.log('演示jsonp解决跨域服务器，启动成功了！')
		console.log('兄弟，你要用编译器打开网页，因为你要解决跨域问题！')
	}
})
