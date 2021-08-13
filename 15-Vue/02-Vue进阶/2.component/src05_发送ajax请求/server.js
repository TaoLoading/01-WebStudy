// 使用express搭建后台服务器

const express = require('express')
const axios = require('axios')

const app = express()

app.get('/', (req, res) => {
	res.send('123')
})

app.get('/repositories/:q', (req, res) => {
	// 获取查询参数
	const q = req.params.q
	// 发送ajax请求
	axios({
		method: 'GET',
		url: 'https://api.github.com/search/repositories',
		params: {
			q,
			sort: 'stars',
		},
	})
		.then((response) => {
			// 获得需要的数据
			const { name, html_url } = response.data.items[0]
			console.log(html_url)
			// 将数据返回给浏览器
			res.send({
				status: 0,
				data: { name, html_url },
			})
		})
		.catch((error) => {
			console.log('请求出错')
		})
})

app.listen('4000', () => {
	console.log('server started: http://localhost:4000')
})
