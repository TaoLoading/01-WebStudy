// 引入joi模块
// 使用npm安装14.3.1版本，支持Joi.validate()
const Joi = require('joi')
// 引入User集合的构造函数
const { User } = require('../../model/user')
// 引入sha1加密模块
const sha1 = require('sha1')

module.exports = async (req, res) => {
	// 定义对象的验证规则
	const schema = {
		username: Joi.string()
			.min(2)
			.max(12)
			.required()
			.error(new Error('用户名格式不符合验证规则')),
		email: Joi.string()
			.email()
			.required()
			.error(new Error('邮箱格式不符合验证规则')),
		password: Joi.string()
			.regex(/^[a-zA-Z0-9]{3,30}$/)
			.required()
			.error(new Error('密码格式不符合验证规则')),
		role: Joi.string()
			.valid('normal', 'admin')
			.required()
			.error(new Error('角色值非法')),
		state: Joi.number()
			.valid(0, 1)
			.required()
			.error(new Error('状态值非法')),
	}

	// 实施验证
	try {
		await Joi.validate(req.body, schema)
	} catch (ex) {
		return res.redirect(`/admin/user-edit?message=${ex.message}`)
	}

	// 根据邮箱地址查询用户是否存在
	let user = await User.findOne({ email: req.body.email })

	// 如果用户存在，禁止继续注册
	if (user) {
		return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`)
	}

	// 对密码进行加密
	const password = await sha1(req.body.password)
	// 替换密码
	req.body.password = password

	// 将新用户添加到数据库
	await User.create(req.body)
	// 重定向到用户列表页面
	res.redirect('/admin/user')
}
