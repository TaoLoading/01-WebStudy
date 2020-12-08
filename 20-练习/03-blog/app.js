// 引入express框架
const express = require('express')
// 引用path框架
const path = require('path')
// 创建app服务对象
const app = express()
// 引入body-parser模块
const bodyParser = require('body-parser')
// 引入数据库连接模块
require('./model/connect')
// 引入express-session模块
const session = require('express-session')
// 导入art-template模板引擎
const template = require('art-template')
// 导入dateformat模块(处理时间格式)
const dateFormat = require('dateformat')
// 导入morgan模块
const morgan = require('morgan')

// 拦截请求并根据登录状态进行操作
// app.use('/admin', require('./middleware/loginGuard'))

// 处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }))
// 配置session
app.use(
	session({
		secret: 'secret key',
		saveUninitialized: false, // 设置退出后清除cookie
		cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 设置cookie最大保留时间为一天
	})
)

// 为使用res.render()做准备：
// 告诉express框架模板所在位置
app.set('views', path.join(__dirname, 'views'))
// 告诉express框架模板的默认后缀
app.set('view engine', 'art')
// 当渲染后缀为art的模板时，所使用的模板引擎是express-art-template
app.engine('art', require('express-art-template'))
// 向模板内部导入dateformat变量
template.defaults.imports.dateFormat = dateFormat

// 开放静态资源文件
app.use(express.static(__dirname + '/public'))

// 引入路由模块
const home = require('./route/home')
const admin = require('./route/admin')

// 匹配请求路径
app.use('/home', home)
app.use('/admin', admin)

// 错误处理中间件
app.use((err, req, res, next) => {
	// {path:'/admin/user-edit', message: '密码比对失败，不能进行用户信息的修改', id: id}
	const result = JSON.parse(err)
	let parms = []
	// 循环result，将里面的除path外的信息拼接到path后面，组成新链接
	for (let attr in result) {
		if (attr != 'path') {
			parms.push(attr + '=' + result[attr])
		}
	}
	res.redirect(`${result.path}?${parms.join('&')}`)
})

// 监听端口
app.listen(80)
console.log('服务器启动成功')
