/*
 * 该模块主要用于连接数据库，且判断数据库的连接状态
 * */
let mongoose = require('mongoose')
mongoose.set('useCreateIndex', true) //使用一个新的索引创建器

// 规定字符，防止数据库的地址被修改
const DB_NAME = 'demo'
const PORT = 27017
const IP = 'localhost'

function connectMongo(callback) {
	// 设置参数原因：用于接收从app.js中传进来的函数，当连接成功时执行函数，失败时执行函数并传入错误信息

	//1.连接数据库
	mongoose.connect(`mongodb://${IP}:${PORT}/${DB_NAME}`, {
		useNewUrlParser: true, //使用一个新的URL解析器，用于解决一些安全性问题。
		useUnifiedTopology: true, //使用一个统一的新的拓扑结构。
	})

	//2.绑定数据库连接的监听
	mongoose.connection.on('open', function (err) {
		if (err) {
			console.log('数据库连接失败', err)
			callback('connect failed')
		} else {
			console.log('数据库连接成功')
			callback()
		}
	})
}

// 暴露用于连接及检测数据库状态的函数
module.exports = connectMongo
