/*
 * mongoDB:一个数据库品牌的名字
 * mongod:启动数据库的命令
 * mongo:连接接数据库的命令
 * mongoose：在Node平台下，一个知名的用于帮助开发者连接mongoDB的包
 * */
// 为什么用mongoose？ 想在Node平台下，更加简单、高效、安全、稳定的操作mongoDB
// 当引入第三方库的时候，如果在本文件夹内没有找到node_modules，找外层文件夹，直到根目录。故此次安装mongoose时直接安装到了“10-数据库”文件夹下

// 引入mongoose
let mongoose = require('mongoose')

// 1.连接数据库
mongoose.connect('mongodb://localhost:27017/demo', {
	useNewUrlParser: true, // 使用一个新的URL解析器，用于解决一些安全性问题。
	useUnifiedTopology: true, // 使用一个统一的新的拓扑结构
})

// 2.绑定数据库连接的监听
mongoose.connection.on('open', function (err) {
	if (err) {
		console.log('数据库连接失败', err)
	} else {
		console.log('数据库连接成功')
		// 3.操作数据库
		console.log('操作数据库')
	}
})
