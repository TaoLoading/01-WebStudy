// 1.引入mongoose库
let mongoose = require('mongoose')
// 2.引入数据库连接模块(接收到的是用于连接及检测数据库状态的函数connectMongo)
let db = require('./db/db')
// 3.引入学生模型
let stuModel = require('./model/studentModel')
// 引入老师模型
let teacModel = require('./model/teacherModel')

// 4.判断数据的连接状态，若成功，CRUD；若失败，报告错误
db(function (err) {
	if (err) console.log(err)
	else {
		//真正进行CRUD
		teacModel.create(
			{
				teac_id: '001',
				name: '光头强',
				age: '24',
				sex: '男',
				hobby: ['女', '打代码', '打篮球'], //限制爱好只能为数组，数组中的每一项必须为字符串
				info: '一个风一样的男子', //接收所有类型
			},
			function (err, data) {
				if (!err) console.log(data)
				else console.log(err)
			}
		)
	}
})
