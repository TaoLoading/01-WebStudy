// 创建用户集合

// 引入mongoose模块
const mongoose = require('mongoose')
// 引入sha1加密模块
const sha1 = require('sha1')

// 创建用户集合规则
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 20,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	// 用户角色，admin为超级管理员，normal为普通用户
	role: {
		type: String,
		required: true,
	},
	// 启用状态，0为启用，1为禁用
	state: {
		type: Number,
		default: 0,
	},
})

// 创建集合
const User = mongoose.model('User', userSchema)

// User.create({
// 	username: 'lht',
// 	email: '1377226380@qq.com',
// 	password: sha1('123456'),
// 	role: 'admin',
// 	state: 0,
// })
// 	.then(() => {
// 		console.log('用户创建成功')
// 	})
// 	.catch(() => {
// 		console.log('用户创建失败')
// 	})

// 将用户集合作为模块进行导出
module.exports = {
	User: User,
}
