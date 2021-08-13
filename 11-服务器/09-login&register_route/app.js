// 引入express
const express = require('express')
// 创建服务对象
const app = express()
// 禁止服务器返回X-Powered-By
app.disable('x-powered-by')
// 引入db模块，用于连接数据库
const db = require('./db/db')
// 引入模型对象，用于进行CRUD
const usersModel = require('./model/usersModel')
// 暴露静态资源
app.use(express.static(__dirname + '/public'))
// 解析post请求中的urlencoded参数
app.use(express.urlencoded({ extended: true }))

// 如果数据库连接成功，随后立即启动服务器。这样的好处是在整个过程中无论多少次请求，数据库只连接一次
// 连接数据库代码书写：db(()=>{成功},()=>{失败})
db(
	() => {
		// 注册功能展示页面
		app.get('/register', (req, res) => {
			res.sendFile(__dirname + '/public/register.html')
		})
		// 登录功能展示页面
		app.get('/login', (req, res) => {
			res.sendFile(__dirname + '/public/login.html')
		})

		// 注册功能实现页面
		app.post('/register', (req, res) => {
			// res.send('注册成功')
			// 获取输入内容
			const { email, nickName, password, rePassword } = req.body

			// 校验数据的合法性（一般由前端和后台同时验证）
			// 校验邮件的正则表达式
			const emailReg = /^[a-zA-Z0-9_]{4,20}@[a-zA-Z0-9]{2,10}\.com$/
			// 校验昵称的正则表达式
			const nickNameReg = /[\u4e00-\u9fa5]/gm
			// 校验密码的正则表达式
			const passwordReg = /^[a-zA-Z0-9_@#.+&]{6,20}$/
			// 校验格式
			if (!emailReg.test(email)) {
				res.send('邮箱格式不合法，用户名必须4-20位，主机名必须2-10位')
			} else if (!nickNameReg.test(nickName)) {
				res.send('昵称格式不合法，必须为中文')
			} else if (!passwordReg.test(password)) {
				res.send('密码格式不合法，必须6-20位')
			} else if (password !== rePassword) {
				res.send('两次输入密码不一致')
			} else {
				// 去数据库中查询该邮箱是否注册过
				usersModel.findOne({ email }, function (err, data) {
					if (data) {
						// 如果注册过
						// 此处引入计数模块：当达到一个敏感的阈值时触发安全性机制
						console.log(
							`邮箱为${email}的用户由于重复注册导致注册失败`
						)
						res.send('该邮箱已被注册，请更换邮箱')
					} else {
						// 如果没有注册过
						usersModel.create(
							{ email, nickName, password },
							function (err, data) {
								if (!err) {
									// 如果写入成功了
									console.log(`邮箱为${email}的用户注册成功`)
									res.send('注册成功了')
								} else {
									// 如果写入失败了
									// 此处引入报警模块：当达到一个敏感的阈值时触发报警
									console.log(err)
									res.send('您当前的网络状态不稳定，稍后重试')
								}
							}
						)
					}
				})
			}
		})

		// 登录功能实现页面
		app.post('/login', (req, res) => {
			// 获取输入内容
			const { email, password } = req.body

			// 校验数据
			// 校验邮件的正则表达式
			const emailReg = /^[a-zA-Z0-9_]{4,20}@[a-zA-Z0-9]{2,10}\.com$/
			// 校验密码的正则表达式
			const passwordReg = /^[a-zA-Z0-9_@#.+&]{6,20}$/

			// 校验格式
			if (!emailReg.test(email)) {
				res.send('邮箱格式不合法，用户名必须4-20位，主机名必须2-10位')
			} else if (!passwordReg.test(password)) {
				res.send('密码格式不合法，必须6-20位')
			} else {
				// 去数据库中查询该邮箱是否注册过
				usersModel.findOne({ email, password }, function (err, data) {
					// 有错误
					if (err) {
						console.log(err)
						res.send('您当前的网络状态不稳定，稍后重试')
						return // 加return是为了防止程序继续向下执行
					}
					// 没错误
					if (data) {
						res.redirect('http://www.baidu.com') // 登录成功跳转到百度
					} else {
						res.send('用户名或密码输入错误!')
					}
				})
			}
		})
	},
	(err) => {
		console.log(err)
	}
)

// 绑定端口监听
app.listen(3000, (err) => {
	if (!err) {
		console.log('服务器已启动')
	} else {
		console.log(err)
	}
})
